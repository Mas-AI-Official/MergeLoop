# Neovim Integration (Manual)

Support level: `documented/manual`.

Use any MCP-capable Neovim plugin and point it at:

```bash
node /absolute/path/to/MergeLoop/dist/server.js
```

If your plugin expects JSON config, use this shape:

```json
{
  "mcpServers": {
    "mergeloop-hub": {
      "command": "node",
      "args": ["/absolute/path/to/MergeLoop/dist/server.js"]
    }
  }
}
```

## What Is Tested In This Repo

- MergeLoop server entrypoint and config shape.
- Neovim plugin-specific runtime behavior is not CI-verified in this repo.

## Known-Good Local Test Steps

1. Build MergeLoop: `npm ci && npm run build`
2. Add MCP config for `mergeloop-hub`.
3. Reload Neovim/plugin.
4. Run an explicit `mergeloop_run` test prompt and verify tool output fields.
