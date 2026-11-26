import type { Metadata } from "next";
import { SiteFooter } from "@/components/reference/footer";
import { SiteHeader } from "@/components/reference/header";
import { CopyButtons } from "@/components/reference/tools";
import "./reference.css";
import "./reference-pages.css";

const DESCRIPTION = "H Company is an AI research lab and agentic platform that works across any system without rebuilding your stack.";

export const metadata: Metadata = {
  title: { absolute: "H Company — Operational intelligence for the enterprise" },
  // Local reproduction of hcompany.ai: keep it out of search indexes.
  robots: { index: false, follow: false },
  // Replace the application-wide metadata so these pages describe themselves.
  applicationName: "H",
  keywords: null,
  description: DESCRIPTION,
  openGraph: { type: "website", siteName: "H", locale: "en_US", title: "Operational intelligence for the enterprise | H", description: DESCRIPTION, images: ["/hc/opengraph-image.jpg"] },
  twitter: { card: "summary_large_image", title: "Operational intelligence for the enterprise | H", description: DESCRIPTION, images: ["/hc/opengraph-image.jpg"] },
};

export default function ReferenceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="hc flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-10">{children}</main>
      <SiteFooter />
      <CopyButtons />
    </div>
  );
}
