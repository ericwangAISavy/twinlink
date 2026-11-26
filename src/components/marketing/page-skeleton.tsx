/**
 * Skeleton loading screens for public pages. They mirror the real page layout
 * (navy page hero, section heading with gold rule, cards / columns / lists) so the
 * page fills in without layout shift. Header and footer stay rendered by the layout.
 */
type Variant = "page" | "about" | "careers" | "job";

function Bar({ w, h = 14, dark = false, className = "" }: { w: string; h?: number; dark?: boolean; className?: string }) {
  return <span className={`tl-skel${dark ? " tl-skel-dark" : ""} ${className}`} style={{ width: w, height: h }} />;
}

function HeroSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <section className={`sub-page-hero${tall ? " sub-page-hero-photo" : ""} tl-skel-hero`} aria-hidden="true">
      <div className="foundation-container sub-page-hero-inner">
        <Bar w="140px" h={12} dark />
        <Bar w="min(520px, 80%)" h={46} dark className="tl-skel-gap" />
        <span className="tl-skel-rule" />
      </div>
    </section>
  );
}

function SectionHeading() {
  return <div className="tl-skel-heading"><Bar w="240px" h={30} /><span className="tl-skel-rule" /></div>;
}

function Paragraph({ lines = 4 }: { lines?: number }) {
  return <div className="tl-skel-lines">{Array.from({ length: lines }, (_, i) => <Bar key={i} w={i === lines - 1 ? "62%" : "100%"} />)}</div>;
}

function CardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="tl-skel-cards">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="tl-skel-card">
          <span className="tl-skel tl-skel-media" />
          <div className="tl-skel-card-body"><Bar w="45%" h={11} /><Bar w="85%" h={20} /><Paragraph lines={2} /></div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton({ variant = "page" }: { variant?: Variant }) {
  return (
    <div className="tl-skeleton" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page…</span>

      {variant === "page" && <>
        <HeroSkeleton />
        <div className="foundation-container tl-skel-section"><SectionHeading /><CardGrid count={3} /></div>
      </>}

      {variant === "about" && <>
        <HeroSkeleton tall />
        <div className="foundation-container tl-skel-section tl-skel-two">
          <span className="tl-skel tl-skel-media tl-skel-photo" />
          <div><SectionHeading /><Paragraph lines={5} /><Paragraph lines={3} /></div>
        </div>
      </>}

      {variant === "careers" && <>
        <HeroSkeleton tall />
        <div className="foundation-container tl-skel-section">
          <SectionHeading />
          <div className="tl-skel-intro"><Paragraph lines={2} /></div>
          <div className="tl-skel-filters">{["32%", "13%", "13%", "13%", "13%", "13%"].map((w, i) => <Bar key={i} w={w} h={44} />)}</div>
          <div className="tl-skel-board">
            <div className="tl-skel-chips">{Array.from({ length: 8 }, (_, i) => <Bar key={i} w={`${70 + (i % 3) * 25}px`} h={28} className="tl-skel-pill" />)}</div>
            <div className="tl-skel-rows">{Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="tl-skel-row"><div><Bar w="55%" h={18} /><Bar w="30%" h={13} /></div><Bar w="90px" h={14} /><Bar w="90px" h={14} /><Bar w="70px" h={14} /></div>
            ))}</div>
          </div>
        </div>
      </>}

      {variant === "job" && (
        <div className="foundation-container tl-skel-section tl-skel-job">
          <div>
            <Bar w="80px" h={11} />
            <Bar w="min(560px, 90%)" h={36} className="tl-skel-gap" />
            <div className="tl-skel-inline"><Bar w="80px" h={24} className="tl-skel-pill" /><Bar w="110px" h={24} className="tl-skel-pill" /><Bar w="120px" h={24} className="tl-skel-pill" /></div>
            <div className="tl-skel-block"><Bar w="160px" h={24} /><Paragraph lines={5} /></div>
            <div className="tl-skel-block"><Bar w="190px" h={24} /><Paragraph lines={4} /></div>
          </div>
          <div className="tl-skel-form">
            <Bar w="90px" h={22} />
            {Array.from({ length: 5 }, (_, i) => <div key={i} className="tl-skel-field"><Bar w="35%" h={12} /><Bar w="100%" h={40} /></div>)}
            <Bar w="100%" h={44} />
          </div>
        </div>
      )}
    </div>
  );
}
