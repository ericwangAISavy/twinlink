# Checkpoint 4 — Shared public visual foundation

Implements the approved shared-shell portion of the [visual system](../checkpoint-2/README.md) and [route map](../checkpoint-3/README.md). Baseline: `a3fa8dbf16ebf0e6a2f49e22b767cf44cc17543e`. Page-specific rebuilds and checkpoint 5 are not started. No deployment performed.

## What changed

- White fixed 70px header, TwinLink wordmark/mark, reference grid, desktop dropdowns and a 992px navigation breakpoint.
- Mobile overlay with 55px top / 15px side/bottom menu insets, expandable groups, Escape/outside dismissal, focus loop/return, background inertness, scroll lock and cleanup on route/viewport changes.
- Four-column `#00008b` footer, two columns on tablet and one on mobile; original map decoration, captured Bootstrap Icons glyphs, company-derived contact data, existing Resources/Insights/privacy links, disabled unconfigured social profiles and back-to-top.
- Locally bundled Open Sans and Roboto variable fonts, with licenses; only the public foundation uses them. No remote Google Fonts requirement or new runtime dependency.
- Scoped shared buttons, blue title/wave layout, hero caption/dots, 5-second photo rotation, 500ms fades, 1-second reveals, 300ms menu/hover and 400ms button transitions. Slideshow pauses on hover/focus/manual pause and respects reduced motion.

`foundation.css` is scoped to `.trinity-foundation`, a new class used only by `(marketing)/layout.tsx`. The older `.marketing-theme` class also appears on sign-in pages, so it was deliberately left unchanged. Root fonts, root CSS and shared UI primitives were not modified.

The shared blue `ResourceHero` accepts the same content props; its image-style header becomes a blue wave title panel. Article images in resource details and all publishing queries remain unchanged. Existing page bodies retain their own dark surfaces and content until later page-specific checkpoints; this checkpoint does not claim a full-page Trinity clone.

## Navigation and content boundaries

All current public URLs and anchors remain. Resources, careers, privacy and account actions are retained. Signed-in visitors still get `/dashboard`; anonymous visitors get `/login` and `/register`. New service detail routes are not created or linked; Tech Services currently points to existing solution sections, consistent with the approved map's rule against unfinished destinations. No reference placeholder `#` links or Trinity social/business addresses were copied.

TwinLink's existing photography and mark are kept instead of displaying Trinity-branded banners. The original captured footer map and extracted wave are used as reference decorations; provenance is in [preservation-results.json](evidence/preservation-results.json). Asset rights notes from checkpoint 2 remain applicable before a deployment. Local text-font sources are `@fontsource-variable/open-sans@5.3.0` and `@fontsource-variable/roboto@5.3.0`, with bundled licenses. Bootstrap icon-font bytes match the captured original and retain the MIT license.

Two intentional accessibility/content adaptations:

- Action green is darkened from reference `#1bbd36` to `#13832a`, giving white text **4.88:1** contrast. Borders/other decorative reference accents retain the original palette. Keyboard-visible focus, named controls and a slideshow pause control improve on the source's unnamed icon controls.
- Extra TwinLink Resources/account links and existing longer copy are retained. Footer height reflects TwinLink's actual configured contact fields rather than fabricated Singapore/India offices. Mobile heroes have a content-fit minimum height; the mobile title panel has extra top padding so preserved copy is not covered by the fixed header.

## Verification

- Production build, TypeScript, lint and all five Node test files passed.
- Browser checks passed at **390, 768, 991, 992 and 1440px** with no document overflow or page exceptions. [Results](evidence/browser-results.json).
- Desktop dropdown/Escape, mobile focus loop/return, scroll lock, culture anchor, viewport change, contact draft without delivery, back-to-top, carousel dots and reduced-motion autoplay suppression were exercised.
- Independent review findings were reproduced before fixes: button contrast, missing footer Insights, and pointer exit cancelling keyboard pause. [RED evidence](evidence/review-red.txt). All three were fixed and verified by the browser regression checks.
- A rendered-pixel check also caught low-contrast dots over existing bright photography. A small dark control backing keeps the dots visible without changing the photos; this is an intentional accessibility adaptation.
- Side-by-side QA found the blue title-panel header overlap and mobile caption width drift. Both were measured RED, corrected and recaptured. [Geometry RED](evidence/geometry-red.txt).
- **224 protected source files are byte-for-byte unchanged**, including page bodies, root globals/fonts, server/lib/auth/API code, UI primitives and private components. All **68 route files** remain. Every new foundation CSS selector is scoped. [Preservation results](evidence/preservation-results.json).
- Sign-in computed typography/color/background equal the pre-change baseline; [before/after comparison](evidence/compare-auth.jpg). No live candidate/employee/admin accounts or production database writes were used. Protected dashboard/admin styles are verified by unchanged source and CSS scoping, not by a claim of authenticated browser coverage.

The lint configuration now excludes the unmodified vendor-source archive captured under `docs/checkpoint-2/assets/originals/`; those third-party originals are research evidence, not application source to lint.

## Review artifacts

- [Design QA](../../design-qa.md): paired reference/implementation comparisons, findings and final result.
- [Desktop context](evidence/compare-desktop-context.jpg), [header detail](evidence/compare-header.jpg), [mobile menu](evidence/compare-mobile-menu.jpg), [footer](evidence/compare-footer.jpg), [shared contact title](evidence/compare-contact.jpg).
- Standalone captures: [desktop](evidence/desktop-home.png), [mobile](evidence/mobile-home.png), [expanded mobile menu](evidence/mobile-about-expanded.png), [mobile shared title](evidence/mobile-contact.png).
- Scripts: `node docs/checkpoint-4/scripts/browser-check.cjs`, `motion-check.cjs`, `geometry-check.cjs`, `preservation-check.cjs` (same directory). Browser scripts require Playwright, Chromium and a local server at port 3000; these are verification tools, not new app dependencies. Use the project's Node 22 runtime.
- [Implementation plan](../superpowers/plans/2026-11-04-checkpoint-4-foundation.md).

**Stop for approval before checkpoint 5.** No merge to main or deployment is included.
