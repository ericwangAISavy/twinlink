import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminFilterBar } from "@/components/admin/admin-filter-bar";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APPLICATION_STATUSES, APPLICATION_STATUS_LABELS } from "@/lib/constants";
import type { ApplicationStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { getAdminEmployees, getAdminJobs } from "@/server/queries/admin";
import { listApplications } from "@/server/queries/applications";

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; jobId?: string; from?: string; assignedTo?: string }>;
}) {
  const { q, status, jobId, from, assignedTo } = await searchParams;
  const [jobs, applications, employees] = await Promise.all([getAdminJobs(), listApplications(), getAdminEmployees()]);
  const query = q?.trim().toLowerCase() ?? "";
  const visible = applications.filter((application) => {
    const matchesQuery =
      !query ||
      (application.candidate.name ?? "").toLowerCase().includes(query) ||
      (application.candidate.email ?? "").toLowerCase().includes(query) ||
      application.job.title.toLowerCase().includes(query);
    const matchesStatus = !status || application.status === status;
    const matchesJob = !jobId || application.job.id === jobId;
    const matchesDate = !from || application.createdAt.slice(0, 10) >= from;
    const matchesAssignee = !assignedTo || application.assignedToId === assignedTo;
    return matchesQuery && matchesStatus && matchesJob && matchesDate && matchesAssignee;
  });

  return (
    <>
      <AdminPageHeader title="Applications" description="Review submitted applications and update status manually." />
      <AdminFilterBar>
        <Input name="q" defaultValue={q} placeholder="Candidate, email, or job" className="max-w-xs" />
        <select name="status" defaultValue={status ?? ""} className="h-10 rounded-md border border-input bg-card px-3 text-sm">
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((value) => (
            <option key={value} value={value}>
              {APPLICATION_STATUS_LABELS[value]}
            </option>
          ))}
        </select>
        <select name="jobId" defaultValue={jobId ?? ""} className="h-10 max-w-xs rounded-md border border-input bg-card px-3 text-sm">
          <option value="">All jobs</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
        <select name="assignedTo" defaultValue={assignedTo ?? ""} className="h-10 max-w-xs rounded-md border border-input bg-card px-3 text-sm">
          <option value="">All assignees</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name ?? employee.email}
            </option>
          ))}
        </select>
        <Input name="from" type="date" defaultValue={from} className="max-w-[11rem]" />
        <Button type="submit" variant="outline" size="sm">
          Filter
        </Button>
      </AdminFilterBar>
      {applications.length === 0 ? (
        <AdminEmptyState title="No applications yet." description="Applications will appear when candidates apply to published jobs." />
      ) : visible.length === 0 ? (
        <AdminEmptyState title="No applications match these filters." description="Adjust job, status, date, or assignee filters." />
      ) : (
        <AdminTable headers={["Candidate", "Job", "Status", "Applied", ""]}>
          {visible.map((application) => (
            <tr key={application.id}>
              <td className="px-4 py-3">
                <Link href={`/admin/applications/${application.id}`} className="font-medium hover:underline">
                  {application.candidate.name ?? application.candidate.email ?? "Candidate"}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {application.candidate.candidateProfile?.headline ?? application.candidate.email}
                </p>
              </td>
              <td className="px-4 py-3">{application.job.title}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge kind="application" status={application.status as ApplicationStatus} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(application.createdAt)}</td>
              <td className="px-4 py-3">
                <Link className="text-sm text-accent hover:underline" href={`/admin/applications/${application.id}`}>
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
