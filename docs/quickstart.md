# Quickstart

MergeLoop is host-agnostic and worker-agnostic.

## Prerequisites

- Node.js 20+
- At least one worker CLI installed/authenticated (`codex`, `gemini`, `ollama`, or custom worker tool)
- MCP-capable host (or run MergeLoop directly and wire it manually)

## Install

```bash
npm ci
npm test
npm run build
npm run smoke
```

Recommended interactive onboarding:

```bash
npm run setup
```

Safe repo-local first run:

```bash
npm run setup -- --yes --host=generic --workers=gemini,ollama,codex
```

That keeps the first end-to-end test inside the repo by updating local `mergeloop.settings.json` and `.mcp.json` instead of writing to home-directory host configs.

Check environment:

```bash
npm run doctor
```

If `doctor` reports missing external CLIs, install/auth those tools or disable their worker entries.
Missing worker CLIs are external dependency checks, not MergeLoop build failures.

## Host Setup

### Claude Code (first-class path)

```bash
claude --plugin-dir .
```

### Generic MCP host

Register `dist/server.js` as an MCP stdio server.

### Gemini host path

Configure MergeLoop in `~/.gemini/settings.json` and reload Gemini.
See [gemini.md](./gemini.md) for the exact config and test prompt.

### Manual integrations

Templates in [`integrations/`](../integrations/) for:

- VS Code
- Cursor
- Windsurf
- OpenClaw
- Zed
- Neovim
- JetBrains

## Worker Setup

Configure workers in `workers`:

```json
{
  "workers": {
    "codex": { "type": "cli", "command": "codex", "enabled": true, "priority": 10 },
    "gemini": { "type": "cli", "command": "gemini", "enabled": true, "priority": 20 },
    "ollama": {
      "type": "cli",
      "command": "ollama run llama3.1 \"{task}\"",
      "enabled": false,
      "priority": 40
    }
  }
}
```

## Fast Local Test: Codex + Gemini + Ollama

```bash
npm ci
npm run build
npm run smoke
gemini
ollama pull qwen3:latest
ollama serve
npm run doctor
```

Run `gemini` once to complete login/auth if not already configured.

Gemini MCP config (`~/.gemini/settings.json`):

```json
{
  "mcpServers": {
    "mergeloop": {
      "command": "node",
      "args": ["D:/Ideas/MergeLoop/dist/server.js"]
    }
  }
}
```

Then restart/reload Gemini and run:

```text
Use mergeloop.mergeloop_run with workers gemini, local, codex and return disagreements + next checks.
```

## Discovery + Routing

- discovery controls candidate registration from MCP configs and CLI candidates
- routing scores workers per task and selects one or many workers

See:

- [setup.md](./setup.md)
- [host-autoconfig.md](./host-autoconfig.md)
- [rollback.md](./rollback.md)
- [configuration.md](./configuration.md)
- [discovery.md](./discovery.md)
- [routing.md](./routing.md)
- [ollama.md](./ollama.md)
- [gemini.md](./gemini.md)

## Daena Add-On Mode

MergeLoop can be used as Daena council middleware.

References:

- [../examples/host-daena-addon-mode.json](../examples/host-daena-addon-mode.json)
- [../examples/daena-addon.md](../examples/daena-addon.md)
