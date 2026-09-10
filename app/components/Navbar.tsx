"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown } from "lucide-react";
import { person, nav } from "../data/content";

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">

        {/* Logo / Name */}
        <Link
          href="#hero"
          onClick={close}
          aria-label="Back to top"
          className="flex items-center gap-3 group"
        >
          <span
            className="w-9 h-9 rounded-full bg-gold flex items-center justify-center
                       text-navy text-[13px] font-bold tracking-wider shrink-0
                       group-hover:scale-105 transition-transform duration-200"
          >
            ZH
          </span>
          <span
            className={[
              "font-display font-bold text-[15px] tracking-tight transition-colors duration-200 hidden sm:block",
              scrolled ? "text-white" : "text-navy",
            ].join(" ")}
          >
            {person.nameShort}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "px-4 py-2 rounded-md text-[13px] font-medium tracking-wide transition-colors duration-150",
                scrolled
                  ? "text-white/75 hover:text-white hover:bg-white/10"
                  : "text-navy/70 hover:text-navy hover:bg-navy/[0.06]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={person.cvPath}
            download
            className="flex items-center gap-2 px-4 py-2 rounded-md border text-[13px] font-medium
                       transition-all duration-150
                       border-gold text-gold hover:bg-gold hover:text-navy"
          >
            <FileDown size={14} strokeWidth={2} />
            Download CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={[
            "lg:hidden p-2 rounded-md transition-colors duration-150",
            scrolled ? "text-white hover:bg-white/10" : "text-navy hover:bg-navy/[0.06]",
          ].join(" ")}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className={[
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
          "bg-navy/97 backdrop-blur-md",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col px-6 py-4 gap-1"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="px-4 py-3 rounded-md text-white/80 hover:text-white hover:bg-white/10
                         text-[15px] font-medium transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/10">
            <a
              href={person.cvPath}
              download
              onClick={close}
              className="flex items-center gap-2 px-4 py-3 rounded-md text-gold
                         hover:bg-gold/10 text-[15px] font-medium transition-colors duration-150"
            >
              <FileDown size={16} strokeWidth={2} />
              Download CV
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
