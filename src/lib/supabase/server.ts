import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabaseUrl } from "@/lib/supabase/env";

export async function createServerSupabaseClient() {
  const { url, anon } = requireSupabaseUrl();
  const cookieStore = await cookies();

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component; middleware refreshes the session.
        }
      },
    },
  });
}
