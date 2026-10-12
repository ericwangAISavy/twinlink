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
  const rows = data.rows.filter((row) =>
    `${row.ip} ${row.country} ${row.region} ${row.city} ${row.page}`
      .toLowerCase()
      .includes(q),
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
        description="Monitor recorded public-page visits, IP addresses, and approximate locations. Times use China Standard Time (UTC+8)."
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
      ) : rows.length === 0 ? (
        <p className="rounded-xl border bg-white p-6">
          No matching visits recorded in this period.
        </p>
      ) : (
        <AdminTable
          headers={[
            "Visit time (UTC+8)",
            "IP address",
            "Approximate location",
            "Connection signals",
            "Page",
            "Browser",
          ]}
        >
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3 text-sm">
                {time(row.createdAt)}
                <p className="mt-1 text-xs text-muted-foreground">
                  {Date.now() - new Date(row.createdAt).getTime() < 15 * 60000
                    ? "Seen within 15 minutes"
                    : "Earlier visit"}
                </p>
              </td>
              <td className="px-4 py-3 font-mono text-xs">
                {row.ip || "Unknown"}
              </td>
              <td className="px-4 py-3 text-sm">
                {[row.city, row.region, row.country]
                  .filter(Boolean)
                  .join(", ") || "Unknown"}
                <p className="text-xs text-muted-foreground">
                  {row.source === "vercel"
                    ? "Hosting platform estimate"
                    : "Location unavailable"}
                </p>
              </td>
              <td className="px-4 py-3 text-sm">
                {!row.connection?.checked_at || Date.now() - new Date(row.connection.checked_at).getTime() > 86400000 ? "Unknown" : <>
                  <p className={row.connection.vpn ? "font-medium text-amber-800" : "text-muted-foreground"}>{row.connection.vpn ? "Possible VPN" : "No VPN signal detected"}</p>
                  <p className="text-xs">{[row.connection.proxy && "Proxy", row.connection.tor && "Tor", row.connection.datacenter && "Data center"].filter(Boolean).join(" · ")}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Checked {time(row.connection.checked_at)}</p>
                </>}
              </td>
              <td className="max-w-xs break-all px-4 py-3 text-sm">
                {row.page}
              </td>
              <td className="max-w-xs px-4 py-3">
                <details>
                  <summary className="cursor-pointer text-sm">
                    Browser details
                  </summary>
                  <p className="mt-2 break-all text-xs text-muted-foreground">
                    {row.agent || "Unknown"}
                  </p>
                </details>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        Showing matches within the latest 500 records for the selected period.
        IP addresses may be shared, proxied or changed; a record does not
        identify a person. Records are retained for up to 90 days, with cleanup
        on incoming visits.
      </p>
    </>
  );
}
