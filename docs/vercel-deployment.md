# Vercel deployment

The application uses Next.js with Node **22.x**, pinned in `package.json` and `.nvmrc`. Supabase's SDK requires Node 22 or newer. Use the Next.js framework preset, the repository root as Root Directory, `npm ci` for installation, and `next build` for the build. Do not configure a static export or custom Output Directory: authentication, applications, publishing and visitor monitoring require server functions.

## Fonts and server assets

The website's Source Sans 3 and Cormorant Garamond fonts are committed under `src/app/fonts` and loaded through `next/font/local`. Deployment does not download fonts from Google, so Google Fonts connectivity failures cannot block compilation. Font licenses and checksums are included with the assets.

Local editorial images are explicitly included in server file tracing. This lets fallback detection work inside Vercel functions as well as local development. Uploaded Supabase images continue to use their public storage URLs. Admin image uploads are limited to 4 MB and rejected on the client before submission, keeping the multipart request within Vercel’s request-size limit.

## Environment settings

Set these in **Vercel → Project → Settings → Environment Variables** for Production and the Preview environments you use, then rebuild. An ignored local `.env.local` is not uploaded to Vercel.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | The hosted Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | The project's publishable key; a legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` is also supported. |
| `NEXT_PUBLIC_APP_URL` | Your production HTTPS origin, with no path. When absent or set to localhost on Vercel, the app falls back to Vercel's deployment URL variables. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for visitor capture and trusted admin operations. Never use a `NEXT_PUBLIC_` prefix or commit this key. |
| `VISITOR_TRACKING_ENABLED` | `true` to enable the private visitor monitoring feature. |

Keep Preview credentials appropriate for that environment. In Supabase **Authentication → URL Configuration**, set the Site URL to the production origin and allow its `/auth/callback` URL and query-string variants (`/auth/callback?**`). Add trusted Preview callback origins if you want email confirmation to return to Preview deployments.

## Database prerequisites

Apply the files in `supabase/migrations` in numerical order through **0016**. The application uses hosted Supabase, not a local PostgreSQL database. The deployment review verified the hosted tables and application/visitor RPC validation paths, without submitting test applications or recording fake visitor data.

Admins need `profiles.role = 'admin'`. Candidates still require approval; employees still use invitations. Guest applications do not create accounts. Visitor logs are admin-only and capture IP/geolocation from Vercel-managed headers; local development intentionally shows Unknown.

## Verification

Run on Node 22:

```bash
npm ci
npm test
npm run build
```

The deployment fix was checked with a clean `.next` directory and a build guard that rejected requests to Google's font domains. The production build, regression tests, public page/resource/job flows, bundled-font loading, mobile job layout, sign-out redirects and anonymous access restrictions passed locally.

After the Git-connected deployment completes, verify the public homepage, careers, resource pages, and sign-in/registration. With an administrator account, check publishing, homepage numbers, guest application reviews, and Website Visitors. Confirm the deployment uses the latest source commit; if retrying the earlier failed build, redeploy that latest commit rather than the old Google Fonts commit. A deployment's live success must be confirmed in Vercel's build log/status; local success alone is not a live deployment result.
