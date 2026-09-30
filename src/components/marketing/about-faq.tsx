"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const QUESTIONS = [
  {
    question: "What kind of people do well here?",
    answer: "Curious, reliable, and people who enjoy ownership and difficult problems.",
  },
  {
    question: "What is it like to work at TwinLink?",
    answer: "Direct communication, high ownership, and real impact on the product.",
  },
  {
    question: "Do you use AI in your work?",
    answer: "Yes. AI is a tool we actively use, with human judgment and responsibility.",
  },
] as const;

export function AboutFaq() {
  const [open, setOpen] = useState<boolean[]>(() => QUESTIONS.map(() => true));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {QUESTIONS.map((item, index) => {
        const expanded = open[index];
        return (
          <div key={item.question} className="rounded-2xl border border-white/10 bg-[#171512] px-5 py-4">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 text-left"
              aria-expanded={expanded}
              onClick={() =>
                setOpen((current) => current.map((value, itemIndex) => (itemIndex === index ? !value : value)))
              }
            >
              <span className="font-medium text-white">{item.question}</span>
              <ChevronRight className="mt-0.5 size-4 shrink-0 text-white/55" aria-hidden />
            </button>
            {expanded ? <p className="mt-3 text-sm leading-relaxed text-white/55">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
