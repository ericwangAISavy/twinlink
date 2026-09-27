"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STUDIES = [
  {
    eyebrow: "AI & automation",
    title: "Enterprise AI Platform",
    body: "Built a scalable AI platform with dedicated engineering teams, from architecture to deployment.",
    href: "/about",
    src: "/images/case-study-skyline.jpg",
    alt: "City skyline at dusk along the river",
  },
  {
    eyebrow: "Cloud & delivery",
    title: "Modernization at scale",
    body: "Re-platformed a core product onto a secure cloud foundation while the business kept shipping.",
    href: "/about",
    src: "/images/how-we-help-architecture.jpg",
    alt: "Glass tower catching sunset light",
  },
] as const;

export function CaseStudySlider() {
  const [index, setIndex] = useState(0);
  const study = STUDIES[index];

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative aspect-[16/9] min-h-[240px]">
        <Image
          key={study.src}
          src={study.src}
          alt={study.alt}
          fill
          className="study-fade object-cover"
          sizes="(min-width: 768px) 55vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8d5a3]">{study.eyebrow}</p>
          <h3 className="mt-2 font-serif text-2xl md:text-3xl">{study.title}</h3>
          <p className="mt-2 max-w-lg text-sm text-white/80">{study.body}</p>
          <Link href={study.href} className="mt-4 inline-flex text-sm text-[#e8d5a3] hover:underline">
            Read case study
          </Link>
        </div>
      </div>
      <div className="absolute right-4 top-4 flex gap-2">
        <button
          type="button"
          aria-label="Previous case study"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/40 text-white hover:bg-black/60"
          onClick={() => setIndex((value) => (value === 0 ? STUDIES.length - 1 : value - 1))}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next case study"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/40 text-white hover:bg-black/60"
          onClick={() => setIndex((value) => (value === STUDIES.length - 1 ? 0 : value + 1))}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
