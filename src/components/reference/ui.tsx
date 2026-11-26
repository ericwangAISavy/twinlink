import { BRAND } from "./brand";
import { href } from "./links";

const BUTTON = "inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-2.5 text-[14px] leading-5 font-medium transition-colors duration-200";
const VARIANTS = {
  primary: "bg-iris-600 text-white hover:bg-iris-700",
  secondary: "border !border-grey-250 text-grey-750 hover:bg-grey-250",
};

export function Button({ to, variant = "primary", className = "", children }: { to: string; variant?: keyof typeof VARIANTS; className?: string; children: React.ReactNode }) {
  return <a href={href(to)} className={`${BUTTON} ${VARIANTS[variant]} ${className}`}>{children}</a>;
}

export function Arrow({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`transition-transform duration-200 group-hover:translate-x-1 ${className}`}>→</span>;
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 28 28" aria-hidden="true" className="h-7 w-7">
        <circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="6" />
      </svg>
      <span className="text-[20px] font-bold leading-7 tracking-tight">{BRAND.name}</span>
    </span>
  );
}

export function WindowDots({ small = false }: { small?: boolean }) {
  const size = small ? "h-1.5 w-1.5 opacity-80" : "h-2.5 w-2.5";
  return (
    <span aria-hidden="true" className={`flex items-center ${small ? "gap-1.5" : "gap-2"}`}>
      {["bg-[#FF5F57]", "bg-[#FEBC2E]", "bg-[#28C840]"].map(color => <span key={color} className={`rounded-full ${size} ${color}`} />)}
    </span>
  );
}
