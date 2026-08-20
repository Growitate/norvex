import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NORVA_LETTERS = ["N", "Ø", "R", "V", "A"];
const STORE_LETTERS = ["S", "T", "O", "R", "E"];

export function OpeningLoader() {
  const [visible, setVisible] = useState(true);
  const [activeStep, setActiveStep] = useState(0); // 0 to 10
  const totalLetters = NORVA_LETTERS.length + STORE_LETTERS.length;

  useEffect(() => {
    // Ensure viewport starts at the top of the home page on initial load
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    // Sequentially advance letter step for smooth typewriter writing flow
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);

      if (step >= totalLetters) {
        clearInterval(interval);
        // Once completely written, hold for 600ms so name is clearly readable before opening homepage
        setTimeout(() => {
          setVisible(false);
        }, 600);
      }
    }, 90);

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
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#09090b] text-white select-none overflow-hidden"
        >
          {/* Ambient subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_65%)] pointer-events-none" />

          {/* Centered Website Name: Typewriter Write-Up Effect */}
          <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 md:gap-6 px-6">
            {/* NØRVA Part (Bold White Serif) */}
            <div className="inline-flex items-center gap-[0.2em] font-serif font-bold text-3xl sm:text-5xl md:text-6xl uppercase text-white tracking-[0.25em]">
              {NORVA_LETTERS.map((char, index) => {
                const isRevealed = index < activeStep;
                return (
                  <motion.span
                    key={`norva-${index}`}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 8, filter: "blur(4px)" }
                    }
                    transition={{
                      duration: 0.25,
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
            <div className="inline-flex items-center gap-[0.2em] font-sans font-light text-xl sm:text-3xl md:text-4xl uppercase text-zinc-400 tracking-[0.28em] relative">
              {STORE_LETTERS.map((char, index) => {
                const globalIndex = NORVA_LETTERS.length + index;
                const isRevealed = globalIndex < activeStep;
                return (
                  <motion.span
                    key={`store-${index}`}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 8, filter: "blur(4px)" }
                    }
                    transition={{
                      duration: 0.25,
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
                  className="inline-block w-[3px] h-[1.1em] bg-white shadow-[0_0_12px_rgba(255,255,255,1)] ml-1.5 align-middle"
                />
              )}
            </div>
          </div>

          {/* Subtitle Tagline */}
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={activeStep >= totalLetters ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.4 }}
            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mt-6 relative z-10"
          >
            Y2K & GOTHIC FASHION // EST. 2026
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
