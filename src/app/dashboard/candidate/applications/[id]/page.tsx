import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageForm } from "@/components/dashboard/message-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { withdrawApplication } from "@/server/actions/applications";
import { requireRole } from "@/server/authorization";
import { getApplicationForUser } from "@/server/queries/applications";

async function withdraw(formData: FormData) {
  "use server";
  await withdrawApplication(String(formData.get("applicationId") ?? ""));
}

export default async function CandidateApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireRole("CANDIDATE");
  const { id } = await params;
  const application = await getApplicationForUser(id, user.id, "CANDIDATE");
  if (!application) notFound();

  return (
    <>
      <PageHeader
        title={application.job.title}
        description={`Applied ${formatDate(application.createdAt)}`}
        actions={
          <Link href={`/careers/${application.job.slug}`} className="text-sm text-accent hover:underline">
            View posting
          </Link>
        }
      />
      <Badge variant="outline">{APPLICATION_STATUS_LABELS[application.status]}</Badge>
      {application.status !== "WITHDRAWN" && application.status !== "REJECTED" ? (
        <form action={withdraw} className="mt-4">
          <input type="hidden" name="applicationId" value={application.id} />
          <Button type="submit" variant="outline" size="sm">
            Withdraw application
          </Button>
        </form>
      ) : null}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Cover letter</CardTitle>
        </CardHeader>
        <CardContent className="whitespace-pre-wrap text-sm text-muted-foreground">
          {application.coverLetter || "You did not include a cover letter."}
        </CardContent>
      </Card>
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
              <p className="mt-1 whitespace-pre-wrap text-sm">{message.body}</p>
            </div>
          ))}
          <MessageForm applicationId={application.id} />
        </CardContent>
      </Card>
    </>
  );
}
