"use client";
import { useState } from "react";
import type { DailyVisitorStatus } from "@/lib/visitor-daily-status";
const series = [
  { key: "pure", label: "Pure exploration", color: "#33795e" },
  { key: "nonPure", label: "Non-pure exploration", color: "#b7792c" },
  { key: "unknown", label: "Unknown", color: "#8b8c99" },
] as const;
export function VisitorDailyChart({ data }: { data: DailyVisitorStatus[] }) {
  const [visible, setVisible] = useState({ pure: true, nonPure: true, unknown: true });
  const max = Math.max(1, ...data.map(day => series.reduce((sum, item) => sum + (visible[item.key] ? day[item.key] : 0), 0)));
  const width = Math.max(680, data.length * 24);
  const plot = width - 70;
  const slot = plot / Math.max(1, data.length);
  return (
    <section className="mb-6 rounded-2xl border border-[#eadfcd] bg-white p-5" aria-labelledby="daily-visitors-title">
      <h2 id="daily-visitors-title" className="font-serif text-2xl">Daily visitor status</h2>
      <p className="mt-2 text-sm text-muted-foreground">Distinct IP addresses per calendar day (UTC+8). Pure exploration has no VPN, proxy, Tor, or data center signal. Non-pure exploration has at least one of these signals.</p>
      <div className="my-4 flex flex-wrap gap-2">
        {series.map(item => <button key={item.key} type="button" aria-pressed={visible[item.key]} onClick={() => setVisible(previous => ({ ...previous, [item.key]: !previous[item.key] }))} className={`rounded-full border px-3 py-1.5 text-sm ${visible[item.key] ? "bg-[#faf7f2]" : "opacity-50"}`}>
          <span aria-hidden="true" className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.label}
        </button>)}
      </div>
      <div className="overflow-x-auto">
        <svg width={width} height="260" role="img" aria-label="Daily distinct IP counts by connection status. Exact counts are available in the daily counts table below.">
          {[0, 1, 2, 3, 4].map(tick => {
            const value = Math.ceil(max * tick / 4);
            const y = 220 - value / max * 180;
            return <g key={tick}><line x1="45" x2={width - 10} y1={y} y2={y} stroke="#eadfcd" /><text x="35" y={y + 4} textAnchor="end" fontSize="11" fill="#756c62">{value}</text></g>;
          })}
          {data.map((day, index) => {
            let base = 220;
            return <g key={day.date}>
              {series.map(item => {
                const height = visible[item.key] ? day[item.key] / max * 180 : 0;
                base -= height;
                return <rect key={item.key} x={45 + slot * index + slot * 0.2} y={base} width={slot * 0.6} height={height} fill={item.color}><title>{day.date}: {item.label} — {day[item.key]} IP addresses</title></rect>;
              })}
              {(data.length <= 14 || index % Math.ceil(data.length / 12) === 0 || index === data.length - 1) && <text x={45 + slot * (index + 0.5)} y="244" textAnchor="middle" fontSize="10" fill="#756c62">{day.date.slice(5)}</text>}
            </g>;
          })}
        </svg>
      </div>
      <details className="mt-3 text-sm"><summary className="cursor-pointer">Daily counts</summary>
        <div className="mt-3 max-h-72 overflow-auto"><table className="w-full text-left"><thead><tr>{["Date (UTC+8)", ...series.map(item => item.label)].map(label => <th key={label} className="p-2 font-medium">{label}</th>)}</tr></thead><tbody>{data.map(day => <tr key={day.date} className="border-t"><td className="p-2">{day.date}</td>{series.map(item => <td key={item.key} className="p-2">{day[item.key]}</td>)}</tr>)}</tbody></table></div>
      </details>
      <p className="mt-3 text-xs text-muted-foreground">Based on the latest 500 visit records, independent of text search. Multiple visits by one IP count once per day; an IP is not necessarily one person. Uses current reputation estimates, not historical connection checks. Missing or expired checks are Unknown; visits without an IP count separately as Unknown.</p>
    </section>
  );
}
