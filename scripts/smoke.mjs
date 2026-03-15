#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(path.join(__dirname, ".."));
const distServerPath = path.join(root, "dist", "server.js");
const fakeWorkerPath = path.join(root, "scripts", "fake-worker.mjs");

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "pipe",
      windowsHide: true,
      ...options
    });

    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code: code ?? -1, stdout, stderr }));
  });
}

async function ensureBuildArtifacts() {
  try {
    await fs.access(distServerPath);
    return;
  } catch {
    // Build is missing; compile once.
  }

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = await run(npmCmd, ["run", "build"]);
  if (result.code !== 0) {
    throw new Error(`Build failed during smoke test.\n${result.stderr}`);
  }
}

async function verifyServerEntrypoint() {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [distServerPath], {
      cwd: root,
      stdio: "pipe",
      windowsHide: true
    });

    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    const failTimer = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error("MCP server entrypoint did not stay alive long enough."));
    }, 900);

    const passTimer = setTimeout(() => {
      clearTimeout(failTimer);
      child.kill("SIGTERM");
      resolve(undefined);
    }, 350);

    child.on("exit", (code) => {
      clearTimeout(failTimer);
      clearTimeout(passTimer);
      if (code === null) {
        return;
      }
      reject(new Error(`MCP server exited too early with code ${code}. ${stderr}`));
    });
  });
}

function assertNodeVersion() {
  const major = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);
  if (major < 20) {
    throw new Error(`Node.js >= 20 required, found ${process.versions.node}`);
  }
}

async function runSyntheticCouncilRequest() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "councilkit-smoke-"));
  const configPath = path.join(tempDir, "config.json");
  const quotedWorker = fakeWorkerPath.replaceAll("\\", "/");

  const config = {
    codex_command: "codex",
    gemini_command: "gemini",
    default_workers: ["smoke_local"],
    custom_workers: {
      smoke_local: {
        command: `node "${quotedWorker}" "{task}"`,
        timeout_ms: 30_000,
        output_format: "json"
      }
    },
    persistence: {
      enabled: false,
      directory: "~/.councilkit/runs"
    }
  };

  await fs.writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

  const previousConfig = process.env.COUNCILKIT_CONFIG;
  process.env.COUNCILKIT_CONFIG = configPath;

  try {
    const modulePath = pathToFileURL(path.join(root, "dist", "index.js")).href;
    const { CouncilOrchestrator } = await import(modulePath);
    const orchestrator = new CouncilOrchestrator();
    const result = await orchestrator.run(
      {
        task: "synthetic smoke task",
        mode: "single",
        workers: ["smoke_local"],
        output_format: "json"
      },
      root
    );

    if (result.results[0]?.status !== "success") {
      throw new Error(`Synthetic council request failed: ${JSON.stringify(result.results[0])}`);
    }
  } finally {
    if (previousConfig === undefined) {
      delete process.env.COUNCILKIT_CONFIG;
    } else {
      process.env.COUNCILKIT_CONFIG = previousConfig;
    }
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function main() {
  assertNodeVersion();
  await ensureBuildArtifacts();
  await verifyServerEntrypoint();
  await runSyntheticCouncilRequest();
  process.stdout.write("Smoke check passed.\n");
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
