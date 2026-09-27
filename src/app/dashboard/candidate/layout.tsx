import { CandidateShell } from "@/components/dashboard/candidate/candidate-shell";
import { requireRole } from "@/server/authorization";
import { getUnreadNotifications } from "@/server/queries/messages";

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CANDIDATE");
  const notifications = await getUnreadNotifications(user.id);
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <CandidateShell
      user={{
        name: user.name,
        email: user.email,
        image: user.image ?? null,
      }}
      unread={unread}
    >
      {children}
    </CandidateShell>
  );
}
