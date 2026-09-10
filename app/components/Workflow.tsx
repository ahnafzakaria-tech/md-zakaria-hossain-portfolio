"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Inbox, ScanLine, FileStack, ClipboardList, Database,
  ScrollText, GitBranch, RefreshCw, Send, Archive,
  ArrowRight, CornerDownLeft,
} from "lucide-react";

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

// ─── Phase accent colours ─────────────────────────────────────────────────────

const PHASE_GOLD  = new Set(["EDMS", "Approval", "Distribution"]);
const PHASE_LIGHT = new Set(["Registration", "Review", "Revision", "Closeout"]);

function stepAccent(phase: string) {
  if (PHASE_GOLD.has(phase))  return "border-gold/40 bg-white/[0.07]";
  if (PHASE_LIGHT.has(phase)) return "border-white/15 bg-white/[0.04]";
  return "border-white/10 bg-transparent";
}

// ─── Single step card ─────────────────────────────────────────────────────────

function StepCard({
  step,
  visible,
  delay,
}: {
  step: (typeof STEPS)[number];
  visible: boolean;
  delay: number;
}) {
  const Icon = step.icon;
  return (
    <div
      className={[
        "flex-1 min-w-0 rounded-xl border p-4 flex flex-col gap-3",
        "transition-all duration-200 hover:bg-white/[0.09] hover:border-gold/50",
        stepAccent(step.phase),
        visible ? "animate-fade-up" : "opacity-0",
      ].join(" ")}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Number + icon row */}
      <div className="flex items-center justify-between">
        <span className="font-display font-extrabold text-gold/40 text-[1.5rem] leading-none">
          {String(step.n).padStart(2, "0")}
        </span>
        <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center">
          <Icon size={15} className="text-white/60" strokeWidth={1.75} />
        </div>
      </div>
      {/* Title */}
      <div>
        <p className="text-[12px] font-bold text-white/85 leading-snug mb-1">
          {step.title}
        </p>
        <p className="text-[11px] leading-[1.6] text-white/40">
          {step.desc}
        </p>
      </div>
      {/* Phase tag */}
      <span className="self-start text-[9.5px] font-semibold uppercase tracking-[0.18em]
                       text-gold/50 mt-auto">
        {step.phase}
      </span>
    </div>
  );
}

// ─── Arrow between steps ──────────────────────────────────────────────────────

function StepArrow({ visible, delay }: { visible: boolean; delay: number }) {
  return (
    <div
      className={[
        "shrink-0 flex items-center justify-center w-5 mt-5",
        visible ? "animate-fade-in" : "opacity-0",
      ].join(" ")}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden="true"
    >
      <ArrowRight size={13} className="text-gold/30" strokeWidth={1.5} />
    </div>
  );
}

// ─── Row connector (end of row 1 → start of row 2) ───────────────────────────

function RowConnector({ visible }: { visible: boolean }) {
  return (
    <div
      className={[
        "flex items-center gap-2 px-2 py-1",
        visible ? "animate-fade-in delay-600" : "opacity-0",
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <CornerDownLeft size={14} className="text-gold/30 shrink-0" strokeWidth={1.5} />
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Workflow() {
  const ref     = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="workflow"
      ref={ref}
      aria-labelledby="workflow-heading"
      className="section-pad bg-navy relative overflow-hidden"
    >
      {/* Subtle dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.18] pointer-events-none" aria-hidden="true" />
      {/* Gold gradient accent — top edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px]
                      bg-gradient-to-r from-transparent via-gold/30 to-transparent"
           aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Process
          </p>
          <h2
            id="workflow-heading"
            className="font-display font-extrabold text-white
                       text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]"
          >
            Document Control Workflow
          </h2>
          <p className="mt-3 text-[0.9375rem] text-white/45 max-w-[520px] leading-relaxed">
            A structured end-to-end process applied across EPC projects —
            from initial receipt through controlled distribution and final archiving.
          </p>
        </div>

        {/* ── Desktop flow (lg+) ─────────────────────────────────────── */}
        <div className="hidden lg:block space-y-3">
          {/* Row 1: steps 1–5 */}
          <div className="flex items-stretch gap-2">
            {ROW1.map((step, i) => (
              <React.Fragment key={step.n}>
                <StepCard step={step} visible={visible} delay={i * 80} />
                {i < 4 && <StepArrow visible={visible} delay={i * 80 + 60} />}
              </React.Fragment>
            ))}
          </div>

          {/* Row connector */}
          <RowConnector visible={visible} />

          {/* Row 2: steps 6–10 */}
          <div className="flex items-stretch gap-2">
            {ROW2.map((step, i) => (
              <React.Fragment key={step.n}>
                <StepCard step={step} visible={visible} delay={400 + i * 80} />
                {i < 4 && <StepArrow visible={visible} delay={400 + i * 80 + 60} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Mobile / tablet flow (< lg) ────────────────────────────── */}
        <ol className="lg:hidden relative pl-8 space-y-0">
          {/* Vertical line */}
          <div
            className="absolute left-[11px] top-3 bottom-0 w-[1px]
                       bg-gradient-to-b from-gold/40 via-gold/15 to-transparent"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.n}
                className={[
                  "relative pb-6 last:pb-0",
                  visible ? "animate-fade-up" : "opacity-0",
                ].join(" ")}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-8 top-1 w-[22px] h-[22px] rounded-full
                             border-2 border-gold/50 bg-navy flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-[8px] font-bold text-gold/70">{step.n}</span>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-white/10
                                bg-white/[0.04] p-4">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center
                                  justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-white/60" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white/85 mb-1">{step.title}</p>
                    <p className="text-[11.5px] leading-[1.65] text-white/45">{step.desc}</p>
                    <span className="inline-block mt-2 text-[9px] font-semibold uppercase
                                     tracking-[0.18em] text-gold/50">
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
