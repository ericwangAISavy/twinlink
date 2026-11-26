/** Menu paths that exist locally, mapped to their local route. */
const ROUTES: Record<string, string> = {
  "/": "/",
  "/enterprise": "/enterprise",
  "/agents-api": "/agents-api",
  "/models-api": "/models-api",
  "/pricing": "/pricing",
  "/holotab": "/orin-tab",
  "/h-platform": "/platform",
  "/about": "/about",
  "/careers": "/careers",
  "/contact": "/contact",
  "/events": "/events",
  "/newsroom": "/blog",
  "/use-cases": "/case-studies",
  "/privacy-policy": "/privacy",
  "/terms-of-use": "/terms"
};

export const COMING_SOON = "/coming-soon";

/** Anything not built yet, including external services, goes to the coming-soon page. */
export function href(path: string): string {
  if (path.startsWith("#")) return path;
  return ROUTES[path.split(/[?#]/)[0]] ?? COMING_SOON;
}
