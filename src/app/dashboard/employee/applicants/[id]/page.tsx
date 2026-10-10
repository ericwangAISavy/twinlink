import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { requireRole } from "@/server/authorization";
import { getApplicationForUser } from "@/server/queries/applications";

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireRole("EMPLOYEE");
  const { id } = await params;
  const application = await getApplicationForUser(id, user.id, "EMPLOYEE");
  if (!application) notFound();

  return (
    <>
      <PageHeader
        title={application.candidate.name ?? application.candidate.email ?? "Applicant"}
        description={`${application.job.title} · applied ${formatDate(application.createdAt)}`}
        actions={
          <Link className="text-sm text-accent hover:underline" href={`/dashboard/employee/candidates/${application.candidate.id}`}>
            Full candidate profile
          </Link>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cover letter</CardTitle>
          </CardHeader>
          <CardContent className="whitespace-pre-wrap text-sm text-muted-foreground">
            {application.coverLetter || "No cover letter provided."}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              Current status: <strong>{APPLICATION_STATUS_LABELS[application.status]}</strong>
            </p>
            <p className="text-muted-foreground">Application status is managed by a Twinlink administrator.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
