# Agent Documentation Rules

This file defines the canonical documentation model for consistent, efficient coding-agent work in new projects.

## Source of Truth

- `AGENTS.md`: mandatory rules, validation commands, and first-read entrypoints.
- `PROGRESS.md`: current truth, active follow-ups, and recent short changelog.
- `docs/architecture/`: durable architecture and system behavior.
- `docs/contracts/`: create or use when the project has public APIs, schemas, data models, wire formats, or cross-project contracts.
- `docs/decisions/`: ADR-style durable decision records.
- `docs/history/`: archive only. This is not current truth.

## Agent Reading Order

1. `AGENTS.md`
2. `docs/00-agent-orientation.md`
3. Task-specific docs notes
4. `PROGRESS.md`
5. `docs/history/` only when historical detail is needed

## Update Matrix

- Runtime behavior change: update related architecture/module docs and `PROGRESS.md`.
- API/contract/data model change: update contract docs, consumer docs, and `PROGRESS.md`.
- Permanent decision: add or update `docs/decisions/*`; summarize in `PROGRESS.md`.
- Docs-only cleanup: update links, `Related` sections, and `PROGRESS.md` if meaningful.
- Old detailed changelog: move to `docs/history/progress-archive.md`.

## PROGRESS.md Rules

- Keep it short enough for first-read agent context.
- Put current truth at the top.
- Keep recent changelog short.
- Do not store real secrets, hostnames, production config, or private customer data.
- Archived history must not be treated as current guidance.

## Obsidian Rules

- Open `docs/` as vault root.
- Every durable note should link to at least one hub or related note.
- Use vault-root wikilinks such as `[[architecture/README]]`.
- Do not use parent-directory wikilinks.
- Do not commit `.obsidian/`.

## Related

- [[00-agent-orientation]]
- [[README]]
- [[architecture/README]]
- [[contracts/README]]
- [[decisions/README]]
