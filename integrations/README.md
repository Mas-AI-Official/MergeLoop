# Integrations Matrix

This folder provides templates for IDE/agent hosts.

CouncilKit does **not** claim universal official support across all IDEs/agents. This matrix documents the support level of integration assets that exist in this repo.

## Status Legend

- `official`: maintained by vendor docs + stable path.
- `community`: works in practice but not guaranteed by the vendor.
- `manual`: no official template format; use wrapper script/command examples.

## IDE And Agent Hosts

- Claude Code (`official in this repo`): use root `.mcp.json` and plugin manifest.
- VS Code (`community`): import `integrations/vscode/mcp.json` into your MCP extension config.
- Cursor (`community`): import `integrations/cursor/mcp.json`.
- Windsurf (`community`): import `integrations/windsurf/mcp_config.json`.
- Zed (`manual`): copy snippet from `integrations/zed/settings.json` into user settings.
- Neovim (`manual`): see `integrations/neovim/README.md`.
- JetBrains (`manual`): see `integrations/jetbrains/README.md`.
- OpenClaw (`community`): see `integrations/openclaw/README.md`.

## Visual Matrix

See [`../docs/demo/host-matrix.svg`](../docs/demo/host-matrix.svg).

## Safety Note

Templates only start the local `council-hub` server. Worker auth remains in each vendor CLI.
