# Integrations

CouncilKit is host-agnostic, but integration paths have different support levels.

## Support Levels

- `first-class`: maintained and tested in this repo
- `documented/manual`: templates/docs provided, host behavior depends on user setup
- `experimental`: optional path with partial validation
- `planned`: not implemented in this repo yet

## Matrix

- Claude Code plugin bundle: `first-class`
- VS Code template: `documented/manual`
- Cursor template: `documented/manual`
- Windsurf template: `documented/manual`
- OpenClaw templates: `documented/manual`
- Zed/Neovim/JetBrains guides: `documented/manual`
- Antigravity path: `experimental`
- Perplexity path: `planned`

Visual:
- [`../docs/demo/support-matrix.svg`](../docs/demo/support-matrix.svg)

## Safety Reminder

Templates only configure CouncilKit as an MCP server path. Worker authentication and usage limits remain controlled by each worker tool.
