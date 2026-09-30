import { Bookmark, Briefcase, ClipboardList, Inbox } from "lucide-react";
import { DashboardStatCard } from "@/components/dashboard/candidate/dashboard-stat-card";
import { DashboardWelcomeCard } from "@/components/dashboard/candidate/dashboard-welcome-card";
import { ProfileCompletionCard } from "@/components/dashboard/candidate/profile-completion-card";
import { RecentApplicationsCard } from "@/components/dashboard/candidate/recent-applications-card";
import { RecommendedJobsCard } from "@/components/dashboard/candidate/recommended-jobs-card";
import { getProfileCompletion } from "@/lib/candidate-profile";
import { isActiveStage } from "@/lib/hiring-stages";
import { requireRole } from "@/server/authorization";
import { getCandidateApplications, getSavedJobs } from "@/server/queries/applications";
import { getPublishedJobs } from "@/server/queries/jobs";
import { getUnreadNotifications } from "@/server/queries/messages";
import { getCandidateProfile } from "@/server/queries/profiles";

export default async function CandidateOverviewPage() {
  const user = await requireRole("CANDIDATE");
  const [applications, notifications, profileRecord, saved, jobs] = await Promise.all([
    getCandidateApplications(user.id),
    getUnreadNotifications(user.id),
    getCandidateProfile(user.id),
    getSavedJobs(user.id),
    getPublishedJobs(),
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
      department: job.department,
      location: job.location,
      employmentType: job.employmentType,
      publishedAt: job.publishedAt,
      saved: savedIds.has(job.id),
    }));

  const unread = notifications.filter((item) => !item.read);
  const activeApplications = applications.filter((item) => isActiveStage(item.status));
  const activeCount = activeApplications.length;

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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
        <RecentApplicationsCard items={activeApplications.slice(0, 4)} />
        <ProfileCompletionCard percent={completion.percent} items={completion.items} />
      </div>

      <RecommendedJobsCard items={recommended} />
    </div>
  );
}
