import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import splashLogo from "@/assets/norva_splash_logo.png";

export function OpeningLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.body.style.overflow = "hidden";
    }

    const timer = setTimeout(() => {
      setVisible(false);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    }, 1300);

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="norva-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            backgroundColor: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {/* Pure clean Norva logo without any boxes, outlines, or borders */}
          <motion.img
            src={splashLogo}
            alt="NORVA"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: [0, 1, 0.35, 0.9, 0.9],
              scale: [0.95, 1, 1, 1, 1],
            }}
            transition={{
              duration: 1.3,
              times: [0, 0.35, 0.65, 0.85, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              width: "min(80vw, 420px)",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
