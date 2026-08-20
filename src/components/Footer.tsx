import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Plus,
  Minus,
  ArrowUp,
  Globe,
  ChevronDown,
  Check,
  Youtube,
  Music2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState("all");
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("IN | INR₹ | English");

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white text-zinc-900 border-t border-black/[0.08] select-none pt-12 sm:pt-16 pb-8">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8">
        {/* Main Grid Columns (Nude Project Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-black/[0.08]">
          {/* Column 1: JOIN THE MOVEMENT / NEWSLETTER (5 cols on desktop) */}
          <div className="md:col-span-5 space-y-4 pr-0 lg:pr-8">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
              JOIN THE MOVEMENT
            </h3>
            <p className="font-sans text-xs text-zinc-600 font-normal leading-relaxed max-w-sm">
              Sign up to our email list and get 10% off your first order.
            </p>

            {/* Email Input */}
            <form onSubmit={handleSubscribe} className="space-y-3.5 pt-1">
              <div className="relative flex items-center border-b border-zinc-900 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  className="w-full bg-transparent font-sans text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none pr-24"
                />
                <button
                  type="submit"
                  disabled={!agreed}
                  className={`absolute right-0 font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    agreed
                      ? "text-zinc-950 hover:text-zinc-600"
                      : "text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  {subscribed ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <Check className="h-3.5 w-3.5" /> SUBSCRIBED
                    </span>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </button>
              </div>

              {/* Preference Radio Options */}
              <div className="flex items-center gap-4 text-xs font-sans text-zinc-700 pt-1">
                <span className="text-zinc-500 font-normal">Select your preferences:</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="pref"
                    value="men"
                    checked={preference === "men"}
                    onChange={() => setPreference("men")}
                    className="accent-zinc-900"
                  />
                  <span>Men</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="pref"
                    value="women"
                    checked={preference === "women"}
                    onChange={() => setPreference("women")}
                    className="accent-zinc-900"
                  />
                  <span>Women</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="pref"
                    value="all"
                    checked={preference === "all"}
                    onChange={() => setPreference("all")}
                    className="accent-zinc-900"
                  />
                  <span>Both</span>
                </label>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2 text-[11px] font-sans text-zinc-500 cursor-pointer pt-1 leading-snug">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-zinc-900 rounded-sm"
                />
                <span>
                  I agree to receive content from Nørva Store via email and have read and accept the{" "}
                  <Link
                    to="/legal/$page"
                    params={{ page: "privacy" }}
                    className="underline text-zinc-800"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </form>
          </div>

          {/* Desktop & Mobile Links (7 cols on desktop) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* 1. BRAND COLUMN */}
            <div className="border-b sm:border-b-0 border-black/[0.08] pb-4 sm:pb-0">
              <button
                onClick={() => toggleSection("brand")}
                className="w-full flex items-center justify-between sm:pointer-events-none text-left"
              >
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
                  BRAND
                </h4>
                <span className="sm:hidden text-zinc-600 text-sm">
                  {openSection === "brand" ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <div
                className={`mt-3 space-y-2 text-xs font-sans text-zinc-600 ${
                  openSection === "brand" ? "block" : "hidden sm:block"
                }`}
              >
                <p>
                  <Link to="/about" className="hover:text-black transition-colors">
                    Nørva Members
                  </Link>
                </p>
                <p>
                  <Link to="/shop" className="hover:text-black transition-colors">
                    Lookbook Drops
                  </Link>
                </p>
                <p>
                  <Link to="/about" className="hover:text-black transition-colors">
                    Our Story
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="hover:text-black transition-colors">
                    Press & Careers
                  </Link>
                </p>
              </div>
            </div>

            {/* 2. SUPPORT COLUMN */}
            <div className="border-b sm:border-b-0 border-black/[0.08] pb-4 sm:pb-0">
              <button
                onClick={() => toggleSection("support")}
                className="w-full flex items-center justify-between sm:pointer-events-none text-left"
              >
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
                  SUPPORT
                </h4>
                <span className="sm:hidden text-zinc-600 text-sm">
                  {openSection === "support" ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <div
                className={`mt-3 space-y-2 text-xs font-sans text-zinc-600 ${
                  openSection === "support" ? "block" : "hidden sm:block"
                }`}
              >
                <p>
                  <a
                    href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    Social
                  </a>
                </p>
                <p>
                  <Link to="/contact" className="hover:text-black transition-colors">
                    Contact Us
                  </Link>
                </p>
                <p>
                  <Link
                    to="/legal/$page"
                    params={{ page: "refund" }}
                    className="hover:text-black transition-colors"
                  >
                    Return & Refund
                  </Link>
                </p>
              </div>
            </div>

            {/* 3. POLICIES COLUMN */}
            <div className="border-b sm:border-b-0 border-black/[0.08] pb-4 sm:pb-0">
              <button
                onClick={() => toggleSection("policies")}
                className="w-full flex items-center justify-between sm:pointer-events-none text-left"
              >
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
                  POLICIES
                </h4>
                <span className="sm:hidden text-zinc-600 text-sm">
                  {openSection === "policies" ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <div
                className={`mt-3 space-y-2 text-xs font-sans text-zinc-600 ${
                  openSection === "policies" ? "block" : "hidden sm:block"
                }`}
              >
                <p>
                  <Link
                    to="/legal/$page"
                    params={{ page: "refund" }}
                    className="hover:text-black transition-colors"
                  >
                    Refund Policy
                  </Link>
                </p>
                <p>
                  <Link
                    to="/legal/$page"
                    params={{ page: "terms" }}
                    className="hover:text-black transition-colors"
                  >
                    Shipping Policy
                  </Link>
                </p>
                <p>
                  <Link
                    to="/legal/$page"
                    params={{ page: "privacy" }}
                    className="hover:text-black transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
                <p>
                  <Link
                    to="/legal/$page"
                    params={{ page: "terms" }}
                    className="hover:text-black transition-colors"
                  >
                    Terms of Service
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Bar: Country & Language Selector + Social Icons */}
        <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-black/[0.08]">
          {/* Country & Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wider text-zinc-800 hover:text-black transition-colors cursor-pointer"
            >
              <span className="font-bold">COUNTRY & LANGUAGE</span>
              <span className="text-zinc-500 font-sans">{selectedRegion}</span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 bottom-full mb-2 w-56 bg-white border border-black/10 rounded-lg shadow-xl p-2 z-30"
                >
                  <button
                    onClick={() => {
                      setSelectedRegion("IN | INR₹ | English");
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-sans rounded hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>India (INR ₹) · English</span>
                    {selectedRegion.includes("IN") && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRegion("US | USD$ | English");
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-sans rounded hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>United States (USD $) · English</span>
                    {selectedRegion.includes("US") && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRegion("EU | EUR€ | English");
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-sans rounded hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>Europe (EUR €) · English</span>
                    {selectedRegion.includes("EU") && <Check className="h-3.5 w-3.5" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Icons (Instagram, TikTok, Spotify/YouTube) */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-black/15 hover:border-black hover:bg-black hover:text-white text-zinc-800 flex items-center justify-center transition-all duration-200"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full border border-black/15 hover:border-black hover:bg-black hover:text-white text-zinc-800 flex items-center justify-center transition-all duration-200"
            >
              <Music2 className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full border border-black/15 hover:border-black hover:bg-black hover:text-white text-zinc-800 flex items-center justify-center transition-all duration-200"
            >
              <Youtube className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Giant Centered Brand Wordmark/Logo (Nude Project Reference Style) */}
        <div className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center overflow-hidden">
          <h1 className="font-display font-black text-[clamp(3.5rem,14vw,11rem)] tracking-tight text-zinc-950 uppercase leading-none select-none">
            NØRVA STORE
          </h1>
        </div>

        {/* Thin Divider Line at the very bottom & Copyright / Built by / Back to top */}
        <div className="border-t border-black/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-sans text-zinc-500 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} NØRVA STORE (JEVANI ENTERPRISES) — ALL RIGHTS RESERVED
          </div>

          {/* Built by Growitate Credit Link */}
          <div className="font-sans text-xs">
            <span>Built by </span>
            <a
              href="https://growitate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-zinc-800 hover:text-black underline underline-offset-4 decoration-black/25 hover:decoration-black transition-colors"
            >
              Growitate
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <span className="font-display uppercase tracking-widest font-semibold text-[10px]">
              BACK TO TOP
            </span>
            <div className="w-6 h-6 rounded-full bg-black/5 group-hover:bg-zinc-900 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUp className="h-3 w-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
