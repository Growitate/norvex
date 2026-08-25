import { useState, useEffect, useRef } from "react";
import { Instagram, MessageSquare, X, Send, Sparkles } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA==";
const INSTAGRAM_DM_URL = "https://ig.me/m/norvaxstore";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 select-none">
      {/* Interactive Popup Card (Sleek Luxury Modern Aesthetic) */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-72 xs:w-80 bg-white/95 backdrop-blur-2xl border border-black/10 rounded-2xl shadow-2xl p-4 sm:p-5 text-zinc-900 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px] flex items-center justify-center shadow-xs shrink-0">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-zinc-950" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-zinc-950">
                    Norva Support
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200/80">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-sans">@norvaxstore on Instagram</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close support card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-zinc-600 font-sans leading-relaxed mb-4">
            Have questions about drops, sizing, or orders? Chat directly with us on Instagram for quick responses.
          </p>

          {/* Action Buttons */}
          <div className="space-y-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between w-full py-3 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-white" />
                <span>Chat on Instagram</span>
              </div>
              <Send className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 border border-black/15 text-zinc-900 font-sans text-[11px] font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Open Direct Message (DM)</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Instagram Chat & Customer Support"
        className="group relative w-12 h-12 xs:w-13 xs:h-13 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
      >
        {/* Pulsing Online Green Status Dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />

        {/* Icon: Instagram icon when open, Chat bubble icon when closed */}
        {isOpen ? (
          <X className="h-5 w-5 text-white transition-transform duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="h-5 w-5 fill-white text-white transition-transform group-hover:scale-105" />
            <Instagram className="h-2.5 w-2.5 text-black absolute top-0.5 right-0.5 fill-black" />
          </div>
        )}
      </button>
    </div>
  );
}
