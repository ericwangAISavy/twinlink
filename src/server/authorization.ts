import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  homePath,
  parseUserRole,
  toAppRole,
  type Role,
  type UserRole,
} from "@/lib/roles";
import type { AppUser } from "@/lib/types";

export type TrustedProfile = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: UserRole;
};

export type CurrentAuth = {
  user: AppUser;
  profile: TrustedProfile;
  role: Role;
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  avatar_url: string | null;
};

export const getCurrentProfile = cache(async (): Promise<CurrentAuth | null> => {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, avatar_url")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  const userRole = parseUserRole(profile?.role);
  const role = toAppRole(userRole);
  if (!profile || !userRole || !role) return null;

  const appUser: AppUser = {
    id: user.id,
    email: profile.email ?? user.email ?? "",
    name: profile.full_name ?? user.user_metadata?.full_name ?? null,
    role,
    image: profile.avatar_url ?? null,
  };

  return {
    user: appUser,
    profile: {
      id: profile.id,
      email: appUser.email,
      fullName: appUser.name,
      avatarUrl: appUser.image ?? null,
      role: userRole,
    },
    role,
  };
});

export async function getCurrentUser(): Promise<AppUser | null> {
  const auth = await getCurrentProfile();
  return auth?.user ?? null;
}

export async function auth() {
  const user = await getCurrentUser();
  return user ? { user } : null;
}

export async function requireAuth() {
  const auth = await getCurrentProfile();
  if (!auth) redirect("/login");
  return auth;
}

export async function requireUser() {
  const auth = await requireAuth();
  return auth.user;
}

export async function requireRole(role: Role) {
  const user = await requireUser();
  if (user.role !== role) {
    redirect(homePath(user.role));
  }
  return user;
}

export async function requireStaff() {
  const user = await requireUser();
  if (user.role !== "EMPLOYEE" && user.role !== "ADMIN") {
    redirect(homePath(user.role));
  }
  return user;
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}

export async function requireEmployee() {
  return requireRole("EMPLOYEE");
}

export async function requireCandidate() {
  return requireRole("CANDIDATE");
}
