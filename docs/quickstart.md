# Quickstart

CouncilKit is a host-agnostic orchestration runtime.

- Bring your own host.
- Bring your own workers.
- Use subscriptions first, API optional.

## Prerequisites

- Node.js 20+
- One host path (Claude plugin path or any MCP-capable host)
- Worker CLIs installed/authenticated as needed (`codex`, `gemini`, local/community workers)

## Install

```bash
npm ci
npm test
npm run build
npm run smoke
```

Environment checks:

```bash
npm run doctor
```

`doctor` reports missing external CLIs when not installed. That is expected.

## Host Setup

### Claude Code (first-class in this repo)

```bash
claude --plugin-dir ./councilkit
```

### Generic MCP host

Register:

- command: `node`
- args: `/absolute/path/to/councilkit/dist/server.js`

## Worker Setup

`worker_registry` supports worker type labeling:

- `cli` (active today)
- `mcp` (documented pattern)
- `api` (optional/future path)

Example:

```json
{
  "worker_registry": {
    "gemini": {
      "type": "cli",
      "enabled": true,
      "command": "gemini",
      "priority": 20
    }
  },
  "routing": {
    "default_mode": "council",
    "fallback_priority": ["gemini"],
    "allow_single_worker": true
  }
}
```

## Fallback Behavior

- `routing.fallback_priority` controls worker order.
- Built-in CLI workers keep backward compatibility with existing config fields.
- Unsupported or unavailable workers are returned as explicit error entries.

## Daena Add-On Mode

1. Daena host path invokes `council_run`.
2. CouncilKit executes selected workers.
3. Daena consumes `disagreements` and `recommended_next_checks` for follow-up.

Reference:
- [`../examples/host-daena-addon-mode.json`](../examples/host-daena-addon-mode.json)
- [`../examples/daena-addon.md`](../examples/daena-addon.md)
