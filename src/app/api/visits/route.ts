import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isPublicVisitPath, visitorMetadata } from "@/lib/visitor-metadata";

export async function POST(request: Request) {
  const empty = () =>
    new NextResponse(null, {
      status: 204,
      headers: { "Cache-Control": "no-store" },
    });
  if (
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VISITOR_TRACKING_ENABLED !== "true"
  )
    return empty();
  if (
    request.headers.get("dnt") === "1" ||
    request.headers.get("sec-gpc") === "1"
  )
    return empty();
  try {
    const origin = request.headers.get("origin");
    const host =
      process.env.VERCEL === "1"
        ? request.headers.get("x-forwarded-host") || request.headers.get("host")
        : request.headers.get("host");
    if (!origin || new URL(origin).host !== host) return empty();
    if (Number(request.headers.get("content-length") || 0) > 1024)
      return empty();
    const reader = request.body?.getReader();
    if (!reader) return empty();
    const decoder = new TextDecoder();
    let bytes = 0;
    let raw = "";
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 1024) {
        await reader.cancel();
        return empty();
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    raw += decoder.decode();
    const body = JSON.parse(raw);
    if (!isPublicVisitPath(body.page)) return empty();
    const meta = visitorMetadata(request.headers, process.env.VERCEL === "1");
    const client = createAdminSupabaseClient();
    await client.rpc("record_site_visit", {
      p_page: body.page,
      p_ip: meta.ip,
      p_country: meta.country,
      p_region: meta.region,
      p_city: meta.city,
      p_agent: meta.agent,
      p_source: meta.source,
    });
  } catch {
    /* Monitoring must not affect the website or expose visitor data. */
  }
  return empty();
}
