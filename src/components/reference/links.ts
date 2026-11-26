export const REFERENCE_ORIGIN = "https://hcompany.ai";

/** Pages that exist locally. Every other path resolves to the reference site. */
const LOCAL_PATHS = new Set(["/", "/enterprise", "/agents-api", "/models-api", "/holotab", "/h-platform", "/pricing"]);

export function href(path: string): string {
  if (!path.startsWith("/") || LOCAL_PATHS.has(path)) return path;
  return REFERENCE_ORIGIN + path;
}
