# AGENTS.md

## Project Identity
- Project name: Zaman Takvimi
- Purpose: Personal calendar, reminder, and time-allocation analysis desktop app.
- Primary stack/runtime: Electron 31, HTML, CSS, vanilla JavaScript, localStorage.
- Owner/context: Personal Windows desktop app for Mert.

## Must-follow constraints
- If project identity, validation commands, or source locations look stale, refresh the project docs from the repository files before making behavior changes.
- Start every task by reading `docs/00-agent-orientation.md` and the task-relevant docs.
- Keep `AGENTS.md` short: mandatory rules, validation commands, and entrypoints only.
- Do not put long architecture explanations in `AGENTS.md`; put durable knowledge under `docs/`.
- Never commit real hostnames, usernames, passwords, tokens, API keys, private keys, certificates, VPN details, production config values, or customer/private data.
- Preserve user changes. Do not revert unrelated work unless the user explicitly asks.
- Follow existing project patterns before adding new abstractions.
- If behavior changes, update the relevant docs and add a short dated `PROGRESS.md` changelog entry.
- If a decision should be remembered after the current task, add an ADR under `docs/decisions/`.

## Read first
- Agent entrypoint: `docs/00-agent-orientation.md`
- Documentation rules: `docs/standards/agent-documentation-rules.md`
- Architecture docs: `docs/architecture/`
- Contracts: `docs/contracts/`
- Decisions: `docs/decisions/`
- Current status: `PROGRESS.md`
- Optional historical detail: `docs/history/progress-archive.md`

## Validation before finishing
- Code validation:
  - `node --check src/app.js`
  - `node --check src/main.js`
- Docs-only validation:
  - Review changed Markdown files for remaining template placeholders and broken local references.
- Secret/link checks:
  - `rg "SECRET|TOKEN|PASSWORD|API_KEY"`
- For docs-only changes, run Markdown/link/secret checks; runtime build/test is not required unless code or contracts changed.

## Important locations
- Source root: `src/`
- Main entrypoint: `src/main.js` for Electron, `src/index.html` for the UI.
- Tests: No automated test suite yet; use Node syntax checks and manual app smoke testing.
- Local config example: None; app state is stored in browser/Electron `localStorage`.
