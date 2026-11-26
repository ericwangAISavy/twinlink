import type { Metadata } from "next";
import { BRAND } from "@/components/reference/brand";
import { Fade } from "@/components/reference/fade";
import { Faq } from "@/components/reference/faq";
import { HeroWash } from "@/components/reference/hero-wash";

export const metadata: Metadata = { title: { absolute: `${"Models API"} | ${BRAND.name}` } };

export default function ModelsApiPage() {
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
{"Models API"}
</h1>
</div>
</Fade>
<div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
<Fade >
<h2 className="text-style-48-head-med text-[var(--color-title-default-alt)] tracking-tight">
{"Multimodal models for real-world use"}
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
{"Get API key"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-white/70 bg-transparent text-[var(--color-text-default-alt)] hover:bg-[var(--color-bg-primary)]/10" data-hero-button="outline" href="/coming-soon">
{"Explore docs"}
</a>
</div>
</Fade>
</div>
</div>
</div>
</section>
<section className="bg-[var(--color-bg-primary)] pb-16 pt-6 sm:pb-24 sm:pt-8" id="models">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
<div className="grid gap-4 md:grid-cols-2">
<Fade className="h-full">
<div className="rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 @container flex h-full flex-col items-center gap-10 px-6 py-10 text-center shadow-[0_18px_40px_rgb(4_4_5_/10%)] sm:py-12" data-keep-light="true">
<div className="flex flex-col items-center gap-3">
<div className="flex items-center gap-2">
<p className="text-style-14-body-reg text-[var(--color-text-accent)] font-bold">
{"New"}
</p>
<p className="text-style-14-body-reg text-[var(--color-text-tertiary)] font-bold">
{"Flagship"}
</p>
</div>
<h3 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight">
{BRAND.modelA}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-tertiary)] -mt-1">
{"[Add model description]"}
</p>
<p className="text-style-16-body-reg text-[var(--color-text-secondary)] max-w-sm text-balance">
{"[Add product description]"}
</p>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-style-36-head-med text-[var(--color-title-default)]">
{"00%"}
</span>
<span className="text-style-14-body-reg text-[var(--color-text-tertiary)]">
{"on OSWorld"}
</span>
</div>
<dl className="grid w-full grid-cols-[1fr_auto_1fr] gap-4">
<div className="flex flex-col items-center gap-1">
<dt className="order-2 whitespace-nowrap">
<span className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Context"}
</span>
</dt>
<dd className="order-1 text-style-24-head-med text-[var(--color-title-default)]">
{"—K"}
</dd>
</div>
<div className="flex flex-col items-center gap-1">
<dt className="order-2 whitespace-nowrap">
<span className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Input / 1M"}
</span>
<span className="text-style-14-body-reg text-[var(--color-text-tertiary)] block @md:inline">
<span className="hidden @md:inline">
{" · "}
</span>
{"$— cached"}
</span>
</dt>
<dd className="order-1 text-style-24-head-med text-[var(--color-title-default)]">
{"$—"}
</dd>
</div>
<div className="flex flex-col items-center gap-1">
<dt className="order-2 whitespace-nowrap">
<span className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Output / 1M"}
</span>
</dt>
<dd className="order-1 text-style-24-head-med text-[var(--color-title-default)]">
{"$—"}
</dd>
</div>
</dl>
<div className="mt-auto flex flex-wrap justify-center gap-3">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)]" href="/coming-soon">
{"Get API key"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]" href="/coming-soon">
{"Docs"}
<svg className="h-4 w-4" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
<path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z" />
</svg>
</a>
</div>
</div>
</Fade>
<Fade className="h-full">
<div className="rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-6 transition-colors duration-200 @container flex h-full flex-col items-center gap-10 px-6 py-10 text-center shadow-[0_18px_40px_rgb(4_4_5_/10%)] sm:py-12" data-keep-light="true">
<div className="flex flex-col items-center gap-3">
<div className="flex items-center gap-2">
<p className="text-style-14-body-reg text-[var(--color-text-accent)] font-bold">
{"New"}
</p>
<p className="text-style-14-body-reg text-[var(--color-text-tertiary)] font-bold">
{"Fast"}
</p>
</div>
<h3 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight">
{BRAND.modelB}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-tertiary)] -mt-1">
{"[Add model description]"}
</p>
<p className="text-style-16-body-reg text-[var(--color-text-secondary)] max-w-sm text-balance">
{"[Add product description]"}
</p>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-style-36-head-med text-[var(--color-title-default)]">
{"00%"}
</span>
<span className="text-style-14-body-reg text-[var(--color-text-tertiary)]">
{"on OSWorld"}
</span>
</div>
<dl className="grid w-full grid-cols-[1fr_auto_1fr] gap-4">
<div className="flex flex-col items-center gap-1">
<dt className="order-2 whitespace-nowrap">
<span className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Context"}
</span>
</dt>
<dd className="order-1 text-style-24-head-med text-[var(--color-title-default)]">
{"—K"}
</dd>
</div>
<div className="flex flex-col items-center gap-1">
<dt className="order-2 whitespace-nowrap">
<span className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Input / 1M"}
</span>
<span className="text-style-14-body-reg text-[var(--color-text-tertiary)] block @md:inline">
<span className="hidden @md:inline">
{" · "}
</span>
{"$— cached"}
</span>
</dt>
<dd className="order-1 text-style-24-head-med text-[var(--color-title-default)]">
{"$—"}
</dd>
</div>
<div className="flex flex-col items-center gap-1">
<dt className="order-2 whitespace-nowrap">
<span className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"Output / 1M"}
</span>
</dt>
<dd className="order-1 text-style-24-head-med text-[var(--color-title-default)]">
{"$—"}
</dd>
</div>
</dl>
<div className="mt-auto flex flex-wrap justify-center gap-3">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)]" href="/coming-soon">
{"Get API key"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]" href="/coming-soon">
{"Docs"}
<svg className="h-4 w-4" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
<path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z" />
</svg>
</a>
</div>
</div>
</Fade>
</div>
<Fade >
<div className="flex flex-col gap-4">
<p className="text-style-14-body-reg text-[var(--color-text-tertiary)]">
{"Previous generation, still served"}
</p>
<div className="rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)]" data-keep-light="true">
<table className="block w-full text-left text-[length:var(--text-fs-2)] sm:table">
<thead className="hidden sm:table-header-group">
<tr className="border-b border-[var(--color-stroke-default)]">
<th className="sm:table-cell sm:px-5 sm:py-4 text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:py-3" scope="col">
{"Model"}
</th>
<th className="sm:table-cell sm:px-5 sm:py-4 text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:py-3" scope="col">
{"Context"}
</th>
<th className="sm:table-cell sm:px-5 sm:py-4 text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:py-3" scope="col">
{"Input / 1M"}
</th>
<th className="sm:table-cell sm:px-5 sm:py-4 text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:py-3" scope="col">
{"Output / 1M"}
</th>
</tr>
</thead>
<tbody className="block divide-y divide-[var(--color-stroke-default)] sm:table-row-group">
<tr className="grid grid-cols-3 gap-x-4 gap-y-3 p-4 sm:table-row sm:p-0">
<th className="sm:table-cell sm:px-5 sm:py-4 col-span-3 font-normal sm:whitespace-nowrap" scope="row">
<div className="font-medium text-[var(--color-text-default)]">
{BRAND.modelB}
</div>
<div className="font-mono text-[length:var(--text-fs-1)] text-[var(--color-text-tertiary)]">
{BRAND.modelIdB}
</div>
</th>
<td className="sm:table-cell sm:px-5 sm:py-4 flex flex-col gap-0.5">
<span className="text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:hidden">
{"Context"}
</span>
<span className="font-mono text-[var(--color-text-secondary)]">
{"—K"}
</span>
</td>
<td className="sm:table-cell sm:px-5 sm:py-4 flex flex-col gap-0.5">
<span className="text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:hidden">
{"Input / 1M"}
</span>
<span className="font-mono text-[var(--color-text-secondary)]">
{"$—"}
</span>
</td>
<td className="sm:table-cell sm:px-5 sm:py-4 flex flex-col gap-0.5">
<span className="text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:hidden">
{"Output / 1M"}
</span>
<span className="font-mono text-[var(--color-text-secondary)]">
{"$—"}
</span>
</td>
</tr>
<tr className="grid grid-cols-3 gap-x-4 gap-y-3 p-4 sm:table-row sm:p-0">
<th className="sm:table-cell sm:px-5 sm:py-4 col-span-3 font-normal sm:whitespace-nowrap" scope="row">
<div className="font-medium text-[var(--color-text-default)]">
{BRAND.modelA}
</div>
<div className="font-mono text-[length:var(--text-fs-1)] text-[var(--color-text-tertiary)]">
{BRAND.modelIdA}
</div>
</th>
<td className="sm:table-cell sm:px-5 sm:py-4 flex flex-col gap-0.5">
<span className="text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:hidden">
{"Context"}
</span>
<span className="font-mono text-[var(--color-text-secondary)]">
{"—K"}
</span>
</td>
<td className="sm:table-cell sm:px-5 sm:py-4 flex flex-col gap-0.5">
<span className="text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:hidden">
{"Input / 1M"}
</span>
<span className="font-mono text-[var(--color-text-secondary)]">
{"$—"}
</span>
</td>
<td className="sm:table-cell sm:px-5 sm:py-4 flex flex-col gap-0.5">
<span className="text-[length:var(--text-fs-1)] font-normal text-[var(--color-text-tertiary)] sm:hidden">
{"Output / 1M"}
</span>
<span className="font-mono text-[var(--color-text-secondary)]">
{"$—"}
</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</Fade>
<Fade >
<div className="flex flex-col gap-1">
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"[Add offer terms]"}
</p>
<p className="text-style-12-body-reg text-[var(--color-text-tertiary)]">
{"[Add offer terms]"}
</p>
</div>
</Fade>
</div>
</section>
<section className="bg-[var(--color-bg-primary)] pb-16 pt-12 sm:pb-20 sm:pt-16" id="guides">
<div className="mx-auto flex w-full max-w-6xl flex-col gap-12 sm:gap-14 px-6">
<div className="flex flex-col gap-6 ">
<div className="flex flex-col gap-5">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Tutorials to help you deploy our models in minutes"}
</h2>
</Fade>
</div>
</div>
<div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
<Fade className="h-full">
<a className="group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-3 transition-colors hover:border-[var(--color-stroke-accent)] sm:p-3.5" href="/coming-soon">
<div className="@container relative aspect-[16/9] w-full select-none overflow-hidden rounded-[var(--radius-medium)]" aria-hidden="true" style={{"background": "linear-gradient(145deg, var(--color-iris-50) 0%, var(--color-iris-100) 55%, color-mix(in srgb, var(--color-iris-100) 75%, var(--color-iris-950)) 100%)"} as React.CSSProperties}>
<div className="absolute inset-x-[7%] top-[11%] text-[3.1cqw] leading-normal">
<div className="overflow-hidden rounded-[0.7em] shadow-[0_0.8em_2em_-0.5em_rgb(20_1_45/0.45)] bg-white text-[var(--color-grey-600)]">
<div className="flex items-center gap-[0.4em] border-b px-[0.9em] py-[0.55em] border-[var(--color-grey-250)]">
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="ml-[0.4em] font-mono text-[0.85em] opacity-60">
{"GET /v1/models"}
</span>
</div>
<div className="px-[1.1em] py-[0.9em]">
<div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-[0.7em] gap-y-[0.55em] font-mono [font-variant-ligatures:none]">
<div className="contents">
<span className="size-[0.55em] rounded-full bg-[var(--color-iris-400)]" />
<span className="text-[var(--color-grey-750)]">
{BRAND.modelIdA}
</span>
<span className="text-[var(--color-grey-400)]">
{"—K"}
</span>
</div>
<div className="contents">
<span className="size-[0.55em] rounded-full bg-[var(--color-iris-400)]" />
<span className="text-[var(--color-grey-750)]">
{BRAND.modelIdB}
</span>
<span className="text-[var(--color-grey-400)]">
{"—K"}
</span>
</div>
<div className="contents">
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="text-[var(--color-grey-750)]">
{BRAND.modelIdB}
</span>
<span className="text-[var(--color-grey-400)]">
{"—K"}
</span>
</div>
<div className="contents">
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="text-[var(--color-grey-750)]">
{BRAND.modelIdA}
</span>
<span className="text-[var(--color-grey-400)]">
{"—K"}
</span>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-1 flex-col gap-1.5 px-0.5">
<h3 className="text-style-16-head-bold text-[var(--color-title-default)] tracking-tight">
{"Introduction"}
</h3>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"Start here before you write code. Get an overview of the "}{BRAND.model}{" Model API, its core capabilities, and how it scales with your project."}
</p>
</div>
<span className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-button)] bg-[var(--color-bg-secondary)] px-3 py-2 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-default)] transition-colors group-hover:bg-[var(--color-bg-hover)]">
{"Read the docs"}
</span>
</a>
</Fade>
<Fade className="h-full">
<a className="group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-3 transition-colors hover:border-[var(--color-stroke-accent)] sm:p-3.5" href="/coming-soon">
<div className="@container relative aspect-[16/9] w-full select-none overflow-hidden rounded-[var(--radius-medium)]" aria-hidden="true" style={{"background": "linear-gradient(145deg, var(--color-iris-50) 0%, var(--color-iris-200) 55%, color-mix(in srgb, var(--color-iris-200) 75%, var(--color-iris-950)) 100%)"} as React.CSSProperties}>
<div className="absolute inset-x-[7%] top-[11%] text-[3.1cqw] leading-normal">
<div className="overflow-hidden rounded-[0.7em] shadow-[0_0.8em_2em_-0.5em_rgb(20_1_45/0.45)] bg-[var(--color-grey-800)] text-white/85">
<div className="flex items-center gap-[0.4em] border-b px-[0.9em] py-[0.55em] border-white/10">
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="ml-[0.4em] font-mono text-[0.85em] opacity-60">
{"quickstart.py"}
</span>
</div>
<div className="px-[1.1em] py-[0.9em]">
<pre className="whitespace-pre font-mono text-[0.95em] leading-[1.6] [font-variant-ligatures:none]">
<span className="text-white/40">
{"import"}
</span>
{" os"}

{"\n"}
<span className="text-white/40">
{"from"}
</span>
{" openai"}

{" "}
<span className="text-white/40">
{"import"}
</span>
{" OpenAI"}

{"\n"}

{"client = OpenAI("}

{"\n"}

{"    "}

{"base_url="}
<span className="text-[var(--color-iris-200)]">
{"\"https://api."}{BRAND.domain}{"/v1\""}
</span>
{","}

{"\n"}

{"    "}

{"api_key=os.environ["}
<span className="text-[var(--color-iris-200)]">
{"\""}{BRAND.keyName}{"\""}
</span>
{"])"}

{"\n"}

{"reply = client.chat.completions.create("}

{"\n"}

{"    "}

{"model="}
<span className="text-[var(--color-iris-200)]">
{"\""}{BRAND.modelIdB}{"\""}
</span>
{", messages=[...])"}
</pre>
</div>
</div>
</div>
</div>
<div className="flex flex-1 flex-col gap-1.5 px-0.5">
<h3 className="text-style-16-head-bold text-[var(--color-title-default)] tracking-tight">
{"Quick start"}
</h3>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"Launch your first project in minutes. Follow the setup guide to get your environment ready and make your first successful API request."}
</p>
</div>
<span className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-button)] bg-[var(--color-bg-secondary)] px-3 py-2 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-default)] transition-colors group-hover:bg-[var(--color-bg-hover)]">
{"Read the docs"}
</span>
</a>
</Fade>
<Fade className="h-full">
<a className="group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-3 transition-colors hover:border-[var(--color-stroke-accent)] sm:p-3.5" href="/coming-soon">
<div className="@container relative aspect-[16/9] w-full select-none overflow-hidden rounded-[var(--radius-medium)]" aria-hidden="true" style={{"background": "linear-gradient(145deg, var(--color-iris-50) 0%, var(--color-iris-300) 55%, color-mix(in srgb, var(--color-iris-300) 75%, var(--color-iris-950)) 100%)"} as React.CSSProperties}>
<div className="absolute inset-x-[7%] top-[11%] text-[3.1cqw] leading-normal">
<div className="overflow-hidden rounded-[0.7em] shadow-[0_0.8em_2em_-0.5em_rgb(20_1_45/0.45)] bg-white text-[var(--color-grey-600)]">
<div className="flex items-center gap-[0.4em] border-b px-[0.9em] py-[0.55em] border-[var(--color-grey-250)]">
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="size-[0.55em] rounded-full bg-[var(--color-grey-300)]" />
<span className="ml-[0.4em] font-mono text-[0.85em] opacity-60">
{"app.example.com"}
</span>
</div>
<div className="px-[1.1em] py-[0.9em]">
<div className="flex items-center gap-[0.6em]">
<span className="size-[1.3em] rounded-[0.3em] bg-[var(--color-iris-100)]" />
<span className="h-[0.45em] w-[3.5em] rounded-full bg-[var(--color-grey-250)]" />
<span className="h-[0.45em] w-[2.5em] rounded-full bg-[var(--color-grey-250)]" />
<span className="relative ml-auto">
<span className="block rounded-[0.35em] border border-[var(--color-grey-300)] px-[0.7em] py-[0.25em] text-[0.9em] text-[var(--color-grey-750)]">
{"Sign in"}
</span>
<span className="absolute -inset-[0.35em] rounded-[0.55em] border-[0.14em] border-[var(--color-iris-400)]" />
<span className="absolute right-0 top-[calc(100%+0.9em)] whitespace-nowrap rounded-[0.35em] bg-[var(--color-grey-800)] px-[0.6em] py-[0.3em] font-mono text-[0.85em] text-white">
{"{"}
<span className="text-[var(--color-iris-200)]">
{"\"x\""}
</span>
{": 912,"}

{" "}
<span className="text-[var(--color-iris-200)]">
{"\"y\""}
</span>
{": 64"}

{"}"}
</span>
</span>
</div>
<div className="mt-[1.4em] flex flex-col gap-[0.55em]">
<span className="h-[0.8em] w-[55%] rounded-full bg-[var(--color-grey-300)]" />
<span className="h-[0.45em] w-[70%] rounded-full bg-[var(--color-grey-250)]" />
<span className="h-[0.45em] w-[45%] rounded-full bg-[var(--color-grey-250)]" />
<span className="mt-[0.3em] h-[1.5em] w-[5em] rounded-[0.35em] bg-[var(--color-iris-100)]" />
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-1 flex-col gap-1.5 px-0.5">
<h3 className="text-style-16-head-bold text-[var(--color-title-default)] tracking-tight">
{"Element localization"}
</h3>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"Send a screenshot and a description of the target. "}{BRAND.model}{" returns click coordinates you can use in any agent loop."}
</p>
</div>
<span className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-button)] bg-[var(--color-bg-secondary)] px-3 py-2 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-default)] transition-colors group-hover:bg-[var(--color-bg-hover)]">
{"Read the docs"}
</span>
</a>
</Fade>
<Fade className="h-full">
<a className="group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-3 transition-colors hover:border-[var(--color-stroke-accent)] sm:p-3.5" href="/coming-soon">
<div className="@container relative aspect-[16/9] w-full select-none overflow-hidden rounded-[var(--radius-medium)]" aria-hidden="true" style={{"background": "linear-gradient(145deg, var(--color-iris-50) 0%, var(--color-iris-400) 55%, color-mix(in srgb, var(--color-iris-400) 75%, var(--color-iris-950)) 100%)"} as React.CSSProperties}>
<div className="absolute inset-x-[7%] top-[11%] text-[3.1cqw] leading-normal">
<div className="grid grid-cols-[1fr_auto_1fr] items-start gap-[0.6em] text-[0.8em]">
<div className="rounded-[0.5em] bg-white px-[0.9em] py-[0.8em] text-[var(--color-grey-750)] shadow-[0_0.8em_2em_-0.5em_rgb(20_1_45/0.45)]">
<p className="text-[1.15em] font-semibold">
{"Results"}
</p>
<div className="mt-[0.5em] grid grid-cols-2 border-t border-[var(--color-grey-300)] text-[0.85em]">
<span className="border-b border-[var(--color-grey-300)] py-[0.25em] font-semibold">
{"Model"}
</span>
<span className="border-b border-[var(--color-grey-300)] py-[0.25em] font-semibold">
{"OSWorld"}
</span>
<span className="border-b border-[var(--color-grey-300)] py-[0.25em] ">
{BRAND.modelA}
</span>
<span className="border-b border-[var(--color-grey-300)] py-[0.25em] ">
{"00%"}
</span>
</div>
<p className="mt-[0.6em] text-center font-serif text-[1.05em] italic">
{"Σ xᵢ / n"}
</p>
</div>
<span className="mt-[3.2em] text-[1.2em] text-white/90">
{"→"}
</span>
<div className="overflow-hidden rounded-[0.7em] shadow-[0_0.8em_2em_-0.5em_rgb(20_1_45/0.45)] bg-[var(--color-grey-800)] text-white/85">
<div className="flex items-center gap-[0.4em] border-b px-[0.9em] py-[0.55em] border-white/10">
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="ml-[0.4em] font-mono text-[0.85em] opacity-60">
{"page.md"}
</span>
</div>
<div className="px-[1.1em] py-[0.9em]">
<pre className="whitespace-pre font-mono text-[0.95em] leading-[1.6] [font-variant-ligatures:none]">
<span className="text-[var(--color-iris-200)]">
{"# Results"}
</span>
{"\n"}

{"| Model | OSWorld |"}

{"\n"}
<span className="text-white/40">
{"|---|---|"}
</span>
{"\n"}

{"| "}{BRAND.modelA}{" | 00% |"}

{"\n"}
<span className="text-[var(--color-iris-200)]">
{"$$\\sum x_i / n$$"}
</span>
</pre>
</div>
</div>
</div>
</div>
</div>
<div className="flex flex-1 flex-col gap-1.5 px-0.5">
<h3 className="text-style-16-head-bold text-[var(--color-title-default)] tracking-tight">
{"Document OCR"}
</h3>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"Turn a rendered page into Markdown in one request: headings, tables, equations, and reading order."}
</p>
</div>
<span className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-button)] bg-[var(--color-bg-secondary)] px-3 py-2 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-default)] transition-colors group-hover:bg-[var(--color-bg-hover)]">
{"Read the docs"}
</span>
</a>
</Fade>
<Fade className="h-full">
<a className="group flex h-full flex-col gap-3 rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] p-3 transition-colors hover:border-[var(--color-stroke-accent)] sm:p-3.5" href="/coming-soon">
<div className="@container relative aspect-[16/9] w-full select-none overflow-hidden rounded-[var(--radius-medium)]" aria-hidden="true" style={{"background": "linear-gradient(145deg, var(--color-iris-50) 0%, var(--color-iris-500) 55%, color-mix(in srgb, var(--color-iris-500) 75%, var(--color-iris-950)) 100%)"} as React.CSSProperties}>
<div className="absolute inset-x-[7%] top-[11%] text-[3.1cqw] leading-normal">
<div className="overflow-hidden rounded-[0.7em] shadow-[0_0.8em_2em_-0.5em_rgb(20_1_45/0.45)] bg-[var(--color-grey-800)] text-white/85">
<div className="flex items-center gap-[0.4em] border-b px-[0.9em] py-[0.55em] border-white/10">
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="size-[0.55em] rounded-full bg-white/20" />
<span className="ml-[0.4em] font-mono text-[0.85em] opacity-60">
{"terminal"}
</span>
</div>
<div className="px-[1.1em] py-[0.9em]">
<pre className="whitespace-pre font-mono text-[0.95em] leading-[1.6] [font-variant-ligatures:none]">
<span className="text-white/40">
{"$"}
</span>
{" vllm serve "}{BRAND.weights}{" \\"}

{"\n"}

{"    "}

{"--served-model-name "}{BRAND.modelIdB}

{"\n"}
<span className="text-white/40">
{"INFO"}
</span>
{" Serving on"}

{" "}
<span className="text-[var(--color-iris-200)]">
{"http://0.0.0.0:8000"}
</span>
{"\n"}
<span className="text-white/40">
{"INFO"}
</span>
{" Application startup complete."}
</pre>
</div>
</div>
</div>
</div>
<div className="flex flex-1 flex-col gap-1.5 px-0.5">
<h3 className="text-style-16-head-bold text-[var(--color-title-default)] tracking-tight">
{"Local inference"}
</h3>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add model description]"}
</p>
</div>
<span className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-button)] bg-[var(--color-bg-secondary)] px-3 py-2 text-[length:var(--text-fs-1)] font-medium leading-[var(--text-fs-1--line-height)] text-[var(--color-text-default)] transition-colors group-hover:bg-[var(--color-bg-hover)]">
{"Read the docs"}
</span>
</a>
</Fade>
</div>
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
{"What the Models API gives you from the "}{BRAND.platform}
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
{"[Add feature claim]"}
</p>
</div>
</div>
<div className="w-[85%] shrink-0 snap-start sm:w-auto">
<div className="flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 bg-[var(--color-bg-card)]">
<span className="text-style-12-head-med text-[var(--color-text-accent)]">
{"Included"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default)] tracking-tight">
{"Local inference"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-secondary)]">
{"[Add feature claim]"}
</p>
</div>
</div>
<div className="w-[85%] shrink-0 snap-start sm:w-auto">
<div className="flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 border border-dashed border-white/25">
<span className="text-style-12-head-med text-[var(--color-text-default-alt)] opacity-70">
{"Not included"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default-alt)] tracking-tight">
{"Agent execution engine"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-default-alt)] opacity-75 [&_a]:text-[var(--color-iris-300)] [&_a]:underline">
{"Use the "}
<a href="/agents-api">
{"Agents API"}
</a>
{" for managed agents"}
</p>
</div>
</div>
<div className="w-[85%] shrink-0 snap-start sm:w-auto">
<div className="flex h-full flex-col gap-2 rounded-[var(--radius-medium)] p-4 border border-dashed border-white/25">
<span className="text-style-12-head-med text-[var(--color-text-default-alt)] opacity-70">
{"Not included"}
</span>
<h3 className="text-style-18-head-med text-[var(--color-title-default-alt)] tracking-tight">
{"Environments, console & orchestration"}
</h3>
<p className="text-style-14-body-reg text-[var(--color-text-default-alt)] opacity-75 [&_a]:text-[var(--color-iris-300)] [&_a]:underline">
{"Available with the "}
<a href="/agents-api">
{"Agents API"}
</a>
{" and "}
<a href="/enterprise">
{"Enterprise"}
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
<div className="flex flex-col gap-5">
<Fade >
<h2 className="text-style-36-head-med text-[var(--color-title-default)] tracking-tight max-w-xl">
{"Get started with Models API today"}
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
<a className="whitespace-nowrap text-[var(--color-text-accent)] hover:underline" href="/models-api">
{"About the Models API"}

{" →"}
</a>
</p>
<div className="grid gap-4 md:grid-cols-[repeat(var(--md-cols),minmax(0,1fr))] md:gap-px md:overflow-hidden md:rounded-[var(--radius-large)] md:border md:border-[var(--color-stroke-default)] md:bg-[var(--color-stroke-default)] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" data-keep-light="true" style={{"--rows": "3", "--cols": "3", "--md-cols": "3"} as React.CSSProperties}>
<div className="grid rounded-[var(--radius-large)] border border-[var(--color-stroke-default)] bg-[var(--color-bg-card)] md:row-span-(--rows) md:grid-rows-subgrid md:gap-0 md:rounded-none md:border-0">
<div className="flex flex-col gap-4 p-6">
<div className="flex flex-col gap-1.5">
<div className="flex flex-wrap items-start gap-2">
<h3 className="text-style-16-head-med text-[var(--color-title-default)] tracking-tight">
{"Free tier"}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"$0"}
</p>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add offer terms]"}
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
{"[Add offer terms]"}
</h3>
</div>
<p className="text-style-16-head-med text-[var(--color-text-default)] font-mono">
{"Per token"}
</p>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{"[Add offer terms]"}
</p>
</div>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] w-fit" href="/coming-soon">
{"Add credits"}
</a>
</div>
<ul className="md:contents">
<li className="border-t border-[var(--color-stroke-default)] px-6 py-3.5 ">
<span className="flex items-start gap-2">
<svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-icon-tertiary)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
</svg>
<p className="text-style-12-body-reg text-[var(--color-text-secondary)]">
{BRAND.modelA}{" and "}{BRAND.modelB}
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
<p className="text-style-12-body-reg text-[var(--color-text-tertiary)] max-w-2xl">
{"[Add offer terms]"}
</p>
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
{"Models, billing, credits, and how your data is handled."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className="max-w-3xl">
<Faq questions={[`What is the ${BRAND.name} Models API?`, `What is ${BRAND.model} and how does it perform?`, `How much does the Models API cost?`, `Can I run ${BRAND.model} models locally?`, `Which ${BRAND.model} model should I use?`, `How to get started with ${BRAND.model} models?`, `How can I contact support?`, `How does inference billing work?`, `How to monitor my usage?`, `Do credits expire?`, `I can't see my credits. What should I do?`, `My credit balance is negative. How is that possible?`, `What is the refund policy?`, `Do you offer a free tier?`, `What data is logged and retained?`, `Do you share data with other third parties?`]} />
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
{"Multimodal models for real-world use"}
</h2>
</Fade>
<Fade >
<p className="text-style-16-body-reg text-[var(--color-text-secondary)]   ">
{"Process text, images, and documents, with computer-use capabilities for any digital environment. Rate-limited free tier, pay-as-you-go beyond."}
</p>
</Fade>
</div>
</div>
<Fade >
<div className="flex flex-col gap-3 sm:flex-row">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] border border-[var(--color-stroke-default)] bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-hover)]" href="/coming-soon">
{"Explore docs"}
</a>
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-5 py-2.5 text-[length:var(--text-fs-2)] leading-[var(--text-fs-2--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] bg-[var(--color-bg-accent)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-grey-750)] max-sm:order-first" href="/coming-soon">
{"Get API key"}
</a>
</div>
</Fade>
</div>
</div>
</section>
<div className="fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 motion-reduce:transition-none sm:bottom-6 sm:right-6 pointer-events-none translate-y-3 opacity-0" aria-hidden="true">
<a className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 px-6 py-3 text-[length:var(--text-fs-3)] leading-[var(--text-fs-3--line-height)] bg-[var(--color-bg-accent-alt)] text-[var(--color-text-default-alt)] hover:bg-[var(--color-iris-700)] shadow-[0_10px_30px_rgb(4_4_5_/18%)]" href="/coming-soon" tabIndex={-1}>
{"Get API key"}

{" "}
<span aria-hidden="true">
{"→"}
</span>
</a>
</div>
    </>
  );
}
