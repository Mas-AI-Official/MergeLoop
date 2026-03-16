# Contributing

## Development

```bash
npm install
npm test
npm run build
```

## Local Validation

1. Install and authenticate the official `codex` and `gemini` CLIs locally.
2. Edit `mergeloop.settings.json` or `~/.mergeloop/config.json`.
3. Start Claude Code with:

```bash
claude --plugin-dir ./MergeLoop
```

4. Run `/mergeloop:run` inside Claude Code and confirm the `mergeloop-hub` server starts automatically.

## Pull Requests

- Keep the project local-first and subscription-first.
- Do not add direct vendor API integrations to the runtime.
- Preserve the security model: only call officially installed CLIs, never harvest credentials.
- Add or update tests for behavior changes in orchestration logic.
- Keep Windows support reasonable; document WSL when shell behavior is likely to vary.
