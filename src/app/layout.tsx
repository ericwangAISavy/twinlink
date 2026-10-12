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

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: "twinlink",
    template: "%s · twinlink",
  },
  description:
    "TwinLink is a professional technology consulting firm that connects strategy to delivery—architecture, product engineering, and operating models built to last.",
  openGraph: {
    title: "twinlink",
    description:
      "Senior practitioners who design, build, and scale software that stands up in production.",
    type: "website",
  },
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
