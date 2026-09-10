"use client";

import { testimonial } from "../data/content";
import { useReveal } from "../hooks/useReveal";

export default function Testimonial() {
  const [ref, vis] = useReveal(0.15);

  return (
    <section
      id="testimonial"
      ref={ref}
      aria-labelledby="testimonial-heading"
      className="section-pad bg-[#040C18]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-12">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Testimonial
          </p>
          <h2
            id="testimonial-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Professional Reference
          </h2>
        </div>

        <div
          className={`rv rv-scale ${vis ? "in" : ""} relative max-w-3xl rounded-2xl border border-white/[0.08]
                      bg-white/[0.03] shadow-[0_4px_40px_rgba(0,0,0,0.3)] overflow-hidden`}
          style={{ transitionDelay: "160ms" }}
        >
          {/* Gold top accent */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="p-8 lg:p-12">

            {/* Opening quote mark */}
            <div
              className={`rv rv-fade ${vis ? "in" : ""} font-display font-extrabold text-[6rem] leading-none
                          text-gold/[0.08] select-none -mt-2 mb-3`}
              style={{ transitionDelay: "240ms" }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote
              className={`rv rv-up ${vis ? "in" : ""} text-[1.0625rem] sm:text-[1.125rem] leading-[1.9]
                          text-white/65 mb-8 -mt-8`}
              style={{ transitionDelay: "300ms" }}
            >
              {testimonial.quote}
            </blockquote>

            {/* Attribution */}
            <footer
              className={`rv rv-up ${vis ? "in" : ""} flex items-center gap-4 pt-6 border-t border-white/[0.08]`}
              style={{ transitionDelay: "400ms" }}
            >
              <div
                className="w-11 h-11 rounded-full bg-gold/15 border border-gold/25 flex items-center
                           justify-center shrink-0"
                aria-hidden="true"
              >
                <span className="text-[12px] font-bold text-gold tracking-wide">
                  {testimonial.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-white/90 text-[0.9375rem] tracking-tight">
                  {testimonial.name}
                </p>
                <p className="text-[12.5px] text-white/40 leading-snug mt-0.5">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </footer>
          </div>
        </div>

      </div>
    </section>
  );
}
