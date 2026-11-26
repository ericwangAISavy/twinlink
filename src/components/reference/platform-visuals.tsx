import Image from "next/image";
import { WindowDots } from "./ui";

const CARD = "overflow-hidden rounded-[12px] border !border-grey-250 bg-white shadow-[0_20px_50px_-18px_rgba(13,13,18,0.25)]";

export function DeploymentPlan() {
  const steps = ["Discovery", "Prototyping", "Proposal", "Launch", "Scale"];
  const current = 3;
  return (
    <div className={`${CARD} mx-auto w-full max-w-[420px]`}>
      <div className="flex items-center gap-2 border-b !border-grey-250 px-4 py-3">
        <WindowDots /><span className="ml-2 font-mono text-[11px] text-grey-500">deployment-plan</span>
      </div>
      <ol className="flex flex-col gap-1 p-4">
        {steps.map((step, index) => (
          <li key={step} className={`flex items-center gap-3 rounded-[6px] px-3 py-2.5 ${index === current ? "bg-grey-200" : ""}`}>
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${index <= current ? "bg-grey-900 text-white" : "border !border-grey-250 text-grey-500"}`}>{index < current ? "✓" : index + 1}</span>
            <span className={`text-[14px] font-medium ${index > current ? "text-grey-500" : ""}`}>{step}</span>
            {index === current && <span className="ml-auto rounded-[6px] bg-grey-900 px-2 py-0.5 text-[10px] font-medium text-white">FDEs on-site</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BrowserAgent() {
  return (
    <div>
      <div className="mb-5 inline-flex rounded-full bg-grey-200 p-1 text-[12px] font-semibold">
        <span className="rounded-full bg-iris-600 px-4 py-1.5 text-white">Browser</span>
        <span className="rounded-full px-4 py-1.5 text-grey-500">Desktop</span>
      </div>
      <div className={CARD}>
        <div className="flex items-center gap-2 border-b !border-grey-250 bg-grey-200 px-4 py-3">
          <WindowDots /><span className="ml-2 rounded-[8px] border !border-grey-250 bg-white px-3 py-1 font-mono text-[12px] text-grey-500">app.yourcompany.com/claims</span>
        </div>
        <div className="relative min-h-[280px] bg-[linear-gradient(var(--color-grey-200)_0_1px,transparent_1px)] bg-[length:100%_46px] px-8 py-9">
          <div className="mb-4 text-[12px] font-semibold text-grey-500">Claim #4471: Expense report</div>
          <div className="inline-flex items-center gap-2 rounded-[8px] bg-grey-900 px-4 py-2.5 text-[12px] font-semibold text-white">Submit claim</div>
          <div aria-hidden="true" className="hc-click absolute left-[105px] top-[74px] h-9 w-9 rounded-full border-2 !border-iris-600" />
          <Image src="/hc/agent-cursor.svg" alt="" width={43} height={37} unoptimized className="hc-cursor absolute left-10 top-[130px] w-[43px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]" />
        </div>
      </div>
    </div>
  );
}

export function ModelCode() {
  const kw = "font-semibold text-iris-400";
  const str = "text-[#1e7a52]";
  return (
    <div className={CARD}>
      <div className="flex items-center gap-2 border-b !border-grey-250 bg-grey-200 px-4 py-3.5">
        <WindowDots /><span className="ml-2 font-mono text-[12px] text-grey-500">model.py</span>
      </div>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[11px] leading-[1.85] sm:px-6 sm:text-[13px]">
        <span className={kw}>from</span> openai <span className={kw}>import</span> OpenAI{"\n\n"}
        client = OpenAI({"\n"}
        {"  "}base_url=<span className={str}>&quot;https://api.twinlink.example/v1/&quot;</span>,{"\n"}
        {"  "}api_key=os.environ[<span className={str}>&quot;ORIN_API_KEY&quot;</span>]{"\n"}
        ){"\n\n"}
        <span className="text-grey-500"># switch models with one line</span>{"\n"}
        response = client.chat.completions.create({"\n"}
        {"  "}model=<span className={str}>&quot;orin-35b-a3b&quot;</span>,{"\n"}
        {"  "}messages=[...]{"\n"}
        )<span aria-hidden="true" className="hc-caret ml-0.5 inline-block h-[15px] w-[7px] translate-y-[2px] bg-grey-750" />
      </pre>
    </div>
  );
}

const ICONS = {
  plus: "M8 4v8 M4 8h8",
  panel: "M3.5 3.5h9v9h-9z M9.5 3.5v9",
  clock: "M8 2.8a5.2 5.2 0 100 10.4 5.2 5.2 0 000-10.4z M8 5.5V8l1.8 1.2",
  gear: "M8 6a2 2 0 100 4 2 2 0 000-4z M8 2.6v1.6 M8 11.8v1.6 M2.6 8h1.6 M11.8 8h1.6",
  mail: "M2.5 4.5h11v7h-11z M3 5l5 3.8L13 5",
  globe: "M8 2.8a5.2 5.2 0 100 10.4 5.2 5.2 0 000-10.4z M2.8 8h10.4 M8 2.8c-3.4 3.2-3.4 7.2 0 10.4 3.4-3.2 3.4-7.2 0-10.4",
  calendar: "M3 4.5h10v8.5H3z M3 7.5h10 M5.8 2.8v2.4 M10.2 2.8v2.4",
  send: "M8 12V4.5 M4.8 7.2L8 4l3.2 3.2",
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

function TabPanel({ dark }: { dark: boolean }) {
  const line = dark ? "!border-grey-700" : "!border-grey-250";
  const chip = `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] leading-[18px] ${line} ${dark ? "text-grey-200" : "bg-white"}`;
  const muted = dark ? "text-grey-400" : "text-grey-500";
  return (
    <div className={`overflow-hidden rounded-[12px] border ${line} ${dark ? "bg-grey-800 shadow-[0_20px_50px_-18px_rgba(13,13,18,0.5)]" : "bg-grey-200 shadow-[0_20px_50px_-18px_rgba(13,13,18,0.18)]"}`}>
      <div className="flex items-center justify-end gap-2 px-4 pt-4">
        {(["plus", "panel", "clock", "gear"] as const).map(name => <span key={name} className={`flex h-7 w-7 items-center justify-center rounded-full border ${line} ${muted} ${dark ? "" : "bg-white"}`}><Icon name={name} /></span>)}
      </div>
      <div className="px-4 pb-6 pt-8">
        <div className={`mb-3 text-[14px] font-bold leading-[21px] ${dark ? "text-grey-200" : ""}`}>Try a task</div>
        <div className="flex flex-col items-start gap-2">
          {([["mail", "Digest and draft Gmail replies"], ["globe", "Book me a restaurant"], ["calendar", "Prep me for tomorrow"]] as const).map(([name, label]) => <span key={label} className={chip}><span className={muted}><Icon name={name} /></span>{label}</span>)}
        </div>
      </div>
      <div className="flex justify-end px-3 pb-2">
        <span className={`${chip} ${dark ? "bg-grey-750" : ""}`}>
          <span className={`flex h-3 w-3 items-center justify-center rounded-full border ${dark ? "!border-grey-400" : "!border-grey-500"}`}><span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-grey-400" : "bg-grey-500"}`} /></span>
          Record a routine
        </span>
      </div>
      <div className={`m-3 mt-2 rounded-[12px] border p-3 ${line} ${dark ? "bg-grey-775" : "bg-white"}`}>
        <div className="text-[14px] leading-[21px] text-grey-500">Describe a task or type / for routines</div>
        <div className={`mt-4 flex items-center gap-2.5 ${muted}`}>
          <span className="truncate font-mono text-[10px]">Orin</span>
          <span className={`ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${dark ? "bg-grey-600 text-grey-200" : "bg-grey-200 text-grey-700"}`}><Icon name="send" /></span>
        </div>
      </div>
    </div>
  );
}

export function OrinTabStack() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-[320px] rotate-[15deg]">
      <div className="hc-fan absolute inset-0"><TabPanel dark /></div>
      <div className="hc-fan-front relative"><TabPanel dark={false} /></div>
    </div>
  );
}
