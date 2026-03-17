# Setup Wizard

Use the interactive setup flow to configure MergeLoop quickly:

```bash
npm run setup
```

## What Setup Detects

- local CLIs: `codex`, `gemini`, `ollama`, `claude`
- likely host config locations:
  - Gemini: `~/.gemini/settings.json`
  - Antigravity: `~/.gemini/antigravity/mcp_config.json`
  - Generic local MCP file: `./.mcp.json`
  - Claude Code plugin path (manual startup command)

## What Setup Configures

- merges/writes `mergeloop.settings.json`
- migrates from legacy `councilkit.settings.json` if that file is present locally
- lets you select:
  - host target
  - workers
  - routing style
  - persistence directory
- optionally auto-merges `mergeloop` MCP entry into selected host config
- replaces legacy CouncilKit MCP ids in supported host config files when present
- creates timestamped backups before modifying existing files

## Safe Modes

- dry-run:
  - `npm run setup -- --dry-run`
- non-interactive defaults:
  - `npm run setup -- --yes`

## Which Host Should You Pick?

- Gemini:
  - `npm run setup -- --yes --host=gemini --workers=gemini,ollama,codex`
  - writes to `~/.gemini/settings.json`
- Antigravity:
  - `npm run setup -- --yes --host=antigravity --workers=gemini,ollama,codex`
  - writes to `~/.gemini/antigravity/mcp_config.json`
- Generic MCP host:
  - `npm run setup -- --yes --host=generic --workers=gemini,ollama,codex`
  - writes repo-local `mergeloop.settings.json` and `./.mcp.json`
  - best first test if you want to avoid touching home-directory configs
- Claude Code:
  - `npm run setup -- --yes --host=claude --workers=gemini,ollama,codex`
  - keeps setup local and prints the `claude --plugin-dir` startup command
- Cursor / Windsurf / OpenClaw / VS Code / Zed / Neovim / JetBrains:
  - use the generic/manual path first
  - then copy or adapt the generated MCP entry into the host-specific template under `integrations/`
  - these are documented/manual integrations in this repo, not auto-written first-class host configs

## Post-Setup

Setup prints:

- selected host
- enabled workers
- config file paths
- backup file paths
- exact next commands
- starter prompts

It then runs `npm run doctor` and `npm run smoke` unless dry-run is enabled.
