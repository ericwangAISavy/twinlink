import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/components/marketing/service-content";
import { SubPage, WaveBanner } from "@/components/marketing/subpage-shell";
import { Reveal } from "@/components/marketing/reveal";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return SERVICES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  return { title: service?.title || "Service not found", description: service?.summary };
}
export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <SubPage className="sub-service">
    <WaveBanner title={service.title} />
    <section className="sub-section"><div className="foundation-container sub-service-grid">
      <Reveal threshold={0} className="sub-service-copy reveal-copy">
        <p className="sub-service-lede">{service.summary}</p>
        {service.intro.map(paragraph => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        <h2 className="sub-service-subheading">What we deliver</h2>
        <ul className="sub-capabilities">
          {service.capabilities.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}
        </ul>
        <div className="sub-service-cta">
          <div><h2>Discuss your {service.title.toLowerCase()} needs</h2><p>Tell us about your goals and current environment, and we will suggest a practical starting scope.</p></div>
          <Link href="/contact" className="foundation-button">Talk to our team</Link>
        </div>
      </Reveal>
      <Reveal className="sub-service-sidebar reveal-copy">
        <h2>Other services</h2>
        <nav aria-label="Related services"><ul>{service.related.filter(slug => slug !== service.slug).map(slug => {
          const related = getService(slug)!;
          return <li key={slug}><Link href={`/services/${slug}`}>{related.title}</Link></li>;
        })}</ul></nav>
        <Link href="/contact" className="sub-enquiry">Talk to our team</Link>
      </Reveal>
    </div></section>
  </SubPage>;
}
