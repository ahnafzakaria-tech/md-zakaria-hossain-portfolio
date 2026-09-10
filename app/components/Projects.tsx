import Image from "next/image";
import { MapPin, Wind, Flame, Award, Clock, User, Layers, CheckCheck } from "lucide-react";
import { projects } from "../data/content";

// ─── Technical fallback graphic rendered with CSS + SVG ─────────────────────

function EngineeringGraphic({ capacity, type }: { capacity: string; type: string }) {
  const isWind = type.toLowerCase().includes("wind");
  return (
    <div className="absolute inset-0 bg-navy overflow-hidden flex items-center justify-center">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        {[280, 200, 130, 70].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-gold/10"
            style={{ width: size, height: size }}
          />
        ))}
      </div>
      {/* Cross-hair lines */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-full h-[1px] bg-gold/10" />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-full w-[1px] bg-gold/10" />
      </div>
      {/* Center icon + capacity */}
      <div className="relative z-10 flex flex-col items-center gap-2 select-none">
        {isWind ? (
          <Wind size={28} className="text-gold/50" strokeWidth={1.25} />
        ) : (
          <Flame size={28} className="text-gold/50" strokeWidth={1.25} />
        )}
        <span className="font-display font-extrabold text-white/20 text-[2.6rem] leading-none tracking-tight">
          {capacity}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20">
          {type}
        </span>
      </div>
    </div>
  );
}

// ─── Status badge ────────────────────────────────────────────────────────────

function StatusBadge({ kind, label }: { kind: "active" | "completed"; label: string }) {
  return kind === "active" ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-gold/15 border border-gold/30
                     text-[11px] font-bold text-gold uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      {label}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-emerald-500/10 border border-emerald-500/25
                     text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
      <CheckCheck size={11} strokeWidth={2.5} />
      {label}
    </span>
  );
}

// ─── Meta row item ────────────────────────────────────────────────────────────

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      <span className="text-[13px] font-medium text-navy/80 leading-snug truncate" title={value}>
        {value}
      </span>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const hasImage = Boolean(project.coverImage);
  const tech = "technology" in project
    ? (project as typeof projects[1]).technology
    : null;

  return (
    <article
      aria-label={project.name}
      className="group rounded-2xl border border-border bg-surface overflow-hidden
                 shadow-[0_2px_16px_rgba(11,22,40,0.06)]
                 hover:shadow-[0_8px_40px_rgba(11,22,40,0.12)]
                 hover:border-border-dark transition-all duration-300
                 flex flex-col"
    >
      {/* ── Cover image / engineering graphic ─── */}
      <div className="relative h-[200px] sm:h-[220px] overflow-hidden bg-navy shrink-0">
        {hasImage ? (
          <>
            <Image
              src={project.coverImage}
              alt={`${project.name} site photo`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center
                         group-hover:scale-[1.03] transition-transform duration-500"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t
                         from-navy/80 via-navy/20 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : (
          <EngineeringGraphic capacity={project.capacity} type={project.type} />
        )}

        {/* Overlay: project name + type badge */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="inline-block px-2 py-0.5 rounded mb-2
                               bg-white/10 backdrop-blur-sm
                               text-[10px] font-semibold text-white/80 uppercase tracking-wider">
                {project.type}
              </span>
              <h3 className="font-display font-extrabold text-white leading-tight
                             text-[1rem] sm:text-[1.05rem] tracking-tight drop-shadow-sm">
                {project.name}
              </h3>
            </div>
            <div
              className="shrink-0 text-right"
              aria-label={`Capacity: ${project.capacity}`}
            >
              <span className="font-display font-extrabold text-gold leading-none
                               text-[1.5rem] drop-shadow-sm">
                {project.capacity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Card body ─────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-5">

        {/* Status + milestone */}
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge kind={project.statusKind} label={project.status} />
          {project.milestone && (
            <span className="inline-flex items-center gap-1.5
                             text-[11px] font-semibold text-gold/80">
              <Award size={11} strokeWidth={2} />
              {project.milestone}
            </span>
          )}
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-4 rounded-xl
                        bg-cream border border-border">
          <MetaItem label="EPC Contractor" value={project.contractor} />
          <MetaItem label="Owner / Client"  value={project.owner}      />
          <MetaItem label="Location"        value={project.location}   />
          <MetaItem label="EDMS"            value={project.edms}       />
          {tech && <MetaItem label="Technology" value={tech} />}
          <MetaItem label="Period" value={project.period} />
        </div>

        {/* My role */}
        <div className="flex items-center gap-2">
          <User size={13} className="text-gold shrink-0" strokeWidth={1.75} />
          <span className="text-[12px] font-bold text-navy uppercase tracking-widest">
            {project.myRole}
          </span>
        </div>

        {/* Highlights */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers size={13} className="text-muted shrink-0" strokeWidth={1.75} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
              Key Responsibilities
            </span>
          </div>
          <ul className="space-y-2">
            {project.highlights.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[13px] leading-[1.65] text-navy/65"
              >
                <span
                  className="mt-[7px] w-1 h-1 rounded-full bg-gold shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: location + period */}
        <div className="mt-auto pt-4 border-t border-border
                        flex items-center justify-between gap-3 text-[12px] text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin size={11} strokeWidth={1.75} className="text-gold shrink-0" />
            {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} strokeWidth={1.75} className="shrink-0" />
            {project.period}
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-pad bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Projects
          </p>
          <h2
            id="projects-heading"
            className="font-display font-extrabold text-navy
                       text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]"
          >
            EPC Project Portfolio
          </h2>
          <p className="mt-3 text-[0.9375rem] text-navy/55 max-w-[520px] leading-relaxed">
            Large-scale power generation and renewable energy projects across
            Saudi Arabia and Bangladesh — spanning 2.7 GW of total capacity.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
