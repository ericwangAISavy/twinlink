"use client";

import { useEffect } from "react";

// Observed on the reference: dark up to about 250px of scroll, then a short animated
// switch to light (not tied to scroll position). The duration is an estimate.
const THRESHOLD = 250;
const DURATION = 600;

export function HeroWash() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hc");
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let mix = 100;
    let target = 100;

    const apply = () => {
      root.style.setProperty("--hero-mix", `${Math.round(mix)}%`);
      root.toggleAttribute("data-dark", mix > 50);
    };
    const update = (instant = false) => {
      const next = window.scrollY > THRESHOLD ? 0 : 100;
      if (next === target && !instant) return;
      target = next;
      cancelAnimationFrame(frame);
      if (instant || reduced) {
        mix = target;
        apply();
        return;
      }
      const from = mix;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION);
        mix = from + (target - from) * progress * (2 - progress);
        apply();
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    const onScroll = () => update();

    root.setAttribute("data-wash", "");
    update(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      root.removeAttribute("data-wash");
      root.removeAttribute("data-dark");
      root.style.removeProperty("--hero-mix");
    };
  }, []);
  return null;
}
