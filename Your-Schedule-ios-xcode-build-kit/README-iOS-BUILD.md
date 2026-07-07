# Your Schedule iOS / Apple Build Kit

This archive contains the Capacitor iOS project for Your Schedule.

Build requirements:
- macOS
- Xcode
- Apple Developer account for device/App Store signing
- Node.js and pnpm if you want to resync web assets

Recommended flow on macOS:
1. Open `App/App.xcodeproj` in Xcode.
2. Select your Team and signing settings.
3. Build/run on simulator or a real device.
4. For App Store distribution, archive from Xcode Organizer.

If you change web files, run from the main project `src/` folder:

```bash
pnpm install
pnpm run cap:sync
```
