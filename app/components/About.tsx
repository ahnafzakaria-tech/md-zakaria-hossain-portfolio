import { Database, FileText, Scale, Zap } from "lucide-react";
import { summary, competencies } from "../data/content";

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
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-pad bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label + heading */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            About
          </p>
          <h2
            id="about-heading"
            className="font-display font-extrabold text-navy text-[2rem] sm:text-[2.4rem]
                       tracking-tight leading-[1.15] max-w-xl"
          >
            Document Control as a
            <span className="block text-gold-gradient">professional discipline.</span>
          </h2>
        </div>

        {/* Two columns: summary + competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 mb-16">

          {/* Summary */}
          <div className="space-y-4">
            <p className="text-[1rem] leading-[1.85] text-navy/75 max-w-[640px]">
              {summary}
            </p>
            <p className="text-[0.9375rem] leading-[1.8] text-navy/60 max-w-[640px]">
              Currently based in Riyadh, Saudi Arabia, contributing to the
              Starah Independent Power Plant — one of the largest onshore wind
              projects in the region. Previously supported the full construction
              lifecycle of the 718MW Meghnaghat Combined Cycle Power Plant in
              Bangladesh, which reached Commercial Operation Date (COD) in 2025.
            </p>
          </div>

          {/* Core competencies */}
          <aside aria-label="Core competencies">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted mb-4">
              Core Competencies
            </p>
            <ul className="flex flex-wrap gap-2">
              {FEATURED_COMPETENCIES.map((item) => (
                <li
                  key={item}
                  className="px-3 py-1.5 rounded-md bg-cream border border-border
                             text-[12px] font-medium text-navy/70 tracking-wide"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Key strengths grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STRENGTHS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group p-6 rounded-xl border border-border bg-cream
                         hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(11,22,40,0.07)]
                         transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4
                           group-hover:bg-gold/20 transition-colors duration-200"
              >
                <Icon size={18} className="text-gold" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-bold text-navy text-[0.9375rem] mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-[0.875rem] leading-[1.75] text-navy/60">
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
