import type { Metadata } from "next";
import { JobCard } from "@/components/careers/job-card";
import { Section } from "@/components/marketing/section";
import { getPublishedJobs } from "@/server/queries/jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at TwinLink for engineers, architects, and engagement leads.",
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();

  return (
    <Section eyebrow="Careers" title="Open roles" className="border-t border-[#c4a574]/20">
      {jobs.length === 0 ? (
        <p className="text-muted-foreground">
          There are no published roles right now. Create a candidate account so we can reach you when we open a search.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </Section>
  );
}
