import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminCloseJobForm } from "@/components/admin/admin-close-job-form";
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
      <div className="mt-6 max-w-xl rounded-2xl border border-[#eadfcd] bg-white p-6">
        <h2 className="font-serif text-xl">Close this role</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Closing stops new applications. Existing applications stay unless you choose to mark them position closed.
        </p>
        <div className="mt-4">
          <AdminCloseJobForm jobId={job.id} closed={job.status === "CLOSED"} />
        </div>
      </div>
    </>
  );
}
