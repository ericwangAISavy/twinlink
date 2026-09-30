export const USER_ROLES = ["candidate", "employee", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export type Role = "CANDIDATE" | "EMPLOYEE" | "ADMIN";

export function parseUserRole(value: unknown): UserRole | null {
  if (value === "candidate" || value === "employee" || value === "admin") return value;
  if (value === "CANDIDATE") return "candidate";
  if (value === "EMPLOYEE") return "employee";
  if (value === "ADMIN") return "admin";
  return null;
}

export function toAppRole(value: unknown): Role | null {
  const parsed = parseUserRole(value);
  if (parsed === "admin") return "ADMIN";
  if (parsed === "employee") return "EMPLOYEE";
  if (parsed === "candidate") return "CANDIDATE";
  return null;
}

export function toDbRole(value: Role): UserRole {
  if (value === "ADMIN") return "admin";
  if (value === "EMPLOYEE") return "employee";
  return "candidate";
}

export function homePath(role: Role) {
  if (role === "ADMIN") return "/admin";
  if (role === "EMPLOYEE") return "/dashboard/employee";
  return "/dashboard/candidate";
}

export function isSafeInternalPath(path: string | null | undefined): path is string {
  return Boolean(path && path.startsWith("/") && !path.startsWith("//") && !path.includes("\\"));
}

export function roleCanAccessPath(role: Role, pathname: string) {
  if (pathname.startsWith("/admin")) return role === "ADMIN";
  if (pathname.startsWith("/dashboard/employee")) return role === "EMPLOYEE";
  if (pathname.startsWith("/dashboard/candidate")) return role === "CANDIDATE";
  return true;
}

export function destinationAfterLogin(role: Role, callbackUrl?: string | null) {
  const home = homePath(role);
  if (!isSafeInternalPath(callbackUrl) || !roleCanAccessPath(role, callbackUrl)) {
    return home;
  }
  return callbackUrl;
}

export const ACCOUNT_SETUP_ERROR =
  "This account is not configured for Twinlink access. Contact an administrator.";

export const ACCESS_PENDING_ERROR =
  "Your access is waiting for administrator approval. You can sign in after a Twinlink administrator approves your account.";
export const UNKNOWN_ROLE_ERROR = "This account does not have a valid Twinlink role.";

export function authErrorMessage(error: { message?: string; code?: string } | null | undefined) {
  const message = error?.message ?? "";
  const code = error?.code ?? "";
  if (code === "email_not_confirmed" || /email not confirmed/i.test(message)) {
    return "Confirm your email before signing in. Check your inbox for the Twinlink link.";
  }
  if (/invalid login credentials/i.test(message) || code === "invalid_credentials") {
    return "Invalid email or password.";
  }
  if (
    /invalid api key/i.test(message) ||
    /failed to fetch/i.test(message) ||
    /fetch failed/i.test(message)
  ) {
    return "Unable to reach Twinlink authentication. Try again in a moment.";
  }
  if (/user already registered/i.test(message) || code === "user_already_exists") {
    return "An account with this email already exists. Sign in instead.";
  }
  if (/rate limit/i.test(message) || code === "over_email_send_rate_limit") {
    return "Too many signup emails were sent. Wait a few minutes, then try again.";
  }
  return message || "Unable to sign in.";
}
