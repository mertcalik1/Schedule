# Your Schedule

A personal calendar, reminder, routine, and time-allocation analysis app.

The app uses a shared HTML/CSS/vanilla JS core. Electron runs the desktop version, the PWA files support browser/mobile install surfaces, and Capacitor wraps the same app for Android and iOS native projects.

## What It Does

- Day, week, month, and year calendar views.
- Event creation/editing with categories, reminders, notes, and recurrence.
- Routine manager with drag-and-drop on desktop and tap-to-place on mobile.
- Routine completion tracking for scheduled routines.
- Bell notification control with a chat-style status popover.
- Category-based time analysis for the visible date range.
- Local persistence through localStorage.

## Run Locally

From this repository:

```powershell
cd src
pnpm install
pnpm start
```

If dependencies already exist, `pnpm start` is enough.

## Desktop Packaging

From `src/`:

```powershell
pnpm run package:win
pnpm run package:mac
```

Windows packaging can be produced on Windows. macOS `.app` / `.dmg` output should be produced on a Mac for signing/notarization and reliable DMG creation.

## Mobile Packaging

The mobile web bundle is generated into `src/www/`:

```powershell
cd src
pnpm run build:web
pnpm run cap:sync
```

Android project:

```powershell
cd src
pnpm run cap:open:android
```

Build the APK/AAB from Android Studio.

 iOS project:

```powershell
cd src
pnpm run cap:open:ios
```

Open and build/sign it on macOS with Xcode and an Apple Developer account.

## Project Layout

- `src/index.html`: App markup.
- `src/app.js`: Calendar, event, routine, reminder, recurrence, PWA, and analysis logic.
- `src/styles.css`: UI layout, desktop styling, and responsive mobile styling.
- `src/main.js`: Electron shell and development reload.
- `src/manifest.webmanifest`: PWA metadata.
- `src/sw.js`: PWA app-shell cache service worker.
- `src/capacitor.config.json`: Capacitor Android/iOS configuration.
- `src/scripts/build-web.cjs`: Builds the `www/` mobile web bundle.
- `src/android/`: Capacitor Android project.
- `src/ios/`: Capacitor iOS project.
- `src/assets/`: Logo and icon assets.
- `docs/`, `AGENTS.md`, `PROGRESS.md`: Agent-oriented project memory.

## Validation

```powershell
cd src
pnpm run check
pnpm run build:web
pnpm run cap:sync
```

## License

MIT