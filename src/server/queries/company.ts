import "server-only";

import { defaultCompany, normalizeCompany } from "@/lib/company";
import type { CompanyContent } from "@/lib/constants";
import { prisma } from "@/lib/db";

export async function getCompanyProfile(): Promise<CompanyContent> {
  try {
    const row = await prisma.companyProfile.findUnique({
      where: { id: "singleton" },
    });
    if (!row) return defaultCompany();
    return normalizeCompany(row);
  } catch {
    return defaultCompany();
  }
}
