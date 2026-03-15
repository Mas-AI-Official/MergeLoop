import type { CouncilRunInput, CouncilRunOutput, WorkerAdapterType } from "../types/council.js";
export interface HostAdapterContext {
    host_name: string;
    host_type: "mcp_host" | "cli_host" | "api_host";
}
export interface HostAdapterPattern {
    name: string;
    type: HostAdapterContext["host_type"];
    invoke(input: CouncilRunInput): Promise<CouncilRunOutput>;
}
export interface WorkerAdapterDefinition {
    name: string;
    type: WorkerAdapterType;
    enabled: boolean;
    priority?: number;
    notes?: string;
}
