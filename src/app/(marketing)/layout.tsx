import localFont from "next/font/local";
import { Fragment } from "react";
import { BackToTop } from "@/components/marketing/back-to-top";
import "@/components/marketing/foundation.css";
import "@/components/marketing/public-surfaces.css";
import { VisitorTracker } from "@/components/marketing/visitor-tracker";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { getCurrentUser } from "@/server/authorization";
import { getCompanyProfile } from "@/server/queries/company";

const openSans = localFont({ src: "../../components/marketing/fonts/open-sans-latin.woff2", weight: "300 800", display: "swap", variable: "--font-reference-body" });
const roboto = localFont({ src: "../../components/marketing/fonts/roboto-latin.woff2", weight: "100 900", display: "swap", variable: "--font-reference-heading" });

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
    <div className={`${openSans.variable} ${roboto.variable} marketing-theme trinity-foundation`}>
      <a href="#marketing-content" className="foundation-skip">Skip to content</a>
      <SiteHeader user={user} />
      <VisitorTracker />
      <main id="marketing-content" className="foundation-content" tabIndex={-1}><Fragment key="marketing-route">{children}</Fragment></main>
      <SiteFooter company={company} />
      <BackToTop />
    </div>
  );
}
