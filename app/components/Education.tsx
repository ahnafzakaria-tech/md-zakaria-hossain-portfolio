"use client";

import { GraduationCap, BookOpen, BadgeCheck, Calendar, Award } from "lucide-react";
import { education, certifications, training } from "../data/content";
import { useReveal } from "../hooks/useReveal";

function DegreeCard({ deg, vis, delay }: {
  deg: (typeof education)[number];
  vis: boolean;
  delay: number;
}) {
  return (
    <div
      className={`rv rv-up ${vis ? "in" : ""} flex gap-5 p-6 rounded-xl border border-white/[0.08]
                  bg-white/[0.03] hover:border-gold/25 hover:bg-white/[0.05]
                  hover:-translate-y-[2px] transition-all duration-200`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center
                      justify-center shrink-0 mt-0.5">
        <GraduationCap size={18} className="text-white/40" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <h3 className="font-display font-bold text-white/95 text-[0.9375rem] tracking-tight mb-0.5">
          {deg.degree}
        </h3>
        <p className="text-[13px] font-medium text-white/65 mb-2">{deg.institution}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-[12px] text-white/40">
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

function CertCard({ cert, vis, delay }: {
  cert: (typeof certifications)[number];
  vis: boolean;
  delay: number;
}) {
  return (
    <div
      className={`rv rv-up ${vis ? "in" : ""} flex gap-4 p-5 rounded-xl border border-white/[0.08]
                  bg-white/[0.04] hover:border-gold/25 hover:bg-white/[0.06]
                  hover:-translate-y-[2px] transition-all duration-200`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center
                      justify-center shrink-0 mt-0.5">
        <BadgeCheck size={16} className="text-gold" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-white/90 text-[13.5px] tracking-tight leading-snug mb-1">
          {cert.title}
        </h4>
        <p className="text-[12px] text-white/40 mb-2">{cert.issuer}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium text-white/40">{cert.type}</span>
          {cert.date && (
            <>
              <span className="text-white/15">·</span>
              <span className="text-[11px] font-semibold text-white/40">{cert.date}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TrainingCard({ item, vis, delay }: {
  item: (typeof training)[number];
  vis: boolean;
  delay: number;
}) {
  return (
    <div
      className={`rv rv-up ${vis ? "in" : ""} flex gap-4 p-5 rounded-xl border border-white/[0.08]
                  bg-white/[0.03] hover:border-white/[0.14] hover:-translate-y-[1px]
                  transition-all duration-200`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center
                      justify-center shrink-0 mt-0.5">
        <BookOpen size={16} className="text-white/40" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-white/90 text-[13.5px] tracking-tight leading-snug mb-1">
          {item.title}
        </h4>
        <p className="text-[12px] text-white/40 mb-2">{item.issuer}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block px-2 py-0.5 rounded bg-white/[0.06]
                           text-[10px] font-semibold text-white/40 tracking-wide uppercase">
            {item.note}
          </span>
          {!item.date && (
            <span className="text-[11px] text-white/25 italic">Date not recorded</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const [ref, vis] = useReveal(0.06);

  return (
    <section
      id="education"
      ref={ref}
      aria-labelledby="education-heading"
      className="section-pad bg-[#070E1A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-14">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Education & Credentials
          </p>
          <h2
            id="education-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Academic Background
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Education */}
          <div>
            <div
              className={`rv rv-up ${vis ? "in" : ""} flex items-center gap-2 mb-6`}
              style={{ transitionDelay: "140ms" }}
            >
              <GraduationCap size={15} className="text-gold" strokeWidth={1.75} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Degrees
              </p>
            </div>
            <div className="space-y-4">
              {education.map((deg, i) => (
                <DegreeCard key={deg.degree} deg={deg} vis={vis} delay={200 + i * 80} />
              ))}
            </div>

            <p
              className={`rv rv-up ${vis ? "in" : ""} mt-5 text-[13px] leading-[1.75] text-white/40 italic pl-4 border-l-2 border-gold/25`}
              style={{ transitionDelay: "380ms" }}
            >
              Legal training in drafting, regulatory analysis, and compliance
              directly supports a disciplined approach to EPC contract
              documentation and record-keeping.
            </p>
          </div>

          {/* Right: Certifications + Training */}
          <div className="space-y-8">

            <div>
              <div
                className={`rv rv-up ${vis ? "in" : ""} flex items-center gap-2 mb-6`}
                style={{ transitionDelay: "160ms" }}
              >
                <Award size={15} className="text-gold" strokeWidth={1.75} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  Certifications
                </p>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <CertCard key={cert.title} cert={cert} vis={vis} delay={220 + i * 70} />
                ))}
              </div>
            </div>

            <div>
              <div
                className={`rv rv-up ${vis ? "in" : ""} flex items-center gap-2 mb-6`}
                style={{ transitionDelay: "200ms" }}
              >
                <BookOpen size={15} className="text-gold" strokeWidth={1.75} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  Professional Training
                </p>
              </div>
              <div className="space-y-3">
                {training.map((item, i) => (
                  <TrainingCard key={item.title} item={item} vis={vis} delay={260 + i * 60} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
