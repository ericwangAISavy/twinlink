-- Ensure staff helpers treat admin as an internal role.
-- Safe to re-run. Does not weaken protect_profile_role.

create or replace function public.is_employee()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role in ('employee', 'admin')
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
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke all on function public.is_employee() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.is_employee() to anon, authenticated;
grant execute on function public.is_admin() to authenticated;
