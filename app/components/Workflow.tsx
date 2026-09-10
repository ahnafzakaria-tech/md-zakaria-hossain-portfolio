"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox, ScanLine, FileStack, ClipboardList, Database,
  ScrollText, GitBranch, RefreshCw, Send, Archive,
  ArrowRight, CornerDownLeft,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  {
    n:     1,
    phase: "Intake",
    icon:  Inbox,
    title: "Document Received",
    desc:  "Incoming document from engineer, vendor, or subcontractor",
  },
  {
    n:     2,
    phase: "Intake",
    icon:  ScanLine,
    title: "Validation Check",
    desc:  "Verify format, metadata, document type, and numbering compliance",
  },
  {
    n:     3,
    phase: "Registration",
    icon:  FileStack,
    title: "Registration & Coding",
    desc:  "Assign document number, classify by discipline, register in EDMS",
  },
  {
    n:     4,
    phase: "Review",
    icon:  ClipboardList,
    title: "Internal Review",
    desc:  "Route to discipline engineer for technical review and comment",
  },
  {
    n:     5,
    phase: "EDMS",
    icon:  Database,
    title: "EDMS / PMIS Upload",
    desc:  "Submit via Thinkproject or S-PMIS, initiate formal approval workflow",
  },
  {
    n:     6,
    phase: "Approval",
    icon:  ScrollText,
    title: "Owner / Client Review",
    desc:  "Transmit to Owner or Consultant for formal review and approval",
  },
  {
    n:     7,
    phase: "Approval",
    icon:  GitBranch,
    title: "Comment Processing",
    desc:  "Log reviewer comments, coordinate revision with document originator",
  },
  {
    n:     8,
    phase: "Revision",
    icon:  RefreshCw,
    title: "Revision & Resubmission",
    desc:  "Updated document revised and resubmitted through approval workflow",
  },
  {
    n:     9,
    phase: "Distribution",
    icon:  Send,
    title: "Controlled Distribution",
    desc:  "Issue approved document to all relevant teams via controlled transmittal",
  },
  {
    n:     10,
    phase: "Closeout",
    icon:  Archive,
    title: "Archiving & Closeout",
    desc:  "Update document register, archive superseded revisions, maintain audit trail",
  },
] as const;

const ROW1 = STEPS.slice(0, 5);
const ROW2 = STEPS.slice(5);

// ─── Phase accent — key phases get gold treatment ─────────────────────────────

const PHASE_GOLD = new Set(["EDMS", "Approval", "Distribution"]);

function stepBorder(phase: string) {
  return PHASE_GOLD.has(phase) ? "border-gold/25" : "border-white/[0.08]";
}

// ─── Single step card (with progressive activation) ───────────────────────────

function StepCard({
  step,
  vis,
  delay,
}: {
  step: (typeof STEPS)[number];
  vis: boolean;
  delay: number;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(vis), vis ? delay + 60 : 0);
    return () => clearTimeout(t);
  }, [vis, delay]);

  const Icon = step.icon;
  const isKeyPhase = PHASE_GOLD.has(step.phase);

  return (
    <div
      className={[
        "rv rv-up flex-1 min-w-0 rounded-xl border p-4 flex flex-col gap-3",
        "transition-all duration-500 ease-[var(--ease-spring)]",
        active
          ? isKeyPhase
            ? "border-gold/35 bg-gold/[0.05] shadow-[0_0_20px_rgba(201,168,76,0.05)]"
            : "border-white/[0.14] bg-white/[0.05]"
          : `${stepBorder(step.phase)} bg-white/[0.03]`,
        "hover:border-gold/40 hover:-translate-y-[2px]",
        vis ? "in" : "",
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-display font-extrabold text-[1.5rem] leading-none
                      transition-colors duration-500
                      ${active ? "text-gold/55" : "text-gold/25"}`}
        >
          {String(step.n).padStart(2, "0")}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center
                      transition-all duration-500
                      ${active ? "bg-gold/15" : "bg-white/[0.06]"}`}
        >
          <Icon
            size={15}
            strokeWidth={1.75}
            className={`transition-colors duration-500 ${active ? "text-gold/80" : "text-white/45"}`}
          />
        </div>
      </div>

      <div>
        <p
          className={`text-[12px] font-bold leading-snug mb-1 transition-colors duration-500
                      ${active ? "text-white/95" : "text-white/75"}`}
        >
          {step.title}
        </p>
        <p className="text-[11px] leading-[1.6] text-white/35">
          {step.desc}
        </p>
      </div>

      <span
        className={`self-start text-[9.5px] font-semibold uppercase tracking-[0.18em] mt-auto
                    transition-colors duration-500
                    ${active && isKeyPhase ? "text-gold/70" : "text-gold/40"}`}
      >
        {step.phase}
      </span>
    </div>
  );
}

// ─── Arrow connector ──────────────────────────────────────────────────────────

function StepArrow({
  vis,
  delay,
  active,
}: {
  vis: boolean;
  delay: number;
  active: boolean;
}) {
  return (
    <div
      className={`rv rv-fade ${vis ? "in" : ""} shrink-0 flex items-center justify-center w-5 mt-5`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-hidden="true"
    >
      <ArrowRight
        size={13}
        strokeWidth={1.5}
        className={`transition-colors duration-500 ${active ? "text-gold/40" : "text-gold/18"}`}
      />
    </div>
  );
}

// ─── Row connector ────────────────────────────────────────────────────────────

function RowConnector({ vis }: { vis: boolean }) {
  return (
    <div
      className={`rv rv-fade ${vis ? "in" : ""} flex items-center gap-2 px-2 py-1`}
      style={{ transitionDelay: "480ms" }}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/18 to-transparent" />
      <CornerDownLeft size={14} className="text-gold/25 shrink-0" strokeWidth={1.5} />
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/18 to-transparent" />
    </div>
  );
}

// ─── Row of steps with arrows ─────────────────────────────────────────────────

function StepRow({
  steps,
  vis,
  baseDelay,
}: {
  steps: readonly (typeof STEPS)[number][];
  vis: boolean;
  baseDelay: number;
}) {
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (!vis) {
      timers.push(setTimeout(() => setActiveSet(new Set()), 0));
    } else {
      steps.forEach((step, i) => {
        timers.push(
          setTimeout(() => {
            setActiveSet((s) => new Set([...s, step.n]));
          }, baseDelay + i * 80 + 60)
        );
      });
    }
    return () => timers.forEach(clearTimeout);
  }, [vis, steps, baseDelay]);

  return (
    <div className="flex items-stretch gap-2">
      {steps.map((step, i) => (
        <React.Fragment key={step.n}>
          <StepCard step={step} vis={vis} delay={baseDelay + i * 75} />
          {i < steps.length - 1 && (
            <StepArrow vis={vis} delay={baseDelay + i * 75 + 40} active={activeSet.has(step.n)} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Workflow() {
  const [ref, vis] = useReveal(0.1);

  return (
    <section
      id="workflow"
      ref={ref}
      aria-labelledby="workflow-heading"
      className="section-pad bg-navy relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none"
        aria-hidden="true"
      />
      {/* Accent lines */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]
                   bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]
                   bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-12">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Process
          </p>
          <h2
            id="workflow-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Document Control Workflow
          </h2>
          <p
            className={`rv rv-up ${vis ? "in" : ""} mt-3 text-[0.9375rem] text-white/45 max-w-[520px] leading-relaxed`}
            style={{ transitionDelay: "150ms" }}
          >
            A structured end-to-end process applied across EPC projects —
            from initial receipt through controlled distribution and final archiving.
          </p>
        </div>

        {/* Desktop flow */}
        <div className="hidden lg:block space-y-3">
          <StepRow steps={ROW1} vis={vis} baseDelay={200} />
          <RowConnector vis={vis} />
          <StepRow steps={ROW2} vis={vis} baseDelay={540} />
        </div>

        {/* Mobile flow */}
        <ol className="lg:hidden relative pl-8 space-y-0">
          <div
            className="absolute left-[11px] top-3 bottom-0 w-[1px]
                       bg-gradient-to-b from-gold/40 via-gold/10 to-transparent
                       origin-top transition-transform duration-[1.2s] ease-[var(--ease-spring)]"
            style={{ transform: vis ? "scaleY(1)" : "scaleY(0)" }}
            aria-hidden="true"
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isKeyPhase = PHASE_GOLD.has(step.phase);
            return (
              <li
                key={step.n}
                className={`rv rv-up ${vis ? "in" : ""} relative pb-6 last:pb-0`}
                style={{ transitionDelay: `${180 + i * 55}ms` }}
              >
                <div
                  className={[
                    "absolute -left-8 top-1 w-[22px] h-[22px] rounded-full",
                    "border-2 bg-navy flex items-center justify-center",
                    "transition-colors duration-500",
                    isKeyPhase ? "border-gold/50" : "border-white/[0.18]",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <span className="text-[8px] font-bold text-gold/60">{step.n}</span>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/[0.08]
                                bg-white/[0.03] p-4
                                hover:bg-white/[0.06] hover:border-gold/20 transition-all duration-200">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5
                                   ${isKeyPhase ? "bg-gold/10" : "bg-white/[0.06]"}`}>
                    <Icon
                      size={14}
                      strokeWidth={1.75}
                      className={isKeyPhase ? "text-gold/65" : "text-white/50"}
                    />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white/85 mb-1">{step.title}</p>
                    <p className="text-[11.5px] leading-[1.65] text-white/38">{step.desc}</p>
                    <span className="inline-block mt-2 text-[9px] font-semibold uppercase
                                     tracking-[0.18em] text-gold/40">
                      {step.phase}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  );
}
