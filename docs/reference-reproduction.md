# Public site: hcompany.ai layout under the Twinlink and Orin names

Twinlink is the company; Orin is its product. The layout and most copy come from <https://hcompany.ai/>.
The project owner stated on 2026-11-26 that they hold H Company's written permission for a full reproduction.
The permission document is not in this repository; confirm it covers use under another name before publishing.
**Merging to `main` would replace the live Twinlink homepage.** These pages are `noindex`.

## Verify before publishing

The copy still contains H Company's statements, now reading as Twinlink's and Orin's. Treat all as unverified:

- client results (90%, 50 to 70%, 50%, 80%+) and their industries
- benchmark scores, model names and sizes, context lengths, prices and plan limits
- feature, data-handling and security statements, including FAQ answers
- product availability (Chrome extension, open weights, free tiers) and article headlines
- `twinlink.example` domain and email addresses (existing pages use `hello@twinlink.com`)

Changed on purpose: certification statements (SOC 2, ISO 27001, GDPR), the "Europe's largest companies" and
"Leader" claims, the AWS European Sovereign Cloud / NVIDIA announcement and the "Built in Europe" line were
replaced with neutral wording or removed.

## Pages

`/`, `/enterprise`, `/agents-api`, `/models-api`, `/orin-tab`, `/platform`, `/pricing`, `/coming-soon`.
Menu links go to the existing Twinlink pages where one exists, otherwise to `/coming-soon`.
Product page text is in `src/app/(reference)/<page>/page.tsx`; homepage text is in `src/components/reference/`.

## Known gaps

- Demo videos and images are placeholders; the originals showed H Company's branding.
- On Agents API, the demo section switches on click; the reference pins it and switches on scroll.
- Small two-way toggles inside the console mock-ups ("My runs" / "Org") do not respond.
- Product page script animations are static. Homepage motion is approximate.
- Existing Twinlink pages (about, careers, contact, blog and others) keep their earlier navy design.
- The About photo is in `public/images/reference/`, copied from another site; check its licence.
- "Sign up", docs, trust, showcase and research pages are not built.
- Similarity to the reference was last measured at commit `f595f21` (99.07% to 99.94% on seven pages). Names,
  logo and media have changed since, so those figures do not describe the current pages.
- Only Chrome was tested. Signed-in areas were not exercised.

## Run and check

```bash
npm ci
npm test && npm run lint && npm run build
npx next start -p 3000

# in a second terminal
node scripts/pages-qa.mjs
VISUAL_QA_URL=http://localhost:3000/ node scripts/interaction-qa.mjs
```
