"use client";

import { testimonial } from "../data/content";
import { useReveal } from "../hooks/useReveal";

export default function Testimonial() {
  const [ref, vis] = useReveal(0.15);

  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section
      id="testimonial"
      ref={ref}
      aria-labelledby="testimonial-heading"
      className="section-pad bg-[#040C18] relative overflow-hidden"
    >
      {/* Very subtle background dot grid */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-10">
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

        {/* Cinematic quote container — max-width for editorial legibility */}
        <div
          className={`rv rv-up-lg rv-slow ${vis ? "in" : ""} max-w-3xl`}
          style={{ transitionDelay: "160ms" }}
        >
          <div className="relative rounded-2xl overflow-hidden glass-subtle">

            {/* Left accent bar — gold */}
            <div
              className="absolute top-0 left-0 w-[3px] h-full
                         bg-gradient-to-b from-gold/60 via-gold/25 to-transparent"
              aria-hidden="true"
            />

            <div className="pl-10 pr-8 pt-10 pb-8 lg:pl-14 lg:pr-12 lg:pt-12 lg:pb-10">

              {/* Decorative quote mark — positioned behind text */}
              <div
                className={`rv rv-blur ${vis ? "in" : ""} pointer-events-none select-none
                            font-display font-black text-[9rem] leading-[0.75]
                            text-gold/[0.07] -mt-2 mb-2`}
                style={{ transitionDelay: "220ms" }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Quote text */}
              <blockquote
                className={`rv rv-up ${vis ? "in" : ""} -mt-10 text-[1.05rem] sm:text-[1.125rem]
                            leading-[1.9] text-white/65`}
                style={{ transitionDelay: "280ms" }}
              >
                {testimonial.quote}
              </blockquote>

              {/* Separator */}
              <div
                className={`rv rv-fade ${vis ? "in" : ""} my-7 h-[1px]
                            bg-gradient-to-r from-gold/20 via-white/[0.08] to-transparent`}
                style={{ transitionDelay: "360ms" }}
                aria-hidden="true"
              />

              {/* Attribution */}
              <footer
                className={`rv rv-up ${vis ? "in" : ""} flex items-center gap-4`}
                style={{ transitionDelay: "420ms" }}
              >
                {/* Initials avatar */}
                <div
                  className="w-11 h-11 rounded-md bg-gold/[0.10] border border-gold/[0.22]
                             flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-[12px] font-bold text-gold/90 tracking-wide">
                    {initials}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="font-display font-bold text-white/92 text-[0.9375rem] tracking-tight leading-snug">
                    {testimonial.name}
                  </p>
                  <p className="text-[12.5px] text-white/38 leading-snug mt-0.5">
                    {testimonial.role}
                    <span className="mx-1.5 text-white/20" aria-hidden="true">·</span>
                    {testimonial.company}
                  </p>
                </div>
              </footer>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
