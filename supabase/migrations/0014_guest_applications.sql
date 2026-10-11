-- Guest applicants do not create accounts. Their personal data is admin-only.
begin;
create table if not exists public.guest_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  full_name text not null check (length(full_name) between 2 and 150),
  email text not null check (length(email) between 3 and 254),
  phone text not null default '' check (length(phone) <= 80),
  resume_url text not null default '' check (length(resume_url) <= 2048),
  cover_letter text not null default '' check (length(cover_letter) <= 10000),
  status text not null default 'submitted' check (status in ('submitted','under_review','interview','accepted','rejected','withdrawn')),
  review_notes text not null default '' check (length(review_notes) <= 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(job_id,email)
);
alter table public.guest_applications enable row level security;
revoke all on public.guest_applications from anon, authenticated;
grant select, update on public.guest_applications to authenticated;
drop policy if exists guest_admin_read on public.guest_applications;
create policy guest_admin_read on public.guest_applications for select to authenticated using (public.is_admin());
drop policy if exists guest_admin_update on public.guest_applications;
create policy guest_admin_update on public.guest_applications for update to authenticated using (public.is_admin()) with check (public.is_admin());
create index if not exists guest_application_email_time_index on public.guest_applications(email,created_at);
create index if not exists guest_application_created_index on public.guest_applications(created_at desc);
create or replace function public.submit_guest_application(
  p_job_id uuid, p_name text, p_email text, p_phone text default '',
  p_resume_url text default '', p_cover_letter text default ''
) returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare
  applicant_email text := lower(btrim(coalesce(p_email,'')));
  new_id uuid;
  job_title text;
begin
  if length(btrim(coalesce(p_name,''))) not between 2 and 150
    or length(applicant_email) > 254
    or applicant_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or length(coalesce(p_phone,'')) > 80
    or length(coalesce(p_resume_url,'')) > 2048
    or (coalesce(p_resume_url,'') <> '' and (p_resume_url !~ '^https://[^[:space:]]+$' or p_resume_url ~ '^https://[^/?#]*@'))
    or length(coalesce(p_cover_letter,'')) > 10000 then
    raise exception 'Invalid application details.';
  end if;
  -- Lock the job against concurrent closing/deadline updates until submission commits.
  select title into job_title from public.jobs where id = p_job_id
    and status = 'published' and (application_deadline is null or application_deadline >= current_date)
    for share;
  if not found then raise exception 'This role is not open for applications.'; end if;
  perform pg_advisory_xact_lock(hashtextextended(applicant_email, 0));
  -- Replays do not disclose whether an email previously applied.
  if exists(select 1 from public.guest_applications where job_id = p_job_id and email = applicant_email) then return; end if;
  if (select count(*) from public.guest_applications where email = applicant_email and created_at > now() - interval '24 hours') >= 5 then
    raise exception 'Please wait before submitting more applications.';
  end if;
  insert into public.guest_applications(job_id,full_name,email,phone,resume_url,cover_letter)
  values(p_job_id,btrim(p_name),applicant_email,btrim(coalesce(p_phone,'')),btrim(coalesce(p_resume_url,'')),coalesce(p_cover_letter,''))
  returning id into new_id;
  insert into public.notifications(user_id,title,body,href)
  select id,'New guest application',btrim(p_name) || ' applied to ' || job_title,
    '/admin/guest-applications/' || new_id::text from public.profiles where role = 'admin';
end;
$$;
revoke all on function public.submit_guest_application(uuid,text,text,text,text,text) from public;
grant execute on function public.submit_guest_application(uuid,text,text,text,text,text) to anon, authenticated;
commit;
