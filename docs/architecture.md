# Architecture

CouncilKit uses a middle-layer model:

- Host -> CouncilKit Core -> Workers -> Unified answer

## Core Components

- `CouncilKit Core`: orchestration engine + synthesis + persistence.
- `MCP server`: `council-hub` (`src/mcp/server.ts`).
- `Worker adapters`: runtime workers called by orchestrator.

## Adapter Concepts

The repo documents and partially codifies these adapter concepts:

- `MCPHostAdapter` pattern (host invokes `council_run` over MCP)
- `CLIHostAdapter` pattern (host wrapper launches CouncilKit runtime)
- `CLIWorkerAdapter` (active today)
- `MCPWorkerAdapter` (documented pattern)
- `APIWorkerAdapter` (optional/future path)

Interface reference:
- [`src/adapters/types.ts`](../src/adapters/types.ts)

## Separation Of Concerns

- Hosts are entrypoints.
- Workers are execution targets.
- CouncilKit is the orchestration middle layer.

This separation is intentional and reflected in config:

- `active_host`
- `hosts`
- `worker_registry`
- `routing`
