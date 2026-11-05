import { getCompanyStatistics } from "@/server/queries/company";
import { getPublishedResources } from "@/server/queries/editorial";
import { withResourceImage } from "@/lib/resource-images";
import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/marketing/hero-slider";
import { Reveal } from "@/components/marketing/reveal";
import { HomeCareerCards, HomeHeading, HomeTopicGrid, HomeValues } from "@/components/marketing/home-content";
import "@/components/marketing/home.css";

const HOME_SLIDES = [
  { src: "/images/hero-team-office.jpg", alt: "TwinLink team reviewing work together", position: "object-[32%_top]" },
  { src: "/images/reference/home/banner-images/trinity-home-banner-2.jpg", alt: "Singapore skyline reflecting in the waterfront at sunset", position: "object-top" },
  { src: "/images/reference/home/banner-images/who-we-are-banner.jpg", alt: "City buildings and roads illuminated at night", position: "object-top" },
];
const CAPTIONS = [
  { title: "Welcome to TwinLink", body: "Empowering people and business to realise their potential." },
  { title: "Our Solutions", body: "Connecting strategy to delivery through product engineering, cloud infrastructure, AI and automation." },
  { title: "Our Service", body: "Bringing together the right people, technology and experience to create lasting impact." },
];

export default async function HomePage() {
  const [publications, statistics] = await Promise.all([
    getPublishedResources(),
    getCompanyStatistics(),
  ]);
  const firstCase =
    publications.find(item => item.kind === "case-studies" && item.featured) ||
    publications.find(item => item.kind === "case-studies");
  const featuredStudy = firstCase ? withResourceImage(firstCase) : null;
  return (
    <div className="home-reference">
      <HeroSlider slides={HOME_SLIDES} captions={CAPTIONS.map(caption => <div key={caption.title}>
        <h1>{caption.title}</h1><p>{caption.body}</p>
      </div>)} />

      <section id="how-we-help" className="home-about home-section" aria-labelledby="home-about-heading">
        <div className="foundation-container home-about-grid">
          <Image src="/images/reference/home/about-hrs.jpg" alt="Professionals meeting and welcoming a colleague" width={1279} height={853}
            sizes="(min-width: 992px) 50vw, 100vw" className="home-about-photo" />
          <div className="home-about-copy">
            <HomeHeading large><span id="home-about-heading">About TwinLink</span></HomeHeading>
            <p>TwinLink is a professional technology consulting firm that connects strategy to delivery. We bring together the right people, technology, and experience to help organizations solve their most critical problems and build what&apos;s next. Our work brings product engineering, cloud and infrastructure, AI and automation, and an engineering network together to turn ambitious ideas into scalable, real-world products.</p>
            <p>Great technology comes from great people. TwinLink brings together developers, architects, and technology specialists who are passionate about solving real-world problems and creating lasting impact. We connect companies with world-class engineering teams and technology specialists.</p>
            <div className="home-about-links"><Link href="/about">Learn more about our approach</Link><Link href="/#solutions">Our solutions</Link><Link href="/careers">Explore careers</Link></div>
          </div>
        </div>
      </section>

      <section id="solutions" className="home-topics home-section" aria-labelledby="home-tech-heading">
        <Reveal threshold={0} className="foundation-container reveal-copy"><HomeHeading><span id="home-tech-heading">Tech Services</span></HomeHeading><HomeTopicGrid kind="tech" /></Reveal>
      </section>
      <section id="people" className="home-topics home-hr" aria-labelledby="home-hr-heading">
        <Reveal threshold={0} className="foundation-container reveal-copy"><HomeHeading><span id="home-hr-heading">HR Services</span></HomeHeading><HomeTopicGrid kind="hr" /></Reveal>
      </section>
      <HomeValues />
      <HomeCareerCards />

      <section className="home-statistics home-section" aria-label="TwinLink in numbers">
        <div className="foundation-container home-stat-grid">{statistics.map((stat, i) => <Reveal key={stat.label} className="home-stat reveal-copy" delay={i * 100}>
          <p className="home-stat-value">{stat.value}</p><p>{stat.label}</p>
        </Reveal>)}</div>
      </section>
      <section id="insights" className="home-insights home-section" aria-labelledby="home-insights-heading">
        <div className="foundation-container">
          <HomeHeading><span id="home-insights-heading">Featured Insights</span></HomeHeading>
          {featuredStudy ? <article className="home-featured">
            <Reveal className="reveal-copy"><p className="home-featured-kind">{featuredStudy.label}</p><h3>{featuredStudy.title}</h3><p>{featuredStudy.summary}</p>
              <Link className="foundation-button" href={`/case-studies/${featuredStudy.slug}`}>Read case study</Link>
            </Reveal>
            <Image src={featuredStudy.image} alt={featuredStudy.imageAlt || ""} width={900} height={560} sizes="(min-width: 992px) 50vw, 100vw" />
          </article> : <p className="home-empty-insights">Explore our <Link href="/blog">journal</Link> and <Link href="/events">events</Link>. Published case studies will appear here when available.</p>}
        </div>
      </section>
    </div>
  );
}
