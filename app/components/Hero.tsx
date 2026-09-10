"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, FileDown, ArrowRight, CheckCircle2 } from "lucide-react";
import { person, stats } from "../data/content";

const EDMS_BADGES = ["Thinkproject", "Aconex", "S-PMIS"];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col bg-[#040C18] overflow-hidden"
    >
      {/* ── Animated grid background ─────────────────────────── */}
      <div
        className="absolute inset-0 bg-grid-animate opacity-100 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient glow — right side where photo is */}
      <div
        className="absolute top-1/2 right-[8%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 65%)",
          animation: "glow-drift 12s ease-in-out infinite",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* Secondary glow — left side */}
      <div
        className="absolute top-[30%] left-[5%] w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(11,22,40,0.9) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top gold accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]
                   bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      {/* ── Content grid ────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10
                   flex flex-col lg:flex-row items-center
                   pt-28 pb-16 lg:pt-0 lg:min-h-screen gap-10 lg:gap-14"
      >
        {/* ── Left: text ────────────────────────────────────── */}
        <div className="flex-1 lg:max-w-[580px] flex flex-col justify-center">

          {/* Availability badge */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 self-start
                       px-4 py-2 rounded-full bg-gold/[0.08] border border-gold/20
                       text-[11.5px] font-semibold text-gold tracking-[0.14em] uppercase mb-7"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"
              aria-hidden="true"
            />
            Available — Open to Opportunities
          </div>

          {/* Name — cinematic reveal */}
          <h1 className="mb-4 leading-[1.04]">
            <span
              className="animate-name-reveal delay-200 block font-display font-extrabold
                         text-white/95 text-[3rem] sm:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem]
                         tracking-tight"
            >
              Md. Zakaria
            </span>
            <span
              className="animate-name-reveal delay-350 block font-display font-extrabold
                         text-gold-gradient text-[3rem] sm:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem]
                         tracking-tight"
            >
              Hossain
            </span>
          </h1>

          {/* Title + descriptors */}
          <p
            className="animate-fade-up delay-500 font-bold text-white/80 mb-2
                       text-[1.05rem] sm:text-[1.15rem] tracking-tight"
          >
            {person.title}
          </p>

          <div className="animate-fade-up delay-550 flex flex-wrap items-center gap-x-0 mb-5">
            {["EPC Documentation", "EDMS Administration", "Document Compliance"].map((tag, i) => (
              <span key={tag} className="flex items-center">
                {i > 0 && (
                  <span className="mx-2 text-white/20" aria-hidden="true">·</span>
                )}
                <span className="text-[12px] font-semibold text-white/45 tracking-[0.09em]">
                  {tag}
                </span>
              </span>
            ))}
          </div>

          {/* Location */}
          <div
            className="animate-fade-up delay-600 flex items-center gap-1.5
                       text-[13px] text-white/50 mb-6"
          >
            <MapPin size={12} strokeWidth={1.75} className="text-gold shrink-0" />
            <span>{person.location}</span>
            <span className="text-white/20 mx-1" aria-hidden="true">·</span>
            <span>{person.openTo}</span>
          </div>

          {/* Headline */}
          <p
            className="animate-fade-up delay-650 text-[0.9375rem] leading-[1.8]
                       text-white/55 max-w-[500px] mb-8"
          >
            {person.headline}
          </p>

          {/* EDMS system badges */}
          <div className="animate-fade-up delay-700 flex flex-wrap gap-2 mb-9">
            {EDMS_BADGES.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.10]
                           text-[11.5px] font-semibold text-white/55 tracking-wide"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-800 flex flex-wrap items-center gap-3 mb-10">
            <Link
              href="#experience"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md
                         bg-[#C9A84C] text-[#040C18] text-[14px] font-bold tracking-wide
                         hover:bg-[#DDB96A] transition-all duration-200
                         shadow-[0_4px_24px_rgba(201,168,76,0.22)]
                         hover:shadow-[0_6px_32px_rgba(201,168,76,0.35)]
                         btn-press"
            >
              View My Experience
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={person.cvPath}
              download
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-md
                         border border-white/[0.14] text-white/80 text-[14px] font-semibold
                         hover:bg-white/[0.06] hover:border-white/25 hover:text-white
                         transition-all duration-200 btn-press"
            >
              <FileDown size={14} strokeWidth={2} className="text-gold transition-transform duration-200 group-hover:-translate-y-0.5" />
              Download CV
            </a>
            <Link
              href="#contact"
              className="text-[14px] font-semibold text-white/40 hover:text-gold
                         transition-colors duration-150 underline underline-offset-4 decoration-white/20
                         hover:decoration-gold/50"
            >
              Contact Me
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="animate-fade-up delay-900 grid grid-cols-2 sm:grid-cols-4
                       divide-x divide-white/[0.07] border border-white/[0.07]
                       rounded-xl overflow-hidden bg-white/[0.03]"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-4 flex flex-col items-center text-center"
              >
                <span className="font-display font-extrabold text-[1.6rem] text-white/90 leading-none">
                  {stat.value}
                  <span className="text-gold text-[0.9rem] ml-0.5">{stat.suffix}</span>
                </span>
                <span className="text-[11px] text-white/40 mt-1.5 font-medium tracking-wide leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: photo ──────────────────────────────────── */}
        <div
          className="animate-fade-up delay-300 lg:w-[400px] xl:w-[440px]
                     flex-shrink-0 flex justify-center lg:justify-end"
        >
          <div className="relative">

            {/* Engineering corner — top right (gold) */}
            <div
              className="absolute -top-3 -right-3 w-14 h-14 pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute top-0 right-0 w-full h-[2px] bg-gold/50" />
              <div className="absolute top-0 right-0 w-[2px] h-full bg-gold/50" />
            </div>

            {/* Engineering corner — bottom left */}
            <div
              className="absolute -bottom-3 -left-3 w-14 h-14 pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10" />
              <div className="absolute bottom-0 left-0 w-[2px] h-full bg-white/10" />
            </div>

            {/* Shadow offset block */}
            <div
              className="absolute inset-0 rounded-2xl bg-gold/15 translate-x-4 translate-y-4
                         -z-10 pointer-events-none blur-md"
              aria-hidden="true"
            />

            {/* Photo container — clip-path unveil */}
            <div
              className="animate-photo-unveil delay-450 relative
                         w-[280px] sm:w-[320px] lg:w-[360px] xl:w-[390px]
                         aspect-[3/4] rounded-2xl overflow-hidden bg-navy"
            >
              <Image
                src={person.profilePhoto}
                alt={`${person.name} — ${person.title}`}
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 390px"
                className="object-cover object-top"
              />
              {/* Gradient at bottom for text readability */}
              <div
                className="absolute bottom-0 inset-x-0 h-32
                           bg-gradient-to-t from-[#0B1628]/80 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Floating role badge — bottom left */}
            <div className="animate-badge-pop delay-950 absolute -bottom-4 -left-5">
              <div
                className="animate-float bg-[#0B1628] border border-white/[0.10] rounded-xl px-4 py-3
                           shadow-[0_8px_32px_rgba(0,0,0,0.45)]
                           flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center shrink-0"
                >
                  <CheckCircle2 size={15} className="text-gold" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white/90 tracking-wide leading-none mb-0.5">
                    Document Controller
                  </p>
                  <p className="text-[10px] text-white/45 leading-none">EPC · EDMS · Compliance</p>
                </div>
              </div>
            </div>

            {/* Floating location badge — top right */}
            <div className="animate-badge-pop delay-1000 absolute -top-4 -right-5">
              <div
                className="animate-float-alt bg-[#0B1628] border border-white/[0.10] rounded-xl px-4 py-2.5
                           shadow-[0_8px_32px_rgba(0,0,0,0.45)]
                           flex items-center gap-2"
              >
                <MapPin size={11} className="text-gold shrink-0" strokeWidth={2} />
                <p className="text-[11px] font-medium text-white/85">Riyadh, KSA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2
                   animate-fade-in delay-1200"
        style={{ opacity: 0.4 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold tracking-widest text-white/50">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
