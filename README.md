# TwinLink

Professional technology consulting website and talent portal. Candidates self-register; employees are invitation-only.

## Stack

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS v4
- Supabase (Postgres, Auth, Row Level Security, Storage)
- Deploy target: Vercel

## Local setup

1. Create a Supabase project. Do not use a local PostgreSQL server.

2. In the Supabase SQL editor, run `supabase/migrations/0001_init.sql`, then `0002_admin.sql`, then `0003_admin_auth.sql`.

3. Copy environment files:

   ```bash
   copy .env.example .env.local
   ```

4. Fill in `.env.local` from **Supabase → Project Settings → API**:

   | Variable | Purpose |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable/anon key |
   | `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` locally |
   | `SUPABASE_SERVICE_ROLE_KEY` | Optional, server-only bootstrap. Never expose in the browser. |

5. Install and run:

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## First accounts

- **Candidate:** `/register` always creates a candidate. The browser cannot assign the employee or admin role.
- **First employee:** sign up as a candidate, then in the SQL editor:

  ```sql
  select set_config('app.allow_role_change', 'true', true);

  update public.profiles
  set role = 'employee'
  where email = 'you@example.com';

  insert into public.employee_profiles (user_id)
  select id from public.profiles where email = 'you@example.com'
  on conflict (user_id) do nothing;

  delete from public.candidate_profiles
  where user_id = (select id from public.profiles where email = 'you@example.com');
  ```

  Additional employees: Dashboard → Settings → generate invite → `/register?invite=TOKEN` with the invited email.

- **First admin:** never use public registration. After `0001_init.sql` and `0002_admin.sql`, promote a trusted user in the SQL editor (the `protect_profile_role` trigger requires `app.allow_role_change`):

  ```sql
  select set_config('app.allow_role_change', 'true', true);

  update public.profiles
  set role = 'admin'
  where email = 'you@example.com';

  insert into public.employee_profiles (user_id, status)
  select id, 'active'
  from public.profiles
  where email = 'you@example.com'
  on conflict (user_id) do nothing;

  delete from public.candidate_profiles
  where user_id = (select id from public.profiles where email = 'you@example.com');
  ```

  Later admins should be created with an admin invitation (`employee_invites.role = 'admin'`) or Users & Roles (`admin_set_role`), not public signup.

  After login: candidate → `/dashboard/candidate`, employee → `/dashboard/employee`, admin → `/admin`.


## Vercel deploy

1. Import the repo in Vercel.
2. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_APP_URL` (production domain). Add `SUPABASE_SERVICE_ROLE_KEY` only if you need server-side bootstrap.
3. Build command is `next build`.
4. Apply `supabase/migrations/0001_init.sql`, `0002_admin.sql`, and `0003_admin_auth.sql` to the same Supabase project used in production.

## Product map

| Area | Routes |
| --- | --- |
| Marketing | `/` `/about` `/careers` `/careers/[slug]` |
| Auth | `/login` `/register` |
| Employee | `/dashboard/employee/*` — profile, company, jobs, applicants, messages, settings |
| Candidate | `/dashboard/candidate/*` — profile, resume, applications, saved jobs, messages, settings |
| Admin | `/admin/*` — operations console; requires `profiles.role = 'admin'` |
