"use client";
import { type Resource } from "@/lib/resources";
export function EventCalendar({ event }: { event: Resource }) {
  function download() {
    const stamp = (date: string) =>
      date.replace(/[-:]/g, "").replace(/\.\d+/, "");
    const escape = (value: string) =>
      value
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Twinlink//Events//EN",
      "BEGIN:VEVENT",
      `UID:${event.slug}@twinlink.com`,
      `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(event.date!)}`,
      `DTEND:${stamp(event.end!)}`,
      `SUMMARY:${escape(event.title)}`,
      `DESCRIPTION:${escape(event.summary + " Calendar entry only; this does not register attendance.")}`,
      `LOCATION:${escape(event.location || "To be announced")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    const folded =
      lines
        .map((line) => {
          const chars = Array.from(line);
          const chunks: string[] = [];
          let part = "";
          let bytes = 0;
          for (const char of chars) {
            const n = new TextEncoder().encode(char).length;
            if (bytes + n > 70) {
              chunks.push(part);
              part = " ";
              bytes = 1;
            }
            part += char;
            bytes += n;
          }
          chunks.push(part);
          return chunks.join("\r\n");
        })
        .join("\r\n") + "\r\n";
    const url = URL.createObjectURL(
      new Blob([folded], { type: "text/calendar;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <button
      onClick={download}
      className="mt-5 rounded-full border border-[#c4a574]/50 px-5 py-3 text-sm text-[#e8d5a3] hover:bg-white/5"
    >
      Download calendar entry
    </button>
  );
}
