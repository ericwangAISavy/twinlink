import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { getCompanyProfile } from "@/server/queries/company";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompanyProfile();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter company={company} />
    </div>
  );
}
