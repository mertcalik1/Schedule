# Agent Orientation

This file is the first-read route for coding agents opening the project. Follow the route that matches the task; do not scan historical progress before task-relevant docs.

## Read first

- Docs map: [[README]]
- Documentation rules: [[standards/agent-documentation-rules]]
- Architecture notes: [[architecture/README]]
- Contract notes: [[contracts/README]]
- Decision records: [[decisions/README]]

## Task routes

### Code change

1. `AGENTS.md`
2. This file
3. Relevant architecture or module note
4. Relevant source and test files
5. `PROGRESS.md`

### Public API, contract, or data model

1. Relevant contract or data model note under [[contracts/README]]
2. Relevant architecture note
3. Affected consumer docs
4. `PROGRESS.md`

### Documentation change

1. [[standards/agent-documentation-rules]]
2. Relevant docs note
3. `PROGRESS.md`

## Update rule

- If behavior changes, update the relevant docs note.
- If a durable architecture decision changes, add or update a decision record under `docs/decisions/`.
- For meaningful changes, add a short dated changelog entry to `PROGRESS.md`.
- Read [[history/progress-archive]] only when historical detail is needed; do not treat it as current truth.

## Related

- [[README]]
- [[standards/agent-documentation-rules]]
- [[architecture/README]]
- [[contracts/README]]
- [[decisions/README]]
- [[history/README]]
