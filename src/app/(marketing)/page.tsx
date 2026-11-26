import { getCompanyStatistics } from "@/server/queries/company";
import { getPublishedResources } from "@/server/queries/editorial";
import { getPublishedJobs } from "@/server/queries/jobs";
import Link from "next/link";
import { Reveal } from "@/components/marketing/reveal";
import { HomeHeading, HomeTopicGrid, HomeValues } from "@/components/marketing/home-content";
import { ClientLogos, HeroOutcome, TeamSection, Testimonials } from "@/components/marketing/proof-sections";
import { CountUp } from "@/components/marketing/count-up";
import { HomeRoles } from "@/components/marketing/home-roles";
import { BrandIllustration } from "@/components/marketing/brand-illustration";
import "@/components/marketing/home.css";

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });

/** Case studies marked as fictional/illustrative are never featured on the homepage. */
function isRealCaseStudy(item: { kind: string; label?: string; notice?: string }) {
  return item.kind === "case-studies" && !item.notice && !/illustrative|fictional|hypothetical/i.test(item.label ?? "");
}

export default async function HomePage() {
  const [publications, statistics, jobs] = await Promise.all([
    getPublishedResources(),
    getCompanyStatistics(),
    getPublishedJobs(),
  ]);
  const realCases = publications.filter(isRealCaseStudy);
  const featuredStudy = realCases.find(item => item.featured) || realCases[0] || null;
  const articles = publications.filter(item => item.kind === "blog").slice(0, 3);
  const roles = jobs.map(({ id, slug, title, department, location, employmentType }) => ({ id, slug, title, department, location, employmentType }));
  const proofLine = statistics.slice(0, 2).map(stat => `${stat.value} ${stat.label}`).join(" · ");

  return (
    <div className="home-reference">
      <section className="home-brand-hero" aria-labelledby="home-hero-heading">
        <div className="foundation-container home-brand-hero-inner">
          <div className="home-brand-hero-copy">
            {proofLine && <p className="home-eyebrow">{proofLine}</p>}
            <h1 id="home-hero-heading">From strategy to delivery, with engineers who ship.</h1>
            <p className="home-hero-lede">We help companies modernize their cloud, data, and AI systems, and hire the engineers to run them.</p>
            <HeroOutcome />
            <div className="home-hero-actions">
              <Link href="/contact" className="foundation-button foundation-button-gold">Talk to our team</Link>
              <Link href="/careers" className="home-hero-secondary">Explore open roles <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
        <a href="#home-after-hero" className="home-scroll-cue" aria-label="Scroll to see more">
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </section>

      <div id="home-after-hero" />
      <ClientLogos />

      {statistics.length > 0 && <section className="home-proof" aria-label="Twinlink in numbers">
        <div className="foundation-container">
          <ul className="home-stat-grid">{statistics.map(stat => <li key={stat.label} className="home-stat">
            <p className="home-stat-value"><CountUp value={stat.value} /></p><p>{stat.label}</p>
          </li>)}</ul>
        </div>
      </section>}

      <section id="how-we-help" className="home-about home-section" aria-labelledby="home-about-heading">
        <div className="foundation-container home-about-grid">
          <BrandIllustration className="home-about-art" />
          <div className="home-about-copy">
            <HomeHeading large><span id="home-about-heading">About Twinlink</span></HomeHeading>
            <p className="home-about-statement">A technology consulting and engineering talent firm that connects strategy to delivery.</p>
            <p>We bring together the right people, technology, and experience to help organizations solve critical problems and build what&apos;s next, across product engineering, cloud and infrastructure, data and AI, and cybersecurity.</p>
            <p>Our network of developers, architects, and technology specialists works alongside client teams to turn ambitious ideas into scalable, real-world products, and we help companies hire the engineering talent to keep that momentum going.</p>
            <div className="home-about-links">{[["About our approach", "/about"], ["Our services", "/#solutions"], ["Careers", "/careers"]].map(([label, href]) => <Link key={href} href={href} className="home-pill">{label}<span aria-hidden="true">→</span></Link>)}</div>
          </div>
        </div>
      </section>

      <section id="solutions" className="home-topics home-section" aria-labelledby="home-tech-heading">
        <Reveal threshold={0} className="foundation-container reveal-copy"><HomeHeading><span id="home-tech-heading">Technology services</span></HomeHeading><HomeTopicGrid kind="tech" /></Reveal>
      </section>
      <section id="people" className="home-topics home-hr" aria-labelledby="home-hr-heading">
        <Reveal threshold={0} className="foundation-container reveal-copy"><HomeHeading><span id="home-hr-heading">Talent solutions</span></HomeHeading><HomeTopicGrid kind="hr" /></Reveal>
      </section>

      <HomeValues />
      <Testimonials />

      {featuredStudy && <section className="home-case home-section" aria-labelledby="home-case-heading">
        <div className="foundation-container">
          <HomeHeading><span id="home-case-heading">Client results</span></HomeHeading>
          <article className="home-featured">
            <div>
              <p className="home-featured-kind">{featuredStudy.category}</p>
              <h3>{featuredStudy.title}</h3>
              <p>{featuredStudy.summary}</p>
              <Link className="foundation-button" href={`/case-studies/${featuredStudy.slug}`}>Read the case study</Link>
            </div>
            {featuredStudy.metrics?.length ? <ul className="home-case-metrics">{featuredStudy.metrics.slice(0, 3).map(metric => <li key={metric.label}>
              <strong>{metric.value}</strong><span>{metric.label}</span>
            </li>)}</ul> : null}
          </article>
        </div>
      </section>}

      {articles.length > 0 && <section id="insights" className="home-insights home-section" aria-labelledby="home-insights-heading">
        <div className="foundation-container">
          <div className="home-section-head">
            <HomeHeading><span id="home-insights-heading">Latest insights</span></HomeHeading>
            <Link href="/blog" className="home-section-link">View all articles <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-three-grid">{articles.map((article, i) => <article key={article.slug} className="home-article">
            <Link href={`/blog/${article.slug}`} className="home-article-cover" data-tone={i % 3} tabIndex={-1} aria-hidden="true">
              <span className="home-article-cover-kind">{article.category}</span>
            </Link>
            <div className="home-article-body">
              <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
              <p>{article.summary}</p>
              <p className="home-article-meta">{[
                article.author && `By ${article.author}`,
                article.publishedAt && dateFormat.format(new Date(article.publishedAt)),
                article.readMinutes && `${article.readMinutes} min read`,
              ].filter(Boolean).join(" · ")}</p>
            </div>
          </article>)}</div>
        </div>
      </section>}

      {roles.length > 0 && <section id="open-roles" className="home-roles home-section" aria-labelledby="home-roles-heading">
        <div className="foundation-container">
          <div className="home-section-head">
            <HomeHeading><span id="home-roles-heading">Open roles</span></HomeHeading>
            <Link href="/careers" className="home-section-link">View all {jobs.length} roles <span aria-hidden="true">→</span></Link>
          </div>
          <HomeRoles roles={roles} />
        </div>
      </section>}

      <TeamSection />

      <section className="home-closing" aria-labelledby="home-closing-heading">
        <div className="foundation-container home-closing-inner">
          <div>
            <h2 id="home-closing-heading">Let&apos;s build what comes next.</h2>
            <p>Tell us about your project or hiring goals. We will reply with a practical next step.</p>
          </div>
          <Link href="/contact" className="foundation-button foundation-button-gold">Talk to our team</Link>
        </div>
      </section>
    </div>
  );
}
