"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CandidateSidebar } from "@/components/dashboard/candidate/candidate-sidebar";
import { CandidateTopbar } from "@/components/dashboard/candidate/candidate-topbar";
import { MainPanelLoading } from "@/components/loading-spinner";

export function CandidateShell({
  user,
  unread,
  children,
}: {
  user: { name: string | null; email: string; image: string | null };
  unread: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen bg-[#f3eee6] text-[#1c1916]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-[#2a241e] bg-[#161310] px-4 py-6 text-[#f4efe6] lg:block">
        <CandidateSidebar unread={unread} onPending={() => setNavigating(true)} />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#1c1916]/40"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[min(88vw,248px)] border-r border-[#2a241e] bg-[#161310] px-4 py-6 text-[#f4efe6] shadow-xl">
            <CandidateSidebar
              unread={unread}
              onNavigate={() => setOpen(false)}
              onPending={() => setNavigating(true)}
            />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-[248px]">
        <CandidateTopbar
          name={user.name}
          email={user.email}
          image={user.image}
          unread={unread}
          onMenuClick={() => setOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8" aria-busy={navigating}>
          {navigating ? <MainPanelLoading /> : children}
        </main>
      </div>
    </div>
  );
}
