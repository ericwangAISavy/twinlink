# Checkpoint 6 subpage design QA

final result: blocked

Scope: all fourteen inventoried subpages mapped to TwinLink. User requested a concrete resumable commit before final acceptance. Implementation and an all-28-state production browser pass are present, but repeated hydration verification and final refreshed comparison/QA acceptance remain unfinished. Resume from `docs/checkpoint-6/HANDOFF.md`. Checkpoint 7 has not started.

## Comparison inputs and normalization

Source truth: checkpoint 1 captures `02-about` through `15-erp`, desktop/mobile full pages; checkpoint 2 measured geometry, original CSS and local original assets; checkpoint 3 approved route map. Rendered implementation: production `docs/checkpoint-6/evidence/T02-desktop.png` through `T15-mobile.png`.

Desktop viewport 1440×900, mobile 390×844, deviceScaleFactor 1. T03 is the integrated `/about#culture` section rather than a standalone route; `browser-check.cjs` crops it from a full document capture so a fixed header does not appear inside the section. Its header/footer context deliberately differs from the standalone source. Reduced motion settles comparison states; a separate normal-motion geometry probe checks reveal visibility.

Each `compare-Txx-*.jpg` places source left and implementation right. Desktop overview pairs scale both from 1440 to 500px wide. Mobile pairs retain 390px width except source documents with a missing viewport meta tag, which are fit from 980px to 390px for the overview and explicitly are not exact CSS viewport-proportion comparisons. `image-dimensions.json` records source/render pixels. Life, Contact and Cybersecurity source pages lack a viewport meta tag. TwinLink preserves its existing responsive viewport declaration instead. Gray padding below a shorter page is comparison canvas, not UI.

All eight contact sheets (four desktop/four mobile groups) were opened as paired comparison inputs. Individual native-resolution focused pairs cover About composition, service heading/text/image, Privacy banner/title/background and Contact form. The very long source privacy notice is compared at a focused readable scale as well as in the overview; it is not replaced with unrelated legal text to match its height.

## Findings and iteration history

1. **P2 — Privacy title/background drift.** Initial paired comparison showed a gray title strip on white instead of the source blue strip on light gray. Sampled source strip `#376ea8`; applied it, white title text and `#f7f7f7` reading surface. Production T05 and `focus-privacy.jpg` show the correction.
2. **P2 — Short-phone title clipping.** Review reproduced long service titles beyond the blue panel at 390×480/568. Added a 350px minimum on short phones and centered the heading there; ordinary 390×844 geometry remains source-like. `geometry-red.txt` and `geometry-green.txt` record bounds and zero final failures at six widths/heights.
3. **P2 — Careers search icon overlap.** Scoped input padding overrode the board’s 40px left inset. Restored the inset specifically for the existing search field. Red/green computed padding is 12px → 40px; active filter foregrounds also remain readable on blue.
4. **P2 — Detail-image sequencing.** DOM comparison confirmed Managed Application and Cloud images follow two paragraphs, unlike the other technology pages. Template data now preserves those positions. The original source files are used with responsive natural image proportions.
5. **P2 — Careers banner heading placement.** Focused comparison found the source’s “Apply here” heading was below the banner. Added an optional banner caption with the source 32px weight/underline and top offset `height − 168.4px`; the board introduction now says “Open roles”. Affected-page position checks passed at 398.59px desktop and 422.39px mobile; final refreshed visual acceptance is pending.

Unknown service handling was also strengthened from a streamed not-found response to an explicit static allowlist with HTTP 404. Initial capture runs reported intermittent React 418 during transitions; isolated repeated direct visits did not reproduce it. The final harness waits for the main container React fiber before exercising navigation, waits for destination content/title after client navigation, and records error-time URLs/stacks. One complete fourteen-entry/two-viewport production run passed; repeat validation was interrupted for the requested workspace handoff. No application hydration suppression or client-only rendering workaround was introduced.

## Required fidelity surfaces

- **Typography:** existing local Open Sans/Roboto; source 15px/22.5px justified service copy, 25px uppercase section headings with tight 20px line height, 30px desktop/40px mobile wave titles. Body font rendering uses the intended locally available families; source captures sometimes used blocked-font fallbacks. Contact fields retain visible labels and existing validation semantics. Long short-phone headings remain visible.
- **Spacing/layout:** 60px sections, 24px gutters, approved responsive containers; 9/3 service composition at ≥992px, sidebar after copy below; photo banners 63vh desktop/70vh phone, blue panels 65vh desktop/50vh phone with documented short-phone minimum. About’s three original image cards align to the source width; other TwinLink values/FAQ/culture content remains additional. Contact card height follows real facts and retained fields.
- **Colors/tokens:** source blue wave, white/light gray surfaces, blue Privacy strip, original heading rules and shadows. Greens are darker for legible small text, consistent with checkpoint 4. Selected career filters use readable blue/white. Auth/private and editorial surfaces are not restyled.
- **Imagery/assets:** all required subpage photographs, three company cards and ERP banner are exact local originals; seventeen hashes verified, no hotlinks or generated substitutes. Original wave and fonts/icons remain from prior checkpoints. Contact office maps are intentionally omitted because no corresponding TwinLink offices/map integration exists.
- **Copy/content:** TwinLink brand, company facts, legal notice, data queries, FAQ, forms and job board take precedence over unrelated source claims. SAP/ERP descriptions explicitly avoid implying certifications, partnerships or confirmed offerings. Paragraph length, footer content and page heights consequently vary.

## Interactions and isolation

The production pass checks all 28 page/viewport states, decoded rendered images, no horizontal overflow, desktop keyboard/mobile menu hydration and closure, FAQ expansion, careers search, persistent privacy preference, contact email draft and related service navigation. Extra checks cover existing filters, sorting, page size, selected-state toggling, required-field validation and draft encoding. No email or application is submitted. Geometry tests exercise normal-motion reveal visibility on short phones and tablet/desktop boundaries.

All seven test files, TypeScript, ESLint and production build passed. Source preservation establishes 249 existing files byte-identical, all 68 existing route files retained, fully scoped new styles and original asset hashes. Backend/auth/permissions/API/admin/dashboard, job detail/application components and editorial pages remain unchanged. No real private account was used; authenticated isolation is established by source checks and the existing account-state tests.

## Follow-up polish

Service row outlines and directional reveals were aligned in the final pass. Source office directories, generic CV intake, legal boilerplate and misrouted HR links are deliberate omissions described in the approved map, not deferred recreation work.

## Checklist

- [x] Each inventoried subpage has a canonical working destination or complete mapped section.
- [x] Paired desktop/mobile composition and focused typography/assets/forms inspected.
- [x] Review and geometry findings reproduced and corrected.
- [x] Complete production browser pass and original logic/isolation checks passed.
- [ ] Final Careers caption captured and compared after correction.

Checkpoint 5 QA is archived at `docs/checkpoint-6/homepage-qa-baseline.md`.
