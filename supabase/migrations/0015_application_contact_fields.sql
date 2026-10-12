-- Preserve earlier submissions; require contact fields for all new applications.
begin;
alter table public.guest_applications add column if not exists address text not null default '' check (length(address) <= 600);
alter table public.guest_applications add column if not exists social_url text not null default '' check (length(social_url) <= 2048);
-- Remove the old overload so anonymous callers cannot bypass required fields.
drop function if exists public.submit_guest_application(uuid,text,text,text,text,text);
create or replace function public.submit_guest_application(
  p_job_id uuid, p_name text, p_email text, p_phone text, p_address text,
  p_resume_url text, p_social_url text, p_cover_letter text
) returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare
  applicant_email text := lower(btrim(coalesce(p_email,'')));
  new_id uuid;
  job_title text;
begin
  if length(btrim(coalesce(p_name,''))) not between 2 and 150
    or length(applicant_email) > 254
    or applicant_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or length(btrim(coalesce(p_phone,''))) not between 7 and 40
    or p_phone !~ '^[+0-9().[:space:]-]+$'
    or length(regexp_replace(p_phone,'[^0-9]','','g')) not between 7 and 20
    or length(btrim(coalesce(p_address,''))) not between 5 and 600
    or length(coalesce(p_social_url,'')) > 2048
    or (coalesce(p_social_url,'') <> '' and (p_social_url !~ '^https://[^[:space:]]+$' or p_social_url ~ '^https://[^/?#]*@'))
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
  insert into public.guest_applications(job_id,full_name,email,phone,address,resume_url,social_url,cover_letter)
  values(p_job_id,btrim(p_name),applicant_email,btrim(p_phone),btrim(p_address),btrim(coalesce(p_resume_url,'')),btrim(coalesce(p_social_url,'')),coalesce(p_cover_letter,''))
  returning id into new_id;
  insert into public.notifications(user_id,title,body,href)
  select id,'New guest application',btrim(p_name) || ' applied to ' || job_title,
    '/admin/guest-applications/' || new_id::text from public.profiles where role = 'admin';
end;
$$;
revoke all on function public.submit_guest_application(uuid,text,text,text,text,text,text,text) from public;
grant execute on function public.submit_guest_application(uuid,text,text,text,text,text,text,text) to anon, authenticated;
alter table public.applications add column if not exists contact_email text not null default '';
alter table public.applications add column if not exists contact_phone text not null default '';
alter table public.applications add column if not exists contact_address text not null default '';
alter table public.applications add column if not exists social_url text not null default '';
create or replace function public.validate_application_contact() returns trigger language plpgsql set search_path=public,pg_temp as $$
begin
  if length(btrim(new.contact_address)) not between 5 and 600
    or length(new.contact_email) > 254 or new.contact_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or length(new.contact_phone) not between 7 and 40 or new.contact_phone !~ '^[+0-9().[:space:]-]+$'
    or length(regexp_replace(new.contact_phone,'[^0-9]','','g')) not between 7 and 20
    or length(new.social_url) > 2048 or (new.social_url <> '' and (new.social_url !~ '^https://[^[:space:]]+$' or new.social_url ~ '^https://[^/?#]*@')) then
    raise exception 'Enter valid email, phone, address and professional link details.';
  end if;
  return new;
end;
$$;
drop trigger if exists application_contact_required on public.applications;
create trigger application_contact_required before insert on public.applications for each row execute function public.validate_application_contact();
commit;
