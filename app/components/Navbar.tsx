"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileDown } from "lucide-react";
import { person, nav } from "../data/content";

const QUICK_NAV = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Expertise",  href: "#expertise" },
  { label: "Contact",    href: "#contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id], footer[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-72px 0px 0px 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const photoSize = scrolled ? 30 : 34;

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "navbar-glass"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-[72px] flex items-center">

        {/* ── LEFT SYSTEM: hamburger + photo + wordmark ── */}
        <div className="flex items-center gap-0">

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative w-10 h-10 flex items-center justify-center rounded-md
                       text-white/60 hover:text-white/90
                       transition-colors duration-200"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(-8px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.2s",
              transitionDelay: mounted ? "0s" : "0s",
            }}
          >
            <div className="w-[20px] h-[14px] relative">
              <span
                className={[
                  "absolute left-0 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open
                    ? "w-[20px] top-[6px] rotate-45"
                    : "w-[20px] top-0 rotate-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[6px] h-[1.5px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open
                    ? "w-0 opacity-0 translate-x-[-4px]"
                    : "w-[14px] opacity-100 translate-x-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open
                    ? "w-[20px] top-[6px] -rotate-45"
                    : "w-[17px] top-[12px] rotate-0",
                ].join(" ")}
              />
            </div>
          </button>

          {/* Divider */}
          <div
            className="w-[1px] h-5 bg-white/[0.08] mx-3 sm:mx-4 shrink-0"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.6s ease",
              transitionDelay: "0.2s",
            }}
            aria-hidden="true"
          />

          {/* Branding: photo + wordmark */}
          <Link
            href="#hero"
            onClick={close}
            aria-label="Back to top"
            className="flex items-center gap-3 sm:gap-3.5 group"
          >
            {/* Circular photo */}
            <div
              className="relative shrink-0"
              style={{
                opacity: mounted ? 1 : 0,
                clipPath: mounted ? "circle(50% at 50% 50%)" : "circle(0% at 50% 50%)",
                transform: mounted ? "scale(1)" : "scale(1.1)",
                transition: "clip-path 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
                transitionDelay: "0.1s",
              }}
            >
              <div
                className="overflow-hidden rounded-full
                           ring-[1px] ring-white/[0.12] group-hover:ring-white/[0.22]
                           transition-all duration-300 shrink-0"
                style={{
                  width: photoSize,
                  height: photoSize,
                  transition: "width 0.5s cubic-bezier(0.16,1,0.3,1), height 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
                }}
              >
                <Image
                  src={person.profilePhoto}
                  alt={person.nameShort}
                  width={40}
                  height={40}
                  className="object-cover object-top w-full h-full
                             group-hover:scale-[1.04] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Wordmark + designation */}
            <div className="flex flex-col leading-none min-w-0">
              {/* Signature name */}
              <span
                className="font-display font-bold
                           text-[15px] sm:text-[16px]
                           text-[#EDE6D8]/[0.92]
                           group-hover:text-[#F0EAD6]
                           transition-colors duration-300
                           whitespace-nowrap"
                style={{
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(5px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), color 0.3s",
                  transitionDelay: mounted ? "0.25s, 0.25s, 0s" : "0s",
                }}
              >
                {person.nameShort}
              </span>

              {/* Designation — single line with dot */}
              <span
                className="hidden sm:block text-[9.5px] font-medium
                           text-white/[0.28]
                           tracking-[0.04em] mt-[5px]
                           group-hover:text-white/[0.4]
                           transition-colors duration-300
                           whitespace-nowrap"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), color 0.3s",
                  transitionDelay: mounted ? "0.4s, 0.4s, 0s" : "0s",
                }}
              >
                {person.title} · {person.subtitle}
              </span>
            </div>
          </Link>
        </div>

        {/* ── RIGHT: quick navigation ── */}
        <nav
          aria-label="Quick navigation"
          className="hidden lg:flex items-center gap-1 ml-auto"
        >
          {QUICK_NAV.map((item, i) => {
            const isActive = item.href === `#${activeSection}`;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative px-3 lg:px-3.5 py-2 text-[11px] font-medium tracking-[0.06em]",
                  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive
                    ? "text-white/80"
                    : "text-white/30 hover:text-white/60",
                ].join(" ")}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(-4px)",
                  transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), color 0.25s",
                  transitionDelay: mounted ? `${0.5 + i * 0.06}s, ${0.5 + i * 0.06}s, 0s` : "0s",
                }}
              >
                {item.label}
                <span
                  className={[
                    "absolute left-1/2 -translate-x-1/2 bottom-[2px] rounded-full bg-gold/70",
                    "transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "w-[3px] h-[3px] opacity-100"
                      : "w-[3px] h-[3px] opacity-0 scale-0",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Full-screen navigation drawer ── */}
      <div
        className={[
          "fixed inset-0 top-[72px] z-40 transition-all duration-300",
          open ? "visible" : "invisible pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className={[
            "absolute inset-0 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            background: "rgba(4, 12, 24, 0.92)",
            backdropFilter: "blur(32px) saturate(1.2)",
            WebkitBackdropFilter: "blur(32px) saturate(1.2)",
          }}
          onClick={close}
          aria-hidden="true"
        />

        {/* Nav content */}
        <nav
          aria-label="Primary navigation"
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-10 flex flex-col"
        >
          {nav.map((item, i) => {
            const isActive = item.href === `#${activeSection}`;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={[
                  "block py-3.5 px-4 -mx-4 rounded-lg border-b border-white/[0.05]",
                  "text-[1.1rem] sm:text-[1.25rem] font-medium tracking-wide",
                  "transition-all duration-200",
                  isActive
                    ? "text-white bg-white/[0.04]"
                    : "text-white/45 hover:text-white/85 hover:bg-white/[0.04]",
                ].join(" ")}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1), color 0.15s",
                  transitionDelay: open ? `${i * 50 + 60}ms` : "0ms",
                }}
              >
                <span className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                  )}
                </span>
              </Link>
            );
          })}

          {/* CV download */}
          <div
            className="mt-8"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: open ? `${nav.length * 50 + 100}ms` : "0ms",
            }}
          >
            <a
              href={person.cvPath}
              download
              onClick={close}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-md
                         border border-gold/35 text-gold text-[14px] font-semibold
                         hover:bg-gold hover:text-[#040C18] hover:border-gold
                         transition-all duration-200 btn-press"
            >
              <FileDown
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
              Download CV
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
