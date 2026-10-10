export function candidateApplicationHref(applicationId: string) {
  return `/dashboard/candidate/applications?id=${encodeURIComponent(applicationId)}`;
}

export function candidateInboxHref(href: string | null | undefined) {
  if (!href) return "/dashboard/candidate/applications";

  try {
    const url = new URL(href, "https://twinlink.local");
    const path = url.pathname.replace(/\/$/, "") || "/";
    const root = "/dashboard/candidate/applications";
    if (path !== root && !path.startsWith(`${root}/`)) return href;

    const pathId = path === root ? null : path.slice(root.length + 1).split("/")[0] || null;
    const id = pathId || url.searchParams.get("id");
    if (!id) return "/dashboard/candidate/applications";
    return candidateApplicationHref(id);
  } catch {
    return href;
  }
}
