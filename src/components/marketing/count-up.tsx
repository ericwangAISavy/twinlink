"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates the numeric part of a stat ("475+", "$2.5M", "98%") from 0 when it scrolls into view.
 * Server render and no-JS / reduced-motion visitors always see the final value.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (!match || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, number, suffix] = match;
    const target = Number(number.replace(/,/g, ""));
    const decimals = number.includes(".") ? number.split(".")[1].length : 0;
    const format = (n: number) => `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    let frame = 0;
    setDisplay(format(0));
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(format(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);

  return <span ref={ref} aria-label={value}><span aria-hidden="true">{display}</span></span>;
}
