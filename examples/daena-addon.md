# Daena Add-On Example

Use MergeLoop as a structured council backend in a Daena workflow.

## Suggested Flow

1. Daena receives a high-impact task.
2. Daena calls `mergeloop_run` in `mode: "council"` with `workers: ["codex", "gemini", "local"]`.
3. Daena maps:
   - `synthesis_inputs` -> summary panel
   - `disagreements` -> validation queue
   - `recommended_next_checks` -> execution checklist
4. Daena re-runs council after evidence from checks is collected.

## Example Request

```json
{
  "task": "Propose safe DB migration rollout with rollback steps.",
  "mode": "council",
  "workers": ["codex", "gemini", "local"],
  "output_format": "json"
}
```
