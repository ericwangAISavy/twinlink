import type { Metadata } from "next";
import { SiteFooter } from "@/components/reference/footer";
import { SiteHeader } from "@/components/reference/header";
import "./reference.css";

export const metadata: Metadata = {
  title: { absolute: "Twinlink — Operational intelligence for the enterprise" },
  // Draft content that has not been verified for Twinlink: keep it out of search indexes.
  robots: { index: false, follow: false },
};

export default function ReferenceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="hc flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
