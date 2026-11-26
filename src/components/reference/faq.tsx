"use client";

import { useState } from "react";

const SHOWN = 5;

export function Faq({ questions }: { questions: string[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [all, setAll] = useState(false);
  const visible = all ? questions : questions.slice(0, SHOWN);
  const rest = questions.length - SHOWN;
  return (
    <div className="mx-auto w-full max-w-3xl">
      {visible.map((question, index) => (
        <div key={question} className="border-b !border-[var(--color-stroke-default)] pb-1">
          <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 pb-3 pt-4 text-left">
            <span className="text-[16px] font-medium leading-6 text-[var(--color-text-default)]">{question}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className={`shrink-0 text-grey-500 transition-transform duration-200 ${open === index ? "rotate-45" : ""}`}>
              <path d="M8 3v10M3 8h10" />
            </svg>
          </button>
          {open === index && <p className="hc-panel max-w-2xl pb-3 pr-8 text-[14px] leading-5 text-[var(--color-text-secondary)]">[Add answer]</p>}
        </div>
      ))}
      {rest > 0 && !all && (
        <button type="button" onClick={() => setAll(true)} className="mt-4 rounded-[8px] border !border-[var(--color-stroke-default)] px-5 py-2.5 text-[14px] font-medium leading-5">Show {rest} more questions</button>
      )}
    </div>
  );
}
