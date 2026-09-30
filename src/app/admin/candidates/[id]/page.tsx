import Link from "next/link";
import { notFound } from "next/navigation";
import { ApproveCandidateButton } from "@/components/admin/approve-candidate-button";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminNoteForm } from "@/components/admin/admin-note-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { MessageForm } from "@/components/dashboard/message-form";
import { getCandidateForReview } from "@/server/queries/profiles";
import { getMessageThreads } from "@/server/queries/messages";

export default async function AdminCandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidate = await getCandidateForReview(id);
  if (!candidate) notFound();
  const profile = candidate.candidateProfile;
  const threads = await getMessageThreads(id, "CANDIDATE");
  const latestApplication = candidate.applications[0];

  return (
    <>
      <AdminPageHeader
        title={candidate.name ?? candidate.email}
        description={profile?.headline ?? candidate.email}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Overview</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{profile?.bio || "No bio yet."}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd>{profile?.location ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{profile?.phone ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">LinkedIn</dt>
                <dd>
                  {profile?.linkedIn ? (
                    <a className="text-accent hover:underline" href={profile.linkedIn}>
                      Profile
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Website</dt>
                <dd>
                  {profile?.website ? (
                    <a className="text-accent hover:underline" href={profile.website}>
                      {profile.website}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Experience</h2>
            {profile?.experiences.length ? (
              <ul className="mt-4 space-y-4">
                {profile.experiences.map((item) => (
                  <li key={item.id}>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.company} · {item.startDate}
                      {item.current ? " – Present" : item.endDate ? ` – ${item.endDate}` : ""}
                    </p>
                    {item.description ? <p className="mt-1 text-sm">{item.description}</p> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No experience listed.</p>
            )}
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Skills</h2>
            <p className="mt-3 text-sm">{profile?.skills.length ? profile.skills.join(", ") : "No skills listed."}</p>
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Resume</h2>
            {profile?.resumeFile ? (
              <a className="mt-3 inline-block text-sm text-accent hover:underline" href={profile.resumeFile.url} target="_blank" rel="noreferrer">
                {profile.resumeFile.filename}
              </a>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No resume uploaded.</p>
            )}
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Access</h2>
            {candidate.accessStatus === "pending" ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-muted-foreground">
                  This candidate cannot sign in until you approve their access.
                </p>
                <ApproveCandidateButton userId={candidate.id} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Approved. This candidate can sign in.</p>
            )}
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Applications</h2>
            {candidate.applications.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No applications yet.</p>
            ) : (
              <ul className="mt-3 space-y-3 text-sm">
                {candidate.applications.map((application) => (
                  <li key={application.id} className="flex items-center justify-between gap-2">
                    <Link className="hover:underline" href={`/admin/applications/${application.id}`}>
                      {application.job.title}
                    </Link>
                    <AdminStatusBadge kind="application" status={application.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Messages</h2>
            {threads.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">No messages yet.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {threads.map((thread) => (
                  <li key={thread.id}>
                    <Link className="hover:underline" href={`/admin/messages?thread=${thread.id}`}>
                      {thread.job.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {latestApplication ? <div className="mt-4"><MessageForm applicationId={latestApplication.id} /></div> : null}
          </div>
          <div className="rounded-2xl border border-[#eadfcd] bg-white p-6">
            <h2 className="font-serif text-xl">Internal note</h2>
            {latestApplication ? (
              <AdminNoteForm applicationId={latestApplication.id} candidateId={candidate.id} />
            ) : (
              <AdminEmptyState title="No application thread" description="Internal notes attach to an application." className="border-0 bg-transparent p-0" />
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
