import { isIP } from "node:net";

export function parseConnectionSignals(value: unknown, ip: string) {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (data.ip !== ip || data.error ||
      !["is_vpn", "is_proxy", "is_tor", "is_datacenter"].every(key => typeof data[key] === "boolean")) return null;
  return { vpn: data.is_vpn as boolean, proxy: data.is_proxy as boolean,
    tor: data.is_tor as boolean, datacenter: data.is_datacenter as boolean };
}

export async function lookupConnectionSignals(ip: string) {
  if (!isIP(ip) || process.env.VPN_DETECTION_ENABLED !== "true" || !process.env.IPAPI_IS_API_KEY) return null;
  const url = new URL("https://api.ipapi.is/");
  url.searchParams.set("q", ip);
  url.searchParams.set("key", process.env.IPAPI_IS_API_KEY);
  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(2500) });
    if (!response.ok) return null;
    return parseConnectionSignals(await response.json(), ip);
  } catch { return null; }
}
