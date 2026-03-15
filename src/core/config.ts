import fs from "node:fs/promises";
import path from "node:path";

import type { CouncilKitSettings, LoadedSettings } from "../types/council.js";
import { normalizePath } from "./path-utils.js";

const DEFAULT_SETTINGS: CouncilKitSettings = {
  active_host: "claude_code",
  hosts: {
    claude_code: {
      type: "mcp_host",
      enabled: true,
      notes: "First-class plugin path in this repository."
    },
    codex_cli: {
      type: "cli_host",
      enabled: true,
      command: "codex"
    },
    gemini_cli: {
      type: "cli_host",
      enabled: true,
      command: "gemini"
    }
  },
  worker_registry: {
    codex: {
      type: "cli",
      enabled: true,
      command: "codex",
      priority: 10,
      output_format: "json"
    },
    gemini: {
      type: "cli",
      enabled: true,
      command: "gemini",
      priority: 20,
      output_format: "json"
    },
    local: {
      type: "cli",
      enabled: false,
      priority: 90,
      output_format: "auto"
    }
  },
  routing: {
    default_mode: "council",
    fallback_priority: ["codex", "gemini"],
    allow_single_worker: true
  },
  codex_command: "codex",
  gemini_command: "gemini",
  local_command: null,
  default_workers: ["codex", "gemini"],
  timeouts: {
    codex_ms: 300_000,
    gemini_ms: 300_000,
    local_ms: 180_000
  },
  codex: {
    use_output_schema: true
  },
  custom_workers: {},
  persistence: {
    enabled: true,
    directory: "~/.councilkit/runs"
  }
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeSettings<T>(base: T, override: Partial<T>): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override ?? base) as T;
  }

  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = merged[key];
    if (Array.isArray(value)) {
      merged[key] = [...value];
      continue;
    }

    if (isPlainObject(current) && isPlainObject(value)) {
      merged[key] = mergeSettings(current, value);
      continue;
    }

    if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged as T;
}

async function readJsonConfig(configPath: string): Promise<Partial<CouncilKitSettings>> {
  const raw = await fs.readFile(configPath, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  if (!isPlainObject(parsed)) {
    throw new Error(`Config file must contain an object: ${configPath}`);
  }

  return parsed as Partial<CouncilKitSettings>;
}

function normalizeRuntimeSettings(settings: CouncilKitSettings): CouncilKitSettings {
  const normalized: CouncilKitSettings = {
    ...settings,
    custom_workers: { ...(settings.custom_workers ?? {}) }
  };

  const registry = settings.worker_registry ?? {};
  const priorityPairs: Array<{ name: string; priority: number }> = [];

  for (const [name, worker] of Object.entries(registry)) {
    if (!worker || worker.enabled === false) {
      continue;
    }

    priorityPairs.push({
      name,
      priority: worker.priority ?? 100
    });

    if (worker.type !== "cli") {
      continue;
    }

    const cliCommand = worker.command?.trim();
    if (!cliCommand) {
      continue;
    }

    if (name === "codex") {
      normalized.codex_command = cliCommand;
      continue;
    }

    if (name === "gemini") {
      normalized.gemini_command = cliCommand;
      continue;
    }

    if (name === "local") {
      normalized.local_command = cliCommand;
      continue;
    }

    normalized.custom_workers ??= {};
    normalized.custom_workers[name] = {
      command: cliCommand,
      timeout_ms: worker.timeout_ms,
      output_format: worker.output_format ?? "auto"
    };
  }

  const fallbackPriority = normalized.routing?.fallback_priority ?? [];
  if (fallbackPriority.length > 0) {
    normalized.default_workers = [...new Set(fallbackPriority)];
    return normalized;
  }

  if (priorityPairs.length > 0) {
    normalized.default_workers = priorityPairs
      .sort((left, right) => left.priority - right.priority)
      .map((entry) => entry.name);
  }

  return normalized;
}

export async function loadSettings(cwd = process.cwd()): Promise<LoadedSettings> {
  const candidatePaths = [
    process.env.COUNCILKIT_CONFIG,
    path.join(cwd, "councilkit.settings.json"),
    normalizePath("~/.councilkit/config.json")
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidatePaths) {
    try {
      const config = await readJsonConfig(candidate);
      const merged = mergeSettings(DEFAULT_SETTINGS, config);
      return {
        settings: normalizeRuntimeSettings(merged),
        configPath: candidate
      };
    } catch (error) {
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code === "ENOENT") {
        continue;
      }

      throw error;
    }
  }

  return {
    settings: normalizeRuntimeSettings(DEFAULT_SETTINGS)
  };
}
