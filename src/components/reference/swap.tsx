"use client";

import { useState } from "react";

/**
 * Shows one of several captured states; buttons marked with data-swap choose which.
 * With `toggle`, state 0 is the untouched page and clicking the active choice returns to it.
 */
export function Swap({ states, initial = 0, toggle = false }: { states: React.ReactNode[]; initial?: number; toggle?: boolean }) {
  const [active, setActive] = useState(initial);
  return (
    <div className="contents" onClick={(event) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>("[data-swap]");
      if (!button) return;
      const next = Number(button.dataset.swap);
      setActive((current) => (toggle && current === next ? 0 : next));
    }}>
      {states[active]}
    </div>
  );
}
