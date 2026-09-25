import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { requireRole } from "@/server/authorization";
import { getCandidateApplications } from "@/server/queries/applications";

export default async function CandidateApplicationsPage() {
  const user = await requireRole("CANDIDATE");
  const applications = await getCandidateApplications(user.id);

  return (
    <>
      <PageHeader title="Applications" description="Track every TwinLink role you have applied to." />
      <div className="space-y-3">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-6">
              <div>
                <Link href={`/dashboard/candidate/applications/${application.id}`} className="font-medium hover:underline">
                  {application.job.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {application.job.location ?? "Flexible"} · {formatDate(application.createdAt)}
                </p>
              </div>
              <Badge variant="outline">{APPLICATION_STATUS_LABELS[application.status]}</Badge>
            </CardContent>
          </Card>
        ))}
        {applications.length === 0 ? (
          <p className="text-muted-foreground">
            No applications yet. <Link href="/careers" className="text-accent hover:underline">Browse open roles</Link>.
          </p>
        ) : null}
      </div>
    </>
  );
}
