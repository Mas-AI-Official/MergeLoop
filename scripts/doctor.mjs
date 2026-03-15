#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

function expandHome(inputPath) {
  if (inputPath === "~") {
    return os.homedir();
  }
  if (inputPath.startsWith("~/") || inputPath.startsWith("~\\")) {
    return path.join(os.homedir(), inputPath.slice(2));
  }
  return inputPath;
}

async function commandExists(command) {
  const probe = process.platform === "win32" ? "where" : "which";
  const args = process.platform === "win32" ? [command] : [command];
  const commandToRun = process.platform === "win32" ? "cmd.exe" : probe;
  const commandArgs = process.platform === "win32" ? ["/d", "/s", "/c", "where", command] : args;

  return new Promise((resolve) => {
    const child = spawn(commandToRun, commandArgs, {
      stdio: "ignore",
      windowsHide: true
    });
    child.on("close", (code) => resolve(code === 0));
    child.on("error", () => resolve(false));
  });
}

async function readSettings(cwd) {
  const localPath = path.join(cwd, "councilkit.settings.json");
  const homePath = path.join(expandHome("~/.councilkit"), "config.json");

  for (const candidate of [localPath, homePath]) {
    try {
      const raw = await fs.readFile(candidate, "utf8");
      const parsed = JSON.parse(raw);
      return { settings: parsed, path: candidate };
    } catch {
      // Skip unreadable candidates.
    }
  }

  return {
    settings: {
      active_host: "claude_code",
      codex_command: "codex",
      gemini_command: "gemini",
      worker_registry: {},
      custom_workers: {}
    },
    path: "(default)"
  };
}

function firstExecutable(command) {
  if (typeof command !== "string") {
    return "";
  }
  const trimmed = command.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed.split(/\s+/)[0] ?? "";
}

async function main() {
  const cwd = process.cwd();
  const nodeMajor = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);
  const { settings, path: configPath } = await readSettings(cwd);

  const checks = [
    {
      name: "Node.js >= 20",
      ok: nodeMajor >= 20,
      detail: `found ${process.versions.node}`
    },
    {
      name: "codex CLI",
      ok: await commandExists(firstExecutable(settings.codex_command ?? "codex")),
      detail: firstExecutable(settings.codex_command ?? "codex")
    },
    {
      name: "gemini CLI",
      ok: await commandExists(firstExecutable(settings.gemini_command ?? "gemini")),
      detail: firstExecutable(settings.gemini_command ?? "gemini")
    }
  ];

  if (typeof settings.active_host === "string" && settings.active_host.trim()) {
    checks.push({
      name: "active host selected",
      ok: true,
      detail: settings.active_host
    });
  }

  const customWorkers = settings.custom_workers ?? {};
  for (const [name, config] of Object.entries(customWorkers)) {
    const executable = firstExecutable(config?.command ?? "");
    if (!executable) {
      checks.push({
        name: `custom worker: ${name}`,
        ok: false,
        detail: "empty command"
      });
      continue;
    }

    checks.push({
      name: `custom worker: ${name}`,
      ok: await commandExists(executable),
      detail: executable
    });
  }

  const workerRegistry = settings.worker_registry ?? {};
  for (const [name, config] of Object.entries(workerRegistry)) {
    if (!config || config.enabled === false || config.type !== "cli") {
      continue;
    }

    const executable = firstExecutable(config.command ?? "");
    if (!executable) {
      checks.push({
        name: `registry worker: ${name}`,
        ok: false,
        detail: "empty command"
      });
      continue;
    }

    checks.push({
      name: `registry worker: ${name}`,
      ok: await commandExists(executable),
      detail: executable
    });
  }

  console.log("CouncilKit Doctor");
  console.log(`Config: ${configPath}`);
  console.log("");

  for (const check of checks) {
    const status = check.ok ? "[OK]" : "[MISSING]";
    console.log(`${status} ${check.name} (${check.detail})`);
  }

  const allGood = checks.every((check) => check.ok);
  console.log("");
  if (allGood) {
    console.log("All checks passed.");
    process.exitCode = 0;
    return;
  }

  console.log("Some checks failed. Install missing CLIs or adjust councilkit.settings.json.");
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
