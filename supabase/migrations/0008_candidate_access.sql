-- New candidates stay pending until an administrator approves sign-in.
-- Existing profiles stay approved.

alter table public.profiles
  add column if not exists access_status text;

update public.profiles
set access_status = 'approved'
where access_status is null
  and role in ('employee', 'admin');

update public.profiles
set access_status = 'pending'
where role = 'candidate'
  and (
    access_status is null
    or not exists (
      select 1
      from public.activity_logs
      where activity_logs.action = 'Approved candidate access'
        and activity_logs.entity_id = profiles.id::text
    )
  );

alter table public.profiles
  alter column access_status set default 'pending';

alter table public.profiles
  alter column access_status set not null;

alter table public.profiles
  drop constraint if exists profiles_access_status_check;

alter table public.profiles
  add constraint profiles_access_status_check
  check (access_status in ('pending', 'approved'));

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if current_setting('app.allow_role_change', true) is distinct from 'true' then
    if auth.role() <> 'service_role' and new.role is distinct from old.role then
      new.role := old.role;
    end if;
  end if;

  if current_setting('app.allow_access_change', true) is distinct from 'true'
     and new.access_status is distinct from old.access_status
     and not public.is_admin() then
    new.access_status := old.access_status;
  end if;

  return new;
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

  return new;
end;
$$;

create or replace function public.approve_candidate_access(target_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;

  if not exists (
    select 1 from public.profiles
    where id = target_id and role = 'candidate'
  ) then
    raise exception 'Candidate not found';
  end if;

  perform set_config('app.allow_access_change', 'true', true);
  update public.profiles
  set access_status = 'approved'
  where id = target_id and role = 'candidate';
end;
$$;

revoke all on function public.approve_candidate_access(uuid) from public;
grant execute on function public.approve_candidate_access(uuid) to authenticated;

create or replace function public.set_candidate_access(target_id uuid, next_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  if next_status not in ('pending', 'approved') then
    raise exception 'Invalid access status';
  end if;
  if not exists (
    select 1 from public.profiles
    where id = target_id and role = 'candidate'
  ) then
    raise exception 'Only candidate accounts can have their access changed here';
  end if;

  perform set_config('app.allow_access_change', 'true', true);
  update public.profiles
  set access_status = next_status
  where id = target_id and role = 'candidate';
end;
$$;

create or replace function public.admin_delete_candidate(target_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_role text;
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  if target_id = auth.uid() then
    raise exception 'You cannot remove your own account here';
  end if;

  select role into target_role from public.profiles where id = target_id;
  if target_role is null then
    raise exception 'Candidate not found';
  end if;
  if target_role <> 'candidate' then
    raise exception 'Only candidate accounts can be removed here';
  end if;

  delete from auth.users where id = target_id;
end;
$$;

revoke all on function public.set_candidate_access(uuid, text) from public;
revoke all on function public.admin_delete_candidate(uuid) from public;
grant execute on function public.set_candidate_access(uuid, text) to authenticated;
grant execute on function public.admin_delete_candidate(uuid) to authenticated;

notify pgrst, 'reload schema';
