import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/reference/faq";
import { Fade } from "@/components/reference/fade";
import { HeroWash } from "@/components/reference/hero-wash";

export const metadata: Metadata = { title: { absolute: "Pricing | Twinlink" } };

export default function PricingPage() {
  return (
    <>
      <HeroWash />
<section className={"product-hero-section pt-32 sm:pt-36  "}>
<div className={"pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-grey-900)]"} aria-hidden={"true"} style={{"opacity": "var(--hero-mix, 100%)"} as React.CSSProperties}>
<div className={"absolute -bottom-24 -left-24 h-[24rem] w-[24rem] rounded-[var(--radius-rounded)] bg-[var(--color-iris-600)] opacity-30 blur-[65px]"} />
</div>
<div className={"relative z-10 mx-auto w-full max-w-6xl px-6 "}>
<div className={"flex flex-col gap-10 sm:gap-12"}>
<div className={"flex flex-col gap-6"} data-hero-copy={"true"}>
<Fade >
<div className={"flex items-center justify-between gap-6"}>
<h1 className={"text-style-24-head-med text-[var(--color-title-default-alt)] tracking-tight"}>
{"Pricing"}
</h1>
</div>
</Fade>
<div className={"grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-48-head-med text-[var(--color-title-default-alt)] tracking-tight"}>
{"Start free and scale as you build"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-default-alt)] opacity-75"}>
{"Session plans for the Agents API, per-token rates for the Models API, and free ways to try OrinTab, Orin Desktop CLI, and open weights on Hugging Face."}
</p>
</Fade>
</div>
<Fade className={"mt-2"}>
<div className={"flex flex-col gap-3 sm:flex-row sm:flex-wrap"}>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-primary)] text-[var(--color-text-default)] hover:bg-[var(--color-bg-secondary)]"} data-hero-button={"primary"} href={"/coming-soon"}>
{"Sign up"}
</Link>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-white/70 bg-transparent text-[var(--color-text-default-alt)] hover:bg-[var(--color-bg-primary)]/10"} data-hero-button={"outline"} href={"/contact"}>
{"Talk to sales"}
</Link>
</div>
</Fade>
</div>
<Fade >
<ul className={"flex flex-wrap gap-3"}>
<li >
<a className={"block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]"} href={"#agents"}>
<span className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]"}>
{"Agents API"}
</span>
</a>
</li>
<li >
<a className={"block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]"} href={"#models"}>
<span className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]"}>
{"Models API"}
</span>
</a>
</li>
<li >
<a className={"block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]"} href={"#enterprise"}>
<span className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]"}>
{"Enterprise"}
</span>
</a>
</li>
<li >
<a className={"block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]"} href={"#free"}>
<span className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]"}>
{"Free ways to try"}
</span>
</a>
</li>
</ul>
</Fade>
</div>
</div>
</section>
<section className={"scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"agents"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Agents API"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Session plans for managed computer-use agents. Pay for concurrency; model usage is billed at cost."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-4"}>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
<span className={"text-style-14-head-med text-[var(--color-text-accent)]"}>
{"Orin Platform included:"}
</span>
{" "}

{"Orin models, agent execution engine, cloud and local environments, console with sessions and replay, vaults. Workflow orchestration on Enterprise."}

{" "}
<Link className={"whitespace-nowrap text-[var(--color-text-accent)] hover:underline"} href={"/agents-api"}>
{"About the Agents API"}

{" →"}
</Link>
</p>
<div className={"grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"} data-keep-light={"true"} style={{"--rows": "7", "--cols": "4", "--md-cols": "2"} as React.CSSProperties}>
<div className={"grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0"}>
<div className={"flex flex-col gap-4 p-6"}>
<div className={"flex flex-col gap-1.5"}>
<div className={"flex flex-wrap items-start gap-2"}>
<h3 className={"text-style-16-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Free"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"$0"}
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans"}>
{"per month"}
</span>
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/coming-soon"}>
{"Build for free"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Up to 3 concurrent agents"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"~60 sessions / month*"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Model cost: free"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Top-ups capped at token fair usage"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Datacenter proxy"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Rate limits apply"}
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
{"Builder"}
</h3>
<span className={"shrink-0 rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] px-2 py-0.5 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)]"}>
{"Popular"}
</span>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"$20"}
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans"}>
{"per month"}
</span>
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit"} href={"/coming-soon"}>
{"Choose Builder"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Up to 10 concurrent agents"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"~1,000 sessions / month*"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"First $20 at model cost"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Top-ups at model cost + 20%"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Residential proxy"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Rate limits apply"}
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
{"Startup"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"$200"}
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans"}>
{"per month"}
</span>
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/coming-soon"}>
{"Choose Startup"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Up to 100 concurrent agents"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"~10,000 sessions / month*"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"First $200 at model cost"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Top-ups at model cost + 20%"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Residential proxy"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Rate limits apply"}
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
{"Enterprise"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"Custom pricing"}
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/contact"}>
{"Talk to sales"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Highest concurrency, no cap"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Custom sessions"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Negotiated markup or token costs"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Best rate limits"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Early model access, workflow orchestration"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 hidden md:block"} />
</ul>
</div>
</div>
<p className={"text-style-12-body-reg text-[var(--color-text-tertiary)] max-w-2xl"}>
{"*Number of sessions can vary depending on task complexity and models used."}
</p>
</div>
</Fade>
</div>
</section>
<section className={"scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"models"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Models API"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Per-token rates. Free tier with rate-limited access to Orin 3.1 35B-A3B, no credit card. Pay as you go on every model."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-4"}>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
<span className={"text-style-14-head-med text-[var(--color-text-accent)]"}>
{"Orin Platform included:"}
</span>
{" "}

{"Orin models and Twinlink-hosted inference, with zero data retention. Open weights let you self-host."}

{" "}
<Link className={"whitespace-nowrap text-[var(--color-text-accent)] hover:underline"} href={"/models-api"}>
{"About the Models API"}

{" →"}
</Link>
</p>
<div className={"grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"} data-keep-light={"true"} style={{"--rows": "6", "--cols": "4", "--md-cols": "2"} as React.CSSProperties}>
<div className={"grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0"}>
<div className={"flex flex-col gap-4 p-6"}>
<div className={"flex flex-col gap-1.5"}>
<div className={"flex flex-wrap items-start gap-2"}>
<h3 className={"text-style-16-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Orin 27B"}
</h3>
<span className={"shrink-0 rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] px-2 py-0.5 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)]"}>
{"Flagship · New"}
</span>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"$0.40"}
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans"}>
{"input / 1M tokens"}
</span>
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit"} href={"/coming-soon"}>
{"Get API key"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$0.04 cached input / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$3.00 output / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"262,144 tokens context"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Dense, 27B"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Paid tier, with higher rate limits"}
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
{"Orin 35B-A3B"}
</h3>
<span className={"shrink-0 rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] px-2 py-0.5 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)]"}>
{"Fast · New"}
</span>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"$0.30"}
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans"}>
{"input / 1M tokens"}
</span>
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/coming-soon"}>
{"Get API key"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$0.03 cached input / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$2.00 output / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"262,144 tokens context"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"MoE, 35B total, 3B active"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Paid tier, with higher rate limits"}
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
{"Orin 3.1 35B-A3B"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"$0.25"}
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans"}>
{"input / 1M tokens"}
</span>
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/coming-soon"}>
{"Get API key"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$0.025 cached input / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$1.80 output / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"65,536 tokens context"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"MoE, 35B total, 3B active"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Free tier (10 RPM) and paid tier"}
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
{"Orin 3 122B-A10B"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"$0.40"}
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans"}>
{"input / 1M tokens"}
</span>
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/coming-soon"}>
{"Get API key"}
</Link>
</div>
<ul className={"md:contents"}>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$0.04 cached input / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"$3.00 output / 1M"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"65,536 tokens context"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"MoE, 122B total, 10B active"}
</p>
</span>
</li>
<li className={"border-t border-[var(--color-stroke-default)] px-6 py-3.5 "}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Paid tier, with higher rate limits"}
</p>
</span>
</li>
</ul>
</div>
</div>
<p className={"text-style-12-body-reg text-[var(--color-text-tertiary)] max-w-2xl"}>
{"After you pay, it can take up to 15 minutes for the system to process your payment and credit your balance."}
</p>
</div>
</Fade>
</div>
</section>
<section className={"scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"enterprise"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"flex flex-col gap-5"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Enterprise pricing and deployment"}
</h2>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-4"}>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
<span className={"text-style-14-head-med text-[var(--color-text-accent)]"}>
{"Orin Platform included:"}
</span>
{" "}

{"The full platform, from Orin models and the agent execution engine to workflow orchestration, governance and an embedded engineering team."}

{" "}
<Link className={"whitespace-nowrap text-[var(--color-text-accent)] hover:underline"} href={"/enterprise"}>
{"Learn more"}

{" →"}
</Link>
</p>
<div className={"grid overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:grid-cols-2"} data-keep-light={"true"}>
<div className={"flex flex-col gap-4 p-6"}>
<div className={"flex flex-col gap-1.5"}>
<div className={"flex flex-wrap items-start gap-2"}>
<h3 className={"text-style-16-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Enterprise"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"Custom pricing"}
</p>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Custom rates, dedicated support, and agents that run on your systems. Talk to us about the right setup for your team."}
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit"} href={"/contact"}>
{"Talk to sales"}
</Link>
</div>
<ul className={"flex flex-col border-t border-[var(--color-stroke-default)] md:border-l md:border-t-0"}>
<li className={"border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0"}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Highest concurrency, no cap"}
</p>
</span>
</li>
<li className={"border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0"}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Negotiated markup or token costs"}
</p>
</span>
</li>
<li className={"border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0"}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Best rate limits"}
</p>
</span>
</li>
<li className={"border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0"}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Early model access, workflow orchestration"}
</p>
</span>
</li>
<li className={"border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0"}>
<span className={"flex items-start gap-2"}>
<svg className={"mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 16 16"} fill={"none"} xmlns={"http://www.w3.org/2000/svg"} aria-hidden={"true"}>
<path d={"M3.5 8.5L6.5 11.5L12.5 4.5"} stroke={"currentColor"} strokeWidth={"1.4"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Forward Deployed Engineers, from discovery to scale"}
</p>
</span>
</li>
</ul>
</div>
</div>
</Fade>
</div>
</section>
<section className={"scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24"} id={"free"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"flex flex-col gap-5"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Free ways to try Twinlink"}
</h2>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-4"}>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
<span className={"text-style-14-head-med text-[var(--color-text-accent)]"}>
{"Orin Platform included:"}
</span>
{" "}

{"Orin models and the agent execution engine, in your own browser or on your device."}

{" "}
<Link className={"whitespace-nowrap text-[var(--color-text-accent)] hover:underline"} href={"/orin-tab"}>
{"About OrinTab"}

{" →"}
</Link>
</p>
<div className={"grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"} data-keep-light={"true"} style={{"--rows": "3", "--cols": "3", "--md-cols": "3"} as React.CSSProperties}>
<div className={"grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0"}>
<div className={"flex flex-col gap-4 p-6"}>
<div className={"flex flex-col gap-1.5"}>
<div className={"flex flex-wrap items-start gap-2"}>
<h3 className={"text-style-16-head-med text-[var(--color-title-default)] tracking-tight"}>
{"OrinTab"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"Free"}
</p>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"AI browser companion on the Chrome Web Store."}
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit"} href={"/coming-soon"}>
{"Add to Chrome"}
</Link>
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
{"Orin Desktop CLI"}
</h3>
</div>
<p className={"text-style-16-head-med text-[var(--color-text-default)] font-mono"}>
{"Free"}
</p>
<p className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Run the agent on-device. Inference through the Models API, or self-hosted."}
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/coming-soon"}>
{"View on GitHub"}
</Link>
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
{"Download Orin model checkpoints on Hugging Face and run them yourself."}
</p>
</div>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} href={"/coming-soon"}>
{"View on Hugging Face"}
</Link>
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
{"Plans, billing, credits, and free access."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"max-w-3xl"}>
<Faq items={[{"question":"Which plan should I pick?","answer":"Start free, then pick the plan that matches your concurrency and model needs. Enterprise terms on request."},{"question":"Why are session counts approximate?","answer":"Number of sessions can vary depending on task complexity and models used."},{"question":"How does inference billing work?","answer":"Inference is billed per model and per million input and output tokens. Rates vary by model and may change over time. Refer to our terms of use for current details."},{"question":"Do you offer a free tier?","answer":"After registering on Orin Platform, every user is assigned to the free tier, which provides rate-limited access to Orin 3.1 35B-A3B. Orin models require a paid tier. If you need a higher rate limit, add credits to move to a paid tier."},{"question":"Do credits expire?","answer":"Per our terms of use, we reserve the right to expire unused credits one year after purchase."},{"question":"I can't see my credits. What should I do?","answer":"Payment can take a few minutes to process, please allow up to 15 minutes. If your credits still do not appear, confirm that you have been charged and have received a payment receipt or invoice. If you have not been charged, your card may have been rejected, try again with another one. If you can confirm you have been charged and still do not see credits, contact us at hello@twinlink.example with your purchase so we can investigate."},{"question":"What is the refund policy?","answer":"According to our terms of use, credits are not refundable by default. Depending on your profile and region, refund obligations may apply. Please check our terms of use to learn more."},{"question":"Is OrinTab free?","answer":"OrinTab is free and available on the Chrome Web Store, with no signup required."},{"question":"How can I contact support?","answer":"Reach out to us at hello@twinlink.example specifying the nature of your request."}]} />
</div>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)] max-w-3xl"}>
{"Still have questions?"}

{" "}
<Link className={"font-medium text-[var(--color-text-accent)] hover:underline"} href={"/contact"}>
{"Talk to an engineer"}

{" "}
<span aria-hidden={"true"}>
{"→"}
</span>
</Link>
</p>
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
{"Build with the highest-quality operational agents"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Start free, then pick the plan that matches your concurrency and model needs. Enterprise terms on request."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-3 sm:flex-row"}>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)]"} href={"/coming-soon"}>
{"Sign up"}
</Link>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} href={"/contact"}>
{"Talk to sales"}
</Link>
</div>
</Fade>
</div>
</div>
</section>
<div className={"fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 motion-reduce:transition-none sm:bottom-6 sm:right-6 pointer-events-none translate-y-3 opacity-0"} aria-hidden={"true"}>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-6 py-3 text-[length:var(--text-fs-3)] leading-[var(--text-fs-3--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] shadow-[0_10px_30px_rgb(4_4_5_/18%)]"} href={"/coming-soon"} tabIndex={-1}>
{"Sign up"}

{" "}
<span aria-hidden={"true"}>
{"→"}
</span>
</Link>
</div>
    </>
  );
}
