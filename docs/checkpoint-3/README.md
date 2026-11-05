# Checkpoint 3 — Trinity → TwinLink route and logic map

**Status: proposed mapping ready for approval. No route, navigation or application changes implemented. Stop before checkpoint 4.**

Baseline: `c8caaa4fb3371523df3ca607941311b81c82b227`. Prepared November 4, 2026 (America/Chicago; November 5 UTC). Sources: approved [page inventory](../checkpoint-1/README.md), [visual/asset inventory](../checkpoint-2/README.md), and current repository source. This is a source review, not a production account/database test.

## Decision proposed for approval

Keep TwinLink's existing public URLs and application flows. Update their presentation to use the approved reference direction. Add **nine service content destinations** through a proposed marketing route `/services/[slug]`; reuse `/about#culture` for Life at TwinLink, `/privacy` for privacy, and `/careers` for the public careers entry. No separate Life, HR detail, general CV, job-tips or service-index route is needed in this mapping.

A single allowlisted service-page template is the proposed implementation choice, rather than nine unrelated page implementations or renaming existing routes to Trinity's legacy spellings. It gives each inventoried service page a meaningful destination while keeping shared presentation consistent. These URLs are **proposals**, not working routes yet. SAP, ERP and other reference service descriptions do not establish TwinLink capabilities; their company-specific content needs approval before links/pages go live. Full reference coverage requires nine service destinations; if a capability is not offered, keep its destination out of navigation instead of publishing a false claim.

The review boundary is concrete: this document maps 15 reference pages, six PHP variants, all source HR/CTA interactions, and all 12 current marketing route patterns. [route-map.json](route-map.json) also inventories all **68 current page/handler patterns**, including protected routes, with source paths. [source-index.json](source-index.json) records hashes and line anchors for 52 source files inspected for public-page dependencies. Route-group names such as `(marketing)` are filesystem layout groups, not URL segments.

## 1. Every reference page mapped

“Existing” below is verified against source files. “New” means needed only for the proposed full-reference content coverage; implementation awaits checkpoint approval. All public pages inherit the shared logic in section 3.

| ID | Inventoried Trinity path | TwinLink destination | Disposition | Logic/content to preserve or gap |
| --- | --- | --- | --- | --- |
| T01 | `/` | `/` | Update existing homepage | Preserve live statistics, published featured case-study selection, image fallback, Careers links and existing anchors. |
| T02 | `/about` | `/about` | Update existing About page | Preserve TwinLink mission/vision/values/culture content, `#values`, `#culture`, FAQ toggles and Careers CTAs. The page body is currently static; do not invent a company query binding it does not use. |
| T03 | `/life-at-trinity` | `/about#culture` | Reuse existing section | Current culture section and Careers link are the equivalent. No standalone Life route. Navigation label becomes “Life at TwinLink.” |
| T04 | `/carrer` | `/careers` → `/careers/[id]` | Update existing careers entry; partial equivalent | Keep the job board and job-specific apply/save states. Trinity's general CV upload is **not equivalent** to the board or candidate registration. No general CV intake is added. |
| T05 | `/privacy-policy` | `/privacy` | Update existing privacy page | Preserve TwinLink application/visitor/reputation disclosures, company email, `#preferences` and browser opt-out behavior. Do not substitute Trinity's policy text. |
| T06 | `/contact` | `/contact` | Update existing Contact page; partial equivalent | Preserve company email query/fallback and the email-draft form. No server-delivery endpoint, four-office directory or map integration exists here. Retain TwinLink's China/UTC+8 facts. |
| T07 | `/digitalstrategy&transformation` | `/services/digital-strategy-transformation` | New service destination | Home Solutions is a conceptual overview, not a detail page. No page-specific backend/query/form exists to migrate. |
| T08 | `/managed-application` | `/services/managed-application` | New service destination | No standalone equivalent. Preserve shared auth-aware shell, company email and tracking; proposed body is approved static service content. |
| T09 | `/cloud-services-solutions-singapore` | `/services/cloud-services` | New service destination | Home “Cloud & Infrastructure” is a partial conceptual equivalent; do not inherit the Singapore claim from the source slug. |
| T10 | `/enterprise-services` | `/services/enterprise-services` | New service destination | No standalone service page or service-content backend exists. Keep editorial content separate. |
| T11 | `/sap-services` | `/services/sap-services` | New destination + content gap | No verified SAP offering/equivalent in the inspected TwinLink public source. Do not publish the claim solely because Trinity has it. |
| T12 | `/it-software-solutions` | `/services/infrastructure-services` | New service destination | Maps the source's actual “Infrastructure Services” heading, rather than its misleading source filename. Existing cloud/infrastructure overview remains reachable. |
| T13 | `/cyber-security` | `/services/cybersecurity-risk` | New service destination | No standalone equivalent. Security articles in the journal are not evidence of a commercial service offering. |
| T14 | `/big-data-&-Analytics` | `/services/big-data-analytics` | New service destination | Home “AI & Automation” is partial conceptual overlap; preserve its content and use clean lowercase URL spelling. |
| T15 | `/erp` | `/services/erp` | New secondary service destination + content gap | No equivalent ERP page/offering established. Source HR links to ERP are misroutes, not evidence that payroll/staffing should lead here. ERP belongs in a related-service link only if approved. |

Proposed implementation location for T07–T15: `src/app/(marketing)/services/[slug]/page.tsx` with nine explicit slug entries and a `notFound()` branch for unknown slugs. It would inherit `(marketing)/layout.tsx`. There is no plan to add service tables, action endpoints, account gates or a `/services` index. Dropdown parents will be buttons, not links to a nonexistent index. The service body must not substitute static reference data for dynamic TwinLink data elsewhere.

### Six reference URL variants

These were HTTP-200 duplicates in checkpoint 1; all normalize to the same targets for planning purposes:

| Source variant | Planned destination |
| --- | --- |
| `/carrer.php` | `/careers` |
| `/cloud-services-solutions-singapore.php` | `/services/cloud-services` |
| `/cyber-security.php` | `/services/cybersecurity-risk` |
| `/big-data-&-Analytics.php` | `/services/big-data-analytics` |
| `/sap-services.php` | `/services/sap-services` |
| `/it-software-solutions.php` | `/services/infrastructure-services` |

These paths belong to Trinity, not current TwinLink URLs. No local legacy redirects are required or implemented merely because they appear in the reference inventory. Links in TwinLink should use its canonical targets directly. If a later requirement establishes real inbound TwinLink legacy URLs, handle them with an explicit redirect list; do not add a broad catch-all or proxy Trinity's PHP endpoints.

## 2. Current public pages: update scope and preservation

| Current TwinLink route | Planned public-page change | Existing logic that must survive |
| --- | --- | --- |
| `/` | Reference-inspired homepage sections and service links | `getPublishedResources()` + `getCompanyStatistics()` in parallel; featured case-study selection, image resolution, zero-publication state, database statistics; preserve `#solutions`, `#how-we-help`, `#people`, `#insights`. |
| `/about` | Company, values/culture and Life section presentation | Static TwinLink copy, `AboutFaq` independently toggled expanded states, existing Careers CTAs; preserve `#values` and `#culture`. |
| `/careers` | Restyle board and page chrome; keep board functionality | `getPublishedJobs()` → `OpenRolesBoard`; search, departments, location/work-type selections, team/workplace and inferred experience filters, sorting, page size, counts, reset and pagination; links use `/careers/${role.slug}`. |
| `/careers/[id]` | Restyle job description and apply panel | Slug-or-ID lookup, publication gate/404, metadata, approval-aware guest/candidate branching, existing application status, save role, optional sections and complete application fields. Keep param name `[id]`; do not confuse it with a literal slug-only contract. |
| `/contact` | Reference-style contact layout using TwinLink facts | `getCompanyProfile()`; email fallback; `ContactForm` validation and encoded `mailto:` draft. No auto-send claim. |
| `/privacy` | Reference-style long-form layout | `getCompanyProfile()`; TwinLink-specific disclosures and `PrivacyPreference`; footer deep link `/privacy#preferences`. |
| `/case-studies` | Shared public chrome; adapt list presentation without replacing content | `getPublishedResources()`, `kind === 'case-studies'`, `withResourceImage`, `ResourceList` search/category/empty state; preserve links and metadata. |
| `/case-studies/[slug]` | Shared detail presentation | Exact kind+slug lookup, `notFound`, dynamic metadata, company email; `ResourceDetail`, related published entries, image fallback, section anchors and scenario notices/metrics. |
| `/blog` | Shared chrome and list presentation | Published `blog` filter, image fallback, client category/search/clear/empty state and canonical article links. |
| `/blog/[slug]` | Shared detail presentation | Kind+slug publication lookup, metadata/404, email, related content and article/section anchors. |
| `/events` | Shared chrome and list presentation | Published `events` filter, image fallback, categories/search, dates in China Standard Time and explicit proposed-program status. |
| `/events/[slug]` | Shared detail/interest panel presentation | Kind+slug metadata/404; event-interest email draft with subject; `#interest`; calendar download only when date and end exist; no false attendance registration/reservation claim. |

Sources: [home](<../../src/app/(marketing)/page.tsx>), [About](<../../src/app/(marketing)/about/page.tsx>), [Careers list](<../../src/app/(marketing)/careers/page.tsx>), [job detail](<../../src/app/(marketing)/careers/[id]/page.tsx>), [Contact](<../../src/app/(marketing)/contact/page.tsx>), [Privacy](<../../src/app/(marketing)/privacy/page.tsx>). The machine-readable inventory links the remaining public page files. No current public URL is removed or renamed. Editorial listings/details have no Trinity equivalent and must remain first-class destinations rather than being replaced by static service pages.

### Data loading, cache and failure contracts

- **Company:** [queries/company.ts](../../src/server/queries/company.ts) reads singleton `company_profiles`, normalizes it and falls back to `defaultCompany()` if unavailable; persistent cache 120 seconds with `CACHE_TAGS.company`. Statistics read `company_content` key `company_statistics` and parse/fall back to defaults. Do not hardcode these dynamic footer/contact/statistics values from screenshots.
- **Editorial:** [queries/editorial.ts](../../src/server/queries/editorial.ts) reads `editorial_entries.content` where status is `published`, newest-created first; cache 60 seconds with `EDITORIAL_TAG`. Seed resources are a fallback only when Supabase is unconfigured or the editorial table is missing. An existing empty table is authoritative; it must not resurrect draft/archived content. Other loading errors throw. Preserve resource schemas, image handling and published related-content selection.
- **Jobs:** [queries/jobs.ts](../../src/server/queries/jobs.ts) returns only published jobs for the board, newest-created first, with a 60-second cache and published-job tag. Missing configuration/query errors currently yield an empty board. `getJobBySlugOrId` checks slug first, then ID; the detail page rejects absent/unpublished results. Preserve error, loading, empty and not-found UI as well as successful states.
- **Private reads:** candidate application/saved-job reads use the server session and candidate ID, not a globally cached public client. They run on public job detail only for an approved candidate. Keep publication data separate from session-specific results.
- **Admin writes:** company edits invalidate company-tag consumers; job writes invalidate published-job consumers; editorial writes invalidate `EDITORIAL_TAG` and public detail/list paths. Keep these existing invalidation paths and don't duplicate content into a static replacement store. Service content management would be new functionality and is not part of this map.

## 3. Shared layout, authentication and monitoring

[MarketingLayout](<../../src/app/(marketing)/layout.tsx>) concurrently loads `getCompanyProfile()` and `getCurrentUser()`, passes user state to the header and company content to the footer, mounts `VisitorTracker`, and renders marketing pages. New service pages must remain in this group. Auth UI, dashboards and admin have separate layouts; a marketing restyle must not move them into the public layout or change global styles in a way that breaks their controls.

[SiteHeader](../../src/components/marketing/site-header.tsx) offers `/login` and `/register` to anonymous visitors and `/dashboard` to signed-in visitors. Preserve that state and the mobile equivalents. `getCurrentUser()` is not a public-page login requirement. Role/approval enforcement remains in middleware and server authorization, not menu visibility.

[Middleware](../../src/lib/supabase/middleware.ts) refreshes Supabase session cookies, protects `/dashboard*` and `/admin*`, checks `profiles.role`/`access_status`, redirects blocked candidates to sign-out, rejects wrong-role destinations, and sends signed-in auth-page visitors to permitted destinations. [authorization.ts](../../src/server/authorization.ts) repeats trusted-profile/role checks for server pages/actions. Preserve all guards. Candidate approval is not bypassed by adding public service routes.

[VisitorTracker](../../src/components/marketing/visitor-tracker.tsx) records only pathname, honors DNT/GPC and `twinlink-visitor-opt-out`, throttles per pathname in session storage for 60 seconds and uses beacon/fetch fallback to `/api/visits`. [Visit API](../../src/app/api/visits/route.ts) checks enablement/service key, DNT/GPC, same-origin request, 1KB body and allowed public path syntax; then calls `record_site_visit`, optionally scheduling connection enrichment. It fails quietly with 204. [isPublicVisitPath](../../src/lib/visitor-metadata.ts) permits clean `/services/...` paths already; it excludes admin/dashboard/auth/API/login/register and rejects query/hash characters. No allowlist widening is needed for the proposed service URLs. Keep the 90-day retention/privacy behavior and admin-only visitor access; don't log form values or query strings.

`/privacy#preferences` toggles browser-local future monitoring; it does not disable applications. Preserve storage-denied feedback and live status text. Company/site facts stay TwinLink's; the reference site is not authority for its addresses, social accounts or privacy policy.

## 4. Careers and application flows that must remain

```mermaid
flowchart LR
    H[Public header or homepage] --> B[/careers job board]
    B --> J["/careers/[id] — published job"]
    J --> G[Guest / other unapproved session: guest form]
    J --> C[Approved candidate: application / saved state]
    G --> R[submit_guest_application RPC]
    R --> A[Admin guest application review]
    C --> S[applyToJob server action]
    S --> I[Candidate application inbox]
    H --> L[/login or /register]
    L --> D[Role and approval controlled dashboard]
```

### Board and deep links

The public board uses local React state, not URL query parameters. Keep filter counts, sorting, page reset when criteria change, page sizes 6/12/24/48, featured-role selection, empty state and existing role slugs. Experience is inferred by existing helper logic, not a new job field. Existing links from careers to `/about#values` and `/about#culture` must continue working.

Job-detail metadata and body use `getJobBySlugOrId`. A signed-in approved candidate gets their existing application/saved state; guests, employees/admins and other non-approved-candidate sessions get the guest form in current page code. The server still independently enforces permissions. Do not turn all Apply buttons into login redirects or hide guest applications.

### Guest application

Preserve [GuestApplyForm](../../src/components/careers/guest-apply-form.tsx), [submitGuestApplication](../../src/server/actions/guest-applications.ts) and [migration 0015](../../supabase/migrations/0015_application_contact_fields.sql):

- Specific required job UUID, full name, email, phone and address; optional professional/social HTTPS link, optional resume/portfolio **link** and optional cover letter. Email/phone/address validation comes from [application-contact.ts](../../src/lib/application-contact.ts). Guest file upload is not supported.
- Hidden `website` honeypot, Zod validation, explicit received/error states and no automatic account creation. `ActionForm` pending/error/refresh/redirect semantics must survive presentation changes.
- `submit_guest_application` RPC checks publication/deadline under job locking, normalizes email, returns quietly for replay of the same job/email, rate-limits to five new applications per email per 24 hours, and inserts into `guest_applications` with admin notifications. These are not reference PHP email submissions.
- Admin review under `/admin/guest-applications` and `/admin/guest-applications/[id]` remains; review writes preserve the `updated_at` optimistic-concurrency check. No migration or guest-to-account conversion is proposed.

### Approved candidate application and resume

Preserve [ApplyForm](../../src/components/careers/apply-form.tsx), [applyToJob](../../src/server/actions/applications.ts), [SaveJobButton](../../src/components/careers/save-job-button.tsx) and [toggleSavedJob](../../src/server/actions/jobs.ts):

- Candidate-role/approval guard, contact schema, published-job/deadline/duplicate checks, optional cover letter, and snapshot of the profile's current `resume_url` into the application. Resume is not made mandatory by a visual clone.
- Database application insertion, candidate/staff notifications, activity logging, existing revalidation and redirect to `/dashboard/candidate/applications?id={applicationId}`. Preserve `id` query selection; the legacy `/dashboard/candidate/applications/[id]` page redirects into this inbox.
- Save/unsave remains candidate-specific in `saved_jobs`, with pending/feedback state and existing cache invalidation.
- File uploads remain at protected `/dashboard/candidate/resume` via [POST /api/upload](../../src/app/api/upload/route.ts): candidate session, accepted PDF/Word checks, maximum 5MiB, sanitized user-scoped storage key, `resumes` bucket, candidate-profile update and one-hour signed URL. Do not connect Trinity's anonymous file field to this protected endpoint.

### Signup, login, staff and private routes

`/register` creates candidates by default; employee/admin access is invitation-controlled, not self-selected by a public role switch. Preserve `?invite=TOKEN`, browser `signUp`, `completeSignupInvite`, duplicate-account handling, and `/auth/sign-out?registered=1` after registration. New candidate access still awaits approval. `/login` preserves validation/error handling, existing confirmation retry behavior and database-derived role/approval checks. A portal toggle is not authorization.

Preserve `callbackUrl` processing and safe-internal-path/role checks in [roles.ts](../../src/lib/roles.ts), `/auth/callback?code=...&next=...`, session exchange and invalid/pending-account sign-out, plus `/auth/sign-out` GET/POST handling of `reason` and `registered`. `/dashboard` keeps routing candidate → `/dashboard/candidate`, employee → `/dashboard/employee`, admin → `/admin`.

Every existing candidate, employee and admin route is retained unchanged in [route-map.json](route-map.json), with its real source file. This includes profiles/resume/saved jobs, application/inbox routes, employee hiring/job/company/settings routes, guest review, publishing, users/invitations, visitor monitoring and admin operations. Preserve unread notifications, RLS, role guards, actions, storage and deep links. The reference has no equivalent portal; do not replace any of these routes with marketing content. This checkpoint does not review or propose changes to their private business rules.

## 5. Navigation and link contract

The following is the proposed navigation behavior for the later visual implementation. A destination marked new must not be linked until its page exists with approved content. Desktop and mobile expose the same destinations; dropdown triggers remain accessible buttons with keyboard/focus behavior, not Trinity's unlabelled icon controls.

| Navigation / source interaction | TwinLink link behavior |
| --- | --- |
| Logo / Home | `/`, never a dead `#` link. |
| About group | Button opens About `/about`, Life at TwinLink `/about#culture`, Careers `/careers`, Privacy `/privacy`. |
| Tech Services group | Button opens the eight T07–T14 service destinations, in reference order. No `/services` index link. ERP T15 may appear in relevant service-side links after content approval. |
| Homepage service cards | Same canonical targets as the Tech menu; each card and text link agree. Preserve existing Solutions content/anchor rather than repurposing editorial URLs. |
| Other Services sidebar | Link only to approved, implemented `/services/{slug}` entries; omit current service or mark it current. Use `/contact` for an enquiry; no Trinity domain or `.php` endpoints. |
| HR / People group | Overview → `/#people`; Careers → `/careers`; Talent enquiry → `/contact`. “Engineering Network” remains the current equivalent overview; it is not proof of all eight source HR capabilities. |
| Eight named HR source cards | See explicit table below. No fabricated HR detail route or unrelated Infrastructure/ERP destination. |
| Homepage Job Search | `/careers`; board already supplies real search/filter behavior. |
| Jobs Tips and Resources | No direct career-advice equivalent. Do not label a generic journal link as job tips. A separately labelled “Engineering insights” link can use `/blog`; actual career-advice content is a content gap. |
| Register Your CV / Apply Here | Relabel “View open roles” → `/careers`; actual submission is on `/careers/{job.slug}`. `/register` must be labelled account creation, not general CV delivery. |
| Account actions | Anonymous: `/login` and `/register`; signed in: `/dashboard`, including mobile menu. Preserve invite/callback parameters when already present in their flows. |
| Resources | Keep Case Studies `/case-studies`, Blog `/blog`, Events `/events`, Featured Insights `/#insights`. Preserve detail slugs, section anchors and event-interest links. |
| Contact / footer email | `/contact`; email uses queried TwinLink address or current `hello@twinlink.com` fallback. No Trinity email/telephone/address substitution. |
| Privacy footer | `/privacy` and `/privacy#preferences`. |
| Footer service links | Mirror implemented canonical service/menu targets. Keep existing Resources, Careers and company contact destinations. |
| Social icons | Existing TwinLink icons are disabled because accounts are unavailable. Keep disabled/hidden until verified TwinLink URLs are supplied; never copy Trinity's social profiles or use `#`. |
| Values links | `/about#values`; commitment/integrity/excellence can link here as a labelled values overview, not fake separate pages. |
| Back to top | Reference has a control; no equivalent identified in TwinLink source. If adopted later, use a named button scrolling current document to top with reduced-motion handling; no route or server action needed. |

`/#solutions`, `/#how-we-help`, `/#people`, `/#insights`, `/about#values`, `/about#culture` and `/privacy#preferences` are retained anchor contracts. `#insights` is currently rendered only if a featured case study exists: in a later implementation keep an anchor/fallback or suppress links when empty, without resurrecting archived content. ContactForm does not currently consume service query parameters; don't claim `/contact?service=...` will prefill it. A normal `/contact` enquiry is the proposed target.

### HR interactions with no dedicated equivalent

All eight reference header/footer items are `#`. Homepage destinations differ, as recorded below. The proposed enquiry targets indicate where a visitor can ask a question; they do not claim TwinLink provides these services. Until the offering/content is approved, omit unsupported offer cards from the public UI.

| Reference label | Source homepage href | Current equivalent | Proposed honest destination if shown as an enquiry |
| --- | --- | --- | --- |
| Recruitment Services | `#` | Careers hiring flow is related, not an agency-service detail | `/contact` (“Ask about recruitment”) |
| Executive Recruitment | `#` | None | `/contact` |
| Retained Search | `/it-software-solutions` | None; source link is unrelated | `/contact` |
| Staffing Services | `/erp` | Engineering Network overview is partial only; ERP is unrelated | `/contact`; overview can separately link `/#people` |
| RPO Services | `#` | None | `/contact` |
| Managed Staffing Services | `#` | None | `/contact` |
| HR Consultancy | `/it-software-solutions` | None; source link is unrelated | `/contact` |
| Payroll Outsourcing | `/erp` | None; ERP page is not a payroll flow | `/contact` |

## 6. Reference gaps and TwinLink-only behavior

| Gap | Mapping decision / preserved behavior |
| --- | --- |
| Standalone Life page | Reuse existing `/about#culture`; no new page required. |
| Eight technology details + ERP | Nine proposed destinations; no corresponding pages currently. Existing home overview is partial, not a replacement detail view. |
| Eight HR service details | Not real navigable reference pages; no TwinLink equivalent. No eight-route expansion based on placeholders. |
| General anonymous CV file submission | No TwinLink equivalent. Keep job-bound guest resume link and protected candidate upload; general intake would need a separate approved feature/schema/process. |
| Trinity server feedback mail (`send-email.php`) | No equivalent server transport. TwinLink prepares a draft; maintain explicit “not sent” messaging. |
| Trinity CV mail (`apply-job-email.php`) | No equivalent endpoint. TwinLink applications persist through actions/RPC and review screens, not PHP email. |
| Four office maps and telephone listings | No equivalent TwinLink multi-office model/map integration. Keep real TwinLink company facts and current enquiry mechanism. |
| Hero auto-carousel | Existing `HeroSlider` supplies a presentation component; later visual work may adapt it without touching page queries/CTAs. Reference timing is documented in checkpoint 2, not implemented here. |
| Icon-only menu / placeholder social / broken card links | Do not copy reference defects. Retain semantic navigation, verified destinations and disabled/unavailable handling. |
| Job tips | No dedicated equivalent; journal content isn't necessarily job advice. No new advice route implied. |
| Auth, approval, job detail/apply/save and portals | TwinLink-only; preserve every URL, action, guard and notification path. |
| Case studies, journal and events | TwinLink-only; preserve publishing query/cache contract, filtering, detail anchors, related content, image fallback, event-interest draft and optional calendar download. |
| Monitoring/privacy choice | TwinLink-only; preserve backend/client exclusions, private admin records, connection-enrichment gates and opt-out UI. |

Event calendar downloads remain `.ics` exports, not registrations. Event-interest forms continue to prepare an email with a program-specific subject. The reference's sparse public site must not erase these existing TwinLink capabilities.

## 7. Verification, limits and approval gate

The route map was checked against current route files and the checkpoint 1 inventory. [verify.py](scripts/verify.py) verifies exact coverage of all 15 source pages and six aliases, all 68 current route files, existing page/anchor targets, nine unique planned service slugs, recorded source hashes, document links and the documentation-only diff. Run `python3 docs/checkpoint-3/scripts/verify.py` from the repository root; [verification.json](verification.json) records the result.

No live Supabase credentials/data, test users, emails or applications were used. No runtime behavior is claimed from this static inspection. Existing test suites were not rerun because no executable application behavior changed. Later implementation must exercise guest/candidate/employee/admin states, publication/empty/error/404 states, applications/save/upload validation, contact draft semantics, editorial actions, anchors, monitoring exclusions and mobile/keyboard navigation before completion.

**Approval requested for this proposed map before checkpoint 4.** New service copy/capability gaps and general CV non-equivalence are explicit above; approval of a route map is not proof of service offerings or a license to deploy Trinity assets. This checkpoint contains only `docs/checkpoint-3/` changes. No production code, database migration, navigation, auth, storage, application flow or deployment changed.
