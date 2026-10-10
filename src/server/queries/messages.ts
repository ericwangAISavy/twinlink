import "server-only";

import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const getNotifications = cache(async (userId: string, limit = 50) => {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("notifications")
    .select("id, title, body, href, read, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []).map((item) => ({
    id: String(item.id),
    title: String(item.title),
    body: String(item.body),
    href: (item.href as string | null) ?? null,
    read: Boolean(item.read),
    createdAt: String(item.created_at),
  }));
});

export const getUnreadNotifications = cache(async (userId: string) => {
  return getNotifications(userId, 20);
});

export const getUnreadNotificationCount = cache(async (userId: string) => {
  if (!isSupabaseConfigured()) return 0;
  const supabase = await createServerSupabaseClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);
  return count ?? 0;
});

export async function getEmployeeInvites(userId: string) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("employee_invites")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false })
    .limit(10);
  return (data ?? []).map((invite) => ({
    id: String(invite.id),
    email: String(invite.email),
    usedAt: invite.used_at ? new Date(String(invite.used_at)) : null,
    expiresAt: new Date(String(invite.expires_at)),
  }));
}
