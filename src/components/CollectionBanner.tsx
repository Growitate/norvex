import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface CollectionBannerProps {
  image: string;
  desktopImage?: string;
  seasonLabel?: string;
  title: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  position?: "bottom-left" | "bottom-center" | "center";
  className?: string;
  bgColor?: string;
  mobileImagePosition?: string;
  desktopImagePosition?: string;
}

export function CollectionBanner({
  image,
  desktopImage,
  seasonLabel = "FW2026",
  title,
  description,
  primaryButtonText = "Shop Now",
  primaryButtonLink,
  position = "center",
  className = "",
  bgColor = "#a8c7e0",
  mobileImagePosition = "object-[center_15%]",
  desktopImagePosition = "object-center",
}: CollectionBannerProps) {
  const positionClasses = {
    "bottom-left": "items-end justify-start text-left pb-10 sm:pb-16 md:pb-20 px-6 sm:px-12",
    "bottom-center": "items-end justify-center text-center pb-10 sm:pb-16 md:pb-20 px-4 sm:px-8",
    center: "items-end justify-center text-center pb-10 sm:pb-16 md:pb-20 px-4 sm:px-8",
  };

  const isCentered = position === "bottom-center" || position === "center";

  return (
    <section
      data-header-theme="dark"
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Full-Bleed Banner Section Container */}
      <div 
        className="relative w-full h-[600px] xs:h-[720px] sm:h-[85vh] md:h-[90vh] lg:h-[95vh] min-h-[600px] max-h-[1100px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Mobile View Image */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`w-full h-full object-cover ${mobileImagePosition} ${desktopImage ? "md:hidden block" : `block md:${desktopImagePosition}`} pointer-events-none transition-transform duration-1000 ease-out hover:scale-105`}
        />

        {/* Dedicated Widescreen Desktop Image */}
        {desktopImage && (
          <img
            src={desktopImage}
            alt={title}
            loading="lazy"
            className={`hidden md:block absolute inset-0 w-full h-full object-cover ${desktopImagePosition} pointer-events-none transition-transform duration-1000 ease-out hover:scale-105`}
          />
        )}

        {/* Ambient Bottom Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none z-20" />

        {/* Content Overlay pulled to bottom matching Nude Project Image 2 */}
        <div
          className={`absolute inset-0 flex z-30 mx-auto max-w-[1600px] ${positionClasses[position]}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`space-y-2.5 sm:space-y-3.5 max-w-4xl flex flex-col ${isCentered ? "items-center text-center mx-auto" : "items-start text-left"
              }`}
          >
            {/* Season / Subtitle Badge (e.g. FW2026) */}
            {seasonLabel && (
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-widest text-white/90 uppercase drop-shadow-md">
                {seasonLabel}
              </span>
            )}

            {/* High-Fashion Clash Display Title Text (Refined Nude Project Size & Bottom Positioned) */}
            <h2 className="font-display font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] drop-shadow-lg">
              {title}
            </h2>

            {/* Transparent Glassmorphic Capsule Pill Button */}
            <div
              className={`pt-2 flex items-center ${isCentered ? "justify-center" : "justify-start"}`}
            >
              <Link
                to={primaryButtonLink}
                className="group relative inline-flex items-center justify-center rounded-full bg-transparent hover:bg-white/15 border border-white/80 hover:border-white text-white px-8 sm:px-9 py-2.5 sm:py-3 font-sans text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {primaryButtonText}
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
