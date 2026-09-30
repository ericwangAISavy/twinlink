"use server";

import { revalidatePath } from "next/cache";
import { fail, ok, type ActionResult } from "@/lib/action-result";
import { parseExperiences } from "@/lib/supabase/mappers";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CandidateProfileForm } from "@/lib/types";
import { candidateProfileSchema, employeeProfileSchema, experienceSchema } from "@/lib/validations";
import { requireRole } from "@/server/authorization";
import { z } from "zod";

function emptyToNull(value: string | undefined) {
  return value && value.length > 0 ? value : null;
}

function profileColumnError(message: string) {
  if (/education|profile_draft|profile_visibility/i.test(message)) {
    return "Saving needs the latest profile columns. Apply supabase/migrations/0007_candidate_profile.sql in the Supabase SQL editor, then try again.";
  }
  return message;
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

const optionalUrl = z.string().max(300);

const profileSaveSchema = z
  .object({
    mode: z.enum(["draft", "publish"]),
    name: z.string().max(80),
    headline: z.string().max(160),
    location: z.string().max(120),
    phone: z.string().max(40),
    bio: z.string().max(500),
    skills: z.array(z.string().trim().min(1).max(40)).max(40),
    linkedIn: optionalUrl,
    github: optionalUrl,
    portfolioUrl: optionalUrl,
    visibility: z.enum(["recruiters", "private"]),
    experiences: z
      .array(
        z.object({
          id: z.string().min(1),
          title: z.string().min(2).max(120),
          company: z.string().min(2).max(120),
          location: z.string().max(120).nullable().optional(),
          startDate: z.string().min(4),
          endDate: z.string().nullable().optional(),
          current: z.boolean(),
          description: z.string().max(2000).nullable().optional(),
        }),
      )
      .max(30),
    education: z
      .array(
        z.object({
          id: z.string().min(1),
          degree: z.string().min(2).max(160),
          school: z.string().min(2).max(160),
          startDate: z.string().min(4),
          endDate: z.string().nullable().optional(),
          location: z.string().max(120).nullable().optional(),
        }),
      )
      .max(20),
  })
  .superRefine((value, ctx) => {
    const urls = [
      ["linkedIn", value.linkedIn],
      ["github", value.github],
      ["portfolioUrl", value.portfolioUrl],
    ] as const;
    for (const [field, url] of urls) {
      if (url.trim() && !z.string().url().safeParse(url.trim()).success) {
        ctx.addIssue({ code: "custom", path: [field], message: "Enter a valid URL, including https://" });
      }
    }
    if (value.mode !== "publish") return;
    if (value.name.trim().length < 2) ctx.addIssue({ code: "custom", path: ["name"], message: "Full name is required." });
    if (value.headline.trim().length < 2) {
      ctx.addIssue({ code: "custom", path: ["headline"], message: "Professional headline is required." });
    }
    if (value.location.trim().length < 2) ctx.addIssue({ code: "custom", path: ["location"], message: "Location is required." });
  });

export async function saveCandidateProfile(formData: FormData): Promise<ActionResult> {
  const user = await requireRole("CANDIDATE");
  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("payload") ?? ""));
  } catch {
    return fail("Profile could not be read.");
  }
  const parsed = profileSaveSchema.safeParse(raw);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the highlighted fields.");

  const data = parsed.data;
  const form: CandidateProfileForm = {
    name: data.name.trim(),
    headline: data.headline.trim(),
    location: data.location.trim(),
    phone: data.phone.trim(),
    bio: data.bio.trim(),
    skills: data.skills,
    experiences: data.experiences.map((item) => ({
      ...item,
      location: item.location?.trim() || null,
      endDate: item.current ? null : item.endDate?.trim() || null,
      description: item.description?.trim() || null,
    })),
    education: data.education.map((item) => ({
      ...item,
      location: item.location?.trim() || null,
      endDate: item.endDate?.trim() || null,
    })),
    linkedIn: data.linkedIn.trim(),
    github: data.github.trim(),
    portfolioUrl: data.portfolioUrl.trim(),
    visibility: data.visibility,
  };

  const supabase = await createServerSupabaseClient();
  if (data.mode === "draft") {
    const { error } = await supabase.from("candidate_profiles").upsert({
      user_id: user.id,
      profile_draft: form,
    });
    if (error) return fail(profileColumnError(error.message));
    revalidatePath("/dashboard/candidate/profile");
    return ok("Draft saved. Recruiters still see your last saved profile.");
  }

  const { error: nameError } = await supabase.from("profiles").update({ full_name: form.name }).eq("id", user.id);
  if (nameError) return fail(nameError.message);
  const { error } = await supabase.from("candidate_profiles").upsert({
    user_id: user.id,
    title: emptyToNull(form.headline),
    bio: emptyToNull(form.bio),
    location: emptyToNull(form.location),
    phone: emptyToNull(form.phone),
    linkedin_url: emptyToNull(form.linkedIn),
    github_url: emptyToNull(form.github),
    portfolio_url: emptyToNull(form.portfolioUrl),
    skills: form.skills,
    experience: form.experiences,
    education: form.education,
    profile_visibility: form.visibility,
    profile_draft: null,
  });
  if (error) return fail(profileColumnError(error.message));

  revalidatePath("/dashboard/candidate");
  revalidatePath("/dashboard/candidate/profile");
  revalidatePath(`/admin/candidates/${user.id}`);
  return ok("Profile saved.");
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
    location: null,
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
