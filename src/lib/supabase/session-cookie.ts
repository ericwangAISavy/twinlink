export function isSupabaseAuthCookieName(name: string) {
  return name.startsWith("sb-") && name.includes("auth-token");
}

export function hasSupabaseAuthCookie(cookies: { name: string }[]) {
  return cookies.some((cookie) => isSupabaseAuthCookieName(cookie.name));
}
