"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_SLIDES = [
  {
    src: "/images/hero-team-office.jpg",
    alt: "Twinlink team reviewing work on a large display",
    position: "object-[32%_center]",
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

const INTERVAL_MS = 5000;

export function HeroSlider({ children, slides, captions }: {
  children?: ReactNode;
  slides?: readonly { src: string; alt: string; position?: string }[];
  captions?: readonly ReactNode[];
}) {
  const SLIDES = slides?.length ? slides : DEFAULT_SLIDES;
  const slideCount = SLIDES.length;
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [manualPause, setManualPause] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const paused = hoverPaused || focusPaused;

  const goTo = useCallback((nextIndex: number, dir: "next" | "prev") => {
    setDirection(dir);
    setIndex((nextIndex + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || manualPause || reducedMotion) return;
    const timer = window.setInterval(() => {
      setDirection("next");
      setIndex((current) => (current + 1) % slideCount);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, manualPause, reducedMotion, index, slideCount]);

  return (
    <section
      className="foundation-hero"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      aria-roledescription="carousel"
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocusPaused(false); }}
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
                quality={slideIndex === 0 ? 80 : 70}
                sizes="100vw"
                className={cn("hero-slide-image object-cover", slide.position)}
              />
            </div>
          );
        })}

      </div>

      <div className="foundation-hero-caption-area">
        <div className="foundation-hero-caption" key={index}>{captions?.[index] ?? children}</div>
      </div>
      <div className="foundation-hero-controls">
        <div className="foundation-hero-dots" aria-label="Choose photograph">
          {SLIDES.map((slide, slideIndex) => (
            <button key={slide.src} type="button" aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? true : undefined}
              onClick={() => goTo(slideIndex, slideIndex > index ? "next" : "prev")}
              className={cn("foundation-hero-dot", slideIndex === index && "is-active")} />
          ))}
        </div>
        <button type="button" className="foundation-hero-pause" disabled={reducedMotion} aria-label={reducedMotion ? "Automatic slideshow disabled for reduced motion" : manualPause ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={manualPause} onClick={() => setManualPause(value => !value)}>
          {manualPause ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </section>
  );
}
