import Link from "next/link";
import { Mail, FileDown } from "lucide-react";
import { person, nav } from "../data/content";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-navy text-white/70"
    >
      {/* Top border accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-full bg-gold flex items-center justify-center
                           text-navy text-[13px] font-bold shrink-0"
              >
                ZH
              </span>
              <span className="text-white font-display font-bold text-[15px] tracking-tight">
                {person.nameShort}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-[220px]">
              {person.title} · {person.subtitle}
            </p>
            <p className="text-[12px] text-white/40">{person.location}</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] hover:text-gold transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-4">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-2.5 text-[13px] hover:text-gold transition-colors duration-150"
              >
                <Mail size={14} strokeWidth={1.75} className="shrink-0" />
                {person.email}
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[13px] hover:text-gold transition-colors duration-150"
              >
                <LinkedinIcon size={14} />
                LinkedIn Profile
              </a>
              <a
                href={person.cvPath}
                download
                className="flex items-center gap-2.5 text-[13px] hover:text-gold transition-colors duration-150"
              >
                <FileDown size={14} strokeWidth={1.75} className="shrink-0" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row
                        items-center justify-between gap-3 text-[12px] text-white/30">
          <p>© {year} {person.name}. All rights reserved.</p>
          <p>Project Document Controller · EPC & EDMS Specialist</p>
        </div>
      </div>
    </footer>
  );
}
