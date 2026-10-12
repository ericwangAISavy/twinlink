import { isIP } from "node:net";

export function visitorMetadata(headers: Headers, vercel: boolean) {
  const clean = (name: string) => {
    const value = headers.get(name) || "";
    try {
      return decodeURIComponent(value)
        .replace(/[\u0000-\u001f]/g, "")
        .slice(0, 150);
    } catch {
      return "";
    }
  };
  // These headers are trustworthy only when Vercel supplies them at its edge.
  const rawIp = vercel
    ? (
        headers.get("x-vercel-forwarded-for") ||
        headers.get("x-forwarded-for") ||
        ""
      )
        .split(",")[0]
        .trim()
    : "";
  const country = vercel ? clean("x-vercel-ip-country").toUpperCase() : "";
  return {
    ip: isIP(rawIp) ? rawIp : null,
    country: /^[A-Z]{2}$/.test(country) ? country : "",
    region: vercel ? clean("x-vercel-ip-country-region") : "",
    city: vercel ? clean("x-vercel-ip-city") : "",
    agent: (headers.get("user-agent") || "").slice(0, 300),
    source: vercel ? "vercel" : "unavailable",
  };
}
export function isPublicVisitPath(path: unknown): path is string {
  return (
    typeof path === "string" &&
    path.length <= 300 &&
    /^\/(?:[a-zA-Z0-9_-]+\/?)*$/.test(path) &&
    !/^\/(?:admin|dashboard|auth|api|login|register)(?:\/|$)/.test(path)
  );
}
