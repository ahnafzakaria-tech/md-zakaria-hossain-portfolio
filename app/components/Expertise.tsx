"use client";

import {
  FileStack, Database, ClipboardList, Scale,
  MonitorCheck, Zap, FileText, Cpu, ChevronDown,
} from "lucide-react";
import { expertiseCategories, softwareTools, languages } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import { useDisclosure } from "../hooks/useDisclosure";
import { usePointerGlow } from "../hooks/usePointerGlow";

const ICON_MAP = {
  FileStack:     FileStack,
  Database:      Database,
  ClipboardList: ClipboardList,
  Scale:         Scale,
} as const;

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

function CategoryCard({
  category, vis, delay,
}: {
  category: (typeof expertiseCategories)[number];
  vis: boolean;
  delay: number;
}) {
  const { isOpen, triggerProps, bodyProps } = useDisclosure();
  const { ref: glowRef, hovering, handlers: glowHandlers } = usePointerGlow<HTMLDivElement>();
  const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP] ?? FileText;

  return (
    <div
      ref={glowRef}
      className={`rv rv-scale ${vis ? "in" : ""} disclosure-card glass-base glass-highlight glass-edge relative p-6 cursor-pointer flex flex-col gap-4 overflow-hidden`}
      style={{ transitionDelay: `${delay}ms` }}
      data-open={isOpen}
      data-hovering={hovering}
      {...triggerProps}
      {...glowHandlers}
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold/60 to-transparent
                   transition-all duration-500 ease-[var(--ease-expo)]"
        style={{ width: isOpen ? "100%" : "0%" }}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0
                       transition-all duration-300 ease-[var(--ease-spring)]"
            style={{
              backgroundColor: isOpen ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.1)",
              transform: isOpen ? "scale(1.06)" : "scale(1)",
            }}
          >
            <Icon size={17} className="text-gold" strokeWidth={1.75} />
          </div>
          <h3 className="font-display font-bold text-white/95 text-[0.9375rem] tracking-tight leading-snug">
            {category.label}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[11px] text-white/25 transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`}>
            {category.skills.length} skills
          </span>
          <div className="disclosure-chevron w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
            <ChevronDown size={12} strokeWidth={2} className="text-white/35" />
          </div>
        </div>
      </div>

      <div className="disclosure-body" {...bodyProps}>
        <div>
          <ul className="flex flex-wrap gap-2 pt-1" aria-label={`${category.label} skills`}>
            {category.skills.map((skill, i) => (
              <li
                key={skill}
                className="disclosure-item px-2.5 py-1.5 glass-subtle
                           text-[12px] font-medium text-white/65 leading-none
                           hover:border-[var(--glass-border-lit)] hover:text-white/80 transition-colors duration-150"
                style={{ transitionDelay: isOpen ? `${80 + i * 35}ms` : "0ms" }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool, vis, delay }: {
  tool: (typeof softwareTools)[number];
  vis: boolean;
  delay: number;
}) {
  const isAI   = tool.category === "AI";
  const isEDMS = tool.category === "EDMS / PMIS";

  return (
    <div
      className={`rv rv-up ${vis ? "in" : ""} flex items-start gap-4 p-4 glass-base`}
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

function LanguageItem({ lang }: { lang: (typeof languages)[number] }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.07] last:border-0">
      <span className="text-[14px] font-medium text-white/80">{lang.name}</span>
      <span className="text-[12px] font-semibold text-white/35">{lang.level}</span>
    </div>
  );
}

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

        <div
          className={`rv rv-up ${vis ? "in" : ""} max-w-xs`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-1">
            Languages
          </p>
          <div className="mt-2 glass-subtle px-5 divide-y divide-white/[0.07]">
            {languages.map((lang) => (
              <LanguageItem key={lang.name} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
