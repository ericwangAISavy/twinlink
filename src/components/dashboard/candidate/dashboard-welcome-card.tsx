import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardWelcomeCard({
  name,
  profileComplete,
}: {
  name: string | null;
  profileComplete: boolean;
}) {
  const greetingName = name?.trim() || "there";
  const primaryHref = profileComplete ? "/dashboard/candidate/jobs" : "/dashboard/candidate/profile";
  const primaryLabel = profileComplete ? "Browse careers" : "Complete your profile";

  return (
    <section className="relative aspect-[1024/192] w-full min-h-[220px] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(28,25,22,0.08)] sm:min-h-[248px]">
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_85%_0%,rgba(242,193,78,0.22),transparent_60%),linear-gradient(120deg,#081a3a,#0b2a5b)]" aria-hidden="true" />
      <div className="relative z-10 flex min-h-[220px] flex-col justify-center px-6 py-8 sm:min-h-[248px] sm:px-8 sm:py-10">
        <p className="text-sm font-medium text-[#e8d5a3]">Candidate workspace</p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">Welcome, {greetingName}</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
          {profileComplete
            ? "Track applications, keep your resume current, and follow messages from Twinlink."
            : "Finish your profile so Twinlink reviewers can see your experience when you apply."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="teal" className="rounded-full">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {profileComplete ? (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/45 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/dashboard/candidate/profile">View profile</Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/45 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/dashboard/candidate/jobs">Browse careers</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
