"use client";

import { cn } from "@/lib/utils";

export type PortalRole = "candidate" | "employee";

export function PortalToggle({
  value,
  onChange,
}: {
  value: PortalRole;
  onChange: (value: PortalRole) => void;
}) {
  return (
    <div className="grid grid-cols-2 rounded-full border border-white/15 bg-black/25 p-1">
      {(["candidate", "employee"] as const).map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChange(role)}
          className={cn(
            "rounded-full px-3 py-2 text-sm font-medium transition-colors",
            value === role ? "bg-[#c4a574] text-[#1c1916]" : "text-white/70 hover:text-white",
          )}
        >
          {role === "candidate" ? "Candidate" : "Employee"}
        </button>
      ))}
    </div>
  );
}
