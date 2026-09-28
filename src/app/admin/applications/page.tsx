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
  searchParams: Promise<{ q?: string; status?: string; jobId?: string; from?: string; assignedTo?: string; view?: string }>;
}) {
  const { q, status, jobId, from, assignedTo, view } = await searchParams;
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
  const pipelineView = view === "pipeline";

  return (
    <>
      <AdminPageHeader
        title="Applications"
        description="List view first. Pipeline view groups the same live records by status."
        actions={
          <div className="flex gap-2">
            <Button asChild variant={pipelineView ? "outline" : "teal"} size="sm" className="rounded-full">
              <Link href="/admin/applications">List</Link>
            </Button>
            <Button asChild variant={pipelineView ? "teal" : "outline"} size="sm" className="rounded-full">
              <Link href="/admin/applications?view=pipeline">Pipeline</Link>
            </Button>
          </div>
        }
      />
      <AdminFilterBar>
        <Input name="q" defaultValue={q} placeholder="Candidate, email, or job" className="max-w-xs" />
        {pipelineView ? <input type="hidden" name="view" value="pipeline" /> : null}
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
      ) : pipelineView ? (
        <div className="grid gap-4 overflow-x-auto pb-2 md:grid-cols-2 xl:grid-cols-4">
          {APPLICATION_STATUSES.map((column) => {
            const items = visible.filter((item) => item.status === column);
            return (
              <section key={column} className="min-w-[14rem] rounded-2xl border border-[#eadfcd] bg-white p-4">
                <h2 className="text-sm font-medium">
                  {APPLICATION_STATUS_LABELS[column]}{" "}
                  <span className="tabular-nums text-muted-foreground">{items.length}</span>
                </h2>
                <ul className="mt-3 space-y-2">
                  {items.length === 0 ? <li className="text-xs text-muted-foreground">None</li> : null}
                  {items.map((application) => (
                    <li key={application.id}>
                      <Link
                        href={`/admin/applications/${application.id}`}
                        className="block rounded-xl bg-[#faf7f1] px-3 py-2 text-sm hover:bg-[#f3eee6]"
                      >
                        <p className="font-medium">{application.candidate.name ?? application.candidate.email}</p>
                        <p className="truncate text-xs text-muted-foreground">{application.job.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <AdminTable headers={["Candidate", "Job", "Status", "Applied", "Messages", ""]}>
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
              <td className="px-4 py-3 tabular-nums">{application._count.messages}</td>
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
