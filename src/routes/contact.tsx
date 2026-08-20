import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Instagram, ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Clock, MessageSquare } from "lucide-react";
import modelBag3 from "@/assets/model_banner_bag_3_1786114733990.png";

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
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-16 sm:h-20 bg-white" />

      <section className="bg-white py-16 sm:py-24 text-zinc-900 min-h-screen">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 space-y-12 sm:space-y-16">

          {/* Header */}
          <header className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-[11px] font-display font-semibold tracking-widest uppercase shadow-md">
              <Sparkles className="h-3.5 w-3.5" /> GET IN TOUCH // CUSTOMER CARE
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-[1.1]">
              Connect With NØRVA.
            </h1>

            <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
              Have a question about your order, statement bag drops, or shipping? Our customer care team is here to help.
            </p>
          </header>

          {/* 3-Column Luxury Editorial Grid */}
          <div className="grid gap-8 lg:grid-cols-12 items-stretch">

            {/* Left Column: Campaign Image Card (4 cols) */}
            <div className="lg:col-span-4 relative min-h-[420px] lg:min-h-full rounded-3xl overflow-hidden border border-black/10 shadow-md group">
              <img
                src={modelBag3}
                alt="NØRVA Store Model Campaign"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 text-white space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-display font-bold tracking-widest uppercase text-white w-fit">
                  <Clock className="h-3 w-3" /> RAPID RESPONSE SUPPORT
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white leading-tight">
                  Always Ready To Assist You.
                </h3>
                <p className="font-sans text-xs text-zinc-200 leading-relaxed">
                  We reply within a few hours on WhatsApp and email during business drops.
                </p>
              </div>
            </div>

            {/* Middle Column: Direct Contact Channels (4 cols) */}
            <div className="lg:col-span-4 bg-zinc-50 border border-black/10 rounded-3xl p-8 space-y-8 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-900 border-b border-black/10 pb-4 flex items-center justify-between">
                  <span>Direct Channels</span>
                  <MessageSquare className="h-4 w-4 text-zinc-400" />
                </h2>
              </div>

              <div className="space-y-6">

                {/* Phone / WhatsApp */}
                <div className="space-y-2 border-b border-black/5 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white border border-black/15 flex items-center justify-center text-zinc-900 shrink-0 shadow-xs">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-display text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                        WhatsApp / Phone
                      </span>
                      <a
                        href="https://wa.me/919971303047"
                        className="font-sans text-base font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
                      >
                        +91 9971303047
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919971303047"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors pt-1"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Email */}
                <div className="space-y-2 border-b border-black/5 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white border border-black/15 flex items-center justify-center text-zinc-900 shrink-0 shadow-xs">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-display text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                        Email Support
                      </span>
                      <a
                        href="mailto:norvastorex@gmail.com"
                        className="font-sans text-sm sm:text-base font-semibold text-zinc-900 hover:text-zinc-600 transition-colors break-all"
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

                {/* Instagram */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white border border-black/15 flex items-center justify-center text-zinc-900 shrink-0 shadow-xs">
                      <Instagram className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-display text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                        Instagram Direct
                      </span>
                      <a
                        href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-base font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
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
                    <span>Follow on Instagram</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

              </div>

              {/* Bottom Support Badge */}
              <div className="border-t border-black/10 pt-6 flex items-center gap-2 text-xs font-display uppercase tracking-wider text-zinc-500 font-semibold">
                <ShieldCheck className="h-4 w-4 text-zinc-900" />
                <span>Jevani Enterprises · Quick Support</span>
              </div>
            </div>

            {/* Right Column: Contact Form Card (4 cols) */}
            <div className="lg:col-span-4 bg-zinc-50 border border-black/10 rounded-3xl p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="font-display text-xs uppercase tracking-widest font-bold text-zinc-900 border-b border-black/10 pb-4">
                  Send A Message
                </h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-white border border-black/15 rounded-xl px-4 py-3 outline-none focus:border-black text-sm text-zinc-900 transition-colors shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full bg-white border border-black/15 rounded-xl px-4 py-3 outline-none focus:border-black text-sm text-zinc-900 transition-colors shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block font-sans text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-white border border-black/15 rounded-xl px-4 py-3 outline-none focus:border-black text-sm text-zinc-900 transition-colors shadow-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-3 bg-zinc-900 hover:bg-black text-white px-7 py-4 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
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
