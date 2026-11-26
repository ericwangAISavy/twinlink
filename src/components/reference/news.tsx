import Image from "next/image";
import { Fade } from "./fade";
import { href } from "./links";
import { Section, SectionTitle } from "./section";
import { Button } from "./ui";

const LEAD = {
  slug: "h-company-aws-european-sovereign-cloud-press-release",
  image: "/hc/h-company-aws-european-sovereign-cloud-press-release-cover-h.jpg",
  alt: "Title card: Press release: AWS European Sovereign Cloud",
  date: "November 16, 2026",
  title: "Twinlink launches its NVIDIA-powered agentic AI on the AWS European Sovereign Cloud",
  summary: "Twinlink's AI agents enable European organizations to automate their operational workflows on sovereign infrastructure within the European Union",
};

const POSTS = [
  { slug: "h-x-42ai-hackathon-paris-winners", image: "cover", date: "November 25, 2026", title: "Meet the winners of the H x 42AI hackathon in Paris" },
  { slug: "before-you-renew-automation-questions", image: "cover-h", date: "November 10, 2026", title: "Before you renew: 10 questions to ask about your automation estate" },
  { slug: "ciso-questions-computer-use-agents", image: "cover-h", date: "November 10, 2026", title: "Eight questions your CISO will ask about computer-use agents, and the answers" },
  { slug: "same-screen-two-approaches", image: "cover-h", date: "November 10, 2026", title: "Same screen, two approaches: watching a script and an agent hit the same change" },
];

export function News() {
  return (
    <Section id="whats-new">
      <SectionTitle>What&apos;s new?</SectionTitle>
      <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Fade>
          <a href={href(`/newsroom/${LEAD.slug}`)} className="group flex h-full flex-col overflow-hidden rounded-[12px] border !border-grey-250 bg-white transition-colors duration-200 hover:bg-grey-250">
            <div className="relative aspect-[20/9]">
              <Image src={LEAD.image} alt={LEAD.alt} fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover object-left transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
            <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
              <p className="t12 text-grey-500">{LEAD.date}</p>
              <h3 className="t18 tracking-tight">{LEAD.title}</h3>
              <p className="t16 line-clamp-3 text-grey-600">{LEAD.summary}</p>
              <span className="t14 mt-auto pt-3 text-iris-600 transition-transform duration-200 group-hover:translate-x-1">Read article</span>
            </div>
          </a>
        </Fade>
        <Fade delay={0.1}>
          <div className="flex flex-col divide-y divide-grey-250 overflow-hidden rounded-[12px] border !border-grey-250 bg-white [&>a]:!border-grey-250">
            {POSTS.map(post => (
              <a key={post.slug} href={href(`/newsroom/${post.slug}`)} className="group flex items-center gap-4 p-4 transition-colors duration-200 hover:bg-grey-250">
                <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-[6px]">
                  <Image src={`/hc/${post.slug}-${post.image}.jpg`} alt="" fill sizes="7rem" className="object-cover object-left transition-transform duration-300 group-hover:scale-[1.04]" />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="t12 text-grey-500">{post.date}</p>
                  <h3 className="t18 line-clamp-3 !font-bold tracking-tight">{post.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </Fade>
      </div>
      <Fade delay={0.3}><div className="flex"><Button to="/newsroom" variant="secondary">Read more</Button></div></Fade>
    </Section>
  );
}
