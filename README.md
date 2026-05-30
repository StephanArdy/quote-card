# QuoteCard Studio

A tiny Next.js web app that renders **deterministic, share-ready quote cards** via URL parameters.

Open a link, get a fixed-size canvas, and feed the result into your automation/content pipeline.

## What It Does

- Gallery of sample quotes at `/`
- Quote preview + variant picker at `/card/:id`
- Render mode at `/render/:id` (card only, fixed dimensions, no scrollbars)

## Features

- Deterministic rendering: the same URL always produces the same card
- Fixed-size render canvas (no scrolling / no UI chrome)
- 3 social ratios: square, landscape, and story
- Variant controls via URL query params (ratio/theme/accent/background/alignment)
- 10 built-in sample quotes (no database needed)
- Modern UI using Tailwind + shadcn/ui

## Deterministic Variants (Query Params)

All params are optional. Unknown/invalid values fall back to defaults.

- `ratio`: `1x1 | 16x9 | 9x16`
- `theme`: `light | dark`
- `accent`: `teal | purple | orange`
- `bg`: `gradient | mesh | noise`
- `align`: `left | center`

Defaults:

`ratio=1x1&theme=dark&accent=teal&bg=mesh&align=left`

## Canvas Sizes (Pixel-Perfect)

`/render/:id` is always exactly:

- `1x1` → `1080×1080`
- `16x9` → `1200×675`
- `9x16` → `1080×1920`

## Design Guidelines

These are guardrails to keep renders clean and consistent.

- Render mode (`/render/:id`) must remain chrome-free: no headers, footers, or overlays.
- The render canvas must be pixel-exact for each ratio and must not scroll (overflow hidden).
- Avoid randomness and time-based visuals (no `Math.random()`, no “current time”, no animated effects).
- Prefer CSS-only backgrounds (mesh/gradient/noise) with deterministic parameters (no external image assets).
- Keep typography stable: consistent line-height/letter-spacing, and avoid layout that depends on viewport size in render mode.
- Maintain contrast and legibility across themes (light/dark) and accents (teal/purple/orange).
- Keep spacing generous and aligned to a simple rhythm; use subtle borders and soft glows instead of heavy shadows.

## Example URLs

- Square dark:
  `/render/ship-fast?ratio=1x1&theme=dark&accent=teal&bg=mesh&align=left`
- Wide light:
  `/render/ship-fast?ratio=16x9&theme=light&accent=orange&bg=gradient&align=center`
- Story:
  `/render/ship-fast?ratio=9x16&theme=dark&accent=purple&bg=noise&align=center`

## Run Locally

```bash
npm install
npm run dev
```

If port `3000` is busy, pick another one:

```bash
npm run dev -- --port 3100
```

Then open:

- http://localhost:3100/

## Notes

- There is no randomness: the same URL should always render the same visual.
- No image export endpoint: visuals are captured by the browser/agent.
