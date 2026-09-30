import type { Metadata } from "next";
import { OpenRolesBoard, type OpenRole } from "@/components/careers/open-roles-board";
import { getPublishedJobs } from "@/server/queries/jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at TwinLink. Join the team building the next generation of AI infrastructure.",
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();
  const roles: OpenRole[] = jobs.map((job) => ({
    id: job.id,
    slug: job.slug,
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    workplaceType: job.workplaceType,
    publishedAt: job.publishedAt,
  }));

  return <OpenRolesBoard roles={roles} />;
}
