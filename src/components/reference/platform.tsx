"use client";

import { useEffect, useRef, useState } from "react";
import { Fade } from "./fade";
import { href } from "./links";
import { BrowserAgent, DeploymentPlan, OrinTabStack, ModelCode } from "./platform-visuals";
import { Arrow } from "./ui";

const TABS = [
  { name: "Enterprise", audience: "For enterprise", title: "FDEs on-site from day one.", body: "Our team learns your systems and builds custom agents directly on your existing infrastructure, without a rebuild or months of scoping.", tags: ["Security & compliance", "Forward deployed engineers"], cta: "Learn more", to: "/enterprise", Visual: DeploymentPlan },
  { name: "Agents API", audience: "For builders", title: "Agents that click, type, and get it done.", body: "One agent works in a cloud-hosted browser or on a desktop and needs no APIs. Go live on day one.", tags: ["API, SDK, MCP, CLI"], cta: "Start building", to: "/agents-api", Visual: BrowserAgent },
  { name: "Models API", audience: "For researchers & builders", title: "Build on Orin directly.", body: "An OpenAI-compatible API for our multimodal models. Plug them into your own agent loop and your own orchestration.", tags: ["Text + image input", "Zero data retention"], cta: "Read the docs", to: "/models-api", Visual: ModelCode },
  { name: "OrinTab", audience: "For everyone", title: "OrinTab does the work. You get the results.", body: "The fastest way to feel what a computer-use agent can do: a free Chrome extension.", tags: ["Free", "Routines & schedules"], cta: "Try OrinTab", to: "/holotab", Visual: OrinTabStack },
];

function Heading() {
  return (
    <div className="flex flex-col gap-5">
      <Fade delay={0.05}><h2 className="t36 max-w-xl tracking-tight">One platform. Four ways in.</h2></Fade>
      <Fade delay={0.08}><p className="t16 max-w-2xl text-grey-600">Enterprise deployment, Agents API, Models API or OrinTab. Pick your way in.</p></Fade>
    </div>
  );
}

function Copy({ tab }: { tab: (typeof TABS)[number] }) {
  return (
    <div>
      <p className="t14 mb-3 text-iris-600">{tab.audience}</p>
      <h3 className="t36 mb-4 tracking-tight">{tab.title}</h3>
      <p className="t16 mb-6 max-w-md text-grey-600">{tab.body}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {tab.tags.map(tag => <span key={tag} className="rounded-[8px] border !border-grey-250 bg-white px-3 py-1.5 text-[12px] font-medium leading-[18px]">{tag}</span>)}
      </div>
      <a href={href(tab.to)} className="group inline-flex items-center gap-1.5 text-[14px] font-bold leading-[21px]">{tab.cta}<Arrow /></a>
    </div>
  );
}

export function Platform() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const pinned = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Desktop: the section is pinned for 400vh and scroll progress selects the tab.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onScroll = () => {
      const node = track.current;
      if (!node || !desktop.matches || !pinned()) return;
      const distance = node.offsetHeight - window.innerHeight;
      const progress = -node.getBoundingClientRect().top / distance;
      setActive(Math.min(TABS.length - 1, Math.max(0, Math.floor(progress * TABS.length))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const select = (index: number) => {
    const node = track.current;
    if (node && pinned()) {
      const distance = node.offsetHeight - window.innerHeight;
      const top = node.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (distance * (index + 0.5)) / TABS.length, behavior: "smooth" });
    } else setActive(index);
  };

  const tab = TABS[active];
  return (
    <section id="builder" className="overflow-x-clip">
      <div ref={track} className="hidden lg:block lg:h-[400vh] motion-reduce:lg:h-auto">
        <div className="sticky top-0 flex h-screen items-center pt-14 motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
            <Heading />
            <div className="grid grid-cols-[240px_minmax(0,1fr)] items-center gap-12">
              <ul className="flex flex-col gap-2">
                {TABS.map((item, index) => {
                  const on = index === active;
                  return (
                    <li key={item.name}>
                      <button type="button" aria-pressed={on} onClick={() => select(index)} className={`flex w-full flex-col gap-1 rounded-[12px] border px-6 py-5 text-left transition-colors duration-300 ${on ? "!border-grey-250 bg-grey-200" : "!border-transparent hover:bg-grey-250"}`}>
                        <span className={`t12 ${on ? "text-iris-600" : "text-grey-500"}`}>0{index + 1}</span>
                        <span className="t18 tracking-tight">{item.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div key={tab.name} className="hc-panel grid min-h-[520px] grid-cols-2 items-center gap-14">
                <Copy tab={tab} />
                <div><tab.Visual /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-8 lg:hidden">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 pb-8 pt-16">
          <Heading />
          <div className="flex flex-col gap-8">
            <div className="flex max-w-full overflow-hidden rounded-[12px] border !border-grey-250 bg-grey-200 self-start">
              <div role="tablist" aria-label="Ways in" className="flex min-w-0 gap-1 overflow-x-auto p-1 [scrollbar-width:none]">
                {TABS.map((item, index) => (
                  <button key={item.name} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)} className={`whitespace-nowrap rounded-[8px] px-5 py-2.5 text-[14px] font-medium leading-5 transition-colors duration-300 ${index === active ? "bg-white text-grey-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : "text-grey-600"}`}>{item.name}</button>
                ))}
              </div>
            </div>
            <div key={tab.name} role="tabpanel" aria-label={tab.name} className="hc-panel flex flex-col gap-8">
              <Copy tab={tab} />
              <div className="max-w-md"><tab.Visual /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
