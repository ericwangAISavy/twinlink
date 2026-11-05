# Checkpoint 6 — Inventoried subpages

**Status: checkpoint 6 implementation and final production/browser/visual verification complete; awaiting user approval before checkpoint 7.**

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

`preservation-results.json` records 248 pre-existing source files byte-identical to checkpoint 5, all 68 existing route files retained, scoped subpage selectors and seventeen original image hashes. The header differs only by an explicit Suspense boundary around SiteNav, checked against an exact transformation of the baseline header. MarketingLayout, VisitorTracker, root globals, auth, permissions, APIs, server queries/actions, dashboard/admin, job details/application forms and editorial pages are unchanged. No authenticated private account or production submission was exercised; isolation is established by source checks and existing tests.

Build, TypeScript, ESLint, complete tests and browser verification outputs are included in `evidence/`. Run browser scripts with `PREVIEW_URL=http://127.0.0.1:3000` and a local production server. Paired evidence is reproducible with `node docs/checkpoint-6/scripts/compare.cjs`. The root `design-qa.md` records visual findings, fixes and final acceptance; checkpoint 5’s report is archived in this directory.

## Assets

Seventeen exact originals are copied from checkpoint 2 and listed with SHA-256 hashes in `assets.json`. Other imagery/fonts/icons/wave come from checkpoints 4/5. No hotlinks, generated substitutes or Trinity wordmark are introduced. Captured photography retains checkpoint 2’s permission-or-replacement status; this commit does not establish ownership or license and does not deploy it. No new inaccessible asset was needed. External reference maps and unrelated office details are replaced by TwinLink’s actual contact information.

## Final verification (2026-11-05)

Resumed from `56af68ebdfdbbf67f5bd17923d2d077594f882e4`. Three sequential clean-production browser passes completed all 28 page/viewport states each, with zero page exceptions and unknown-service HTTP 404. Per-run logs and JSON are `evidence/browser-final-pass-{1,2,3}.txt` and `browser-final-results-{1,2,3}.json`. The build was restarted before acceptance; no disposable React diagnostics are in the final build or source.

Error 418 did recur after the original main-fiber readiness guard. Browser-only React diagnostics confirmed an expected `main` host with no hydration cursor despite the correct main DOM. A boundary around main did not fix it and was reverted. The final change isolates the interactive SiteNav in a Suspense boundary in SiteHeader; its server HTML, signed-in input, nav handlers and links are retained. In addition to the three complete passes, `scripts/hydration-check.cjs` exercises each entry's header as soon as the header fiber is available, without waiting for main hydration, and then updates BackToTop. All 28 states passed. This establishes the observed regression result, not a proof of an upstream React scheduling defect or every possible browser timing. Earlier red evidence is retained separately.

The capture harness also now requests eager image loading before decoding and fails with a URL-specific timeout. This resolves a diagnosed mobile About capture stall caused by an offscreen lazy image; it does not change application loading behavior or weaken the image assertions.

Final `npm test`: 31 passed, zero failed/skipped across seven files. Run in the normal process/network execution context: the restricted command sandbox's child test runner only summarized seven file processes, so the final retained run verifies all 31 individual tests. ESLint, TypeScript, production build, geometry, caption, interactions and preservation checks all passed; see the `*-final.txt` files and associated JSON. No real Supabase account, production write, email sending or application submission was exercised.

All 28 paired images and eight contact sheets were regenerated after the final captures. `scripts/focus-compare.cjs` regenerates focused About, Privacy, Contact, service and desktop/mobile Careers pairs plus image dimensions. Final visual review covers every inventory entry in both modes; expected content/height and viewport adaptations above remain intentional. Assets retain the existing permission-or-replacement limitation before production use. No deployment, merge or checkpoint 7 work was performed.

## Final capture review

After the three production interaction passes and 28-state early-header regression, two further complete 28-state browser passes ran serially with software rendering (`capture-final-pass-1.txt`, `capture-final-pass-2.txt` and matching JSON). These passed with no page exceptions. This corrected a full-page Chromium compositor artifact (repeated header tiles in a mobile Infrastructure capture); the isolated live DOM had exactly one header/main and a fresh capture rendered correctly. Final native images, dimensions, all pairs and contact sheets were regenerated after the second serial pass. No application CSS or DOM was changed for capture. Both original failed hydration evidence and the accepted final logs remain distinct.

| Entries | Final desktop/mobile visual review |
| --- | --- |
| T02 About | Skyline, photograph, three image cards, additional retained values/FAQ and integrated culture section; no clipping. |
| T03 Life section | Complete banner/image/copy/CTA; integrated crop intentionally omits standalone header/footer. Source mobile viewport defect remains documented. |
| T04 Careers | Apply here caption aligns in desktop/mobile focused pairs; original working board and every filter retained below. |
| T05 Privacy | Banner, blue title strip, gray reading surface and legible retained notice/preference control; shorter legal content is intentional. |
| T06 Contact | Wave, shadowed cards, labeled white fields, contrast and preserved email-draft action; no copied foreign offices/maps. |
| T07 Digital strategy | Wave, wrapped heading, justified article, exact image and outlined related-service rows. |
| T08 Managed application | Photograph follows two introductory paragraphs; desktop sidebar/mobile stack intact. |
| T09 Cloud services | Two paragraphs precede image; planning topics remain readable without clipping. |
| T10 Enterprise | Original image proportions, three-paragraph composition and responsive sidebar. |
| T11 SAP | Exact illustration, readable planning topics and explicit capability caveat. |
| T12 Infrastructure | Correct native full-page image and footer after compositor recapture; no repeated content in final pair. |
| T13 Cybersecurity | Exact image and risk topics; responsive TwinLink viewport retained despite source's missing viewport meta. |
| T14 Big data | Exact photograph, planning topics, sidebar and phone stacking. |
| T15 ERP | Exact photo banner, readable text-only article, category links and capability caveat. |
