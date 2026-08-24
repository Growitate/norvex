import { useEffect, useState } from "react";

interface WrittenLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light";
  /**
   * If true, types out the logo letter by letter on mount.
   */
  animateOnMount?: boolean;
  onAnimationComplete?: () => void;
}

const FULL_NORVA = "NØRVA";
const FULL_STORE = "STORE";

export function WrittenLogo({
  className = "",
  size = "md",
  variant = "dark",
  animateOnMount = false,
  onAnimationComplete,
}: WrittenLogoProps) {
  // If animateOnMount is false, show full text immediately
  const [norvaText, setNorvaText] = useState(animateOnMount ? "" : FULL_NORVA);
  const [storeText, setStoreText] = useState(animateOnMount ? "" : FULL_STORE);
  const [isTyping, setIsTyping] = useState(animateOnMount);

  useEffect(() => {
    if (!animateOnMount) {
      setNorvaText(FULL_NORVA);
      setStoreText(FULL_STORE);
      setIsTyping(false);
      return;
    }

    let norvaIdx = 0;
    let storeIdx = 0;
    let timeoutId: any;

    const typeNext = () => {
      if (norvaIdx < FULL_NORVA.length) {
        norvaIdx++;
        setNorvaText(FULL_NORVA.slice(0, norvaIdx));
        timeoutId = setTimeout(typeNext, 90);
      } else if (storeIdx < FULL_STORE.length) {
        storeIdx++;
        setStoreText(FULL_STORE.slice(0, storeIdx));
        timeoutId = setTimeout(typeNext, 90);
      } else {
        // Typing finished
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          if (onAnimationComplete) onAnimationComplete();
        }, 500);
      }
    };

    // Small initial delay before typing starts
    timeoutId = setTimeout(typeNext, 120);

    return () => clearTimeout(timeoutId);
  }, [animateOnMount, onAnimationComplete]);

  // Size styles matching the user's reference image
  const sizeStyles = {
    sm: {
      norva: "text-base sm:text-lg font-bold tracking-[0.25em]",
      store: "text-xs sm:text-sm font-normal tracking-[0.25em]",
      gap: "gap-2.5",
    },
    md: {
      norva: "text-lg sm:text-xl font-bold tracking-[0.28em]",
      store: "text-xs sm:text-sm font-normal tracking-[0.28em]",
      gap: "gap-3",
    },
    lg: {
      norva: "text-2xl sm:text-3xl font-bold tracking-[0.3em]",
      store: "text-base sm:text-lg font-normal tracking-[0.3em]",
      gap: "gap-4",
    },
    xl: {
      norva: "text-4xl sm:text-5xl font-bold tracking-[0.32em]",
      store: "text-xl sm:text-2xl font-normal tracking-[0.32em]",
      gap: "gap-5",
    },
  }[size];

  const colorStyles =
    variant === "light"
      ? {
        norva: "text-white",
        store: "text-white/80",
        cursor: "bg-white",
      }
      : {
        norva: "text-zinc-950",
        store: "text-zinc-500",
        cursor: "bg-zinc-900",
      };

  return (
    <div className={`inline-flex items-center select-none ${sizeStyles.gap} ${className}`}>
      {/* NØRVA Part */}
      <span className={`uppercase font-display transition-all ${sizeStyles.norva} ${colorStyles.norva}`}>
        {norvaText || (isTyping ? "" : FULL_NORVA)}
      </span>

      {/* STORE Part */}
      {(storeText || (!isTyping && FULL_STORE)) && (
        <span className={`uppercase font-display transition-all ${sizeStyles.store} ${colorStyles.store}`}>
          {storeText || (!isTyping ? FULL_STORE : "")}
        </span>
      )}

      {/* Typing cursor that blinks while typing and disappears when done */}
      {isTyping && (
        <span className={`inline-block -ml-1.5 w-[2px] h-[1.1em] animate-pulse align-middle ${colorStyles.cursor}`} />
      )}
    </div>
  );
}
