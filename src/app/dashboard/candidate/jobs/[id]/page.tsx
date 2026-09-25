import { notFound } from "next/navigation";

import { ApplyForm } from "@/components/careers/apply-form";
import { SaveJobButton } from "@/components/careers/save-job-button";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { requireCandidate } from "@/server/authorization";
import { getCandidateApplication, getSavedJobIds } from "@/server/queries/applications";
import { getPublishedJobById } from "@/server/queries/jobs";

export default async function CandidateJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCandidate();
  const { id } = await params;
  const job = await getPublishedJobById(id);
  if (!job) notFound();

  const application = await getCandidateApplication(job.id, user.id);
  const saved = (await getSavedJobIds(user.id)).has(job.id);

  return (
    <>
      <PageHeader title={job.title} description={job.location ?? undefined} />
      <div className="mb-4 flex flex-wrap gap-2">
        {job.employmentType ? <Badge variant="teal">{job.employmentType}</Badge> : null}
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{job.description}</p>
      {job.requirements ? (
        <div className="mt-8">
          <h2 className="font-serif text-2xl">Requirements</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{job.requirements}</p>
        </div>
      ) : null}
      <div className="mt-8 max-w-xl space-y-4">
        {application ? (
          <p className="text-sm">
            Applied {formatDate(application.createdAt)}. Status:{" "}
            <strong>{APPLICATION_STATUS_LABELS[application.status]}</strong>
          </p>
        ) : (
          <ApplyForm jobId={job.id} />
        )}
        <SaveJobButton jobId={job.id} saved={saved} />
      </div>
    </>
  );
}
