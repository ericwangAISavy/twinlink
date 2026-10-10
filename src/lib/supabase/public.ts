import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseUrl } from "@/lib/supabase/env";

let publicClient: SupabaseClient | null = null;

export function createPublicSupabaseClient() {
  if (publicClient) return publicClient;
  const { url, anon } = requireSupabaseUrl();
  publicClient = createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return publicClient;
}
