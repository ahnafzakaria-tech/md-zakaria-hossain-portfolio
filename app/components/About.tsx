"use client";

import { Database, FileText, Scale, Zap } from "lucide-react";
import { summary } from "../data/content";
import { useReveal } from "../hooks/useReveal";

const STRENGTHS = [
  {
    icon:  Database,
    title: "EDMS & PMIS Administration",
    body:  "Hands-on administration across Thinkproject (live), Samsung Knox S-PMIS (live), and Aconex (professionally trained) — managing submissions, workflows, revision status, and controlled records.",
  },
  {
    icon:  FileText,
    title: "EPC Documentation Lifecycle",
    body:  "Full-lifecycle document control across large-scale EPC projects — from initial document coding and numbering through construction-phase submittals, revision management, and project close-out handover packages.",
  },
  {
    icon:  Scale,
    title: "Compliance & Legal Foundation",
    body:  "LL.M and LL.B background (CGPA 3.79 / 3.70) brings a rigorous, compliance-focused approach to contractual documentation, regulatory record-keeping, and approval routing.",
  },
  {
    icon:  Zap,
    title: "AI-Integrated Workflows",
    body:  "Applies AI productivity tools to document control workflows to improve efficiency and accuracy. Certified in AI Foundations, Applied AI Foundations, and Agents & Workflows — OpenAI Academy.",
  },
] as const;

const FEATURED_COMPETENCIES = [
  "Document Coding & Numbering",
  "Drawing & Revision Control",
  "MOM & MSRA Coordination",
  "MAR & FCR Tracking",
  "Transmittal Management",
  "Project Close-out & Handover",
  "Subcontractor Coordination",
  "Reporting & Data Analysis",
] as const;

export default function About() {
  const [ref, vis] = useReveal(0.08);

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="section-pad bg-[#040C18]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label + heading */}
        <div className="mb-14">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            About
          </p>
          <h2
            id="about-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15] max-w-xl`}
            style={{ transitionDelay: "80ms" }}
          >
            Document Control as a
            <span className="block text-gold-gradient">professional discipline.</span>
          </h2>
        </div>

        {/* Two columns: summary + competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 mb-16">

          {/* Summary */}
          <div className="space-y-4">
            <p
              className={`rv rv-up ${vis ? "in" : ""} text-[1rem] leading-[1.85] text-white/70 max-w-[640px]`}
              style={{ transitionDelay: "160ms" }}
            >
              {summary}
            </p>
            <p
              className={`rv rv-up ${vis ? "in" : ""} text-[0.9375rem] leading-[1.8] text-white/55 max-w-[640px]`}
              style={{ transitionDelay: "220ms" }}
            >
              Currently based in Riyadh, Saudi Arabia, contributing to the
              Starah Independent Power Plant — one of the largest onshore wind
              projects in the region. Previously supported the full construction
              lifecycle of the 718MW Meghnaghat Combined Cycle Power Plant in
              Bangladesh, which reached Commercial Operation Date (COD) in 2025.
            </p>
          </div>

          {/* Core competencies */}
          <aside
            aria-label="Core competencies"
            className={`rv rv-right ${vis ? "in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35 mb-4">
              Core Competencies
            </p>
            <ul className="flex flex-wrap gap-2">
              {FEATURED_COMPETENCIES.map((item, i) => (
                <li
                  key={item}
                  className={`rv rv-fade ${vis ? "in" : ""} px-3 py-1.5 rounded-md
                              bg-white/[0.04] border border-white/[0.09]
                              text-[12px] font-medium text-white/65 tracking-wide
                              hover:border-gold/30 hover:text-white/80 transition-colors duration-150`}
                  style={{ transitionDelay: `${280 + i * 40}ms` }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Key strengths grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STRENGTHS.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className={`rv rv-scale ${vis ? "in" : ""} group p-6 rounded-xl border border-white/[0.08]
                          bg-white/[0.03] hover:border-gold/25
                          hover:bg-white/[0.05]
                          hover:-translate-y-[2px] transition-all duration-200`}
              style={{ transitionDelay: `${320 + i * 80}ms` }}
            >
              <div
                className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4
                           group-hover:bg-gold/20 transition-colors duration-200"
              >
                <Icon size={18} className="text-gold" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-bold text-white/95 text-[0.9375rem] mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-[0.875rem] leading-[1.75] text-white/55">
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
