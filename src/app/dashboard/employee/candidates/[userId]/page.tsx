import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";
import { formatMonthYear } from "@/lib/utils";
import { requireRole } from "@/server/authorization";
import { getCandidateForReview } from "@/server/queries/profiles";

export default async function CandidateReviewPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  await requireRole("EMPLOYEE");
  const { userId } = await params;
  const candidate = await getCandidateForReview(userId);
  if (!candidate) notFound();
  const profile = candidate.candidateProfile;

  return (
    <>
      <PageHeader
        title={candidate.name ?? candidate.email}
        description={profile?.headline ?? "Candidate profile"}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{profile?.bio ?? "No bio yet."}</p>
            <p>{profile?.location}</p>
            {profile?.skills?.length ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : null}
            {profile?.linkedIn ? (
              <a className="text-accent hover:underline" href={profile.linkedIn}>
                LinkedIn
              </a>
            ) : null}
            {profile?.portfolioUrl ? (
              <a className="ml-3 text-accent hover:underline" href={profile.portfolioUrl}>
                Portfolio
              </a>
            ) : null}
            {profile?.resumeFile ? (
              <a className="block text-accent hover:underline" href={profile.resumeFile.url}>
                Download resume
              </a>
            ) : (
              <p className="text-muted-foreground">No resume uploaded.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile?.experiences?.map((experience) => (
              <div key={experience.id}>
                <p className="font-medium">
                  {experience.title} · {experience.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatMonthYear(experience.startDate)} – {experience.current ? "Present" : formatMonthYear(experience.endDate)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{experience.description}</p>
              </div>
            ))}
            {profile?.experiences?.length === 0 ? <p className="text-muted-foreground">No experience listed.</p> : null}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {candidate.applications.map((application) => (
            <Link
              key={application.id}
              href={`/dashboard/employee/applicants/${application.id}`}
              className="block rounded-md border border-border px-3 py-2 hover:bg-muted/40"
            >
              {application.job.title} · {APPLICATION_STATUS_LABELS[application.status]}
            </Link>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
