import {
  FileStack, Database, ClipboardList, Scale,
  MonitorCheck, Zap, FileText, Cpu,
} from "lucide-react";
import { expertiseCategories, softwareTools, languages } from "../data/content";

// ─── Icon map (keeps component data-driven) ──────────────────────────────────

const ICON_MAP = {
  FileStack:     FileStack,
  Database:      Database,
  ClipboardList: ClipboardList,
  Scale:         Scale,
} as const;

// ─── Level badge ─────────────────────────────────────────────────────────────

const LEVEL_STYLES = {
  live:       "bg-gold/12 text-gold border-gold/25",
  trained:    "bg-navy/[0.06] text-navy/65 border-navy/12",
  advanced:   "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  proficient: "bg-navy/[0.06] text-navy/65 border-navy/12",
  active:     "bg-gold/12 text-gold border-gold/25",
} as const;

function LevelBadge({
  level,
  kind,
}: {
  level: string;
  kind: keyof typeof LEVEL_STYLES;
}) {
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
  category,
}: {
  category: (typeof expertiseCategories)[number];
}) {
  const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP] ?? FileText;

  return (
    <div
      className="group p-6 rounded-xl border border-border bg-surface
                 hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(11,22,40,0.07)]
                 transition-all duration-200 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0
                     group-hover:bg-gold/18 transition-colors duration-200"
        >
          <Icon size={17} className="text-gold" strokeWidth={1.75} />
        </div>
        <h3 className="font-display font-bold text-navy text-[0.9375rem] tracking-tight leading-snug">
          {category.label}
        </h3>
      </div>

      {/* Skill tags */}
      <ul className="flex flex-wrap gap-2" aria-label={`${category.label} skills`}>
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="px-2.5 py-1.5 rounded-md bg-cream border border-border
                       text-[12px] font-medium text-navy/70 leading-none"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Software tool card ───────────────────────────────────────────────────────

function ToolCard({ tool }: { tool: (typeof softwareTools)[number] }) {
  const isEDMS = tool.category === "EDMS / PMIS";
  const isAI   = tool.category === "AI";

  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl border border-border bg-cream
                 hover:border-gold/30 hover:bg-surface
                 transition-all duration-200"
    >
      {/* Icon circle */}
      <div
        className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center
                   bg-navy/[0.06]"
      >
        {isAI   ? <Zap        size={15} className="text-gold"     strokeWidth={1.75} /> :
         isEDMS ? <Database   size={15} className="text-navy/50"  strokeWidth={1.75} /> :
                  <MonitorCheck size={15} className="text-navy/50" strokeWidth={1.75} />}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span className="font-semibold text-navy text-[13.5px] tracking-tight truncate">
            {tool.name}
          </span>
          <LevelBadge level={tool.level} kind={tool.levelKind} />
        </div>
        <p className="text-[12px] text-muted leading-snug">{tool.context}</p>
      </div>
    </div>
  );
}

// ─── Language item ────────────────────────────────────────────────────────────

function LanguageItem({ lang }: { lang: (typeof languages)[number] }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-[14px] font-medium text-navy">{lang.name}</span>
      <span className="text-[12px] font-semibold text-muted">{lang.level}</span>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="section-pad bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">

        {/* Section heading */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Expertise
          </p>
          <h2
            id="expertise-heading"
            className="font-display font-extrabold text-navy
                       text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]"
          >
            Skills & Capabilities
          </h2>
          <p className="mt-3 text-[0.9375rem] text-navy/55 max-w-[520px] leading-relaxed">
            Capabilities built across large-scale EPC projects — organized by
            discipline and grounded in live project experience.
          </p>
        </div>

        {/* Expertise category cards */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted mb-5">
            Professional Expertise
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {expertiseCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>

        {/* Software & tools */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Cpu size={14} className="text-gold" strokeWidth={1.75} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Software & Tools
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {softwareTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="max-w-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted mb-1">
            Languages
          </p>
          <div className="mt-2 rounded-xl border border-border bg-surface px-5 divide-y divide-border">
            {languages.map((lang) => (
              <LanguageItem key={lang.name} lang={lang} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
