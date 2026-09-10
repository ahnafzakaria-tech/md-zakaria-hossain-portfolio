"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, FileDown } from "lucide-react";
import { person, nav } from "../data/content";
import { useReveal } from "../hooks/useReveal";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [ref, vis] = useReveal(0.15);

  const whatsapp    = (person as typeof person & { whatsapp: string }).whatsapp;
  const whatsappUrl = (person as typeof person & { whatsappUrl: string }).whatsappUrl;

  return (
    <footer
      id="footer"
      role="contentinfo"
      ref={ref}
      className="bg-navy text-white/65"
    >
      {/* Top border accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Identity */}
          <div
            className={`rv rv-up ${vis ? "in" : ""} space-y-3`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold/20 shrink-0">
                <Image
                  src={person.profilePhoto}
                  alt={person.nameShort}
                  width={36}
                  height={36}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <span className="text-white font-display font-bold text-[15px] tracking-tight">
                {person.nameShort}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-[220px] text-white/55">
              {person.title} · {person.subtitle}
            </p>
            <p className="text-[12px] text-white/35">{person.location}</p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className={`rv rv-up ${vis ? "in" : ""} space-y-3`}
            style={{ transitionDelay: "80ms" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/55 hover:text-gold transition-colors duration-150
                               relative inline-block after:absolute after:bottom-0 after:left-0
                               after:h-[1px] after:w-0 after:bg-gold after:transition-all
                               after:duration-200 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div
            className={`rv rv-up ${vis ? "in" : ""} space-y-3`}
            style={{ transitionDelay: "160ms" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-gold transition-colors duration-150"
              >
                <Mail size={14} strokeWidth={1.75} className="shrink-0" />
                {person.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-gold transition-colors duration-150"
              >
                <WhatsAppIcon size={14} />
                {whatsapp}
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-gold transition-colors duration-150"
              >
                <LinkedinIcon size={14} />
                LinkedIn Profile
              </a>
              <a
                href={person.cvPath}
                download
                className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-gold transition-colors duration-150"
              >
                <FileDown size={14} strokeWidth={1.75} className="shrink-0" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`rv rv-up ${vis ? "in" : ""} mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/25`}
          style={{ transitionDelay: "240ms" }}
        >
          <p>© {year} {person.name}. All rights reserved.</p>
          <p>Project Document Controller · EPC & EDMS Specialist</p>
        </div>
      </div>
    </footer>
  );
}
