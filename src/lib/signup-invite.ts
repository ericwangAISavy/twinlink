import type { SupabaseClient } from "@supabase/supabase-js";

export async function completeSignupInvite(
  client: SupabaseClient,
  userId: string,
  token: string,
) {
  const { data: profile, error } = await client
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  if (error) return error;
  // The signup trigger can redeem the invitation before an immediate session
  // is returned. Redeeming it twice would incorrectly report an expired invite.
  if (profile?.role === "employee" || profile?.role === "admin") return null;
  const result = await client.rpc("accept_employee_invite", {
    invite_token: token,
  });
  return result.error;
}
