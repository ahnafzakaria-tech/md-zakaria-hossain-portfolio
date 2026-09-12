"use client";

import Image from "next/image";
import { FileDown, FileUser, ExternalLink } from "lucide-react";
import { person, stats, competencies } from "../data/content";
import { useReveal } from "../hooks/useReveal";

// ─── CSS document illustration (dark themed) ─────────────────────────────────

function DocumentCard() {
  return (
    <div className="relative w-[140px] h-[180px] shrink-0" aria-hidden="true">
      {/* Shadow copy */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-gold/10" />

      {/* Document body */}
      <div className="absolute inset-0 rounded-lg bg-[#0F1E33] border border-white/[0.10]
                      shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Header bar */}
        <div className="h-10 bg-gold/[0.08] border-b border-white/[0.07] flex items-center gap-2 px-3">
          <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-gold/30 shrink-0">
            <Image
              src="/profile.jpg"
              alt=""
              width={24}
              height={24}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-1.5 bg-white/25 rounded-full" />
            <div className="h-1 bg-white/12 rounded-full w-3/4" />
          </div>
        </div>

        {/* Content rows */}
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 bg-white/12 rounded-full" />
          <div className="h-1 bg-white/07 rounded-full w-5/6" />
          <div className="h-1 bg-white/07 rounded-full w-4/5" />

          <div className="pt-2 space-y-1">
            <div className="h-1 bg-gold/25 rounded-full w-2/3" />
            <div className="h-1 bg-white/07 rounded-full" />
            <div className="h-1 bg-white/07 rounded-full w-5/6" />
            <div className="h-1 bg-white/07 rounded-full w-3/4" />
          </div>

          <div className="pt-2 space-y-1">
            <div className="h-1 bg-gold/25 rounded-full w-3/5" />
            <div className="h-1 bg-white/07 rounded-full w-4/5" />
            <div className="h-1 bg-white/07 rounded-full" />
            <div className="h-1 bg-white/07 rounded-full w-2/3" />
          </div>
        </div>
      </div>

      {/* Page-fold corner */}
      <div className="absolute top-0 right-0 z-10
                      border-t-[14px] border-r-[14px]
                      border-t-white/[0.12] border-r-[#040C18]" />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CVSection() {
  const [ref, vis] = useReveal(0.08);

  return (
    <section
      id="cv"
      ref={ref}
      aria-labelledby="cv-heading"
      className="section-pad bg-[#040C18]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-14">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Curriculum Vitae
          </p>
          <h2
            id="cv-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Download My CV
          </h2>
        </div>

        {/* Card */}
        <div
          className={`rv rv-scale ${vis ? "in" : ""} glass-base rounded-2xl overflow-hidden`}
          style={{ transitionDelay: "160ms" }}
        >
          <div className="flex flex-col md:flex-row gap-0">

            {/* Left: accent panel */}
            <div className="bg-navy md:w-[280px] shrink-0 flex flex-col
                            items-center justify-center gap-6 p-8
                            border-b md:border-b-0 md:border-r border-white/[0.07]">
              <DocumentCard />

              <div className="text-center">
                <p className="font-display font-extrabold text-white/90 text-[1rem] mb-1">
                  {person.name}
                </p>
                <p className="text-[12px] text-white/40 leading-snug">
                  {person.title}
                </p>
              </div>
            </div>

            {/* Right: content */}
            <div className="flex-1 p-6 lg:p-10 flex flex-col gap-8">

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`rv rv-up ${vis ? "in" : ""} text-center py-3 glass-subtle`}
                    style={{ transitionDelay: `${260 + i * 60}ms` }}
                  >
                    <span className="font-display font-extrabold text-white/90 text-[1.4rem] leading-none">
                      {s.value}
                      <span className="text-gold text-[0.9rem] ml-0.5">{s.suffix}</span>
                    </span>
                    <p className="text-[10.5px] text-white/35 mt-1 font-medium tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Featured competencies */}
              <div
                className={`rv rv-up ${vis ? "in" : ""}`}
                style={{ transitionDelay: "380ms" }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-3">
                  Key Competencies
                </p>
                <ul className="flex flex-wrap gap-2">
                  {competencies.map((c) => (
                    <li
                      key={c}
                      className="px-2.5 py-1 glass-subtle
                                 text-[12px] font-medium text-white/60
                                 hover:border-[var(--glass-border-lit)] hover:text-white/80 transition-colors duration-150"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div
                className={`rv rv-up ${vis ? "in" : ""} flex flex-wrap gap-3 mt-auto pt-2 border-t border-white/[0.07]`}
                style={{ transitionDelay: "440ms" }}
              >
                <a
                  href={person.cvPath}
                  download
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-md
                             bg-gold text-navy text-[14px] font-bold
                             hover:bg-gold-light transition-all duration-200
                             shadow-[0_4px_20px_rgba(201,168,76,0.25)]
                             hover:shadow-[0_6px_28px_rgba(201,168,76,0.38)]
                             btn-press"
                >
                  <FileDown size={15} strokeWidth={2}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Download CV (PDF)
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-md
                             border border-white/[0.12] text-white/80 text-[14px] font-semibold
                             hover:bg-white/[0.06] hover:border-white/25 hover:text-white
                             transition-all duration-200"
                >
                  <FileUser size={15} strokeWidth={1.75} />
                  LinkedIn Profile
                  <ExternalLink size={12} strokeWidth={2}
                    className="text-white/30 transition-transform duration-200
                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
