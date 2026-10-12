"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (
      navigator.doNotTrack === "1" ||
      (navigator as Navigator & { globalPrivacyControl?: boolean })
        .globalPrivacyControl
    )
      return;
    try {
      if (localStorage.getItem("twinlink-visitor-opt-out") === "true") return;
      const key = `twinlink-visit:${pathname}`;
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last < 60000) return;
      sessionStorage.setItem(key, String(Date.now()));
    } catch {
      /* Storage may be disabled. Recording needs no cookie or browser ID. */
    }
    const data = JSON.stringify({ page: pathname });
    if (
      !navigator.sendBeacon ||
      !navigator.sendBeacon(
        "/api/visits",
        new Blob([data], { type: "application/json" }),
      )
    )
      void fetch("/api/visits", {
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
  }, [pathname]);
  return null;
}
