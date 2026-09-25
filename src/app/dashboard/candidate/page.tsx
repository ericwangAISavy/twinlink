import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { requireRole } from "@/server/authorization";
import { getCandidateApplications } from "@/server/queries/applications";
import { getUnreadNotifications } from "@/server/queries/messages";

export default async function CandidateOverviewPage() {
  const user = await requireRole("CANDIDATE");
  const [applications, notifications] = await Promise.all([
    getCandidateApplications(user.id),
    getUnreadNotifications(user.id),
  ]);

  return (
    <>
      <PageHeader
        title="Your workspace"
        description="Track applications, keep your profile current, and message TwinLink."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent className="font-serif text-3xl">{applications.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent className="font-serif text-3xl">
            {applications.filter((item) => !["REJECTED", "WITHDRAWN"].includes(item.status)).length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unread</CardTitle>
          </CardHeader>
          <CardContent className="font-serif text-3xl">{notifications.filter((item) => !item.read).length}</CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {applications.slice(0, 6).map((application) => (
            <Link
              key={application.id}
              href={`/dashboard/candidate/applications/${application.id}`}
              className="block rounded-md border border-border px-3 py-2 hover:bg-muted/40"
            >
              {application.job.title} · {APPLICATION_STATUS_LABELS[application.status]}
            </Link>
          ))}
          {applications.length === 0 ? (
            <p className="text-muted-foreground">
              No applications yet.{" "}
              <Link href="/careers" className="text-accent hover:underline">
                Browse careers
              </Link>
              .
            </p>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
