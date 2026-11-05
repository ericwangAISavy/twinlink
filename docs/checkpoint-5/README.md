# Checkpoint 5 — Homepage

Recreates the approved Trinity homepage inside TwinLink’s checkpoint 4 shell. This checkpoint changes the homepage body only; checkpoint 6 has not started.

## Implemented

Three-photo carousel with changing captions; About; eight Tech cards; eight HR cards; three values; three What We Do cards. Uses the captured photography, original icon images and Boxicons cog, Open Sans/Roboto, source container widths, pale blue/white/gray surfaces, overlapping card labels and responsive grids. Carousel retains 5s autoplay, 500ms fades, 1s caption animation, manual/hover/focus pause and reduced motion. Card hover uses 300ms image/label transitions; career image effect 750ms; section reveals 1s with 100/200/300ms stagger.

TwinLink’s live statistics and published featured case remain after the reference sequence. Both original queries still run in parallel. Featured selection, image fallback, errors and empty publication state have regression coverage. Empty publications retain the `#insights` navigation target.

## Deliberate adaptations

- TwinLink identity/copy and existing account/navigation destinations remain. The first source banner contains a Trinity wordmark, so TwinLink’s existing team image replaces it. The other two unbranded banners and section images are exact local copies from checkpoint 2.
- Category cards open the existing `/contact` enquiry page. No unbuilt `/services/*` route is advertised. All source categories are visible; implementing detail pages is separately gated.
- Source “Jobs Tips and Resources” and “Register Your CV” are adapted to the existing journal/events/case studies and careers/account flows. There is no invented general CV-upload form. Applications still use the existing role flow.
- Values and career heading green is darkened for readable text; shared checkpoint 4 contrast and motion accommodations remain.
- Dynamic statistics/featured case add sections beyond the reference. Footer content reflects TwinLink.

## Evidence and verification

`evidence/desktop-full.png` and `mobile-full.png` are production renders at 1440×900 and 390×844. `compare-*-overview.jpg` pairs the approved source (left) and TwinLink (right), at equal reduced scale for inspection of the complete sequence. `compare-*-about.jpg` retains native pixels. Section screenshots supplement full captures; fixed navigation can overlap the top of an element screenshot after scrolling, so full captures are authoritative for section spacing.

`browser-results.json` records six viewport checks (375–1440px), correct 1/2/3/4-column grids, no horizontal overflow or browser exceptions, slide-caption controls, card hover, contact/careers links and mobile menu keyboard behavior. Source/implementation comparison uses the skyline slide on desktop and night-city slide on mobile; screenshots use reduced motion to settle reveals deterministically. Normal-motion short-phone and keyboard-pause probes run separately.

A tall-grid reveal bug was reproduced at 375×667 (opacity 0), then fixed with an optional observer threshold of zero on the two long homepage grids. Other Reveal users retain the original 0.18 default. Red/green evidence is included.

`preservation-results.json`: 224 protected files unchanged from checkpoint 4, all 68 existing route files retained, homepage selectors scoped and 26 captured files hash verified. Auth/admin/dashboard/API/server/lib/global styles were not edited. Private authenticated screens were not exercised with real accounts.

Run scripts from the repository root with a local server on port 3000. `scripts/home-check.cjs`, `short-viewport.cjs`, `motion-check.cjs` use Playwright/Chromium. `scripts/preservation-check.cjs` checks source isolation and provenance. `tests/homepage.test.mjs` checks data/rendered destinations and failure/empty states without production writes. Production build, TypeScript, ESLint and all six test files passed; see verification evidence.

## Assets and review

`assets.json` records source path, reusable public path and SHA-256 for each original. Boxicons’ MIT license is bundled at `public/fonts/BOXICONS-LICENSE.txt`. Photography retains checkpoint 2 provenance/reuse status; no new license or ownership claim and no deployment was made. No assets are hotlinked. Source wordmark artwork is intentionally excluded.

Independent source review reported no blocking findings in data preservation, accessibility, style isolation or shared-component defaults. Final visual findings and acceptance are recorded in the root `design-qa.md`; checkpoint 4’s report is archived as `foundation-qa-baseline.md`.
