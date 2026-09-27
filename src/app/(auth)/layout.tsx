import { LobbyBackdrop } from "@/components/marketing/lobby-backdrop";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <LobbyBackdrop
      className="marketing-theme min-h-screen text-white"
      overlayClassName="bg-gradient-to-r from-black/55 via-black/30 to-black/45"
      imageClassName="object-[42%_center]"
      priority
    >
      <div className="relative mx-auto grid min-h-screen max-w-[1400px] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:items-stretch lg:gap-6 lg:px-12">
        <div className="hidden flex-col justify-end pb-24 lg:flex">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] text-[#e8d5a3] uppercase">
            <span className="h-px w-10 bg-[#c4a574]" />
            Global talent. Greater possibilities.
            <span className="h-px w-10 bg-[#c4a574]" />
          </p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.12] text-pretty xl:text-[3.4rem]">
            Connecting exceptional <span className="text-[#c4a574]">talent</span> with global
            opportunities.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
            Twinlink bridges world-class engineering talent with forward-thinking companies, creating
            meaningful careers and stronger global industries.
          </p>
        </div>
        <div className="flex items-center justify-center px-4 py-12 lg:py-16">
          <div className="w-full max-w-[26rem] rounded-[1.75rem] border border-[#c4a574]/45 bg-[#120e0a]/78 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
            {children}
          </div>
        </div>
      </div>
    </LobbyBackdrop>
  );
}
