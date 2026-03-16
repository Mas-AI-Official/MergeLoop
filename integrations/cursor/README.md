# Cursor Integration

Support level: `documented/manual`.

Template file: [`mcp.json`](./mcp.json)

## What Is Tested In This Repo

- Template shape and MergeLoop server registration pattern.
- Cursor-side runtime behavior is environment/version specific and not CI-verified here.

## Known-Good Local Test Steps

1. Build MergeLoop: `npm ci && npm run build`
2. Register MergeLoop MCP server in Cursor config using the template.
3. Reload Cursor.
4. Run a direct `mergeloop_run` prompt and confirm structured output is returned.
