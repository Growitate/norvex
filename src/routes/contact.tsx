import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageSquare,
} from "lucide-react";
import contactCraft from "@/assets/contact_craft.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Norva Store" },
      {
        name: "description",
        content:
          "Get in touch with Norva Store. Email norvastorex@gmail.com or DM us on Instagram @norvaxstore.",
      },
      { property: "og:title", content: "Contact — Norva Store" },
      {
        property: "og:description",
        content: "Talk to us via Email, Instagram Direct, or drop a message.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-16 sm:h-20 bg-white" />

      <section className="bg-white py-10 sm:py-16 md:py-24 text-zinc-900 min-h-screen">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-12 md:space-y-16">
          {/* Header */}
          <header className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-zinc-900 text-white text-[10px] sm:text-[11px] font-display font-semibold tracking-widest uppercase shadow-md">
              <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5" /> GET IN TOUCH • CUSTOMER CARE
            </div>

            <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-[1.1]">
              Connect With NORVA.
            </h1>

            <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed px-2">
              Have a question about your order, statement bag drops, or shipping? Our customer care
              team is here to help.
            </p>
          </header>

          {/* 3-Column Luxury Editorial Grid */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-stretch">
            {/* Left Column: Campaign Image Card (4 cols) */}
            <div className="lg:col-span-4 relative min-h-[300px] xs:min-h-[360px] sm:min-h-[420px] lg:min-h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 shadow-md group">
              <img
                src={contactCraft}
                alt="NØRVA Craft & Atelier Support"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-7 md:p-8 text-white space-y-2.5 sm:space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] sm:text-[10px] font-display font-bold tracking-widest uppercase text-white w-fit">
                  <Clock className="h-3 w-3" /> RAPID RESPONSE SUPPORT
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white leading-tight">
                  Always Ready To Assist You.
                </h3>
                <p className="font-sans text-[11px] sm:text-xs text-zinc-200 leading-relaxed">
                  We reply within a few hours on Instagram and email during business drops.
                </p>
              </div>
            </div>

            {/* Middle Column: Direct Contact Channels (4 cols) */}
            <div className="lg:col-span-4 bg-zinc-50 border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 space-y-6 sm:space-y-8 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-900 border-b border-black/10 pb-3 sm:pb-4 flex items-center justify-between">
                  <span>Direct Channels</span>
                  <MessageSquare className="h-4 w-4 text-zinc-400" />
                </h2>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {/* Instagram */}
                <div className="space-y-2 border-b border-black/5 pb-4 sm:pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-black/15 flex items-center justify-center text-zinc-900 shrink-0 shadow-xs">
                      <Instagram className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                    </div>
                    <div>
                      <span className="font-display text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                        Instagram Direct
                      </span>
                      <a
                        href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm sm:text-base font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                      >
                        @norvaxstore
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors pt-1"
                  >
                    <span>DM on Instagram</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-black/15 flex items-center justify-center text-zinc-900 shrink-0 shadow-xs">
                      <Mail className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                        Email Support
                      </span>
                      <a
                        href="mailto:norvastorex@gmail.com"
                        className="font-sans text-xs sm:text-base font-semibold text-zinc-900 hover:text-zinc-600 transition-colors break-all"
                      >
                        norvastorex@gmail.com
                      </a>
                    </div>
                  </div>
                  <a
                    href="mailto:norvastorex@gmail.com"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors pt-1"
                  >
                    <span>Send Email</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Bottom Support Badge */}
              <div className="border-t border-black/10 pt-4 sm:pt-6 flex items-center gap-2 text-[11px] sm:text-xs font-display uppercase tracking-wider text-zinc-500 font-semibold">
                <ShieldCheck className="h-4 w-4 text-zinc-900 shrink-0" />
                <span>Jevani Enterprises · Quick Support</span>
              </div>
            </div>

            {/* Right Column: Contact Form Card (4 cols) */}
            <div className="lg:col-span-4 bg-zinc-50 border border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 space-y-5 sm:space-y-6 shadow-sm">
              <div>
                <h2 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-900 border-b border-black/10 pb-3 sm:pb-4">
                  Send A Message
                </h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-3.5 sm:space-y-4"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-700"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-white border border-black/15 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-black text-base sm:text-sm text-zinc-900 transition-colors shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-700"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full bg-white border border-black/15 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-black text-base sm:text-sm text-zinc-900 transition-colors shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-white border border-black/15 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-black text-base sm:text-sm text-zinc-900 transition-colors shadow-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-3 bg-zinc-900 hover:bg-black text-white px-7 py-3.5 sm:py-4 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>Sent — We'll be in touch</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
