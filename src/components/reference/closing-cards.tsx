import { Fade } from "./fade";
import { href } from "./links";
import { Section, SectionTitle } from "./section";
import { Arrow } from "./ui";

const CARDS = [
  { audience: "For enterprise", title: "Enterprise", body: "We map one of your workflows with you, then deploy agents on your actual systems and deliver a measurable outcome.", cta: "Explore Enterprise", to: "/enterprise", dark: true },
  { audience: "For builders", title: "Agents API", body: "Operational agents that get the job done, in the browser and on the desktop. A free tier to begin with.", cta: "Start building", to: "/agents-api" },
  { audience: "For everyone", title: "OrinTab", body: "The fastest way to feel what a computer-use agent can do: a free Chrome extension.", cta: "Try OrinTab", to: "/holotab" },
];

export function ClosingCards() {
  return (
    <Section className="sm:gap-12">
      <SectionTitle>Start building, or see it in action.</SectionTitle>
      <div className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {CARDS.map((card, index) => (
          <Fade key={card.title} delay={0.05 + index * 0.06} className="h-full w-[85%] shrink-0 snap-start lg:w-auto">
            <a href={href(card.to)} className={`group flex h-full min-h-[320px] flex-col justify-between gap-10 rounded-[12px] border p-8 transition-colors duration-200 sm:p-10 ${card.dark ? "!border-grey-900 bg-grey-900 text-white hover:bg-grey-750" : "!border-grey-250 bg-grey-200 hover:bg-grey-250"}`}>
              <div className="flex flex-col gap-4">
                <p className={`t14 ${card.dark ? "opacity-70" : ""}`}>{card.audience}</p>
                <h3 className="t24 tracking-tight">{card.title}</h3>
                <p className={`t16 ${card.dark ? "opacity-75" : "text-grey-600"}`}>{card.body}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-[16px] font-medium leading-6">{card.cta}<Arrow /></span>
            </a>
          </Fade>
        ))}
      </div>
    </Section>
  );
}
