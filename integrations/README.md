# Integrations Matrix

This folder provides templates for IDE/agent hosts.

## Status Legend

- `official`: maintained by vendor docs + stable path.
- `community`: works in practice but not guaranteed by the vendor.
- `manual`: no official template format; use wrapper script/command examples.

## IDE And Agent Hosts

- Claude Code (`official`): use root `.mcp.json` and plugin manifest.
- VS Code (`community`): import `integrations/vscode/mcp.json` into your MCP extension config.
- Cursor (`community`): import `integrations/cursor/mcp.json`.
- Windsurf (`community`): import `integrations/windsurf/mcp_config.json`.
- Zed (`manual`): copy snippet from `integrations/zed/settings.json` into user settings.
- Neovim (`manual`): see `integrations/neovim/README.md`.
- JetBrains (`manual`): see `integrations/jetbrains/README.md`.
- OpenClaw (`community`): see `integrations/openclaw/README.md`.

## Safety Note

Templates only start the local `council-hub` server. Worker auth remains in each vendor CLI.
