import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Sparkles } from "lucide-react";

type NavTab = {
  label: string;
  to: string;
  glow?: boolean;
  glowColors?: { inactive: string; active: string };
  hasDropdown?: boolean;
};

const FEATURED_SUBCATEGORIES = [
  { label: "SHOULDER BAGS", to: "/shop", category: "Shoulder Bags" },
  { label: "CROSSBODY BAGS", to: "/shop", category: "Crossbody" },
  { label: "HARNESS TOTES", to: "/shop", category: "Totes & Backpacks" },
  { label: "MINI SATCHELS", to: "/shop", category: "Mini Bags" },
  { label: "ALL STATEMENT DROPS", to: "/shop", category: "All Bags" },
];

const TABS: NavTab[] = [
  { label: "HOME", to: "/" },
  { label: "CATALOG", to: "/shop" },
  {
    label: "FEATURED COLLECTIONS⚡️",
    to: "/shop",
    glow: true,
    glowColors: { inactive: "#18181b", active: "#18181b" },
    hasDropdown: true,
  },
  { label: "ABOUT US", to: "/about" },
  { label: "CONTACT US", to: "/contact" },
];

export function CategoryNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [activeIdx, setActiveIdx] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update active index based on route
  useEffect(() => {
    if (pathname === "/") {
      setActiveIdx(0);
    } else if (pathname.startsWith("/shop")) {
      setActiveIdx(1);
    } else if (pathname.startsWith("/about")) {
      setActiveIdx(3);
    } else if (pathname.startsWith("/contact")) {
      setActiveIdx(4);
    }
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  // Center active tab
  useEffect(() => {
    const bar = barRef.current;
    const activeTab = tabsRef.current[activeIdx];
    if (!bar || !activeTab) return;

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
    <div className="w-full flex items-center justify-center">
      <div
        ref={barRef}
        className="flex items-center overflow-x-auto md:overflow-visible scrollbar-none whitespace-nowrap justify-center gap-1 sm:gap-2"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {TABS.map((tab, idx) => {
          const isActive = activeIdx === idx;

          if (tab.hasDropdown) {
            return (
              <div
                key={tab.label + idx}
                ref={dropdownRef}
                className="relative shrink-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen((prev) => !prev);
                  }}
                  className={`relative flex items-center gap-1.5 shrink-0 text-center py-5 sm:py-6 px-3.5 sm:px-5 font-display text-[11px] sm:text-[12px] font-semibold tracking-widest uppercase transition-all duration-200 hover:text-black cursor-pointer ${isActive || dropdownOpen
                    ? "text-black"
                    : "text-zinc-600"
                    } ${tab.glow ? "cat-nav-tab--glow" : ""}`}
                >
                  <span>FEATURED COLLECTIONS</span>
                  <Sparkles className="h-3.5 w-3.5 text-zinc-900 shrink-0" />
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-black font-bold" : "text-zinc-500"
                      }`}
                  />
                  {(isActive || dropdownOpen) && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-zinc-900" />
                  )}
                </button>

                {/* Clean Category Dropdown Modal matching reference image */}
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 min-w-[240px] bg-white border border-black/15 shadow-2xl rounded-2xl p-5 z-[100] transition-all duration-200 animate-in fade-in zoom-in-95 pointer-events-auto"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="border-l-2 border-zinc-400/80 pl-4 flex flex-col gap-3.5 py-1">
                      {FEATURED_SUBCATEGORIES.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          search={{ category: sub.category }}
                          onClick={() => {
                            setActiveIdx(idx);
                            setDropdownOpen(false);
                          }}
                          className="font-display text-xs font-medium tracking-widest text-zinc-700 hover:text-black transition-colors text-left uppercase cursor-pointer block"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={tab.label + idx}
              to={tab.to}
              ref={(el) => {
                tabsRef.current[idx] = el;
              }}
              onClick={() => setActiveIdx(idx)}
              className={`relative shrink-0 text-center py-5 sm:py-6 px-3.5 sm:px-5 font-display text-[11px] sm:text-[12px] font-semibold tracking-widest uppercase transition-all duration-200 hover:text-black ${isActive
                ? "text-black"
                : "text-zinc-600"
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
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-zinc-900" />
              )}
            </Link>
          );
        })}
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
