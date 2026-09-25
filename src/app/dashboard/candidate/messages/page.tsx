import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { requireRole } from "@/server/authorization";
import { getMessageThreads } from "@/server/queries/messages";

export default async function CandidateMessagesPage() {
  const user = await requireRole("CANDIDATE");
  const threads = await getMessageThreads(user.id, "CANDIDATE");

  return (
    <>
      <PageHeader title="Messages" description="Conversations attached to your applications." />
      <div className="space-y-3">
        {threads.map((thread) => (
          <Link key={thread.id} href={`/dashboard/candidate/messages/${thread.id}`}>
            <Card>
              <CardContent className="pt-6">
                <p className="font-medium">{thread.job.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {thread.messages[0]?.body ?? "No messages yet."} · {formatDate(thread.updatedAt)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {threads.length === 0 ? <p className="text-muted-foreground">No messages yet.</p> : null}
      </div>
    </>
  );
}
