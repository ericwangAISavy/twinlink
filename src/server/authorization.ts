import "server-only";

import type { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user?.id) {
    redirect("/login");
  }
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
