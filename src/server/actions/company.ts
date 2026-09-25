"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/db";
import { companyProfileSchema } from "@/lib/validations";
import { requireRole } from "@/server/authorization";

function parseJsonCards(raw: string | undefined) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function updateCompanyAction(
  _prev: { error?: string; success?: string },
  formData: FormData,
) {
  const result = await updateCompanyProfile(formData);
  return result.ok ? { success: result.message } : { error: result.error };
}

export async function updateCompanyProfile(formData: FormData): Promise<ActionResult> {
  await requireRole("EMPLOYEE");
  const parsed = companyProfileSchema.safeParse({
    name: formData.get("name"),
    tagline: formData.get("tagline") ?? "",
    intro: formData.get("intro") ?? "",
    mission: formData.get("mission") ?? "",
    vision: formData.get("vision") ?? "",
    partnership: formData.get("partnership") ?? "",
    about: formData.get("about") ?? "",
    website: formData.get("website") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    address: formData.get("address") ?? "",
    valuesJson: formData.get("valuesJson") ?? "",
    capabilitiesJson: formData.get("capabilitiesJson") ?? "",
    benefitsJson: formData.get("benefitsJson") ?? "",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid company profile");
  }

  const values = parseJsonCards(parsed.data.valuesJson);
  const capabilities = parseJsonCards(parsed.data.capabilitiesJson);
  const benefits = parseJsonCards(parsed.data.benefitsJson);
  if (values === null || capabilities === null || benefits === null) {
    return fail("Values, capabilities, and benefits must be valid JSON arrays.");
  }

  await prisma.companyProfile.upsert({
    where: { id: "singleton" },
    update: {
      name: parsed.data.name,
      tagline: parsed.data.tagline || null,
      intro: parsed.data.intro || null,
      mission: parsed.data.mission || null,
      vision: parsed.data.vision || null,
      partnership: parsed.data.partnership || null,
      about: parsed.data.about || null,
      website: parsed.data.website || null,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      address: parsed.data.address || null,
      values,
      capabilities,
      benefits,
    },
    create: {
      id: "singleton",
      name: parsed.data.name,
      tagline: parsed.data.tagline || null,
      intro: parsed.data.intro || null,
      mission: parsed.data.mission || null,
      vision: parsed.data.vision || null,
      partnership: parsed.data.partnership || null,
      about: parsed.data.about || null,
      website: parsed.data.website || null,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      address: parsed.data.address || null,
      values,
      capabilities,
      benefits,
    },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/dashboard/employee/company");
  return ok("Company profile saved.");
}
