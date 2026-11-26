import type { Metadata } from "next";
import { BRAND } from "@/components/reference/brand";
import { Fade } from "@/components/reference/fade";
import { Faq } from "@/components/reference/faq";
import { HeroWash } from "@/components/reference/hero-wash";
import { MediaSlot } from "@/components/reference/media-slot";

export const metadata: Metadata = { title: { absolute: `${BRAND.tab} | ${BRAND.name}` } };

export default function OrinTabPage() {
  return (
    <>
      <HeroWash />
<section className="product-hero-section pt-32 sm:pt-36 product-hero-section--compact ">
<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-grey-900)]" aria-hidden="true" style={{"opacity": "var(--hero-mix, 100%)"} as React.CSSProperties}>
<div className="absolute -bottom-24 -left-24 h-[24rem] w-[24rem] rounded-[var(--radius-rounded)] bg-[var(--color-iris-600)] opacity-30 blur-[65px]" />
</div>
<div className="relative z-10 mx-auto w-full max-w-6xl px-6 ">
<div className="flex flex-col gap-10 sm:gap-12">
<div className="flex flex-col gap-6" data-hero-copy="true">
<Fade >
<div className="flex items-center justify-between gap-6">
<h1 className="text-style-24-head-med text-[var(--color-title-default-alt)] tracking-tight">
{BRAND.tab}
</h1>
</div>
</Fade>
<div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-48-head-med text-[var(--color-title-default-alt)] tracking-tight">
{BRAND.tab}{" does the work. You get the results."}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-default-alt)] opacity-75">
{"[Add product description]"}
</p>
</Fade>
</div>
<Fade className="mt-2">
<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-primary)] text-[var(--color-text-default)] hover:bg-[var(--color-bg-secondary)]" data-hero-button="primary" href="/coming-soon">
{"Add to Chrome"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-white/70 bg-transparent text-[var(--color-text-default-alt)] hover:bg-[var(--color-bg-primary)]/10" data-hero-button="outline" href="/coming-soon">
{"Read the docs"}
</a>
</div>
</Fade>
</div>
</div>
</div>
</section>
<section className="bg-[var(--color-bg-primary)] py-16 sm:py-24">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"You've got better things to do than browse. Leave it to "}{BRAND.tab}{"."}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]   ">
{"[Add product description]"}
</p>
</Fade>
</div>
</div>
<Fade >
<div className="flex w-full flex-col items-center gap-5">
<div className="flex max-w-full overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-secondary)]">
<div className="relative flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] motion-safe:scroll-smooth p-1  " role="tablist" aria-label={`Use case selection`}>
<button className="whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-white text-[var(--color-grey-900)] shadow-[0_1px_3px_rgba(0,0,0,0.08)]" type="button" role="tab" aria-selected="true">
{"Inbox Manager"}
</button>
<button className="whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]" type="button" role="tab" aria-selected="false">
{"Restaurant Concierge"}
</button>
<button className="whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]" type="button" role="tab" aria-selected="false">
{"Travel Planner"}
</button>
<button className="whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]" type="button" role="tab" aria-selected="false">
{"Marketplace Reseller"}
</button>
</div>
</div>
<div className="w-full max-w-2xl overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)]">
<div className="flex transition-transform duration-500 ease-in-out" style={{"transform": "translateX(-0%)"} as React.CSSProperties}>
<div className="relative aspect-[5/4] w-full shrink-0">
<MediaSlot className="absolute inset-0 h-full w-full object-cover" />
</div>
<div className="relative aspect-[5/4] w-full shrink-0">
<MediaSlot className="absolute inset-0 h-full w-full object-cover" />
</div>
<div className="relative aspect-[5/4] w-full shrink-0">
<MediaSlot className="absolute inset-0 h-full w-full object-cover" />
</div>
<div className="relative aspect-[5/4] w-full shrink-0">
<MediaSlot className="absolute inset-0 h-full w-full object-cover" />
</div>
</div>
</div>
<p className="text-style-16-body-reg text-[var(--color-text-secondary)] max-w-xl text-center">
{"[Add model description]"}
</p>
</div>
</Fade>
</div>
</section>
<section className="bg-[var(--color-bg-primary)] py-16 sm:py-24">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"From your first task to scheduled automation"}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]   ">
{"Three steps to get "}{BRAND.tab}{" working for you."}
</p>
</Fade>
</div>
</div>
<div className="grid w-full gap-4 sm:grid-cols-3">
<Fade >
<div className="rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3">
<div className="relative -mx-1 mb-1 aspect-[704/424] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)]">
<MediaSlot className="absolute inset-0 h-full w-full object-cover" />
</div>
<span className="font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]">
{"01"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Download "}{BRAND.tab}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"[Add product description]"}
</p>
</div>
</Fade>
<Fade >
<div className="rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3">
<div className="relative -mx-1 mb-1 aspect-[704/424] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)]">
<MediaSlot className="absolute inset-0 h-full w-full object-cover" />
</div>
<span className="font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]">
{"02"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Run your first task"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"[Add product description]"}
</p>
</div>
</Fade>
<Fade >
<div className="rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3">
<div className="relative -mx-1 mb-1 aspect-[704/424] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)]">
<MediaSlot className="absolute inset-0 h-full w-full object-cover" />
</div>
<span className="font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]">
{"03"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Put them on autopilot"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"[Add product description]"}
</p>
</div>
</Fade>
</div>
<Fade >
<div className="flex max-w-4xl flex-col items-start gap-4">
<p className="text-style-16-body-reg text-[var(--color-text-secondary)] font-medium lg:whitespace-nowrap">
{"[Add product description]"}
</p>
<a className="group inline-flex items-center gap-1.5 text-[length:var(--text-fs-2)] font-bold text-[var(--color-text-default)]" href="/coming-soon">
{"Add to Chrome for free"}
<span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
{"→"}
</span>
</a>
</div>
</Fade>
</div>
</section>
<section className="bg-[var(--color-bg-primary)] py-16 sm:py-24" id="built-in-features">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Built-in features"}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]   ">
{"Type it, say it, record it, or schedule it. "}{BRAND.tab}{" handles the rest."}
</p>
</Fade>
</div>
</div>
<div className="grid w-full gap-4 sm:grid-cols-3">
<Fade >
<div className="flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6">
<svg className="h-6 w-6 text-[var(--color-icon-default)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.6" />
<path d="M6 11v1a6 6 0 0 0 12 0v-1M12 19v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
</svg>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Voice input"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Can't type right now? Speak your task instead. "}{BRAND.tab}{" handles voice requests the same way as text."}
</p>
</div>
</Fade>
<Fade >
<div className="flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6">
<svg className="h-6 w-6 text-[var(--color-icon-default)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
<circle cx="12" cy="12" r="3.5" fill="currentColor" />
</svg>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Record a routine"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Show "}{BRAND.tab}{" how to do a task once, and it saves the steps as a reusable routine. Type \"/\" to browse your library."}
</p>
</div>
</Fade>
<Fade >
<div className="flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6">
<svg className="h-6 w-6 text-[var(--color-icon-default)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
<path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
<path d="M12 13v3l2 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Schedules"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Run any routine automatically every day, week, or month. Set it once and it runs in the background."}
</p>
</div>
</Fade>
</div>
<Fade >
<div className="max-w-2xl">
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]">
{"[Add product description]"}
</p>
</div>
</Fade>
</div>
</section>
<section className="scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24" id="platform">
<div className="mx-auto w-full max-w-6xl px-6">
<Fade >
<div className="brand-bloom-panel flex flex-col gap-10 rounded-[var(--radius-large)] p-6 sm:p-10" data-keep-light="true">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default-alt)] tracking-tight max-w-xl">
{"What "}{BRAND.tab}{" uses from the "}{BRAND.platform}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-default-alt)] opacity-75  ">
{"[Add product description]"}
</p>
</Fade>
</div>
</div>
<div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
<div className="w-[85%] shrink-0 snap-start sm:w-auto">
<div className="flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 bg-[var(--color-bg-card)]">
<span className="text-style-12-head-med text-[var(--color-text-accent)]">
{"Included"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{BRAND.model}{" models & inference"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"The "}{BRAND.model}{" computer-use models, hosted by "}{BRAND.name}
</p>
</div>
</div>
<div className="w-[85%] shrink-0 snap-start sm:w-auto">
<div className="flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 bg-[var(--color-bg-card)]">
<span className="text-style-12-head-med text-[var(--color-text-accent)]">
{"Included"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Agent execution engine"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Navigates any website the way a person would"}
</p>
</div>
</div>
<div className="w-[85%] shrink-0 snap-start sm:w-auto">
<div className="flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 bg-[var(--color-bg-card)]">
<span className="text-style-12-head-med text-[var(--color-text-accent)]">
{"Included"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"[Add feature claim]"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</div>
</div>
<div className="w-[85%] shrink-0 snap-start sm:w-auto">
<div className="flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 border border-dashed border-white/25">
<span className="text-style-12-head-med text-[var(--color-text-default-alt)] opacity-70">
{"Go further"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default-alt)] tracking-tight">
{"Run it at scale"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-default-alt)] opacity-75 [&_a]:text-[var(--color-iris-300)] [&_a]:underline">
{"API access, cloud browsers and replay with the "}
<a href="/agents-api">
{"Agents API"}
</a>
</p>
</div>
</div>
</div>
<a className="group w-fit text-[length:var(--text-fs-2)] font-medium text-[var(--color-iris-300)] hover:underline" href="/platform">
{"Explore the "}{BRAND.platform}

{" "}
<span className="inline-block transition-transform group-hover:translate-x-1">
{"→"}
</span>
</a>
</div>
</Fade>
</div>
</section>
<section className="scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24" id="pricing">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Get started with "}{BRAND.tab}{" today"}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]   ">
{"Free ways to try "}{BRAND.name}{"."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className="flex flex-col gap-4">
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
<span className="text-style-14-head-med text-[var(--color-text-accent)]">
{BRAND.platform}{" included:"}
</span>
{" "}

{BRAND.model}{" models and the agent execution engine, in your own browser or on your device."}

{" "}
<a className="whitespace-nowrap text-[var(--color-text-accent)] hover:underline" href="/orin-tab">
{"About "}{BRAND.tab}

{" →"}
</a>
</p>
<div className="grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" data-keep-light="true" style={{"--rows": "3", "--cols": "3", "--md-cols": "3"} as React.CSSProperties}>
<div className="grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0">
<div className="flex flex-col gap-4 p-6">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-start gap-2">
<h3 className="text-style-16-head-med text-[var(--color-title-default)] tracking-tight">
{BRAND.tab}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"Free"}
</p>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add offer terms]"}
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit" href="/coming-soon">
{"Add to Chrome"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</span>
</li>
</ul>
</div>
<div className="grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0">
<div className="flex flex-col gap-4 p-6">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-start gap-2">
<h3 className="text-style-16-head-med text-[var(--color-title-default)] tracking-tight">
{BRAND.desktop}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"Free"}
</p>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add offer terms]"}
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"View on GitHub"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</span>
</li>
</ul>
</div>
<div className="grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0">
<div className="flex flex-col gap-4 p-6">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-start gap-2">
<h3 className="text-style-16-head-med text-[var(--color-title-default)] tracking-tight">
{"Open weights"}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"Free"}
</p>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add offer terms]"}
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"View on Hugging Face"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
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
<section className="scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24" id="faq">

<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Your questions, answered"}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]   ">
{"Common questions about "}{BRAND.tab}{", including how to use it, safety, privacy, and support."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className="max-w-3xl">
<Faq questions={[`What is ${BRAND.tab}?`, `What can ${BRAND.tab} do?`, `Which model powers ${BRAND.tab}?`, `How is ${BRAND.tab} different from Comet or OpenClaw?`, `How do I download ${BRAND.tab}?`, `What are routines? How can I use them?`, `How do you address the security concerns raised by ANSSI/CERT-FR regarding agentic AI tools?`, `Am I responsible for what ${BRAND.tab} does?`, `What are the best practices for using ${BRAND.tab} safely?`, `What should I do if ${BRAND.tab} starts behaving unexpectedly?`, `How do I know what ${BRAND.tab} is doing at any given moment?`, `What is a prompt injection attack?`, `What are the main risks of using ${BRAND.tab}?`, `What autonomy modes are available, and which should I use?`, `How does ${BRAND.tab} ensure your privacy and safety?`, `Can I review what ${BRAND.tab} is doing?`, `How does ${BRAND.tab} work on websites without integrations?`]} />
</div>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)] max-w-3xl">
{"Still have questions?"}

{" "}
<a className="font-medium text-[var(--color-text-accent)] hover:underline" href="/coming-soon">
{"Talk to an engineer"}

{" "}
<span aria-hidden="true">
{"→"}
</span>
</a>
</p>
</Fade>
<Fade >
<div className="max-w-3xl">
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Read the"}

{" "}
<a className="text-[var(--color-text-accent)] underline underline-offset-2" href="/coming-soon">
{"privacy policy"}
</a>
{" "}

{"that covers the "}{BRAND.tab}{" Chrome extension."}
</p>
</div>
</Fade>
</div>
</section>
<section className="scroll-mt-20 bg-[var(--color-bg-primary)] py-12 sm:py-20">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:gap-12">
<div className="flex flex-col gap-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Ready to try "}{BRAND.tab}{"?"}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]   ">
{"[Add product description]"}
</p>
</Fade>
</div>
</div>
<Fade >
<div className="flex flex-col gap-3 sm:flex-row">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]" href="/coming-soon">
{"Read the docs"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)] max-sm:order-first" href="/coming-soon">
{"Add to Chrome"}
</a>
</div>
</Fade>
</div>
</div>
</section>
<div className="fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 motion-reduce:transition-none sm:bottom-6 sm:right-6 pointer-events-none translate-y-3 opacity-0" aria-hidden="true">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-6 py-3 text-[length:var(--text-fs-3)] leading-[var(--text-fs-3--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] shadow-[0_10px_30px_rgb(4_4_5_/18%)]" href="/coming-soon" tabIndex={-1}>
{"Add to Chrome"}

{" "}
<span aria-hidden="true">
{"→"}
</span>
</a>
</div>
    </>
  );
}
