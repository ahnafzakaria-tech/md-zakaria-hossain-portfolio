"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin, Wind, Flame, Award, Clock, User, Layers, CheckCheck, ArrowRight, X } from "lucide-react";
import { projects } from "../data/content";
import { useReveal } from "../hooks/useReveal";

type Phase = "idle" | "pressing" | "expanded" | "closing";

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

function SpatialProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
  onClose,
  vis,
  delay,
}: {
  project: (typeof projects)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
  vis: boolean;
  delay: number;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const [hovering, setHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    if (vis && !entranceComplete) {
      const t = setTimeout(() => setEntranceComplete(true), delay + 700);
      return () => clearTimeout(t);
    }
  }, [vis, delay, entranceComplete]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const setPhaseTracked = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  useEffect(() => {
    clearTimers();
    if (isExpanded) {
      if (phaseRef.current === "idle" || phaseRef.current === "closing") {
        setPhaseTracked("pressing");
        timersRef.current.push(
          setTimeout(() => setPhaseTracked("expanded"), 130)
        );
      }
    } else {
      if (phaseRef.current === "expanded" || phaseRef.current === "pressing") {
        setPhaseTracked("closing");
        timersRef.current.push(
          setTimeout(() => setPhaseTracked("idle"), 520)
        );
      }
    }
    return clearTimers;
  }, [isExpanded, clearTimers, setPhaseTracked]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (phaseRef.current !== "idle") return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - rect.top) / rect.height).toFixed(3));
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".spatial-close")) return;
    onToggle();
  }, [onToggle]);

  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  }, [onToggle]);

  const isOpen = phase === "expanded";
  const hasImage = Boolean(project.coverImage);

  const area = "area" in project ? (project as { area: string }).area : null;
  const turbineCount = "turbineCount" in project ? (project as (typeof projects)[0]).turbineCount : null;
  const turbineCap = "turbineCapacity" in project ? (project as (typeof projects)[0]).turbineCapacity : null;
  const turbineMfg = "turbineManufacturer" in project ? (project as (typeof projects)[0]).turbineManufacturer : null;
  const tech = "technology" in project ? (project as (typeof projects)[1]).technology : null;

  const cardClass = entranceComplete
    ? "spatial-card glass-highlight overflow-hidden"
    : `spatial-card glass-highlight overflow-hidden rv rv-scale ${vis ? "in" : ""}`;

  return (
    <article
      ref={cardRef}
      className={cardClass}
      style={entranceComplete ? undefined : { transitionDelay: `${delay}ms` }}
      data-phase={phase}
      data-hovering={phase === "idle" ? hovering : undefined}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={project.name}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Close button */}
      <button
        className="spatial-close"
        onClick={handleCloseClick}
        aria-label="Close details"
        tabIndex={isOpen ? 0 : -1}
      >
        <X size={13} strokeWidth={2} className="text-white/60" />
      </button>

      {/* ── Summary (always visible) ── */}
      <div className="relative z-[1]">
        {/* Cinematic image area */}
        <div className="relative h-[320px] sm:h-[380px] -mx-[1.5rem] -mt-[1.5rem] lg:-mx-[2rem] lg:-mt-[1.75rem] overflow-hidden rounded-t-[inherit]">
          {hasImage ? (
            <>
              <Image
                src={project.coverImage}
                alt={`${project.name} site photo`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-[var(--ease-smooth)]"
                style={{ transform: isOpen ? "scale(1.04)" : hovering ? "scale(1.03)" : "scale(1)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, #0B1628 0%, rgba(11,22,40,0.82) 30%, rgba(11,22,40,0.30) 60%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(4,12,24,0.45) 0%, transparent 30%)",
                }}
              />
            </>
          ) : (
            <EngineeringGraphic capacity={project.capacity} type={project.type} />
          )}

          <div className="absolute top-5 left-5">
            <StatusBadge kind={project.statusKind} label={project.status} />
          </div>

          {project.milestone && (
            <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full
                            bg-gold/10 border border-gold/20 backdrop-blur-sm">
              <Award size={11} className="text-gold" strokeWidth={2} />
              <span className="text-[10px] font-semibold text-gold/90">{project.milestone}</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="font-display font-extrabold text-[1.8rem] leading-none text-white/[0.12] select-none"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="w-[1px] h-4 bg-white/[0.15]" aria-hidden="true" />
              <span className="text-[10.5px] font-semibold text-white/45 uppercase tracking-[0.16em]">
                {project.type}
              </span>
            </div>
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

        {/* Summary row */}
        <div className="pt-4 flex items-center gap-4 text-[12px] text-white/45">
          <span className="font-semibold truncate">{project.contractor}</span>
          <span className="text-white/15" aria-hidden="true">·</span>
          <span className="truncate">{project.edms}</span>
          <span className="text-white/15 hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline truncate">{project.period}</span>
        </div>

        {/* Explore affordance */}
        <div className="spatial-explore mt-4 text-[11px] font-semibold text-gold/50 tracking-wide">
          <span>Explore</span>
          <ArrowRight size={12} strokeWidth={2} className="spatial-explore-arrow text-gold/40" />
        </div>
      </div>

      {/* ── Detail surface (spatial reveal) ── */}
      <div className="spatial-detail">
        <div>
          <div className="spatial-separator mt-5 mb-5" />

          {/* Metadata grid */}
          <div
            className="spatial-item grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] mb-5"
            style={{ transitionDelay: isOpen ? "260ms" : "0ms" }}
          >
            <MetaItem label="EPC Contractor" value={project.contractor} />
            <MetaItem label="Owner / Client" value={project.owner} />
            {area && <MetaItem label="Project Area" value={area} />}
            {turbineCount && <MetaItem label="Turbines" value={`${turbineCount}`} />}
            {turbineCap && <MetaItem label="Turbine Capacity" value={`${turbineCap} each`} />}
            {turbineMfg && <MetaItem label="Manufacturer" value={turbineMfg} />}
            {tech && <MetaItem label="Technology" value={tech} />}
            <MetaItem label="EDMS" value={project.edms} />
            <MetaItem label="Period" value={project.period} />
          </div>

          {/* Role */}
          <div
            className="spatial-item flex items-center gap-2.5 mb-4"
            style={{ transitionDelay: isOpen ? "310ms" : "0ms" }}
          >
            <User size={12} className="text-gold/60 shrink-0" strokeWidth={1.75} />
            <span className="text-[11.5px] font-bold text-white/60 uppercase tracking-[0.12em]">
              {project.myRole}
            </span>
          </div>

          {/* Responsibilities */}
          <div
            className="spatial-item mb-3"
            style={{ transitionDelay: isOpen ? "350ms" : "0ms" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Layers size={12} className="text-white/25 shrink-0" strokeWidth={1.75} />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.15em] text-white/25">
                Key Responsibilities
              </span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {project.highlights.map((item, i) => (
              <li
                key={i}
                className="spatial-item flex items-start gap-2.5 text-[12.5px] leading-[1.7] text-white/50"
                style={{ transitionDelay: isOpen ? `${400 + i * 55}ms` : "0ms" }}
              >
                <span className="mt-[7px] w-1 h-1 rounded-full bg-gold/40 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div
            className="spatial-item pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 text-[11.5px] text-white/30"
            style={{ transitionDelay: isOpen ? `${400 + project.highlights.length * 55}ms` : "0ms" }}
          >
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
      </div>
    </article>
  );
}

export default function Projects() {
  const [ref, vis] = useReveal(0.05);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setExpandedId(null);
  }, []);

  useEffect(() => {
    if (!expandedId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [expandedId]);

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="section-pad bg-[#040C18]"
    >
      {/* Backdrop */}
      <div
        className={`spatial-backdrop ${expandedId ? "active" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <SpatialProjectCard
              key={project.id}
              project={project}
              index={i}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
              onClose={handleClose}
              vis={vis}
              delay={220 + i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
