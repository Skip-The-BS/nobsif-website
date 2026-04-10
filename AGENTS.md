# NO BS IF — Agent Context

This file gives AI agents full context for the **nobsif-website** repo. Read it before touching anything.

For organisation-level context (manifesto, privacy standard, accessibility standard, FAQ standard) also read `AGENTS.md` in the `skipthebs-website` repo at the same directory level.

---

## What this repo is

Product website for **NO BS IF** — an intermittent fasting tracker for iOS and Android. Lives at `nobsif.app`. Part of the Skip the BS app suite.

Pure HTML/CSS/JS. No frameworks. No build step. Deploy by dragging to Netlify or pushing to GitHub (`skipthebs-app` org).

---

## The app

**NO BS IF** does one thing: intermittent fasting tracking.

- Timer that fills a ring as the fast progresses
- Streak counter
- Fix-the-time: if you forgot to start, you can correct it after
- History and stats
- Import / export (your data, your device, goes where you go)
- 8 themes total: Ocean default plus ICE light mode free; 6 more as a single one-time unlock
- No ads. No subscription. No coaching. No community.

**Pricing:**
- Free tier: full core app, Ocean and ICE themes, history, notifications, import/export
- One-time unlock ($0.99): all 6 additional themes + any future themes + home screen widget

---

## Organisation context

NO BS IF is published under the **Skip the BS** umbrella. The parent brand site is at `skipthebs.app`. Organisation-level standards (privacy policy, accessibility commitment, FAQ) are defined there and **mirrored here** so this site is fully self-contained.

Mirrored pages on this site:
- `/privacy` — mirrors `skipthebs.app/privacy` (same policy, all apps covered)
- `/accessibility` — mirrors `skipthebs.app/accessibility` + NO BS IF-specific detail
- `/faq` — mirrors `skipthebs.app/faq` + NO BS IF-specific questions

When the org-level content changes on the skipthebs site, update the mirrored pages here to match. App-specific additions are fine; contradictions are not.

---

## Pages

```
nobsif.app/             ← product homepage (hero, features, pricing, themes, accessibility)
nobsif.app/privacy      ← privacy policy (mirrored from skipthebs, self-contained)
nobsif.app/accessibility ← accessibility commitment (mirrored + app-specific)
nobsif.app/faq          ← FAQ (org-level + app-specific questions)
```

Footer currently links to these pages. The nav has no utility links — logo + "BY SKIP THE BS →" only.

---

## Utility page conventions

Utility pages (privacy, accessibility, faq) follow the same pattern:
- Nav: NOBSIF logo (left) + ← BACK link (right, goes to `/`)
- Doc header: eyebrow label, large title, meta line
- Accent colour for highlights: `var(--accent)` (teal in Ocean theme, theme-reactive)
- Footer: NOBSIF logo + footer links (SKIP THE BS, PRIVACY, ACCESSIBILITY, FAQ, SUPPORT)
- Inline `<style>` block for doc-specific styles (not in style.css)
- No glow divs, no phone mockup — clean document layout

---

## Design system

### Theme tokens (CSS variables — Ocean default, JS overrides on theme switch)
```
--bg:           #080f11   /* near-black ocean */
--surface:      #0d1a1e   /* card backgrounds */
--border:       #122228
--border2:      #1a3040
--text:         #f0ede8   /* parchment */
--muted:        #8aaa9a
--dimmed:       #67877f
--faint:        #2a5060
--accent:       #2a8fa0   /* Ocean teal — varies by theme */
--accent-text:  #080f11
--green:        #bada55   /* MOSS accent — used for pricing badge */
--orange:       #e8673a   /* alert only */
```

### 8 themes
| Theme    | Accent    | Bg        | Type      | Status       |
|----------|-----------|-----------|-----------|--------------|
| OCEAN    | #2a8fa0   | #080f11   | Dark      | FREE DEFAULT |
| ICE      | #1a8aa8   | #f8fdff   | **Light** | FREE         |
| MOSS     | #bada55   | #0d1a0f   | Dark      | One-time     |
| SOIL     | #8b5e3c   | #110c08   | Dark      | One-time     |
| GLAM     | #d47fa6   | #1a0d14   | Dark      | One-time     |
| SOLAR    | #d4aa3a   | #1a1608   | Dark      | One-time     |
| CRIMSON  | #c45c6a   | #1a080a   | Dark      | One-time     |
| GRAPHITE | #8a8a8a   | #0f0f0f   | Dark      | One-time     |

ICE is the free light mode option — light mode access is never paywalled.

### Typography
- **Space Mono 700** — headings, labels, nav, buttons, monospace UI text
- **Space Mono 400** — secondary labels, metadata
- **DM Sans 300/400** — body copy, descriptions
- Do not use Inter, Roboto, Arial, or system fonts

### Minimum font sizes
- Body copy: 18px (16px mobile)
- Nav/footer links: 11–12px
- Micro labels: 11px minimum (decorative only — never for readable content)

---

## Privacy standard (applied here)

No data collection of any kind. No analytics. No crash reporting. No advertising identifiers. All fasting data stays on the user's device. Purchases handled entirely by Apple/Google. If you contact us by email, we reply and don't retain longer than needed. Full policy at `/privacy`.

---

## Accessibility standard (applied here)

Every feature of NO BS IF is built to the Skip the BS accessibility baseline:
- VoiceOver and TalkBack — full support, meaningful labels on everything
- Voice Control — every action completable without touch
- Dynamic Type — all sizes supported, nothing clips
- Reduced Motion — respects system preference
- WCAG 2.1 AA — every theme validated including paid ones
- Colour never the only signal
- ICE (light mode) is free — accessibility never paywalled
- All touch targets ≥ 44×44pt

---

## Technical setup

- `npm start` — local dev server (default port 3000, `PORT` env var to override)
- Fonts via Google Fonts CDN
- Theme switching: `main.js` — `THEMES` object, `applyTheme()` function
- No frameworks, no build step
- Favicon: `nobsif-icon.svg` (SVG, path-based recreation of the app icon)
- Apple Touch Icon: `nobsif-icon.png` (Apple doesn't support SVG for touch icons)

---

## What NOT to do

- No cookie banner, no analytics, no newsletter signup, no social links
- No utility links (privacy, accessibility, faq) in the main nav
- App Store / Play Store buttons currently use `href="#"` — leave as-is until real URLs are available
- Do not add a SKY theme
- Do not remove the theme switcher or the phone mockup from the homepage
- Do not link to `skipthebs.app/privacy` etc. from the footer — use local `/privacy` etc. so the site is self-contained
