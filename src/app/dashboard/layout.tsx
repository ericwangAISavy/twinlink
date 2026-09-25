import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/nav";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { requireUser } from "@/server/authorization";
import { getUnreadNotifications } from "@/server/queries/messages";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const notifications = await getUnreadNotifications(user.id);
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-navy px-4 py-6 text-white">
        <Link href="/" className="font-serif text-2xl">
          TwinLink
        </Link>
        <p className="mt-1 text-xs text-white/50">{user.role === "EMPLOYEE" ? "Employee" : "Candidate"}</p>
        <div className="mt-8">
          <DashboardNav role={user.role} unread={unread} />
        </div>
        <div className="mt-8">
          <SignOutButton />
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-medium">{user.name ?? user.email}</p>
          </div>
          <Link href="/careers" className="text-sm text-accent hover:underline">
            Browse careers
          </Link>
        </header>
        <div className="px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
