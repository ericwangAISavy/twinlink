-- Admin role, operational tables, and staff RLS (employee + admin)

alter table public.profiles
  drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('candidate', 'employee', 'admin'));

alter table public.jobs
  drop constraint if exists jobs_status_check;
alter table public.jobs
  add constraint jobs_status_check
  check (status in ('draft', 'published', 'paused', 'closed', 'archived'));

alter table public.jobs
  add column if not exists department text,
  add column if not exists workplace_type text,
  add column if not exists responsibilities text,
  add column if not exists preferred_qualifications text,
  add column if not exists salary_min numeric,
  add column if not exists salary_max numeric,
  add column if not exists currency text default 'USD',
  add column if not exists application_deadline date;

alter table public.applications
  drop constraint if exists applications_status_check;
alter table public.applications
  add constraint applications_status_check
  check (status in (
    'submitted', 'under_review', 'reviewing', 'shortlisted',
    'interview', 'accepted', 'offer', 'hired', 'rejected', 'withdrawn'
  ));

alter table public.applications
  add column if not exists assigned_to uuid references public.profiles (id);

alter table public.employee_profiles
  add column if not exists status text not null default 'active'
    check (status in ('invited', 'active', 'inactive'));

alter table public.employee_invites
  add column if not exists full_name text,
  add column if not exists job_title text,
  add column if not exists department text,
  add column if not exists role text not null default 'employee'
    check (role in ('employee', 'admin'));

create table if not exists public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  actor_id uuid references public.profiles (id),
  from_status text,
  to_status text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  interviewer_id uuid references public.profiles (id),
  scheduled_at timestamptz not null,
  interview_type text not null default 'video',
  meeting_url text,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  notes text,
  outcome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.company_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  body text,
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text,
  kind text not null default 'public' check (kind in ('public', 'internal', 'candidate')),
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create or replace function public.is_employee()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('employee', 'admin')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

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
  assigned_role text;
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

  assigned_role := coalesce(invite_row.role, 'employee');
  if assigned_role not in ('employee', 'admin') then
    assigned_role := 'employee';
  end if;

  perform set_config('app.allow_role_change', 'true', true);

  update public.profiles set role = assigned_role, full_name = coalesce(invite_row.full_name, full_name) where id = uid;
  delete from public.candidate_profiles where user_id = uid;
  insert into public.employee_profiles (user_id, job_title, department, status)
  values (uid, invite_row.job_title, invite_row.department, 'active')
    on conflict (user_id) do update
      set job_title = excluded.job_title,
          department = excluded.department,
          status = 'active';
  update public.employee_invites set used_at = now() where id = invite_row.id;
end;
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
  assigned_role text := 'employee';
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
      assigned_role := coalesce(invite_row.role, 'employee');
      if assigned_role not in ('employee', 'admin') then
        assigned_role := 'employee';
      end if;
      perform set_config('app.allow_role_change', 'true', true);
      update public.profiles set role = assigned_role, full_name = coalesce(invite_row.full_name, full_name) where id = new.id;
      delete from public.candidate_profiles where user_id = new.id;
      insert into public.employee_profiles (user_id, job_title, department, status)
      values (new.id, invite_row.job_title, invite_row.department, 'active')
        on conflict (user_id) do nothing;
      update public.employee_invites set used_at = now() where id = invite_row.id;
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.admin_set_role(target_id uuid, new_role text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  if new_role not in ('candidate', 'employee', 'admin') then
    raise exception 'Invalid role';
  end if;
  perform set_config('app.allow_role_change', 'true', true);
  update public.profiles set role = new_role where id = target_id;
  if new_role in ('employee', 'admin') then
    insert into public.employee_profiles (user_id, status)
    values (target_id, 'active')
    on conflict (user_id) do nothing;
    delete from public.candidate_profiles where user_id = target_id;
  end if;
  if new_role = 'candidate' then
    insert into public.candidate_profiles (user_id)
    values (target_id)
    on conflict (user_id) do nothing;
  end if;
end;
$$;

revoke all on function public.admin_set_role(uuid, text) from public;
grant execute on function public.admin_set_role(uuid, text) to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.application_notes enable row level security;
alter table public.application_events enable row level security;
alter table public.interviews enable row level security;
alter table public.activity_logs enable row level security;
alter table public.company_content enable row level security;
alter table public.resources enable row level security;

drop policy if exists "notes_staff" on public.application_notes;
create policy "notes_staff" on public.application_notes
  for all to authenticated
  using (public.is_employee())
  with check (public.is_employee() and author_id = auth.uid());

drop policy if exists "events_staff_select" on public.application_events;
create policy "events_staff_select" on public.application_events
  for select to authenticated
  using (public.is_employee());

drop policy if exists "events_staff_insert" on public.application_events;
create policy "events_staff_insert" on public.application_events
  for insert to authenticated
  with check (public.is_employee());

drop policy if exists "interviews_staff" on public.interviews;
create policy "interviews_staff" on public.interviews
  for all to authenticated
  using (public.is_employee())
  with check (public.is_employee());

drop policy if exists "activity_staff_select" on public.activity_logs;
create policy "activity_staff_select" on public.activity_logs
  for select to authenticated
  using (public.is_employee());

drop policy if exists "activity_staff_insert" on public.activity_logs;
create policy "activity_staff_insert" on public.activity_logs
  for insert to authenticated
  with check (public.is_employee());

drop policy if exists "content_public_read" on public.company_content;
create policy "content_public_read" on public.company_content
  for select to anon, authenticated
  using (true);

drop policy if exists "content_admin_write" on public.company_content;
create policy "content_admin_write" on public.company_content
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "resources_read" on public.resources;
create policy "resources_read" on public.resources
  for select to authenticated
  using (kind <> 'internal' or public.is_employee());

drop policy if exists "resources_public" on public.resources;
create policy "resources_public" on public.resources
  for select to anon
  using (kind = 'public');

drop policy if exists "resources_admin_write" on public.resources;
create policy "resources_admin_write" on public.resources
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant select, insert, update, delete on table public.application_notes to authenticated;
grant select, insert, update, delete on table public.application_events to authenticated;
grant select, insert, update, delete on table public.interviews to authenticated;
grant select, insert on table public.activity_logs to authenticated;
grant select on table public.company_content to anon, authenticated;
grant select, insert, update, delete on table public.company_content to authenticated;
grant select on table public.resources to anon, authenticated;
grant select, insert, update, delete on table public.resources to authenticated;

insert into public.company_content (key, title, body)
values
  ('homepage_announcement', 'Homepage announcement', ''),
  ('careers_intro', 'Careers intro', ''),
  ('featured_jobs', 'Featured jobs', '')
on conflict (key) do nothing;
