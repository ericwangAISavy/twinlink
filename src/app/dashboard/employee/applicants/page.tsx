import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { requireRole } from "@/server/authorization";
import { listApplications } from "@/server/queries/applications";

export default async function ApplicantsPage() {
  await requireRole("EMPLOYEE");
  const applications = await listApplications();

  return (
    <>
      <PageHeader title="Applicants" description="Review submissions across every published and draft role." />
      <div className="space-y-3">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <div>
                <Link href={`/dashboard/employee/applicants/${application.id}`} className="font-medium hover:underline">
                  {application.candidate.name ?? application.candidate.email}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {application.job.title} · {formatDate(application.createdAt)}
                </p>
              </div>
              <Badge variant="outline">{APPLICATION_STATUS_LABELS[application.status]}</Badge>
            </CardContent>
          </Card>
        ))}
        {applications.length === 0 ? <p className="text-muted-foreground">No applications yet.</p> : null}
      </div>
    </>
  );
}
