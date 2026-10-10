import { CandidateShell } from "@/components/dashboard/candidate/candidate-shell";
import { requireRole } from "@/server/authorization";
import { getUnreadNotificationCount } from "@/server/queries/messages";

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CANDIDATE");
  const unread = await getUnreadNotificationCount(user.id);

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
