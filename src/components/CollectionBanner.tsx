import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CollectionBannerProps {
  image: string;
  seasonLabel?: string;
  title: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  position?: "bottom-left" | "bottom-center" | "center";
  className?: string;
}

export function CollectionBanner({
  image,
  seasonLabel = "FW2026",
  title,
  description,
  primaryButtonText = "Shop Now",
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  position = "bottom-left",
  className = "",
}: CollectionBannerProps) {
  const positionClasses = {
    "bottom-left": "items-end justify-start text-left p-6 sm:p-10 md:p-14 lg:p-16",
    "bottom-center": "items-end justify-center text-center p-6 sm:p-10 md:p-14 lg:p-16",
    center: "items-center justify-center text-center p-6 sm:p-10",
  };

  return (
    <section className={`relative w-full overflow-hidden bg-black select-none ${className}`}>
      {/* Full-Width Background Lifestyle Image */}
      <div className="relative w-full h-[480px] sm:h-[600px] md:h-[700px] lg:h-[780px]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Ambient Gradient Overlay for high-contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        {/* Content Overlay */}
        <div
          className={`absolute inset-0 flex z-10 mx-auto max-w-[1600px] ${positionClasses[position]}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`space-y-4 max-w-2xl ${
              position === "bottom-center" || position === "center" ? "mx-auto" : ""
            }`}
          >
            {/* Season / Collection Tag */}
            {seasonLabel && (
              <span className="inline-block font-display text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-white/90 drop-shadow-sm">
                {seasonLabel}
              </span>
            )}

            {/* Bold Title Text */}
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.04] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              {title}
            </h2>

            {/* Short Description */}
            {description && (
              <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed font-normal max-w-lg drop-shadow-sm">
                {description}
              </p>
            )}

            {/* Pill-Shaped Action Buttons (Nude Project Style) */}
            <div
              className={`flex flex-wrap items-center gap-3 pt-2 ${
                position === "bottom-center" || position === "center" ? "justify-center" : ""
              }`}
            >
              <Link
                to={primaryButtonLink}
                className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {secondaryButtonText && secondaryButtonLink && (
                <Link
                  to={secondaryButtonLink}
                  className="inline-flex items-center justify-center bg-white/15 hover:bg-white hover:text-black text-white backdrop-blur-md border border-white/30 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{secondaryButtonText}</span>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
