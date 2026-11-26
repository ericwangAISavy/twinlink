# hcompany.ai reproduction

Local frontend reproduction of <https://hcompany.ai/>. On 2026-11-26 the project owner stated that they
hold H Company's written permission for a full reproduction (name, logo, copy, images, graphics).
The permission document is not in this repository. Confirm it covers any publication before this branch
is pushed, deployed or merged: **merging to `main` would replace the TwinLink homepage in production.**

## Status

| Item | State |
| --- | --- |
| Homepage `/`, header, dropdowns, mobile menu, footer | Reproduced and compared |
| All other reference pages | **Not built.** Links resolve to the live reference site (`src/components/reference/links.ts`) |
| TwinLink auth, dashboard, admin and other public pages | Kept unchanged. Their "home" links now lead to the new `/` |
| Previous TwinLink homepage and its six components | Removed (recoverable from commit `449d02d`) |

Pages still to reproduce: `/enterprise`, `/agents-api`, `/models-api`, `/holotab`, `/h-platform`,
`/pricing`, `/research`, `/research/models`, `/research/publications`, `/technical-blog`, `/use-cases`,
`/solutions/systems/solidworks`, `/events`, `/newsroom` and its articles, `/press`, `/about`, `/team`,
`/careers`, `/contact`, and the legal pages. `/about`, `/careers` and `/contact` exist locally as TwinLink
pages and will need a routing decision. This list comes from homepage navigation; a full crawl is pending.

## Inventory

Section order: header (40px announcement + 72px bar), hero, "Built for a fragmented world",
"One platform. Four ways in.", "Proven in production.", research, "What's new?", closing cards, footer.

| Property | Measured value |
| --- | --- |
| Fonts | Plus Jakarta Sans 200–800, Fira Code 300–700 (both OFL) |
| Container | 72rem, 24px side padding |
| Section padding | 48px, 80px from 640px |
| Section title | 36/40, 500, -0.025em |
| Accent | `#5a04bc` buttons and labels, `#2c0264` hover |
| Radii | 6px, 8px (buttons), 12px (cards) |
| Breakpoints | 640, 768, 1024px |
| Entrance | 16px rise and fade, 0.8s, `cubic-bezier(.22,1,.36,1)`, staggered |
| Platform section | From 1024px: pinned for 400vh, scroll picks 1 of 4 tabs. Below: segmented tabs |
| Header | Announcement slides away on scroll; white bar fades in |

## Measured similarity

`npm run visual-qa`, 2026-11-26, Chrome, DPR 1, reduced motion, third-party consent and analytics blocked,
first platform tab selected on both pages. pixelmatch threshold 0.1, anti-aliased pixels not counted.
Full-page figures. White space counts as matching, so read them together with the text geometry column.

| Width | Full page | Hero canvas hidden | Page height ref / local | Text elements within 1px, same type and colour |
| --- | --- | --- | --- | --- |
| 1920 | 99.825% | 99.998% | 5503 / 5503 | 182 / 182 |
| 1440 | 99.877% | 99.997% | 5368 / 5368 | 182 / 182 |
| 1280 | 99.901% | 99.996% | 5293 / 5293 | 182 / 182 |
| 1024 | 99.908% | 99.996% | 5297 / 5297 | 182 / 182 |
| 768 | 99.887% | 99.994% | 7244 / 7244 | 172 / 172 |
| 390 | 99.936% | 99.984% | 7372 / 7372 | 170 / 170 |

The reference is live, so later runs change when its content changes. Screenshots, difference images and
JSON reports are written to `.visual-qa/` (ignored by Git).

## Known differences

Not covered by the figures above, which are static captures:

- **Hero dot field** is an original canvas implementation. Cloud shapes, density, drift and pointer
  response differ from the reference.
- **Motion was approximated by observation**, not measured frame by frame: platform panel transition,
  browser-agent cursor loop (the reference's Browser/Desktop switching is not animated), HoloTab card
  fan, benchmark bars, number count-up, dropdown entrance. The code-tab typing behaviour was not studied.
- **Dropdowns and mobile menu** were built from measurements and checked by eye; no pixel diff was run.
- **Hover states** were measured for the two hero buttons; others follow the reference class names.
- Under reduced motion the reference leaves the last platform tab selected after scrolling past; the local
  page keeps the visitor's selection.
- Cookie consent banner and analytics are intentionally absent.
- Only Latin and Latin-extended font subsets are bundled.
- Browsers other than Chrome were not tested.

## Run locally

```bash
npm ci
npm run dev                      # http://localhost:3000

npm run build
npx next start -p 3100
npm run visual-qa                # or: npm run visual-qa -- 1440 390
node scripts/interaction-qa.mjs
```

Both QA scripts need an installed Google Chrome; the comparison also needs network access.
