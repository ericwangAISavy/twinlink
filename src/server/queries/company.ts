import "server-only";
import { DEFAULT_STATISTICS, parseStatistics } from "@/lib/company-statistics";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { defaultCompany, normalizeCompany } from "@/lib/company";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { CompanyContent } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicSupabaseClient } from "@/lib/supabase/public";

const loadCompanyProfile = unstable_cache(
  async (): Promise<CompanyContent> => {
    if (!isSupabaseConfigured()) return defaultCompany();
    try {
      const supabase = createPublicSupabaseClient();
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
  },
  ["company-profile"],
  { revalidate: 120, tags: [CACHE_TAGS.company] },
);

export const getCompanyProfile = cache(loadCompanyProfile);

export const getCompanyStatistics = cache(async () => {
  if (!isSupabaseConfigured()) return DEFAULT_STATISTICS;
  const client = createPublicSupabaseClient();
  const { data } = await client.from("company_content").select("body").eq("key", "company_statistics").maybeSingle();
  return parseStatistics(data?.body);
});
