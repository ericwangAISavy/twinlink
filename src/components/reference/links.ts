/** Reference paths that exist locally, mapped to their local route. */
const LOCAL_PATHS: Record<string, string> = {
  "/": "/",
  "/enterprise": "/enterprise",
  "/agents-api": "/agents-api",
  "/models-api": "/models-api",
  "/holotab": "/orin-tab",
  "/h-platform": "/platform",
  "/pricing": "/pricing",
};

export const COMING_SOON = "/coming-soon";

/** Anything not built yet, including external services, goes to the coming-soon page. */
export function href(path: string): string {
  if (path.startsWith("#")) return path;
  return LOCAL_PATHS[path.split(/[?#]/)[0]] ?? COMING_SOON;
}
