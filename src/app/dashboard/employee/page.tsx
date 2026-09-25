import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/server/authorization";
import { listApplications } from "@/server/queries/applications";
import { getEmployeeJobs } from "@/server/queries/jobs";
import { getUnreadNotifications } from "@/server/queries/messages";

export default async function EmployeeOverviewPage() {
  const user = await requireRole("EMPLOYEE");
  const [jobs, applications, notifications] = await Promise.all([
    getEmployeeJobs(),
    listApplications(),
    getUnreadNotifications(user.id),
  ]);

  return (
    <>
      <PageHeader
        title="Employee overview"
        description="Jobs, applicants, and conversations across TwinLink."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Open jobs</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-serif">{jobs.filter((job) => job.status === "PUBLISHED").length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-serif">{applications.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unread notices</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-serif">{notifications.filter((item) => !item.read).length}</CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent applicants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {applications.slice(0, 6).map((application) => (
              <Link
                key={application.id}
                href={`/dashboard/employee/applicants/${application.id}`}
                className="block rounded-md border border-border px-3 py-2 hover:bg-muted/50"
              >
                <span className="font-medium">{application.candidate.name ?? application.candidate.email}</span>
                <span className="text-muted-foreground"> · {application.job.title}</span>
              </Link>
            ))}
            {applications.length === 0 ? <p className="text-muted-foreground">No applications yet.</p> : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {notifications.slice(0, 6).map((item) => (
              <div key={item.id}>
                <p className="font-medium">{item.title}</p>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
            {notifications.length === 0 ? <p className="text-muted-foreground">You are caught up.</p> : null}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
