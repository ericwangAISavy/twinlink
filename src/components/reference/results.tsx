import { CountUp } from "./count-up";
import { Fade } from "./fade";
import { Section, SectionTitle } from "./section";
import { Button } from "./ui";

const RESULTS = [
  { value: 90, suffix: "%", label: "reduction in time-to-invoice", source: "Energy · Order to cash" },
  { prefix: "50 to ", value: 70, suffix: "%", label: "reduction in time-to-compliance", source: "Banking · KYC onboarding" },
  { value: 50, suffix: "%", label: "reduction in PO-to-invoice cycle time", source: "Energy · Procurement" },
  { value: 80, suffix: "%+", label: "of invoices processed without manual intervention", source: "Energy · Procurement" },
];

export function Results() {
  return (
    <Section>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle>Proven in production.</SectionTitle>
        <div className="flex flex-wrap gap-3">
          <Button to="/use-cases" variant="secondary" className="w-fit shrink-0">See the use cases →</Button>
          <Button to="/contact?from=home-results#fill-out-the-form" className="w-fit shrink-0">Book a demo</Button>
        </div>
      </div>
      <Fade>
        <div className="hc-bloom grid gap-8 rounded-[12px] p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {RESULTS.map(result => (
            <div key={result.label} className="flex flex-col gap-2">
              <span className="font-mono text-[48px] font-medium leading-none tracking-tight text-iris-300">
                {result.prefix && <span className="text-[24px]">{result.prefix}</span>}<CountUp value={result.value} />{result.suffix}
              </span>
              <p className="t14 text-white">{result.label}</p>
              <p className="t12 text-white opacity-60">{result.source}</p>
            </div>
          ))}
        </div>
      </Fade>
    </Section>
  );
}
