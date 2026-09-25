"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-card text-card-foreground border border-border shadow-md",
        },
      }}
    />
  );
}
