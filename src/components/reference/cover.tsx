/** Typographic stand-in for a cover image. */
export function Cover({ title = "Orin", dark = false }: { title?: string; dark?: boolean }) {
  return (
    <span aria-hidden="true" className={`flex h-full w-full items-center justify-center p-2 text-center font-medium leading-tight tracking-tight ${dark ? "bg-grey-900 text-[36px] text-white" : "bg-[linear-gradient(145deg,var(--color-iris-50),var(--color-iris-100))] text-[clamp(12px,3vw,32px)] text-iris-700"}`}>
      {title}
    </span>
  );
}
