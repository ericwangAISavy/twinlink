"use client";

// Behaviour for captured pages: each component attaches to markup that is already rendered.
import { useEffect } from "react";
import panels from "@/content/scorecard.json";

/** Buttons carrying data-copy put that text on the clipboard. */
export function CopyButtons() {
  useEffect(() => {
    const onClick = async (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>("[data-copy]");
      if (!button) return;
      const label = button.textContent;
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? "");
        button.textContent = "Copied";
      } catch {
        button.textContent = "Copy failed";
      }
      window.setTimeout(() => { button.textContent = label; }, 1600);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

/** Run-cost calculator, using the formulas printed on the page. */
export function Calculator() {
  useEffect(() => {
    const input = (id: string) => document.getElementById(`calc-${id}`) as HTMLInputElement | null;
    const ids = ["bots", "lic", "breaks", "hrs", "coe", "exc", "mins", "ops"];
    const panel = input("bots")?.closest("section")?.querySelector<HTMLElement>("[aria-live]");
    if (!panel) return;
    const money = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;
    const total = panel.querySelector("h3");
    const values = panel.querySelectorAll("dd");
    const bars = panel.querySelectorAll<HTMLElement>("[style*='width']");
    const update = () => {
      const [bots, licence, breaks, hours, coe, exceptions, minutes, ops] = ids.map((id) => Math.max(0, Number(input(id)?.value) || 0));
      const breakFix = breaks * hours * coe * 12;
      const handling = exceptions * (minutes / 60) * ops * 12;
      const sum = licence + breakFix + handling;
      if (total) total.textContent = money(sum);
      const rows = [money(breakFix), money(handling), bots ? money(sum / bots) : "–", sum ? `${Math.round((100 * (breakFix + handling)) / sum)}%` : "–"];
      values.forEach((cell, index) => { cell.textContent = rows[index] ?? cell.textContent; });
      [licence, breakFix, handling].forEach((part, index) => { if (bars[index]) bars[index].style.width = `${sum ? (100 * part) / sum : 0}%`; });
    };
    const inputs = ids.map(input).filter((element): element is HTMLInputElement => element !== null);
    inputs.forEach((element) => element.addEventListener("input", update));
    update();
    return () => inputs.forEach((element) => element.removeEventListener("input", update));
  }, []);
  return null;
}

const SECTIONS = [
  { name: "Volume", questions: [0, 1], gap: "Volume is the gap: pick a queue with at least 1,000 items a month, or combine two similar queues." },
  { name: "Variety", questions: [2, 3], gap: "Variety is the gap: narrow the scope to the two or three most common exception types first." },
  { name: "Systems", questions: [4, 5], gap: "Systems are the gap: arrange a user-level test account on the systems the work touches." },
  { name: "Judgment", questions: [6, 7, 8], gap: "Judgment is the gap: write down the rules for the calls people make today, and how you'd check a result." },
  { name: "Readiness", questions: [9, 10, 11], gap: "Readiness is the gap: line up a sandbox, a sponsor and a process owner before you start." },
];
const CHOSEN = ["border-transparent", "bg-[var(--color-bg-accent)]", "text-[var(--color-bg-primary)]"];
const IDLE = ["border-[var(--color-stroke-default)]", "bg-[var(--color-bg-card)]", "text-[var(--color-text-secondary)]", "hover:bg-[var(--color-bg-hover)]"];

/** Two questions give full points for the middle answer as well as the last one. */
const MIDDLE_IS_FULL = new Set([2, 4]);
const points = (question: number, answer: number | undefined) =>
  answer === undefined ? 0 : answer === 1 && MIDDLE_IS_FULL.has(question) ? 2 : answer;

/** Verdict rules observed on the reference scorecard (12 questions, 0 to 2 points each). */
export function scoreQueue(answers: (number | undefined)[]) {
  const sections = SECTIONS.map((section) => ({
    ...section,
    score: section.questions.reduce((sum, q) => sum + points(q, answers[q]), 0),
    max: section.questions.length * 2,
  }));
  const total = sections.reduce((sum, section) => sum + section.score, 0);
  const remaining = 12 - answers.filter((answer) => answer !== undefined).length;
  const volumeMissing = answers[0] !== 2;
  const sandboxMissing = !answers[9];
  const verdict = remaining ? "empty" : total < 11 ? "no" : total >= 18 && !volumeMissing && !sandboxMissing ? "ready" : "close";
  const weakest = sections.reduce((low, section) => (section.score / section.max < low.score / low.max ? section : low));
  const gap = (volumeMissing ? sections[0] : sandboxMissing ? sections[4] : weakest).gap;
  return { sections, total, remaining, verdict: verdict as keyof typeof panels, gap };
}

export function Scorecard() {
  useEffect(() => {
    const main = document.querySelector("main");
    const buttons = [...(main?.querySelectorAll<HTMLButtonElement>("button[aria-pressed]") ?? [])];
    const panel = [...(main?.querySelectorAll<HTMLElement>("[aria-live]") ?? [])].find((element) => element.textContent?.includes("Your result"));
    if (buttons.length !== 36 || !panel) return;
    const answers: (number | undefined)[] = Array(12).fill(undefined);

    const show = () => {
      const result = scoreQueue(answers);
      const template = document.createElement("div");
      // The templates are static markup captured from the reference, bundled with the app.
      template.innerHTML = panels[result.verdict];
      panel.innerHTML = template.firstElementChild?.innerHTML ?? "";
      const heading = panel.querySelector("h3");
      if (heading) heading.textContent = `${result.total} / 24`;
      const labels = [...panel.querySelectorAll("span")];
      result.sections.forEach((section) => {
        const label = labels.find((span) => span.textContent === section.name);
        const row = label?.parentElement;
        if (!row?.parentElement || !label?.nextElementSibling) return;
        label.nextElementSibling.textContent = `${section.score}/${section.max}`;
        const bar = row.parentElement.querySelector<HTMLElement>("[style]");
        if (bar) bar.style.width = `${(100 * section.score) / section.max}%`;
      });
      const paragraphs = [...panel.querySelectorAll("p")];
      if (result.verdict === "empty") {
        const waiting = paragraphs.find((p) => p.textContent?.startsWith("Answer all"));
        if (waiting) waiting.textContent = `Answer all 12 questions to see your result. ${result.remaining} to go.`;
      }
      if (result.verdict === "close") {
        const line = paragraphs.find((p) => / (is|are) the gap:/.test(p.textContent ?? ""));
        if (line) line.textContent = result.gap;
      }
    };

    const onClick = (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const index = buttons.indexOf(button);
      const question = Math.floor(index / 3);
      answers[question] = index % 3;
      buttons.slice(question * 3, question * 3 + 3).forEach((option) => {
        const on = option === button;
        option.setAttribute("aria-pressed", String(on));
        option.classList.remove(...(on ? IDLE : CHOSEN));
        option.classList.add(...(on ? CHOSEN : IDLE));
      });
      show();
    };
    buttons.forEach((button) => button.addEventListener("click", onClick));
    return () => buttons.forEach((button) => button.removeEventListener("click", onClick));
  }, []);
  return null;
}

/** Filters story cards on the newsroom-style pages as the visitor types. */
export function StorySearch() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const apply = (query: string) => {
      main.querySelectorAll<HTMLAnchorElement>("a[href^='/newsroom/']").forEach((link) => {
        const card = link.closest<HTMLElement>("li, article") ?? link;
        card.style.display = !query || card.textContent?.toLowerCase().includes(query) ? "" : "none";
      });
    };
    const onInput = (event: Event) => {
      const field = event.target as HTMLInputElement;
      if (field.tagName !== "INPUT" || field.closest("form")) return;
      const query = field.value.trim().toLowerCase();
      // Reveal the stories behind "See more" before filtering.
      const more = [...main.querySelectorAll("button")].find((button) => button.textContent?.startsWith("See more"));
      if (query && more) {
        const value = field.value;
        more.click();
        window.setTimeout(() => {
          const next = main.querySelector<HTMLInputElement>("input:not(form input)");
          if (next) { next.value = value; next.focus(); }
          apply(query);
        }, 50);
      } else apply(query);
    };
    main.addEventListener("input", onInput);
    return () => main.removeEventListener("input", onInput);
  }, []);
  return null;
}
