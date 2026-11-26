"use client";

import { useState } from "react";

/** The reproduction never submits form data anywhere. */
export function InertForm({ children, ...props }: React.ComponentProps<"form">) {
  const [tried, setTried] = useState(false);
  return (
    <form {...props} onSubmit={(event) => { event.preventDefault(); setTried(true); }}>
      {children}
      {tried && <p role="status" className="mt-3 text-[14px] leading-5 text-iris-600">This form is not connected. Nothing was sent.</p>}
    </form>
  );
}
