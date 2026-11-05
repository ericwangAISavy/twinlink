"use client";
import { useEffect, useState } from "react";
import { ReferenceIcon } from "./reference-icon";
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 100);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <button type="button" aria-label="Back to top" className={`foundation-back-top${visible ? " is-visible" : ""}`}
    tabIndex={visible ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>
    <ReferenceIcon name="arrow-up-short" />
  </button>;
}
