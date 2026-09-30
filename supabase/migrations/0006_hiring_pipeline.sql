-- Canonical hiring stages on the existing applications table.
-- History, interview details, and stage changes stay in one transaction.

alter table public.applications
  drop constraint if exists applications_status_check;

update public.applications
set status = case status
  when 'submitted' then 'applied'
  when 'under_review' then 'application_review'
  when 'reviewing' then 'application_review'
  when 'shortlisted' then 'recruiter_screen'
  when 'interview' then 'technical_interview'
  when 'accepted' then 'offer'
  else status
end;

alter table public.applications
  add column if not exists current_stage text;

update public.applications
set current_stage = status
where current_stage is null;

alter table public.applications
  alter column status set default 'applied';

alter table public.applications
  alter column current_stage set default 'applied';

update public.applications
set current_stage = 'applied'
where current_stage is null;

alter table public.applications
  alter column current_stage set not null;

alter table public.applications
  drop constraint if exists applications_current_stage_check;

alter table public.applications
  add constraint applications_current_stage_check
  check (current_stage in (
    'applied',
    'application_review',
    'recruiter_screen',
    'technical_interview',
    'final_interview',
    'decision',
    'offer',
    'hired',
    'rejected',
    'withdrawn',
    'position_closed'
  ));

alter table public.applications
  add constraint applications_status_check
  check (status in (
    'applied',
    'application_review',
    'recruiter_screen',
    'technical_interview',
    'final_interview',
    'decision',
    'offer',
    'hired',
    'rejected',
    'withdrawn',
    'position_closed'
  ));

create table if not exists public.application_stage_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  from_stage text,
  to_stage text not null,
  candidate_visible_label text not null,
  candidate_visible_message text,
  changed_by uuid references public.profiles (id),
  changed_at timestamptz not null default now()
);

alter table public.interviews
  add column if not exists scheduled_end timestamptz,
  add column if not exists timezone text,
  add column if not exists meeting_location text,
  add column if not exists candidate_instructions text;

create index if not exists applications_candidate_id_idx on public.applications (candidate_id);
create index if not exists applications_job_id_idx on public.applications (job_id);
create index if not exists applications_current_stage_idx on public.applications (current_stage);
create index if not exists application_stage_history_application_idx
  on public.application_stage_history (application_id, changed_at desc);
create index if not exists interviews_application_id_idx on public.interviews (application_id);

create or replace function public.normalize_hiring_stage(value text)
returns text
language sql
immutable
as $$
  select case coalesce(value, '')
    when 'submitted' then 'applied'
    when 'under_review' then 'application_review'
    when 'reviewing' then 'application_review'
    when 'shortlisted' then 'recruiter_screen'
    when 'interview' then 'technical_interview'
    when 'accepted' then 'offer'
    when 'applied' then 'applied'
    when 'application_review' then 'application_review'
    when 'recruiter_screen' then 'recruiter_screen'
    when 'technical_interview' then 'technical_interview'
    when 'final_interview' then 'final_interview'
    when 'decision' then 'decision'
    when 'offer' then 'offer'
    when 'hired' then 'hired'
    when 'rejected' then 'rejected'
    when 'withdrawn' then 'withdrawn'
    when 'position_closed' then 'position_closed'
    else null
  end;
$$;

create or replace function public.hiring_stage_label(value text)
returns text
language sql
immutable
as $$
  select case public.normalize_hiring_stage(value)
    when 'applied' then 'Applied'
    when 'application_review' then 'Application review'
    when 'recruiter_screen' then 'Recruiter screen'
    when 'technical_interview' then 'Technical interview'
    when 'final_interview' then 'Final interview'
    when 'decision' then 'Decision'
    when 'offer' then 'Offer'
    when 'hired' then 'Hired'
    when 'rejected' then 'Rejected'
    when 'withdrawn' then 'Withdrawn'
    when 'position_closed' then 'Position closed'
    else 'Applied'
  end;
$$;

create or replace function public.sync_application_stage()
returns trigger
language plpgsql
as $$
declare
  next_stage text;
begin
  if tg_op = 'INSERT' then
    next_stage := public.normalize_hiring_stage(coalesce(new.current_stage, new.status, 'applied'));
    if next_stage is null then
      raise exception 'Invalid hiring stage';
    end if;
    new.current_stage := next_stage;
    new.status := next_stage;
    return new;
  end if;

  if new.current_stage is distinct from old.current_stage then
    next_stage := public.normalize_hiring_stage(new.current_stage);
  elsif new.status is distinct from old.status then
    next_stage := public.normalize_hiring_stage(new.status);
  else
    return new;
  end if;

  if next_stage is null then
    raise exception 'Invalid hiring stage';
  end if;

  new.current_stage := next_stage;
  new.status := next_stage;
  return new;
end;
$$;

create or replace function public.record_application_stage_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  previous_stage text;
  next_stage text;
  visible_message text;
begin
  if tg_op = 'INSERT' then
    previous_stage := null;
    next_stage := new.current_stage;
  else
    if new.current_stage is not distinct from old.current_stage then
      return new;
    end if;
    previous_stage := old.current_stage;
    next_stage := new.current_stage;
  end if;

  visible_message := nullif(current_setting('app.stage_message', true), '');

  insert into public.application_stage_history (
    application_id,
    from_stage,
    to_stage,
    candidate_visible_label,
    candidate_visible_message,
    changed_by,
    changed_at
  ) values (
    new.id,
    previous_stage,
    next_stage,
    public.hiring_stage_label(next_stage),
    visible_message,
    auth.uid(),
    now()
  );

  insert into public.application_events (
    application_id,
    actor_id,
    from_status,
    to_status,
    note
  ) values (
    new.id,
    auth.uid(),
    previous_stage,
    next_stage,
    visible_message
  );

  return new;
end;
$$;

drop trigger if exists applications_sync_stage on public.applications;
create trigger applications_sync_stage
before insert or update on public.applications
for each row execute function public.sync_application_stage();

drop trigger if exists applications_record_stage_history on public.applications;
create trigger applications_record_stage_history
after insert or update of current_stage, status on public.applications
for each row execute function public.record_application_stage_history();

insert into public.application_stage_history (
  application_id,
  from_stage,
  to_stage,
  candidate_visible_label,
  candidate_visible_message,
  changed_by,
  changed_at
)
select
  a.id,
  null,
  a.current_stage,
  public.hiring_stage_label(a.current_stage),
  null,
  null,
  a.created_at
from public.applications a
where not exists (
  select 1 from public.application_stage_history h where h.application_id = a.id
);

create or replace function public.set_application_stage(
  target_application_id uuid,
  next_stage text,
  candidate_message text default null,
  notify_candidate boolean default true
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := auth.uid();
  app public.applications%rowtype;
  normalized text := public.normalize_hiring_stage(next_stage);
  job_title text;
begin
  if actor is null or not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  if normalized is null then
    raise exception 'Invalid hiring stage';
  end if;

  select * into app
  from public.applications
  where id = target_application_id
  for update;

  if not found then
    raise exception 'Application not found';
  end if;

  if app.current_stage = normalized then
    return;
  end if;

  perform set_config('app.stage_message', coalesce(candidate_message, ''), true);

  update public.applications
  set current_stage = normalized
  where id = app.id;

  select title into job_title from public.jobs where id = app.job_id;

  if notify_candidate then
    insert into public.notifications (user_id, title, body, href)
    values (
      app.candidate_id,
      'Application update',
      coalesce(nullif(candidate_message, ''), 'Your application for ' || coalesce(job_title, 'a role') || ' is now ' || public.hiring_stage_label(normalized) || '.'),
      '/dashboard/candidate/applications/' || app.id::text
    );
  end if;

  insert into public.activity_logs (actor_id, action, entity_type, entity_id, metadata)
  values (
    actor,
    'application_stage_changed',
    'application',
    app.id::text,
    jsonb_build_object('from_stage', app.current_stage, 'to_stage', normalized)
  );
end;
$$;

create or replace function public.list_my_interviews(target_application_id uuid)
returns table (
  id uuid,
  interview_type text,
  scheduled_at timestamptz,
  scheduled_end timestamptz,
  timezone text,
  meeting_location text,
  meeting_url text,
  candidate_instructions text,
  status text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    i.id,
    i.interview_type,
    i.scheduled_at,
    i.scheduled_end,
    i.timezone,
    i.meeting_location,
    i.meeting_url,
    i.candidate_instructions,
    i.status
  from public.interviews i
  join public.applications a on a.id = i.application_id
  where i.application_id = target_application_id
    and a.candidate_id = (select auth.uid());
$$;

revoke all on function public.normalize_hiring_stage(text) from public;
revoke all on function public.hiring_stage_label(text) from public;
revoke all on function public.sync_application_stage() from public;
revoke all on function public.record_application_stage_history() from public;
revoke all on function public.set_application_stage(uuid, text, text, boolean) from public;
revoke all on function public.list_my_interviews(uuid) from public;

grant execute on function public.sync_application_stage() to authenticated;
grant execute on function public.record_application_stage_history() to authenticated;
grant execute on function public.normalize_hiring_stage(text) to authenticated;
grant execute on function public.hiring_stage_label(text) to authenticated;
grant execute on function public.set_application_stage(uuid, text, text, boolean) to authenticated;
grant execute on function public.list_my_interviews(uuid) to authenticated;

alter table public.application_stage_history enable row level security;

drop policy if exists "stage_history_candidate_select" on public.application_stage_history;
create policy "stage_history_candidate_select" on public.application_stage_history
  for select to authenticated
  using (
    exists (
      select 1 from public.applications a
      where a.id = application_id
        and a.candidate_id = (select auth.uid())
    )
  );

drop policy if exists "stage_history_staff_select" on public.application_stage_history;
create policy "stage_history_staff_select" on public.application_stage_history
  for select to authenticated
  using ((select public.is_employee()));

drop policy if exists "applications_employee_update" on public.applications;
create policy "applications_admin_update" on public.applications
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "applications_candidate_withdraw" on public.applications;
create policy "applications_candidate_withdraw" on public.applications
  for update to authenticated
  using (candidate_id = (select auth.uid()) and not (select public.is_employee()))
  with check (
    candidate_id = (select auth.uid())
    and status = 'withdrawn'
    and current_stage = 'withdrawn'
  );

grant select on table public.application_stage_history to authenticated;
