import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Smartphone,
  CreditCard,
  Key,
  Headphones,
  Sparkles,
  Glasses,
  Check,
  AlertCircle,
  ShoppingBag,
  BookOpen,
  Maximize2,
} from "lucide-react";
import { useEffect } from "react";
import type { Product, WhatFitsItem } from "@/lib/products";

interface WhatFitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function WhatFitsModal({ isOpen, onClose, product }: WhatFitsModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = product.whatFits || [];
  const fittingItems = items.filter((i) => i.fits);
  const nonFittingItems = items.filter((i) => !i.fits);
  const capacityPercent = Math.round((fittingItems.length / Math.max(items.length, 1)) * 100);

  const getIcon = (iconName: WhatFitsItem["iconName"]) => {
    switch (iconName) {
      case "phone":
        return <Smartphone className="h-4 w-4 text-zinc-900" />;
      case "wallet":
        return <CreditCard className="h-4 w-4 text-zinc-900" />;
      case "keys":
        return <Key className="h-4 w-4 text-zinc-900" />;
      case "headphones":
        return <Headphones className="h-4 w-4 text-zinc-900" />;
      case "cosmetics":
        return <Sparkles className="h-4 w-4 text-zinc-900" />;
      case "glasses":
        return <Glasses className="h-4 w-4 text-zinc-900" />;
      case "notebook":
      case "tablet":
        return <BookOpen className="h-4 w-4 text-zinc-900" />;
      default:
        return <ShoppingBag className="h-4 w-4 text-zinc-900" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-xl bg-white text-zinc-900 shadow-2xl rounded-sm border border-black/10 overflow-hidden z-10 my-auto select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-black/10 bg-zinc-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 stroke-[2]" />
                </div>
                <div>
                  <span className="font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-brand text-zinc-500">
                    Capacity Guide
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-tight text-zinc-950">
                    What fits in this bag?
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full hover:bg-black/5 active:scale-95 flex items-center justify-center text-zinc-600 hover:text-black transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 stroke-[1.75]" />
              </button>
            </div>

            {/* Bag Overview Bar */}
            <div className="px-5 sm:px-6 py-4 bg-white border-b border-black/5 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-zinc-100 border border-black/10 rounded-sm overflow-hidden p-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-900 truncate">
                  {product.name}
                </h4>
                {product.dimensions && (
                  <p className="text-[11px] sm:text-xs text-zinc-500 font-sans">
                    <span className="font-semibold text-zinc-700">Dimensions:</span> {product.dimensions.height} (H) × {product.dimensions.width} (W) × {product.dimensions.depth} (D)
                  </p>
                )}
                {product.dimensions?.volume && (
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-100 border border-black/10 text-[10px] font-display uppercase tracking-wider font-semibold text-zinc-800">
                      <Maximize2 className="h-2.5 w-2.5" />
                      Vol: {product.dimensions.volume}
                    </span>
                    <span className="text-[10px] font-sans text-emerald-600 font-medium">
                      ✓ Fits {fittingItems.length} everyday essentials
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Items Checklist Container */}
            <div className="px-5 sm:px-6 py-5 max-h-[60vh] overflow-y-auto space-y-5">
              {/* Fits inside */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-display text-[11px] uppercase tracking-brand font-bold text-zinc-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Fits Comfortably ({fittingItems.length})
                  </h5>
                  <span className="text-[10px] font-sans text-zinc-500">Everyday carry items</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {fittingItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-3 p-2.5 rounded-md border border-black/[0.08] bg-zinc-50/60 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-md bg-white border border-black/10 flex items-center justify-center shrink-0 shadow-2xs">
                        {getIcon(item.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-600 stroke-[3] shrink-0" />
                          <span className="text-xs font-semibold text-zinc-900 truncate">
                            {item.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-sans mt-0.5 leading-tight">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Does not fit inside (if any) */}
              {nonFittingItems.length > 0 && (
                <div className="pt-2 border-t border-black/10">
                  <h5 className="font-display text-[11px] uppercase tracking-brand font-bold text-zinc-500 mb-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-400" />
                    Exceeds Capacity ({nonFittingItems.length})
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 opacity-75">
                    {nonFittingItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start gap-3 p-2.5 rounded-md border border-dashed border-black/15 bg-zinc-100/40"
                      >
                        <div className="w-8 h-8 rounded-md bg-white/80 border border-black/10 flex items-center justify-center shrink-0 text-zinc-400">
                          {getIcon(item.iconName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <AlertCircle className="h-3 w-3 text-amber-600 stroke-[2] shrink-0" />
                            <span className="text-xs font-medium text-zinc-700 truncate">
                              {item.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 font-sans mt-0.5 leading-tight">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action */}
            <div className="p-4 sm:px-6 bg-zinc-50 border-t border-black/10 flex items-center justify-between gap-3">
              <div className="text-[11px] text-zinc-500 font-sans hidden sm:block">
                All measurements provided in metric standard (cm).
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-black text-white hover:bg-zinc-800 text-xs font-display font-bold uppercase tracking-brand rounded-xs transition-colors cursor-pointer ml-auto"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
