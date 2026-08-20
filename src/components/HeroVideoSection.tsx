import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroPoster from "@/assets/model_banner_bag_1_1786114703183.png";

interface HeroVideoSectionProps {
  /**
   * Background video source. Swap this out with your custom video file or URL.
   */
  videoSrc?: string;
  /**
   * Poster image displayed while video loads or as fallback.
   */
  posterSrc?: string;
  /**
   * Target destination for the CTA button.
   */
  ctaTo?: string;
  /**
   * CTA button label.
   */
  ctaLabel?: string;
}

export function HeroVideoSection({
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  posterSrc = heroPoster,
  ctaTo = "/shop",
  ctaLabel = "SHOP HERE",
}: HeroVideoSectionProps) {
  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] min-h-[560px] max-h-[1080px] overflow-hidden bg-black select-none">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="w-full h-full object-cover object-center scale-[1.01] pointer-events-none"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Subtle cinematic gradient vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Overlaid Minimal CTA Button (Broken Planet style) */}
      <div className="absolute bottom-10 sm:bottom-14 md:bottom-16 inset-x-0 z-20 flex items-center justify-center px-4">
        <div className="relative group">
          {/* Pulsing ambient glow aura */}
          <div className="absolute -inset-1 rounded-full bg-white/40 blur-md opacity-75 animate-pulse pointer-events-none group-hover:opacity-100 transition-opacity" />

          {/* Main CTA Button */}
          <Link
            to={ctaTo}
            className="relative flex items-center gap-3 bg-white text-zinc-950 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-display text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] shadow-[0_10px_35px_rgba(0,0,0,0.4)] border border-white/60 hover:bg-zinc-100 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer"
          >
            {/* Blinking / pulsing status dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>

            <span>{ctaLabel}</span>

            <ArrowRight className="h-4 w-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
