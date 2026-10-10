-- Candidates may book a time they were offered. Staff remain the only role that
-- can freely manage interviews. This function checks ownership with auth.uid()
-- and writes the interview row.

create or replace function public.candidate_book_interview(
  target_application_id uuid,
  slot_start timestamptz,
  slot_end timestamptz default null,
  slot_timezone text default null,
  p_interview_type text default 'video',
  p_meeting_url text default null,
  p_meeting_location text default null,
  p_candidate_instructions text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid := (select auth.uid());
  interview_id uuid;
  interviewer uuid;
begin
  if actor is null then
    raise exception 'Not authorized';
  end if;

  if not exists (
    select 1
    from public.applications
    where id = target_application_id
      and candidate_id = actor
  ) then
    raise exception 'Not authorized';
  end if;

  if slot_start is null then
    raise exception 'A meeting time is required';
  end if;

  select j.created_by into interviewer
  from public.applications a
  join public.jobs j on j.id = a.job_id
  where a.id = target_application_id;

  insert into public.interviews (
    application_id,
    interviewer_id,
    scheduled_at,
    interview_type,
    meeting_url,
    notes,
    status
  )
  values (
    target_application_id,
    interviewer,
    slot_start,
    coalesce(nullif(p_interview_type, ''), 'video'),
    p_meeting_url,
    p_candidate_instructions,
    'scheduled'
  )
  returning id into interview_id;

  begin
    update public.interviews
    set
      scheduled_end = slot_end,
      timezone = slot_timezone,
      meeting_location = p_meeting_location,
      candidate_instructions = p_candidate_instructions
    where id = interview_id;
  exception
    when undefined_column then
      null;
  end;

  return interview_id;
end;
$$;

revoke all on function public.candidate_book_interview(uuid, timestamptz, timestamptz, text, text, text, text, text) from public;
grant execute on function public.candidate_book_interview(uuid, timestamptz, timestamptz, text, text, text, text, text) to authenticated;

drop policy if exists "interviews_candidate_insert_own" on public.interviews;
create policy "interviews_candidate_insert_own"
on public.interviews
for insert
to authenticated
with check (
  status = 'scheduled'
  and exists (
    select 1
    from public.applications a
    where a.id = application_id
      and a.candidate_id = (select auth.uid())
  )
);
