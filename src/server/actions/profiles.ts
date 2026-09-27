"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { parseExperiences } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
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

  const supabase = await createServerSupabaseClient();
  await supabase.from("profiles").update({ full_name: parsed.data.name }).eq("id", user.id);
  const { error } = await supabase.from("employee_profiles").upsert({
    user_id: user.id,
    job_title: emptyToNull(parsed.data.title),
    bio: emptyToNull(parsed.data.bio),
    phone: emptyToNull(parsed.data.phone),
    linkedin_url: emptyToNull(parsed.data.linkedIn),
  });
  if (error) return fail(error.message);

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

  const supabase = await createServerSupabaseClient();
  await supabase.from("profiles").update({ full_name: parsed.data.name }).eq("id", user.id);
  const { error } = await supabase.from("candidate_profiles").upsert({
    user_id: user.id,
    title: emptyToNull(parsed.data.headline),
    bio: emptyToNull(parsed.data.bio),
    location: emptyToNull(parsed.data.location),
    phone: emptyToNull(parsed.data.phone),
    linkedin_url: emptyToNull(parsed.data.linkedIn),
    website: emptyToNull(parsed.data.website),
    portfolio_url: emptyToNull(parsed.data.portfolioUrl),
    skills,
  });
  if (error) return fail(error.message);

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

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("candidate_profiles").select("experience").eq("user_id", user.id).maybeSingle();
  const experiences = parseExperiences(data?.experience);
  experiences.unshift({
    id: crypto.randomUUID(),
    title: parsed.data.title,
    company: parsed.data.company,
    startDate: parsed.data.startDate,
    endDate: parsed.data.current || !parsed.data.endDate ? null : parsed.data.endDate,
    current: Boolean(parsed.data.current),
    description: emptyToNull(parsed.data.description),
  });

  const { error } = await supabase.from("candidate_profiles").upsert({
    user_id: user.id,
    experience: experiences,
  });
  if (error) return fail(error.message);

  revalidatePath("/dashboard/candidate/profile");
  return ok("Experience added.");
}

export async function deleteCandidateExperience(experienceId: string): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("candidate_profiles").select("experience").eq("user_id", user.id).maybeSingle();
  const experiences = parseExperiences(data?.experience).filter((item) => item.id !== experienceId);
  const { error } = await supabase.from("candidate_profiles").update({ experience: experiences }).eq("user_id", user.id);
  if (error) return fail(error.message);
  revalidatePath("/dashboard/candidate/profile");
  return ok("Experience removed.");
}
