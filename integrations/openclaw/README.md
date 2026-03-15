# OpenClaw Integration

This repo supports OpenClaw in two practical ways.

## 1) Use OpenClaw As A Worker In CouncilKit (Supported Now)

Add this to `councilkit.settings.json`:

```json
{
  "custom_workers": {
    "openclaw": {
      "command": "openclaw \"{task}\"",
      "timeout_ms": 300000,
      "output_format": "auto"
    }
  }
}
```

Then call:

```json
{
  "task": "Your task",
  "mode": "council",
  "workers": ["codex", "gemini", "openclaw"]
}
```

## 2) Load CouncilKit Server From OpenClaw (Community Path)

If your OpenClaw setup supports MCP server entries, point it to:

- `command`: `node`
- `args`: `/absolute/path/to/councilkit/dist/server.js`

Use [`mcp-server-template.json`](./mcp-server-template.json) as a base snippet.

## Notes

- OpenClaw integration behavior depends on the OpenClaw version and wrappers you use.
- CouncilKit does not include OpenClaw auth logic; OpenClaw must already be installed and authenticated separately.
