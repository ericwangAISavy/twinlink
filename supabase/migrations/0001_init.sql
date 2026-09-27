-- Twinlink production schema for Supabase (Postgres + Auth + Storage + RLS)

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'candidate' check (role in ('candidate', 'employee')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.candidate_profiles (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  title text,
  bio text,
  skills text[] not null default '{}',
  experience jsonb not null default '[]'::jsonb,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  resume_url text,
  availability text,
  location text,
  phone text,
  website text
);

create table if not exists public.employee_profiles (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  job_title text,
  department text,
  bio text,
  phone text,
  linkedin_url text
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  requirements text,
  location text,
  employment_type text,
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  created_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  candidate_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'submitted'
    check (status in ('submitted', 'under_review', 'interview', 'accepted', 'rejected', 'withdrawn')),
  cover_letter text,
  resume_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, candidate_id)
);

create table if not exists public.saved_jobs (
  candidate_id uuid not null references public.profiles (id) on delete cascade,
  job_id uuid not null references public.jobs (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (candidate_id, job_id)
);

create table if not exists public.company_profiles (
  id text primary key default 'singleton',
  name text not null,
  tagline text,
  intro text,
  mission text,
  vision text,
  values jsonb,
  capabilities jsonb,
  partnership text,
  benefits jsonb,
  about text,
  website text,
  email text,
  phone text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  sender_id uuid not null references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  href text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.employee_invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token text not null unique,
  created_by uuid not null references public.profiles (id),
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists jobs_updated_at on public.jobs;
create trigger jobs_updated_at before update on public.jobs
for each row execute function public.set_updated_at();

drop trigger if exists applications_updated_at on public.applications;
create trigger applications_updated_at before update on public.applications
for each row execute function public.set_updated_at();

drop trigger if exists company_profiles_updated_at on public.company_profiles;
create trigger company_profiles_updated_at before update on public.company_profiles
for each row execute function public.set_updated_at();

create or replace function public.is_employee()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'employee'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  invite_token text := coalesce(new.raw_user_meta_data->>'invite_token', '');
  invite_row public.employee_invites%rowtype;
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'candidate'
  )
  on conflict (id) do nothing;

  insert into public.candidate_profiles (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  if invite_token <> '' then
    select * into invite_row
    from public.employee_invites
    where token = invite_token
      and used_at is null
      and expires_at > now()
      and lower(email) = lower(coalesce(new.email, ''));

    if found then
      perform set_config('app.allow_role_change', 'true', true);
      update public.profiles set role = 'employee' where id = new.id;
      delete from public.candidate_profiles where user_id = new.id;
      insert into public.employee_profiles (user_id) values (new.id)
        on conflict (user_id) do nothing;
      update public.employee_invites set used_at = now() where id = invite_row.id;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if current_setting('app.allow_role_change', true) = 'true' then
    return new;
  end if;
  if auth.role() <> 'service_role' and new.role is distinct from old.role then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

alter table public.profiles enable row level security;
alter table public.candidate_profiles enable row level security;
alter table public.employee_profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.company_profiles enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.employee_invites enable row level security;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_employee());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists "candidate_profiles_select" on public.candidate_profiles;
create policy "candidate_profiles_select" on public.candidate_profiles
  for select to authenticated
  using (user_id = auth.uid() or public.is_employee());

drop policy if exists "candidate_profiles_write_own" on public.candidate_profiles;
create policy "candidate_profiles_write_own" on public.candidate_profiles
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "employee_profiles_select" on public.employee_profiles;
create policy "employee_profiles_select" on public.employee_profiles
  for select to authenticated
  using (user_id = auth.uid() or public.is_employee());

drop policy if exists "employee_profiles_write_own" on public.employee_profiles;
create policy "employee_profiles_write_own" on public.employee_profiles
  for all to authenticated
  using (user_id = auth.uid() and public.is_employee())
  with check (user_id = auth.uid() and public.is_employee());

drop policy if exists "jobs_public_read" on public.jobs;
create policy "jobs_public_read" on public.jobs
  for select to anon, authenticated
  using (status = 'published' or public.is_employee() or created_by = auth.uid());

drop policy if exists "jobs_employee_write" on public.jobs;
create policy "jobs_employee_write" on public.jobs
  for all to authenticated
  using (public.is_employee())
  with check (public.is_employee());

drop policy if exists "applications_select" on public.applications;
create policy "applications_select" on public.applications
  for select to authenticated
  using (candidate_id = auth.uid() or public.is_employee());

drop policy if exists "applications_insert_own" on public.applications;
create policy "applications_insert_own" on public.applications
  for insert to authenticated
  with check (candidate_id = auth.uid() and not public.is_employee());

drop policy if exists "applications_update_own_or_employee" on public.applications;
drop policy if exists "applications_candidate_withdraw" on public.applications;
create policy "applications_candidate_withdraw" on public.applications
  for update to authenticated
  using (candidate_id = auth.uid() and not public.is_employee())
  with check (candidate_id = auth.uid() and status = 'withdrawn');

drop policy if exists "applications_employee_update" on public.applications;
create policy "applications_employee_update" on public.applications
  for update to authenticated
  using (public.is_employee())
  with check (public.is_employee());

drop policy if exists "saved_jobs_own" on public.saved_jobs;
create policy "saved_jobs_own" on public.saved_jobs
  for all to authenticated
  using (candidate_id = auth.uid())
  with check (candidate_id = auth.uid());

drop policy if exists "company_public_read" on public.company_profiles;
create policy "company_public_read" on public.company_profiles
  for select to anon, authenticated
  using (true);

drop policy if exists "company_employee_write" on public.company_profiles;
create policy "company_employee_write" on public.company_profiles
  for all to authenticated
  using (public.is_employee())
  with check (public.is_employee());

drop policy if exists "messages_select" on public.messages;
create policy "messages_select" on public.messages
  for select to authenticated
  using (
    public.is_employee()
    or exists (
      select 1 from public.applications a
      where a.id = application_id and a.candidate_id = auth.uid()
    )
  );

drop policy if exists "messages_insert" on public.messages;
create policy "messages_insert" on public.messages
  for insert to authenticated
  with check (
    sender_id = auth.uid()
    and (
      public.is_employee()
      or exists (
        select 1 from public.applications a
        where a.id = application_id and a.candidate_id = auth.uid()
      )
    )
  );

drop policy if exists "notifications_own" on public.notifications;
create policy "notifications_own" on public.notifications
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own" on public.notifications
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "notifications_insert_authenticated" on public.notifications;
create policy "notifications_insert_authenticated" on public.notifications
  for insert to authenticated
  with check (true);

drop policy if exists "invites_employee_read" on public.employee_invites;
create policy "invites_employee_read" on public.employee_invites
  for select to authenticated
  using (public.is_employee());

drop policy if exists "invites_employee_insert" on public.employee_invites;
create policy "invites_employee_insert" on public.employee_invites
  for insert to authenticated
  with check (public.is_employee() and created_by = auth.uid());

drop policy if exists "invites_employee_update" on public.employee_invites;
create policy "invites_employee_update" on public.employee_invites
  for update to authenticated
  using (public.is_employee());

insert into storage.buckets (id, name, public)
values
  ('resumes', 'resumes', false),
  ('avatars', 'avatars', true),
  ('portfolios', 'portfolios', false)
on conflict (id) do nothing;

drop policy if exists "resume_select" on storage.objects;
create policy "resume_select" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'resumes'
    and (
      public.is_employee()
      or (storage.foldername(name))[1] = auth.uid()::text
    )
  );

drop policy if exists "resume_write_own" on storage.objects;
create policy "resume_write_own" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "resume_update_own" on storage.objects;
create policy "resume_update_own" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "resume_delete_own" on storage.objects;
create policy "resume_delete_own" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatar_public_read" on storage.objects;
create policy "avatar_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'avatars');

drop policy if exists "avatar_write_own" on storage.objects;
create policy "avatar_write_own" on storage.objects
  for all to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "portfolio_own_or_employee" on storage.objects;
create policy "portfolio_own_or_employee" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'portfolios'
    and (
      public.is_employee()
      or (storage.foldername(name))[1] = auth.uid()::text
    )
  );

drop policy if exists "portfolio_write_own" on storage.objects;
create policy "portfolio_write_own" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'portfolios'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

insert into public.company_profiles (id, name, tagline)
values ('singleton', 'TwinLink', 'Technology consulting that connects strategy to delivery.')
on conflict (id) do nothing;

create or replace function public.accept_employee_invite(invite_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  invite_row public.employee_invites%rowtype;
  uid uuid := auth.uid();
  user_email text;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  select email into user_email from public.profiles where id = uid;

  select * into invite_row
  from public.employee_invites
  where token = invite_token
  for update;

  if not found or invite_row.used_at is not null or invite_row.expires_at < now() then
    raise exception 'This employee invite is invalid or expired.';
  end if;

  if lower(invite_row.email) <> lower(coalesce(user_email, '')) then
    raise exception 'This invite was issued for a different email address.';
  end if;

  perform set_config('app.allow_role_change', 'true', true);

  update public.profiles set role = 'employee' where id = uid;
  delete from public.candidate_profiles where user_id = uid;
  insert into public.employee_profiles (user_id) values (uid)
    on conflict (user_id) do nothing;
  update public.employee_invites set used_at = now() where id = invite_row.id;
end;
$$;

revoke all on function public.accept_employee_invite(text) from public;
grant execute on function public.accept_employee_invite(text) to authenticated;
grant execute on function public.is_employee() to anon, authenticated;

grant usage on schema public to anon, authenticated;

grant select on table public.jobs to anon, authenticated;
grant select on table public.company_profiles to anon, authenticated;

grant select, insert, update, delete on table public.profiles to authenticated;
grant select, insert, update, delete on table public.candidate_profiles to authenticated;
grant select, insert, update, delete on table public.employee_profiles to authenticated;
grant select, insert, update, delete on table public.jobs to authenticated;
grant select, insert, update, delete on table public.applications to authenticated;
grant select, insert, update, delete on table public.saved_jobs to authenticated;
grant select, insert, update, delete on table public.company_profiles to authenticated;
grant select, insert, update, delete on table public.messages to authenticated;
grant select, insert, update, delete on table public.notifications to authenticated;
grant select, insert, update, delete on table public.employee_invites to authenticated;
