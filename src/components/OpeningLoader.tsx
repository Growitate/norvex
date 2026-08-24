import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import splashLogo from "@/assets/norva_splash_logo.png";

const SPLASH_KEY = "norva_splash_shown";

export function OpeningLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    // 1400ms slow flicker, then 800ms fade exit = ~2.2s total
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="norva-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }}
          style={{ position: "fixed", inset: 0, zIndex: 100000, backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none" }}
        >
          {/* norvastore logo: full → 30% (slow dim) → 70% (slightly faded, holds) → exit */}
          <motion.img
            src={splashLogo}
            alt="norvastore"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.25, 0.7, 0.7] }}
            transition={{
              duration: 1.8,
              times: [0, 0.3, 0.6, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ width: "min(85vw, 480px)", height: "auto", objectFit: "contain", mixBlendMode: "screen" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}






