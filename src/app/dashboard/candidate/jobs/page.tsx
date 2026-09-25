import { JobCard } from "@/components/careers/job-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { requireCandidate } from "@/server/authorization";
import { getPublishedJobs } from "@/server/queries/jobs";

export default async function CandidateJobsPage() {
  await requireCandidate();
  const jobs = await getPublishedJobs();

  return (
    <>
      <PageHeader title="Browse roles" description="Published openings from TwinLink." />
      {jobs.length === 0 ? (
        <p className="text-muted-foreground">No published roles right now.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              slug={job.slug}
              title={job.title}
              location={job.location}
              employmentType={job.employmentType}
              description={job.description}
              publishedAt={job.publishedAt}
              href={`/dashboard/candidate/jobs/${job.id}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
