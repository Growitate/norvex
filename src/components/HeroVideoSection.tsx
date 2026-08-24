import { Link } from "@tanstack/react-router";
import heroVideo from "@/assets/hero banner vdo.mp4";

interface HeroVideoSectionProps {
  /**
   * Background video source.
   */
  videoSrc?: string;
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
  videoSrc = heroVideo,
  ctaTo = "/shop",
  ctaLabel = "SHOP HERE",
}: HeroVideoSectionProps) {
  return (
    <section data-header-theme="dark" className="relative w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] min-h-[560px] max-h-[1080px] overflow-hidden bg-black select-none">
      {/* Background Video Only - No Poster Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.01] pointer-events-none"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Subtle cinematic gradient vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Centered Overlaid CTA (Broken Planet style) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-3 xs:px-4">
        <Link
          to={ctaTo}
          className="pointer-events-auto group cursor-pointer flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none select-none max-w-full"
          aria-label={ctaLabel}
        >
          {/* Large Bold Pulsing Centered Title in Clash Display */}
          <h1 className="font-clash font-bold text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] animate-pulse group-hover:animate-none group-hover:text-zinc-100 transition-colors px-2">
            {ctaLabel}
          </h1>
        </Link>
      </div>
    </section>
  );
}
