import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable } from "@/components/admin/admin-table";
import { ConfirmAction } from "@/components/admin/confirm-action";
import { formatDateTime } from "@/lib/utils";
import { adminSetInterviewStatus } from "@/server/actions/admin";
import { getAdminInterviews } from "@/server/queries/admin";

export default async function AdminInterviewsPage() {
  const interviews = await getAdminInterviews();

  return (
    <>
      <AdminPageHeader
        title="Interviews"
        description="Scheduling lives in Twinlink today. Calendar providers can be connected later."
      />
      {interviews.length === 0 ? (
        <AdminEmptyState title="No interviews scheduled." description="Schedule interviews from an application record." />
      ) : (
        <AdminTable headers={["Candidate", "Job", "Interviewer", "When", "Type", "Status", "Meeting", ""]}>
          {interviews.map((interview) => (
            <tr key={interview.id}>
              <td className="px-4 py-3">
                <Link className="hover:underline" href={`/admin/applications/${interview.applicationId}`}>
                  {interview.candidateName}
                </Link>
              </td>
              <td className="px-4 py-3">{interview.jobTitle}</td>
              <td className="px-4 py-3 text-muted-foreground">{interview.interviewerName}</td>
              <td className="px-4 py-3">{formatDateTime(interview.scheduledAt)}</td>
              <td className="px-4 py-3 capitalize">{interview.interviewType}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge kind="generic" status={interview.status} />
              </td>
              <td className="px-4 py-3">
                {interview.meetingUrl ? (
                  <a className="text-accent hover:underline" href={interview.meetingUrl} target="_blank" rel="noreferrer">
                    Join
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {interview.status === "scheduled" ? (
                    <>
                      <ConfirmAction
                        label="Complete"
                        message="Mark this interview as completed?"
                        action={adminSetInterviewStatus.bind(null, interview.id, "completed")}
                      />
                      <ConfirmAction
                        label="Cancel"
                        message="Cancel this interview?"
                        action={adminSetInterviewStatus.bind(null, interview.id, "cancelled")}
                      />
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
