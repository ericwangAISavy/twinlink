import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Twinlink — Technology Consulting & Engineering Talent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded share card for LinkedIn, Slack, X, etc. */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/brand/twinlink-light.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px",
        background: "radial-gradient(60% 90% at 88% 8%, rgba(242,193,78,0.28), transparent 62%), linear-gradient(120deg, #06142e 0%, #081a3a 45%, #0b2a5b 100%)", color: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={384} height={90} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 920 }}>From strategy to delivery, with engineers who ship.</div>
          <div style={{ marginTop: 26, fontSize: 28, color: "rgba(255,255,255,0.82)" }}>Technology consulting &amp; engineering talent</div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#f2c14e" }}>
          {["Cloud & Infrastructure", "Data & AI", "Cybersecurity", "Technical Recruiting"].map(label => (
            <div key={label} style={{ display: "flex", padding: "8px 18px", borderRadius: 999, border: "1.5px solid rgba(242,193,78,0.55)" }}>{label}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
