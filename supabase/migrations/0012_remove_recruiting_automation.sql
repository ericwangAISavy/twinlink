-- Remove n8n recruiting automation, hiring pipeline, interviews, and recruiting
-- message threads. Core jobs, applications, profiles, resumes, notes, and
-- notifications stay in place. Safe if earlier migrations were never applied.

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'recruiting_workflows'
    ) then
      execute 'alter publication supabase_realtime drop table public.recruiting_workflows';
    end if;
    if exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'communication_messages'
    ) then
      execute 'alter publication supabase_realtime drop table public.communication_messages';
    end if;
  end if;
end;
$$;

do $$
begin
  if to_regclass('public.recruiting_workflows') is not null then
    drop trigger if exists recruiting_workflows_updated_at on public.recruiting_workflows;
  end if;
  if to_regclass('public.candidate_contacts') is not null then
    drop trigger if exists candidate_contacts_updated_at on public.candidate_contacts;
  end if;
  if to_regclass('public.applications') is not null then
    drop trigger if exists applications_sync_stage on public.applications;
    drop trigger if exists applications_record_stage_history on public.applications;
  end if;
  if to_regclass('public.interviews') is not null then
    drop trigger if exists interviews_updated_at on public.interviews;
  end if;
end;
$$;

drop function if exists public.link_recruiting_contacts(uuid, text);
drop function if exists public.set_application_stage(uuid, text, text, boolean);
drop function if exists public.list_my_interviews(uuid);
drop function if exists public.list_my_interviews_for_candidate();
drop function if exists public.candidate_book_interview(uuid, timestamptz, timestamptz, text, text, text, text, text);
drop function if exists public.normalize_hiring_stage(text);
drop function if exists public.hiring_stage_label(text);
drop function if exists public.sync_application_stage();
drop function if exists public.record_application_stage_history();

drop table if exists public.communication_messages cascade;
drop table if exists public.communication_threads cascade;
drop table if exists public.recruiting_workflow_history cascade;
drop table if exists public.automation_events cascade;
drop table if exists public.recruiting_workflows cascade;
drop table if exists public.candidate_contacts cascade;
drop table if exists public.application_stage_history cascade;
drop table if exists public.interviews cascade;
drop table if exists public.messages cascade;

alter table public.applications drop constraint if exists applications_status_check;
alter table public.applications drop constraint if exists applications_current_stage_check;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'applications'
      and column_name = 'current_stage'
  ) then
    update public.applications
    set status = case
      when coalesce(current_stage, status) in ('applied', 'submitted') then 'submitted'
      when coalesce(current_stage, status) in (
        'application_review', 'recruiter_screen', 'reviewing', 'shortlisted', 'under_review'
      ) then 'under_review'
      when coalesce(current_stage, status) in (
        'technical_interview', 'final_interview', 'decision', 'interview'
      ) then 'interview'
      when coalesce(current_stage, status) in ('offer', 'hired', 'accepted') then 'accepted'
      when coalesce(current_stage, status) in ('position_closed', 'rejected') then 'rejected'
      when coalesce(current_stage, status) in ('withdrawn') then 'withdrawn'
      else 'submitted'
    end;
    alter table public.applications drop column if exists current_stage;
  else
    update public.applications
    set status = case
      when status in ('applied', 'submitted') then 'submitted'
      when status in ('application_review', 'recruiter_screen', 'reviewing', 'shortlisted', 'under_review') then 'under_review'
      when status in ('technical_interview', 'final_interview', 'decision', 'interview') then 'interview'
      when status in ('offer', 'hired', 'accepted') then 'accepted'
      when status in ('position_closed', 'rejected') then 'rejected'
      when status in ('withdrawn') then 'withdrawn'
      else 'submitted'
    end
    where status is not null;
  end if;
end;
$$;

alter table public.applications
  alter column status set default 'submitted';

alter table public.applications
  add constraint applications_status_check
  check (status in ('submitted', 'under_review', 'interview', 'accepted', 'rejected', 'withdrawn'));

drop index if exists public.applications_current_stage_idx;
drop index if exists public.interviews_application_id_idx;
drop index if exists public.recruiting_workflows_job_idx;
drop index if exists public.recruiting_workflows_activity_idx;
drop index if exists public.communication_messages_event_uidx;

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

  return new;
end;
$$;
