import { JobCard } from "@/components/careers/job-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { requireRole } from "@/server/authorization";
import { getSavedJobs } from "@/server/queries/applications";

export default async function SavedJobsPage() {
  const user = await requireRole("CANDIDATE");
  const saved = await getSavedJobs(user.id);

  return (
    <>
      <PageHeader title="Saved jobs" description="Roles you want to revisit." />
      {saved.length === 0 ? (
        <p className="text-muted-foreground">You have not saved any roles yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {saved.map((item) => (
            <JobCard
              key={item.id}
              slug={item.job.slug}
              title={item.job.title}
              location={item.job.location}
              employmentType={item.job.employmentType}
              description={item.job.description}
              publishedAt={null}
            />
          ))}
        </div>
      )}
    </>
  );
}
