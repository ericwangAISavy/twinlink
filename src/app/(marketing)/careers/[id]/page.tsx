import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/careers/apply-form";
import { SaveJobButton } from "@/components/careers/save-job-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
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
  const job = await getJobBySlugOrId(id);
  if (!job || job.status !== "PUBLISHED") notFound();

  const session = await auth();
  const application =
    session?.user?.role === "CANDIDATE"
      ? await getCandidateApplication(job.id, session.user.id)
      : null;
  const saved =
    session?.user?.role === "CANDIDATE"
      ? (await getSavedJobIds(session.user.id)).has(job.id)
      : false;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1.4fr_0.8fr]">
      <article>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Careers</p>
        <h1 className="mt-3 font-serif text-4xl">{job.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.employmentType ? <Badge variant="teal">{job.employmentType}</Badge> : null}
          {job.location ? <Badge variant="outline">{job.location}</Badge> : null}
          <Badge variant="secondary">Posted {formatDate(job.publishedAt)}</Badge>
        </div>
        <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-muted-foreground">
          {job.description}
        </div>
        {job.requirements ? (
          <div className="mt-10">
            <h2 className="font-serif text-2xl">What you bring</h2>
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground">{job.requirements}</p>
          </div>
        ) : null}
      </article>

      <aside>
        <Card>
          <CardHeader>
            <CardTitle>Apply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!session?.user ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Create a candidate account to apply. Employee accounts are invite-only.
                </p>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href={`/register?callbackUrl=/careers/${job.slug}`}>Register</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/login?callbackUrl=/careers/${job.slug}`}>Sign in</Link>
                  </Button>
                </div>
              </>
            ) : session.user.role === "EMPLOYEE" ? (
              <p className="text-sm text-muted-foreground">Employees review applications from the dashboard.</p>
            ) : application ? (
              <p className="text-sm">
                You applied on {formatDate(application.createdAt)}. Status:{" "}
                <strong>{APPLICATION_STATUS_LABELS[application.status]}</strong>
              </p>
            ) : (
              <ApplyForm jobId={job.id} />
            )}
            {session?.user?.role === "CANDIDATE" ? <SaveJobButton jobId={job.id} saved={saved} /> : null}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
