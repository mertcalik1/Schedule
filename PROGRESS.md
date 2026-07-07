# PROGRESS

## Current Truth
- Project: Your Schedule
- Purpose: Personal calendar, reminder, and time-allocation analysis desktop app.
- Branch: `main`
- Runtime/stack: Electron 31 desktop shell plus PWA/Capacitor mobile wrappers with static HTML/CSS/vanilla JavaScript UI.
- Current architecture summary: Electron loads `src/index.html`; UI logic lives in `src/app.js`; styling in `src/styles.css`; PWA metadata/cache lives in `src/manifest.webmanifest` and `src/sw.js`; Capacitor mobile output builds through `src/scripts/build-web.cjs` into `src/www/`; Android/iOS projects live in `src/android/` and `src/ios/`; event data persists in localStorage.
- Code validation: `node --check src/app.js`; `node --check src/main.js`
- Docs-only validation: Review changed Markdown files for template placeholders and broken local references.
- Secret/link checks: `rg "SECRET|TOKEN|PASSWORD|API_KEY"`

## Active Follow-ups
- Produce signed release builds: Windows installer on Windows, macOS `.app`/`.dmg` on Mac, Android APK/AAB in Android Studio, and iOS build in Xcode with Apple Developer signing.
- Add stronger reminder behavior if the app needs to notify while fully closed.

## Recent Changelog
- 2026-07-05: **Simplified routine sidebar controls.** Replaced the routine plus/minus buttons with a single gear edit button that opens the routine manager.
- 2026-07-05: **Matched routine tracking to scheduled routines.** Made the routine tracking panel full calendar width and changed it to show only routines scheduled on the selected day.
- 2026-07-05: **Changed day timeline minute display.** Day view now keeps hourly labels, shows half-hour divider lines, and positions events by their actual start minute within each hour.
- 2026-07-05: **Refined routine tracking and day slots.** Made the routine tracking panel a wider horizontal rectangle and changed day view to 30-minute time rows for better event alignment.
- 2026-07-05: **Moved routine tracking below the calendar.** Changed the routine tracking panel from a side square card to a half-width rectangular card under the calendar.
- 2026-07-05: **Separated the routine tracking card.** Removed the sidebar quick event panel and moved routine tracking into a separate square card beside the calendar in month and week views.
- 2026-07-05: **Added routine completion tracking.** Month and week views now show a selected-day routine checklist, persist routine ticks by date, and trigger routine alarms at scheduled times.
- 2026-07-05: **Moved routine editing into a manager modal.** Simplified the sidebar routine area to plus/minus controls and moved routine create, edit, and delete actions into a separate window.
- 2026-07-05: **Made routines editable.** Added localStorage-backed routine create, edit, and delete controls.
- 2026-07-05: **Added draggable routines.** Added a sidebar routines section with predefined daily activity templates that can be dragged onto calendar days or day-view hours.
- 2026-07-05: **Synced event end time to start time.** Changing an event start time now automatically sets end time to one hour later.
- 2026-07-05: **Changed sidebar collapse direction.** Replaced the vertical collapse control with a hamburger-style left/right sidebar collapse.
- 2026-07-05: **Adjusted sidebar behavior.** Moved the notification bell to the bottom of the left panel and added a top collapse/expand control for the sidebar.
- 2026-07-05: **Integrated Your Schedule into agent docs scaffold.** Added app files under `src/`, initialized project identity, validation commands, architecture notes, and current progress.
- 2026-06-29: **Public release polish.** Updated README positioning for `agent-docs-starter` and added MIT license. Runtime behavior unchanged.
- 2026-06-29: **Template cleanup.** Added bootstrap guidance, contracts docs, English canonical wording, validation placeholders, and vault-root wikilink consistency. Runtime behavior unchanged.

## Archive
- Older detailed entries belong in `docs/history/progress-archive.md`.
- Archive files are historical lookup material only.
