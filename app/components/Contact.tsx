"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Mail, Phone, MapPin, Send,
  CheckCircle, AlertCircle, Loader2,
} from "lucide-react";
import { person, formEndpoint } from "../data/content";
import { useReveal } from "../hooks/useReveal";

// ─── Inline LinkedIn icon ─────────────────────────────────────────────────────

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─── WhatsApp icon ────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
      <label htmlFor={id} className="text-[12.5px] font-semibold text-white/50 tracking-wide">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-[11.5px] text-red-400 font-medium">
          <AlertCircle size={11} strokeWidth={2} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const INPUT_BASE =
  "w-full px-4 py-3 rounded-lg border bg-white/[0.04] text-white/90 text-[14px] " +
  "placeholder:text-white/25 outline-none " +
  "transition-colors duration-150 ";

const INPUT_NORMAL = INPUT_BASE + "border-white/[0.10] focus:border-gold/50 focus:ring-1 focus:ring-gold/15";
const INPUT_ERROR  = INPUT_BASE + "border-red-500/50 focus:border-red-500/70";

// ─── Contact info items ───────────────────────────────────────────────────────

function getInfoItems() {
  return [
    {
      icon:  Mail,
      label: "Email",
      value: person.email,
      href:  `mailto:${person.email}`,
    },
    {
      icon:  WhatsAppIcon as unknown as typeof Mail,
      label: "WhatsApp",
      value: (person as typeof person & { whatsapp: string }).whatsapp,
      href:  (person as typeof person & { whatsappUrl: string }).whatsappUrl,
      external: true,
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
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form,    setForm]    = useState<FormState>(EMPTY);
  const [errors,  setErrors]  = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status,  setStatus]  = useState<Status>("idle");
  const [ref, vis] = useReveal(0.06);

  const INFO_ITEMS = getInfoItems();

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
      ref={ref}
      aria-labelledby="contact-heading"
      className="section-pad bg-[#070E1A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-14">
          <p
            className={`rv rv-up ${vis ? "in" : ""} text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3`}
            style={{ transitionDelay: "0ms" }}
          >
            Contact
          </p>
          <h2
            id="contact-heading"
            className={`rv rv-up ${vis ? "in" : ""} font-display font-extrabold text-white/95 text-[2rem] sm:text-[2.4rem] tracking-tight leading-[1.15]`}
            style={{ transitionDelay: "80ms" }}
          >
            Get in Touch
          </h2>
          <p
            className={`rv rv-up ${vis ? "in" : ""} mt-3 text-[0.9375rem] text-white/50 max-w-[480px] leading-relaxed`}
            style={{ transitionDelay: "150ms" }}
          >
            Available for EPC project opportunities, document control roles,
            and professional enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">

          {/* Left: contact info */}
          <aside
            aria-label="Contact information"
            className={`rv rv-up ${vis ? "in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="space-y-3">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href, ...rest }) => {
                const external = "external" in rest ? rest.external : false;
                const inner = (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.08]
                                  bg-white/[0.03] hover:border-gold/25 hover:bg-white/[0.05]
                                  transition-all duration-150 group">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center
                                    justify-center shrink-0 group-hover:bg-gold/18
                                    transition-colors duration-150">
                      <Icon size={15} className="text-gold" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em]
                                    text-white/30 mb-0.5">
                        {label}
                      </p>
                      <p className="text-[13.5px] font-medium text-white/80 truncate">{value}</p>
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

            <p className="mt-6 text-[12.5px] text-white/30 leading-relaxed">
              I respond to messages within 1–2 business days.
              For urgent enquiries, please contact me directly by phone or email.
            </p>
          </aside>

          {/* Right: contact form */}
          <div
            className={`rv rv-up ${vis ? "in" : ""}`}
            style={{ transitionDelay: "280ms" }}
          >
            {status === "success" ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-14 px-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center
                                  justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-emerald-400" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-bold text-white/90 text-[1.1rem] mb-2">
                    Message sent
                  </h3>
                  <p className="text-[14px] text-white/50 mb-6">
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
                  <p className="flex items-center gap-2 text-[13px] text-red-400 font-medium">
                    <AlertCircle size={14} strokeWidth={2} />
                    Something went wrong. Please email me directly at{" "}
                    <a href={`mailto:${person.email}`} className="underline text-gold">
                      {person.email}
                    </a>
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md
                             bg-gold text-navy text-[14px] font-bold
                             hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200
                             shadow-[0_4px_20px_rgba(201,168,76,0.22)]
                             hover:shadow-[0_6px_28px_rgba(201,168,76,0.35)]
                             btn-press"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={15} strokeWidth={2} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2}
                        className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-[11px] text-white/25 leading-relaxed">
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
