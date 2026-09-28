import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MessageForm } from "@/components/dashboard/message-form";
import { formatDateTime } from "@/lib/utils";
import { requireAdmin } from "@/server/authorization";
import { getApplicationForEmployee } from "@/server/queries/applications";
import { getMessageThreads } from "@/server/queries/messages";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ thread?: string }>;
}) {
  const user = await requireAdmin();
  const { thread } = await searchParams;
  const threads = await getMessageThreads(user.id, "EMPLOYEE");
  const activeId = thread ?? threads[0]?.id;
  const conversation = activeId ? await getApplicationForEmployee(activeId) : null;

  return (
    <>
      <AdminPageHeader title="Messages" description="Application-centered conversations between candidates and Twinlink staff." />
      {threads.length === 0 ? (
        <AdminEmptyState title="No messages yet." description="Threads appear when a candidate or staff member writes on an application." />
      ) : (
        <div className="grid min-h-[28rem] overflow-hidden rounded-2xl border border-[#eadfcd] bg-white lg:grid-cols-[18rem_1fr]">
          <aside className="border-b border-[#eadfcd] lg:border-r lg:border-b-0">
            <ul>
              {threads.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/admin/messages?thread=${item.id}`}
                    className={`block px-4 py-3 text-sm hover:bg-[#faf7f1] ${item.id === activeId ? "bg-[#faf7f1]" : ""}`}
                  >
                    <p className="font-medium">{item.candidate.name ?? item.candidate.email}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.job.title}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{item.messages[0]?.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <section className="flex flex-col p-6">
            {conversation ? (
              <>
                <div className="mb-4">
                  <p className="font-medium">{conversation.candidate.name ?? conversation.candidate.email}</p>
                  <p className="text-sm text-muted-foreground">{conversation.job.title}</p>
                </div>
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
                  {conversation.messages.map((message) => (
                    <div key={message.id} className="rounded-xl bg-[#faf7f1] p-3">
                      <p className="text-xs text-muted-foreground">
                        {message.sender.name ?? "User"} · {formatDateTime(message.createdAt)}
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm">{message.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <MessageForm applicationId={conversation.id} />
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a conversation.</p>
            )}
          </section>
        </div>
      )}
    </>
  );
}
