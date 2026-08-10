import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

type NavTab = {
  label: string;
  to: string;
  glow?: boolean;
  glowColors?: { inactive: string; active: string };
};

const TABS: NavTab[] = [
  { label: "HOME", to: "/" },
  { label: "CATALOG", to: "/shop" },
  {
    label: "FEATURED COLLECTIONS⚡️",
    to: "/shop",
    glow: true,
    glowColors: { inactive: "#ffffff", active: "#ffffff" },
  },
  { label: "SHOULDER BAGS", to: "/shop" },
  { label: "CROSSBODY BAGS", to: "/shop" },
  { label: "HARNESS TOTES", to: "/shop" },
  { label: "MINI SATCHELS", to: "/shop" },
  { label: "ABOUT US", to: "/about" },
  { label: "CONTACT US", to: "/contact" },
];

export function CategoryNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [activeIdx, setActiveIdx] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Update active index based on route
  useEffect(() => {
    if (pathname === "/") {
      setActiveIdx(0);
    } else if (pathname.startsWith("/shop")) {
      // For demo, if we click other tabs, we will just make them active internally for presentation
      // but they all point to /shop.
    }
  }, [pathname]);

  // Center active tab
  useEffect(() => {
    const bar = barRef.current;
    const activeTab = tabsRef.current[activeIdx];
    if (!bar || !activeTab) return;

    // Use requestAnimationFrame for correct layout dimensions
    requestAnimationFrame(() => {
      const barW = bar.offsetWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabW = activeTab.offsetWidth;
      bar.scrollTo({
        left: tabLeft - barW / 2 + tabW / 2,
        behavior: "smooth",
      });
    });
  }, [activeIdx]);

  return (
    <div className="w-full bg-[#09090b] border-b border-white/10 py-1">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div
          ref={barRef}
          className="flex overflow-x-auto overflow-y-hidden overscroll-x-contain scrollbar-none border-b-0 whitespace-nowrap"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {TABS.map((tab, idx) => {
            const isActive = activeIdx === idx;
            return (
              <Link
                key={tab.label + idx}
                to={tab.to}
                ref={(el) => {
                  tabsRef.current[idx] = el;
                }}
                onClick={() => setActiveIdx(idx)}
                className={`relative shrink-0 text-center py-2.5 sm:py-3 px-3 sm:px-4 font-display text-[11px] sm:text-[12px] font-medium tracking-wide uppercase transition-all duration-300 border-b-2 hover:text-white ${
                  isActive
                    ? "text-white border-white font-semibold"
                    : "text-zinc-400 border-transparent"
                } ${tab.glow ? "cat-nav-tab--glow" : ""}`}
                style={
                  tab.glow && tab.glowColors
                    ? ({
                        "--glow-inactive-color": tab.glowColors.inactive,
                        "--glow-active-color": tab.glowColors.active,
                        isolation: "isolate",
                      } as React.CSSProperties)
                    : {}
                }
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Hide scrollbars but keep functionality */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        
        /* Glow sweep and pulse animations matching target site */
        @keyframes cat-nav-glow-pulse {
          0% { box-shadow: 0 0 4px 1px var(--glow-color), 0 0 8px 2px var(--glow-color); }
          50% { box-shadow: 0 0 10px 3px var(--glow-color), 0 0 18px 6px var(--glow-color); }
          100% { box-shadow: 0 0 4px 1px var(--glow-color), 0 0 8px 2px var(--glow-color); }
        }

        @keyframes cat-nav-glow-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .cat-nav-tab--glow {
          position: relative;
          overflow: hidden;
        }

        .cat-nav-tab--glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 30%,
            var(--glow-sweep-color, transparent) 50%,
            transparent 70-80%
          );
          background-size: 200% 100%;
          animation: cat-nav-glow-sweep 2.5s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .cat-nav-tab--glow:not(.is-active)::before {
          --glow-sweep-color: var(--glow-inactive-color);
        }

        .cat-nav-tab--glow.is-active::before {
          --glow-sweep-color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
