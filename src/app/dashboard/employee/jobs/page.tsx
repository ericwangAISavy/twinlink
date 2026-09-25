import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { requireRole } from "@/server/authorization";
import { getEmployeeJobs } from "@/server/queries/jobs";

export default async function EmployeeJobsPage() {
  await requireRole("EMPLOYEE");
  const jobs = await getEmployeeJobs();

  return (
    <>
      <PageHeader
        title="Job postings"
        description="Create, publish, and close TwinLink roles."
        actions={
          <Button asChild>
            <Link href="/dashboard/employee/jobs/new">New role</Link>
          </Button>
        }
      />
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <div>
                <Link href={`/dashboard/employee/jobs/${job.id}`} className="font-serif text-xl hover:underline">
                  {job.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.location ?? "Location flexible"} · {job._count.applications} applicants · Updated {formatDate(job.updatedAt)}
                </p>
              </div>
              <Badge variant={job.status === "PUBLISHED" ? "teal" : "outline"}>{job.status}</Badge>
            </CardContent>
          </Card>
        ))}
        {jobs.length === 0 ? <p className="text-muted-foreground">No jobs yet. Create the first role.</p> : null}
      </div>
    </>
  );
}
