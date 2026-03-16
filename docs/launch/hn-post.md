# Suggested HN Title

Show HN: MergeLoop - Host-agnostic model council over MCP and CLI workers

# Suggested HN Body

MergeLoop is an orchestration middle layer between hosts and workers.

Host and worker are separate:
- Host = user entrypoint (Claude Code, generic MCP host, wrappers)
- Worker = execution target (CLI today, MCP/API patterns documented)

MergeLoop returns one merged output:
- worker results
- synthesis inputs
- disagreements
- recommended next checks

Positioning is subscription-first and local-first:
- bring your own host
- bring your own workers
- API optional, not required

Would appreciate feedback on adapter ergonomics and support-level clarity.
