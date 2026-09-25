import { PageHeader } from "@/components/dashboard/page-header";
import { ResumeUploader } from "@/components/dashboard/resume-uploader";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/server/authorization";
import { getCandidateProfile } from "@/server/queries/profiles";

export default async function ResumePage() {
  const user = await requireRole("CANDIDATE");
  const record = await getCandidateProfile(user.id);
  const resume = record?.candidateProfile?.resumeFile;
  const configured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return (
    <>
      <PageHeader
        title="Resume"
        description="Upload a PDF or Word resume. Files are stored on Vercel Blob when a token is configured."
      />
      <Card>
        <CardContent className="space-y-4 pt-6">
          {resume ? (
            <p className="text-sm">
              Current file:{" "}
              <a className="text-accent hover:underline" href={resume.url}>
                {resume.filename}
              </a>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No resume on file yet.</p>
          )}
          <ResumeUploader configured={configured} />
        </CardContent>
      </Card>
    </>
  );
}
