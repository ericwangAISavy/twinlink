import "server-only";

import { createClient } from "@supabase/supabase-js";
import { requireSupabaseUrl } from "@/lib/supabase/env";

export function createAdminSupabaseClient() {
  const { url } = requireSupabaseUrl();
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRole) {
    throw new Error("Supabase is not configured.");
  }
  return createClient(url, serviceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
