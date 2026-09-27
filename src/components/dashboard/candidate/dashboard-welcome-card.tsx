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
    <section className="overflow-hidden rounded-2xl border border-[#eadfcd] bg-white p-6 shadow-[0_8px_30px_rgba(28,25,22,0.04)] sm:p-8">
      <p className="text-sm font-medium text-[#c4a574]">Candidate workspace</p>
      <h1 className="mt-2 font-serif text-3xl text-[#1c1916] sm:text-4xl">Welcome, {greetingName}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {profileComplete
          ? "Track applications, keep your resume current, and follow messages from Twinlink."
          : "Finish your profile so Twinlink reviewers can see your experience when you apply."}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild variant="teal" className="rounded-full">
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>
        {profileComplete ? (
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/dashboard/candidate/profile">View profile</Link>
          </Button>
        ) : (
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/dashboard/candidate/jobs">Browse careers</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
