# Checkpoint 4 design QA

final result: passed

Scope: shared public foundation only, against the approved Trinity captures and checkpoint 3's TwinLink-preservation constraints. This is not acceptance of page-specific bodies or unimplemented service pages.

## Comparison inputs

- Source: `docs/checkpoint-2/evidence/home-desktop.png`, `mobile-menu.png`, `home-touch-mobile.png`, `contact-desktop.png`; footer region from `docs/checkpoint-1/evidence/01-home-desktop-full.png`.
- Implementation: production Chromium captures in `docs/checkpoint-4/evidence/`: `desktop-home.png`, `mobile-home.png`, `mobile-menu.png`, `desktop-contact.png`, `mobile-contact.png`, `desktop-footer.png`.
- Full-view paired inputs: `compare-desktop-context.jpg`, `compare-mobile-context.jpg`, `compare-contact.jpg`. Focused paired inputs: `compare-header.jpg`, `compare-mobile-menu.jpg`, `compare-footer.jpg`. `compare-auth.jpg` compares pre-change TwinLink sign-in with current TwinLink, not with Trinity.
- Desktop: 1440 × 900 CSS/pixels; mobile: 390 × 844 CSS/pixels; deviceScaleFactor 1. Comparisons retain native resolution with a 28px label strip, no density scaling. Footer regions retain 1440px width; source is 731px tall and TwinLink is 506px tall because their content differs. Gray padding is comparison canvas, not UI.
- States: anonymous public navigation, closed/expanded menus, first/selected carousel photographs, Contact title panel, footer and original sign-in. TwinLink copy, identity, available routes, and data are intentional differences. Source mobile context has slide 3; the implementation's preserved photo collection differs. Use that pair for geometry, not subject identity.

## Findings and comparison history

1. Baseline test RED: original header was 69px/dark. Implemented 70px white header and reference container rhythm. Header geometry and browser checks passed afterward.
2. Independent code review found P2 action contrast (2.51:1), loss of footer Insights, and hover exit cancelling keyboard carousel pause. Reproduced all three in `review-red.txt`; fixed with darker action green, restored links, and separate focus/hover pause states. `review-green.txt` records 4.88:1 text contrast, retained destination and unchanged selected slide while keyboard focus remains inside.
3. Visual pass found P2 title panel offset: fixed-header space was counted twice, placing its bottom at 655px instead of 585px at the desktop target. Applied −70px overlap; `geometry-green.txt` records panel y=0/height=585. Extra mobile top padding keeps longer TwinLink copy clear of the fixed header.
4. Visual pass found P2 mobile caption drift: 30px inset / 330px width instead of 55px / 280px. Removed the custom narrower inset override; geometry check and recaptured mobile view match the reference dimensions. Longer preserved copy creates a taller caption, an intentional content difference.
5. Pixel check found P2 inactive indicators disappearing over retained bright photography (about 1.02:1). Added a small dark backing to the indicator/pause controls, preserving dot size and interaction, rather than replacing TwinLink's photography. `controls-red.txt` preserves the failing measurement; final pixel results and captures verify the fix.

No new backend, authentication, route or form behavior was introduced. Independent review found no change to private-route styling or data/auth handling. Page-specific dark surfaces remain intentionally contained for later checkpoints.

## Required fidelity surfaces

- **Fonts/typography:** locally bundled Open Sans for body and Roboto for headings/navigation. Chromium confirms custom Roboto rendered. Source screenshot text used a blocked-font fallback, so local intended-font metrics are not a pixel-identical fallback recreation. Header uses 13px/600 desktop; mobile links 15px; footer headings 15px/500 and body 14px. Sign-in typography/color/background match baseline.
- **Spacing/layout:** header 70px; grid 576/768/992/1200/1400; overlay insets 55/15px; footer 60/30px vertical padding with four/two/one columns; hero caption 20px padding and 5px top rule; final mobile inset 55px. Blue title panel uses the original wave and fixed-header overlap. Header contains extra required Resources/account links; footer height follows TwinLink contact content.
- **Colors/tokens:** shared white header, `#157cbf` blue, `#00008b` footer, `#111` copyright. Action/active-navigation green is intentionally darkened to `#13832a` for readable small text. Page body colors are not globally replaced. Indicators gain contrast backing over existing imagery.
- **Image quality/assets:** preserved TwinLink mark and existing photography; captured footer map and exact extracted wave; captured MIT Bootstrap Icons font. No generated approximation of the reference decorations, copied Trinity wordmark, or fabricated business/social details. Provenance/hashes/licenses are in `preservation-results.json`.
- **Copy/content:** retains actual company data, published resources/statistics, page children, account controls, contact-draft meaning and resource navigation. Tech menu uses current solution anchors until service pages exist. No Trinity office details or placeholder links are introduced.

## Interaction and isolation evidence

Production browser run at widths 390/768/991/992/1440: no horizontal document overflow, no page exceptions. Exercises desktop hover/Escape, mobile focus loop/return, inert background, scroll locking/restoration, culture anchor, viewport cleanup, contact draft without sending, back-to-top, slide dots and reduced-motion autoplay suppression. The independent motion check covers keyboard pause after pointer exit. SSR tests cover anonymous/signed-in account destinations.

`preservation-results.json`: 224 protected source files byte-identical; all 68 existing route files retained; new CSS rules scoped to `.trinity-foundation`. Root globals/fonts and auth/admin/dashboard/server/API/lib/UI source unchanged. Authenticated private screens were not entered with real accounts; their isolation is established by source/style checks and unchanged sign-in rendering, not by a claim of a full authenticated browser audit.

## Implementation checklist

- [x] Reference and implementation opened together in combined full/context and focused comparisons.
- [x] Reference header/mobile/footer geometry and intended typography implemented.
- [x] P2 review findings reproduced and fixed.
- [x] P2 geometry findings reproduced, fixed and recaptured.
- [x] Final contrast backing recaptured and pixel-verified (6.32:1, 6.26:1, 3.57:1).
- [x] Build/type/lint/test and preservation checks run.

Follow-up polish: none deferred within the shared-foundation scope. Full page bodies, service destinations/content and production asset-rights decisions remain the separately gated work documented in checkpoints 2/3, not hidden QA failures of this checkpoint.

Final acceptance: no actionable P0/P1/P2 findings remain within the shared-foundation scope. The final production captures and paired inputs were inspected after geometry and contrast fixes.
