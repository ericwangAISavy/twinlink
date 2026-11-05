# Checkpoint 5 Homepage Implementation Plan

**Goal:** Recreate every reference homepage section with the approved captures/assets and checkpoint 4 shell, preserving TwinLink data and working routes.
**Baseline:** `2f590ac6d05750b3c145c81686f21dfd590e890c`.
**Spec:** checkpoint 1/2 evidence, checkpoint 3 route map, user checkpoint 5 instruction.

- [x] Establish failing browser check for reference-style homepage sections.
- [x] Copy approved unbranded reference section assets; preserve TwinLink identity. Extend existing hero to support per-slide captions and supplied photos while retaining pause/dot/reduced-motion behavior.
- [x] Build white About, pale-blue 8-card Tech/HR grids, values and What We Do sections with exact desktop/tablet/mobile geometry. Keep original anchors and all existing destinations; no service routes or anonymous file intake added.
- [x] Retain parallel statistics/publication queries, featured-case selection/image fallback and dynamic content. Keep an Insights anchor when publications are empty. Add scoped homepage CSS only.
- [x] Verify browser layouts/interactions, data states and unchanged private/application source; compare paired desktop/mobile screenshots. Independent code review and fix important issues.
- [x] Run build/lint/type/tests, document asset/identity/content adaptations, commit/push and stop before checkpoint 6.

Implementation uses existing React/Next components, local fonts and original captured files. No new runtime packages, backend, auth changes or deployment. Captured Trinity-branded hero art is replaced with existing TwinLink imagery; other unbranded source images are reused. General CV upload and unsupported detail routes remain outside this checkpoint.
