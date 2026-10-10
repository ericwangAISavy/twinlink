import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import {
  ResourceHero,
  ResourceLinks,
} from "@/components/resources/resource-shell";
import { ContactForm } from "@/components/resources/contact-form";
import { getCompanyProfile } from "@/server/queries/company";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Twinlink, a China-headquartered technology company working with global teams.",
};
export default async function ContactPage() {
  const company = await getCompanyProfile();
  const email = company.email || "hello@twinlink.com";
  return (
    <>
      <ResourceHero
        eyebrow="China headquarters · Global partnerships"
        title="Let’s build something meaningful."
        description="A new product, a complex engineering challenge, or a shared ambition. Tell us where you want to go."
        image="/images/twinlink-lobby.jpg"
      />
      <ResourceLinks />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[.25em] text-[#c4a574]">
            Start a conversation
          </p>
          <h2 className="mt-5 font-serif text-4xl text-white">
            Rooted in China.
            <br />
            Connected to the world.
          </h2>
          <p className="mt-6 leading-relaxed text-white/70">
            We connect engineering expertise with the people and organizations
            ready to put it to work. Get in touch about partnerships, careers,
            or our community program.
          </p>
          <div className="mt-10 space-y-7 text-white/75">
            <div className="flex gap-4">
              <MapPin className="text-[#c4a574]" />
              <div>
                <h3 className="text-white">Headquarters</h3>
                <p className="mt-1">China</p>
                <p className="mt-2 text-sm text-white/55">
                  For an in-person meeting, contact us to arrange the location.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-[#c4a574]" />
              <div>
                <h3 className="text-white">Our time zone</h3>
                <p className="mt-1">China Standard Time · UTC+8</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="text-[#c4a574]" />
              <div>
                <h3 className="text-white">Write to us</h3>
                <a
                  href={`mailto:${email}`}
                  className="mt-1 inline-block break-all text-[#e8d5a3] hover:underline"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#151310] p-6 md:p-9">
          <h2 className="mb-7 font-serif text-3xl text-white">
            What are you working on?
          </h2>
          <ContactForm email={email} />
        </div>
      </section>
    </>
  );
}
