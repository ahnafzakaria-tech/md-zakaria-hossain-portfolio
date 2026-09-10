"use client";

import { Wind } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { useCounter } from "../hooks/useCounter";

// ─── Count-up stat item ───────────────────────────────────────────────────────

function StatItem({
  target,
  decimals = 0,
  suffix = "",
  prefix = "",
  label,
  desc,
  vis,
  delay,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  desc: string;
  vis: boolean;
  delay: number;
}) {
  const value = useCounter(target, { duration: 1600, decimals, start: vis });
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <div
      className={`rv rv-up ${vis ? "in" : ""} flex flex-col items-center text-center
                  px-6 py-8 hover:bg-white/[0.04] transition-colors duration-300`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display font-extrabold text-[2.8rem] sm:text-[3.2rem] leading-none tracking-tight mb-2">
        <span className="text-gold/70 text-[1.4rem] mr-0.5">{prefix}</span>
        <span className="text-white/95">{display}</span>
        <span className="text-gold text-[1.4rem] ml-1">{suffix}</span>
      </div>
      <p className="text-[14px] font-bold text-white/80 tracking-tight mb-1">{label}</p>
      <p className="text-[12px] text-white/35 leading-relaxed max-w-[140px]">{desc}</p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Snapshot() {
  const [ref, vis] = useReveal(0.12);

  return (
    <section
      aria-label="Starah project statistics"
      ref={ref}
      className="relative bg-navy overflow-hidden py-10 lg:py-12"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.15] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top accent */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]
                   bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-[1px]
                   bg-gradient-to-r from-transparent via-gold/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div
          className={`rv rv-up ${vis ? "in" : ""} flex items-center gap-3 justify-center mb-8`}
          style={{ transitionDelay: "0ms" }}
        >
          <Wind size={14} className="text-gold/60" strokeWidth={1.75} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold/60">
            Starah 2GW Onshore Wind · Saudi Arabia
          </p>
          <Wind size={14} className="text-gold/60" strokeWidth={1.75} />
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4
                     divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-white/[0.07]
                     border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          <StatItem
            target={2000}
            suffix="MW"
            label="Total Capacity"
            desc="Onshore wind power output"
            vis={vis}
            delay={80}
          />
          <StatItem
            target={206}
            label="Wind Turbines"
            desc="Goldwind 10.5 MW each"
            vis={vis}
            delay={160}
          />
          <StatItem
            target={10.5}
            decimals={1}
            suffix=" MW"
            label="Per Turbine"
            desc="Goldwind turbine capacity"
            vis={vis}
            delay={240}
          />
          <StatItem
            target={273}
            suffix="+ km²"
            label="Project Area"
            desc="Desert terrain, Saudi Arabia"
            vis={vis}
            delay={320}
          />
        </div>

        {/* Footer caption */}
        <div
          className={`rv rv-fade ${vis ? "in" : ""} flex items-center justify-center gap-6 mt-6 text-[11px] text-white/25`}
          style={{ transitionDelay: "420ms" }}
        >
          <span>Owner: ACWA Power</span>
          <span className="text-white/15">·</span>
          <span>EPC: CEEC</span>
          <span className="text-white/15">·</span>
          <span>EDMS: Thinkproject</span>
        </div>
      </div>
    </section>
  );
}
