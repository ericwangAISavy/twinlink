# Apply without an account

Apply `supabase/migrations/0014_guest_applications.sql` after migration 0013 in the hosted Supabase SQL editor. Then apply migration 0015 for required contact fields. No service role key is needed for job applications. The migration creates a private application table and a narrowly scoped anonymous submission function; it does not grant visitors access to applicant records.

Visitors can apply on a published job page using their name and email, with required phone and address, plus optional HTTPS resume/portfolio and professional social links and a cover letter. This creates neither an authentication account nor a candidate profile. Approved logged-in candidates retain the existing profile-based application workflow. Candidates awaiting account approval can still use the guest form.

Admins receive an in-app notification and can review submissions under **Guest Applications**, also linked from **Applications**. They can search, filter, change status, add private notes, and contact applicants using their email. Concurrent review changes are detected so a stale editor cannot overwrite another administrator’s notes. Status changes do not automatically email the applicant. Guest submissions do not appear in a candidate dashboard and are not automatically merged into later accounts.

The database checks published status and deadlines, treats repeated submissions for the same job/email as idempotent, and limits each email to five different roles per 24 hours. A hidden form field rejects simple bots. These controls do not verify ownership of an email address. Resume links are optional external resources; there is no anonymous file-upload bucket.

Until the migration is installed, submissions show a temporary-unavailability message, and the admin screen shows setup instructions. The existing candidate applications continue to work.
