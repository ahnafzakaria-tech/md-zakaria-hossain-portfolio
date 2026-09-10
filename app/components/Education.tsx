import { GraduationCap, BookOpen, BadgeCheck, Calendar, Award } from "lucide-react";
import { education, certifications, training } from "../data/content";

function DegreeCard({ deg }: { deg: (typeof education)[number] }) {
  return (
    <div className="flex gap-5 p-6 rounded-xl border border-border bg-cream
                    hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(11,22,40,0.06)]
                    transition-all duration-200">
      <div className="w-10 h-10 rounded-lg bg-navy/[0.06] flex items-center
                      justify-center shrink-0 mt-0.5">
        <GraduationCap size={18} className="text-navy/50" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <h3 className="font-display font-bold text-navy text-[0.9375rem] tracking-tight mb-0.5">
          {deg.degree}
        </h3>
        <p className="text-[13px] font-medium text-navy/70 mb-2">{deg.institution}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-[12px] text-muted">
            <Calendar size={11} strokeWidth={1.75} className="shrink-0" />
            {deg.period}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gold/10 border border-gold/20
                           text-[11px] font-bold text-gold tracking-wide">
            CGPA {deg.cgpa}
          </span>
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert }: { cert: (typeof certifications)[number] }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-border bg-surface
                    hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(11,22,40,0.06)]
                    transition-all duration-200">
      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center
                      justify-center shrink-0 mt-0.5">
        <BadgeCheck size={16} className="text-gold" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-navy text-[13.5px] tracking-tight leading-snug mb-1">
          {cert.title}
        </h4>
        <p className="text-[12px] text-muted mb-2">{cert.issuer}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-navy/55">{cert.type}</span>
          {cert.date && (
            <>
              <span className="text-border-dark">·</span>
              <span className="text-[11px] font-semibold text-navy/55">{cert.date}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TrainingCard({ item }: { item: (typeof training)[number] }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-border bg-surface
                    hover:border-border-dark transition-colors duration-200">
      <div className="w-9 h-9 rounded-lg bg-navy/[0.06] flex items-center
                      justify-center shrink-0 mt-0.5">
        <BookOpen size={16} className="text-navy/50" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-navy text-[13.5px] tracking-tight leading-snug mb-1">
          {item.title}
        </h4>
        <p className="text-[12px] text-muted mb-2">{item.issuer}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block px-2 py-0.5 rounded bg-navy/[0.06]
                           text-[10px] font-semibold text-navy/55 tracking-wide uppercase">
            {item.note}
          </span>
          {!item.date && (
            <span className="text-[11px] text-muted/60 italic">Date not recorded</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-pad bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Education & Credentials
          </p>
          <h2
            id="education-heading"
            className="font-display font-extrabold text-navy
                       text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]"
          >
            Academic Background
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={15} className="text-gold" strokeWidth={1.75} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Degrees
              </p>
            </div>
            <div className="space-y-4">
              {education.map((deg) => (
                <DegreeCard key={deg.degree} deg={deg} />
              ))}
            </div>

            {/* Context note */}
            <p className="mt-5 text-[13px] leading-[1.75] text-navy/50 italic
                          pl-4 border-l-2 border-gold/30">
              Legal training in drafting, regulatory analysis, and compliance
              directly supports a disciplined approach to EPC contract
              documentation and record-keeping.
            </p>
          </div>

          {/* Right: Certifications + Training */}
          <div className="space-y-8">

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award size={15} className="text-gold" strokeWidth={1.75} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Certifications
                </p>
              </div>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <CertCard key={cert.title} cert={cert} />
                ))}
              </div>
            </div>

            {/* Professional Training */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={15} className="text-gold" strokeWidth={1.75} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Professional Training
                </p>
              </div>
              <div className="space-y-3">
                {training.map((item) => (
                  <TrainingCard key={item.title} item={item} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
