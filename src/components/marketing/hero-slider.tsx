"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    src: "/images/how-we-help-teams.jpg",
    alt: "Twinlink team meeting at sunset in a city office",
    position: "object-[68%_center]",
  },
  {
    src: "/images/how-we-help-architecture.jpg",
    alt: "Sunset reflecting across a glass tower",
    position: "object-[center_40%]",
  },
  {
    src: "/images/twinlink-lobby.jpg",
    alt: "Twinlink lobby with the team walking through headquarters",
    position: "object-[center_42%]",
  },
] as const;

const INTERVAL_MS = 7000;

export function HeroSlider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((nextIndex: number, dir: "next" | "prev") => {
    setDirection(dir);
    setIndex((nextIndex + SLIDES.length) % SLIDES.length);
  }, []);

  const step = useCallback((dir: "next" | "prev") => {
    setDirection(dir);
    setIndex((current) => (current + (dir === "next" ? 1 : -1) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setDirection("next");
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  return (
    <section
      className="relative -mt-[4.25rem] overflow-hidden text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured photography"
    >
      <div className="absolute inset-0">
        {SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slide.src}
              data-dir={direction}
              data-state={active ? "active" : "idle"}
              className="hero-slide-layer"
              aria-hidden={!active}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                quality={95}
                sizes="100vw"
                className={cn("hero-slide-image object-cover", slide.position)}
              />
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/88 via-black/50 to-black/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#11100e] to-transparent" />
      </div>

      <div className="relative z-[2] mx-auto flex min-h-[86vh] max-w-6xl items-center px-4 pb-28 pt-32 md:min-h-[92vh] md:pb-36 md:pt-36">
        {children}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => step("prev")}
        className="absolute top-1/2 left-3 z-[3] hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-[#c4a574]/70 bg-black/20 text-[#e8d5a3] backdrop-blur-sm transition hover:bg-[#c4a574]/15 md:grid lg:left-6"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => step("next")}
        className="absolute top-1/2 right-3 z-[3] hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-[#c4a574]/70 bg-black/20 text-[#e8d5a3] backdrop-blur-sm transition hover:bg-[#c4a574]/15 md:grid lg:right-6"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-8 left-0 z-[3] w-full md:bottom-10">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4">
          {SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? true : undefined}
              onClick={() => goTo(slideIndex, slideIndex > index ? "next" : "prev")}
              className={cn(
                "h-[3px] overflow-hidden rounded-full transition-all duration-500",
                slideIndex === index ? "w-11 bg-white/20" : "w-4 bg-white/30 hover:bg-white/50",
              )}
            >
              {slideIndex === index ? (
                <span
                  key={`${index}-${paused}`}
                  className={cn("hero-slide-progress block h-full bg-[#c4a574]", paused && "hero-slide-progress-paused")}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
