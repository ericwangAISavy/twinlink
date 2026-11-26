# hcompany.ai reproduction

Local frontend reproduction of <https://hcompany.ai/> with its original content and media. On 2026-11-26 the
project owner stated that they hold H Company's written permission for a full reproduction. The permission
document is not in this repository. Confirm it covers publication before this branch is pushed, deployed or
merged: **merging to `main` would replace the TwinLink homepage in production.** Pages are `noindex`.

## Pages

`/`, `/enterprise`, `/agents-api`, `/models-api`, `/holotab`, `/h-platform`, `/pricing`.
Every other link opens the live reference site (`src/components/reference/links.ts`). Existing TwinLink pages
(`/about`, `/careers`, `/contact` and the rest), auth, dashboard and admin are unchanged.

The homepage is hand-written components. The six product pages (`src/app/(reference)/<slug>/page.tsx`) were
converted from the reference site's rendered HTML on 2026-11-26, using theme styles measured from its
stylesheet. Edit text directly in those files.

An earlier Twinlink/Orin renaming is kept in Git: commit `60956ff` (Orin, with placeholders) and a stash
named "twinlink-orin naming work (set aside)".

## Measured similarity

Chrome, DPR 1, reduced motion, consent and analytics blocked. pixelmatch threshold 0.1, anti-aliased pixels
not counted. Full-page figures, with canvas, video and iframes hidden on both sides in the second column
of each pair. Page heights match and every compared text element is within 1px with the same size, weight and
colour at these widths. White space counts as matching.

| Page | 1440 | 1440, media hidden | 390 | 390, media hidden |
| --- | --- | --- | --- | --- |
| Home | 99.877% | 99.997% | 99.936% | 99.984% |
| Enterprise | 99.782% | 99.782% | 99.770% | 99.770% |
| Agents API | 99.197% | 99.864% | 99.071% | 99.746% |
| Models API | 99.910% | 99.910% | 99.883% | 99.883% |
| HoloTab | 99.872% | 99.869% | 99.821% | 99.820% |
| H Platform | 99.887% | 99.887% | 99.775% | 99.775% |
| Pricing | 99.918% | 99.918% | 99.892% | 99.892% |

The homepage was also compared at 1920, 1280, 1024 and 768 (99.825% to 99.908%). Product pages were compared
at 1440 and 390 only. Screenshots and difference images are in `.visual-qa/` (ignored by Git).

## Known differences

- **Product page behaviour:** question lists and the dark-to-light header work. Other tab switchers, interactive
  demos and script-driven animations on those pages show their initial state and do not respond.
- **Homepage motion** was matched by observation. The hero dot field is an original implementation.
- Dropdowns and hover states have no pixel comparison.
- Cookie banner and analytics are absent. YouTube embeds load from YouTube, as on the reference.
- One comparison run logged a single console error on Agents API; a repeat run logged none.
- Only Chrome was tested.

## Run locally

```bash
npm ci
npm run build
npx next start -p 3000

# in a second terminal
VISUAL_QA_URL=http://localhost:3000/ npm run visual-qa
VISUAL_QA_PAGE=pricing VISUAL_QA_URL=http://localhost:3000/ npm run visual-qa -- 1440 390
node scripts/pages-qa.mjs
VISUAL_QA_URL=http://localhost:3000/ node scripts/interaction-qa.mjs
```
