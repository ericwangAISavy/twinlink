export function getSupabasePublicKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && getSupabasePublicKey());
}

export function requireSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = getSupabasePublicKey();
  if (!url || !anon) {
    throw new Error("Supabase is not configured.");
  }
  return { url, anon };
}
