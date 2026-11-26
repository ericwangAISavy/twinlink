"use client";

import { useState } from "react";

/** Shows one of several captured states; buttons marked with data-swap choose which. */
export function Swap({ states, initial = 0 }: { states: React.ReactNode[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  return (
    <div className="contents" onClick={(event) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>("[data-swap]");
      if (button) setActive(Number(button.dataset.swap));
    }}>
      {states[active]}
    </div>
  );
}
