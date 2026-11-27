/**
 * Every hcompany.ai page is reproduced locally. Its separate applications (docs, platform,
 * trust centre, showcase) are not, so links to them stay inside this site as well.
 */
export function href(target: string): string {
  if (!target.startsWith("http")) return target;
  const url = new URL(target);
  if (url.hostname === "hcompany.ai") return url.pathname + url.search + url.hash;
  return url.hostname.endsWith(".hcompany.ai") ? "/coming-soon" : target;
}
