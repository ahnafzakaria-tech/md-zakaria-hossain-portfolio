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
      className="relative min-h-screen flex flex-col bg-cream overflow-hidden"
    >
      {/* Dot-grid background */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* Decorative navy shape — bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[480px] h-[480px] pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-navy rounded-tr-[160px] opacity-[0.04]" />
      </div>

      {/* Decorative gold ring — top-right */}
      <div
        className="absolute -top-16 -right-16 w-[360px] h-[360px] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full border-[40px] border-gold opacity-[0.07]"
        />
      </div>

      {/* Main grid — two columns on desktop */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10
                      flex flex-col lg:flex-row items-center
                      pt-28 pb-16 lg:pt-0 lg:min-h-screen gap-12 lg:gap-0">

        {/* ── Left: text content ──────────────────────────────── */}
        <div className="flex-1 lg:pr-16 flex flex-col justify-center">

          {/* Status badge */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 self-start
                       px-4 py-2 rounded-full bg-gold/10 border border-gold/30
                       text-[12px] font-semibold text-gold tracking-wide uppercase mb-6"
          >
            <CheckCircle2 size={12} strokeWidth={2.5} />
            Available — Open to opportunities
          </div>

          {/* Name */}
          <h1
            className="animate-fade-up delay-100 font-display font-extrabold text-navy
                       text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] leading-[1.08]
                       tracking-tight mb-3"
          >
            Md Zakaria
            <span className="block text-gold-gradient">Hossain</span>
          </h1>

          {/* Title */}
          <p
            className="animate-fade-up delay-200 text-[1.05rem] sm:text-[1.15rem]
                       font-semibold text-navy/80 mb-1 tracking-tight"
          >
            {person.title}
          </p>
          <p
            className="animate-fade-up delay-300 text-[0.95rem] text-muted mb-5
                       font-medium tracking-wide"
          >
            {person.subtitle}
          </p>

          {/* Location */}
          <div
            className="animate-fade-up delay-300 flex items-center gap-1.5
                       text-[13px] text-muted mb-6"
          >
            <MapPin size={13} strokeWidth={1.75} className="text-gold shrink-0" />
            <span>{person.location}</span>
            <span className="text-border-dark mx-1">·</span>
            <span>{person.openTo}</span>
          </div>

          {/* Headline */}
          <p
            className="animate-fade-up delay-400 text-[0.9375rem] leading-[1.75]
                       text-navy/65 max-w-[520px] mb-8"
          >
            {person.headline}
          </p>

          {/* EDMS badges */}
          <div className="animate-fade-up delay-500 flex flex-wrap gap-2 mb-8">
            {EDMS_BADGES.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 rounded-md bg-navy/[0.06] border border-navy/10
                           text-[12px] font-semibold text-navy/70 tracking-wide"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-600 flex flex-wrap items-center gap-3 mb-10">
            <a
              href={person.cvPath}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                         bg-navy text-white text-[14px] font-semibold tracking-wide
                         hover:bg-navy-light transition-colors duration-200
                         shadow-[0_4px_20px_rgba(11,22,40,0.20)]"
            >
              <FileDown size={15} strokeWidth={2} />
              Download CV
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                         border border-navy/25 text-navy text-[14px] font-semibold tracking-wide
                         hover:bg-navy hover:text-white hover:border-navy
                         transition-all duration-200"
            >
              Get in Touch
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="animate-fade-up delay-700 grid grid-cols-2 sm:grid-cols-4
                       gap-px bg-border rounded-xl overflow-hidden
                       border border-border"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface px-4 py-4 flex flex-col items-center text-center"
              >
                <span className="font-display font-extrabold text-[1.6rem] text-navy leading-none">
                  {stat.value}
                  <span className="text-gold text-[1rem] ml-0.5">{stat.suffix}</span>
                </span>
                <span className="text-[11px] text-muted mt-1 font-medium tracking-wide leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: profile photo ─────────────────────────────── */}
        <div
          className="animate-slide-in-right delay-300 lg:w-[420px] xl:w-[460px]
                     flex-shrink-0 flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Gold accent ring */}
            <div
              className="absolute -inset-3 rounded-2xl border-2 border-gold/25
                         rotate-3 pointer-events-none"
              aria-hidden="true"
            />
            {/* Navy shadow block */}
            <div
              className="absolute inset-0 rounded-2xl bg-navy translate-x-3 translate-y-3
                         pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Photo container */}
            <div
              className="relative w-[300px] sm:w-[340px] lg:w-[380px] xl:w-[400px]
                         aspect-[3/4] rounded-2xl overflow-hidden bg-navy/10"
            >
              <Image
                src={person.profilePhoto}
                alt={`${person.name} — ${person.title}`}
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 400px"
                className="object-cover object-top"
              />

              {/* Subtle gradient overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24
                           bg-gradient-to-t from-navy/30 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Floating role badge */}
            <div
              className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3
                         shadow-[0_8px_32px_rgba(11,22,40,0.15)]
                         border border-border flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-gold" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-navy tracking-wide leading-none mb-0.5">
                  Document Controller
                </p>
                <p className="text-[10px] text-muted leading-none">
                  EPC · EDMS · Compliance
                </p>
              </div>
            </div>

            {/* Floating location badge */}
            <div
              className="absolute -top-4 -right-4 bg-navy rounded-xl px-4 py-2.5
                         shadow-[0_8px_32px_rgba(11,22,40,0.25)]
                         flex items-center gap-2"
            >
              <MapPin size={12} className="text-gold shrink-0" strokeWidth={2} />
              <p className="text-[11px] font-medium text-white/90">Riyadh, KSA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 opacity-40
                   animate-fade-in delay-800"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}
