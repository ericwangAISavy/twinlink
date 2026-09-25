import { notFound } from "next/navigation";
import { JobForm } from "@/components/dashboard/job-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/server/authorization";
import { getJobForEmployee } from "@/server/queries/jobs";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole("EMPLOYEE");
  const { id } = await params;
  const job = await getJobForEmployee(id);
  if (!job) notFound();

  return (
    <>
      <PageHeader title={`Edit ${job.title}`} />
      <Card>
        <CardContent className="pt-6">
          <JobForm job={job} />
        </CardContent>
      </Card>
    </>
  );
}
