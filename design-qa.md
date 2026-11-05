# Checkpoint 5 homepage design QA

final result: passed

Scope: homepage body within the approved checkpoint 4 foundation, compared with Trinity’s captured homepage. TwinLink identity, copy, live data and available application destinations are required adaptations. Checkpoint 6 is not included.

## Paired evidence

Source: checkpoint 1 `01-home-desktop-full.png` and `01-home-mobile-full.png`; checkpoint 2 original CSS, measurements and assets. Implementation: production `docs/checkpoint-5/evidence/desktop-full.png` (1440×900 viewport) and `mobile-full.png` (390×844), device scale 1. Desktop uses the source skyline slide; mobile uses the source night-city slide, reduced motion enabled to settle reveals. Full overview pairs put source on the left and implementation on the right at equal reduced scale; native-resolution About and Tech pairs provide detail. Gray canvas beneath the shorter page is not UI. `scripts/compare.cjs` reproduces those pairs.

Opened paired desktop/mobile full sequences and focused About/Tech regions. Checked section order, photo crops, container margins, labels, heading rules, grid gutters and phone stacking. Standalone section captures supplement full captures; their fixed header can obscure the first heading after an automatic scroll, so full captures determine section placement.

## Fidelity and findings

- Original section photography/icons and unbranded banners are locally copied, hash verified; body Open Sans and heading Roboto remain locally bundled. About uses the source 25px heading, 15px/22.5px justified copy, 24px gutter and 60px vertical padding.
- Tech/HR grids use the source pale blue, 270:300 image ratio, overlapping white labels, 40px cog, 24px gutters and 30px card spacing. Four/three/two/one columns follow the approved 992/768/576 breakpoints. Hover/focus changes labels blue and zooms/rotates photos.
- Values and What We Do use original icons/400×200 imagery, source spacing, three/two/one column stacking, green headings and staggered zoom reveals. Copy/links honestly reflect existing TwinLink capabilities.
- Carousel keeps 5s autoplay, 500ms image fade, 1s caption reveal and separate manual/focus/hover pauses. Reduced motion suppresses automatic and decorative motion; the additional pause control/contrast backing from checkpoint 4 is retained.
- P2 found and reproduced: the tall service-grid wrapper never met the default 18% observer threshold on a 375×667 phone, leaving content invisible. Homepage grids now request threshold zero; all other Reveal users keep their original default. Red/green evidence and normal-motion browser regression confirm visible content.
- TwinLink’s first hero image deliberately replaces source artwork containing Trinity’s wordmark. Different paragraph lengths, honest careers/resources labels, TwinLink footer and live statistics/featured case add content differences. These are documented adaptations, not hidden unfinished source sections.

## Verification and isolation

Production browser checks cover widths 1440, 992, 768, 576, 390 and 375; correct grid columns, no document overflow or page exceptions, decoded homepage images, slide/caption controls, hover/enquiry link, careers navigation, mobile menu focus loop/return, inert background and scroll lock. Normal-motion keyboard focus keeps autoplay paused after pointer exit. Source/data tests cover both parallel queries, featured-case selection/fallback, empty publications, errors and working destinations.

Build, TypeScript, ESLint and all six test files passed. Preservation check confirms 224 protected files byte-identical, all 68 existing route files retained, all new homepage CSS selectors scoped, and 26 original assets hash matched. No auth/server/API/admin/dashboard/global style changes. Private authenticated views were not entered with real accounts. Independent source review found no blocking issues.

- [x] Paired source/render desktop and mobile evidence inspected.
- [x] All reference homepage sections recreated with documented identity/data adaptations.
- [x] Short-phone animation defect reproduced and fixed.
- [x] Data/navigation, responsive, motion and isolation checks passed.
- [x] No actionable P0/P1/P2 findings remain within checkpoint 5.

Checkpoint 4’s prior QA report is preserved at `docs/checkpoint-5/foundation-qa-baseline.md`.
