import "server-only";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { toAppRole } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AppUser, Role } from "@/lib/types";

export async function getCurrentUser(): Promise<AppUser | null> {
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
    .maybeSingle();

  return {
    id: user.id,
    email: profile?.email ?? user.email ?? "",
    name: profile?.full_name ?? user.user_metadata?.full_name ?? null,
    role: toAppRole(profile?.role),
    image: profile?.avatar_url ?? null,
  };
}

export async function auth() {
  const user = await getCurrentUser();
  return user ? { user } : null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user?.id) redirect("/login");
  return user;
}

export async function requireRole(role: Role) {
  const user = await requireUser();
  if (user.role !== role) {
    redirect(user.role === "EMPLOYEE" ? "/dashboard/employee" : "/dashboard/candidate");
  }
  return user;
}

export async function requireEmployee() {
  return requireRole("EMPLOYEE");
}

export async function requireCandidate() {
  return requireRole("CANDIDATE");
}
