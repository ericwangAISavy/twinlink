"use client";

import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Layers,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveCandidateProfile } from "@/server/actions/profiles";
import type { CandidateProfileForm, EducationItem, ExperienceItem } from "@/lib/types";
import { cn } from "@/lib/utils";

type ResumeFile = { url: string; filename: string; uploadedAt: string | null; size?: number | null };

const EMPTY_EXPERIENCE = {
  id: "",
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

const EMPTY_EDUCATION = {
  id: "",
  degree: "",
  school: "",
  location: "",
  startDate: "",
  endDate: "",
};

export function CandidateProfileEditor({
  email,
  initial,
  draft,
  resume,
  storageReady,
}: {
  email: string;
  initial: CandidateProfileForm;
  draft: CandidateProfileForm | null;
  resume: ResumeFile | null;
  storageReady: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [draftNotice, setDraftNotice] = useState(Boolean(draft));
  const [open, setOpen] = useState({
    basic: true,
    summary: true,
    skills: true,
    experience: true,
    education: true,
    resume: true,
    links: true,
    visibility: false,
  });
  const [skillDraft, setSkillDraft] = useState("");
  const [experienceForm, setExperienceForm] = useState<typeof EMPTY_EXPERIENCE | null>(null);
  const [educationForm, setEducationForm] = useState<typeof EMPTY_EDUCATION | null>(null);
  const [editingLinks, setEditingLinks] = useState(false);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState<"draft" | "publish" | "resume" | null>(null);
  const [file, setFile] = useState(resume);
  const fileInput = useRef<HTMLInputElement>(null);

  function patch(partial: Partial<CandidateProfileForm>) {
    setForm((current) => ({ ...current, ...partial }));
  }

  async function persist(mode: "draft" | "publish") {
    setBusy(mode);
    try {
      const body = new FormData();
      body.set("payload", JSON.stringify({ ...form, mode }));
      const result = await saveCandidateProfile(body);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message);
      if (mode === "publish") setDraftNotice(false);
      else setDraftNotice(true);
    } finally {
      setBusy(null);
    }
  }

  function addSkill() {
    const skill = skillDraft.trim();
    if (!skill) return;
    if (form.skills.some((item) => item.toLowerCase() === skill.toLowerCase())) {
      setSkillDraft("");
      return;
    }
    patch({ skills: [...form.skills, skill] });
    setSkillDraft("");
  }

  function saveExperience() {
    if (!experienceForm) return;
    if (experienceForm.title.trim().length < 2 || experienceForm.company.trim().length < 2 || !experienceForm.startDate) {
      toast.error("Add a title, company, and start date.");
      return;
    }
    const next: ExperienceItem = {
      id: experienceForm.id || crypto.randomUUID(),
      title: experienceForm.title.trim(),
      company: experienceForm.company.trim(),
      location: experienceForm.location.trim() || null,
      startDate: experienceForm.startDate,
      endDate: experienceForm.current ? null : experienceForm.endDate || null,
      current: experienceForm.current,
      description: experienceForm.description.trim() || null,
    };
    const exists = form.experiences.some((item) => item.id === next.id);
    patch({
      experiences: exists ? form.experiences.map((item) => (item.id === next.id ? next : item)) : [next, ...form.experiences],
    });
    setExperienceForm(null);
  }

  function saveEducation() {
    if (!educationForm) return;
    if (educationForm.degree.trim().length < 2 || educationForm.school.trim().length < 2 || !educationForm.startDate) {
      toast.error("Add a degree, school, and start date.");
      return;
    }
    const next: EducationItem = {
      id: educationForm.id || crypto.randomUUID(),
      degree: educationForm.degree.trim(),
      school: educationForm.school.trim(),
      startDate: educationForm.startDate,
      endDate: educationForm.endDate || null,
      location: educationForm.location.trim() || null,
    };
    const exists = form.education.some((item) => item.id === next.id);
    patch({
      education: exists ? form.education.map((item) => (item.id === next.id ? next : item)) : [next, ...form.education],
    });
    setEducationForm(null);
  }

  async function uploadResume(selected: File) {
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB.");
      return;
    }
    setBusy("resume");
    try {
      const body = new FormData();
      body.append("file", selected);
      const response = await fetch("/api/upload", { method: "POST", body });
      const payload = (await response.json()) as { error?: string; url?: string | null; filename?: string; uploadedAt?: string; size?: number };
      if (!response.ok) {
        toast.error(payload.error ?? "Upload failed.");
        return;
      }
      setFile({
        url: payload.url ?? "",
        filename: payload.filename ?? selected.name,
        uploadedAt: payload.uploadedAt ?? new Date().toISOString(),
        size: payload.size ?? selected.size,
      });
      toast.success("Resume uploaded.");
    } finally {
      setBusy(null);
    }
  }

  const initials = form.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "TW";
  const links = [
    ["LinkedIn", form.linkedIn],
    ["GitHub", form.github],
    ["Portfolio", form.portfolioUrl],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight text-[#1c1916]">Candidate profile</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6f655b]">
            Keep your profile up to date so Twinlink recruiters can match you with the right opportunities.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" className="rounded-full bg-white" onClick={() => setPreview(true)}>
            <Eye /> Preview profile
          </Button>
          <Button type="button" variant="outline" className="rounded-full bg-white" disabled={busy !== null} onClick={() => persist("draft")}>
            <Save /> {busy === "draft" ? "Saving…" : "Save draft"}
          </Button>
          <Button type="button" className="rounded-full bg-[#1c1916] text-white hover:bg-[#2a241e]" disabled={busy !== null} onClick={() => persist("publish")}>
            <Pencil /> {busy === "publish" ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      {draftNotice && draft ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#eadfcd] bg-[#f7f1e6] px-4 py-3 text-sm">
          <p>A draft is saved separately from the profile recruiters see.</p>
          <button
            type="button"
            className="font-medium text-[#8a6a32] hover:underline"
            onClick={() => {
              setForm(draft);
              setDraftNotice(false);
              toast.success("Draft restored in the editor. Save changes to publish it.");
            }}
          >
            Restore draft
          </button>
        </div>
      ) : null}

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <Section
            icon={<UserRound className="size-4" />}
            title="Basic information"
            subtitle="Tell us about yourself and your background."
            open={open.basic}
            onToggle={() => setOpen((current) => ({ ...current, basic: !current.basic }))}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="full-name" label="Full name" value={form.name} onChange={(value) => patch({ name: value })} />
              <Field id="headline" label="Professional headline" required value={form.headline} onChange={(value) => patch({ headline: value })} placeholder="e.g. Software Engineer, Product Manager, Data Analyst" />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Field id="location" label="Location" required value={form.location} onChange={(value) => patch({ location: value })} icon={<MapPin className="size-4" />} />
              <Field id="phone" label="Phone" value={form.phone} onChange={(value) => patch({ phone: value })} icon={<Phone className="size-4" />} />
              <label className="block text-sm">
                <span className="text-[#6f655b]">Email</span>
                <span className="relative mt-1.5 block">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8d8274]" />
                  <input value={email} readOnly className="h-11 w-full rounded-xl border border-[#eadfcd] bg-[#faf7f1] pl-9 pr-3 text-sm text-[#6f655b]" />
                </span>
              </label>
            </div>
          </Section>

          <Section
            icon={<FileText className="size-4" />}
            title="Professional summary"
            subtitle="Write a brief summary about your experience, skills, and career goals."
            open={open.summary}
            onToggle={() => setOpen((current) => ({ ...current, summary: !current.summary }))}
          >
            <div className="relative">
              <textarea
                id="summary"
                value={form.bio}
                maxLength={500}
                onChange={(event) => patch({ bio: event.target.value })}
                rows={4}
                className="w-full rounded-xl border border-[#eadfcd] px-3 py-2 pb-7 text-sm outline-none focus:border-[#c4a574]"
              />
              <p className="pointer-events-none absolute bottom-2 right-3 text-xs text-[#8d8274]">{form.bio.length}/500</p>
            </div>
          </Section>

          <Section
            icon={<Layers className="size-4" />}
            title="Skills"
            subtitle="Add skills to help recruiters find you. Type a skill and press Enter."
            open={open.skills}
            onToggle={() => setOpen((current) => ({ ...current, skills: !current.skills }))}
          >
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#eadfcd] px-2 py-2">
              {form.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-[#f3e6c8] px-2.5 py-1 text-xs text-[#6d5428]">
                  {skill}
                  <button type="button" aria-label={`Remove ${skill}`} onClick={() => patch({ skills: form.skills.filter((item) => item !== skill) })}>
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <input
                value={skillDraft}
                onChange={(event) => setSkillDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill..."
                className="h-8 min-w-32 flex-1 bg-transparent px-1 text-sm outline-none"
              />
            </div>
          </Section>

          <Section
            icon={<Briefcase className="size-4" />}
            title="Work experience"
            subtitle="Add your work experience, starting with the most recent role."
            open={open.experience}
            onToggle={() => setOpen((current) => ({ ...current, experience: !current.experience }))}
          >
            <ul className="space-y-4">
              {form.experiences.map((item) => (
                <li key={item.id} className="flex flex-col items-start gap-3 border-b border-[#f3ece2] pb-4 sm:flex-row sm:gap-4">
                  <div className="w-full shrink-0 sm:w-[34%]">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-[#6f655b]">{item.company}</p>
                    <p className="mt-1 text-xs text-[#8d8274]">
                      {dateRange(item.startDate, item.endDate, item.current)}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <BulletList text={item.description} />
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <IconButton label="Edit experience" onClick={() => setExperienceForm({
                      id: item.id,
                      title: item.title,
                      company: item.company,
                      location: item.location ?? "",
                      startDate: item.startDate,
                      endDate: item.endDate ?? "",
                      current: item.current,
                      description: item.description ?? "",
                    })}>
                      <Pencil className="size-4" />
                    </IconButton>
                    <IconButton label="Delete experience" onClick={() => patch({ experiences: form.experiences.filter((row) => row.id !== item.id) })}>
                      <Trash2 className="size-4" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
            {experienceForm ? (
              <EntryForm
                title={experienceForm.id ? "Edit experience" : "Add experience"}
                onCancel={() => setExperienceForm(null)}
                onSave={saveExperience}
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Title" value={experienceForm.title} onChange={(value) => setExperienceForm({ ...experienceForm, title: value })} />
                  <Field label="Company" value={experienceForm.company} onChange={(value) => setExperienceForm({ ...experienceForm, company: value })} />
                  <Field label="Location" value={experienceForm.location} onChange={(value) => setExperienceForm({ ...experienceForm, location: value })} />
                  <label className="flex items-end gap-2 pb-2 text-sm">
                    <input type="checkbox" checked={experienceForm.current} onChange={(event) => setExperienceForm({ ...experienceForm, current: event.target.checked })} />
                    I currently work here
                  </label>
                  <Field label="Start" type="month" value={experienceForm.startDate} onChange={(value) => setExperienceForm({ ...experienceForm, startDate: value })} />
                  <Field label="End" type="month" value={experienceForm.endDate} onChange={(value) => setExperienceForm({ ...experienceForm, endDate: value })} />
                </div>
                <label className="mt-3 block text-sm">
                  <span className="text-[#6f655b]">Highlights, one per line</span>
                  <textarea value={experienceForm.description} onChange={(event) => setExperienceForm({ ...experienceForm, description: event.target.value })} rows={4} className="mt-1.5 w-full rounded-xl border border-[#eadfcd] px-3 py-2 text-sm outline-none focus:border-[#c4a574]" />
                </label>
              </EntryForm>
            ) : (
              <button type="button" onClick={() => setExperienceForm(EMPTY_EXPERIENCE)} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#eadfcd] px-3 py-2 text-sm font-medium text-[#1c1916] hover:bg-[#faf7f1]">
                <Plus className="size-4" /> Add experience
              </button>
            )}
          </Section>

          <Section
            icon={<GraduationCap className="size-4" />}
            title="Education"
            subtitle="Add your educational background."
            open={open.education}
            onToggle={() => setOpen((current) => ({ ...current, education: !current.education }))}
          >
            <ul className="space-y-4">
              {form.education.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 border-b border-[#f3ece2] pb-4">
                  <div className="min-w-0">
                    <p className="font-medium">{item.degree}</p>
                    <p className="text-sm text-[#6f655b]">{item.school}</p>
                  </div>
                  <p className="ml-auto shrink-0 text-sm text-[#6f655b]">
                    {dateRange(item.startDate, item.endDate)}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  <div className="flex shrink-0 gap-1">
                    <IconButton label="Edit education" onClick={() => setEducationForm({
                      id: item.id,
                      degree: item.degree,
                      school: item.school,
                      location: item.location ?? "",
                      startDate: item.startDate,
                      endDate: item.endDate ?? "",
                    })}>
                      <Pencil className="size-4" />
                    </IconButton>
                    <IconButton label="Delete education" onClick={() => patch({ education: form.education.filter((row) => row.id !== item.id) })}>
                      <Trash2 className="size-4" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
            {educationForm ? (
              <EntryForm title={educationForm.id ? "Edit education" : "Add education"} onCancel={() => setEducationForm(null)} onSave={saveEducation}>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Degree" value={educationForm.degree} onChange={(value) => setEducationForm({ ...educationForm, degree: value })} />
                  <Field label="School" value={educationForm.school} onChange={(value) => setEducationForm({ ...educationForm, school: value })} />
                  <Field label="Location" value={educationForm.location} onChange={(value) => setEducationForm({ ...educationForm, location: value })} />
                  <span />
                  <Field label="Start" type="month" value={educationForm.startDate} onChange={(value) => setEducationForm({ ...educationForm, startDate: value })} />
                  <Field label="End" type="month" value={educationForm.endDate} onChange={(value) => setEducationForm({ ...educationForm, endDate: value })} />
                </div>
              </EntryForm>
            ) : (
              <button type="button" onClick={() => setEducationForm(EMPTY_EDUCATION)} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#eadfcd] px-3 py-2 text-sm font-medium hover:bg-[#faf7f1]">
                <Plus className="size-4" /> Add education
              </button>
            )}
          </Section>

          <div className="grid gap-4 lg:grid-cols-2">
            <Section
              icon={<FileText className="size-4" />}
              title="Resume"
              subtitle="Upload your most recent resume. Accepted formats: PDF, DOC, DOCX (max 5MB)."
              open={open.resume}
              onToggle={() => setOpen((current) => ({ ...current, resume: !current.resume }))}
              action={
                <button
                  type="button"
                  aria-label={file ? "Replace resume" : "Upload resume"}
                  className="grid size-8 place-items-center rounded-lg text-[#6f655b] hover:bg-[#f7f1e6] disabled:opacity-50"
                  onClick={() => fileInput.current?.click()}
                  disabled={!storageReady || busy === "resume"}
                >
                  <Upload className="size-4" />
                </button>
              }
            >
              {file ? (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#eadfcd] px-3 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="size-4 shrink-0 text-[#8a6a32]" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{displayFilename(file.filename)}</p>
                      <p className="text-xs text-[#8d8274]">
                        {file.uploadedAt ? `Uploaded ${new Date(file.uploadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "On file"}
                        {file.size ? ` · ${formatBytes(file.size)}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.url ? (
                      <a href={file.url} className="text-[#6f655b]" aria-label="Download resume" target="_blank" rel="noreferrer">
                        <Download className="size-4" />
                      </a>
                    ) : null}
                    <button type="button" className="text-sm text-[#1c1916]" onClick={() => fileInput.current?.click()} disabled={!storageReady || busy === "resume"}>
                      {busy === "resume" ? "Uploading…" : "Replace"}
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" className="text-sm text-[#8a6a32]" onClick={() => fileInput.current?.click()} disabled={!storageReady || busy === "resume"}>
                  {storageReady ? "Upload resume" : "Resume storage is not configured"}
                </button>
              )}
              <input
                ref={fileInput}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf"
                className="sr-only"
                onChange={(event) => {
                  const selected = event.target.files?.[0];
                  if (selected) void uploadResume(selected);
                  event.target.value = "";
                }}
              />
            </Section>

            <Section
              icon={<Link2 className="size-4" />}
              title="Links"
              subtitle="Add links to your online profiles or portfolio (optional)."
              open={open.links}
              onToggle={() => setOpen((current) => ({ ...current, links: !current.links }))}
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm hover:bg-[#f7f1e6]"
                  onClick={() => {
                    setOpen((current) => ({ ...current, links: true }));
                    setEditingLinks((current) => !current);
                  }}
                >
                  <Upload className="size-3.5" /> {editingLinks ? "Done" : links.length ? "Replace" : "Add"}
                </button>
              }
            >
              {editingLinks ? (
                <div className="space-y-3">
                  <Field label="LinkedIn" value={form.linkedIn} onChange={(value) => patch({ linkedIn: value })} placeholder="https://" />
                  <Field label="GitHub" value={form.github} onChange={(value) => patch({ github: value })} placeholder="https://" />
                  <Field label="Portfolio" value={form.portfolioUrl} onChange={(value) => patch({ portfolioUrl: value })} placeholder="https://" />
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <ul className="space-y-1 text-sm">
                    {links.length === 0 ? <li className="text-[#8d8274]">No links yet.</li> : null}
                    {links.map(([label, href]) => (
                      <li key={label}>
                        <a href={href} className="break-all text-[#8a6a32] hover:underline" target="_blank" rel="noreferrer">
                          {href}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-6">
          <section className="rounded-2xl border border-[#eadfcd] bg-white p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#f3e6c8] text-lg font-medium text-[#6d5428]">{initials}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium">{form.name || "Your name"}</p>
                  <button type="button" aria-label="Edit name" className="text-[#8d8274] hover:text-[#1c1916]" onClick={() => document.getElementById("full-name")?.focus()}>
                    <Pencil className="size-3.5" />
                  </button>
                </div>
                <p className="truncate text-sm text-[#6f655b]">{form.headline || "Headline"}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-[#3f3832]">
              <li className="flex items-center gap-2">
                <MapPin className="size-3.5 shrink-0 text-[#8d8274]" />
                <span className="truncate">{form.location || "Location"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5 shrink-0 text-[#8d8274]" />
                <span className="truncate">{form.phone || "Phone"}</span>
              </li>
              <li className="flex items-center gap-2 text-[#6f655b]">
                <Mail className="size-3.5 shrink-0 text-[#8d8274]" />
                <span className="truncate">{email}</span>
              </li>
            </ul>
          </section>
          <section className="rounded-2xl border border-[#eadfcd] bg-white p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f7f1e6] text-[#8a6a32]">
                <Settings className="size-4" />
              </span>
              <div>
                <h2 className="font-medium">Profile settings</h2>
                <p className="mt-1 text-sm text-[#6f655b]">Control who can see your profile and how you&apos;re discovered by recruiters.</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-between rounded-xl border border-[#eadfcd] px-3 py-2.5 text-sm"
              aria-expanded={open.visibility}
              onClick={() => setOpen((current) => ({ ...current, visibility: !current.visibility }))}
            >
              Visibility settings
              <ChevronRight className={cn("size-4 text-[#8d8274] transition", open.visibility && "rotate-90")} />
            </button>
            {open.visibility ? (
              <fieldset className="mt-3 space-y-2 text-sm">
                <legend className="sr-only">Profile visibility</legend>
                <label className="flex items-start gap-2">
                  <input type="radio" name="visibility" checked={form.visibility === "recruiters"} onChange={() => patch({ visibility: "recruiters" })} />
                  <span>Visible to Twinlink recruiters</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="radio" name="visibility" checked={form.visibility === "private"} onChange={() => patch({ visibility: "private" })} />
                  <span>Private. Recruiters cannot view your bio, skills, or experience.</span>
                </label>
              </fieldset>
            ) : null}
          </section>
        </aside>
      </div>

      {preview ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1c1916]/40 p-4" role="dialog" aria-modal="true" aria-labelledby="profile-preview-title">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl bg-[#f7f3ec] p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="profile-preview-title" className="font-serif text-3xl">{form.name || "Your name"}</h2>
                <p className="text-sm text-[#6f655b]">{form.headline}</p>
              </div>
              <button type="button" className="rounded-full p-2 hover:bg-white" aria-label="Close preview" onClick={() => setPreview(false)}>
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-4 text-sm">{[form.location, form.phone, email].filter(Boolean).join(" · ")}</p>
            {form.bio ? <p className="mt-4 whitespace-pre-wrap text-sm text-[#3f3832]">{form.bio}</p> : null}
            {form.skills.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {form.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-[#f3e6c8] px-2.5 py-1 text-xs">{skill}</span>
                ))}
              </div>
            ) : null}
            <PreviewList title="Experience" items={form.experiences.map((item) => `${item.title}, ${item.company}`)} />
            <PreviewList title="Education" items={form.education.map((item) => `${item.degree}, ${item.school}`)} />
            <PreviewList title="Links" items={links.map(([, href]) => href)} />
            <p className="mt-4 text-xs text-[#8d8274]">
              {form.visibility === "private" ? "This preview is private and hidden from recruiters." : "Recruiters can see this after you save changes."}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Section({
  icon,
  title,
  subtitle,
  open,
  onToggle,
  action,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  open: boolean;
  onToggle: () => void;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#eadfcd] bg-white">
      <div className="flex items-start gap-3 px-5 py-4">
        <button type="button" onClick={onToggle} aria-expanded={open} className="flex min-w-0 flex-1 items-start gap-3 text-left">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f7f1e6] text-[#8a6a32]">{icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-[#1c1916]">{title}</span>
            <span className="mt-0.5 block text-sm text-[#6f655b]">{subtitle}</span>
          </span>
          <ChevronDown className={cn("mt-1 size-4 shrink-0 text-[#8d8274] transition", open && "rotate-180")} />
        </button>
        {action}
      </div>
      {open ? <div className="border-t border-[#f3ece2] px-5 py-4">{children}</div> : null}
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  icon,
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="text-[#6f655b]">
        {label}
        {required ? <span className="text-[#8a6a32]"> *</span> : null}
      </span>
      <span className="relative mt-1.5 block">
        {icon ? <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8274]">{icon}</span> : null}
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-11 w-full rounded-xl border border-[#eadfcd] bg-white px-3 text-sm outline-none focus:border-[#c4a574]",
            icon && "pl-9",
          )}
        />
      </span>
    </label>
  );
}

function EntryForm({
  title,
  onCancel,
  onSave,
  children,
}: {
  title: string;
  onCancel: () => void;
  onSave: () => void;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 rounded-xl bg-[#faf7f1] p-4">
      <p className="mb-3 text-sm font-medium">{title}</p>
      {children}
      <div className="mt-3 flex gap-2">
        <Button type="button" className="rounded-full bg-[#1c1916] text-white hover:bg-[#2a241e]" onClick={onSave}>
          Save entry
        </Button>
        <Button type="button" variant="outline" className="rounded-full bg-white" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid size-8 place-items-center rounded-lg text-[#6f655b] hover:bg-[#f7f1e6]">
      {children}
    </button>
  );
}

function BulletList({ text }: { text: string | null }) {
  const lines = (text ?? "").split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return <span />;
  return (
    <ul className="list-disc space-y-1 pl-4 text-sm text-[#3f3832]">
      {lines.map((line) => (
        <li key={line}>{line.replace(/^[-•]\s*/, "")}</li>
      ))}
    </ul>
  );
}

function PreviewList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="mt-1 space-y-1 text-sm text-[#3f3832]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function dateRange(start: string, end: string | null, current = false) {
  const left = monthLabel(start);
  const right = current ? "Present" : monthLabel(end);
  return [left, right].filter(Boolean).join(" – ");
}

function monthLabel(value: string | null | undefined) {
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})/.exec(value);
  if (!match) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
    new Date(Number(match[1]), Number(match[2]) - 1, 1),
  );
}

function displayFilename(name: string) {
  const base = name.split("/").pop() ?? name;
  return base.replace(/^\d{10,}-/, "");
}

function formatBytes(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
