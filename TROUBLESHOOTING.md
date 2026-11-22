# M1 Troubleshooting — "npm says my project has vulnerabilities!"

> **TL;DR:** Those `npm audit` warnings are **normal and safe to ignore** in an Expo
> project. **Never run `npm audit fix --force`** — it breaks your app. If you already
> did, jump to [Recovery](#recovery).

---

## 1. Why does `npm audit` show "25 vulnerabilities"?

Because they live in Expo's **build-time tooling** — the programs that run on *your
laptop* when you type `npx expo start` (e.g. `@expo/cli`, `xcode`, `@xmldom/xmldom`,
`tar`, `body-parser`). **None of that code ships to the phone in your app.**

So for a learning app (and even real production Expo apps) these warnings are:
- **expected** — every Expo project shows them,
- **not your app's security problem**, and
- **not removable** without breaking Expo itself.

That's why "the vulnerabilities are always there" — they're part of the toolchain.

## 2. Why is `npm audit fix --force` dangerous?

`--force` tries to silence the advisories by **upgrading Expo itself** (e.g. SDK 58 to
the next SDK). That drags `react-native` and `react` to versions your activity was
never built for. The result is the wall of `Conflicting peer dependency` warnings and a
broken app (red error screen / Metro won't bundle).

**The Expo SDK is a *tested set* of versions. Changing one breaks the set.**

✅ Do this instead → nothing. Leave the audit output alone. Check health with
`npx expo-doctor`, never `npm audit`.

---

## 3. Recovery — undo `npm audit fix --force` {#recovery}

Your own code (`App.js`, etc.) is safe — we only reset the dependencies.

**Step 1 — restore the activity's original `package.json`.** Re-extract it from the
Telebort activity ZIP, or paste back the correct one. M1 SDK-58 baseline (the values
that matter): `"expo": "~58.0.26"`, `"react": "19.3.0"`, `"react-native": "0.88.1"`
(and Node.js 22.13 or newer).
(Keep each activity's own feature deps — e.g. activity-06 keeps the `@react-navigation/*`
packages; activity-07 keeps `@react-native-async-storage/async-storage`.)

**Step 2 — clean reinstall.**

Windows (PowerShell):
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install --legacy-peer-deps
npx expo install --fix
npx expo start --clear
```

macOS / Linux:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npx expo install --fix
npx expo start --clear
```

**Step 3 — verify health with the RIGHT tool:**
```bash
npx expo-doctor
```

> ⚠️ Order matters: `expo install --fix` aligns packages to whatever Expo version is in
> `package.json`. If you skip Step 1, it will "fix" you toward the *broken* SDK. Restore
> `package.json` to `expo: ~58.0.26` **first**.

---

## 4. The mental model: React Native ≠ plain JavaScript

This is the real lesson. A web/JS project and an Expo project manage dependencies
differently:

| | Plain web / JavaScript | Expo / React Native |
|---|---|---|
| **Who picks versions?** | You — `npm install x@latest` is fine | **The Expo SDK** (a tested matrix) |
| **Add / install a package** | `npm install x` | **`npx expo install x`** |
| **Health check** | `npm audit` | **`npx expo-doctor`** |
| **"Upgrade everything"?** | usually safe | **breaks the app** |

> **One line to remember:** *In Expo, the SDK version is the boss. You don't install the
> newest package — you install the one the SDK was tested with. `expo install` and
> `expo-doctor` are your tools; `npm audit fix` is not.*

---

## 5. The only commands you need for M1

```bash
npm install --legacy-peer-deps   # first time (note the flag!)
npx expo install <package>        # to ADD a package (SDK-correct version)
npx expo install --fix            # realign everything to the SDK
npx expo start --clear            # run, clearing Metro cache
npx expo-doctor                   # check project health
```

*Not on the list, on purpose: `npm audit`, `npm audit fix`, `npm install <pkg>@latest`.*

---

## 6. "The QR code will not load" or "incompatible SDK"

**iPhone: sign in first.** Expo Go on an iPhone only loads a project when the terminal and the
Expo Go app are signed in to the **same** Expo account. A parent or tutor creates the free account
at expo.dev (never create it alone, never paste its password into a chat or Notes Doc). Then:

```bash
npx expo login
```

and in Expo Go open the **Home** tab, tap the avatar icon (top right) and sign in with the same
account. Scan the QR code again.

**Still stuck? Work down this list:**
1. Phone and laptop on the **same Wi-Fi**, VPN off. Some school and shared networks block a phone
   from reaching a laptop.
2. Restart through a tunnel: `npx expo start --tunnel` (needs `npx expo login`).
3. Put the laptop on a phone **hotspot** (ask the owner; it uses mobile data), then `npx expo start`.

**"Project is incompatible with this version of Expo Go"** means the Expo Go app and this project
use different Expo SDKs. This course is SDK 58: update Expo Go from the store and scan again. Do not
edit `package.json` or run `npx expo install --fix` to silence it. If the store version is still
older than SDK 58, use the browser preview (press `w`) and tell your tutor.

**Show the tutor:** the AI tutor cannot see your phone or terminal. Paste the exact error text and
add a screenshot of the phone screen to your Notes Doc.
