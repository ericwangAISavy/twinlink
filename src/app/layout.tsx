import { siteOrigin } from "@/lib/site-url";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import "./globals.css";

const sans = localFont({
  src: "./fonts/source-sans-3-latin.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

const serif = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  weight: "500 700",
  style: "normal",
  adjustFontFallback: "Times New Roman",
  variable: "--font-serif",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Twinlink is a technology consulting and engineering talent firm. We help companies modernize cloud, data, AI, and security, and hire the engineers to run them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  applicationName: "Twinlink",
  title: {
    default: "Twinlink | Technology Consulting & Engineering Talent",
    template: "%s | Twinlink",
  },
  description: SITE_DESCRIPTION,
  keywords: ["technology consulting", "engineering talent", "cloud infrastructure", "data and AI", "cybersecurity", "technical recruiting", "IT staffing"],
  openGraph: {
    type: "website",
    siteName: "Twinlink",
    locale: "en_US",
    url: "/",
    title: "Twinlink | Technology Consulting & Engineering Talent",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Twinlink | Technology Consulting & Engineering Talent",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
