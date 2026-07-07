# Architecture Notes

This directory stores durable architecture knowledge. The number of notes can grow with the project; every new note must link back to this README or another hub note.

## Starting notes

- System boundaries: Local desktop-only personal calendar app. It does not use a backend service or remote API.
- Main modules: `src/main.js` creates the Electron window and live reload; `src/index.html` defines the UI; `src/app.js` manages calendar state, reminders, recurrence, localStorage persistence, and rendering; `src/styles.css` owns layout and visual design.
- Data and contract ownership: Event records are private local data stored in localStorage under `zaman-takvimi-events-v1`; routine templates use `zaman-takvimi-routines-v1`; daily routine completion ticks use `zaman-takvimi-routine-completions-v1`. There is no public API contract yet.
- Runtime and deployment model: Electron desktop app launched from `src/` during development; future packaging can produce a Windows `.exe` installer.

## Current Behavior

- Calendar supports day, week, month, and year views.
- Day view covers 00:00 through 23:00 as hourly rows with a visible half-hour divider; events are positioned inside the hour row by their actual start minute.
- Clicking a day or hour opens an event modal.
- Events support title, start/end time, category, reminder offset, recurrence, and notes.
- The event form keeps the default duration at one hour by syncing end time to start time plus one hour whenever start time changes.
- Routines are editable draggable activity templates stored in localStorage; the sidebar shows a gear edit button and routine create, update, and delete actions live in a separate routine manager modal.
- Month and week views show a full-width horizontal routine completion card below the calendar. It lists only routines that were scheduled onto the selected day, routine ticks persist per date and scheduled routine, and due scheduled routines can trigger a short in-app alarm plus a system notification when notification permission is granted.
- Notification UI is a bell button with a small chat-style status popover.
- The left sidebar collapses horizontally from left to right; a hamburger button controls it and the notification bell stays pinned at the bottom of the sidebar.
- Time analysis summarizes visible-range event duration by category.

## Related

- [[00-agent-orientation]]
- [[standards/agent-documentation-rules]]
- [[contracts/README]]
- [[decisions/README]]
