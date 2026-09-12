"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { MapPin, Calendar, Building2, Award, ArrowRight, X } from "lucide-react";
import { experience } from "../data/content";
import { useReveal } from "../hooks/useReveal";

type Phase = "idle" | "pressing" | "expanded" | "closing";

function startYear(period: string): string {
  const m = period.match(/\d{4}/);
  return m ? m[0] : "";
}

function SpatialJobCard({
  job,
  isExpanded,
  onToggle,
  onClose,
  vis,
  delay,
}: {
  job: (typeof experience)[number];
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
      if (
        phaseRef.current === "expanded" ||
        phaseRef.current === "pressing"
      ) {
        setPhaseTracked("closing");
        timersRef.current.push(
          setTimeout(() => setPhaseTracked("idle"), 520)
        );
      }
    }

    return clearTimers;
  }, [isExpanded, clearTimers, setPhaseTracked]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (phaseRef.current !== "idle") return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty(
        "--mx",
        ((e.clientX - rect.left) / rect.width).toFixed(3)
      );
      el.style.setProperty(
        "--my",
        ((e.clientY - rect.top) / rect.height).toFixed(3)
      );
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".spatial-close")) return;
      onToggle();
    },
    [onToggle]
  );

  const handleCloseClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    },
    [onToggle]
  );

  const isOpen = phase === "expanded";

  const cardClass = entranceComplete
    ? "spatial-card glass-highlight glass-edge"
    : `spatial-card glass-highlight glass-edge rv rv-up ${vis ? "in" : ""}`;

  return (
    <div
      ref={cardRef}
      className={cardClass}
      style={entranceComplete ? undefined : { transitionDelay: `${delay}ms` }}
      data-phase={phase}
      data-hovering={phase === "idle" ? hovering : undefined}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
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

      {/* ── Summary (shared elements — always visible) ── */}
      <div className="relative z-[1]">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="font-display font-bold text-white/95 text-[1.1rem] tracking-tight leading-snug">
            {job.role}
          </h3>
          {"edms" in job && (
            <span
              className="shrink-0 px-3 py-1.5 rounded-md bg-gold/[0.08] border border-gold/20
                         text-[11px] font-semibold text-gold/80 tracking-wide whitespace-nowrap
                         transition-opacity duration-300"
              style={{ opacity: isOpen ? 1 : 0.65 }}
            >
              {(job as typeof experience[0] & { edms: string }).edms}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-2.5">
          <Building2
            size={13}
            className="text-gold shrink-0"
            strokeWidth={1.75}
          />
          <span className="text-[14px] font-semibold text-white/75">
            {job.company}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-2">
          <span className="flex items-center gap-1.5 text-[12px] text-white/40">
            <Calendar
              size={11}
              strokeWidth={1.75}
              className="text-white/30 shrink-0"
            />
            {job.period}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-white/40">
            <MapPin
              size={11}
              strokeWidth={1.75}
              className="text-gold/60 shrink-0"
            />
            {job.location}
          </span>
        </div>

        {"project" in job && job.project && (
          <p className="text-[12px] text-white/30 mb-2">{job.project}</p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {job.current && (
            <span className="inline-block px-2 py-0.5 rounded-full bg-gold/15 text-[10px] font-bold text-gold tracking-wider">
              Current
            </span>
          )}
          {"milestone" in job &&
            (job as typeof experience[1]).milestone && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gold/[0.08] border border-gold/20">
                <Award
                  size={11}
                  className="text-gold shrink-0"
                  strokeWidth={2}
                />
                <span className="text-[10px] font-semibold text-gold/90">
                  {(job as typeof experience[1]).milestone}
                </span>
              </div>
            )}
        </div>

        {/* Explore affordance */}
        <div className="spatial-explore mt-4 text-[11px] font-semibold text-gold/50 tracking-wide">
          <span>Explore</span>
          <ArrowRight
            size={12}
            strokeWidth={2}
            className="spatial-explore-arrow text-gold/40"
          />
        </div>
      </div>

      {/* ── Detail surface (spatial reveal) ── */}
      <div className="spatial-detail">
        <div>
          <div className="spatial-separator mt-5 mb-5" />

          <div
            className="spatial-item mb-3"
            style={{ transitionDelay: isOpen ? "260ms" : "0ms" }}
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.15em] text-white/25">
              Key Responsibilities
            </p>
          </div>

          <ul className="space-y-2.5">
            {job.bullets.map((bullet, i) => (
              <li
                key={i}
                className="spatial-item flex items-start gap-3 text-[0.875rem] leading-[1.7] text-white/60"
                style={{
                  transitionDelay: isOpen ? `${310 + i * 60}ms` : "0ms",
                }}
              >
                <span
                  className="mt-[7px] w-1 h-1 rounded-full bg-gold/60 shrink-0"
                  aria-hidden="true"
                />
                {bullet}
              </li>
            ))}
          </ul>

          {job.id === "law" && (
            <p
              className="spatial-item mt-4 text-[12px] text-white/35 italic"
              style={{
                transitionDelay: isOpen
                  ? `${310 + job.bullets.length * 60}ms`
                  : "0ms",
              }}
            >
              Legal background informs a compliance-focused approach to
              contractual documentation and regulatory record-keeping in current
              EPC roles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, vis] = useReveal(0.06);
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
      id="experience"
      ref={ref}
      aria-labelledby="experience-heading"
      className="section-pad bg-[#070E1A]"
    >
      {/* Backdrop */}
      <div
        className={`spatial-backdrop ${expandedId ? "active" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-14">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Experience
          </p>
          <h2
            id="experience-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Professional History
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div
            className="hidden lg:block absolute left-[200px] top-3 bottom-0
                       w-[1px] bg-gradient-to-b from-gold/50 via-white/[0.08] to-transparent
                       origin-top transition-transform duration-[1.1s] ease-[var(--ease-spring)]"
            style={{ transform: vis ? "scaleY(1)" : "scaleY(0)" }}
            aria-hidden="true"
          />

          <ol className="space-y-0">
            {experience.map((job, index) => (
              <li
                key={job.id}
                className="relative grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0 lg:gap-10"
              >
                {/* Left: period column */}
                <div
                  className={[
                    "lg:text-right lg:pt-1 pb-3 lg:pb-0",
                    index > 0 ? "pt-10 lg:pt-10" : "",
                  ].join(" ")}
                >
                  <span
                    className={`rv rv-fade ${vis ? "in" : ""} hidden lg:block font-display font-extrabold
                               text-[2.4rem] text-white/[0.06] leading-none mb-2 select-none`}
                    style={{ transitionDelay: `${160 + index * 140}ms` }}
                    aria-hidden="true"
                  >
                    {startYear(job.period)}
                  </span>
                </div>

                {/* Timeline dot */}
                <div
                  className={`rv rv-scale ${vis ? "in" : ""} hidden lg:block absolute left-[200px] -translate-x-1/2
                             w-3 h-3 rounded-full border-2 z-10 mt-1.5`}
                  style={{
                    top: index > 0 ? "2.5rem" : "0.375rem",
                    borderColor: job.current
                      ? "#C9A84C"
                      : "rgba(255,255,255,0.18)",
                    backgroundColor: job.current ? "#C9A84C" : "#070E1A",
                    transitionDelay: `${200 + index * 140}ms`,
                  }}
                  aria-hidden="true"
                />

                {/* Right: job card */}
                <div
                  className={[
                    "pb-10 lg:pb-12",
                    index > 0 ? "lg:pt-10" : "",
                    index === experience.length - 1 ? "pb-0" : "",
                  ].join(" ")}
                >
                  <SpatialJobCard
                    job={job}
                    isExpanded={expandedId === job.id}
                    onToggle={() => handleToggle(job.id)}
                    onClose={handleClose}
                    vis={vis}
                    delay={160 + index * 140}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
