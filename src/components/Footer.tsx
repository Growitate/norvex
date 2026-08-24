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
import logoDark from "@/assets/norva_logo_dark.png";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState("all");
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("IN · INR ₹ · English");

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
    <footer className="w-full bg-[#fcfbfa] text-zinc-900 select-none pt-12 sm:pt-16 pb-8">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8">
        {/* Top Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 sm:pb-12">
          {/* Column 1: STAY IN THE LOOP (Newsletter) */}
          <div className="md:col-span-4 space-y-4 pr-0 lg:pr-6">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
              STAY IN THE LOOP
            </h3>
            <p className="font-sans text-xs text-zinc-600 font-normal leading-relaxed max-w-sm">
              Sign up to our email list and get 10% off your first order:
            </p>

            {/* Email Input */}
            <form onSubmit={handleSubscribe} className="space-y-3.5 pt-1">
              <div className="relative flex items-center border-b border-zinc-900 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@arethebest.com"
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
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-sans text-zinc-700 pt-1">
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

          {/* Desktop & Mobile Links Grid (8 cols on desktop) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
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
                className={`mt-3.5 space-y-2 text-xs font-sans text-zinc-600 ${
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
                    Nørva News
                  </Link>
                </p>
                <p>
                  <Link to="/about" className="hover:text-black transition-colors">
                    Stores
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="hover:text-black transition-colors">
                    Careers
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
                className={`mt-3.5 space-y-2 text-xs font-sans text-zinc-600 ${
                  openSection === "support" ? "block" : "hidden sm:block"
                }`}
              >
                <p>
                  <Link
                    to="/legal/$page"
                    params={{ page: "refund" }}
                    className="hover:text-black transition-colors"
                  >
                    Returns & Refund
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="hover:text-black transition-colors">
                    Order Tracking
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="hover:text-black transition-colors">
                    FAQ
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="hover:text-black transition-colors">
                    Contact Us
                  </Link>
                </p>
              </div>
            </div>

            {/* 3. BORING STUFF COLUMN */}
            <div className="border-b sm:border-b-0 border-black/[0.08] pb-4 sm:pb-0">
              <button
                onClick={() => toggleSection("policies")}
                className="w-full flex items-center justify-between sm:pointer-events-none text-left"
              >
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">
                  BORING STUFF
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
                className={`mt-3.5 space-y-2 text-xs font-sans text-zinc-600 ${
                  openSection === "policies" ? "block" : "hidden sm:block"
                }`}
              >
                <p>
                  <Link
                    to="/legal/$page"
                    params={{ page: "terms" }}
                    className="hover:text-black transition-colors"
                  >
                    Legal Notice
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
              </div>
            </div>
          </div>
        </div>

        {/* Middle Bar: Country & Language Selector + Social Icons */}
        <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                      setSelectedRegion("IN | INR ₹ | English");
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-sans rounded hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>India (IN | INR ₹) · English</span>
                    {selectedRegion.includes("IN") && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRegion("US | USD $ | English");
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-sans rounded hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>United States (US | USD $) · English</span>
                    {selectedRegion.includes("US") && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRegion("EU | EUR € | English");
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-sans rounded hover:bg-zinc-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>Europe (EU | EUR €) · English</span>
                    {selectedRegion.includes("EU") && <Check className="h-3.5 w-3.5" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Icons (Instagram, TikTok, Spotify, YouTube) */}
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

        {/* Centered Brand Logo */}
        <div className="pt-8 sm:pt-12 pb-8 sm:pb-10 flex justify-center items-center overflow-hidden">
          <img
            src={logoDark}
            alt="norvastore"
            className="h-12 sm:h-20 md:h-28 w-auto max-w-[85vw] object-contain select-none opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Bottom Line & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-sans text-zinc-500 text-center md:text-left">
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
