import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import brandBg from "@/assets/brand_statement_bg.jpg";

interface BrandStatementBannerProps {
  image?: string;
  tag?: string;
  statement?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function BrandStatementBanner({
  image = brandBg,
  tag = "NØRVA STORE // STATEMENT",
  statement = "We Are Loud and Proud",
  buttonText = "Explore",
  buttonLink = "/shop",
  className = "",
}: BrandStatementBannerProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-black select-none border-t border-black/[0.08] ${className}`}
    >
      {/* Full-Bleed Background Lifestyle / Graphic Image */}
      <div className="relative w-full h-[440px] sm:h-[540px] md:h-[640px] lg:h-[720px] flex items-center justify-center">
        <img
          src={image}
          alt={statement}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Ambient Darkened Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 pointer-events-none" />

        {/* Centered Large Announcement Text & Explore Button (Tauxxic Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6"
        >
          {/* Subtle Tag */}
          {tag && (
            <span className="inline-block font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-300 drop-shadow-sm">
              {tag}
            </span>
          )}

          {/* Large Bold Brand Statement */}
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-white leading-[1.02] drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]">
            {statement}
          </h2>

          {/* Small "Explore" Pill Button */}
          <div className="pt-2">
            <Link
              to={buttonLink}
              className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
