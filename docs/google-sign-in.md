# Google sign-in and sign-up

Both `/login` and `/register` offer **Continue with Google** alongside the existing email and password forms. Google presents an account chooser. A first-time Google user gets a candidate profile from the existing Supabase signup trigger; an existing user keeps their database role. Google users never enter a Twinlink password.

## Activate the provider

The hosted project currently has Google disabled. No database migration or service role key is needed for this feature.

1. Open [Google Cloud Console](https://console.cloud.google.com/apis/credentials), select the company's project, and configure the Google Auth Platform consent screen. Set the app name, support contact, and audience. During testing, add the Google accounts that should be allowed to sign in as test users.
2. Create an OAuth client ID with application type **Web application**. Add the website's origin under authorized JavaScript origins (for example `http://localhost:3000` for local development and your actual HTTPS production origin).
3. Add this **authorized redirect URI** to that Google client:

   ```text
   https://keyatpozmezsrdosbaqp.supabase.co/auth/v1/callback
   ```

   Google redirects to Supabase first. Do not put the Twinlink `/auth/callback` URL in this Google redirect-URI field.
4. In [the Supabase project](https://supabase.com/dashboard/project/keyatpozmezsrdosbaqp), open **Authentication → Sign In / Providers → Google**. Enable Google, enter the client ID and client secret from Google, and save. Enter the secret only in Supabase; never add it to public environment variables or source control.
5. In **Authentication → URL Configuration**, set **Site URL** to the real production origin and add the application's allowed redirect URLs:

   ```text
   http://localhost:3000/auth/callback
   https://YOUR-PRODUCTION-DOMAIN/auth/callback
   ```

   Google callbacks include `provider=google` and may include a return destination, so also allow query-string variants: `http://localhost:3000/auth/callback?**` and `https://YOUR-PRODUCTION-DOMAIN/auth/callback?**`. Replace the production placeholder with the real hostname. Add any development port you actually use. Do not use a broad wildcard for production hosts.
6. Keep `NEXT_PUBLIC_APP_URL` set to the application's origin in each environment. The normal browser flow uses the current page's origin so development and production callbacks stay on their own site.

## Account rules and verification

- New candidates still require administrator approval, matching email registration. The callback clears their session and explains that access is pending.
- Employee signup remains invitation-only. Open the invitation link and choose the Google account whose email matches the invitation. The invitation is stored briefly in an HTTP-only cookie, then accepted through the existing email-matching database function. An expired, reused, or mismatched invitation fails and clears the session.
- Portal toggles do not assign permissions. Dashboard routing uses the trusted database profile. Callback destinations must be internal and allowed for that role.
- Supabase handles provider identities and account linking. Matching verified email identities follow the project's Supabase linking policy; Twinlink does not manually merge accounts.
- Cancelling Google authorization returns a friendly sign-in error. Until the provider is enabled, the Google button reports that email and password remain available.

After setup, test both pages with an approved existing user and a new test user. Approve the new candidate in Admin → Users & Roles, then verify their next Google sign-in reaches the candidate dashboard. Test a valid employee invitation, a different Google email, and cancelling the chooser. Confirm that email and password sign-in still works. Full Google authorization requires the configured external provider and cannot be verified while Google is disabled.
