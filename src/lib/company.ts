import type { CompanyContent } from "@/lib/constants";
import { DEFAULT_COMPANY } from "@/lib/constants";

function asCards(value: unknown): { title: string; body: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as { title?: unknown; body?: unknown };
      if (typeof record.title !== "string" || typeof record.body !== "string") {
        return null;
      }
      return { title: record.title, body: record.body };
    })
    .filter((item): item is { title: string; body: string } => item !== null);
}

export function normalizeCompany(input: {
  id: string;
  name: string;
  tagline: string | null;
  intro: string | null;
  mission: string | null;
  vision: string | null;
  values: unknown;
  capabilities: unknown;
  partnership: string | null;
  benefits: unknown;
  about: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}): CompanyContent {
  return {
    id: input.id,
    name: input.name,
    tagline: input.tagline,
    intro: input.intro,
    mission: input.mission,
    vision: input.vision,
    values: asCards(input.values).length ? asCards(input.values) : [...DEFAULT_COMPANY.values],
    capabilities: asCards(input.capabilities).length
      ? asCards(input.capabilities)
      : [...DEFAULT_COMPANY.capabilities],
    partnership: input.partnership,
    benefits: asCards(input.benefits).length ? asCards(input.benefits) : [...DEFAULT_COMPANY.benefits],
    about: input.about,
    website: input.website,
    email: input.email,
    phone: input.phone,
    address: input.address,
  };
}

export function defaultCompany(): CompanyContent {
  return {
    ...DEFAULT_COMPANY,
    values: [...DEFAULT_COMPANY.values],
    capabilities: [...DEFAULT_COMPANY.capabilities],
    benefits: [...DEFAULT_COMPANY.benefits],
  };
}
