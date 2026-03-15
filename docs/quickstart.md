# Quickstart

CouncilKit is local-first and subscription-first orchestration.

- **Local-first:** run Council Hub on your machine.
- **Subscription-first:** use worker CLIs you already installed/authenticated.
- **API optional:** API workers can be added later, but are not required for core use.

## Prerequisites

- Node.js 20+
- Installed host/editor with MCP client path (Claude Code first-class, others via templates/manual)
- Installed worker CLIs you plan to use (`codex`, `gemini`, local/community workers)
- Worker authentication done in each CLI separately

## Install

```bash
npm ci
npm run build
npm run smoke
```

Run environment checks:

```bash
npm run doctor
```

`doctor` fails if expected worker CLIs are missing. This is expected behavior.

## Start With Claude Code

```bash
claude --plugin-dir ./councilkit
```

Then run `/councilkit:run`.

## Add A Custom Worker

Edit `councilkit.settings.json`:

```json
{
  "custom_workers": {
    "my_worker": {
      "command": "my-worker-cli \"{task}\"",
      "timeout_ms": 300000,
      "output_format": "auto"
    }
  }
}
```

Use:

```json
{
  "task": "Do the task",
  "mode": "council",
  "workers": ["codex", "my_worker"]
}
```

## Worker Fallback Behavior

- Codex worker retries without `--output-schema` if unsupported.
- Gemini worker retries plain-text path if JSON output flags are unsupported.
- Unsupported workers return explicit error entries in `results`.

## Check Worker Availability

1. Run `npm run doctor`.
2. Verify the worker executable is in `PATH`.
3. Verify CLI authentication in that worker's own login flow.

## Use As A Daena Add-On

CouncilKit can run as a Daena tool adapter:

1. Start `council-hub` from Daena's tool layer.
2. Route high-stakes tasks to `mode: "council"`.
3. Use `disagreements` and `recommended_next_checks` to drive Daena verification loops.

See example: [`examples/daena-addon.md`](../examples/daena-addon.md).
