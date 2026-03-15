# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

- Added launch-focused README with support matrix and FAQ.
- Added demo visuals (`workflow.svg`, `social-card.svg`, `output-example.svg`, `host-matrix.svg`).
- Added docs suite: quickstart, FAQ, security, launch guide, release checklist.
- Added launch copy pack under `docs/launch/`.
- Added smoke test script (`npm run smoke`) that does not depend on vendor CLIs.
- Added reproducible storyboard render script (`npm run demo:render`).
- Added example request files for single/council/custom/local and Daena add-on usage.
- Added trust docs (`SECURITY.md`, `ROADMAP.md`).

## [0.1.0] - 2026-03-14

- Initial release with:
  - Council Hub MCP server
  - Claude Code plugin packaging
  - `council_run` tool
  - built-in workers (`codex`, `gemini`, `local`)
  - custom worker support
