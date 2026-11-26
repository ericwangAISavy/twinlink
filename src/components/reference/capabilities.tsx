import { BRAND } from "./brand";
import { Fade } from "./fade";
import { Section, SplitHeading } from "./section";
import { WindowDots } from "./ui";

const FRAME = "overflow-hidden rounded-[12px] border shadow-[0_18px_40px_rgb(4_4_5_/10%)]";

function Mainframe() {
  const rows = [["CUST-ID", "004 812 377"], ["ACCOUNT", "FR76 ···· 0412"], ["STATUS", "PENDING KYC"], ["RISK", "—"]];
  return (
    <div className={`${FRAME} !border-white/15 bg-grey-900`}>
      <div className="flex items-center gap-2 border-b !border-white/10 bg-white/5 px-3 py-2">
        <WindowDots small /><span className="font-mono text-[10px] text-white/50">mainframe · session 3270</span>
      </div>
      <div className="flex flex-col gap-1.5 p-4 font-mono text-[11px] text-[#6ecba4]">
        <span className="text-white/40">*** CUSTOMER ONBOARDING · SCREEN 04 ***</span>
        {rows.map(([key, value]) => (
          <div key={key} className={`flex gap-4 rounded-[4px] px-1.5 py-0.5 ${key === "STATUS" ? "bg-iris-400/15 outline-2 outline-iris-400" : ""}`}>
            <span className="w-20 text-white/50">{key}</span><span>{value}</span>
          </div>
        ))}
        <span className="mt-2 text-white/40">F3=EXIT F5=REFRESH F8=NEXT</span>
      </div>
      <div className="flex items-center gap-2 border-t !border-white/10 px-4 py-2.5 font-mono text-[10px] text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-iris-300" />agent · read STATUS · no API, no connector
      </div>
    </div>
  );
}

function Benchmark() {
  const scores = [[BRAND.modelA, 85, "bg-iris-400"], [BRAND.modelB, 70, "bg-iris-200"]] as const;
  return (
    <div className={`${FRAME} !border-grey-250 bg-white`}>
      <div className="flex items-center gap-2 border-b !border-grey-250 bg-grey-100 px-3 py-2">
        <WindowDots small /><span className="font-mono text-[10px] text-grey-500">benchmark · [name]</span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        {scores.map(([name, score, color]) => (
          <div key={name} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-medium">{name}</span>
              <span className="font-mono text-[11px] text-iris-600">00%</span>
            </div>
            <span className="h-2 overflow-hidden rounded-full bg-grey-200">
              <span className={`hc-grow block h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
            </span>
          </div>
        ))}
        <span className="font-mono text-[10px] text-grey-500">[Add training claim]</span>
      </div>
    </div>
  );
}

function Stack() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1.5 rounded-[12px] border !border-iris-100 bg-iris-50 p-3">
        <span className="px-1 font-mono text-[10px] text-iris-600">{BRAND.name} · one stack</span>
        {["Agents", "Workflow orchestration", "Inference", `${BRAND.model} models`].map((layer, index) => (
          <div key={layer} className="flex items-center justify-between rounded-[6px] border !border-iris-100 bg-white px-3 py-2" style={{ marginInline: index * 6 }}>
            <span className="text-[12px] font-medium">{layer}</span><span className="h-1.5 w-1.5 rounded-full bg-iris-400" />
          </div>
        ))}
      </div>
      <div className="rounded-[12px] border border-dashed !border-grey-300 px-4 py-3 text-center">
        <span className="font-mono text-[10px] text-grey-500">[Add deployment options]</span>
      </div>
    </div>
  );
}

const CARDS = [
  { title: "Computer use pioneers", body: "[Add product description]", Visual: Mainframe },
  { title: "Enterprise-first research", body: "[Add research description]", Visual: Benchmark },
  { title: "End-to-end ownership", body: "[Add ownership claim]", Visual: Stack },
];

export function Capabilities() {
  return (
    <Section>
      <SplitHeading title="Built for a fragmented world">The real world runs on desktop apps, browsers, mobile interfaces, documents, and systems that were never designed to work together.</SplitHeading>
      <ol className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:gap-5">
        {CARDS.map(({ title, body, Visual }, index) => (
          <li key={title} className="h-full w-[85%] shrink-0 snap-start md:w-auto">
            <Fade delay={0.04 + index * 0.05} className="flex h-full flex-col gap-8 overflow-hidden rounded-[12px] border !border-grey-250 bg-grey-200 p-6 shadow-[0_10px_40px_rgb(4_4_5_/4%)] sm:p-8">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[14px] text-grey-500">0{index + 1}</span>
                <h3 className="t18 tracking-tight">{title}</h3>
                <p className="t14 text-grey-600">{body}</p>
              </div>
              <div className="mt-auto"><Visual /></div>
            </Fade>
          </li>
        ))}
      </ol>
    </Section>
  );
}
