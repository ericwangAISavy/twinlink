import "server-only";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { lookupConnectionSignals } from "@/lib/vpn-detection";

export async function enrichVisitorConnection(ip: string) {
  if (process.env.VPN_DETECTION_ENABLED !== "true" || !process.env.IPAPI_IS_API_KEY) return;
  const client = createAdminSupabaseClient();
  // Claim once per IP per day, including unsuccessful lookups, to bound API usage.
  const { data, error } = await client.rpc("claim_visitor_connection_check", { p_ip: ip });
  if (error || data !== true) return;
  const signals = await lookupConnectionSignals(ip);
  if (!signals) return;
  await client.from("visitor_connections").update({
    vpn: signals.vpn, proxy: signals.proxy, tor: signals.tor,
    datacenter: signals.datacenter, checked_at: new Date().toISOString(),
  }).eq("ip_address", ip);
}
