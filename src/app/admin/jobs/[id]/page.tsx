import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminJobForm } from "@/components/admin/admin-job-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { getAdminJob } from "@/server/queries/admin";

export default async function AdminJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getAdminJob(id);
  if (!job) notFound();

  return (
    <>
      <AdminPageHeader
        title={job.title}
        description="Edit this role. Publishing updates the public careers listing."
        actions={
          <Button asChild variant="outline" className="rounded-full">
            <Link href={`/careers/${job.slug}`}>View public page</Link>
          </Button>
        }
      />
      <AdminJobForm job={job} />
    </>
  );
}
