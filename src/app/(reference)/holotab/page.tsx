import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/reference/faq";
import { Fade } from "@/components/reference/fade";
import { HeroWash } from "@/components/reference/hero-wash";

export const metadata: Metadata = { title: { absolute: "HoloTab | H" } };

export default function HoloTabPage() {
  return (
    <>
      <HeroWash />
<section className={"product-hero-section pt-32 sm:pt-36 product-hero-section--compact "}>
<div className={"pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-grey-900)]"} aria-hidden={"true"} style={{"opacity": "var(--hero-mix, 100%)"} as React.CSSProperties}>
<div className={"absolute -bottom-24 -left-24 h-[24rem] w-[24rem] rounded-[var(--radius-rounded)] bg-[var(--color-iris-600)] opacity-30 blur-[65px]"} />
</div>
<div className={"relative z-10 mx-auto w-full max-w-6xl px-6 "}>
<div className={"flex flex-col gap-10 sm:gap-12"}>
<div className={"flex flex-col gap-6"} data-hero-copy={"true"}>
<Fade >
<div className={"flex items-center justify-between gap-6"}>
<h1 className={"text-style-24-head-med text-[var(--color-title-default-alt)] tracking-tight"}>
{"HoloTab"}
</h1>
</div>
</Fade>
<div className={"grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-48-head-med text-[var(--color-title-default-alt)] tracking-tight"}>
{"HoloTab does the work. You get the results."}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-default-alt)] opacity-75"}>
{"HoloTab is your AI browser companion. It navigates the web and takes action for you on the tasks you'd rather skip."}
</p>
</Fade>
</div>
<Fade className={"mt-2"}>
<div className={"flex flex-col gap-3 sm:flex-row sm:flex-wrap"}>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-primary)] text-[var(--color-text-default)] hover:bg-[var(--color-bg-secondary)]"} data-hero-button={"primary"} target={"_blank"} rel={"noopener noreferrer"} href={"https://chromewebstore.google.com/detail/holotab/hlaoiikljjgcjdhkakedfngifaopbcop"}>
{"Add to Chrome"}
</a>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-white/70 bg-transparent text-[var(--color-text-default-alt)] hover:bg-[var(--color-bg-primary)]/10"} data-hero-button={"outline"} target={"_blank"} rel={"noopener noreferrer"} href={"https://hub.hcompany.ai/holotab/introduction"}>
{"Read the docs"}
</a>
</div>
</Fade>
</div>
</div>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] py-16 sm:py-24"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"You've got better things to do than browse. Leave it to HoloTab."}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"HoloTab automates real-world tasks across the web: managing emails, scheduling meetings, researching trips, and listing products on marketplaces."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"flex w-full flex-col items-center gap-5"}>
<div className={"flex max-w-full overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-secondary)]"}>
<div className={"relative flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] motion-safe:scroll-smooth p-1  "} role={"tablist"} aria-label={"Use case selection"}>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-white text-[var(--color-grey-900)] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"} type={"button"} role={"tab"} aria-selected={"true"}>
{"Inbox Manager"}
</button>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]"} type={"button"} role={"tab"} aria-selected={"false"}>
{"Restaurant Concierge"}
</button>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]"} type={"button"} role={"tab"} aria-selected={"false"}>
{"Travel Planner"}
</button>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]"} type={"button"} role={"tab"} aria-selected={"false"}>
{"Marketplace Reseller"}
</button>
</div>
</div>
<div className={"w-full max-w-2xl overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)]"}>
<div className={"flex transition-transform duration-500 ease-in-out"} style={{"transform": "translateX(-0%)"} as React.CSSProperties}>
<div className={"relative aspect-[5/4] w-full shrink-0"}>
<video className={"absolute inset-0 h-full w-full object-cover"} src={"/hc/holotab-usecase-inbox.mp4"} aria-label={"HoloTab running the Inbox Manager task"} muted loop playsInline preload={"metadata"} />
</div>
<div className={"relative aspect-[5/4] w-full shrink-0"}>
<video className={"absolute inset-0 h-full w-full object-cover"} src={"/hc/holotab-usecase-restaurant.mp4"} aria-label={"HoloTab running the Restaurant Concierge task"} muted loop playsInline preload={"metadata"} />
</div>
<div className={"relative aspect-[5/4] w-full shrink-0"}>
<video className={"absolute inset-0 h-full w-full object-cover"} src={"/hc/holotab-usecase-travel.mp4"} aria-label={"HoloTab running the Travel Planner task"} muted loop playsInline preload={"metadata"} />
</div>
<div className={"relative aspect-[5/4] w-full shrink-0"}>
<video className={"absolute inset-0 h-full w-full object-cover"} src={"/hc/holotab-usecase-marketplace.mp4"} aria-label={"HoloTab running the Marketplace Reseller task"} muted loop playsInline preload={"metadata"} />
</div>
</div>
</div>
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)] max-w-xl text-center"}>
{"Summarize unread emails and draft replies in your tone of voice for approval."}
</p>
</div>
</Fade>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] py-16 sm:py-24"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"From your first task to scheduled automation"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Three steps to get HoloTab working for you."}
</p>
</Fade>
</div>
</div>
<div className={"grid w-full gap-4 sm:grid-cols-3"}>
<Fade >
<div className={"rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3"}>
<div className={"relative -mx-1 mb-1 aspect-[704/424] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)]"}>
<video className={"absolute inset-0 h-full w-full object-cover"} src={"/hc/holotab-how-1.mp4"} aria-hidden={"true"} muted loop playsInline preload={"metadata"} />
</div>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"01"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Download HoloTab"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"HoloTab is free and available on the Chrome Web Store. Install it, then click the extension icon to open the side panel."}
</p>
</div>
</Fade>
<Fade >
<div className={"rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3"}>
<div className={"relative -mx-1 mb-1 aspect-[704/424] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)]"}>
<video className={"absolute inset-0 h-full w-full object-cover"} src={"/hc/holotab-how-2.mp4"} aria-hidden={"true"} muted loop playsInline preload={"metadata"} />
</div>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"02"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Run your first task"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Open the panel, type in a prompt, and run it. The panel shows you HoloTab's reasoning in real time: which tab it's looking at, what it's decided to do next."}
</p>
</div>
</Fade>
<Fade >
<div className={"rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3"}>
<div className={"relative -mx-1 mb-1 aspect-[704/424] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)]"}>
<video className={"absolute inset-0 h-full w-full object-cover"} src={"/hc/holotab-how-3.mp4"} aria-hidden={"true"} muted loop playsInline preload={"metadata"} />
</div>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"03"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Put them on autopilot"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Teach HoloTab a task once, then reuse it. Create \"Routines\" to turn manual chores into scheduled actions."}
</p>
</div>
</Fade>
</div>
<Fade >
<div className={"flex max-w-4xl flex-col items-start gap-4"}>
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)] font-medium lg:whitespace-nowrap"}>
{"HoloTab navigates any website the way you would, so you don't have to."}
</p>
<a className={"group inline-flex items-center gap-1.5 text-[length:var(--text-fs-2)] font-bold text-[var(--color-text-default)]"} href={"https://chromewebstore.google.com/detail/holotab/hlaoiikljjgcjdhkakedfngifaopbcop"} target={"_blank"} rel={"noopener noreferrer"}>
{"Add to Chrome for free"}
<span className={"transition-transform duration-200 group-hover:translate-x-1"} aria-hidden={"true"}>
{"→"}
</span>
</a>
</div>
</Fade>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"built-in-features"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Built-in features"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Type it, say it, record it, or schedule it. HoloTab handles the rest."}
</p>
</Fade>
</div>
</div>
<div className={"grid w-full gap-4 sm:grid-cols-3"}>
<Fade >
<div className={"flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6"}>
<svg className={"h-6 w-6 text-[var(--color-icon-default)]"} viewBox={"0 0 24 24"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z"} stroke={"currentColor"} strokeWidth={"1.6"} />
<path d={"M6 11v1a6 6 0 0 0 12 0v-1M12 19v2.5"} stroke={"currentColor"} strokeWidth={"1.6"} strokeLinecap={"round"} />
</svg>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Voice input"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Can't type right now? Speak your task instead. HoloTab handles voice requests the same way as text."}
</p>
</div>
</Fade>
<Fade >
<div className={"flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6"}>
<svg className={"h-6 w-6 text-[var(--color-icon-default)]"} viewBox={"0 0 24 24"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<circle cx={"12"} cy={"12"} r={"9"} stroke={"currentColor"} strokeWidth={"1.6"} />
<circle cx={"12"} cy={"12"} r={"3.5"} fill={"currentColor"} />
</svg>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Record a routine"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Show HoloTab how to do a task once, and it saves the steps as a reusable routine. Type \"/\" to browse your library."}
</p>
</div>
</Fade>
<Fade >
<div className={"flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6"}>
<svg className={"h-6 w-6 text-[var(--color-icon-default)]"} viewBox={"0 0 24 24"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<rect x={"3.5"} y={"5"} width={"17"} height={"15"} rx={"2"} stroke={"currentColor"} strokeWidth={"1.6"} />
<path d={"M3.5 9.5h17M8 3v3.5M16 3v3.5"} stroke={"currentColor"} strokeWidth={"1.6"} strokeLinecap={"round"} />
<path d={"M12 13v3l2 1.2"} stroke={"currentColor"} strokeWidth={"1.6"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Schedules"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Run any routine automatically every day, week, or month. Set it once and it runs in the background."}
</p>
</div>
</Fade>
</div>
<Fade >
<div className={"max-w-2xl"}>
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]"}>
{"You can type a task, speak it, record it as a routine, or put it on a schedule. HoloTab adapts to how you work and runs tasks the way you want."}
</p>
</div>
</Fade>
</div>
</section>
<section className={"scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"platform"}>
<div className={"mx-auto w-full max-w-6xl px-6"}>
<Fade >
<div className={"brand-bloom-panel flex flex-col gap-10 rounded-[var(--radius-large)] p-6 sm:p-10"} data-keep-light={"true"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default-alt)] tracking-tight max-w-xl"}>
{"What HoloTab uses from the H Platform"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-default-alt)] opacity-75  "}>
{"The same models and agent engine that power our enterprise agents, packaged as a free extension that runs in your own browser."}
</p>
</Fade>
</div>
</div>
<div className={"-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4"}>
<div className={"w-[85%] shrink-0 snap-start sm:w-auto"}>
<div className={"flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 bg-[var(--color-bg-card)]"}>
<span className={"text-style-12-head-med text-[var(--color-text-accent)]"}>
{"Included"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Holo models & inference"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"The Holo computer-use models, hosted by H"}
</p>
</div>
</div>
<div className={"w-[85%] shrink-0 snap-start sm:w-auto"}>
<div className={"flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 bg-[var(--color-bg-card)]"}>
<span className={"text-style-12-head-med text-[var(--color-text-accent)]"}>
{"Included"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Agent execution engine"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Navigates any website the way a person would"}
</p>
</div>
</div>
<div className={"w-[85%] shrink-0 snap-start sm:w-auto"}>
<div className={"flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 bg-[var(--color-bg-card)]"}>
<span className={"text-style-12-head-med text-[var(--color-text-accent)]"}>
{"Included"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Your browser as environment"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Runs in your Chrome, with your sessions"}
</p>
</div>
</div>
<div className={"w-[85%] shrink-0 snap-start sm:w-auto"}>
<div className={"flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 border border-dashed border-white/25"}>
<span className={"text-style-12-head-med text-[var(--color-text-default-alt)] opacity-70"}>
{"Go further"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default-alt)] tracking-tight"}>
{"Run it at scale"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-default-alt)] opacity-75 [&_a]:text-[var(--color-iris-300)] [&_a]:underline"}>
{"API access, cloud browsers and replay with the "}
<Link href={"/agents-api"}>
{"Agents API"}
</Link>
</p>
</div>
</div>
</div>
<Link className={"group w-fit text-[length:var(--text-fs-2)] font-medium text-[var(--color-iris-300)] hover:underline"} href={"/h-platform"}>
{"Explore the H Platform"}

{" "}
<span className={"inline-block transition-transform group-hover:translate-x-1"}>
{"→"}
</span>
</Link>
</div>
</Fade>
</div>
</section>
<section className={"scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"pricing"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Get started with HoloTab today"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Free ways to try H Company."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-4"}>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
<span className={"text-style-14-head-med text-[var(--color-text-accent)]"}>
{"H Platform included:"}
</span>
{" "}

{"Holo models and the agent execution engine, in your own browser or on your device."}

{" "}
<Link className={"whitespace-nowrap text-[var(--color-text-accent)] hover:underline"} href={"/holotab"}>
{"About HoloTab"}

{" →"}
</Link>
</p>
<div className={"grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"} data-keep-light={"true"} style={{"--rows": "3", "--cols": "3", "--md-cols": "3"} as React.CSSProperties}>
<div className={"grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0"}>
<div className={"flex flex-col gap-4 p-6"}>
<div className={"flex flex-col gap-1.5"}>
<div className={"flex flex-wrap items-start gap-2"}>
<h3 className={"text-style-16-head-med text-[var(--color-title-default)] tracking-tight"}>
{"HoloTab"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"Free"}
</p>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"AI browser companion on the Chrome Web Store."}
</p>
</div>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit"} target={"_blank"} rel={"noopener noreferrer"} href={"https://chromewebstore.google.com/detail/holotab/hlaoiikljjgcjdhkakedfngifaopbcop"}>
{"Add to Chrome"}
</a>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Routines, schedules and voice input"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"No signup required"}
</p>
</span>
</li>
</ul>
</div>
<div className={"grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0"}>
<div className={"flex flex-col gap-4 p-6"}>
<div className={"flex flex-col gap-1.5"}>
<div className={"flex flex-wrap items-start gap-2"}>
<h3 className={"text-style-16-head-med text-[var(--color-title-default)] tracking-tight"}>
{"HoloDesktop CLI"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"Free"}
</p>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Run the agent on-device. Inference through the Models API, or self-hosted."}
</p>
</div>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} target={"_blank"} rel={"noopener noreferrer"} href={"https://github.com/hcompai/holo-desktop-cli"}>
{"View on GitHub"}
</a>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Runs on your device"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Models API or self-hosted inference"}
</p>
</span>
</li>
</ul>
</div>
<div className={"grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0"}>
<div className={"flex flex-col gap-4 p-6"}>
<div className={"flex flex-col gap-1.5"}>
<div className={"flex flex-wrap items-start gap-2"}>
<h3 className={"text-style-16-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Open weights"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"Free"}
</p>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Download Holo model checkpoints on Hugging Face and run them yourself."}
</p>
</div>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} target={"_blank"} rel={"noopener noreferrer"} href={"https://huggingface.co/Hcompany"}>
{"View on Hugging Face"}
</a>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Serve with vLLM or llama.cpp"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Screenshots and prompts stay on your network"}
</p>
</span>
</li>
</ul>
</div>
</div>
</div>
</Fade>
</div>
</section>
<section className={"scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"faq"}>

<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Your questions, answered"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Common questions about HoloTab, including how to use it, safety, privacy, and support."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"max-w-3xl"}>
<Faq items={[{"question":"What is HoloTab?","answer":"HoloTab is a free AI browser companion from H Company: a Chrome extension that opens as a side panel, navigates websites and takes action for you on the tasks you'd rather skip. It works on virtually any website without integrations, shows its reasoning live, and can save tasks as Routines that run on a schedule."},{"question":"What can HoloTab do?","answer":"HoloTab automates real-world tasks across the web: it summarizes unread emails and drafts replies in your tone for approval, finds and books restaurant tables and syncs them to your calendar, researches flights and hotels to build a day-by-day itinerary within budget, and drafts marketplace listings on eBay and Vinted at market prices. You can type a task, speak it, record it as a routine, or schedule it."},{"question":"Which model powers HoloTab?","answer":"HoloTab runs on Holo4, our newest model family: Holo4 27B by default for complex tasks, or Holo4 35B-A3B for fast, simple ones. The same models power the Agents API and are available on the Models API."},{"question":"How is HoloTab different from Comet or OpenClaw?","answer":"HoloTab is a lightweight Chrome side panel, not a full browser replacement. It focuses on fast, visible, everyday automation (Routines, scheduling, and voice), and it is free and easy to install."},{"question":"How do I download HoloTab?","answer":"HoloTab is free and available on the Chrome Web Store. Install it, pin it to your toolbar, then click the extension icon to open the side panel and start your first task."},{"question":"What are routines? How can I use them?","answer":"Routines let you teach HoloTab a task once and reuse it. Show it the steps a single time, and it turns them into a saved automation you can run on demand or schedule to repeat automatically."},{"question":"How do you address the security concerns raised by ANSSI/CERT-FR regarding agentic AI tools?","answer":"We follow the guidance published by ANSSI and CERT-FR on agentic AI: HoloTab runs with least-privilege access, surfaces every action it takes in real time, and lets you pause or stop it instantly. We also run regular red-team testing against prompt injection and other adversarial scenarios."},{"question":"Am I responsible for what HoloTab does?","answer":"You stay in control. HoloTab shows its reasoning and actions as it works, and you can review, pause, or redirect it at any point before a task completes. We recommend supervising sensitive actions like payments or messages until you're familiar with how it behaves."},{"question":"What are the best practices for using HoloTab safely?","answer":"Start with low-stakes tasks, review Routines before scheduling them, avoid sharing highly sensitive credentials in a prompt, and keep the side panel open so you can watch HoloTab's actions as they happen."},{"question":"What should I do if HoloTab starts behaving unexpectedly?","answer":"Click Stop in the side panel to halt the task immediately. You can review the action log to see exactly what happened, then report it to us at support@hcompany.ai so we can investigate."},{"question":"How do I know what HoloTab is doing at any given moment?","answer":"The side panel streams HoloTab's reasoning live: which tab it's on, what it's reading, and what it's about to do next, so nothing happens off-screen."},{"question":"What is a prompt injection attack?","answer":"It's when malicious instructions hidden in a webpage try to hijack an agent's behavior. HoloTab is built to recognize and resist these attempts, and you can always interrupt a task if something looks off."},{"question":"What are the main risks of using HoloTab?","answer":"As with any agent that can act on your behalf, the main risks are unintended actions on sensitive accounts or sites with malicious content. Reviewing actions in real time and starting with lower-stakes tasks minimizes this."},{"question":"What autonomy modes are available, and which should I use?","answer":"HoloTab offers a supervised mode, where it asks for confirmation before key actions, and an autonomous mode, where it completes routines end to end. We recommend supervised mode for anything involving payments or messages, and autonomous mode for routines you've already reviewed."},{"question":"How does HoloTab ensure your privacy and safety?","answer":"Your data stays tied to your account and is never used to train models without consent. HoloTab only accesses the tabs and information needed to complete the task you've described. The Chrome extension is covered by H Company's Privacy Policy."},{"question":"Can I review what HoloTab is doing?","answer":"Yes. Every action appears in the side panel as it happens, and you can open the full activity log at any time to see exactly what was read, clicked, or typed."},{"question":"How does HoloTab work on websites without integrations?","answer":"HoloTab doesn't rely on API integrations. It navigates the visual interface the way a person would (clicking, typing, and reading the page), so it works on virtually any website without setup."}]} />
</div>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)] max-w-3xl"}>
{"Still have questions?"}

{" "}
<a className={"font-medium text-[var(--color-text-accent)] hover:underline"} href={"https://hcompany.ai/contact?from=faq#fill-out-the-form"}>
{"Talk to an engineer"}

{" "}
<span aria-hidden={"true"}>
{"→"}
</span>
</a>
</p>
</Fade>
<Fade >
<div className={"max-w-3xl"}>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Read the"}

{" "}
<a className={"text-[var(--color-text-accent)] underline underline-offset-2"} href={"https://hcompany.ai/holotab/privacy-policy"}>
{"privacy policy"}
</a>
{" "}

{"that covers the HoloTab Chrome extension."}
</p>
</div>
</Fade>
</div>
</section>
<section className={"scroll-mt-20 bg-[var(--color-bg-primary)] py-12 sm:py-20"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:gap-12"}>
<div className={"flex flex-col gap-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Ready to try HoloTab?"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Download the extension and hand off your browsing tasks. Free, no signup, works on any website."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-3 sm:flex-row"}>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} target={"_blank"} rel={"noopener noreferrer"} href={"https://hub.hcompany.ai/holotab/introduction"}>
{"Read the docs"}
</a>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)] max-sm:order-first"} target={"_blank"} rel={"noopener noreferrer"} href={"https://chromewebstore.google.com/detail/holotab/hlaoiikljjgcjdhkakedfngifaopbcop"}>
{"Add to Chrome"}
</a>
</div>
</Fade>
</div>
</div>
</section>
<div className={"fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 motion-reduce:transition-none sm:bottom-6 sm:right-6 pointer-events-none translate-y-3 opacity-0"} aria-hidden={"true"}>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-6 py-3 text-[length:var(--text-fs-3)] leading-[var(--text-fs-3--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] shadow-[0_10px_30px_rgb(4_4_5_/18%)]"} target={"_blank"} rel={"noopener noreferrer"} href={"https://chromewebstore.google.com/detail/holotab/hlaoiikljjgcjdhkakedfngifaopbcop"} tabIndex={-1}>
{"Add to Chrome"}

{" "}
<span aria-hidden={"true"}>
{"→"}
</span>
</a>
</div>
    </>
  );
}
