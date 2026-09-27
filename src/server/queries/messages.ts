import "server-only";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { firstRecord } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getMessageThreads(userId: string, role: "CANDIDATE" | "EMPLOYEE") {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("applications").select("id, updated_at, candidate_id, jobs(title, slug)").order("updated_at", { ascending: false });
  if (role === "CANDIDATE") query = query.eq("candidate_id", userId);
  const { data } = await query;
  const rows = data ?? [];
  const results = [];
  for (const row of rows) {
    const { data: last } = await supabase
      .from("messages")
      .select("body, created_at, sender_id")
      .eq("application_id", row.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!last) continue;
    const { data: candidate } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", row.candidate_id)
      .maybeSingle();
    const { data: sender } = await supabase.from("profiles").select("full_name").eq("id", last.sender_id).maybeSingle();
    const job = firstRecord(row.jobs);
    results.push({
      id: String(row.id),
      updatedAt: String(row.updated_at),
      job: { title: String(job?.title ?? ""), slug: String(job?.slug ?? "") },
      candidate: { name: candidate?.full_name ?? null, email: candidate?.email ?? null },
      messages: [{ sender: { name: sender?.full_name ?? null }, body: last.body }],
    });
  }
  return results;
}

export async function getUnreadNotifications(userId: string) {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);
  return (data ?? []).map((item) => ({
    id: String(item.id),
    title: String(item.title),
    body: String(item.body),
    href: (item.href as string | null) ?? null,
    read: Boolean(item.read),
    createdAt: String(item.created_at),
  }));
}

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
