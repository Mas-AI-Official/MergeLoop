# Suggested HN Title

Show HN: CouncilKit - MCP-native model council using subscription CLIs first

# Suggested HN Body

Built CouncilKit as a local-first orchestration layer for model CLIs.

It runs workers (Codex/Gemini/local/custom) in parallel and returns one structured result with:
- agreement signals
- disagreements
- recommended next checks

Positioning: use the subscriptions/CLIs you already have, API optional.

Technical details:
- TypeScript MCP stdio server
- Claude Code plugin packaging
- configurable worker adapters
- local persistence
- smoke tests and launch docs

Would value feedback on host integrations and worker adapter ergonomics.
