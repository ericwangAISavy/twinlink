begin;
create table if not exists public.site_visits (
  id uuid primary key default gen_random_uuid(),
  page text not null check (length(page) <= 300 and page like '/%'),
  ip_address inet,
  country text not null default '' check (length(country) <= 2),
  region text not null default '' check (length(region) <= 150),
  city text not null default '' check (length(city) <= 150),
  user_agent text not null default '' check (length(user_agent) <= 300),
  source text not null check (source in ('vercel','unavailable')),
  created_at timestamptz not null default now()
);
create index if not exists site_visits_time on public.site_visits(created_at desc);
create index if not exists site_visits_ip_page_time on public.site_visits(ip_address,page,created_at desc);
alter table public.site_visits enable row level security;
revoke all on public.site_visits from public, anon, authenticated;
grant select on public.site_visits to authenticated;
grant select,insert,delete on public.site_visits to service_role;
drop policy if exists site_visits_admin_read on public.site_visits;
create policy site_visits_admin_read on public.site_visits for select to authenticated using(public.is_admin());
-- Only the server's service role can record visits; public clients cannot forge logs.
create or replace function public.record_site_visit(p_page text,p_ip inet,p_country text,p_region text,p_city text,p_agent text,p_source text)
returns void language plpgsql security invoker set search_path=public,pg_temp as $$
begin
  if p_page not like '/%' or length(p_page) > 300 then raise exception 'Invalid page'; end if;
  delete from public.site_visits where created_at < now() - interval '90 days';
  if p_ip is not null then
    perform pg_advisory_xact_lock(hashtextextended(p_ip::text,0));
    if (select count(*) from public.site_visits where ip_address=p_ip and created_at > now()-interval '1 hour') >= 120 then return; end if;
    if exists(select 1 from public.site_visits where ip_address=p_ip and page=p_page and created_at > now()-interval '1 minute') then return; end if;
  end if;
  insert into public.site_visits(page,ip_address,country,region,city,user_agent,source)
  values(p_page,p_ip,coalesce(p_country,''),coalesce(p_region,''),coalesce(p_city,''),coalesce(p_agent,''),p_source);
end;
$$;
revoke all on function public.record_site_visit(text,inet,text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.record_site_visit(text,inet,text,text,text,text,text) to service_role;
commit;
