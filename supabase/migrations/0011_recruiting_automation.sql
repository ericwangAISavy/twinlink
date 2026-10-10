-- Twinlink recruiting automation (n8n). Twinlink remains the system of record.
-- Contacts can exist before auth.users / profiles.

create table if not exists public.candidate_contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  display_email text not null,
  normalized_email text not null,
  job_id uuid not null references public.jobs (id) on delete restrict,
  candidate_user_id uuid references public.profiles (id) on delete set null,
  source text,
  admin_note text,
  created_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (normalized_email, job_id)
);

create table if not exists public.recruiting_workflows (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null unique references public.candidate_contacts (id) on delete cascade,
  job_id uuid not null references public.jobs (id) on delete restrict,
  application_id uuid references public.applications (id) on delete set null,
  internal_state text not null default 'draft',
  admin_status text not null default 'new',
  candidate_status text not null default 'under_review',
  automation_enabled boolean not null default true,
  auto_advance_after_reply boolean not null default true,
  last_activity_at timestamptz not null default now(),
  next_action text,
  last_error text,
  meeting_starts_at timestamptz,
  meeting_ends_at timestamptz,
  meeting_timezone text,
  meeting_url text,
  meeting_location text,
  meeting_provider text,
  external_booking_id text,
  booking_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.recruiting_workflow_history (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.recruiting_workflows (id) on delete cascade,
  from_state text,
  to_state text not null,
  label text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.communication_threads (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.recruiting_workflows (id) on delete cascade,
  provider text,
  provider_thread_id text,
  created_at timestamptz not null default now(),
  last_message_at timestamptz
);

create unique index if not exists communication_threads_provider_thread_uidx
  on public.communication_threads (provider, provider_thread_id)
  where provider_thread_id is not null;

create index if not exists communication_threads_workflow_idx
  on public.communication_threads (workflow_id);

create table if not exists public.communication_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.communication_threads (id) on delete cascade,
  event_id uuid,
  direction text not null check (direction in ('outbound', 'inbound')),
  subject text,
  body_text text,
  occurred_at timestamptz not null default now(),
  provider_message_id text,
  created_at timestamptz not null default now()
);

create unique index if not exists communication_messages_event_uidx
  on public.communication_messages (event_id)
  where event_id is not null;

create table if not exists public.automation_events (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null unique,
  event_type text not null,
  workflow_id uuid references public.recruiting_workflows (id) on delete set null,
  candidate_contact_id uuid references public.candidate_contacts (id) on delete set null,
  direction text not null check (direction in ('outbound', 'inbound')),
  provider text,
  status text not null default 'pending',
  attempt_count integer not null default 0,
  error_summary text,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists candidate_contacts_email_idx on public.candidate_contacts (normalized_email);
create index if not exists candidate_contacts_user_idx on public.candidate_contacts (candidate_user_id);
create index if not exists recruiting_workflows_job_idx on public.recruiting_workflows (job_id);
create index if not exists recruiting_workflows_activity_idx on public.recruiting_workflows (last_activity_at desc);
create index if not exists automation_events_workflow_idx on public.automation_events (workflow_id, created_at desc);
create index if not exists recruiting_workflow_history_workflow_idx
  on public.recruiting_workflow_history (workflow_id, created_at desc);

drop trigger if exists candidate_contacts_updated_at on public.candidate_contacts;
create trigger candidate_contacts_updated_at before update on public.candidate_contacts
for each row execute function public.set_updated_at();

drop trigger if exists recruiting_workflows_updated_at on public.recruiting_workflows;
create trigger recruiting_workflows_updated_at before update on public.recruiting_workflows
for each row execute function public.set_updated_at();

create or replace function public.link_recruiting_contacts(target_user_id uuid, target_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if target_user_id is null or coalesce(trim(target_email), '') = '' then
    return;
  end if;
  update public.candidate_contacts
  set candidate_user_id = target_user_id
  where normalized_email = lower(trim(target_email))
    and candidate_user_id is null;
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
  insert into public.profiles (id, email, full_name, role, access_status)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'candidate',
    'pending'
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
      perform set_config('app.allow_access_change', 'true', true);
      update public.profiles
      set role = assigned_role,
          full_name = coalesce(invite_row.full_name, full_name),
          access_status = 'approved'
      where id = new.id;
      delete from public.candidate_profiles where user_id = new.id;
      insert into public.employee_profiles (user_id, job_title, department, status)
      values (new.id, invite_row.job_title, invite_row.department, 'active')
        on conflict (user_id) do nothing;
      update public.employee_invites set used_at = now() where id = invite_row.id;
    end if;
  end if;

  perform public.link_recruiting_contacts(new.id, coalesce(new.email, ''));
  return new;
end;
$$;

alter table public.candidate_contacts enable row level security;
alter table public.recruiting_workflows enable row level security;
alter table public.recruiting_workflow_history enable row level security;
alter table public.communication_threads enable row level security;
alter table public.communication_messages enable row level security;
alter table public.automation_events enable row level security;

drop policy if exists "contacts_admin_all" on public.candidate_contacts;
create policy "contacts_admin_all" on public.candidate_contacts
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "contacts_candidate_select" on public.candidate_contacts;
create policy "contacts_candidate_select" on public.candidate_contacts
  for select to authenticated
  using ((select auth.uid()) = candidate_user_id);

drop policy if exists "workflows_admin_all" on public.recruiting_workflows;
create policy "workflows_admin_all" on public.recruiting_workflows
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "workflows_candidate_select" on public.recruiting_workflows;
create policy "workflows_candidate_select" on public.recruiting_workflows
  for select to authenticated
  using (
    exists (
      select 1 from public.candidate_contacts c
      where c.id = recruiting_workflows.contact_id
        and c.candidate_user_id = (select auth.uid())
    )
  );

drop policy if exists "workflow_history_admin" on public.recruiting_workflow_history;
create policy "workflow_history_admin" on public.recruiting_workflow_history
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "threads_admin" on public.communication_threads;
create policy "threads_admin" on public.communication_threads
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "messages_admin" on public.communication_messages;
create policy "messages_admin" on public.communication_messages
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "automation_events_admin" on public.automation_events;
create policy "automation_events_admin" on public.automation_events
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

revoke all on table public.candidate_contacts from public, anon;
revoke all on table public.recruiting_workflows from public, anon;
revoke all on table public.recruiting_workflow_history from public, anon;
revoke all on table public.communication_threads from public, anon;
revoke all on table public.communication_messages from public, anon;
revoke all on table public.automation_events from public, anon;

grant select, insert, update, delete on table public.candidate_contacts to authenticated;
grant select, insert, update, delete on table public.recruiting_workflows to authenticated;
grant select, insert, update, delete on table public.recruiting_workflow_history to authenticated;
grant select, insert, update, delete on table public.communication_threads to authenticated;
grant select, insert, update, delete on table public.communication_messages to authenticated;
grant select, insert, update, delete on table public.automation_events to authenticated;

revoke all on function public.link_recruiting_contacts(uuid, text) from public;
grant execute on function public.link_recruiting_contacts(uuid, text) to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    begin
      execute 'alter publication supabase_realtime add table public.recruiting_workflows';
    exception when duplicate_object then null;
    end;
    begin
      execute 'alter publication supabase_realtime add table public.communication_messages';
    exception when duplicate_object then null;
    end;
  end if;
end $$;
