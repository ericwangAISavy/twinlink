import type { Metadata } from "next";
import { BRAND } from "@/components/reference/brand";
import { Fade } from "@/components/reference/fade";
import { Faq } from "@/components/reference/faq";
import { HeroWash } from "@/components/reference/hero-wash";

export const metadata: Metadata = { title: { absolute: `${"Pricing"} | ${BRAND.name}` } };

export default function PricingPage() {
  return (
    <>
      <HeroWash />
<section className="product-hero-section pt-32 sm:pt-36  ">
<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-grey-900)]" aria-hidden="true" style={{"opacity": "var(--hero-mix, 100%)"} as React.CSSProperties}>
<div className="absolute -bottom-24 -left-24 h-[24rem] w-[24rem] rounded-[var(--radius-rounded)] bg-[var(--color-iris-600)] opacity-30 blur-[65px]" />
</div>
<div className="relative z-10 mx-auto w-full max-w-6xl px-6 ">
<div className="flex flex-col gap-10 sm:gap-12">
<div className="flex flex-col gap-6" data-hero-copy="true">
<Fade >
<div className="flex items-center justify-between gap-6">
<h1 className="text-style-24-head-med text-[var(--color-title-default-alt)] tracking-tight">
{"Pricing"}
</h1>
</div>
</Fade>
<div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-48-head-med text-[var(--color-title-default-alt)] tracking-tight">
{"Start free and scale as you build"}
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
{"Sign up"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-white/70 bg-transparent text-[var(--color-text-default-alt)] hover:bg-[var(--color-bg-primary)]/10" data-hero-button="outline" href="/coming-soon">
{"Talk to sales"}
</a>
</div>
</Fade>
</div>
<Fade >
<ul className="flex flex-wrap gap-3">
<li >
<a className="block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]" href="#agents">
<span className="text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]">
{"Agents API"}
</span>
</a>
</li>
<li >
<a className="block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]" href="#models">
<span className="text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]">
{"Models API"}
</span>
</a>
</li>
<li >
<a className="block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]" href="#enterprise">
<span className="text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]">
{"Enterprise"}
</span>
</a>
</li>
<li >
<a className="block rounded-[var(--radius-rounded)] border border-[var(--color-grey-500)]/40 px-5 py-3 transition-colors hover:border-[var(--color-grey-500)]" href="#free">
<span className="text-style-14-body-reg text-[var(--color-text-default)] font-medium text-[var(--color-grey-500)]">
{"Free ways to try"}
</span>
</a>
</li>
</ul>
</Fade>
</div>
</div>
</section>
<section className="scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24" id="agents">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Agents API"}
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
<div className="flex flex-col gap-4">
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
<span className="text-style-14-head-med text-[var(--color-text-accent)]">
{BRAND.platform}{" included:"}
</span>
{" "}

{"[Add product description]"}

{" "}
<a className="whitespace-nowrap text-[var(--color-text-accent)] hover:underline" href="/agents-api">
{"About the Agents API"}

{" →"}
</a>
</p>
<div className="grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" data-keep-light="true" style={{"--rows": "7", "--cols": "4", "--md-cols": "2"} as React.CSSProperties}>
<div className="grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0">
<div className="flex flex-col gap-4 p-6">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-start gap-2">
<h3 className="text-style-16-head-med text-[var(--color-title-default)] tracking-tight">
{"Free"}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$0"}
<span className="text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans">
{"per month"}
</span>
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"Build for free"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
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
{"Builder"}
</h3>
<span className="shrink-0 rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] px-2 py-0.5 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)]">
{"Popular"}
</span>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$—"}
<span className="text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans">
{"per month"}
</span>
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit" href="/coming-soon">
{"Choose Builder"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
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
{"Startup"}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$—"}
<span className="text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans">
{"per month"}
</span>
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"Choose Startup"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
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
{"Enterprise"}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"Custom pricing"}
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"Talk to sales"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
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
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 hidden md:block" />
</ul>
</div>
</div>
<p className="text-style-12-body-reg text-[var(--color-text-tertiary)] max-w-2xl">
{"[Add plan detail]"}
</p>
</div>
</Fade>
</div>
</section>
<section className="scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24" id="models">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Models API"}
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
<div className="flex flex-col gap-4">
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
<span className="text-style-14-head-med text-[var(--color-text-accent)]">
{BRAND.platform}{" included:"}
</span>
{" "}

{"[Add product description]"}

{" "}
<a className="whitespace-nowrap text-[var(--color-text-accent)] hover:underline" href="/models-api">
{"About the Models API"}

{" →"}
</a>
</p>
<div className="grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" data-keep-light="true" style={{"--rows": "6", "--cols": "4", "--md-cols": "2"} as React.CSSProperties}>
<div className="grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0">
<div className="flex flex-col gap-4 p-6">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-start gap-2">
<h3 className="text-style-16-head-med text-[var(--color-title-default)] tracking-tight">
{BRAND.modelA}
</h3>
<span className="shrink-0 rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] px-2 py-0.5 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)]">
{"Flagship · New"}
</span>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$—"}
<span className="text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans">
{"input / 1M tokens"}
</span>
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit" href="/coming-soon">
{"Get API key"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— cached input / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— output / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"— tokens context"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add model description]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
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
{BRAND.modelB}
</h3>
<span className="shrink-0 rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] px-2 py-0.5 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)]">
{"Fast · New"}
</span>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$—"}
<span className="text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans">
{"input / 1M tokens"}
</span>
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"Get API key"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— cached input / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— output / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"— tokens context"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add model description]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
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
{BRAND.modelB}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$—"}
<span className="text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans">
{"input / 1M tokens"}
</span>
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"Get API key"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— cached input / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— output / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"— tokens context"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add model description]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
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
{BRAND.modelA}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$—"}
<span className="text-style-12-body-reg text-[var(--color-text-tertiary)] ml-1.5 font-sans">
{"input / 1M tokens"}
</span>
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit" href="/coming-soon">
{"Get API key"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— cached input / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"$— output / 1M"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"— tokens context"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add model description]"}
</p>
</span>
</li>
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
</ul>
</div>
</div>
<p className="text-style-12-body-reg text-[var(--color-text-tertiary)] max-w-2xl">
{"[Add offer terms]"}
</p>
</div>
</Fade>
</div>
</section>
<section className="scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24" id="enterprise">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="flex flex-col gap-5">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Enterprise pricing and deployment"}
</h2>
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

{"[Add product description]"}

{" "}
<a className="whitespace-nowrap text-[var(--color-text-accent)] hover:underline" href="/enterprise">
{"Learn more"}

{" →"}
</a>
</p>
<div className="grid overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:grid-cols-2" data-keep-light="true">
<div className="flex flex-col gap-4 p-6">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-start gap-2">
<h3 className="text-style-16-head-med text-[var(--color-title-default)] tracking-tight">
{"Enterprise"}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"Custom pricing"}
</p>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add product description]"}
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit" href="/coming-soon">
{"Talk to sales"}
</a>
</div>
<ul className="flex flex-col border-t border-[var(--color-stroke-default)] md:border-l md:border-t-0">
<li className="border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add plan detail]"}
</p>
</span>
</li>
<li className="border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</span>
</li>
<li className="border-b border-[var(--color-stroke-default)] px-6 py-3.5 last:border-b-0">
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
</Fade>
</div>
</section>
<section className="scroll-mt-28 bg-[var(--color-bg-primary)] py-16 sm:py-24" id="free">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
<div className="flex flex-col gap-6 ">
<div className="flex flex-col gap-5">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Free ways to try "}{BRAND.name}
</h2>
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
{"Plans, billing, credits, and free access."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className="max-w-3xl">
<Faq questions={[`Which plan should I pick?`, `Why are session counts approximate?`, `How does inference billing work?`, `Do you offer a free tier?`, `Do credits expire?`, `I can't see my credits. What should I do?`, `What is the refund policy?`, `Is ${BRAND.tab} free?`, `How can I contact support?`]} />
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
</div>
</section>
<section className="scroll-mt-20 bg-[var(--color-bg-primary)] py-12 sm:py-20">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:gap-12">
<div className="flex flex-col gap-6">
<div className="flex flex-col gap-6 ">
<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Build with the highest-quality operational agents"}
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
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)]" href="/coming-soon">
{"Sign up"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]" href="/coming-soon">
{"Talk to sales"}
</a>
</div>
</Fade>
</div>
</div>
</section>
<div className="fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 motion-reduce:transition-none sm:bottom-6 sm:right-6 pointer-events-none translate-y-3 opacity-0" aria-hidden="true">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-6 py-3 text-[length:var(--text-fs-3)] leading-[var(--text-fs-3--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] shadow-[0_10px_30px_rgb(4_4_5_/18%)]" href="/coming-soon" tabIndex={-1}>
{"Sign up"}

{" "}
<span aria-hidden="true">
{"→"}
</span>
</a>
</div>
    </>
  );
}
