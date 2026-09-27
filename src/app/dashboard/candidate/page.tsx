import { Bookmark, Briefcase, ClipboardList, Inbox } from "lucide-react";
import { CareerResourcesCard } from "@/components/dashboard/candidate/career-resources-card";
import { DashboardStatCard } from "@/components/dashboard/candidate/dashboard-stat-card";
import { DashboardWelcomeCard } from "@/components/dashboard/candidate/dashboard-welcome-card";
import { JobAlertsCard } from "@/components/dashboard/candidate/job-alerts-card";
import { MessagesCard } from "@/components/dashboard/candidate/messages-card";
import { ProfileCompletionCard } from "@/components/dashboard/candidate/profile-completion-card";
import { RecentApplicationsCard } from "@/components/dashboard/candidate/recent-applications-card";
import { RecommendedJobsCard } from "@/components/dashboard/candidate/recommended-jobs-card";
import { getProfileCompletion } from "@/lib/candidate-profile";
import { requireRole } from "@/server/authorization";
import { getCandidateApplications, getSavedJobs } from "@/server/queries/applications";
import { getPublishedJobs } from "@/server/queries/jobs";
import { getMessageThreads, getUnreadNotifications } from "@/server/queries/messages";
import { getCandidateProfile } from "@/server/queries/profiles";

export default async function CandidateOverviewPage() {
  const user = await requireRole("CANDIDATE");
  const [applications, notifications, profileRecord, saved, jobs, threads] = await Promise.all([
    getCandidateApplications(user.id),
    getUnreadNotifications(user.id),
    getCandidateProfile(user.id),
    getSavedJobs(user.id),
    getPublishedJobs(),
    getMessageThreads(user.id, "CANDIDATE"),
  ]);

  const profile = profileRecord?.candidateProfile;
  const completion = getProfileCompletion({
    name: profileRecord?.name ?? user.name,
    headline: profile?.headline ?? null,
    skills: profile?.skills ?? [],
    experiences: profile?.experiences ?? [],
    resumeUploaded: Boolean(profile?.resumeFile),
    hasLinks: Boolean(profile?.linkedIn || profile?.website || profile?.portfolioUrl),
  });

  const appliedIds = new Set(applications.map((item) => item.job.id));
  const savedIds = new Set(saved.map((item) => item.jobId));
  const recommended = jobs
    .filter((job) => !appliedIds.has(job.id))
    .slice(0, 4)
    .map((job) => ({
      id: job.id,
      slug: job.slug,
      title: job.title,
      location: job.location,
      employmentType: job.employmentType,
      saved: savedIds.has(job.id),
    }));

  const unread = notifications.filter((item) => !item.read);
  const activeCount = applications.filter((item) => !["REJECTED", "WITHDRAWN"].includes(item.status)).length;
  const messagePreviews = unread.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
    href: item.href ?? "/dashboard/candidate/messages",
  }));
  const threadFallback =
    messagePreviews.length === 0
      ? threads.slice(0, 3).map((thread) => ({
          id: thread.id,
          title: thread.job.title || "Application conversation",
          body: thread.messages[0]?.body ?? "",
          href: `/dashboard/candidate/messages/${thread.id}`,
        }))
      : messagePreviews;

  return (
    <div className="space-y-6">
      <DashboardWelcomeCard name={profileRecord?.name ?? user.name} profileComplete={completion.percent === 100} />

      <section aria-label="Application summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Applications"
          value={applications.length}
          hint={applications.length === 0 ? "No applications yet" : "Submitted to Twinlink"}
          icon={ClipboardList}
        />
        <DashboardStatCard
          label="Active"
          value={activeCount}
          hint="Not rejected or withdrawn"
          icon={Briefcase}
        />
        <DashboardStatCard
          label="Unread alerts"
          value={unread.length}
          hint={unread.length === 0 ? "No unread messages" : "From Twinlink"}
          icon={Inbox}
        />
        <DashboardStatCard
          label="Saved jobs"
          value={saved.filter((item) => item.job).length}
          hint={saved.length === 0 ? "No saved jobs yet" : "Roles you bookmarked"}
          icon={Bookmark}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <div className="space-y-6">
          <RecentApplicationsCard items={applications.slice(0, 6)} />
          <RecommendedJobsCard items={recommended} />
        </div>
        <div className="space-y-6">
          <ProfileCompletionCard percent={completion.percent} items={completion.items} />
          <MessagesCard items={threadFallback} />
          <JobAlertsCard />
          <CareerResourcesCard />
        </div>
      </div>
    </div>
  );
}
