"use client";

import { MapPin, Calendar, Building2, Award, ChevronRight } from "lucide-react";
import { experience } from "../data/content";
import { useReveal } from "../hooks/useReveal";

function startYear(period: string): string {
  const m = period.match(/\d{4}/);
  return m ? m[0] : "";
}

export default function Experience() {
  const [ref, vis] = useReveal(0.06);

  return (
    <section
      id="experience"
      ref={ref}
      aria-labelledby="experience-heading"
      className="section-pad bg-[#070E1A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-14">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Experience
          </p>
          <h2
            id="experience-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Professional History
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line — desktop */}
          <div
            className="hidden lg:block absolute left-[200px] top-3 bottom-0
                       w-[1px] bg-gradient-to-b from-gold/50 via-white/[0.08] to-transparent
                       origin-top transition-transform duration-[1.1s] ease-[var(--ease-spring)]"
            style={{ transform: vis ? "scaleY(1)" : "scaleY(0)" }}
            aria-hidden="true"
          />

          <ol className="space-y-0">
            {experience.map((job, index) => (
              <li
                key={job.id}
                className={`rv rv-up ${vis ? "in" : ""} relative grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0 lg:gap-10`}
                style={{ transitionDelay: `${160 + index * 140}ms` }}
              >
                {/* Left: period column */}
                <div
                  className={[
                    "lg:text-right lg:pt-1 pb-3 lg:pb-0",
                    index > 0 ? "pt-10 lg:pt-10" : "",
                  ].join(" ")}
                >
                  {/* Large year watermark — desktop */}
                  <span
                    className="hidden lg:block font-display font-extrabold
                               text-[2.4rem] text-white/[0.06] leading-none mb-2 select-none"
                    aria-hidden="true"
                  >
                    {startYear(job.period)}
                  </span>

                  <div className="flex items-center gap-2 lg:justify-end mb-1">
                    <Calendar
                      size={11}
                      className="text-white/35 shrink-0 lg:hidden"
                      strokeWidth={1.75}
                    />
                    <span className="text-[12px] font-semibold text-white/40 tracking-wide">
                      {job.period}
                    </span>
                  </div>
                  {job.current && (
                    <span
                      className="inline-block px-2 py-0.5 rounded-full bg-gold/15
                                 text-[10px] font-bold text-gold tracking-wider"
                    >
                      Current
                    </span>
                  )}
                </div>

                {/* Timeline dot */}
                <div
                  className="hidden lg:block absolute left-[200px] -translate-x-1/2
                             w-3 h-3 rounded-full border-2 z-10 mt-1.5"
                  style={{
                    top:             index > 0 ? "2.5rem" : "0.375rem",
                    borderColor:     job.current ? "#C9A84C" : "rgba(255,255,255,0.18)",
                    backgroundColor: job.current ? "#C9A84C" : "#070E1A",
                  }}
                  aria-hidden="true"
                />

                {/* Right: job card */}
                <div
                  className={[
                    "pb-10 lg:pb-12",
                    index > 0 ? "lg:pt-10" : "",
                    index === experience.length - 1 ? "pb-0" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "rounded-xl border p-6 lg:p-8",
                      "transition-all duration-200",
                      "hover:-translate-y-[2px]",
                      job.current
                        ? "bg-white/[0.04] border-gold/20 shadow-[0_4px_32px_rgba(201,168,76,0.06)]"
                        : "bg-white/[0.03] border-white/[0.08] hover:border-white/[0.14]",
                    ].join(" ")}
                  >
                    {/* Role + company */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3
                          className="font-display font-bold text-white/95 text-[1.1rem]
                                     tracking-tight leading-snug mb-1"
                        >
                          {job.role}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Building2 size={13} className="text-gold shrink-0" strokeWidth={1.75} />
                          <span className="text-[14px] font-semibold text-white/75">
                            {job.company}
                          </span>
                        </div>
                      </div>

                      {"edms" in job && (
                        <span
                          className="shrink-0 px-3 py-1.5 rounded-md
                                     bg-gold/[0.08] border border-gold/20
                                     text-[11px] font-semibold text-gold/80
                                     tracking-wide whitespace-nowrap"
                        >
                          {(job as typeof experience[0] & { edms: string }).edms}
                        </span>
                      )}
                    </div>

                    {/* Location + project meta */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5">
                      <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                        <MapPin size={11} strokeWidth={1.75} className="text-gold/60 shrink-0" />
                        {job.location}
                      </span>
                      {"project" in job && job.project && (
                        <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                          <ChevronRight size={11} strokeWidth={2} className="text-white/20 shrink-0" />
                          {job.project}
                        </span>
                      )}
                      {"capacity" in job && (job as typeof experience[0]).capacity && (
                        <span className="flex items-center gap-1.5 text-[12px] text-white/40">
                          <ChevronRight size={11} strokeWidth={2} className="text-white/20 shrink-0" />
                          {(job as typeof experience[0]).capacity} · {(job as typeof experience[0]).type}
                        </span>
                      )}
                    </div>

                    {/* COD milestone */}
                    {"milestone" in job && (job as typeof experience[1]).milestone && (
                      <div
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                                   bg-gold/[0.08] border border-gold/20 mb-5 w-fit"
                      >
                        <Award size={14} className="text-gold shrink-0" strokeWidth={2} />
                        <span className="text-[12px] font-semibold text-gold/90">
                          {(job as typeof experience[1]).milestone}
                        </span>
                      </div>
                    )}

                    {/* Responsibilities */}
                    <ul className="space-y-2.5">
                      {job.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[0.875rem]
                                     leading-[1.7] text-white/60"
                        >
                          <span
                            className="mt-[7px] w-1 h-1 rounded-full bg-gold/60 shrink-0"
                            aria-hidden="true"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {job.id === "law" && (
                      <p className="mt-4 text-[12px] text-white/35 italic">
                        Legal background informs a compliance-focused approach to
                        contractual documentation and regulatory record-keeping in
                        current EPC roles.
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
