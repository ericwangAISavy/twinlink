# Resume checkpoint 6 in another Codex workspace

## Status and user instruction

The user requested a concrete commit/push now because the current session is running low on context. **This is a resumable work-in-progress checkpoint, not final checkpoint 6 acceptance.** Continue checkpoint 6, finish verification/QA, commit and push the completed work, then stop for approval before checkpoint 7. No deployment or merge is requested.

Repository: `ericwangAISavy/twinlink`.
Branch: `codex/checkpoint-6-subpages`.
Baseline checkpoint 5: `c0c19d5fb9d9fce0f4f59dcb4fde43e2af566968`.

## Implemented

- All fourteen inventoried subpage entries mapped: About, Life integrated at `/about#culture`, Careers, Privacy, Contact and nine allowlisted `/services/[slug]` pages. See `delivery-map.json` and `README.md`.
- Source photography/banners, company cards, wave, typography, responsive 9/3 service layout/sidebar, white/gray surfaces, responsive photo banners and short-phone blue-wave panels.
- Source-specific image sequencing (Managed and Cloud after two paragraphs), horizontal 1s service reveals and outlined related-service rows.
- Careers “Apply here” now appears inside its photo banner at the measured reference offset; “Open roles” introduces the preserved board below.
- Original ContactForm/OpenRolesBoard/PrivacyPreference/AboutFaq implementations remain unchanged and receive scoped presentation. Job queries/mapping, current company email/fallback, privacy notice/preferences, FAQ state and existing job/application/auth flows remain.
- Shared Tech menu/footer/homepage cards reach implemented service destinations; HR enquiry destinations and existing anchors/resources/account links remain.
- No fake CV upload, office maps, email transport, certifications, SAP/ERP partnerships or unsupported offering claims. Static service articles are planning topics with availability confirmation.
- Seventeen original assets copied with hashes. Rights remain checkpoint 2’s permission-or-replacement status before production use. No hotlinks or deployment.

## Important files

- `src/components/marketing/subpage-shell.tsx`, `subpages.css`: opt-in presentation.
- `service-content.ts`, `service-links.ts`: nine service articles / shared canonical links.
- `src/app/(marketing)/services/[slug]/page.tsx`: actual template, metadata, `generateStaticParams`, `dynamicParams = false`, `notFound` guard.
- Four existing page bodies: About, Careers, Privacy, Contact.
- `tests/subpages.test.mjs`: lookup, rendering/metadata/404 guard, company/jobs wiring and empty/failure cases.
- Existing homepage/navigation tests updated for real service destinations.
- `docs/checkpoint-6/scripts/`: browser, geometry, captions, extra interactions, preservation and paired comparisons.
- Root `design-qa.md`: **blocked** pending final acceptance. Prior checkpoint 5 QA archived at `homepage-qa-baseline.md`.

## Verification already established

- Production build passed; Node 22.23.4 / Next 15.5.26.
- Full suite: 31 tests passed, zero failed across seven files (`evidence/tests.txt`).
- TypeScript and ESLint clean on the final source.
- Preservation: **249 existing source files byte-identical**, all 68 original route files retained, nine new service destinations, fully scoped new CSS, 17 exact asset hashes (`preservation-results.json`).
- The original marketing layout, visitor tracker, auth, permissions, server/lib/API, private routes, job details/application components, globals and editorial pages are unchanged.
- Geometry probes passed at 390×480/568, 375×667, 768/992/1440×900: title clearance, no overflow, normal-motion service reveal visibility, 40px careers search inset.
- Careers caption checks passed: top 398.59px at 1440×900 and 422.39px at 390×844, 32px heading, zero standalone page errors.
- Extra interaction checks passed: existing careers filters/sort/page size/toggling; contact required validation and encoded draft including organization/topic; eight distinct Tech targets and eight HR enquiries. No message sent or application submitted.
- **Latest main browser pass completed all 28 page/viewport states with no page exceptions** (`evidence/browser-check.txt`). A second repetition was interrupted to honor the handoff request (`browser-repeat-incomplete.txt`).

## Hydration investigation — do not lose this context

Earlier automated production passes intermittently recorded React error 418 on different routes (service pages, Careers, Contact). Development full passes and repeated direct service navigation did not reproduce it consistently. Browser-only React diagnostics identified the failing expected host fiber as `main`, with a null hydration cursor immediately after the shared header.

The harness was interacting with the header as soon as the document/fonts loaded, before the main container was necessarily hydrated. It now waits for the `#marketing-content` host node’s `__reactFiber$` property before firing navigation interactions. This is **test-only readiness**, no production flag or error suppression. The latest complete production run then passed all 28 states. Repeat this validation; the readiness hypothesis is not a fully established application root-cause proof yet.

Two production experiments were tried and **reverted** because they did not establish a fix:
1. Moving scoped subpage CSS into the marketing layout.
2. Adding Suspense around the null-rendering VisitorTracker.

**Do not assume either is present or reapply them as a verified fix.** MarketingLayout and VisitorTracker are byte-identical to checkpoint 5. Error-time URLs/stacks are retained. `capture-transition-red.txt` and `hydration-investigation-red.txt` preserve earlier failures. No framework package upgrade, client-only rendering or hydration suppression was introduced.

## Remaining work, in order

1. Check out this branch in a clean workspace. Use Node 22 and install existing dependencies (`npm ci` if needed). Do not rely on the old workspace’s `/workspace/work` scratch files or running servers.
2. Run `npm run build`, then `npm start` on port 3000. Browser scripts require Playwright and Chromium; the previous environment supplied `require('playwright')` globally and `/usr/bin/chromium`. Adapt executable/tool availability to the new workspace without adding unnecessary runtime dependencies.
3. Run two complete sequential browser passes from the final committed source:
   ```sh
   PREVIEW_URL=http://127.0.0.1:3000 node docs/checkpoint-6/scripts/browser-check.cjs
   PREVIEW_URL=http://127.0.0.1:3000 node docs/checkpoint-6/scripts/browser-check.cjs
   ```
   Keep all page errors visible. If error 418 recurs after the main-hydration readiness check, investigate rather than suppressing it or claiming completion.
4. Run `geometry-check.cjs`, `careers-caption-check.cjs`, `interaction-check.cjs`, and `preservation-check.cjs`. The latter spawns git; sandbox escalation may be needed for Node child-process execution. Read-only git EPERM was an environment restriction, not a failed preservation assertion.
5. Recreate paired evidence with `node docs/checkpoint-6/scripts/compare.cjs`. Refresh focused crops and `image-dimensions.json` as needed. Several current comparison JPGs predate the final Careers caption/outlined sidebar refinements, while the native captures were refreshed in the latest pass. **Do not accept stale pairs as final QA.**
6. Inspect final desktop/mobile pairs for every inventory entry and the focused About/service/Privacy/Contact/Careers regions. T03 is an integrated section crop, not a standalone page. Life/Contact/Cybersecurity source HTML lacks a viewport meta tag and produced 980px-wide mobile captures; TwinLink keeps its existing correct responsive viewport. Do not force TwinLink to reproduce that source defect.
7. Update the root `design-qa.md` from blocked to passed only after final comparisons and repeat browser verification. Record any remaining limitations honestly; update README/evidence verification summary and plan checkboxes.
8. Run final tests/lint/type/build appropriate to any further edits, commit and push completed checkpoint 6, verify remote/clean tree, then stop for approval before checkpoint 7.

## Useful commands

```sh
npm test
npx tsc --noEmit
npm run lint
npm run build
node docs/checkpoint-6/scripts/preservation-check.cjs
```

All source references/captures needed to resume are committed under `docs/checkpoint-1`, `checkpoint-2`, `checkpoint-3` and this directory. The approval flags in checkpoint 3 JSON are historical proposal metadata; the user explicitly authorized implementation in checkpoint 6. Do not restart checkpoints 1–5 or ask again for already-authorized local implementation/commit/push work.
