-- Confirm Auth emails for people who already have a Twinlink profile.
-- Needed when "Confirm email" is enabled in Supabase Auth but confirmation
-- mail is not delivered. Does not create users or change roles.

update auth.users as u
set email_confirmed_at = coalesce(u.email_confirmed_at, now())
where u.email_confirmed_at is null
  and exists (
    select 1
    from public.profiles as p
    where p.id = u.id
  );
