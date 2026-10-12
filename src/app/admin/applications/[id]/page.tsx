import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminAssignForm } from "@/components/admin/admin-assign-form";
import { AdminNoteForm } from "@/components/admin/admin-note-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminRejectForm } from "@/components/admin/admin-reject-form";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminStatusForm } from "@/components/admin/admin-status-form";
import {
  APPLICATION_STATUS_LABELS,
  isTerminalApplicationStatus,
} from "@/lib/constants";
import { formatDate, formatDateTime } from "@/lib/utils";
import {
  getAdminEmployees,
  getApplicationInternals,
} from "@/server/queries/admin";
import { getApplicationForEmployee } from "@/server/queries/applications";

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplicationForEmployee(id);
  if (!application) notFound();
  const [internals, employees] = await Promise.all([
    getApplicationInternals(id),
    getAdminEmployees(),
  ]);
  const profile = application.candidate.candidateProfile;
  const candidateName =
    application.candidate.name ?? application.candidate.email ?? "there";
  const closed = isTerminalApplicationStatus(application.status);

  return (
    <>
      <AdminPageHeader
        title={
          application.candidate.name ??
          application.candidate.email ??
          "Application"
        }
        description={`${application.job.title} · applied ${formatDate(application.createdAt)}`}
        actions={
          <AdminStatusBadge kind="application" status={application.status} />
        }
      />

      <section className="mb-6 space-y-3 rounded-2xl border border-[#eadfcd] bg-white p-6">
        <h2 className="font-serif text-xl">Application contact details</h2>
        <p>Email: {application.contactEmail || application.candidate.email}</p>
        <p>
          Phone:{" "}
          {application.contactPhone || "Not provided (earlier application)"}
        </p>
        <p className="whitespace-pre-wrap break-words">
          Address:{" "}
          {application.contactAddress || "Not provided (earlier application)"}
        </p>
        {application.socialUrl && (
          <a
            href={application.socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block underline"
          >
            Professional social profile ↗
          </a>
        )}
      </section>
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
                <dt className="text-muted-foreground">Skills</dt>
                <dd>
                  {profile?.skills?.length ? profile.skills.join(", ") : "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Experience</dt>
                <dd>
                  {profile?.experiences?.length
                    ? profile.experiences
                        .map((item) => `${item.title} · ${item.company}`)
                        .join("; ")
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Resume</dt>
                <dd>
                  {profile?.resumeFile ? (
                    <a
                      className="text-accent hover:underline"
                      href={profile.resumeFile.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.resumeFile.filename}
                    </a>
                  ) : (
                    "No resume on file"
                  )}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm">
              <Link
                className="text-accent hover:underline"
                href={`/admin/candidates/${application.candidate.id}`}
              >
                Open full candidate profile
              </Link>
            </p>
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Cover letter</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
              {application.coverLetter || "No cover letter provided."}
            </p>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Status</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Current: {APPLICATION_STATUS_LABELS[application.status]}
            </p>
            <div className="mt-4">
              <AdminStatusForm
                applicationId={application.id}
                status={application.status}
              />
            </div>
          </div>
          {!closed || application.status !== "rejected" ? (
            <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
              <h2 className="font-serif text-xl">Reject</h2>
              <div className="mt-4">
                <AdminRejectForm
                  applicationId={application.id}
                  candidateName={candidateName.split(" ")[0] ?? candidateName}
                  jobTitle={application.job.title}
                />
              </div>
            </div>
          ) : null}
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Assignment</h2>
            <AdminAssignForm
              applicationId={application.id}
              assignedToId={application.assignedToId}
              employees={employees.map((item) => ({
                id: item.id,
                name: item.name,
                email: item.email,
              }))}
            />
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Internal notes</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Visible only to Twinlink staff.
            </p>
            <div className="mt-4 space-y-3">
              {internals.notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl bg-[#faf7f1] p-3 text-sm"
                >
                  <p className="text-xs text-muted-foreground">
                    {note.author} · {formatDateTime(note.createdAt)}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap">{note.body}</p>
                </div>
              ))}
              <AdminNoteForm
                applicationId={application.id}
                candidateId={application.candidate.id}
              />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
