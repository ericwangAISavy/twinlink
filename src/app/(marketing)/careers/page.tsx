import Link from "next/link";
import { PhotoBanner, SubPage, SubHeading } from "@/components/marketing/subpage-shell";
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

  return <SubPage className="sub-careers">
    <PhotoBanner title="Careers at TwinLink" caption="Apply here" image="/images/reference/subpages/banner-images/careers.jpg" />
    <div className="sub-careers-intro"><SubHeading>Open roles</SubHeading><p>Join TwinLink and help build the next generation of AI infrastructure. Browse open roles and apply for the opportunity that fits. Applications are made for a specific role; a candidate account is optional.</p><Link href="/about#values">View our values</Link><Link href="/about#culture">Life at TwinLink</Link></div>
    <div className="sub-functional sub-roles"><OpenRolesBoard roles={roles} /></div>
  </SubPage>;
}
