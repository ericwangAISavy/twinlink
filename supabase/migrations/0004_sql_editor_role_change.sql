-- Allow SQL Editor (postgres / supabase_admin) to change profiles.role.
-- Authenticated browser users still cannot escalate; they are not these roles.
-- Does not drop protect_profile_role. Does not disable RLS.

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if current_setting('app.allow_role_change', true) = 'true' then
    return new;
  end if;
  if current_user in ('postgres', 'supabase_admin') then
    return new;
  end if;
  if auth.role() is distinct from 'service_role' and new.role is distinct from old.role then
    new.role := old.role;
  end if;
  return new;
end;
$$;
