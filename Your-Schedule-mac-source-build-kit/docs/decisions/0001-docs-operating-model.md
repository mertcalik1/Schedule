# 0001 - Docs Operating Model

## Decision

This project uses an agent-optimized Markdown model: `AGENTS.md` is the short mandatory rule surface, `PROGRESS.md` is short current truth, durable knowledge lives under `docs/`, and historical detail lives under `docs/history/`.

## Rationale

When coding agents open a project for the first time, they should read current truth and task-specific docs instead of long changelogs. This model reduces context waste and lowers the risk of treating old information as current truth.

## Consequences

- Meaningful changes update the relevant docs note and a short `PROGRESS.md` changelog entry.
- Old long-form detail is archived.
- Notes are connected with vault-root wikilinks and `Related` sections for Obsidian graph use.

## Related

- [[README]]
- [[00-agent-orientation]]
- [[standards/agent-documentation-rules]]
