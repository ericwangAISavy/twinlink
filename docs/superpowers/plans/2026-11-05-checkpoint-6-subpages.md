# Checkpoint 6 Subpages Implementation Plan

**Goal:** Recreate all 14 inventoried subpages through the approved canonical TwinLink route map.
**Architecture:** Existing Next marketing shell; scoped subpage styles and shared photo/blue-wave banners, allowlisted service data/template. Preserve existing backend and functional components. Life is a complete section at `/about#culture`, not a new URL.
**Spec:** Checkpoint 1 desktop/mobile captures, checkpoint 2 CSS/assets/measurements, checkpoint 3 approved route map and checkpoint 6 user instruction.
**Baseline:** `c0c19d5fb9d9fce0f4f59dcb4fde43e2af566968`.

- [x] Inspect each source desktop/mobile page and DOM; copy approved original subpage assets with hashes.
- [x] Add failing coverage for all nine allowlisted service routes, unknown slugs, image existence, preserved company/jobs queries and interactive controls.
- [x] Add `subpage-shell.tsx` and `subpages.css`: photo banners, shared wave title, source 9/3 service layout, responsive sidebar, white forms/typography. Keep CSS scoped to `.trinity-foundation .sub-page`.
- [x] Implement services data and `/services/[slug]/page.tsx`; preserve each page’s headings, imagery and paragraph/list structure while describing unverified capabilities as topics for discussion, never invented certifications/clients/offerings.
- [x] Recreate About photo/intro/mission/vision/goal, retain company values and FAQ; include complete Life banner/image/culture at `#culture` with Careers CTA.
- [x] Restyle Contact/Privacy/Careers using captured layouts and existing ContactForm/PrivacyPreference/OpenRolesBoard; preserve validation/email-draft semantics, opt-out and every job filter/query/application link. Do not add anonymous CV intake, source office maps or fake email delivery.
- [x] Connect new Tech routes from shared menus/footer and homepage cards; keep existing anchors/resources/account links; HR remains enquiry/careers.
- [ ] Browser-check each canonical page and Life section at 1440×900 and 390×844, plus grid boundaries/short phone; record paired comparisons, test forms/FAQ/privacy/job filtering and navigation without production writes.
- [ ] Independent review; fix significant findings; run tests/lint/TypeScript/production build and protected-source/hash checks.
- [ ] Commit/push checkpoint 6 only, verify remote and clean tree, stop before checkpoint 7.

Review focus: unknown services must 404; long titles/sidebars must fit phones; unverified SAP/ERP claims stay neutral; privacy text and preference logic stay intact; empty/query-error jobs states retain behavior. Existing job detail, auth, permissions, server queries/actions/API/admin/dashboard and editorial pages stay byte-identical.

User requested a resumable WIP commit before final acceptance; resume from `docs/checkpoint-6/HANDOFF.md`. Final verification/QA and completion push remain open.
