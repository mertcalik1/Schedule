# Publishing Your Schedule on GitHub

## Include in the repository

- `README.md`, `LICENSE`, `.gitignore`
- `src/index.html`, `src/app.js`, `src/styles.css`, `src/main.js`
- `src/package.json`, `src/pnpm-lock.yaml`, `src/pnpm-workspace.yaml`
- `src/assets/`, `src/scripts/`, `src/manifest.webmanifest`, `src/sw.js`
- `src/capacitor.config.json`
- `src/android/` and `src/ios/` project files, if you want others to build mobile apps

## Do not include

- `src/node_modules/`
- `src/www/`
- `src/dist/`, `dist/`, `build/`, `out/`
- Android/iOS generated build folders, Pods, DerivedData, copied public assets
- Signing files such as `.pfx`, `.pem`, `.key`, `.jks`, `.keystore`
- Packaged app outputs such as `.zip`, `.dmg`, `.exe`, `.msi`, `.pkg`

## Before pushing

```powershell
cd src
pnpm install
pnpm run check
pnpm run build:web
pnpm run cap:sync
```

## Build notes

- Windows installer builds can be created on Windows with `pnpm run package:win`.
- macOS `.app` / `.dmg` builds must be created on macOS with `pnpm run package:mac`.
- iOS builds must be opened and signed on macOS with Xcode and an Apple Developer account.
- Android builds should be opened in Android Studio from `src/android`.

