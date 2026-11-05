# Checkpoint 7 — Whole-site visual and interaction QA

Status: completed, with the documented reference/data limits. Checkpoint 8 has not started.

Baseline: `87831994a5aae6215f9b568c24a7e7840771289f`. Scope includes every Trinity inventory entry, the shared navigation graph, TwinLink-only resource/auth/job surfaces, loading/error states, responsive boundaries and reduced motion. Prior checkpoint QA is retained in `subpage-qa-baseline.md`.

## Comparison inputs

The 15 desktop/mobile reference captures from checkpoint 1, original CSS/JS/assets and measurements from checkpoint 2, and the canonical map from checkpoint 3 are the comparison inputs. Current live access to `www.trinityconsulting.asia` returns proxy HTTP 403. No policy bypass was attempted. Six source PHP aliases remain historical reference aliases, not new TwinLink pages.

Final captures use 1440×900 desktop and 390×844 mobile with touch emulation and device scale 1. Reduced motion settles visual comparisons; normal motion is tested separately. Life remains `/about#culture`, captured as a complete integrated section. Source Life, Contact and Cybersecurity mobile documents omitted viewport metadata and produced 980px captures; TwinLink retains its correct responsive viewport. Pair canvases normalize source width and pad shorter pages with gray.

## Changes

- Loading surfaces use the blue TwinLink mark, a visible Loading label and a busy/live status. Reduced motion leaves a static indicator. Root loading covers the screen in white; the desktop auth loading card reserves form space. Small button spinners inherit text color so destructive and primary actions remain readable. There is no artificial application delay or fake percentage.
- The old `marketing-theme` palette could override the public theme. Explicit public specificity and the inner content container now stabilize white surfaces and public control tokens. The final browser sweep asserts the computed white content background on every marketing entry, preventing a return to the legacy dark shell. Scoped hooks adapt the existing resource list/detail/CTA and job view, with consistent white fields, blue links, green actions, 24px card/25px article headings and 15px article copy. Queries, filters, publication rules, metadata, application branches and event/draft behavior remain.
- Public sign-in/register presentation now shares local Open Sans/Roboto, blue/white surfaces and the TwinLink header. Authentication forms, schemas, invitation logic, approval rules, callbacks and actions remain byte-identical. Public not-found/error boundaries receive matching presentation; Retry behavior is retained.
- Keyboard Arrow Down previously focused a submenu link in a requestAnimationFrame before React necessarily removed `inert`. Focus now follows the committed open group. Mouse-leave closes only the group being left, preventing a stale hover from closing a keyboard-opened group. Destinations and account routing are unchanged.
- Production hydration replay could retry a host `main` after its cursor had advanced. A constant keyed Fragment groups streamed children in the marketing main/auth card, keeping child suspension outside the host replay path without adding DOM. The tracker-placement experiment did not resolve the failure and was reverted. VisitorTracker remains unchanged. The runtime matches the mechanism described by [React PR 35494](https://github.com/facebook/react/pull/35494) and the [official changelog](https://github.com/facebook/react/blob/main/CHANGELOG.md). The public workaround is tested; no framework package, vendored code, hydration suppression or client-only page rendering is introduced.
- Reduced-motion handling now reaches root smooth scrolling and both compound transforms and CSS individual scale. About/resource/home hover feedback retains colors while removing image movement. Normal carousel, reveal, hover-circle and menu timing remain reference-based.

## Visual inventory review

All entries below passed desktop/mobile layout, shared navigation and image checks; each has a paired capture.

| Inventory | TwinLink destination | Reviewed adaptation |
| --- | --- | --- |
| T01 | `/` | Carousel, topic grids, hover circles, insights and footer; retains TwinLink sections. |
| T02 | `/about` | Hero, principles, culture, FAQ and footer; retains company facts. |
| T03 | `/about#culture` | Life image/text order; integrated section rather than duplicate route. |
| T04 | `/careers` | Apply hero and responsive board; preserves job-bound application flow. |
| T05 | `/privacy` | Privacy hero and readable/persistent controls; retains actual policy. |
| T06 | `/contact` | Wave hero, information cards and validated draft form; no fabricated offices/maps. |
| T07 | `/services/digital-strategy-transformation` | Wave, laptop image, copy and related sidebar. |
| T08 | `/services/managed-application` | Wave, device image, copy and related sidebar. |
| T09 | `/services/cloud-services` | Wave, cloud image, copy and related sidebar. |
| T10 | `/services/enterprise-services` | Wave, team image, copy and related sidebar. |
| T11 | `/services/sap-services` | Wave, SAP image and availability caveat. |
| T12 | `/services/infrastructure-services` | Wave, code image, copy and related sidebar. |
| T13 | `/services/cybersecurity-risk` | Wave, security image; correct mobile viewport retained. |
| T14 | `/services/big-data-analytics` | Wave, analytics image, copy and related sidebar. |
| T15 | `/services/erp` | ERP photo hero and service-category links; retains truthful availability. |

Additional public review covers case studies, blog, events, their discovered detail/section links, sign-in, registration, loading and missing/error states. Public menu families retain TwinLink's actual destinations; HR enquiry destinations are tested without inventing new service pages. Private paths remain guarded and are outside the claimed authenticated visual coverage.

## Verification method

`site-check.cjs` checks the complete inventory and legacy public entries, all four header groups per marketing page, keyboard/touch navigation, focus trap/inert restoration, fixed header/back-to-top, recursively discovered internal destinations/fragments, responsive layouts at 320/375/390/576/768/991/992/1200/1440px and carousel controls/pausing. It waits for hydrated, visible content before measuring geometry and retains page exceptions.

`loading-check.cjs` exercises the actual Next router boundary. It permits the ordinary layout prefetch, delays only the navigation data request in the browser, captures Loading, releases the request and verifies the existing registration form. Desktop/mobile and normal/reduced motion are separate checks. This delay is confined to the harness.

`motion-check.cjs` covers the shared animation/hover families, timing, all 16 topic cards, three hover circles, About cards, resource image scale, selected filters, related-service/footer hover, desktop story sidebar and phone menu animation.

`fixtures.cjs` runs on a separate local QA port and generates bundles under ignored `node_modules/.cache/checkpoint-7`. It imports actual loading/error/resource/job components. Next Link/Image/navigation and server-data adapters are test-only; actions throw if called. Fixture scenarios are not jobs, publications or routes shipped by the application. `fixture-check.cjs` covers root/auth/marketing/panel/button loaders, error Retry, resource search/category/clear, guest/approved/applied branches, required fields, calendar export, section anchors and contact drafts. It also verifies every rendered image and zero page exceptions. The fixture document declares UTF-8 and a correct mobile viewport.

`subpage-check.cjs` and `interaction-check.cjs` retain the existing FAQ, careers/filter/sort/page-size, persistent privacy, contact validation/draft and related-service checks. `guards-check.cjs` visits every inventoried protected page pattern logged out, then public missing-page states. `preservation-check.cjs` requires byte identity for protected source and exact presentation-only transformations for the public wrappers/menu; dependency, migration and original asset files remain unchanged.

For isolated diagnosis, `QA_PHASE=responsive` runs only that phase of `site-check.cjs` and produces a separately named result. It is not a full acceptance run.

## Results

- Production sweep: 40 desktop/mobile page states, 144 menu states, 302 navigation destinations and fragments, and 65 responsive layouts across nine widths. Every inventory entry has a reference pair in `evidence/compare-Txx-{desktop,mobile}.jpg`; eight `sheet-*` files index all 30 pairs.
- Normal/reduced motion: both complete shared-family runs passed, including 16 topic hovers, three career circles and three About cards per run, selected resource filters, related-service/footer hover, mobile menu timing and the 96px sticky story sidebar. Instant positioning in the harness avoids smooth scrolling moving the hovered target during measurement.
- Loading: four real production navigation states passed (desktop/mobile × normal/reduced). The separate fixture suite passed 28 component/data states. Four missing-page states and all 50 protected route patterns passed logged-out checks.
- Early-header regression: 60 production states passed without React hydration exceptions. The retained subpage run passed 28 mapped desktop/mobile states plus unknown-service handling; additional careers/contact/enquiry checks passed.
- All 31 existing tests passed; lint, TypeScript and production build passed. Preservation verifies 246 byte-identical source files, 13 exact public presentation/menu transformations, two view replacements, all 68 existing page routes, unchanged dependency files/migrations/assets, and unchanged queries/actions/auth/permissions/forms/private routes.

Reference pairs were visually reviewed for all T01–T15 in both sizes. Service hero waves, image order, body/sidebar structure, headers and footer families align with the established standard. Longer TwinLink sections and its application/legal content intentionally change page height. Life remains an integrated About section. Before/after pairs document the older blog/login/register surfaces; final loading, fixture detail/job, menu and sticky captures document states without direct reference equivalents. No pixel-perfect claim is made where branding, content or source viewport defects differ.

Historical `*-development.txt`, `site-production*.txt`, `hydration-tracker-red.txt` and `responsive-probe.txt` logs retain diagnostic attempts, including rejected tracker placement and test-readiness failures. They are not acceptance results. Final acceptance uses `site-final.txt`, `motion.txt`, `loading-production.txt`, `fixtures-production.txt`, `hydration.txt`, `guards.txt`, `subpages-final.txt`, `interactions-final.txt` and their result JSON files.

## Reproduce

Use the existing isolated checkout; do not create a worktree. Activate Node 22 and run commands from `/workspace/twinlink`. Playwright, Chromium and sharp are supplied by the prepared environment. The fixture bundler is a tool outside the repository, installed with `npm install --prefix /workspace/.twinlink-qa-tools --no-package-lock --no-audit --no-fund esbuild@0.28.2`; it is not a runtime dependency.

1. Run `npm test`, `npm run lint`, `npm run build`, then `npx --no-install tsc --noEmit`. Stop development servers before building. Use the normal command execution context if the restricted sandbox blocks test child processes or local ports.
2. Start `npm start -- --hostname 127.0.0.1 --port 3000` and `node docs/checkpoint-7/scripts/fixtures.cjs` as separate processes.
3. Run `site-check.cjs`, `subpage-check.cjs`, `interaction-check.cjs`, `loading-check.cjs`, `fixture-check.cjs`, `motion-check.cjs`, `guards-check.cjs`, `hydration-check.cjs` and `preservation-check.cjs` under `docs/checkpoint-7/scripts`.
4. Run `compare.cjs` after captures. Its reference-left/TwinLink-right pairs and legacy before/after images are reproducible. Final image dimensions and source/render hashes accompany the report. Run `manifest.cjs` last to bind the evidence to the production build and source tree.

## Remaining differences and limits

TwinLink keeps its actual branding, company facts, legal notice, published-resource/job queries, searchable board, job-bound applications and email-draft semantics. It does not acquire Trinity's offices/maps, general CV email intake, legal boilerplate, certifications, vendor partnerships or misrouted HR links. SAP/ERP availability caveats remain. Resources, accounts and portals have no direct Trinity counterpart and use the common visual standard.

`evidence/unavailable-assets.json` lists 22 references to unavailable editorial originals; each has an existing available local fallback. Reference photography retains checkpoint 2's permission-or-replacement condition before production use. No new images, external hotlinks, maps or unlicensed substitutes were introduced. Source captures can differ in text wrap because blocked Google Fonts used fallbacks while TwinLink bundles the intended families locally.

No real authenticated Supabase session, remote migration, application, upload, email or account write was performed. The public browser run uses the repository's existing fallback-content behavior where configuration is absent. Private pages are checked for logged-out protection; their authenticated UI is not claimed as visually verified. Job/candidate branches are tested with clearly identified isolated fixtures and existing tests. Browser validation uses installed Chromium with desktop and mobile touch emulation; other engines/devices were not run.

Invalid allowlisted-service URLs can produce Next 15's existing internal `NoFallbackError` server diagnostic while returning the intended 404 UI. This is distinguished from client page exceptions and valid-page failures. There is no deployment or merge in this checkpoint.
