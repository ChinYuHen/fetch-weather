# Activity 12 — Fetch Weather

> **🛠️ Stack for this lesson** — Expo SDK 58 / React Native 0.88 · runs in Expo Go on a real phone.
> 📥 Template: [/learn/m1/template/activity-11-fetch-weather](/learn/m1/template/activity-11-fetch-weather)

A weather lookup app that takes a city name, asks a free weather service (Open-Meteo, no API key needed) two questions and shows the answer. The input, `WeatherCard`, `LoadingSpinner` and `ErrorMessage` are wired up; you write the requests and the transform in `services/WeatherAPI.js`, and the loading and error plumbing in `App.js`.

**Time:** ~45 minutes for the core path (TODOs 1 to 3) · **Concept:** Concept 12 — API Integration Basics

---

## What You'll Build

| # | Outcome | File |
|---|---------|------|
| 1 (a and b) | `fetchWeather(city)` turns a city name into coordinates, requests the current weather and returns `{ temperature, condition, description, humidity, windSpeed }` with a whole-number temperature; an unknown city throws an error whose message includes "City not found" | `services/WeatherAPI.js` |
| 1 (b) | `condition` is one of the words the starter's icon table understands (for example Clear, Clouds, Rain, Snow), mapped from the weather code | `services/WeatherAPI.js` |
| 2 | App shows the spinner for the whole request and always leaves the loading state, whether it worked or failed | `App.js` |
| 3 | A failure becomes a friendly message: "City not found" echoing the city, a network message if it sounds like a connection problem, otherwise a generic line | `App.js` |

The transform target is a plain object, `{ temperature, condition, description, humidity, windSpeed }`, with a whole-number temperature. Sample responses for both requests are at the bottom of `services/WeatherAPI.js`; the Open-Meteo docs list the parameters and the weather-code table. The service needs no key, and a real key must never be pasted into an app.

## Run It

```bash
npm install --legacy-peer-deps
npx expo start
```

Scan the QR code with **Expo Go** on a phone that's on the same Wi-Fi as your computer, or press `w` to preview in a browser. On an iPhone, run `npx expo login` first and sign in to the same Expo account in Expo Go (a parent or tutor creates the account). If the QR code will not load, try `npx expo start --tunnel`; see `TROUBLESHOOTING.md`.

## Verify

Your activity is done when, on a real device:

- [ ] a real city shows a brief spinner, then the card with whole-number temperature, condition, humidity and wind
- [ ] "asdf" shows a "City not found" message with Retry
- [ ] with Wi-Fi off the app shows a network message and does not crash
- [ ] tapping Retry after reconnecting loads the weather

The lesson page adds a few write-up checks for your Notes Doc: your predictions and what you found.

## Stretch

Pick one and write what you tried in your Notes Doc:

- **Your theme.** Show something other than weather from a keyless public API: a joke, a country fact, a space photo. Keep loading, error and ready.
- Save the last good result in AsyncStorage so reopening feels instant.
- Add a unit switch between Celsius and Fahrenheit without fetching again.
- Show a five-day row using the forecast's daily fields.

## Show It

In a Notes Doc named `Activity 12 write-up`, answer three prompts: **what I built**, **how I know it works** (name your phone and OS), and **one thing I would change**. Add one AI-use line: "I asked the tutor ___. I decided ___ myself." The lesson page has the full prompts and your Explore question.

## 🪞 Reflect on Your Work

Answer in 2-3 sentences each, in your Notes doc. Your tutor reads these as part of grading.

1. **What did you learn that you didn't know before?** Name the most surprising thing — a bug you hit, a syntax quirk, a way the simulator and real device differ.
2. **How did you collaborate with AI?** If you used Claude / ChatGPT / Cursor / Copilot, what part of the work did *you* contribute — the prompt, the verification, the design decision, the bug-fix? If you didn't use AI, what was the hardest thing to figure out alone?
3. **How do you know your code works?** Describe one specific thing you did to confirm — a test you ran, a screenshot you took, a behavior you watched on the device.

> AI is a great collaborator. Owning your thinking, verifying the output, and explaining your design choices is what *learning* looks like in this course.

## Submit

When the Verify checklist is green, submit the link to your Notes doc, then Mark as Complete.

<!-- claude-template-fix: readme-v3 -->

<!-- claude-template-fix: notes-migration-v1 -->
