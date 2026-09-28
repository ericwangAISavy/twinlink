import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminFilterBar } from "@/components/admin/admin-filter-bar";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmAction } from "@/components/admin/confirm-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { adminSetJobStatus } from "@/server/actions/admin";
import { getAdminJobs } from "@/server/queries/admin";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const jobs = await getAdminJobs();
  const query = q?.trim().toLowerCase() ?? "";
  const visible = jobs.filter((job) => {
    const matchesQuery = !query || job.title.toLowerCase().includes(query) || (job.location ?? "").toLowerCase().includes(query);
    const matchesStatus = !status || job.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <AdminPageHeader
        title="Jobs"
        description="Create and publish Twinlink roles. Published jobs appear on the public careers pages."
        actions={
          <Button asChild variant="teal" className="rounded-full">
            <Link href="/admin/jobs/new">Create job</Link>
          </Button>
        }
      />
      <AdminFilterBar>
        <Input name="q" defaultValue={q} placeholder="Search title or location" className="max-w-xs" />
        <select name="status" defaultValue={status ?? ""} className="h-10 rounded-md border border-input bg-card px-3 text-sm">
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="PAUSED">Paused</option>
          <option value="CLOSED">Closed</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <Button type="submit" variant="outline" size="sm">
          Filter
        </Button>
      </AdminFilterBar>
      {jobs.length === 0 ? (
        <AdminEmptyState
          title="No jobs created yet."
          description="Create your first job to start recruiting."
          action={
            <Button asChild variant="teal" className="rounded-full">
              <Link href="/admin/jobs/new">Create your first job</Link>
            </Button>
          }
        />
      ) : visible.length === 0 ? (
        <AdminEmptyState title="No jobs match these filters." description="Clear search or status filters to see all jobs." />
      ) : (
        <AdminTable headers={["Job title", "Department", "Location", "Applications", "Status", "Updated", "Actions"]}>
          {visible.map((job) => (
            <tr key={job.id} className="align-middle">
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/jobs/${job.id}`} className="hover:underline">
                  {job.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{job.department ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{job.location ?? "—"}</td>
              <td className="px-4 py-3 tabular-nums">{job._count.applications}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge kind="job" status={job.status} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(job.updatedAt)}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {job.status === "PUBLISHED" ? (
                    <Link className="text-sm text-accent hover:underline" href={`/careers/${job.slug}`}>
                      View
                    </Link>
                  ) : (
                    <Link className="text-sm text-accent hover:underline" href={`/admin/jobs/${job.id}`}>
                      View
                    </Link>
                  )}
                  <Link className="text-sm text-accent hover:underline" href={`/admin/jobs/${job.id}`}>
                    Edit
                  </Link>
                  <ConfirmAction label="Publish" message="Publish this job to the careers site?" action={adminSetJobStatus.bind(null, job.id, "PUBLISHED")} />
                  <ConfirmAction label="Pause" message="Pause this job posting?" action={adminSetJobStatus.bind(null, job.id, "PAUSED")} />
                  <ConfirmAction label="Close" message="Close this job to new applications?" action={adminSetJobStatus.bind(null, job.id, "CLOSED")} />
                  <ConfirmAction label="Archive" message="Archive this job?" action={adminSetJobStatus.bind(null, job.id, "ARCHIVED")} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
