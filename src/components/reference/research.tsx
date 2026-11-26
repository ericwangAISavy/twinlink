import { BRAND } from "./brand";
import { Fade } from "./fade";
import { href } from "./links";
import { Section, SplitHeading } from "./section";
import { Arrow } from "./ui";

const SCORES = [["00%", BRAND.modelA], ["00%", BRAND.modelB]];
const LINKS = [
  { title: "Models", body: `Every ${BRAND.model} release, with scores, licenses and weights.`, to: "/research/models" },
  { title: "Publications", body: "Papers, benchmarks and datasets behind the models.", to: "/research/publications" },
];

export function Research() {
  return (
    <Section>
      <SplitHeading title="Real-world research. Measured where it matters.">[Add your research story: where it started, what it covers and where it is heading.]</SplitHeading>
      <Fade delay={0.08}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <a href={href("/newsroom")} className="group flex flex-col overflow-hidden rounded-[12px] bg-grey-900 shadow-[0_18px_40px_rgb(4_4_5_/10%)]">
            <div className="relative aspect-[2/1] overflow-hidden lg:aspect-[16/7]">
              <span className="flex h-full w-full items-center justify-center text-[36px] font-medium text-white">{BRAND.model}</span>
            </div>
            <div className="grid gap-6 border-t !border-white/15 p-6 sm:grid-cols-[1fr_auto] sm:gap-y-4 sm:p-8">
              <h3 className="t18 max-w-64 text-balance tracking-tight text-white">{BRAND.model}: [add model headline]</h3>
              <div className="flex flex-col gap-2 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:self-end">
                <p className="t12 text-white/60">[Benchmark]</p>
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
