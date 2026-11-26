import Image from "next/image";
import type { ReactNode } from "react";
import "./subpages.css";

export function SubPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`sub-page ${className}`}>{children}</div>;
}
/** Page hero with a photograph behind a navy fade. Same layout as WaveBanner so every page title matches. */
export function PhotoBanner({ image, title, position = "center", caption }: { image: string; title: string; position?: string; caption?: string }) {
  return <section className="sub-page-hero sub-page-hero-photo">
    <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: position }} />
    <div className="foundation-container sub-page-hero-inner"><h1>{caption || title}</h1></div>
  </section>;
}
/** Plain navy page hero. */
export function WaveBanner({ title }: { title: string }) {
  return <section className="sub-page-hero"><div className="foundation-container sub-page-hero-inner"><h1>{title}</h1></div></section>;
}
export function SubHeading({ children }: { children: ReactNode }) { return <h2 className="sub-heading">{children}</h2>; }
