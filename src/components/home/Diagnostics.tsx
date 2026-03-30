/**
 * [INPUT]: @/components/ui/TechBorder, ./NetworkTraffic
 * [OUTPUT]: Diagnostics — right-column panel with stats, network bars, service statuses
 * [POS]: home/ top-level section, renders in the 3-col grid right column
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { TechBorder } from "@/components/ui/TechBorder";
import { NetworkTraffic } from "./NetworkTraffic";

/* ------------------------------------------------------------------ */
/*  Static data                                                       */
/* ------------------------------------------------------------------ */

const services = [
  { name: "GATEWAY_API", status: "ONLINE", color: "text-green-400" },
  { name: "ORBITOS_SYNC", status: "ACTIVE", color: "text-yellow-400" },
  { name: "EMAIL_DAEMON", status: "RUNNING", color: "text-green-400" },
  { name: "SECURITY_PROTOCOL", status: "ENCRYPTED", color: "text-green-400" },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Diagnostics() {
  return (
    <TechBorder className="p-6 md:p-5">
      {/* Title */}
      <h2 className="text-lg font-bold font-vt323 text-pink-400 mb-5 flex items-center gap-2">
        <img
          src="https://unpkg.com/pixelarticons@1.8.1/svg/chart.svg"
          className="pa-icon w-4 h-4 inline-block"
          alt=""
          aria-hidden="true"
        />
        DIAGNOSTICS
      </h2>

      {/* Stat boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-pink-950/10 p-4 text-center">
          <div className="text-[10px] text-gray-400 uppercase mb-1.5">
            Latency
          </div>
          <div className="text-xl font-bold font-vt323 text-pink-300">
            47ms
          </div>
        </div>
        <div className="bg-pink-950/10 p-4 text-center">
          <div className="text-[10px] text-gray-400 uppercase mb-1.5">
            Uptime
          </div>
          <div className="text-xl font-bold font-vt323 text-pink-300">
            99.97%
          </div>
        </div>
      </div>

      {/* Network traffic bars */}
      <NetworkTraffic />

      {/* Service status list */}
      <div className="mt-5 space-y-4 font-tech text-[10px] text-pink-300/70">
        {services.map((svc) => (
          <div
            key={svc.name}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-0 py-1.5 sm:py-0 border-b border-pink-500/10 sm:border-0 last:border-0"
          >
            <span>&gt; {svc.name}</span>
            <span className={svc.color}>{svc.status}</span>
          </div>
        ))}
      </div>
    </TechBorder>
  );
}
