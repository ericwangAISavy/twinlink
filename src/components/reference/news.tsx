import { Fade } from "./fade";
import { href } from "./links";
import { Section, SectionTitle } from "./section";
import { Button } from "./ui";

const LEAD = { date: "[Date]", title: "[Add lead news headline]", summary: "[Add a short summary of your most important announcement.]" };

const POSTS = [1, 2, 3, 4];

export function News() {
  return (
    <Section id="whats-new">
      <SectionTitle>What&apos;s new?</SectionTitle>
      <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Fade>
          <a href={href("/newsroom")} className="group flex h-full flex-col overflow-hidden rounded-[12px] border !border-grey-250 bg-white transition-colors duration-200 hover:bg-grey-250">
            <div className="relative aspect-[20/9]">
              <span className="absolute inset-0 flex items-center justify-center bg-grey-200 text-[12px] font-medium text-grey-500">[Add cover image]</span>
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
              <a key={post} href={href("/newsroom")} className="group flex items-center gap-4 p-4 transition-colors duration-200 hover:bg-grey-250">
                <div className="aspect-video w-28 shrink-0 rounded-[6px] bg-grey-200" />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <p className="t12 text-grey-500">[Date]</p>
                  <h3 className="t18 line-clamp-3 !font-bold tracking-tight">[Add news headline]</h3>
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
