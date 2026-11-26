"use client";

import { useEffect, useRef, useState } from "react";

/** Entrance used across the page: 16px rise and fade, 0.8s, once, when scrolled into view. */
export function Fade({ delay = 0, className = "", children }: { delay?: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || node.getBoundingClientRect().top < window.innerHeight) return;
    setPending(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setPending(false);
      observer.disconnect();
    }, { rootMargin: "0px 0px -40px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-fade={pending ? "pending" : undefined} className={`hc-fade ${className}`} style={{ "--delay": `${delay}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}
