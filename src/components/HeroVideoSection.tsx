import { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if video is already ready
    if (video.readyState >= 2) {
      setIsReady(true);
    }

    const handlePlay = () => setIsReady(true);
    video.addEventListener("playing", handlePlay);
    video.addEventListener("loadeddata", handlePlay);
    video.addEventListener("canplay", handlePlay);

    // Force play on mount to ensure immediate playback on route transition
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsReady(true)).catch(() => {});
    }

    return () => {
      video.removeEventListener("playing", handlePlay);
      video.removeEventListener("loadeddata", handlePlay);
      video.removeEventListener("canplay", handlePlay);
    };
  }, [videoSrc]);

  return (
    <section data-header-theme="dark" className="relative w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] min-h-[560px] max-h-[1080px] overflow-hidden bg-black select-none">
      {/* Background Video Only - Smooth Fade-In */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onPlaying={() => setIsReady(true)}
          className={`w-full h-full object-cover object-center scale-[1.01] pointer-events-none transition-opacity duration-500 ease-out ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
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
