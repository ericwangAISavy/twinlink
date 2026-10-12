begin;
create table if not exists public.visitor_connections (
  ip_address inet primary key,
  vpn boolean, proxy boolean, tor boolean, datacenter boolean,
  checked_at timestamptz,
  attempted_at timestamptz not null default now()
);
alter table public.visitor_connections enable row level security;
revoke all on public.visitor_connections from public, anon, authenticated;
grant select on public.visitor_connections to authenticated;
grant select, insert, update, delete on public.visitor_connections to service_role;
drop policy if exists visitor_connections_admin_read on public.visitor_connections;
create policy visitor_connections_admin_read on public.visitor_connections for select to authenticated using (public.is_admin());
create or replace function public.claim_visitor_connection_check(p_ip inet)
returns boolean language plpgsql security invoker set search_path = public, pg_temp as $$
declare claimed inet;
begin
  if p_ip is null then return false; end if;
  delete from public.visitor_connections where attempted_at < now() - interval '90 days';
  insert into public.visitor_connections(ip_address) values(p_ip)
  on conflict(ip_address) do update set attempted_at = now(), checked_at = null,
    vpn = null, proxy = null, tor = null, datacenter = null
    where visitor_connections.attempted_at < now() - interval '24 hours'
  returning ip_address into claimed;
  return claimed is not null;
end;
$$;
revoke all on function public.claim_visitor_connection_check(inet) from public, anon, authenticated;
grant execute on function public.claim_visitor_connection_check(inet) to service_role;
commit;
