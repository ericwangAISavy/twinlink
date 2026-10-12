"use client";
import { useEffect, useState } from "react";

export function PrivacyPreference() {
  const [optOut, setOptOut] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      setOptOut(localStorage.getItem("twinlink-visitor-opt-out") === "true");
    } catch {}
  }, []);
  return (
    <div
      id="preferences"
      className="mt-8 rounded-xl border border-white/15 p-5"
    >
      <h2 className="font-serif text-2xl">Visitor monitoring preference</h2>
      <p className="mt-3 text-sm text-white/60">
        Turn off future visitor records for this browser. Browsers that send Do
        Not Track or Global Privacy Control are also excluded. This does not
        affect job applications.
      </p>
      <button
        className="mt-4 rounded-full border border-[#c4a574] px-5 py-3"
        onClick={() => {
          try {
            localStorage.setItem("twinlink-visitor-opt-out", String(!optOut));
            setOptOut(!optOut);
            setMessage(
              !optOut
                ? "Visitor monitoring is off for this browser."
                : "Visitor monitoring is on for this browser.",
            );
          } catch {
            setMessage(
              "This browser does not allow saving preferences. Use its Do Not Track setting instead.",
            );
          }
        }}
      >
        {optOut ? "Enable visitor monitoring" : "Turn off visitor monitoring"}
      </button>
      <p role="status" className="mt-3 text-sm text-white/60">
        {message}
      </p>
    </div>
  );
}
