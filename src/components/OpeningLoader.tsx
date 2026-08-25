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

    // 1400ms display, then exit animation smooth transition
    const t = setTimeout(() => {
      setVisible(false);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    }, 1400);

    return () => {
      clearTimeout(t);
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
            scale: 1.04,
            filter: "blur(4px)",
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {/* Animated Norva Splash Logo */}
          <motion.img
            src={splashLogo}
            alt="NORVA"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{
              opacity: [0, 1, 0.85, 1],
              scale: [0.92, 1, 0.98, 1],
              y: 0,
            }}
            transition={{
              duration: 1.3,
              times: [0, 0.4, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: "min(80vw, 420px)",
              height: "auto",
              objectFit: "contain",
              mixBlendMode: "screen",
            }}
          />

          {/* Minimalist Progress Line indicator */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 0.8 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mt-6 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
