# VS Code Integration

Support level: `documented/manual`.

Template file: [`mcp.json`](./mcp.json)

## What Is Tested In This Repo

- Template shape and MergeLoop server path pattern.
- VS Code extension/plugin-specific behavior is not CI-verified here.

## Known-Good Local Test Steps

1. Build MergeLoop: `npm ci && npm run build`
2. Apply `mcp.json` template with your absolute local path.
3. Reload VS Code MCP extension/agent.
4. Run a prompt that explicitly calls `mergeloop_run`.
