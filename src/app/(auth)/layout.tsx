import Link from "next/link";
import { Fragment } from "react";
import localFont from "next/font/local";
import { TwinlinkMark } from "@/components/marketing/twinlink-mark";
import "@/components/marketing/public-surfaces.css";

const openSans = localFont({ src: "../../components/marketing/fonts/open-sans-latin.woff2", weight: "300 800", display: "swap", variable: "--font-reference-body" });
const roboto = localFont({ src: "../../components/marketing/fonts/roboto-latin.woff2", weight: "100 900", display: "swap", variable: "--font-reference-heading" });

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${openSans.variable} ${roboto.variable} public-auth`}>
      <header className="public-auth-header">
        <Link href="/" aria-label="TwinLink home"><TwinlinkMark className="size-8" />TWINLINK</Link>
        <Link href="/careers">Browse careers</Link>
      </header>
      <main className="public-auth-grid">
        <section className="public-auth-intro" aria-label="TwinLink talent portal">
          <p>Global talent. Greater possibilities.</p>
          <h1>Connecting exceptional talent with global opportunities.</h1>
          <p>Twinlink bridges world-class engineering talent with forward-thinking companies, creating meaningful careers and stronger global industries.</p>
        </section>
        <div className="public-auth-card"><Fragment key="auth-route">{children}</Fragment></div>
      </main>
    </div>
  );
}
