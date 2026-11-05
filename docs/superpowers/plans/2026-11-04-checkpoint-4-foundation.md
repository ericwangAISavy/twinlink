# Checkpoint 4 Shared Visual Foundation Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. The user explicitly authorized implementation, verification, commit and push; stop before checkpoint 5.

**Goal:** Recreate the approved reference's shared public chrome and motion while preserving TwinLink application behavior.

**Architecture:** Add a uniquely scoped `trinity-foundation` marketing shell with local Open Sans/Roboto, Bootstrap icon glyphs from captured licensed assets, white 70px header, desktop dropdowns, mobile overlay, four-column dark-blue footer and back-to-top. Keep existing page bodies on a contained legacy surface until their page-specific checkpoints; shared hero/resource layouts can adopt reference geometry and timings without changing their data/children. No service routes or server/action changes.

**Tech Stack:** Existing Next.js/React/TypeScript; scoped CSS; no new runtime packages.

**Spec:** `docs/checkpoint-2/README.md`, `docs/checkpoint-3/README.md`, user checkpoint 4 instruction.

## Global constraints

- No changes to root fonts/global styles, UI primitives, auth layouts, dashboards, admin, queries, actions, middleware or schemas.
- Keep all existing URL/anchor/account destinations. Do not link unimplemented service routes.
- Preserve TwinLink mark/company facts; don't display Trinity's business identity.
- Main grid: 576/768/992/1200/1400 breakpoints, 70px header; mobile nav below 992; 300ms menu, 400ms buttons, 500ms fade, 5s carousel, 1s reveals; reduced-motion alternatives.

## Review focus

- Menu keyboard/Escape/focus return and closed-menu tab order.
- Scroll lock cleanup on viewport/route changes; hash-link navigation on same page.
- Anonymous versus signed-in account actions; no new auth requirement.
- Nested public components keep form validation/data bindings and legible existing content.
- Scoped CSS leaves auth/admin/candidate styling unchanged.

## Tasks

- [x] 1. Baseline tests and desktop/mobile/portal-style captures; add failing browser tests for 70px white header, 992px navigation and modal menu focus behavior.
- [x] 2. Implement scoped shell, local font/icon assets, shared buttons/grid, accessible menus, footer and back-to-top; keep existing component signatures.
- [x] 3. Adapt shared hero/resource layouts and reveal/carousel timing with pause and reduced-motion behavior; preserve content children, controls and CTA links.
- [x] 4. Browser checks at 390/768/991/992/1440; compare reference and implementation chrome/regions in combined images. Exercise menu, anchors, back-to-top and contact draft. Compare portal-style baselines.
- [x] 5. Run node tests, lint, type/build checks; independent code review; document scope/fidelity limitations and verification. Commit/push checkpoint branch and verify remote SHA. Stop.

## Execution record

- Work stayed in the existing managed checkout on `codex/checkpoint-4-visual-foundation`, branched from checkpoint 3.
- Baseline Node tests passed; header browser check RED at 69px, then GREEN at 70px/white.
- Scoped shell, fonts/icons/decorations, keyboard/mobile behavior, footer and motion implemented. Existing page bodies remain contained as specified.
- Independent review: three P2 issues reproduced and fixed (contrast, Insights destination, keyboard pause). No deferred minors or unresolved review findings.
- Visual QA: panel overlap and mobile caption geometry RED→GREEN; indicator pixel contrast RED→GREEN; final paired production evidence inspected and accepted.
- Production build, lint, TypeScript, five Node test files, browser and source-preservation checks passed. Commit/push conclude the checkpoint; no merge/deployment or checkpoint 5 work.
