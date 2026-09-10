import { MapPin, Calendar, Building2, Award, ChevronRight } from "lucide-react";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-pad bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label + heading */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="font-display font-extrabold text-navy text-[2rem] sm:text-[2.4rem]
                       tracking-tight leading-[1.15]"
          >
            Professional History
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line — desktop only */}
          <div
            className="hidden lg:block absolute left-[200px] top-3 bottom-0
                       w-[1px] bg-gradient-to-b from-gold/40 via-border to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-0">
            {experience.map((job, index) => (
              <li
                key={job.id}
                className="relative grid grid-cols-1 lg:grid-cols-[200px_1fr]
                           gap-0 lg:gap-10"
              >
                {/* ── Left: period column ─────────────────────────── */}
                <div
                  className={[
                    "lg:text-right lg:pt-1 pb-3 lg:pb-0",
                    index > 0 ? "pt-10 lg:pt-10" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 lg:justify-end mb-1">
                    <Calendar
                      size={11}
                      className="text-muted shrink-0 lg:hidden"
                      strokeWidth={1.75}
                    />
                    <span className="text-[12px] font-semibold text-muted tracking-wide">
                      {job.period}
                    </span>
                  </div>
                  {job.current && (
                    <span
                      className="inline-block px-2 py-0.5 rounded-full bg-gold/15
                                 text-[10px] font-bold text-gold uppercase tracking-wider"
                    >
                      Current
                    </span>
                  )}
                </div>

                {/* ── Timeline dot ────────────────────────────────── */}
                <div
                  className="hidden lg:block absolute left-[200px] -translate-x-1/2
                             w-3 h-3 rounded-full border-2 z-10 mt-1.5"
                  style={{
                    top: index > 0 ? "2.5rem" : "0.375rem",
                    borderColor: job.current ? "#C9A84C" : "#CBD5E1",
                    backgroundColor: job.current ? "#C9A84C" : "#F8F7F4",
                  }}
                  aria-hidden="true"
                />

                {/* ── Right: job card ──────────────────────────────── */}
                <div
                  className={[
                    "pb-10 lg:pb-12",
                    index > 0 ? "lg:pt-10" : "",
                    index === experience.length - 1 ? "pb-0" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "rounded-xl border p-6 lg:p-8 transition-colors duration-200",
                      job.current
                        ? "bg-surface border-gold/25 shadow-[0_4px_32px_rgba(11,22,40,0.08)]"
                        : "bg-surface border-border hover:border-border-dark",
                    ].join(" ")}
                  >
                    {/* Role + company */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display font-bold text-navy text-[1.1rem]
                                       tracking-tight leading-snug mb-1">
                          {job.role}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Building2
                            size={13}
                            className="text-gold shrink-0"
                            strokeWidth={1.75}
                          />
                          <span className="text-[14px] font-semibold text-navy/80">
                            {job.company}
                          </span>
                        </div>
                      </div>

                      {/* EDMS badge */}
                      {"edms" in job && (
                        <span
                          className="shrink-0 px-3 py-1.5 rounded-md bg-navy/[0.05]
                                     border border-navy/10 text-[11px] font-semibold
                                     text-navy/60 tracking-wide whitespace-nowrap"
                        >
                          {(job as typeof experience[0] & { edms: string }).edms}
                        </span>
                      )}
                    </div>

                    {/* Location + project meta */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5">
                      <span className="flex items-center gap-1.5 text-[12px] text-muted">
                        <MapPin size={11} strokeWidth={1.75} className="text-gold shrink-0" />
                        {job.location}
                      </span>
                      {"project" in job && job.project && (
                        <span className="flex items-center gap-1.5 text-[12px] text-muted">
                          <ChevronRight size={11} strokeWidth={2} className="text-border-dark shrink-0" />
                          {job.project}
                        </span>
                      )}
                      {"capacity" in job && (job as typeof experience[0]).capacity && (
                        <span className="flex items-center gap-1.5 text-[12px] text-muted">
                          <ChevronRight size={11} strokeWidth={2} className="text-border-dark shrink-0" />
                          {(job as typeof experience[0]).capacity} · {(job as typeof experience[0]).type}
                        </span>
                      )}
                    </div>

                    {/* COD milestone badge */}
                    {"milestone" in job && (job as typeof experience[1]).milestone && (
                      <div
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                                   bg-gold/10 border border-gold/25 mb-5 w-fit"
                      >
                        <Award size={14} className="text-gold shrink-0" strokeWidth={2} />
                        <span className="text-[12px] font-semibold text-gold">
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
                                     leading-[1.7] text-navy/65"
                        >
                          <span
                            className="mt-[7px] w-1 h-1 rounded-full bg-gold shrink-0"
                            aria-hidden="true"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Legal role — briefer treatment */}
                    {job.id === "law" && (
                      <p className="mt-4 text-[12px] text-muted italic">
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
