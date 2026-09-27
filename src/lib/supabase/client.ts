"use client";

import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseUrl } from "@/lib/supabase/env";

export function createBrowserSupabaseClient() {
  const { url, anon } = requireSupabaseUrl();
  return createBrowserClient(url, anon);
}
