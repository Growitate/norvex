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
    "bottom-left": "items-end justify-start text-left p-4 xs:p-6 sm:p-10 md:p-14 lg:p-16",
    "bottom-center": "items-end justify-center text-center p-4 xs:p-6 sm:p-10 md:p-14 lg:p-16",
    center: "items-center justify-center text-center p-4 xs:p-6 sm:p-10",
  };

  return (
    <section data-header-theme="dark" className={`relative w-full overflow-hidden bg-black select-none ${className}`}>
      {/* Full-Width Background Lifestyle Image */}
      <div className="relative w-full h-[600px] xs:h-[720px] sm:h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[640px] max-h-[1100px]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top sm:object-center pointer-events-none transition-transform duration-1000 ease-out hover:scale-105"
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
            className={`space-y-5 max-w-4xl ${
              position === "bottom-center" || position === "center" ? "mx-auto" : ""
            }`}
          >
            {/* Bold Title Text */}
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight text-white leading-[1.02] drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)]">
              {title}
            </h2>

            {/* Single Title Redirect Button */}
            <div
              className={`flex items-center pt-1 ${
                position === "bottom-center" || position === "center" ? "justify-center" : ""
              }`}
            >
              <Link
                to={primaryButtonLink}
                className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
