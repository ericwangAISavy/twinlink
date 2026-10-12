export function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  let explicit: URL | undefined;
  try {
    if (configured) explicit = new URL(configured);
  } catch {
    /* Use the deployment URL when unset or invalid. */
  }
  if (
    explicit &&
    ["http:", "https:"].includes(explicit.protocol) &&
    !explicit.username &&
    !explicit.password &&
    !(
      process.env.VERCEL === "1" &&
      ["localhost", "127.0.0.1", "0.0.0.0"].includes(explicit.hostname)
    )
  )
    return explicit.origin;
  const hostname =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (hostname && /^[a-zA-Z0-9.-]+$/.test(hostname))
    return `https://${hostname}`;
  return "http://localhost:3000";
}

export function requestOrigin(request: Request) {
  const url = new URL(request.url);
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol === "https"
      ? "https:"
      : forwardedProtocol === "http"
        ? "http:"
        : url.protocol;
  return host && /^[a-zA-Z0-9.-]+(?::\d+)?$/.test(host)
    ? `${protocol}//${host}`
    : url.origin;
}
