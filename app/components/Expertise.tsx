"use client";

import {
  FileStack, Database, ClipboardList, Scale,
  MonitorCheck, Zap, FileText, Cpu,
} from "lucide-react";
import { expertiseCategories, softwareTools, languages } from "../data/content";
import { useReveal } from "../hooks/useReveal";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP = {
  FileStack:     FileStack,
  Database:      Database,
  ClipboardList: ClipboardList,
  Scale:         Scale,
} as const;

// ─── Level badge ─────────────────────────────────────────────────────────────

const LEVEL_STYLES = {
  live:       "bg-gold/12 text-gold border-gold/25",
  trained:    "bg-white/[0.06] text-white/55 border-white/[0.12]",
  advanced:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  proficient: "bg-white/[0.06] text-white/55 border-white/[0.12]",
  active:     "bg-gold/12 text-gold border-gold/25",
} as const;

function LevelBadge({ level, kind }: { level: string; kind: keyof typeof LEVEL_STYLES }) {
  return (
    <span
      className={[
        "inline-block px-2.5 py-1 rounded-md border text-[10.5px] font-bold",
        "tracking-wide uppercase whitespace-nowrap",
        LEVEL_STYLES[kind],
      ].join(" ")}
    >
      {level}
    </span>
  );
}

// ─── Expertise category card ──────────────────────────────────────────────────

function CategoryCard({
  category, vis, delay,
}: {
  category: (typeof expertiseCategories)[number];
  vis: boolean;
  delay: number;
}) {
  const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP] ?? FileText;

  return (
    <div
      className={`rv rv-scale ${vis ? "in" : ""} group p-6 rounded-xl border border-white/[0.08]
                  bg-white/[0.03] hover:border-gold/25 hover:bg-white/[0.05]
                  hover:-translate-y-[2px] transition-all duration-200 flex flex-col gap-4`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0
                     group-hover:bg-gold/18 transition-colors duration-200"
        >
          <Icon size={17} className="text-gold" strokeWidth={1.75} />
        </div>
        <h3 className="font-display font-bold text-white/95 text-[0.9375rem] tracking-tight leading-snug">
          {category.label}
        </h3>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label={`${category.label} skills`}>
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.08]
                       text-[12px] font-medium text-white/65 leading-none
                       transition-colors duration-150 hover:border-gold/25 hover:text-white/80"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Software tool card ───────────────────────────────────────────────────────

function ToolCard({ tool, vis, delay }: {
  tool: (typeof softwareTools)[number];
  vis: boolean;
  delay: number;
}) {
  const isAI   = tool.category === "AI";
  const isEDMS = tool.category === "EDMS / PMIS";

  return (
    <div
      className={`rv rv-up ${vis ? "in" : ""} flex items-start gap-4 p-4 rounded-xl border border-white/[0.08]
                  bg-white/[0.03] hover:border-gold/20 hover:bg-white/[0.05]
                  hover:-translate-y-[2px] transition-all duration-200`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center bg-white/[0.06]">
        {isAI   ? <Zap        size={15} className="text-gold"     strokeWidth={1.75} /> :
         isEDMS ? <Database   size={15} className="text-white/50" strokeWidth={1.75} /> :
                  <MonitorCheck size={15} className="text-white/50" strokeWidth={1.75} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span className="font-semibold text-white/90 text-[13.5px] tracking-tight truncate">
            {tool.name}
          </span>
          <LevelBadge level={tool.level} kind={tool.levelKind} />
        </div>
        <p className="text-[12px] text-white/40 leading-snug">{tool.context}</p>
      </div>
    </div>
  );
}

// ─── Language item ────────────────────────────────────────────────────────────

function LanguageItem({ lang }: { lang: (typeof languages)[number] }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.07] last:border-0">
      <span className="text-[14px] font-medium text-white/80">{lang.name}</span>
      <span className="text-[12px] font-semibold text-white/35">{lang.level}</span>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Expertise() {
  const [ref, vis] = useReveal(0.06);

  return (
    <section
      id="expertise"
      ref={ref}
      aria-labelledby="expertise-heading"
      className="section-pad bg-[#070E1A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">

        {/* Section heading */}
        <div>
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Expertise
          </p>
          <h2
            id="expertise-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Skills & Capabilities
          </h2>
          <p
            className={`rv rv-up ${vis ? "in" : ""} mt-3 text-[0.9375rem] text-white/50 max-w-[520px] leading-relaxed`}
            style={{ transitionDelay: "150ms" }}
          >
            Capabilities built across large-scale EPC projects — organized by
            discipline and grounded in live project experience.
          </p>
        </div>

        {/* Expertise category cards */}
        <div>
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-5`}
            style={{ transitionDelay: "200ms" }}
          >
            Professional Expertise
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {expertiseCategories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                vis={vis}
                delay={260 + i * 80}
              />
            ))}
          </div>
        </div>

        {/* Software & tools */}
        <div>
          <div
            className={`rv rv-up ${vis ? "in" : ""} flex items-center gap-3 mb-5`}
            style={{ transitionDelay: "200ms" }}
          >
            <Cpu size={14} className="text-gold" strokeWidth={1.75} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Software & Tools
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {softwareTools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} vis={vis} delay={260 + i * 60} />
            ))}
          </div>
        </div>

        {/* Languages */}
        <div
          className={`rv rv-up ${vis ? "in" : ""} max-w-xs`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-1">
            Languages
          </p>
          <div className="mt-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 divide-y divide-white/[0.07]">
            {languages.map((lang) => (
              <LanguageItem key={lang.name} lang={lang} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
