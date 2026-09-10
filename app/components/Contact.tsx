"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Mail, Phone, MapPin, Send,
  CheckCircle, AlertCircle, Loader2,
} from "lucide-react";
import { person, formEndpoint } from "../data/content";

// ─── Inline LinkedIn icon (lucide v1.44 has no LinkedIn) ─────────────────────

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name:    string;
  email:   string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim() || f.name.trim().length < 2)
    e.name = "Please enter your full name (min 2 characters).";
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Please enter a valid email address.";
  if (!f.subject.trim())
    e.subject = "Subject is required.";
  if (!f.message.trim() || f.message.trim().length < 10)
    e.message = "Message must be at least 10 characters.";
  return e;
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  id, label, required = true, error, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12.5px] font-semibold text-navy/70 tracking-wide">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-[11.5px] text-red-500 font-medium">
          <AlertCircle size={11} strokeWidth={2} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const INPUT_BASE =
  "w-full px-4 py-3 rounded-lg border bg-cream text-navy text-[14px] " +
  "placeholder:text-navy/30 outline-none " +
  "transition-colors duration-150 ";

const INPUT_NORMAL = INPUT_BASE + "border-border focus:border-gold focus:ring-1 focus:ring-gold/20";
const INPUT_ERROR  = INPUT_BASE + "border-red-400 focus:border-red-400";

// ─── Contact info items ───────────────────────────────────────────────────────

const INFO_ITEMS = [
  {
    icon:  Mail,
    label: "Email",
    value: person.email,
    href:  `mailto:${person.email}`,
  },
  {
    icon:  Phone,
    label: "Phone (KSA)",
    value: person.phone,
    href:  `tel:${person.phone.replace(/\s/g, "")}`,
  },
  {
    icon:  LinkedinIcon as unknown as typeof Mail,
    label: "LinkedIn",
    value: "Md. Zakaria Hossain",
    href:  person.linkedin,
    external: true,
  },
  {
    icon:  MapPin,
    label: "Location",
    value: person.location,
    href:  null,
  },
] as const;

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form,    setForm]    = useState<FormState>(EMPTY);
  const [errors,  setErrors]  = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status,  setStatus]  = useState<Status>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name as keyof FormState]) {
      const errs = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name as keyof FormState] }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name as keyof FormState] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");

    // ── Formspree (if configured) ──────────────────────────────────────
    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
        });
        setStatus(res.ok ? "success" : "error");
        if (res.ok) setForm(EMPTY);
      } catch {
        setStatus("error");
      }
      return;
    }

    // ── Mailto fallback ────────────────────────────────────────────────
    const sub  = encodeURIComponent(`[Portfolio] ${form.subject}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nFrom: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${person.email}?subject=${sub}&body=${body}`;
    setStatus("success");
    setForm(EMPTY);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="font-display font-extrabold text-navy
                       text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]"
          >
            Get in Touch
          </h2>
          <p className="mt-3 text-[0.9375rem] text-navy/55 max-w-[480px] leading-relaxed">
            Available for EPC project opportunities, document control roles,
            and professional enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">

          {/* Left: contact info */}
          <aside aria-label="Contact information">
            <div className="space-y-3">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href, ...rest }) => {
                const external = "external" in rest ? rest.external : false;
                const inner = (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border
                                  bg-cream hover:border-gold/30 hover:bg-surface
                                  transition-all duration-150 group">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center
                                    justify-center shrink-0 group-hover:bg-gold/18
                                    transition-colors duration-150">
                      <Icon size={15} className="text-gold" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em]
                                    text-muted mb-0.5">
                        {label}
                      </p>
                      <p className="text-[13.5px] font-medium text-navy truncate">{value}</p>
                    </div>
                  </div>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={`${label}: ${value}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} aria-label={`${label}: ${value}`}>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Response note */}
            <p className="mt-6 text-[12.5px] text-navy/45 leading-relaxed">
              I respond to messages within 1–2 business days.
              For urgent enquiries, please contact me directly by phone or email.
            </p>
          </aside>

          {/* Right: contact form */}
          <div>
            {status === "success" ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-14 px-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center
                                  justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-emerald-500" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-bold text-navy text-[1.1rem] mb-2">
                    Message sent
                  </h3>
                  <p className="text-[14px] text-navy/55 mb-6">
                    Thank you for reaching out. I will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-[13px] font-semibold text-gold hover:text-gold-light
                               transition-colors duration-150 underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="space-y-5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="name" label="Full Name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name ? INPUT_ERROR : INPUT_NORMAL}
                    />
                  </Field>
                  <Field id="email" label="Email Address" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? INPUT_ERROR : INPUT_NORMAL}
                    />
                  </Field>
                </div>

                {/* Subject */}
                <Field id="subject" label="Subject" error={errors.subject}>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Reason for contact"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.subject && touched.subject ? INPUT_ERROR : INPUT_NORMAL}
                  />
                </Field>

                {/* Message */}
                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Your message…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={[
                      errors.message && touched.message ? INPUT_ERROR : INPUT_NORMAL,
                      "resize-none",
                    ].join(" ")}
                  />
                </Field>

                {/* Error state */}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-[13px] text-red-500 font-medium">
                    <AlertCircle size={14} strokeWidth={2} />
                    Something went wrong. Please email me directly at{" "}
                    <a href={`mailto:${person.email}`} className="underline">
                      {person.email}
                    </a>
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md
                             bg-navy text-white text-[14px] font-semibold
                             hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed
                             transition-all duration-200
                             shadow-[0_4px_20px_rgba(11,22,40,0.18)]"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={15} strokeWidth={2} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Privacy note */}
                <p className="text-[11px] text-navy/35 leading-relaxed">
                  Your contact details are used only to respond to your enquiry
                  and are not shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
