import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { requireRole } from "@/server/authorization";
import { listApplications } from "@/server/queries/applications";
import { getJobForEmployee } from "@/server/queries/jobs";

export default async function EmployeeJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole("EMPLOYEE");
  const { id } = await params;
  const job = await getJobForEmployee(id);
  if (!job) notFound();
  const applicants = await listApplications({ jobId: job.id });

  return (
    <>
      <PageHeader
        title={job.title}
        description={`${job.location ?? "Flexible"} · ${job.employmentType ?? "Role"}`}
        actions={
          <Button asChild variant="outline">
            <Link href={`/dashboard/employee/jobs/${job.id}/edit`}>Edit</Link>
          </Button>
        }
      />
      <Badge variant={job.status === "PUBLISHED" ? "teal" : "outline"}>{job.status}</Badge>
      <p className="mt-6 whitespace-pre-wrap text-sm text-muted-foreground">{job.description}</p>
      <h2 className="mt-10 font-serif text-2xl">Applicants</h2>
      <div className="mt-4 space-y-3">
        {applicants.map((application) => (
          <Card key={application.id}>
            <CardContent className="flex items-center justify-between gap-4 pt-6">
              <div>
                <Link
                  href={`/dashboard/employee/applicants/${application.id}`}
                  className="font-medium hover:underline"
                >
                  {application.candidate.name ?? application.candidate.email}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {APPLICATION_STATUS_LABELS[application.status]}
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/dashboard/employee/candidates/${application.candidate.id}`}>Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
        {applicants.length === 0 ? <p className="text-muted-foreground">No applicants yet.</p> : null}
      </div>
    </>
  );
}
