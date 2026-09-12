"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox, ScanLine, FileStack, ClipboardList, Database,
  ScrollText, GitBranch, RefreshCw, Send, Archive,
  ArrowRight, CornerDownLeft, ChevronDown,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { useDisclosure } from "../hooks/useDisclosure";

const STEPS = [
  { n: 1, phase: "Intake",       icon: Inbox,         title: "Document Received",      desc: "Incoming document from engineer, vendor, or subcontractor" },
  { n: 2, phase: "Intake",       icon: ScanLine,      title: "Validation Check",       desc: "Verify format, metadata, document type, and numbering compliance" },
  { n: 3, phase: "Registration", icon: FileStack,      title: "Registration & Coding",  desc: "Assign document number, classify by discipline, register in EDMS" },
  { n: 4, phase: "Review",       icon: ClipboardList,  title: "Internal Review",        desc: "Route to discipline engineer for technical review and comment" },
  { n: 5, phase: "EDMS",         icon: Database,       title: "EDMS / PMIS Upload",     desc: "Submit via Thinkproject or S-PMIS, initiate formal approval workflow" },
  { n: 6, phase: "Approval",     icon: ScrollText,     title: "Owner / Client Review",  desc: "Transmit to Owner or Consultant for formal review and approval" },
  { n: 7, phase: "Approval",     icon: GitBranch,      title: "Comment Processing",     desc: "Log reviewer comments, coordinate revision with document originator" },
  { n: 8, phase: "Revision",     icon: RefreshCw,      title: "Revision & Resubmission", desc: "Updated document revised and resubmitted through approval workflow" },
  { n: 9, phase: "Distribution", icon: Send,           title: "Controlled Distribution", desc: "Issue approved document to all relevant teams via controlled transmittal" },
  { n: 10, phase: "Closeout",    icon: Archive,        title: "Archiving & Closeout",   desc: "Update document register, archive superseded revisions, maintain audit trail" },
] as const;

const ROW1 = STEPS.slice(0, 5);
const ROW2 = STEPS.slice(5);

const PHASE_GOLD = new Set(["EDMS", "Approval", "Distribution"]);

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
  const { isOpen, triggerProps, bodyProps } = useDisclosure();

  useEffect(() => {
    const t = setTimeout(() => setActive(vis), vis ? delay + 60 : 0);
    return () => clearTimeout(t);
  }, [vis, delay]);

  const Icon = step.icon;
  const isKeyPhase = PHASE_GOLD.has(step.phase);

  return (
    <div
      className={[
        "rv rv-up flex-1 min-w-0 rounded-xl border p-4 flex flex-col gap-2 cursor-pointer",
        "disclosure-card transition-all duration-500 ease-[var(--ease-spring)]",
        active
          ? isKeyPhase
            ? "border-gold/35 bg-gold/[0.05] shadow-[0_0_20px_rgba(201,168,76,0.05)]"
            : "border-[var(--glass-border-base)] bg-[var(--glass-bg-elevated)]"
          : `${isKeyPhase ? "border-gold/25" : "border-[var(--glass-border-dim)]"} bg-[var(--glass-bg-subtle)]`,
        vis ? "in" : "",
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
      data-open={isOpen}
      {...triggerProps}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-display font-extrabold text-[1.5rem] leading-none
                      transition-colors duration-500
                      ${active ? "text-gold/55" : "text-gold/25"}`}
        >
          {String(step.n).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
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
          <div className="disclosure-chevron w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center">
            <ChevronDown size={10} strokeWidth={2} className="text-white/30" />
          </div>
        </div>
      </div>

      <p
        className={`text-[12px] font-bold leading-snug transition-colors duration-500
                    ${active ? "text-white/95" : "text-white/75"}`}
      >
        {step.title}
      </p>

      <span
        className={`self-start text-[9.5px] font-semibold uppercase tracking-[0.18em]
                    transition-colors duration-500
                    ${active && isKeyPhase ? "text-gold/70" : "text-gold/40"}`}
      >
        {step.phase}
      </span>

      <div className="disclosure-body" {...bodyProps}>
        <div>
          <p className="disclosure-item text-[11px] leading-[1.6] text-white/45 pt-2 border-t border-white/[0.06]"
             style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}>
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

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

function MobileStepCard({ step, vis, delay }: {
  step: (typeof STEPS)[number];
  vis: boolean;
  delay: number;
}) {
  const { isOpen, triggerProps, bodyProps } = useDisclosure();
  const Icon = step.icon;
  const isKeyPhase = PHASE_GOLD.has(step.phase);

  return (
    <li
      className={`rv rv-up ${vis ? "in" : ""} relative pb-6 last:pb-0`}
      style={{ transitionDelay: `${delay}ms` }}
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

      <div
        className="disclosure-card flex items-start gap-3 rounded-xl glass-subtle
                   p-4 cursor-pointer transition-all duration-200"
        data-open={isOpen}
        {...triggerProps}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5
                         ${isKeyPhase ? "bg-gold/10" : "bg-white/[0.06]"}`}>
          <Icon
            size={14}
            strokeWidth={1.75}
            className={isKeyPhase ? "text-gold/65" : "text-white/50"}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-bold text-white/85">{step.title}</p>
            <div className="disclosure-chevron w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
              <ChevronDown size={10} strokeWidth={2} className="text-white/30" />
            </div>
          </div>
          <span className="inline-block mt-1 text-[9px] font-semibold uppercase
                           tracking-[0.18em] text-gold/40">
            {step.phase}
          </span>
          <div className="disclosure-body" {...bodyProps}>
            <div>
              <p className="disclosure-item text-[11.5px] leading-[1.65] text-white/38 pt-2"
                 style={{ transitionDelay: isOpen ? "80ms" : "0ms" }}>
                {step.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Workflow() {
  const [ref, vis] = useReveal(0.1);

  return (
    <section
      id="workflow"
      ref={ref}
      aria-labelledby="workflow-heading"
      className="section-pad bg-navy relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.12] pointer-events-none"
        aria-hidden="true"
      />
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

        {/* Desktop */}
        <div className="hidden lg:block space-y-3">
          <StepRow steps={ROW1} vis={vis} baseDelay={200} />
          <RowConnector vis={vis} />
          <StepRow steps={ROW2} vis={vis} baseDelay={540} />
        </div>

        {/* Mobile */}
        <ol className="lg:hidden relative pl-8 space-y-0">
          <div
            className="absolute left-[11px] top-3 bottom-0 w-[1px]
                       bg-gradient-to-b from-gold/40 via-gold/10 to-transparent
                       origin-top transition-transform duration-[1.2s] ease-[var(--ease-spring)]"
            style={{ transform: vis ? "scaleY(1)" : "scaleY(0)" }}
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <MobileStepCard key={step.n} step={step} vis={vis} delay={180 + i * 55} />
          ))}
        </ol>
      </div>
    </section>
  );
}
