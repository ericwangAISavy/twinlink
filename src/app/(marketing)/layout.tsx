import { VisitorTracker } from "@/components/marketing/visitor-tracker";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { getCurrentUser } from "@/server/authorization";
import { getCompanyProfile } from "@/server/queries/company";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [company, user] = await Promise.all([
    getCompanyProfile(),
    getCurrentUser(),
  ]);

  return (
    <div className="marketing-theme flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <VisitorTracker />
      <main className="flex-1">{children}</main>
      <SiteFooter company={company} />
    </div>
  );
}
