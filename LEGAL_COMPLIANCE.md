# Legal And Compliance Guardrails

Last reviewed: March 14, 2026.

This project is designed to orchestrate officially installed local CLIs. It does not scrape credentials, proxy vendor OAuth tokens, or imitate authentication flows.

## Core Rules

1. Never extract or replay tokens/cookies from consumer web sessions.
2. Never implement reverse-engineered auth for closed systems.
3. Only invoke user-installed vendor CLIs that already handle authentication.
4. Clearly separate official adapters from community adapters.
5. Treat all external tool output as untrusted until verified.

## Allowed By Project Policy

- Calling official CLIs (`codex`, `gemini`) as subprocesses.
- Running locally hosted MCP servers and stdio tools.
- Letting users provide custom commands in local settings.

## Not Allowed By Project Policy

- Credential harvesting.
- Browser token scraping.
- "Unofficial login bridge" code that routes consumer-account auth into third-party products.
- Hidden telemetry on user prompts/responses.

## Vendor And Protocol References

- Anthropic Claude Code docs (MCP integration): https://docs.anthropic.com/en/docs/claude-code/mcp
- Anthropic Claude Code legal and compliance page: https://docs.anthropic.com/en/docs/claude-code/legal-and-compliance
- OpenAI Codex repository and CLI docs: https://github.com/openai/codex
- Google Gemini CLI repository and docs: https://github.com/google-gemini/gemini-cli
- Model Context Protocol specification and security docs: https://modelcontextprotocol.io/specification/2025-06-18
- MCP security best practices: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices

## Adapter Trust Tiers

- `official`: vendor-owned CLI and docs; recommended default.
- `community`: third-party tooling; opt-in and review source before enabling.
- `experimental`: limited validation; do not enable in sensitive environments.

## Maintainer Review Checklist

1. Does this adapter use only documented auth paths?
2. Does it avoid secret extraction or replay?
3. Are terms/policies linked in docs?
4. Is the adapter marked with the correct trust tier?
5. Are unsafe defaults avoided?
