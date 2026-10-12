export type ConnectionSignals = {
  checked_at?: string | null;
  vpn?: boolean | null;
  proxy?: boolean | null;
  tor?: boolean | null;
  datacenter?: boolean | null;
};
export type VisitorStatus = "pure" | "nonPure" | "unknown";
export function visitorStatus(connection: ConnectionSignals | undefined, now = Date.now()): VisitorStatus {
  if (!connection?.checked_at) return "unknown";
  const checked = Date.parse(connection.checked_at);
  if (!Number.isFinite(checked) || checked > now || now - checked > 86400000) return "unknown";
  const signals = [connection.vpn, connection.proxy, connection.tor, connection.datacenter];
  if (signals.some(signal => signal === true)) return "nonPure";
  return signals.every(signal => signal === false) ? "pure" : "unknown";
}
export type DailyVisitorStatus = { date: string; pure: number; nonPure: number; unknown: number };
export function dailyVisitorStatus(rows: { id: string; ip: string; createdAt: string; connection?: ConnectionSignals }[], days: number, now = Date.now()): DailyVisitorStatus[] {
  const offset = 8 * 3600000;
  const dayKey = (timestamp: number) => new Date(timestamp + offset).toISOString().slice(0, 10);
  const buckets = new Map<string, Map<string, VisitorStatus>>();
  for (let i = days - 1; i >= 0; i--) buckets.set(dayKey(now - i * 86400000), new Map());
  for (const row of rows) {
    const timestamp = Date.parse(row.createdAt);
    if (!Number.isFinite(timestamp)) continue;
    buckets.get(dayKey(timestamp))?.set(row.ip || `unknown-${row.id}`, row.ip ? visitorStatus(row.connection, now) : "unknown");
  }
  return [...buckets].map(([date, ips]) => {
    const result: DailyVisitorStatus = { date, pure: 0, nonPure: 0, unknown: 0 };
    for (const status of ips.values()) result[status]++;
    return result;
  });
}
