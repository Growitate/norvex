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
        // Once completely written, hold briefly and smoothly fade out to reveal home page
        setTimeout(() => {
          setVisible(false);
        }, 400);
      }
    }, 90);

    // Hard safety timeout
    const safetyTimer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, [totalLetters]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="broken-planet-opening-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1d1d23] text-white select-none pointer-events-none overflow-hidden"
        >
          {/* Subtle atmospheric ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_65%)] pointer-events-none" />

          {/* Centered Website Name: Smooth Letter-by-Letter Glide Animation */}
          <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-5 px-6">
            {/* NØRVA Part (Bold White) */}
            <div className="inline-flex items-center gap-[0.24em] font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-[0.2em]">
              {NORVA_LETTERS.map((char, index) => {
                const isRevealed = index < activeStep;
                return (
                  <motion.span
                    key={`norva-${index}`}
                    initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 5, filter: "blur(3px)" }
                    }
                    transition={{
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>

            {/* STORE Part (Sleek Light Zinc/Gray) */}
            <div className="inline-flex items-center gap-[0.24em] font-display font-normal text-base sm:text-lg md:text-xl uppercase text-zinc-400 tracking-[0.22em]">
              {STORE_LETTERS.map((char, index) => {
                const globalIndex = NORVA_LETTERS.length + index;
                const isRevealed = globalIndex < activeStep;
                return (
                  <motion.span
                    key={`store-${index}`}
                    initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 5, filter: "blur(3px)" }
                    }
                    transition={{
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}

              {/* Glowing writing cursor that gently fades once done */}
              {activeStep < totalLetters && (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 0.45, ease: "easeInOut" }}
                  className="inline-block w-[2px] h-[1.1em] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] ml-0.5 align-middle"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
