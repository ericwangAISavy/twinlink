import { ActionForm } from "@/components/action-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Field } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatMonthYear } from "@/lib/utils";
import { addCandidateExperience, deleteCandidateExperience, updateCandidateProfile } from "@/server/actions/profiles";
import { requireRole } from "@/server/authorization";
import { getCandidateProfile } from "@/server/queries/profiles";

async function removeExperience(formData: FormData) {
  "use server";
  const id = String(formData.get("experienceId") ?? "");
  await deleteCandidateExperience(id);
}

export default async function CandidateProfilePage() {
  const user = await requireRole("CANDIDATE");
  const record = await getCandidateProfile(user.id);
  const profile = record?.candidateProfile;

  return (
    <>
      <PageHeader title="Candidate profile" description="Skills, experience, and portfolio links TwinLink reviewers will see." />
      <Card>
        <CardContent className="pt-6">
          <ActionForm action={updateCandidateProfile} submitLabel="Save profile">
            <div className="grid gap-4">
              <Field htmlFor="name" label="Name">
                <Input id="name" name="name" required defaultValue={record?.name ?? ""} />
              </Field>
              <Field htmlFor="headline" label="Headline">
                <Input id="headline" name="headline" defaultValue={profile?.headline ?? ""} />
              </Field>
              <Field htmlFor="location" label="Location">
                <Input id="location" name="location" defaultValue={profile?.location ?? ""} />
              </Field>
              <Field htmlFor="phone" label="Phone">
                <Input id="phone" name="phone" defaultValue={profile?.phone ?? ""} />
              </Field>
              <Field htmlFor="skills" label="Skills" hint="Comma-separated.">
                <Input id="skills" name="skills" defaultValue={profile?.skills.join(", ") ?? ""} />
              </Field>
              <Field htmlFor="linkedIn" label="LinkedIn">
                <Input id="linkedIn" name="linkedIn" type="url" defaultValue={profile?.linkedIn ?? ""} />
              </Field>
              <Field htmlFor="website" label="Website">
                <Input id="website" name="website" type="url" defaultValue={profile?.website ?? ""} />
              </Field>
              <Field htmlFor="portfolioUrl" label="Portfolio">
                <Input id="portfolioUrl" name="portfolioUrl" type="url" defaultValue={profile?.portfolioUrl ?? ""} />
              </Field>
              <Field htmlFor="bio" label="Bio">
                <Textarea id="bio" name="bio" defaultValue={profile?.bio ?? ""} />
              </Field>
            </div>
          </ActionForm>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {profile?.experiences.map((experience) => (
            <div key={experience.id} className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-medium">
                  {experience.title} · {experience.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatMonthYear(experience.startDate)} –{" "}
                  {experience.current ? "Present" : formatMonthYear(experience.endDate)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{experience.description}</p>
              </div>
              <form action={removeExperience}>
                <input type="hidden" name="experienceId" value={experience.id} />
                <Button type="submit" variant="ghost" size="sm">
                  Remove
                </Button>
              </form>
            </div>
          ))}
          <ActionForm action={addCandidateExperience} submitLabel="Add experience">
            <div className="grid gap-4 md:grid-cols-2">
              <Field htmlFor="title" label="Title">
                <Input id="title" name="title" required />
              </Field>
              <Field htmlFor="company" label="Company">
                <Input id="company" name="company" required />
              </Field>
              <Field htmlFor="startDate" label="Start date">
                <Input id="startDate" name="startDate" type="month" required />
              </Field>
              <Field htmlFor="endDate" label="End date">
                <Input id="endDate" name="endDate" type="month" />
              </Field>
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" name="current" />
              I currently work here
            </label>
            <Field htmlFor="description" label="Description" className="mt-4">
              <Textarea id="description" name="description" />
            </Field>
          </ActionForm>
        </CardContent>
      </Card>
    </>
  );
}
