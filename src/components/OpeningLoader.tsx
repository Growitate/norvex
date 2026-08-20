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
        // Once completely written, hold briefly and smoothly reveal the home page
        setTimeout(() => {
          setVisible(false);
        }, 380);
      }
    }, 75);

    // Hard safety timeout
    const safetyTimer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, [totalLetters]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="norva-opening-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -12,
            scale: 1.01,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#18181b] text-white select-none pointer-events-none overflow-hidden"
        >
          {/* Ambient subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />

          {/* Centered Website Name: Smooth Letter-by-Letter Glide Animation */}
          <div className="relative z-10 flex items-center gap-2.5 sm:gap-3.5 md:gap-4 px-6">
            {/* NØRVA Part (Bold White) */}
            <div className="inline-flex items-center gap-[0.2em] font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-[0.2em]">
              {NORVA_LETTERS.map((char, index) => {
                const isRevealed = index < activeStep;
                return (
                  <motion.span
                    key={`norva-${index}`}
                    initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 4, filter: "blur(2px)" }
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

            {/* STORE Part (Sleek Silver/Zinc) */}
            <div className="inline-flex items-center gap-[0.2em] font-display font-normal text-base sm:text-lg md:text-xl uppercase text-zinc-400 tracking-[0.22em]">
              {STORE_LETTERS.map((char, index) => {
                const globalIndex = NORVA_LETTERS.length + index;
                const isRevealed = globalIndex < activeStep;
                return (
                  <motion.span
                    key={`store-${index}`}
                    initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 4, filter: "blur(2px)" }
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

              {/* Glowing writing cursor */}
              {activeStep < totalLetters && (
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                  className="inline-block w-[2px] h-[1.1em] bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] ml-1 align-middle"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
