import { VisitorDailyChart } from "@/components/admin/visitor-daily-chart";
import { dailyVisitorStatus } from "@/lib/visitor-daily-status";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { VisitorRefresh } from "@/components/admin/visitor-refresh";
import { getVisitorOverview } from "@/server/queries/visitors";

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string; q?: string }>;
}) {
  const params = await searchParams;
  const days = [1, 7, 30, 90].includes(Number(params.days))
    ? Number(params.days)
    : 7;
  const data = await getVisitorOverview(days);
  const q = (params.q || "").trim().toLowerCase();
  const byIp = new Map<string, typeof data.rows>();
  for (const row of data.rows) {
    // An unavailable IP cannot establish that two visits share a connection.
    const key = row.ip || `unknown-${row.id}`;
    const visits = byIp.get(key) || [];
    visits.push(row);
    byIp.set(key, visits);
  }
  const groups = [...byIp.entries()].filter(([, visits]) =>
    visits.some(row => `${row.ip} ${row.country} ${row.region} ${row.city} ${row.page}`.toLowerCase().includes(q)),
  );
  const countries = new Set(data.rows.map((row) => row.country).filter(Boolean))
    .size;
  const time = (value: string) =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Shanghai",
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(new Date(value));
  return (
    <>
      <AdminPageHeader
        title="Website visitors"
        description="Visits grouped by IP address, with expandable logs, approximate locations, and connection signals. Times use China Standard Time (UTC+8)."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: `Recorded visits · past ${days} day${days === 1 ? "" : "s"}`,
            value: data.total,
          },
          { label: "Visits in the last 15 minutes", value: data.recent },
          { label: "Countries in latest 500 records", value: countries },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#eadfcd] bg-white p-5"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 font-serif text-3xl">{item.value}</p>
          </div>
        ))}
      </div>
      {!data.error && <VisitorDailyChart data={dailyVisitorStatus(data.rows, days)} />}
      {!data.configured && (
        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm">
          Capture is not configured. Set VISITOR_TRACKING_ENABLED=true and a
          server-only SUPABASE_SERVICE_ROLE_KEY in deployment settings. Existing
          records remain available.
        </p>
      )}
      {data.configured && (
        <p className="mb-4 text-sm text-muted-foreground">
          Capture is configured. Approximate IP geolocation is available on
          Vercel; other hosts display Unknown. Recent visits do not prove a
          visitor is still online.
        </p>
      )}
      <p className="mb-4 text-sm text-muted-foreground">
        {data.detectionConfigured ? "IP reputation checks are configured (ipapi.is)." : "VPN checks are disabled. Set VPN_DETECTION_ENABLED=true and the server-only IPAPI_IS_API_KEY after applying migration 0017."}
        {" "}Signals are estimates, refreshed on incoming visits at most once per IP per day. Unknown means no successful recent check; no VPN signal does not guarantee a direct connection.
      </p>
      {data.detectionError && <p role="alert" className="mb-4 text-sm">{data.detectionError}</p>}
      <VisitorRefresh />
      <form className="mb-6 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={params.q}
          aria-label="Search IP, location, or page"
          placeholder="IP, location, or page"
          className="rounded-lg border bg-white px-3 py-2"
        />
        <select
          name="days"
          defaultValue={days}
          aria-label="Visit period"
          className="rounded-lg border bg-white px-3 py-2"
        >
          {[1, 7, 30, 90].map((value) => (
            <option key={value} value={value}>
              Past {value} day{value === 1 ? "" : "s"}
            </option>
          ))}
        </select>
        <button className="rounded-full bg-[#1c1916] px-5 py-2 text-white">
          Filter
        </button>
      </form>
      {data.error ? (
        <p
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-5"
        >
          {data.error}
        </p>
      ) : groups.length === 0 ? (
        <p className="rounded-xl border bg-white p-6">
          No matching visits recorded in this period.
        </p>
      ) : (
        <div className="space-y-3">
          {groups.map(([key, visits]) => {
            const latest = visits[0];
            const connection = latest.connection;
            const checked = connection?.checked_at && Date.now() - new Date(connection.checked_at).getTime() <= 86400000;
            return (
              <details key={key} className="group rounded-2xl border border-[#eadfcd] bg-white">
                <summary className="cursor-pointer rounded-2xl px-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9c7941]">
                  <span className="ml-2 inline-flex flex-wrap items-center gap-x-6 gap-y-2 align-middle">
                    <span className="break-all font-mono text-sm font-semibold">{latest.ip || "Unknown IP"}</span>
                    <span className="rounded-full bg-[#f4eee3] px-3 py-1 text-xs">{visits.length} {visits.length === 1 ? "visit" : "visits"}</span>
                    <span className="text-sm">{[latest.city, latest.region, latest.country].filter(Boolean).join(", ") || "Location unknown"}</span>
                    <span className={checked && connection.vpn ? "text-sm font-medium text-amber-800" : "text-sm text-muted-foreground"}>
                      {checked ? connection.vpn ? "Possible VPN" : "No VPN signal detected" : "Connection unknown"}
                      {checked && [connection.proxy && "Proxy", connection.tor && "Tor", connection.datacenter && "Data center"].filter(Boolean).map(signal => ` · ${signal}`).join("")}
                    </span>
                    <span className="text-xs text-muted-foreground">Last visit {time(latest.createdAt)}</span>
                  </span>
                </summary>
                <div className="space-y-3 border-t border-[#eadfcd] bg-[#faf7f2] p-4">
                  <p className="text-xs text-muted-foreground">
                    Newest visits first · times in UTC+8. {checked ? `Connection checked ${time(connection.checked_at)}.` : "No recent successful connection check."}
                  </p>
                  <AdminTable headers={["Visit time (UTC+8)", "Page", "Approximate location", "Browser"]}>
                    {visits.map(row => (
                      <tr key={row.id}>
                        <td className="px-4 py-3 text-sm">{time(row.createdAt)}</td>
                        <td className="max-w-xs break-all px-4 py-3 text-sm">{row.page}</td>
                        <td className="px-4 py-3 text-sm">
                          {[row.city, row.region, row.country].filter(Boolean).join(", ") || "Unknown"}
                          <p className="text-xs text-muted-foreground">{row.source === "vercel" ? "Hosting platform estimate" : "Location unavailable"}</p>
                        </td>
                        <td className="max-w-xs px-4 py-3">
                          <details>
                            <summary className="cursor-pointer text-sm">Browser details</summary>
                            <p className="mt-2 break-all text-xs text-muted-foreground">{row.agent || "Unknown"}</p>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </AdminTable>
                </div>
              </details>
            );
          })}
        </div>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        Click an IP address to expand its visit logs. Search matches IP groups and
        shows all loaded logs in each matching group. Logs come from the latest
        500 records for the selected period; unavailable IPs remain separate.
        IP addresses may be shared, proxied or changed; a record does not
        identify a person. Records are retained for up to 90 days, with cleanup
        on incoming visits.
      </p>
    </>
  );
}
