import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageForm } from "@/components/dashboard/message-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusForm } from "@/components/dashboard/status-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          <CardContent>
            <StatusForm applicationId={application.id} status={application.status} />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {application.messages.map((message) => (
            <div key={message.id} className="rounded-md bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                {message.sender.name ?? "User"} · {formatDate(message.createdAt)}
              </p>
              <p className="mt-1 text-sm whitespace-pre-wrap">{message.body}</p>
            </div>
          ))}
          <MessageForm applicationId={application.id} />
        </CardContent>
      </Card>
    </>
  );
}
