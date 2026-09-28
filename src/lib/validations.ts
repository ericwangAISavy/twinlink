import { z } from "zod";
import { APPLICATION_STATUSES, EMPLOYMENT_TYPES, JOB_STATUSES } from "@/lib/constants";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
  portal: z.enum(["candidate", "employee"]).optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required").max(80),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
    invite: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const employeeProfileSchema = z.object({
  name: z.string().min(2).max(80),
  title: z.string().max(120).optional().or(z.literal("")),
  bio: z.string().max(4000).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  linkedIn: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export const candidateProfileSchema = z.object({
  name: z.string().min(2).max(80),
  headline: z.string().max(160).optional().or(z.literal("")),
  bio: z.string().max(4000).optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  linkedIn: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  skills: z.string().max(500).optional().or(z.literal("")),
});

export const experienceSchema = z.object({
  title: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  startDate: z.string().min(4, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  current: z.coerce.boolean().optional(),
  description: z.string().max(2000).optional().or(z.literal("")),
});

export const adminJobSchema = z.object({
  title: z.string().min(3).max(140),
  slug: z.string().max(160).optional().or(z.literal("")),
  department: z.string().max(120).optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  workplaceType: z.string().max(80).optional().or(z.literal("")),
  employmentType: z.enum(EMPLOYMENT_TYPES).optional().or(z.literal("")),
  description: z.string().min(20, "Add a fuller description"),
  responsibilities: z.string().max(8000).optional().or(z.literal("")),
  requirements: z.string().max(8000).optional().or(z.literal("")),
  preferredQualifications: z.string().max(8000).optional().or(z.literal("")),
  salaryMin: z.string().optional().or(z.literal("")),
  salaryMax: z.string().optional().or(z.literal("")),
  currency: z.string().max(8).optional().or(z.literal("")),
  applicationDeadline: z.string().optional().or(z.literal("")),
  status: z.enum(JOB_STATUSES),
});

export const jobSchema = z.object({
  title: z.string().min(3).max(140),
  location: z.string().max(120).optional().or(z.literal("")),
  employmentType: z.enum(EMPLOYMENT_TYPES).optional().or(z.literal("")),
  description: z.string().min(20, "Add a fuller description"),
  requirements: z.string().max(8000).optional().or(z.literal("")),
  status: z.enum(JOB_STATUSES),
});

export const companyProfileSchema = z.object({
  name: z.string().min(2).max(80),
  tagline: z.string().max(200).optional().or(z.literal("")),
  intro: z.string().max(4000).optional().or(z.literal("")),
  mission: z.string().max(2000).optional().or(z.literal("")),
  vision: z.string().max(2000).optional().or(z.literal("")),
  partnership: z.string().max(4000).optional().or(z.literal("")),
  about: z.string().max(8000).optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  valuesJson: z.string().max(8000).optional().or(z.literal("")),
  capabilitiesJson: z.string().max(8000).optional().or(z.literal("")),
  benefitsJson: z.string().max(8000).optional().or(z.literal("")),
});

export const applySchema = z.object({
  jobId: z.string().min(1),
  coverLetter: z.string().max(5000).optional().or(z.literal("")),
});

export const applicationStatusSchema = z.object({
  applicationId: z.string().min(1),
  status: z.enum(APPLICATION_STATUSES),
});

export const messageSchema = z.object({
  applicationId: z.string().min(1),
  body: z.string().min(1, "Message cannot be empty").max(4000),
});

export const inviteSchema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().max(80).optional().or(z.literal("")),
  jobTitle: z.string().max(120).optional().or(z.literal("")),
  department: z.string().max(120).optional().or(z.literal("")),
  role: z.enum(["employee", "admin"]).optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type JobInput = z.infer<typeof jobSchema>;
