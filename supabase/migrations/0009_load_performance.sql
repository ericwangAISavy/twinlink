-- Faster candidate interview loads and common list lookups.

create or replace function public.list_my_interviews_for_candidate()
returns table (
  id uuid,
  application_id uuid,
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
    i.application_id,
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
  where a.candidate_id = (select auth.uid())
  order by i.scheduled_at asc;
$$;

revoke all on function public.list_my_interviews_for_candidate() from public;
grant execute on function public.list_my_interviews_for_candidate() to authenticated;

create index if not exists notifications_user_unread_idx
  on public.notifications (user_id, created_at desc)
  where read = false;

create index if not exists messages_application_created_idx
  on public.messages (application_id, created_at desc);

notify pgrst, 'reload schema';
