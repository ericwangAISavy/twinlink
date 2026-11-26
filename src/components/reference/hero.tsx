import { BRAND } from "./brand";
import { Fade } from "./fade";
import { HeroDots } from "./hero-dots";
import { Button } from "./ui";

export function Hero() {
  return (
    <div className="relative z-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 translate-y-2 blur-[18px]">
        <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(28,28,38,0),rgba(28,28,38,0.1))]" />
      </div>
      <section className="relative flex min-h-[75vh] flex-col justify-between overflow-hidden bg-white px-6 pb-16 pt-14 sm:pt-20">
        <HeroDots />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[72rem] max-w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.8),rgba(255,255,255,0.6)_60%,transparent)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 text-center">
          <Fade className="w-full">
            <h1 className="w-full text-balance text-[clamp(1.75rem,calc((100vw-3rem)/14),60px)] font-bold leading-[1.1] tracking-tight">Operational intelligence for the enterprise</h1>
          </Fade>
          <Fade delay={0.1}>
            <p className="t16 max-w-2xl text-grey-600">{BRAND.name} is [add a one-sentence description of what the company does and who it is for].</p>
          </Fade>
          <Fade delay={0.2}>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button to="/contact?from=home-hero#fill-out-the-form">Book a demo</Button>
              <Button to="/signup" variant="secondary">Start building</Button>
            </div>
          </Fade>
        </div>
        <Fade delay={0.3} className="relative z-10 mx-auto w-full max-w-5xl">
          <ul className="flex flex-col items-center justify-center gap-2 pt-10 text-center sm:flex-row sm:gap-3">
            <li className="flex items-center gap-3"><span className="t14 text-grey-500">[Add customer claim]</span></li>
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="hidden text-grey-500 sm:inline">·</span>
              <span className="t14 text-grey-500">[Add compliance statement]</span>
            </li>
          </ul>
        </Fade>
      </section>
    </div>
  );
}
