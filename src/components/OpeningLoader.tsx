import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NORVA_LETTERS = ["N", "Ø", "R", "V", "A"];
const STORE_LETTERS = ["S", "T", "O", "R", "E"];

export function OpeningLoader() {
  const [visible, setVisible] = useState(true);
  const [activeStep, setActiveStep] = useState(0); // 0 to 10
  const totalLetters = NORVA_LETTERS.length + STORE_LETTERS.length;

  useEffect(() => {
    // Check if loader has already run during this browser session
    const hasSeen = sessionStorage.getItem("norva_loader_seen");
    if (hasSeen) {
      setVisible(false);
      return;
    }

    // Ensure viewport starts at the top of the home page on initial load
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    // Sequentially advance letter step for smooth typewriter writing flow
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);

      if (step >= totalLetters) {
        clearInterval(interval);
        // Once completely written, hold briefly then trigger curtain reveal to open homepage
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("norva_loader_seen", "true");
        }, 400);
      }
    }, 70);

    return () => {
      clearInterval(interval);
    };
  }, [totalLetters]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="norva-opening-loader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#09090b] text-white select-none overflow-hidden"
        >
          {/* Ambient subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none" />

          {/* Centered Website Name: Typewriter Write-Up Effect */}
          <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5 px-6">
            {/* NØRVA Part (Bold White Serif) */}
            <div className="inline-flex items-center gap-[0.18em] font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-[0.22em]">
              {NORVA_LETTERS.map((char, index) => {
                const isRevealed = index < activeStep;
                return (
                  <motion.span
                    key={`norva-${index}`}
                    initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 6, filter: "blur(3px)" }
                    }
                    transition={{
                      duration: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>

            {/* STORE Part (Minimal Muted Silver) */}
            <div className="inline-flex items-center gap-[0.18em] font-display font-light text-lg sm:text-xl md:text-2xl uppercase text-zinc-400 tracking-[0.24em] relative">
              {STORE_LETTERS.map((char, index) => {
                const globalIndex = NORVA_LETTERS.length + index;
                const isRevealed = globalIndex < activeStep;
                return (
                  <motion.span
                    key={`store-${index}`}
                    initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 6, filter: "blur(3px)" }
                    }
                    transition={{
                      duration: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}

              {/* Glowing Typewriter Cursor */}
              {activeStep < totalLetters && (
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.35, ease: "easeInOut" }}
                  className="inline-block w-[2px] h-[1.1em] bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] ml-1.5 align-middle"
                />
              )}
            </div>
          </div>

          {/* Subtitle Tagline */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={activeStep >= totalLetters ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-4 relative z-10"
          >
            Y2K & GOTHIC FASHION // EST. 2026
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
