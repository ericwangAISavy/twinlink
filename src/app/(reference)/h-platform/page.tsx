import type { Metadata } from "next";
import Link from "next/link";
import { Fade } from "@/components/reference/fade";
import { HeroWash } from "@/components/reference/hero-wash";

export const metadata: Metadata = { title: { absolute: "H Platform | H" } };

export default function PlatformPage() {
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
{"H Platform"}
</h1>
</div>
</Fade>
<div className={"grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-48-head-med text-[var(--color-title-default-alt)] tracking-tight"}>
{"A single platform for every agent you run"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-default-alt)] opacity-75"}>
{"The only enterprise platform where agents go beyond API connectors to run securely at scale in the background."}
</p>
</Fade>
</div>
<Fade className={"mt-2"}>
<div className={"flex flex-col gap-3 sm:flex-row sm:flex-wrap"}>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-primary)] text-[var(--color-text-default)] hover:bg-[var(--color-bg-secondary)]"} data-hero-button={"primary"} target={"_blank"} rel={"noopener noreferrer"} href={"https://platform.hcompany.ai/auth/signup"}>
{"Start building"}
</a>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-white/70 bg-transparent text-[var(--color-text-default-alt)] hover:bg-[var(--color-bg-primary)]/10"} data-hero-button={"outline"} href={"https://hcompany.ai/contact?from=h-platform-hero#fill-out-the-form"}>
{"Contact sales"}
</a>
</div>
</Fade>
</div>
</div>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] pb-6 pt-0 sm:pb-8 sm:-mt-4"}>
<div className={"mx-auto w-full max-w-6xl px-6"}>
<Fade >
<div className={"w-full rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-secondary)] p-3 sm:p-4 "} data-keep-light={"true"}>
<div className={"flex flex-col gap-3 sm:gap-4"}>
<div className={"flex h-[520px] flex-col overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] sm:h-[600px]"}>
<div className={"flex h-10 shrink-0 items-center gap-3 border-b border-[var(--color-stroke-default)] px-4"}>
<span className={"flex gap-1.5"} aria-hidden={"true"}>
<span className={"size-2.5 rounded-[var(--radius-rounded)] bg-[#ff5f57]"} />
<span className={"size-2.5 rounded-[var(--radius-rounded)] bg-[#febc2e]"} />
<span className={"size-2.5 rounded-[var(--radius-rounded)] bg-[#28c840]"} />
</span>
<span className={"text-style-12-body-reg flex min-w-0 items-center gap-1.5 text-[var(--color-text-tertiary)]"}>
<span className={"text-style-11-label-bold flex size-4 shrink-0 items-center justify-center rounded-[var(--radius-rounded)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)]"}>
{"H"}
</span>
<span className={"hidden items-center gap-1 sm:flex"}>
{"H"}
<svg className={"shrink-0"} aria-hidden={"true"} width={"12"} height={"12"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"m3 6 5 5 5-5"} />
</svg>
</span>
<span className={"hidden sm:inline"}>
{"/"}
</span>
<span className={"hidden items-center gap-1 sm:flex"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M2 4.5v8h12V5.5H8L6.5 3.5H2.5"} />
</svg>
{"Default"}
</span>
<span className={"flex min-w-0 items-center gap-1.5"}>
<span className={"hidden sm:inline"}>
{"/"}
</span>
<span className={"truncate"}>
{"Agents"}
</span>
</span>
<span className={"flex min-w-0 items-center gap-1.5"}>
<span >
{"/"}
</span>
<span className={"font-mono text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] truncate text-[var(--color-title-default)]"}>
{"form-filling-agent"}
</span>
</span>
</span>
</div>
<div className={"flex min-h-0 flex-1"}>
<nav className={"hidden w-48 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-[var(--color-stroke-default)] p-3 [scrollbar-width:none] md:flex"} aria-label={"Console"}>
<div className={"flex flex-col gap-0.5"}>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<rect x={"2.5"} y={"2.5"} width={"4"} height={"4"} rx={"0.5"} />
<rect x={"9.5"} y={"2.5"} width={"4"} height={"4"} rx={"0.5"} />
<rect x={"2.5"} y={"9.5"} width={"4"} height={"4"} rx={"0.5"} />
<rect x={"9.5"} y={"9.5"} width={"4"} height={"4"} rx={"0.5"} />
</svg>
</span>
{"Home"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M2 4.5v8h12V5.5H8L6.5 3.5H2.5"} />
</svg>
</span>
{"Projects"}
</span>
</div>
<div className={"flex flex-col gap-0.5"}>
<span className={"text-style-12-head-med flex shrink-0 items-center justify-between px-2.5 pb-1 pt-3 text-[var(--color-text-tertiary)]"}>
{"Build"}
<svg className={"shrink-0"} aria-hidden={"true"} width={"12"} height={"12"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"m3 6 5 5 5-5"} />
</svg>
</span>
<button className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left bg-[var(--color-bg-selected)] text-[var(--color-title-default)]"} type={"button"} aria-current={"page"}>
<span className={"text-[var(--color-icon-accent)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<circle cx={"5.5"} cy={"5.5"} r={"2"} />
<circle cx={"10.5"} cy={"5.5"} r={"2"} />
<path d={"M2 13c0-2 1.5-3.5 3.5-3.5S9 11 9 13M7 13c0-2 1.5-3.5 3.5-3.5S14 11 14 13"} />
</svg>
</span>
{"Agents"}
</button>
<button className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left text-[var(--color-text-secondary)] transition-colors duration-200 hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-default)]"} type={"button"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M2.5 3.5h11v8h-7l-3 2.5v-2.5h-1z"} />
<path d={"M5.5 6.5h5M5.5 8.5h3"} />
</svg>
</span>
{"Sessions"}
<span className={"pointer-events-none absolute z-10 flex size-2.5 right-2.5 top-1/2 -translate-y-1/2"} aria-hidden={"true"}>
<span className={"absolute inline-flex size-full animate-ping rounded-[var(--radius-rounded)] bg-[var(--color-stroke-accent-alt)] opacity-60 motion-reduce:hidden"} />
<span className={"relative inline-flex size-2.5 rounded-[var(--radius-rounded)] bg-[var(--color-bg-accent-alt)] ring-2 ring-[var(--color-bg-card)]"} />
</span>
</button>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M9 1.5 3.5 9H8l-1 5.5L12.5 7H8z"} />
</svg>
</span>
{"Skills"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<rect x={"2"} y={"3"} width={"12"} height={"8"} rx={"1"} />
<path d={"M6 13.5h4M8 11v2.5"} />
</svg>
</span>
{"Environments"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<rect x={"2"} y={"3"} width={"12"} height={"10"} rx={"1"} />
<path d={"M2 6h12"} />
</svg>
</span>
{"Browser profiles"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<rect x={"3"} y={"7"} width={"10"} height={"7"} rx={"1"} />
<path d={"M5.5 7V5a2.5 2.5 0 0 1 5 0v2"} />
</svg>
</span>
{"Vaults"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<circle cx={"8"} cy={"8"} r={"5.5"} />
<path d={"M8 5v3l2 1.5"} />
</svg>
</span>
{"Schedules"}
</span>
</div>
<div className={"flex flex-col gap-0.5"}>
<span className={"text-style-12-head-med flex shrink-0 items-center justify-between px-2.5 pb-1 pt-3 text-[var(--color-text-tertiary)]"}>
{"Configure"}
<svg className={"shrink-0"} aria-hidden={"true"} width={"12"} height={"12"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"m3 6 5 5 5-5"} />
</svg>
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<circle cx={"8"} cy={"6"} r={"1.75"} />
<circle cx={"3.75"} cy={"4.5"} r={"1.25"} />
<circle cx={"12.25"} cy={"4.5"} r={"1.25"} />
<path d={"M5 12.5c0-1.75 1.25-3 3-3s3 1.25 3 3M1.75 10c.25-1.25 1-2 2-2M14.25 10c-.25-1.25-1-2-2-2"} />
</svg>
</span>
{"Organisation"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<circle cx={"10"} cy={"6"} r={"3.5"} />
<path d={"M7.5 8.5 2.5 13.5M4 12l1.5 1.5M5.5 10.5 7 12"} />
</svg>
</span>
{"API keys"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M6.5 5.5a2 2 0 1 1 3 1.75L8 10M5 9.5a2 2 0 1 0 2 3h4M11 13a2 2 0 1 0-1.25-3.5L8 6.5"} />
</svg>
</span>
{"Webhooks"}
</span>
<span className={"text-style-12-head-med relative flex w-full shrink-0 items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-1 text-left cursor-default text-[var(--color-text-disabled)]"}>
<span >
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<rect x={"2"} y={"3.5"} width={"12"} height={"9"} rx={"1"} />
<path d={"M2 6.5h12M4.5 10h2"} />
</svg>
</span>
{"Billing & subscription"}
</span>
</div>
<div className={"mt-auto flex shrink-0 flex-col gap-2 pt-3 opacity-50"}>
<div className={"flex flex-col gap-2 rounded-[var(--radius-medium)] border border-[var(--color-stroke-default)] p-2.5"}>
<span className={"flex items-center justify-between"}>
<span className={"text-style-12-head-med text-[var(--color-text-default)]"}>
{"Free plan"}
</span>
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)]"}>
<span className={"font-mono text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] text-[var(--color-text-tertiary)]"}>
{"0%"}
</span>
{" used"}
</span>
</span>
<span className={"h-1 rounded-[var(--radius-rounded)] bg-[var(--color-bg-secondary)]"} />
<span className={"flex items-center justify-between"}>
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] flex items-center gap-1"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"12"} height={"12"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M3 3v3h3"} />
<path d={"M3.5 6A5 5 0 1 1 3 9"} />
</svg>
{"2 days"}
</span>
<span className={"text-style-12-head-med flex items-center gap-1 rounded-[var(--radius-small)] bg-[var(--color-bg-accent-alt)] px-2 py-1 text-[var(--color-text-default-alt)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"12"} height={"12"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M9.5 2.5c2.5 0 4 1.5 4 4L8.5 11.5l-4-4z"} />
<path d={"M4.5 7.5 2.5 7l2-2.5h3M8.5 11.5l.5 2 2.5-2v-3M3 13c0-1 .5-2 1.5-2.25"} />
</svg>
{"Upgrade"}
</span>
</span>
</div>
<span className={"flex items-center justify-between px-1"}>
<span className={"text-style-12-head-med flex size-6 items-center justify-center rounded-[var(--radius-rounded)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)]"}>
{"A"}
</span>
<span className={"text-[var(--color-icon-secondary)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<rect x={"2"} y={"3"} width={"12"} height={"10"} rx={"1"} />
<path d={"M6 3v10"} />
</svg>
</span>
</span>
</div>
</nav>
<div className={"relative min-w-0 flex-1 overflow-y-auto"}>
<div className={"h-full"} style={{"opacity": "1", "transform": "none"} as React.CSSProperties}>
<div className={"flex flex-col gap-6 p-4 sm:p-6"}>
<div className={"flex items-start justify-between gap-4"}>
<div className={"flex min-w-0 flex-col gap-1"}>
<h3 className={"text-style-16-head-bold text-[var(--color-title-default)] tracking-tight truncate"}>
{"form-filling-agent"}
</h3>
<span className={"text-style-12-body-reg text-[var(--color-text-secondary)]"}>
{"Quote request filling"}
</span>
</div>
<div className={"flex shrink-0 gap-2"}>
<span className={"text-style-12-head-med inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-medium)] bg-[var(--color-bg-button-secondary-default)] px-3 text-[var(--color-text-default)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"14"} height={"14"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M10.5 2.5 13.5 5.5 6 13H3v-3z"} />
<path d={"M9 4l3 3"} />
</svg>
{"Edit"}
</span>
<span className={"relative"}>
<button className={"text-style-12-head-med inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[var(--radius-medium)] px-3 transition-[background-color,opacity] duration-200 disabled:opacity-40 bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:opacity-90"} type={"button"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"12"} height={"12"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M5 3.5v9l7-4.5z"} fill={"currentColor"} />
</svg>
{"Start session"}
</button>
<span className={"pointer-events-none absolute z-10 flex size-2.5 -right-1 -top-1"} aria-hidden={"true"}>
<span className={"absolute inline-flex size-full animate-ping rounded-[var(--radius-rounded)] bg-[var(--color-stroke-accent-alt)] opacity-60 motion-reduce:hidden"} />
<span className={"relative inline-flex size-2.5 rounded-[var(--radius-rounded)] bg-[var(--color-bg-accent-alt)] ring-2 ring-[var(--color-bg-card)]"} />
</span>
</span>
</div>
</div>
<div className={"grid gap-3 md:grid-cols-2"}>
<div className={"flex flex-col divide-y divide-[var(--color-stroke-default)] rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] px-4"}>
<div className={"pb-2 pt-3"}>
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)]"}>
{"Configuration"}
</span>
<div className={"flex items-center justify-between gap-3 py-1.5"}>
<span className={"text-style-12-body-reg text-[var(--color-text-default)] flex items-center gap-2"}>
<span className={"text-[var(--color-icon-secondary)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M8 1.75 13.5 5v6L8 14.25 2.5 11V5z"} />
<path d={"M2.5 5 8 8.25 13.5 5M8 8.25v6"} />
</svg>
</span>
{"Model"}
</span>
<span className={"flex flex-wrap justify-end gap-1"}>
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] italic"}>
{"Platform default"}
</span>
</span>
</div>
<div className={"flex items-center justify-between gap-3 py-1.5"}>
<span className={"text-style-12-body-reg text-[var(--color-text-default)] flex items-center gap-2"}>
<span className={"text-[var(--color-icon-secondary)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<rect x={"2"} y={"3"} width={"12"} height={"8"} rx={"1"} />
<path d={"M6 13.5h4M8 11v2.5"} />
</svg>
</span>
{"Environment"}
</span>
<span className={"flex flex-wrap justify-end gap-1"}>
<span className={"font-mono text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] inline-flex items-center whitespace-nowrap rounded-[var(--radius-small)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] px-1.5 py-0.5 text-[var(--color-text-default)] transition-colors "}>
{"h/browser"}
</span>
</span>
</div>
</div>
<div className={"pb-3 pt-3"}>
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)]"}>
{"Capabilities"}
</span>
<div className={"flex items-center justify-between gap-3 py-1.5"}>
<span className={"text-style-12-body-reg text-[var(--color-text-default)] flex items-center gap-2"}>
<span className={"text-[var(--color-icon-secondary)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={"M9 1.5 3.5 9H8l-1 5.5L12.5 7H8z"} />
</svg>
</span>
{"Skills"}
</span>
<span className={"flex flex-wrap justify-end gap-1"}>
<span className={"font-mono text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] inline-flex items-center whitespace-nowrap rounded-[var(--radius-small)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] px-1.5 py-0.5 text-[var(--color-text-default)] transition-colors "}>
{"h/visual-browser"}
</span>
</span>
</div>
<div className={"flex items-center justify-between gap-3 py-1.5"}>
<span className={"text-style-12-body-reg text-[var(--color-text-default)] flex items-center gap-2"}>
<span className={"text-[var(--color-icon-secondary)]"}>
<svg className={"shrink-0"} aria-hidden={"true"} width={"16"} height={"16"} viewBox={"0 0 16 16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.25"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<circle cx={"4.5"} cy={"3.5"} r={"1.5"} />
<circle cx={"4.5"} cy={"12.5"} r={"1.5"} />
<circle cx={"11.5"} cy={"5.5"} r={"1.5"} />
<path d={"M4.5 5v6M11.5 7c0 2.5-3 2.5-7 4"} />
</svg>
</span>
{"Subagents"}
</span>
<span className={"flex flex-wrap justify-end gap-1"}>
<span className={"font-mono text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] inline-flex items-center whitespace-nowrap rounded-[var(--radius-small)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] px-1.5 py-0.5 text-[var(--color-text-default)] transition-colors "}>
{"h/web-surfer-pro"}
</span>
</span>
</div>
</div>
</div>
<div className={"hidden flex-col gap-2 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] px-4 pb-4 pt-3 md:flex"}>
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)]"}>
{"Instructions"}
</span>
<span className={"text-style-12-body-reg text-[var(--color-text-default)]"}>
{"You are an agent that fills out insurance/service quote request forms on behalf of a user, using their provided personal and coverage details to accurately complete each field. Navigate the form step-by-step, validate required fields before submitting, and flag any information that is missing or ambiguous instead of guessing."}
</span>
</div>
</div>
<div className={"flex flex-col gap-3"}>
<div className={"flex items-center justify-between"}>
<span className={"text-style-14-head-med text-[var(--color-text-default)]"}>
{"Used in sessions"}
</span>
<div className={"flex rounded-[var(--radius-rounded)] border border-[var(--color-stroke-default)] p-0.5"}>
<button className={"text-style-12-head-med rounded-[var(--radius-rounded)] px-2.5 py-0.5 transition-colors duration-200 bg-[var(--color-bg-purple-alt)] text-[var(--color-text-accent)]"} type={"button"} aria-pressed={"true"}>
{"My runs"}
</button>
<button className={"text-style-12-head-med rounded-[var(--radius-rounded)] px-2.5 py-0.5 transition-colors duration-200 text-[var(--color-text-secondary)] hover:text-[var(--color-text-default)]"} type={"button"} aria-pressed={"false"}>
{"Org"}
</button>
</div>
</div>
<div className={"overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)]"}>
<div className={"text-style-12-head-med grid gap-4 border-b border-[var(--color-stroke-default)] px-4 py-2.5 text-[var(--color-text-tertiary)] grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_7rem_6rem]"}>
<span >
{"Name"}
</span>
<span >
{"Status"}
</span>
<span className={"hidden sm:block"}>
{"Last updated"}
</span>
</div>
<button className={"grid w-full items-center gap-4 px-4 py-3 text-left transition-colors duration-200 hover:bg-[var(--color-bg-hover)] grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_7rem_6rem] relative "} type={"button"}>
<span className={"pointer-events-none absolute z-10 flex size-2.5 right-4 top-1/2 -translate-y-1/2"} aria-hidden={"true"}>
<span className={"absolute inline-flex size-full animate-ping rounded-[var(--radius-rounded)] bg-[var(--color-stroke-accent-alt)] opacity-60 motion-reduce:hidden"} />
<span className={"relative inline-flex size-2.5 rounded-[var(--radius-rounded)] bg-[var(--color-bg-accent-alt)] ring-2 ring-[var(--color-bg-card)]"} />
</span>
<span className={"flex min-w-0 flex-col gap-0.5"}>
<span className={"text-style-12-head-med text-[var(--color-text-default)] truncate"}>
{"Request an event liability quote for the June wedding"}
</span>
<span className={"font-mono text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] truncate text-[var(--color-text-tertiary)]"}>
{"form-filling-agent"}

{" · "}

{"2fa860ad"}
</span>
</span>
<span >
<span className={"text-style-12-head-med inline-flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-rounded)] border px-2 py-0.5 border-[var(--color-stroke-accent)] bg-[var(--color-bg-purple-alt)] text-[var(--color-text-accent)]"}>
<span className={"size-1.5 animate-pulse rounded-[var(--radius-rounded)] bg-current motion-reduce:animate-none"} />
{"Running"}
</span>
</span>
<span className={"text-style-12-body-reg text-[var(--color-text-tertiary)] hidden sm:block"}>
{"Just now"}
</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className={"flex flex-col items-center gap-2"}>
<div className={"flex max-w-full overflow-hidden rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-secondary)]"}>
<div className={"relative flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] motion-safe:scroll-smooth p-0.5  "} role={"tablist"} aria-label={"Console demo"}>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-3 py-1 text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] bg-white text-[var(--color-grey-900)] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"} type={"button"} role={"tab"} aria-selected={"true"}>
{"Agent overview"}
</button>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-3 py-1 text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]"} type={"button"} role={"tab"} aria-selected={"false"}>
{"Watch a session"}
</button>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-3 py-1 text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]"} type={"button"} role={"tab"} aria-selected={"false"}>
{"Create an agent"}
</button>
<button className={"whitespace-nowrap rounded-[var(--radius-button)] font-medium transition-colors duration-300 px-3 py-1 text-[length:var(--text-fs-1)] leading-[var(--text-fs-1--line-height)] text-[var(--color-text-secondary)] hover:bg-current/10 hover:text-[var(--color-text-default)]"} type={"button"} role={"tab"} aria-selected={"false"}>
{"Run it with subagents"}
</button>
</div>
</div>
<p className={"text-style-12-body-reg text-[var(--color-text-tertiary)] text-center"}>
{"Click Start session, a session or the sidebar to explore."}
</p>
</div>
</div>
</div>
</Fade>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] pb-12 pt-6 sm:pb-20 sm:pt-8"}>
<div className={"mx-auto w-full max-w-6xl px-6"}>
<div className={"grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4"}>
<Fade >
<div className={"flex flex-col gap-2"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"01"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Configure"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Set an agent's model, environment, instructions, and skills once."}
</p>
</div>
</Fade>
<Fade >
<div className={"flex flex-col gap-2"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"02"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Connect"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Give agents reusable skills and delegate to specialist subagents when a task needs it."}
</p>
</div>
</Fade>
<Fade >
<div className={"flex flex-col gap-2"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"03"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Run"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Deploy across web, desktop, and enterprise systems, and watch every session live."}
</p>
</div>
</Fade>
<Fade >
<div className={"flex flex-col gap-2"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"04"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Replay"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Step through any run, action by action."}
</p>
</div>
</Fade>
</div>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] py-12 sm:py-20"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:gap-12"}>
<div className={"flex flex-col gap-6 "}>
<div className={"flex flex-col gap-5"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Proprietary agentic engine"}
</h2>
</Fade>
</div>
</div>
<div className={"flex flex-col gap-6"}>
<ul className={"grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"}>
<li className={"h-full"}>
<Fade className={"flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] px-6 pb-6 pt-5"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"01"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Agent execution engine"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"A proprietary engine built to run computer-use agents reliably in production."}
</p>
</Fade>
</li>
<li className={"h-full"}>
<Fade className={"flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] px-6 pb-6 pt-5"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"02"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Workflow orchestration"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Manages state for complex, long-horizon tasks from start to finish."}
</p>
</Fade>
</li>
<li className={"h-full"}>
<Fade className={"flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] px-6 pb-6 pt-5"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"03"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"Virtual and local environments"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Infrastructure for the surfaces your agents need, hosted or on your machines."}
</p>
</Fade>
</li>
<li className={"h-full"}>
<Fade className={"flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] px-6 pb-6 pt-5"}>
<span className={"font-mono text-[length:var(--text-fs-2)] text-[var(--color-text-tertiary)]"}>
{"04"}
</span>
<h3 className={"text-style-18-head-med text-[var(--color-title-default)] tracking-tight"}>
{"H-hosted model inference"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Inference on models we host and operate, tuned for agent workloads."}
</p>
</Fade>
</li>
</ul>
<Fade >
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} href={"/enterprise"}>
{"Agents for enterprise"}
</Link>
</Fade>
</div>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] py-12 sm:py-20"}>
<div className={"mx-auto w-full max-w-6xl px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"flex flex-col gap-5"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"One platform for agents, models, and interfaces"}
</h2>
</Fade>
</div>
</div>
</div>
<div className={"mx-auto mt-12 grid w-full max-w-6xl gap-4 sm:grid-cols-2 px-6"}>
<Fade >
<div className={"rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3 px-6 pb-6 pt-5"} data-keep-light={"true"}>
<h3 className={"text-style-18-head-bold text-[var(--color-title-default)] tracking-tight"}>
{"Agents API"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Managed computer-use agents in cloud browsers. REST API, TypeScript and Python SDKs, MCP, and CLI."}
</p>
<div className={"mt-auto flex flex-wrap items-center gap-3 pt-3"}>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)]"} href={"/agents-api"}>
{"View Agents API"}
</Link>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} target={"_blank"} rel={"noopener noreferrer"} href={"https://hub.hcompany.ai/agents-api/introduction"}>
{"Agents API docs"}
</a>
</div>
</div>
</Fade>
<Fade >
<div className={"rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3 px-6 pb-6 pt-5"} data-keep-light={"true"}>
<h3 className={"text-style-18-head-bold text-[var(--color-title-default)] tracking-tight"}>
{"Models API"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"OpenAI-compatible access to Holo models for text, images, documents, and computer-use workloads."}
</p>
<div className={"mt-auto flex flex-wrap items-center gap-3 pt-3"}>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)]"} href={"/models-api"}>
{"View Models API"}
</Link>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} target={"_blank"} rel={"noopener noreferrer"} href={"https://hub.hcompany.ai/models-api/introduction"}>
{"Models API docs"}
</a>
</div>
</div>
</Fade>
<Fade >
<div className={"rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3 px-6 pb-6 pt-5"} data-keep-light={"true"}>
<h3 className={"text-style-18-head-bold text-[var(--color-title-default)] tracking-tight"}>
{"SDKs and MCP"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"TypeScript, Python, MCP, and the CLI share one API key and connect to the tools you already use."}
</p>
<div className={"mt-auto flex flex-wrap items-center gap-3 pt-3"}>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)]"} href={"/agents-api"}>
{"View SDKs and MCP"}
</Link>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} target={"_blank"} rel={"noopener noreferrer"} href={"https://github.com/hcompai/hai-agents-python"}>
{"SDK on GitHub"}
</a>
</div>
</div>
</Fade>
<Fade >
<div className={"rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 flex h-full flex-col gap-3 px-6 pb-6 pt-5"} data-keep-light={"true"}>
<h3 className={"text-style-18-head-bold text-[var(--color-title-default)] tracking-tight"}>
{"Connectors"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Connect agents to n8n, Claude, Cursor, and Hermes. You only need one API key to get started."}
</p>
<div className={"mt-auto flex flex-wrap items-center gap-3 pt-3"}>
<Link className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)]"} href={"/agents-api"}>
{"View Connectors"}
</Link>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} target={"_blank"} rel={"noopener noreferrer"} href={"https://hub.hcompany.ai/agents-api/coding-skills"}>
{"Connectors docs"}
</a>
</div>
</div>
</Fade>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] py-12 sm:py-20"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"flex flex-col gap-5"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Security and compliance"}
</h2>
</Fade>
</div>
</div>
<div className={"flex flex-col gap-6"}>
<Fade >
<ul className={"flex flex-wrap gap-3"}>
<li className={"flex items-center gap-3 rounded-[var(--radius-rounded)] border border-[var(--color-stroke-default)] px-5 py-3"}>
<svg className={"h-5 w-5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 20 20"} fill={"none"} aria-hidden={"true"}>
<path d={"M10 2.2l1.1 1.8 2 .5.5 2 1.8 1.1-1.8 1.1-.5 2-2 .5L10 17.8l-1.1-1.8-2-.5-.5-2L4.6 11l1.8-1.1.5-2 2-.5L10 2.2z"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinejoin={"round"} />
<circle cx={"10"} cy={"10"} r={"2.2"} stroke={"currentColor"} strokeWidth={"1.3"} />
</svg>
<p className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium"}>
{"SOC 2 Type II"}
</p>
</li>
<li className={"flex items-center gap-3 rounded-[var(--radius-rounded)] border border-[var(--color-stroke-default)] px-5 py-3"}>
<svg className={"h-5 w-5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 20 20"} fill={"none"} aria-hidden={"true"}>
<rect x={"2.5"} y={"5.5"} width={"15"} height={"9"} rx={"1.5"} stroke={"currentColor"} strokeWidth={"1.3"} />
<path d={"M5.2 12.2V7.8h1.3c1.1 0 1.8.6 1.8 1.5 0 .9-.7 1.5-1.8 1.5H6.5v1.4H5.2zm1.3-2.6h.3c.4 0 .7-.2.7-.6s-.3-.6-.7-.6h-.3v1.2zM10.2 12.2V7.8h2.6v1.1h-1.3v.7h1.1v1h-1.1v1.6h-1.3zM14.1 12.2V7.8h1.3v4.4h-1.3z"} fill={"currentColor"} />
</svg>
<p className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium"}>
{"ISO 27001"}
</p>
</li>
<li className={"flex items-center gap-3 rounded-[var(--radius-rounded)] border border-[var(--color-stroke-default)] px-5 py-3"}>
<svg className={"h-5 w-5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 20 20"} fill={"none"} aria-hidden={"true"}>
<path d={"M3.5 10h13M6 7.5l-2.5 2.5L6 12.5M14 7.5l2.5 2.5L14 12.5"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinecap={"round"} strokeLinejoin={"round"} />
<rect x={"7.5"} y={"6.5"} width={"5"} height={"7"} rx={"1"} stroke={"currentColor"} strokeWidth={"1.3"} />
</svg>
<p className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium"}>
{"Secured tunnels to customer's machines"}
</p>
</li>
<li className={"flex items-center gap-3 rounded-[var(--radius-rounded)] border border-[var(--color-stroke-default)] px-5 py-3"}>
<svg className={"h-5 w-5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 20 20"} fill={"none"} aria-hidden={"true"}>
<path d={"M10 2.8l5.5 2.2v3.6c0 3.4-2.3 5.9-5.5 6.9-3.2-1-5.5-3.5-5.5-6.9V5L10 2.8z"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinejoin={"round"} />
<path d={"M8.2 10.1l1.3 1.3 2.5-2.6"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
<p className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium"}>
{"Permissions set at customer's system level"}
</p>
</li>
<li className={"flex items-center gap-3 rounded-[var(--radius-rounded)] border border-[var(--color-stroke-default)] px-5 py-3"}>
<svg className={"h-5 w-5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 20 20"} fill={"none"} aria-hidden={"true"}>
<circle cx={"8"} cy={"8"} r={"2.4"} stroke={"currentColor"} strokeWidth={"1.3"} />
<path d={"M3.8 15.2c.6-2 2.1-3.2 4.2-3.2s3.6 1.2 4.2 3.2"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinecap={"round"} />
<path d={"M12.5 6.2h3.8M14.4 4.3v3.8"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinecap={"round"} />
</svg>
<p className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium"}>
{"Customer SSO integration"}
</p>
</li>
<li className={"flex items-center gap-3 rounded-[var(--radius-rounded)] border border-[var(--color-stroke-default)] px-5 py-3"}>
<svg className={"h-5 w-5 shrink-0 text-[var(--color-icon-tertiary)]"} viewBox={"0 0 20 20"} fill={"none"} aria-hidden={"true"}>
<rect x={"3"} y={"3.5"} width={"6"} height={"6"} rx={"1.2"} stroke={"currentColor"} strokeWidth={"1.3"} />
<rect x={"11"} y={"3.5"} width={"6"} height={"6"} rx={"1.2"} stroke={"currentColor"} strokeWidth={"1.3"} />
<rect x={"3"} y={"11.5"} width={"6"} height={"6"} rx={"1.2"} stroke={"currentColor"} strokeWidth={"1.3"} />
<rect x={"11"} y={"11.5"} width={"6"} height={"6"} rx={"1.2"} stroke={"currentColor"} strokeWidth={"1.3"} />
</svg>
<p className={"text-style-14-body-reg text-[var(--color-text-default)] font-medium"}>
{"Projects & RBAC"}
</p>
</li>
</ul>
</Fade>
<Fade >
<a className={"inline-flex w-fit items-center gap-2 text-[length:var(--text-fs-2)] font-medium leading-[var(--text-fs-2--line-height)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-default)]"} target={"_blank"} rel={"noopener noreferrer"} href={"https://trust.hcompany.ai/"}>
{"Learn more"}
<svg className={"h-4 w-4"} viewBox={"0 0 16 16"} fill={"none"} aria-hidden={"true"} xmlns={"http://www.w3.org/2000/svg"}>
<path d={"M3 8h10M9 4l4 4-4 4"} stroke={"currentColor"} strokeWidth={"1.5"} strokeLinecap={"round"} strokeLinejoin={"round"} />
</svg>
</a>
</Fade>
</div>
</div>
</section>
<section className={"bg-[var(--color-bg-primary)] py-12 sm:py-20"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"flex flex-col gap-5"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Continue from here"}
</h2>
</Fade>
</div>
</div>
<div className={"grid gap-4 sm:grid-cols-3"}>
<Fade >
<a className={"group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 hover:bg-[var(--color-bg-hover)]"} href={"https://hcompany.ai/use-cases"}>
<h3 className={"text-style-18-head-bold text-[var(--color-title-default)] tracking-tight"}>
{"Use cases"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"See the processes these APIs already run, such as procurement and back-office work."}
</p>
<span className={"text-style-14-body-reg text-[var(--color-text-accent)] pt-2 font-medium transition-transform duration-200 group-hover:translate-x-1"}>
{"Go to Use cases"}
</span>
</a>
</Fade>
<Fade >
<a className={"group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 hover:bg-[var(--color-bg-hover)]"} href={"https://hcompany.ai/research/models"}>
<h3 className={"text-style-18-head-bold text-[var(--color-title-default)] tracking-tight"}>
{"Research"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Holo architecture, benchmarks, and OSWorld results behind the platform."}
</p>
<span className={"text-style-14-body-reg text-[var(--color-text-accent)] pt-2 font-medium transition-transform duration-200 group-hover:translate-x-1"}>
{"Go to Research"}
</span>
</a>
</Fade>
<Fade >
<Link className={"group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 hover:bg-[var(--color-bg-hover)]"} href={"/enterprise"}>
<h3 className={"text-style-18-head-bold text-[var(--color-title-default)] tracking-tight"}>
{"Enterprise"}
</h3>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Building for a client that needs a deployment team? Start from the enterprise offer."}
</p>
<span className={"text-style-14-body-reg text-[var(--color-text-accent)] pt-2 font-medium transition-transform duration-200 group-hover:translate-x-1"}>
{"Go to Enterprise"}
</span>
</Link>
</Fade>
</div>
</div>
</section>
<section className={"scroll-mt-20 bg-[var(--color-bg-primary)] py-12 sm:py-20"}>
<div className={"mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:gap-12"}>
<div className={"flex flex-col gap-6"}>
<div className={"flex flex-col gap-6 "}>
<div className={"grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16"}>
<Fade >
<h2 className={"text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl"}>
{"Operational agents that get the job done"}
</h2>
</Fade>
<Fade >
<p className={"text-style-16-body-reg text-[var(--color-text-secondary)]   "}>
{"Configure, deploy, and monitor agents that run at production scale in the browser and on the desktop, with human-level accuracy."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className={"flex flex-col gap-3 sm:flex-row"}>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]"} href={"https://hcompany.ai/contact"}>
{"Talk to sales"}
</a>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)] max-sm:order-first"} target={"_blank"} rel={"noopener noreferrer"} href={"https://platform.hcompany.ai/auth/signup"}>
{"Create an agent"}
</a>
</div>
</Fade>
</div>
<Fade >
<div className={"flex flex-col gap-10 sm:gap-12"}>
<div className={"group relative aspect-video w-full overflow-hidden rounded-[var(--radius-large)] bg-[var(--color-grey-800)]"}>
<iframe className={"pointer-events-none absolute left-1/2 top-1/2 aspect-[4/3] h-auto w-auto min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"} title={"Agents API preview"} src={"https://www.youtube-nocookie.com/embed/n3jsjIbESRY?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&iv_load_policy=3&enablejsapi=1"} referrerPolicy={"strict-origin-when-cross-origin"} allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"} />
<img className={"pointer-events-none absolute inset-0 h-full w-full bg-black object-cover transition-opacity duration-500 opacity-100"} aria-hidden={"true"} alt={""} loading={"lazy"} width={"1280"} height={"720"} style={{"color": "transparent"} as React.CSSProperties} src={"https://i.ytimg.com/vi_webp/n3jsjIbESRY/maxresdefault.webp"} />
<div className={"pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"} aria-hidden={"true"} />
<div className={"absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-7"}>
<div className={"flex justify-end opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"}>
<button className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-rounded)] text-white transition-colors hover:bg-white/10"} type={"button"} aria-label={"Unmute video"}>
<svg width={"14"} height={"14"} viewBox={"0 0 14 14"} fill={"none"} aria-hidden={"true"}>
<path d={"M3 5.5H5L8 3V11L5 8.5H3V5.5Z"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinejoin={"round"} />
<path d={"M10 5L12.5 9.5M12.5 5L10 9.5"} stroke={"currentColor"} strokeWidth={"1.3"} strokeLinecap={"round"} />
</svg>
</button>
</div>
<div className={"flex flex-col gap-4"}>
<div className={"flex transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 opacity-0"}>
<button className={"flex h-9 w-9 items-center justify-center rounded-[var(--radius-rounded)] bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60"} type={"button"} aria-label={"Pause video"}>
<svg width={"12"} height={"12"} viewBox={"0 0 12 12"} fill={"none"} aria-hidden={"true"}>
<path d={"M3.5 2.5H5V9.5H3.5V2.5ZM7 2.5H8.5V9.5H7V2.5Z"} fill={"currentColor"} />
</svg>
</button>
</div>
<div className={"h-px w-full overflow-hidden bg-white/25 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"} aria-hidden={"true"}>
<div className={"h-full bg-white"} style={{"width": "0"} as React.CSSProperties} />
</div>
</div>
</div>
</div>
<div className={"flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"}>
<div className={"flex items-center gap-5"}>
<div className={"flex h-11 w-11 items-center justify-center rounded-[var(--radius-medium)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)]"} aria-hidden={"true"}>
<svg className={"h-6 w-6"} viewBox={"0 0 24 24"} fill={"currentColor"} aria-hidden={"true"}>
<path d={"M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a13.4 13.4 0 0 1 3.3 1.6 15.9 15.9 0 0 0-13 0A13.4 13.4 0 0 1 8.8 3.4L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 0 13.5.3 17.9a19.9 19.9 0 0 0 6 3l1.3-2a12.7 12.7 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 11.8 0l.5.4a12.7 12.7 0 0 1-2 1l1.3 2a19.9 19.9 0 0 0 6-3c.4-5.1-.7-9.5-3.4-13.5ZM8.5 15.2c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Zm7 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Z"} />
</svg>
</div>
<div className={"flex flex-col gap-0.5"}>
<a className={"text-[length:var(--text-fs-3)] font-medium leading-[var(--text-fs-3--line-height)] text-[var(--color-text-default)] underline-offset-4 hover:underline"} href={"https://discord.gg/gAWcDZgx4s"} target={"_blank"} rel={"noopener noreferrer"}>
{"H developer Discord"}
</a>
<p className={"text-style-14-body-reg text-[var(--color-text-secondary)]"}>
{"Questions, bugs, feature requests: talk to the team and other builders."}
</p>
</div>
</div>
<a className={"inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)] w-fit"} target={"_blank"} rel={"noopener noreferrer"} href={"https://discord.gg/gAWcDZgx4s"}>
<svg className={"h-4 w-4"} viewBox={"0 0 24 24"} fill={"currentColor"} aria-hidden={"true"}>
<path d={"M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a13.4 13.4 0 0 1 3.3 1.6 15.9 15.9 0 0 0-13 0A13.4 13.4 0 0 1 8.8 3.4L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 0 13.5.3 17.9a19.9 19.9 0 0 0 6 3l1.3-2a12.7 12.7 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 11.8 0l.5.4a12.7 12.7 0 0 1-2 1l1.3 2a19.9 19.9 0 0 0 6-3c.4-5.1-.7-9.5-3.4-13.5ZM8.5 15.2c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Zm7 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.2 1.1 2.1 2.4c0 1.3-.9 2.4-2.1 2.4Z"} />
</svg>
{"Join Discord"}
</a>
</div>
</div>
</Fade>
</div>
</section>
    </>
  );
}
