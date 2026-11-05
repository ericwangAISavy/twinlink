import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/components/marketing/service-content";
import { PhotoBanner, SubHeading, SubPage, WaveBanner } from "@/components/marketing/subpage-shell";
import { Reveal } from "@/components/marketing/reveal";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return SERVICES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  return { title: service?.title || "Service not found" };
}
export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <SubPage className="sub-service">
    {service.photoBanner ? <PhotoBanner title={service.title} image={service.image} /> : <WaveBanner title={service.title} />}
    <section className="sub-section"><div className="foundation-container sub-service-grid">
      <Reveal threshold={0} className="sub-service-copy reveal-copy">
        <SubHeading>{service.title}</SubHeading>
        {service.paragraphs.map((paragraph, i) => <div key={i}>
          <p>{paragraph.title && <strong>{paragraph.title} </strong>}{paragraph.body}</p>
          {!service.photoBanner && i + 1 === (service.imageAfter || 1) && <Image className="sub-service-image" src={service.image} alt={`${service.title} technology illustration`} width={1000} height={560} sizes="(min-width: 992px) 75vw, 100vw" />}
        </div>)}
      </Reveal>
      <Reveal className="sub-service-sidebar reveal-copy">
        <h2>{service.photoBanner ? "Service Category" : "Other Services"}</h2>
        <nav aria-label="Related services"><ul>{service.related.filter(slug => slug !== service.slug).map(slug => {
          const related = getService(slug)!;
          return <li key={slug}><Link href={`/services/${slug}`}>{related.title}</Link></li>;
        })}{service.photoBanner && <li><Link href="/careers">Job Search</Link></li>}</ul></nav>
        <Link href="/contact" className="sub-enquiry">Discuss your requirements</Link>
      </Reveal>
    </div></section>
  </SubPage>;
}
