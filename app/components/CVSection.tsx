import { FileDown, FileUser, ExternalLink } from "lucide-react";
import { person, stats, competencies } from "../data/content";

// ─── CSS document illustration ────────────────────────────────────────────────

function DocumentCard() {
  return (
    <div
      className="relative w-[140px] h-[180px] shrink-0"
      aria-hidden="true"
    >
      {/* Shadow copy — depth effect */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-navy/20" />

      {/* Document body */}
      <div className="absolute inset-0 rounded-lg bg-surface border border-border
                      shadow-[0_4px_24px_rgba(11,22,40,0.12)] overflow-hidden">
        {/* Navy header bar */}
        <div className="h-10 bg-navy flex items-center gap-2 px-3">
          <div className="w-6 h-6 rounded-full bg-gold/70 flex items-center justify-center">
            <span className="text-[7px] font-bold text-navy">ZH</span>
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-1.5 bg-white/50 rounded-full" />
            <div className="h-1 bg-white/25 rounded-full w-3/4" />
          </div>
        </div>

        {/* Content rows */}
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 bg-navy/18 rounded-full" />
          <div className="h-1 bg-navy/10 rounded-full w-5/6" />
          <div className="h-1 bg-navy/10 rounded-full w-4/5" />

          <div className="pt-2 space-y-1">
            <div className="h-1 bg-gold/35 rounded-full w-2/3" />
            <div className="h-1 bg-navy/10 rounded-full" />
            <div className="h-1 bg-navy/10 rounded-full w-5/6" />
            <div className="h-1 bg-navy/10 rounded-full w-3/4" />
          </div>

          <div className="pt-2 space-y-1">
            <div className="h-1 bg-gold/35 rounded-full w-3/5" />
            <div className="h-1 bg-navy/10 rounded-full w-4/5" />
            <div className="h-1 bg-navy/10 rounded-full" />
            <div className="h-1 bg-navy/10 rounded-full w-2/3" />
          </div>
        </div>
      </div>

      {/* Page-fold corner */}
      <div className="absolute top-0 right-0 z-10
                      border-t-[14px] border-r-[14px]
                      border-t-border border-r-cream" />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CVSection() {
  return (
    <section
      id="cv"
      aria-labelledby="cv-heading"
      className="section-pad bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Curriculum Vitae
          </p>
          <h2
            id="cv-heading"
            className="font-display font-extrabold text-navy
                       text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]"
          >
            Download My CV
          </h2>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-surface
                        shadow-[0_4px_32px_rgba(11,22,40,0.07)]
                        overflow-hidden">
          <div className="flex flex-col md:flex-row gap-0">

            {/* Left: navy accent panel */}
            <div className="bg-navy md:w-[280px] shrink-0 flex flex-col
                            items-center justify-center gap-6 p-8">
              <DocumentCard />

              <div className="text-center">
                <p className="font-display font-extrabold text-white text-[1rem] mb-1">
                  {person.name}
                </p>
                <p className="text-[12px] text-white/50 leading-snug">
                  {person.title}
                </p>
              </div>
            </div>

            {/* Right: content */}
            <div className="flex-1 p-6 lg:p-10 flex flex-col gap-8">

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center py-3 rounded-xl bg-cream border border-border">
                    <span className="font-display font-extrabold text-navy text-[1.4rem] leading-none">
                      {s.value}
                      <span className="text-gold text-[0.9rem] ml-0.5">{s.suffix}</span>
                    </span>
                    <p className="text-[10.5px] text-muted mt-1 font-medium tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Featured competencies */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em]
                               text-muted mb-3">
                  Key Competencies
                </p>
                <ul className="flex flex-wrap gap-2">
                  {competencies.map((c) => (
                    <li
                      key={c}
                      className="px-2.5 py-1 rounded-md bg-cream border border-border
                                 text-[12px] font-medium text-navy/65"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mt-auto pt-2 border-t border-border">
                <a
                  href={person.cvPath}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                             bg-navy text-white text-[14px] font-semibold
                             hover:bg-navy-light transition-colors duration-200
                             shadow-[0_4px_20px_rgba(11,22,40,0.18)]"
                >
                  <FileDown size={15} strokeWidth={2} />
                  Download CV (PDF)
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                             border border-navy/20 text-navy text-[14px] font-semibold
                             hover:bg-navy hover:text-white hover:border-navy
                             transition-all duration-200"
                >
                  <FileUser size={15} strokeWidth={1.75} />
                  LinkedIn Profile
                  <ExternalLink size={12} strokeWidth={2} className="text-muted" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
