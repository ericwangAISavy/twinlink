# Checkpoint 6 — Inventoried subpages (resumable work in progress)

**Status: implementation committed for workspace handoff; final verification/QA acceptance remains unfinished. Read [HANDOFF.md](HANDOFF.md) first. Do not begin checkpoint 7.**

Implements all fourteen subpage inventory entries using checkpoint 3’s canonical TwinLink map. Homepage work remains checkpoint 5; its Tech cards now reach the implemented destinations. Checkpoint 7 has not started.

## Coverage

| Reference | TwinLink destination | Presentation and preserved behavior |
| --- | --- | --- |
| About | `/about` | Original skyline, About photograph, three Mission/Vision/Goal cards; existing company copy, values, independently toggled FAQ and Careers links retained. |
| Life at Trinity | `/about#culture` | Complete original Life banner and work-life photograph with TwinLink culture copy and Careers CTA, incorporated into About as approved. |
| Careers | `/careers` | Original recruitment banner and white content surface; existing published-job query, every role field, searchable/filterable board, sorting, counts, page sizes, pagination and role/application links retained. No general CV intake was invented. |
| Privacy Policy | `/privacy` | Original security banner, blue title strip and gray reading surface; TwinLink’s actual privacy notice, current-company email, browser preference persistence, DNT/GPC behavior and application policy remain. |
| Contact | `/contact` | Original blue wave, shadowed information/form panels and green actions; TwinLink headquarters/time zone/current email and existing validated email-draft form retained. No fake office directory, maps or server email delivery. |
| Digital Strategy & Transformation | `/services/digital-strategy-transformation` | Original detail image, source blue-wave title, 9/3 content/sidebar and structured planning paragraphs. |
| Managed Application | `/services/managed-application` | Original photograph after two introductory paragraphs, source content/sidebar composition. |
| Cloud Services Solutions | `/services/cloud-services` | Original cloud image after two introductory paragraphs and five planning topics. |
| Enterprise Services | `/services/enterprise-services` | Original enterprise photograph and three-paragraph composition. |
| SAP Services | `/services/sap-services` | Original SAP illustration and four planning topics; explicitly no implied vendor partnership, certification or established specialist offering. |
| Infrastructure Services | `/services/infrastructure-services` | Original source-code image, two-paragraph composition and sidebar. |
| Cybersecurity & Risk | `/services/cybersecurity-risk` | Original security image and four risk/control topics. |
| Big Data & Analytics | `/services/big-data-analytics` | Original analytics photograph and four data topics. |
| ERP Software | `/services/erp` | Original ERP photo banner, text-only article and related-service/sidebar links. Availability and platform expertise must be confirmed. |

The nine service slugs are allowlisted with `generateStaticParams`, `dynamicParams = false` and a `notFound()` guard. Unknown destinations return HTTP 404. Header, footer and all eight Tech homepage cards now use canonical routes; existing anchors/resources/account destinations remain. HR cards continue to use enquiries rather than reproducing the source’s ERP misroutes. Trinity’s six PHP variants remain source aliases, not newly invented TwinLink URLs.

## Content and flow adaptations

The reference’s visual structure is reproduced with TwinLink identity and content. Service articles describe planning topics and potential project scopes, avoiding copied claims about Trinity’s market leadership, customers, Singapore offices, certifications or partnerships. SAP/ERP capability gaps recorded in checkpoint 3 are explicit. Service topics have no new forms, backend tables or queries.

About’s extra mission/vision, values and FAQ content and the integrated Life section make it longer than Trinity’s About. Privacy is shorter because the actual TwinLink notice is retained rather than replaced by unrelated legal boilerplate. Careers intentionally keeps a job board in place of Trinity’s general CV-upload form. Contact keeps all existing fields (including topic and organization) and the truthful “Prepare email” behavior. Those differences preserve working application flows and are expected in the comparisons.

## Verification and evidence

Desktop and mobile captures are `evidence/T02-desktop.png` through `T15-mobile.png`. All are browser renders of the production build at 1440×900 and 390×844, device scale 1, reduced motion for settled images. T03 is an element capture of the integrated culture section; its fixed header position differs from a standalone reference page. Full native captures are authoritative; contact sheets are overviews.

`compare-Txx-*.jpg` puts reference on the left and TwinLink on the right. Desktop pairs use equal 500px scale from 1440px. Mobile pairs normally retain 390px width. Life, Contact and Cybersecurity source pages omit the viewport meta tag and produced 980px-wide mobile captures. Those sources are scaled to 390 for the overview, rather than misreported as identical CSS viewport geometry. TwinLink keeps its existing responsive viewport declaration and readable 390px layout. Gray canvas is padding beneath the shorter page. Focused comparisons provide readable matching regions separately.

`scripts/browser-check.cjs` checks all fourteen entries in both modes, image loading, document overflow, page exceptions, nav keyboard/mobile behavior, FAQ state, job search, persistent privacy preference, contact draft and related-service navigation. Tracking requests are intercepted in the verification browser; no email draft is sent and no job application is submitted. `geometry-check.cjs` covers 390×480/568, 375×667, 768/992/1440×900 and normal-motion reveal visibility. It reproduces and verifies short-phone title clearance and 40px search text inset.

`tests/subpages.test.mjs` checks allowlisted lookup including prototype/path-like input, original image existence, actual service-page rendering/metadata/not-found behavior, and careers/contact query wiring/empty/failure cases. Existing tests retain account-state and homepage query coverage. Functional ContactForm, PrivacyPreference, AboutFaq and OpenRolesBoard implementations are byte-identical; only their scoped presentation changes.

`preservation-results.json` records 249 pre-existing source files byte-identical to checkpoint 5, all 68 existing route files retained, scoped subpage selectors and seventeen original image hashes. Root globals, auth, permissions, APIs, server queries/actions, dashboard/admin, job details/application forms and editorial pages are unchanged. No authenticated private account or production submission was exercised; isolation is established by source checks and existing tests.

Build, TypeScript, ESLint, complete tests and browser verification outputs are included in `evidence/`. Run browser scripts with `PREVIEW_URL=http://127.0.0.1:3000` and a local production server. Paired evidence is reproducible with `node docs/checkpoint-6/scripts/compare.cjs`. The root `design-qa.md` records visual findings, fixes and final acceptance; checkpoint 5’s report is archived in this directory.

## Assets

Seventeen exact originals are copied from checkpoint 2 and listed with SHA-256 hashes in `assets.json`. Other imagery/fonts/icons/wave come from checkpoints 4/5. No hotlinks, generated substitutes or Trinity wordmark are introduced. Captured photography retains checkpoint 2’s permission-or-replacement status; this commit does not establish ownership or license and does not deploy it. No new inaccessible asset was needed. External reference maps and unrelated office details are replaced by TwinLink’s actual contact information.
