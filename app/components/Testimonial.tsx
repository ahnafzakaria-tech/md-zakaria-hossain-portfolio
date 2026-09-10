import { testimonial } from "../data/content";

export default function Testimonial() {
  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-heading"
      className="section-pad bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section label */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Testimonial
          </p>
          <h2
            id="testimonial-heading"
            className="font-display font-extrabold text-navy
                       text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]"
          >
            Professional Reference
          </h2>
        </div>

        {/* Card */}
        <div
          className="relative max-w-3xl rounded-2xl border border-border bg-surface
                     shadow-[0_4px_32px_rgba(11,22,40,0.07)] overflow-hidden"
        >
          {/* Gold top accent */}
          <div className="h-[3px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="p-8 lg:p-12">

            {/* Large quote mark */}
            <div
              className="font-display font-extrabold text-[5rem] leading-none text-gold/15
                         select-none mb-4 -mt-2"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote
              cite={undefined}
              className="text-[1.0625rem] leading-[1.85] text-navy/70 mb-8 -mt-6"
            >
              {testimonial.quote}
            </blockquote>

            {/* Attribution */}
            <footer className="flex items-center gap-4 pt-6 border-t border-border">
              {/* Monogram avatar */}
              <div
                className="w-11 h-11 rounded-full bg-navy flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <span className="text-[13px] font-bold text-white tracking-wide">
                  {testimonial.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              <div className="min-w-0">
                <p className="font-display font-bold text-navy text-[0.9375rem] tracking-tight">
                  {testimonial.name}
                </p>
                <p className="text-[12.5px] text-muted leading-snug mt-0.5">
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
