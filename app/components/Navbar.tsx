"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, FileDown } from "lucide-react";
import { person, nav } from "../data/content";

export default function Navbar() {
  const [open,          setOpen]          = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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

  const close = () => setOpen(false);

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0B1628]/96 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
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
          <div
            className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold/25 shrink-0
                       group-hover:ring-gold/55 transition-all duration-200"
          >
            <Image
              src={person.profilePhoto}
              alt={person.nameShort}
              width={36}
              height={36}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <span
            className="hidden sm:block font-display font-bold text-[15px] tracking-tight
                       text-white/90 group-hover:text-white transition-colors duration-200"
          >
            {person.nameShort}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const isActive = item.href === `#${activeSection}`;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative px-4 py-2 rounded-md text-[13px] font-medium tracking-wide",
                  "transition-colors duration-200",
                  isActive
                    ? "text-white"
                    : "text-white/55 hover:text-white/90 hover:bg-white/[0.07]",
                ].join(" ")}
              >
                {item.label}
                <span
                  className={[
                    "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gold",
                    "transition-all duration-300",
                    isActive ? "w-[18px] opacity-100" : "w-0 opacity-0",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={person.cvPath}
            download
            className="group flex items-center gap-2 px-4 py-2 rounded-md border text-[13px]
                       font-medium transition-all duration-200
                       border-gold/50 text-gold hover:bg-gold hover:text-[#040C18] hover:border-gold
                       btn-press"
          >
            <FileDown
              size={14}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
            Download CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden p-2 rounded-md text-white/70 hover:text-white
                     hover:bg-white/[0.07] transition-colors duration-150"
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
          "bg-[#0B1628]/97 backdrop-blur-md",
        ].join(" ")}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-4 gap-1">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="px-4 py-3 rounded-md text-white/75 hover:text-white
                         hover:bg-white/[0.07] text-[15px] font-medium
                         transition-all duration-200"
              style={{
                opacity:   open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.08]">
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
