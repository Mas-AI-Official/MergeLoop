import type { CommandRunner } from "../core/subprocess.js";
import type { MergeLoopSettings, WorkerResult } from "../types/council.js";

export interface WorkerContext {
  task: string;
  settings: MergeLoopSettings;
  cwd: string;
  tempDir: string;
}

export interface WorkerAdapter {
  name: string;
  run(context: WorkerContext, runner: CommandRunner): Promise<WorkerResult>;
}
