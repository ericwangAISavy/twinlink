import Image from "next/image";
import type { ReactNode } from "react";
import "./subpages.css";

export function SubPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`sub-page ${className}`}>{children}</div>;
}
export function PhotoBanner({ image, title, position = "center top", caption }: { image: string; title: string; position?: string; caption?: string }) {
  return <section className="sub-photo-banner" aria-label={title}>
    <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: position }} />
    <h1 className="sr-only">{title}</h1>
    {caption && <h2 className="sub-photo-caption">{caption}</h2>}
  </section>;
}
export function WaveBanner({ title }: { title: string }) {
  return <section className="sub-wave-banner"><div className="foundation-container"><h1>{title}</h1></div><div className="foundation-wave" aria-hidden="true" /></section>;
}
export function SubHeading({ children }: { children: ReactNode }) { return <h2 className="sub-heading">{children}</h2>; }
