import Image from "next/image";
import { Fade } from "./fade";
import { href } from "./links";
import { Section, SplitHeading } from "./section";
import { Arrow } from "./ui";

const SCORES = [["85.2%", "Holo4 27B"], ["80.8%", "Holo4 35B-A3B"]];
const LINKS = [
  { title: "Models", body: "Every Holo release, with scores, licenses and weights.", to: "/research/models" },
  { title: "Publications", body: "Papers, benchmarks and datasets behind the models.", to: "/research/publications" },
];

export function Research() {
  return (
    <Section>
      <SplitHeading title="Real-world research. Measured where it matters.">Twinlink research starts from one idea: AI should take action in the real world. It began with computer use, with models trained on enterprise environments, and extends to new areas as real use cases require.</SplitHeading>
      <Fade delay={0.08}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <a href={href("/newsroom/holo4")} className="group flex flex-col overflow-hidden rounded-[12px] bg-grey-900 shadow-[0_18px_40px_rgb(4_4_5_/10%)]">
            <div className="relative aspect-[2/1] overflow-hidden lg:aspect-[16/7]">
              <Image src="/hc/holo4-cover-halftone.jpg" alt="" fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
            </div>
            <div className="grid gap-6 border-t !border-white/15 p-6 sm:grid-cols-[1fr_auto] sm:gap-y-4 sm:p-8">
              <h3 className="t18 max-w-64 text-balance tracking-tight text-white">Holo4: powering generalist computer-use agents</h3>
              <div className="flex flex-col gap-2 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:self-end">
                <p className="t12 text-white/60">OSWorld</p>
                <dl className="flex flex-col gap-1">
                  {SCORES.map(([score, model]) => (
                    <div key={model} className="flex items-baseline gap-3">
                      <dt className="t14 order-2 text-white/60">{model}</dt>
                      <dd className="t18 order-1 w-16 tabular-nums text-white">{score}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <Arrow className="self-end text-white" />
            </div>
          </a>
          <div className="grid gap-4">
            {LINKS.map(link => (
              <a key={link.title} href={href(link.to)} className="group flex flex-col justify-between gap-6 rounded-[12px] border !border-grey-250 bg-white p-6 transition-colors duration-200 hover:bg-grey-250">
                <div className="flex flex-col gap-1.5">
                  <h3 className="t18 tracking-tight">{link.title}</h3>
                  <p className="t14 text-grey-600">{link.body}</p>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </Fade>
    </Section>
  );
}
