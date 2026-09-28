import { AdminJobForm } from "@/components/admin/admin-job-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default function AdminNewJobPage() {
  return (
    <>
      <AdminPageHeader title="Create job posting" description="Drafts stay internal. Published jobs appear on /careers." />
      <AdminJobForm />
    </>
  );
}
