import { JobForm } from "@/components/dashboard/job-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/server/authorization";

export default async function NewJobPage() {
  await requireRole("EMPLOYEE");

  return (
    <>
      <PageHeader title="Create a role" description="Drafts stay private until you publish." />
      <Card>
        <CardContent className="pt-6">
          <JobForm />
        </CardContent>
      </Card>
    </>
  );
}
