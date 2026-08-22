import { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export function OpeningLoader() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Ensure viewport starts at the top of the page on initial load
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    // As text slightly fades, navigate to '/' and fade out loader onto homepage
    const timer = setTimeout(() => {
      router.navigate({ to: "/", replace: true });
      setVisible(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="norva-opening-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white select-none overflow-hidden"
        >
          {/* Ambient subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_65%)] pointer-events-none" />

          {/* Centered Logo: Written text slightly fades smoothly without any blink */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 0.45,
              scale: 0.99,
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 text-center"
          >
            {/* Already Written Main Brand Title */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white tracking-[0.22em] drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]">
              <span>NØRVA</span>
              <span className="text-zinc-400 font-light tracking-[0.25em]">STORE</span>
            </div>

            {/* Subtitle Tagline */}
            <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.38em] text-zinc-400 mt-1">
              Y2K & GOTHIC FASHION // EST. 2026
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
