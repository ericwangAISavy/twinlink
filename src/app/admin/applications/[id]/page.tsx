import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminAssignForm } from "@/components/admin/admin-assign-form";
import { AdminInterviewForm } from "@/components/admin/admin-interview-form";
import { AdminNoteForm } from "@/components/admin/admin-note-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminStatusForm } from "@/components/admin/admin-status-form";
import { MessageForm } from "@/components/dashboard/message-form";
import { formatDate, formatDateTime } from "@/lib/utils";
import { getAdminEmployees, getApplicationInternals } from "@/server/queries/admin";
import { getApplicationForEmployee } from "@/server/queries/applications";

export default async function AdminApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getApplicationForEmployee(id);
  if (!application) notFound();
  const [internals, employees] = await Promise.all([getApplicationInternals(id), getAdminEmployees()]);
  const profile = application.candidate.candidateProfile;

  return (
    <>
      <AdminPageHeader
        title={application.candidate.name ?? application.candidate.email ?? "Application"}
        description={`${application.job.title} · applied ${formatDate(application.createdAt)}`}
        actions={<AdminStatusBadge kind="application" status={application.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Candidate</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd>{application.candidate.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Headline</dt>
                <dd>{profile?.headline ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd>{profile?.location ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Resume</dt>
                <dd>
                  {profile?.resumeFile ? (
                    <a className="text-accent hover:underline" href={profile.resumeFile.url} target="_blank" rel="noreferrer">
                      {profile.resumeFile.filename}
                    </a>
                  ) : (
                    "No resume on file"
                  )}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm">
              <Link className="text-accent hover:underline" href={`/admin/candidates/${application.candidate.id}`}>
                Open full candidate profile
              </Link>
            </p>
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Cover letter</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{application.coverLetter || "No cover letter provided."}</p>
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Messages</h2>
            <div className="mt-4 space-y-3">
              {application.messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              ) : (
                application.messages.map((message) => (
                  <div key={message.id} className="rounded-xl bg-[#faf7f1] p-3">
                    <p className="text-xs text-muted-foreground">
                      {message.sender.name ?? "User"} · {formatDateTime(message.createdAt)}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm">{message.body}</p>
                  </div>
                ))
              )}
              <MessageForm applicationId={application.id} />
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Change status</h2>
            <AdminStatusForm applicationId={application.id} status={application.status} />
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Assignment</h2>
            <AdminAssignForm
              applicationId={application.id}
              assignedToId={application.assignedToId}
              employees={employees.map((item) => ({ id: item.id, name: item.name, email: item.email }))}
            />
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Internal notes</h2>
            <p className="mt-1 text-xs text-muted-foreground">Visible only to Twinlink staff.</p>
            <div className="mt-4 space-y-3">
              {internals.notes.map((note) => (
                <div key={note.id} className="rounded-xl bg-[#faf7f1] p-3 text-sm">
                  <p className="text-xs text-muted-foreground">
                    {note.author} · {formatDateTime(note.createdAt)}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap">{note.body}</p>
                </div>
              ))}
              <AdminNoteForm applicationId={application.id} candidateId={application.candidate.id} />
            </div>
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Status history</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {internals.events.length === 0 ? <li className="text-muted-foreground">No status changes yet.</li> : null}
              {internals.events.map((event) => (
                <li key={event.id}>
                  {event.fromStatus ?? "—"} → {event.toStatus ?? "—"}
                  <span className="block text-xs text-muted-foreground">
                    {event.actor} · {formatDateTime(event.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Interviews</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {internals.interviews.length === 0 ? <li className="text-muted-foreground">No interviews scheduled.</li> : null}
              {internals.interviews.map((interview) => (
                <li key={interview.id}>
                  {formatDateTime(interview.scheduledAt)} · {interview.interviewType} · {interview.status}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <AdminInterviewForm applicationId={application.id} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
