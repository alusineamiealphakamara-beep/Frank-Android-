# Android APK build

This project is now prepared to be packaged as an Android app with Capacitor.

## No computer needed

1. Upload this project to a GitHub repository.
2. Open the repository's **Actions** tab.
3. Select **Build Android APK**.
4. Press **Run workflow** (or push to `main`).
5. When the workflow finishes, open the workflow run and download the artifact named `football-lineup-graphic-debug-apk`.
6. Extract the ZIP and install `app-debug.apk` on your Android phone.

## Local build (computer)

```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

The APK will be at:
`android/app/build/outputs/apk/debug/app-debug.apk`

The app ID is `com.frank.lineupgraphic`.
