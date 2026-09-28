import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminInviteForm } from "@/components/admin/admin-invite-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable } from "@/components/admin/admin-table";
import { formatDate } from "@/lib/utils";
import { getAdminInvites } from "@/server/queries/admin";

export default async function AdminInvitationsPage() {
  const invites = await getAdminInvites();

  return (
    <>
      <AdminPageHeader
        title="Invitations"
        description="Invite employees or additional admins. Role is assigned server-side when the invite is accepted."
      />
      <div className="mb-8 rounded-2xl border border-[#eadfcd] bg-white p-6">
        <h2 className="font-serif text-xl">Invite a person</h2>
        <p className="mt-1 text-sm text-muted-foreground">The invite link appears in the success toast after creation.</p>
        <div className="mt-4">
          <AdminInviteForm />
        </div>
      </div>
      {invites.length === 0 ? (
        <AdminEmptyState title="No invitations yet." description="Create an invitation to add Twinlink staff." />
      ) : (
        <AdminTable headers={["Email", "Name", "Role", "Status", "Expires", "Invite"]}>
          {invites.map((invite) => (
            <tr key={invite.id}>
              <td className="px-4 py-3">{invite.email}</td>
              <td className="px-4 py-3">{invite.name ?? "—"}</td>
              <td className="px-4 py-3 capitalize">{invite.role}</td>
              <td className="px-4 py-3">
                <AdminStatusBadge kind="generic" status={invite.usedAt ? "accepted" : "pending"} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(invite.expiresAt)}</td>
              <td className="px-4 py-3">
                {invite.inviteUrl ? (
                  <span className="block max-w-xs truncate text-xs text-muted-foreground">{invite.inviteUrl}</span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
