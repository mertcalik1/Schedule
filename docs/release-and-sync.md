# Your Schedule Release and Sync Checklist

## Supabase setup

1. Create a Supabase project.
2. Enable Email + Password auth in Authentication > Providers.
3. Run `docs/supabase-sync.sql` in the Supabase SQL editor.
4. In the app, open User settings > Cloud sync and enter:
   - Supabase project URL
   - Supabase anon public key
   - Email and password

The anon key is safe to ship in a client app when Row Level Security is enabled. Do not put service-role keys in the app.

## Desktop auto-update

1. Increase `src/package.json` `version` for every release.
2. Build with `pnpm run package:win` on Windows or `pnpm run package:mac` on macOS.
3. Publish the generated installer/DMG plus `latest.yml` / `latest-mac.yml` metadata to GitHub Releases.
4. For macOS direct distribution, sign and notarize the app with an Apple Developer ID certificate.

`electron-updater` only checks for updates in packaged builds.

## Android

1. Increase `versionCode` and `versionName` in `src/android/app/build.gradle`.
2. Run `pnpm run build:web` and `pnpm run cap:sync`.
3. Build a signed Android App Bundle from Android Studio.
4. Upload the `.aab` to Google Play Console.

Google Play updates require the same `applicationId` and a higher `versionCode`.

## iOS

1. Increase the Xcode marketing version and build number.
2. Run `pnpm run build:web` and `pnpm run cap:sync`.
3. Archive in Xcode and distribute through TestFlight or App Store Connect.

iOS App Store builds must not update app code outside Apple's review flow. Data sync through Supabase is fine; feature/code updates should ship as new app builds.
