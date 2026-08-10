import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import { MobileBottomNav } from "./MobileBottomNav";

type SubMenuItem = {
  label: string;
  to: string;
};

type MenuItem = {
  label: string;
  to: string;
  submenu?: SubMenuItem[];
};

const MENU_ITEMS: MenuItem[] = [
  { label: "HOME", to: "/" },
  { label: "CATALOG", to: "/shop" },
  {
    label: "FEATURED COLLECTIONS",
    to: "/shop",
    submenu: [
      { label: "SHOULDER BAGS", to: "/shop" },
      { label: "CROSSBODY BAGS", to: "/shop" },
      { label: "HARNESS TOTES", to: "/shop" },
      { label: "MINI SATCHELS", to: "/shop" },
    ],
  },
  { label: "ABOUT US", to: "/about" },
  { label: "CONTACT US", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const setCartOpen = useCart((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const bgCls = scrolled
    ? "bg-[#09090b]/95 backdrop-blur-md border-b border-white/10 text-white shadow-xl"
    : "bg-[#09090b] text-white border-b border-white/10";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-16 sm:h-20 transition-all duration-300 ${bgCls}`}
      >
        <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[60px_1fr_80px] sm:grid-cols-[80px_1fr_120px] items-center px-3 sm:px-6 md:px-8">
          {/* Left: Always-visible Hamburger menu trigger */}
          <div className="flex justify-start">
            <button
              className="flex items-center justify-center p-2.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center text-center">
            <Link to="/" className="flex items-center group">
              <span className="font-display font-bold text-base sm:text-2xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white group-hover:text-zinc-300 transition-colors whitespace-nowrap">
                NØRVA <span className="font-light text-zinc-400 text-xs sm:text-lg">STORE</span>
              </span>
            </Link>
          </div>

          {/* Right: Icons (Search, Cart) */}
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center p-2.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
            >
              <Search className="h-5 w-5 text-white" />
            </button>

            <button
              aria-label="Cart"
              className="relative flex items-center justify-center p-2.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5 text-white" />
              {count > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-white text-[10px] font-bold leading-none text-black ring-2 ring-black px-1">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer from the Left */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer content panel */}
          <div className="relative w-[85vw] max-w-[360px] h-full bg-[#0c0c0e] text-white flex flex-col border-r border-white/10 shadow-2xl transition-transform duration-300 translate-x-0 z-10">
            {/* Header close button */}
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
              <span className="font-display font-medium text-sm tracking-widest uppercase text-zinc-400">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-zinc-400" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="flex flex-col gap-6">
                {MENU_ITEMS.map((item) => {
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const isSubOpen = !!openSubmenus[item.label];

                  return (
                    <li key={item.label} className="border-b border-white/5 pb-4">
                      {hasSubmenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.label)}
                            className="w-full flex items-center justify-between font-display text-xl font-medium tracking-wide uppercase py-1 hover:text-zinc-300 transition-colors cursor-pointer text-left"
                          >
                            <span>{item.label}</span>
                            {isSubOpen ? (
                              <ChevronUp className="h-5 w-5 text-zinc-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-zinc-500" />
                            )}
                          </button>
                          
                          {/* Collapsible Submenu */}
                          {isSubOpen && (
                            <ul className="mt-3 ml-4 flex flex-col gap-3 border-l-2 border-white/10 pl-4 py-1">
                              {item.submenu!.map((subItem) => (
                                <li key={subItem.label}>
                                  <Link
                                    to={subItem.to}
                                    className="block font-display text-sm tracking-widest uppercase py-1 text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.to}
                          className="block font-display text-xl font-medium tracking-wide uppercase py-1 hover:text-zinc-300 transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />
    </>
  );
}
