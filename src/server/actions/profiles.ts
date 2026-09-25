"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/db";
import { candidateProfileSchema, employeeProfileSchema, experienceSchema } from "@/lib/validations";
import { requireRole } from "@/server/authorization";

function emptyToNull(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

export async function updateEmployeeProfile(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("EMPLOYEE");
  const parsed = employeeProfileSchema.safeParse({
    name: formData.get("name"),
    title: formData.get("title") ?? "",
    bio: formData.get("bio") ?? "",
    phone: formData.get("phone") ?? "",
    linkedIn: formData.get("linkedIn") ?? "",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid profile");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });

  await prisma.employeeProfile.upsert({
    where: { userId: user.id },
    update: {
      title: emptyToNull(parsed.data.title),
      bio: emptyToNull(parsed.data.bio),
      phone: emptyToNull(parsed.data.phone),
      linkedIn: emptyToNull(parsed.data.linkedIn),
    },
    create: {
      userId: user.id,
      title: emptyToNull(parsed.data.title),
      bio: emptyToNull(parsed.data.bio),
      phone: emptyToNull(parsed.data.phone),
      linkedIn: emptyToNull(parsed.data.linkedIn),
    },
  });

  revalidatePath("/dashboard/employee/profile");
  return ok("Profile updated.");
}

export async function updateCandidateProfile(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const parsed = candidateProfileSchema.safeParse({
    name: formData.get("name"),
    headline: formData.get("headline") ?? "",
    bio: formData.get("bio") ?? "",
    location: formData.get("location") ?? "",
    phone: formData.get("phone") ?? "",
    linkedIn: formData.get("linkedIn") ?? "",
    website: formData.get("website") ?? "",
    portfolioUrl: formData.get("portfolioUrl") ?? "",
    skills: formData.get("skills") ?? "",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid profile");
  }

  const skills = parsed.data.skills
    ? parsed.data.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });

  await prisma.candidateProfile.upsert({
    where: { userId: user.id },
    update: {
      headline: emptyToNull(parsed.data.headline),
      bio: emptyToNull(parsed.data.bio),
      location: emptyToNull(parsed.data.location),
      phone: emptyToNull(parsed.data.phone),
      linkedIn: emptyToNull(parsed.data.linkedIn),
      website: emptyToNull(parsed.data.website),
      portfolioUrl: emptyToNull(parsed.data.portfolioUrl),
      skills,
    },
    create: {
      userId: user.id,
      headline: emptyToNull(parsed.data.headline),
      bio: emptyToNull(parsed.data.bio),
      location: emptyToNull(parsed.data.location),
      phone: emptyToNull(parsed.data.phone),
      linkedIn: emptyToNull(parsed.data.linkedIn),
      website: emptyToNull(parsed.data.website),
      portfolioUrl: emptyToNull(parsed.data.portfolioUrl),
      skills,
    },
  });

  revalidatePath("/dashboard/candidate/profile");
  return ok("Profile updated.");
}

export async function addCandidateExperience(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const parsed = experienceSchema.safeParse({
    title: formData.get("title"),
    company: formData.get("company"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") ?? "",
    current: formData.get("current") === "on",
    description: formData.get("description") ?? "",
  });
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid experience");
  }

  const profile = await prisma.candidateProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  await prisma.candidateExperience.create({
    data: {
      profileId: profile.id,
      title: parsed.data.title,
      company: parsed.data.company,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.current || !parsed.data.endDate ? null : new Date(parsed.data.endDate),
      current: Boolean(parsed.data.current),
      description: emptyToNull(parsed.data.description),
    },
  });

  revalidatePath("/dashboard/candidate/profile");
  return ok("Experience added.");
}

export async function deleteCandidateExperience(experienceId: string): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const experience = await prisma.candidateExperience.findUnique({
    where: { id: experienceId },
    include: { profile: true },
  });
  if (!experience || experience.profile.userId !== user.id) {
    return fail("Experience not found.");
  }
  await prisma.candidateExperience.delete({ where: { id: experienceId } });
  revalidatePath("/dashboard/candidate/profile");
  return ok("Experience removed.");
}
