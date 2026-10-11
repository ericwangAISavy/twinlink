import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable } from "@/components/admin/admin-table";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABELS,
} from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { getGuestApplications } from "@/server/queries/guest-applications";

export default async function GuestApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;
  const { entries, error } = await getGuestApplications();
  const visible = entries.filter(
    (entry) =>
      (!status || entry.status === status) &&
      `${entry.name} ${entry.email} ${entry.jobTitle}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <>
      <AdminPageHeader
        title="Guest applications"
        description="Review applications submitted without an account. Applicant details are private to administrators."
      />
      <form className="mb-6 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={q}
          aria-label="Search guest applications"
          placeholder="Name, email, or role"
          className="rounded-lg border bg-white px-3 py-2"
        />
        <select
          name="status"
          defaultValue={status}
          aria-label="Status filter"
          className="rounded-lg border bg-white px-3 py-2"
        >
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((value) => (
            <option key={value} value={value}>
              {APPLICATION_STATUS_LABELS[value]}
            </option>
          ))}
        </select>
        <button className="rounded-full bg-[#1c1916] px-5 py-2 text-white">
          Filter
        </button>
      </form>
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-5"
        >
          {error}
        </p>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border bg-white p-6">
          No guest applications match this view.
        </p>
      ) : (
        <AdminTable headers={["Applicant", "Role", "Status", "Applied", ""]}>
          {visible.map((entry) => (
            <tr key={entry.id}>
              <td className="px-4 py-3">
                <p>{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.email}</p>
              </td>
              <td className="px-4 py-3">{entry.jobTitle}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge kind="application" status={entry.status} />
              </td>
              <td className="px-4 py-3">{formatDate(entry.createdAt)}</td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/guest-applications/${entry.id}`}
                  className="underline"
                >
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
