import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import brandBg from "@/assets/brand_statement_bg.jpg";

interface BrandStatementBannerProps {
  image?: string;
  seasonLabel?: string;
  statement?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function BrandStatementBanner({
  image = brandBg,
  seasonLabel = "FW2026",
  statement = "We Are Loud and Proud",
  buttonText = "Explore",
  buttonLink = "/shop",
  className = "",
}: BrandStatementBannerProps) {
  return (
    <section
      data-header-theme="dark"
      className={`relative w-full overflow-hidden bg-black select-none border-t border-black/[0.08] ${className}`}
    >
      {/* Full-Bleed Background Image Container */}
      <div className="relative w-full h-[600px] xs:h-[720px] sm:h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] max-h-[1100px] flex items-center justify-center bg-black overflow-hidden">
        {/* Seamless blurred background to fill left & right sides naturally without dark gaps */}
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-75 scale-110 pointer-events-none"
        />

        {/* Full Uncropped Picture (100% visible head-to-toe) */}
        <img
          src={image}
          alt={statement}
          loading="lazy"
          className="relative z-10 w-full h-full object-contain pointer-events-none transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Ambient Darkened Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none z-20" />

        {/* Centered Bottom Content Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 mx-auto max-w-5xl px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-end space-y-2.5 sm:space-y-3.5 pb-10 sm:pb-16 md:pb-20 h-full"
        >
          {/* Season Badge (FW2026) */}
          {seasonLabel && (
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-widest text-white/90 uppercase drop-shadow-md">
              {seasonLabel}
            </span>
          )}

          {/* High-Fashion Clash Display Statement Title */}
          <h2 className="font-display font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-white leading-[1.08] drop-shadow-lg">
            {statement}
          </h2>

          {/* Transparent Glassmorphic Capsule Pill Button */}
          <div className="pt-2">
            <Link
              to={buttonLink}
              className="group relative inline-flex items-center justify-center rounded-full bg-transparent hover:bg-white/15 border border-white/80 hover:border-white text-white px-8 sm:px-9 py-2.5 sm:py-3 font-sans text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                {buttonText}
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
