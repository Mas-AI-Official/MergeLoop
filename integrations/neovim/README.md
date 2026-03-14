# Neovim Integration (Manual)

Use any MCP-capable Neovim plugin and point it at:

```bash
node /absolute/path/to/councilkit/dist/server.js
```

If your plugin expects JSON config, use this shape:

```json
{
  "mcpServers": {
    "council-hub": {
      "command": "node",
      "args": ["/absolute/path/to/councilkit/dist/server.js"]
    }
  }
}
```
