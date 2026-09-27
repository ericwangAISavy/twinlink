import { JobCard } from "@/components/careers/job-card";
import { EmptyState } from "@/components/dashboard/candidate/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { requireCandidate } from "@/server/authorization";
import { getPublishedJobs } from "@/server/queries/jobs";

export default async function CandidateJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireCandidate();
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";
  const jobs = await getPublishedJobs();
  const visible = query
    ? jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          (job.location ?? "").toLowerCase().includes(query) ||
          (job.employmentType ?? "").toLowerCase().includes(query),
      )
    : jobs;

  return (
    <>
      <PageHeader
        title="Browse roles"
        description={query ? `Results for “${q?.trim()}”.` : "Published openings from TwinLink."}
      />
      {visible.length === 0 ? (
        <EmptyState
          title={query ? "No matching roles" : "No published roles right now"}
          description={
            query
              ? "Try a different title, location, or employment type."
              : "When Twinlink publishes a role, it will appear here."
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((job) => (
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
