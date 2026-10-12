import { GuestApplyForm } from "@/components/careers/guest-apply-form";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/careers/apply-form";
import { SaveJobButton } from "@/components/careers/save-job-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentProfile } from "@/server/authorization";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { getCandidateApplication } from "@/server/queries/applications";
import { getJobBySlugOrId } from "@/server/queries/jobs";
import { getSavedJobIds } from "@/server/queries/applications";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobBySlugOrId(id);
  if (!job) return { title: "Role not found" };
  return {
    title: job.title,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const [job, auth] = await Promise.all([
    getJobBySlugOrId(id),
    getCurrentProfile(),
  ]);
  if (!job || job.status !== "PUBLISHED") notFound();
  const user = auth?.user ?? null;
  const approvedCandidate =
    user?.role === "CANDIDATE" && auth?.profile.accessStatus === "approved";

  const [application, savedIds] =
    approvedCandidate && user
      ? await Promise.all([
          getCandidateApplication(job.id, user.id),
          getSavedJobIds(user.id),
        ])
      : [null, new Set<string>()];
  const saved = savedIds.has(job.id);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1.4fr_0.8fr]">
      <article>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Careers
        </p>
        <h1 className="mt-3 font-serif text-4xl">{job.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.employmentType ? (
            <Badge variant="teal">{job.employmentType}</Badge>
          ) : null}
          {job.location ? (
            <Badge variant="outline">{job.location}</Badge>
          ) : null}
          <Badge
            variant="secondary"
            title={job.publishedAt ? formatDate(job.publishedAt) : undefined}
          >
            Posted {formatRelativeTime(job.publishedAt)}
          </Badge>
        </div>
        <div className="mt-8 space-y-10">
          {[
            { title: "Overview", body: job.description },
            { title: "Responsibilities", body: job.responsibilities },
            { title: "Requirements", body: job.requirements },
            {
              title: "Preferred qualifications",
              body: job.preferredQualifications,
            },
          ]
            .filter((section) => section.body?.trim())
            .map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-2xl">{section.title}</h2>
                <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
        </div>
      </article>

      <aside>
        <Card>
          <CardHeader>
            <CardTitle>Apply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!approvedCandidate ? (
              <GuestApplyForm jobId={job.id} />
            ) : application ? (
              <p className="text-sm">
                You applied on {formatDate(application.createdAt)}. Status:{" "}
                <strong>{APPLICATION_STATUS_LABELS[application.status]}</strong>
              </p>
            ) : (
              <ApplyForm jobId={job.id} email={user?.email} />
            )}
            {approvedCandidate ? (
              <SaveJobButton jobId={job.id} saved={saved} />
            ) : null}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
