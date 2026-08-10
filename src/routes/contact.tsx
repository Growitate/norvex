import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTAButton } from "@/components/CTAButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nørva Store" },
      {
        name: "description",
        content: "Get in touch with Nørva Store. WhatsApp +91 9971303047, Email norvastorex@gmail.com or DM @norvaxstore.",
      },
      { property: "og:title", content: "Contact — Nørva Store" },
      { property: "og:description", content: "Talk to us. WhatsApp, Email, Instagram, or drop a message." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-[#09090b] pt-28 sm:pt-40 text-white md:pt-48 min-h-screen">
      <div className="mx-auto grid max-w-[1100px] gap-16 px-4 pb-24 md:px-8 md:pb-32">
        <header className="text-center">
          <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
            Get In Touch
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase tracking-tight sm:text-7xl text-white">
            Connect With Nørva.
          </h1>
        </header>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Contact details */}
          <div className="space-y-10 border-t border-white/15 pt-10">
            <div>
              <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
                WhatsApp / Phone
              </p>
              <a
                href="https://wa.me/919971303047"
                className="mt-2 inline-block font-display text-2xl uppercase tracking-brand text-white hover:text-zinc-300 transition-colors"
              >
                09971303047
              </a>
            </div>

            <div>
              <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
                Email
              </p>
              <a
                href="mailto:norvastorex@gmail.com"
                className="mt-2 inline-block font-display text-xl uppercase tracking-brand text-white hover:text-zinc-300 transition-colors"
              >
                norvastorex@gmail.com
              </a>
            </div>

            <div>
              <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
                Instagram
              </p>
              <a
                href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-display text-xl uppercase tracking-brand text-white hover:text-zinc-300 transition-colors"
              >
                @norvaxstore
              </a>
            </div>

            <div className="border-t border-white/10 pt-6 text-xs uppercase tracking-brand text-zinc-400">
              Jevani Enterprises · Quick Customer Support
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6 border-t border-white/15 pt-10"
          >
            <Field label="Name">
              <input
                required
                type="text"
                className="w-full border-b border-white/30 bg-transparent py-3 outline-none transition-colors focus:border-white text-white"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                className="w-full border-b border-white/30 bg-transparent py-3 outline-none transition-colors focus:border-white text-white"
              />
            </Field>
            <Field label="Message">
              <textarea
                required
                rows={5}
                className="w-full resize-none border-b border-white/30 bg-transparent py-3 outline-none transition-colors focus:border-white text-white"
              />
            </Field>
            <CTAButton tone="light" type="submit" className="w-full">
              {sent ? "Sent — we'll be in touch ✓" : "Send Message →"}
            </CTAButton>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-display text-[10px] uppercase tracking-brand-wide text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}
