import "server-only";
import { requireAdmin } from "@/server/authorization";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getVisitorOverview(days: number) {
  await requireAdmin();
  const client = await createServerSupabaseClient();
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const recent = new Date(Date.now() - 15 * 60000).toISOString();
  const results = await Promise.all([
    client
      .from("site_visits")
      .select("*", { count: "exact" })
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(500),
    client
      .from("site_visits")
      .select("id", { count: "exact", head: true })
      .gte("created_at", recent),
  ]);
  const [visits, activity] = results;
  const setup =
    process.env.VISITOR_TRACKING_ENABLED === "true" &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (visits.error)
    return {
      rows: [],
      total: 0,
      recent: 0,
      configured: setup,
      error: ["42P01", "PGRST205"].includes(visits.error.code)
        ? "Run supabase/migrations/0016_visitor_monitoring.sql in the Supabase SQL editor to create the private visitor dashboard."
        : "Visitor records could not be loaded. Please try again.",
    };
  return {
    rows: (visits.data || []).map((row) => ({
      id: String(row.id),
      page: String(row.page),
      ip: row.ip_address ? String(row.ip_address) : "",
      country: String(row.country),
      region: String(row.region),
      city: String(row.city),
      agent: String(row.user_agent),
      source: String(row.source),
      createdAt: String(row.created_at),
    })),
    total: visits.count || 0,
    recent: activity.count || 0,
    configured: setup,
    error: null,
  };
}
