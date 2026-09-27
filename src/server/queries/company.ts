import "server-only";

import { defaultCompany, normalizeCompany } from "@/lib/company";
import type { CompanyContent } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCompanyProfile(): Promise<CompanyContent> {
  if (!isSupabaseConfigured()) return defaultCompany();
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.from("company_profiles").select("*").eq("id", "singleton").maybeSingle();
    if (!data) return defaultCompany();
    return normalizeCompany({
      id: String(data.id),
      name: String(data.name),
      tagline: (data.tagline as string | null) ?? null,
      intro: (data.intro as string | null) ?? null,
      mission: (data.mission as string | null) ?? null,
      vision: (data.vision as string | null) ?? null,
      values: data.values,
      capabilities: data.capabilities,
      partnership: (data.partnership as string | null) ?? null,
      benefits: data.benefits,
      about: (data.about as string | null) ?? null,
      website: (data.website as string | null) ?? null,
      email: (data.email as string | null) ?? null,
      phone: (data.phone as string | null) ?? null,
      address: (data.address as string | null) ?? null,
    });
  } catch {
    return defaultCompany();
  }
}
