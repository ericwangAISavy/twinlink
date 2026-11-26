# hcompany.ai reproduction

Local frontend reproduction of <https://hcompany.ai/> with its original content and media. On 2026-11-26 the
project owner stated that they hold H Company's written permission for a full reproduction. The permission
document is not in this repository. The pages include H Company's name, legal terms, prices and compliance
claims. **Confirm the permission covers publication before this branch is pushed, deployed or merged: merging
to `main` would replace the TwinLink website in production.** Pages are `noindex`.

## What changed

- 72 reference pages are served at their original paths, plus `/coming-soon`.
- The previous TwinLink public pages were deleted at the owner's request, including the public job list, job
  detail and guest application pages, services, blog, case studies and contact form. Their tests were removed.
  Login, registration, dashboard and admin remain; some of their links to `/careers`, `/about` and similar now
  open the reproduced pages. Everything deleted is recoverable from commit `4c01f94`.
- Links to H Company's separate applications (docs, platform sign-up, trust centre, showcase) open
  `/coming-soon`. Third-party links (GitHub, LinkedIn and others) are unchanged.

## Where things live

| Path | Contents |
| --- | --- |
| `src/app/(reference)/page.tsx`, `src/components/reference/` | Homepage and shared components |
| `src/content/reference/*.json` | Markup and text of every other page, one file per path |
| `src/app/(reference)/[...slug]/page.tsx` | Renders those files |
| `src/app/(reference)/reference*.css` | Theme and custom styles taken from the reference |
| `public/hc/` | Images, videos, fonts and stills |

Content files were converted on 2026-11-26 from the reference site's rendered HTML. To edit a page, change the
text in its JSON file. The conversion script is not part of the repository.

## Measured similarity

`node scripts/visual-qa-all.mjs`, all 72 pages at 1440 and 390 wide. Chrome, DPR 1, reduced motion, consent and
analytics blocked, pixelmatch threshold 0.1, anti-aliased pixels not counted. Figures are full-page matches with
canvas, video and iframes hidden on both sides. White space counts as matching.

| Width | Pages at 99% or better | Pages at 98% or better | Median | Lowest |
| --- | --- | --- | --- | --- |
| 1440 | 66 of 72 | 69 of 72 | 99.875% | 96.815% |
| 390 | 65 of 72 | 71 of 72 | 99.86% | 97.793% |

Below 99%: `/cookie-preferences`, `/h-platform` (1440), `/solutions/systems/solidworks` (390), `/newsroom/holodesktop-cli`
(390), and the articles on booting fast and slow, GEO, Holo1.5, Holo2 235B (390) and VRAM ghost busting. Other
viewport sizes were not compared, except the homepage earlier in the work. The reference is live and changes.

## Known differences

- **Working:** menus, question lists, homepage and product tabs, the console demo, newsroom, research and use-case
  filters, story search, event day buttons, team profiles, copy buttons, the cost calculator and the scorecard.
- The scorecard's rules were inferred from sample answers on the reference. Filters keep one choice at a time,
  so two filter groups cannot be combined.
- **Static:** the Holo4 and Nemotron article charts and demos, console replay steps, the cookie-preferences
  button and most script-driven animations.
- **Canvas graphics** (contact globe, Holo4 and Nemotron article visuals) are still images; the full-screen
  particle overlay is omitted. The homepage dot field is an original approximation.
- **Forms** send nothing. The SolidWorks page's embedded third-party form is a still image.
- Contact, Holo4 and Nemotron pages carry separate phone markup, so they have repeated element ids and two `h1`.
- YouTube and Vimeo embeds load from those services.
- Cookie banner and analytics are absent. Only Chrome was tested. Signed-in areas were not exercised.
- Admin publishing still saves articles and events, but no public page displays them any more.
- The table above is from the full run before the control fixes. A later run of 14 changed pages scored
  99.1% or better at both widths.

## Run and check

```bash
npm ci
npm test && npm run lint && npm run build
npx next start -p 3000

# in a second terminal
node scripts/pages-qa.mjs
node scripts/audit-qa.mjs      # lists controls that do nothing
VISUAL_QA_URL=http://localhost:3000/ node scripts/interaction-qa.mjs
VISUAL_QA_URL=http://localhost:3000/ node scripts/visual-qa-all.mjs
```
