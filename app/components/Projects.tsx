"use client";

import Image from "next/image";
import { MapPin, Wind, Flame, Award, Clock, User, Layers, CheckCheck } from "lucide-react";
import { projects } from "../data/content";
import { useReveal } from "../hooks/useReveal";

// ─── Engineering fallback graphic ────────────────────────────────────────────

function EngineeringGraphic({ capacity, type }: { capacity: string; type: string }) {
  const isWind = type.toLowerCase().includes("wind");
  return (
    <div className="absolute inset-0 bg-[#0B1628] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        {[320, 230, 150, 80].map((size) => (
          <div key={size} className="absolute rounded-full border border-gold/[0.07]" style={{ width: size, height: size }} />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2 select-none">
        {isWind ? (
          <Wind size={32} className="text-gold/30" strokeWidth={1} />
        ) : (
          <Flame size={32} className="text-gold/30" strokeWidth={1} />
        )}
        <span className="font-display font-extrabold text-white/[0.08] text-[3rem] leading-none tracking-tight">
          {capacity}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/[0.08]">{type}</span>
      </div>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ kind, label }: { kind: "active" | "completed"; label: string }) {
  return kind === "active" ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-gold/12 border border-gold/30 backdrop-blur-sm
                     text-[10.5px] font-bold text-gold uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      {label}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                     bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-sm
                     text-[10.5px] font-bold text-emerald-400 uppercase tracking-wider">
      <CheckCheck size={11} strokeWidth={2.5} />
      {label}
    </span>
  );
}

// ─── Meta item ────────────────────────────────────────────────────────────────

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-white/25">
        {label}
      </span>
      <span className="text-[13px] font-medium text-white/70 leading-snug truncate" title={value}>
        {value}
      </span>
    </div>
  );
}

// ─── Cinematic project panel ──────────────────────────────────────────────────

function ProjectPanel({
  project,
  delay,
  vis,
}: {
  project: typeof projects[number];
  delay: number;
  vis: boolean;
}) {
  const hasImage = Boolean(project.coverImage);

  const area         = "area" in project ? (project as { area: string }).area : null;
  const turbineCount = "turbineCount" in project ? (project as typeof projects[0]).turbineCount : null;
  const turbineCap   = "turbineCapacity" in project ? (project as typeof projects[0]).turbineCapacity : null;
  const turbineMfg   = "turbineManufacturer" in project ? (project as typeof projects[0]).turbineManufacturer : null;
  const tech         = "technology" in project ? (project as typeof projects[1]).technology : null;

  return (
    <article
      aria-label={project.name}
      className={`rv rv-scale ${vis ? "in" : ""}
                  group rounded-2xl overflow-hidden border border-white/[0.07]
                  bg-[#0B1628] hover:border-gold/20
                  transition-all duration-500 ease-[var(--ease-smooth)]`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Cinematic image area ── */}
      <div className="relative h-[420px] sm:h-[480px] overflow-hidden shrink-0">
        {hasImage ? (
          <>
            <Image
              src={project.coverImage}
              alt={`${project.name} site photo`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center
                         group-hover:scale-[1.06]
                         transition-transform duration-700 ease-[var(--ease-smooth)]"
            />
            {/* Multi-stop gradient — ensures readability from bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, #0B1628 0%, rgba(11,22,40,0.82) 30%, rgba(11,22,40,0.30) 60%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            {/* Subtle top vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(4,12,24,0.45) 0%, transparent 30%)",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <EngineeringGraphic capacity={project.capacity} type={project.type} />
        )}

        {/* Top-left: status badge */}
        <div className="absolute top-5 left-5">
          <StatusBadge kind={project.statusKind} label={project.status} />
        </div>

        {/* Top-right: milestone */}
        {project.milestone && (
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full
                          bg-gold/10 border border-gold/20 backdrop-blur-sm">
            <Award size={11} className="text-gold" strokeWidth={2} />
            <span className="text-[10px] font-semibold text-gold/90">{project.milestone}</span>
          </div>
        )}

        {/* Bottom overlay: title + capacity */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <span className="inline-block text-[10.5px] font-semibold text-white/45 uppercase
                           tracking-[0.16em] mb-2">
            {project.type}
          </span>
          <h3
            className="font-display font-extrabold text-white leading-tight tracking-tight mb-3"
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            {project.name}
          </h3>
          <div className="flex items-baseline gap-3">
            <span
              className="font-display font-extrabold text-gold leading-none"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
            >
              {project.capacity}
            </span>
            <span className="text-[12px] text-white/35 font-medium">{project.type}</span>
          </div>
        </div>
      </div>

      {/* ── Details ── */}
      <div className="p-6 lg:p-8 flex flex-col gap-6">

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4
                        p-5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
          <MetaItem label="EPC Contractor" value={project.contractor} />
          <MetaItem label="Owner / Client"  value={project.owner}      />
          {area         && <MetaItem label="Project Area"     value={area}          />}
          {turbineCount && <MetaItem label="Turbines"         value={`${turbineCount}`} />}
          {turbineCap   && <MetaItem label="Turbine Capacity" value={`${turbineCap} each`} />}
          {turbineMfg   && <MetaItem label="Manufacturer"     value={turbineMfg}    />}
          {tech         && <MetaItem label="Technology"       value={tech}          />}
          <MetaItem label="EDMS"            value={project.edms}       />
          <MetaItem label="Period"          value={project.period}     />
        </div>

        {/* Role */}
        <div className="flex items-center gap-2.5">
          <User size={12} className="text-gold/60 shrink-0" strokeWidth={1.75} />
          <span className="text-[11.5px] font-bold text-white/60 uppercase tracking-[0.12em]">
            {project.myRole}
          </span>
        </div>

        {/* Responsibilities */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers size={12} className="text-white/25 shrink-0" strokeWidth={1.75} />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.15em] text-white/25">
              Key Responsibilities
            </span>
          </div>
          <ul className="space-y-2">
            {project.highlights.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[12.5px] leading-[1.7] text-white/50"
              >
                <span className="mt-[8px] w-1 h-1 rounded-full bg-gold/40 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06]
                        flex items-center justify-between gap-3 text-[11.5px] text-white/30">
          <span className="flex items-center gap-1.5">
            <MapPin size={10} strokeWidth={1.75} className="text-gold/40 shrink-0" />
            {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={10} strokeWidth={1.75} className="shrink-0" />
            {project.period}
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const [ref, vis] = useReveal(0.05);

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="section-pad bg-[#040C18]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-14">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Projects
          </p>
          <h2
            id="projects-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            EPC Project Portfolio
          </h2>
          <p
            className={`rv rv-up ${vis ? "in" : ""} mt-3 text-[0.9375rem] text-white/50 max-w-[520px] leading-relaxed`}
            style={{ transitionDelay: "150ms" }}
          >
            Large-scale power generation and renewable energy projects across
            Saudi Arabia and Bangladesh — spanning 2.7 GW of total capacity.
          </p>
        </div>

        {/* Cinematic panels — 2-up on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              vis={vis}
              delay={220 + i * 120}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
