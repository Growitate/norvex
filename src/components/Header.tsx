import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  X,
  ArrowRight,
  User,
  Heart,
  MessageCircle,
  Mail,
  Instagram,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import { WrittenLogo } from "./WrittenLogo";

export function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState("");

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const setCartOpen = useCart((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when menu drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleDrawerSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (drawerSearch.trim()) {
      setMenuOpen(false);
      navigate({
        to: "/shop",
        search: { q: drawerSearch.trim() },
      });
      setDrawerSearch("");
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            : "bg-white border-b border-black/[0.06]"
        }`}
      >
        <div className="mx-auto grid grid-cols-3 items-center h-14 sm:h-16 px-4 sm:px-6 md:px-8 max-w-[1600px]">
          {/* Left: 3-line hamburger menu icon */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="group flex items-center justify-center p-2.5 -ml-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-900 cursor-pointer"
            >
              <div className="w-[19px] h-[13px] flex flex-col justify-between py-[0.5px]">
                <span className="block w-full h-[1.75px] bg-zinc-900 rounded-full transition-transform duration-200 group-hover:scale-x-110 group-hover:origin-left" />
                <span className="block w-full h-[1.75px] bg-zinc-900 rounded-full transition-transform duration-200" />
                <span className="block w-full h-[1.75px] bg-zinc-900 rounded-full transition-transform duration-200 group-hover:scale-x-110 group-hover:origin-left" />
              </div>
            </button>
          </div>

          {/* Center: Brand Logo centered */}
          <div className="flex items-center justify-center text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center group focus:outline-none transition-opacity hover:opacity-80"
            >
              <WrittenLogo size="md" />
            </Link>
          </div>

          {/* Right: Search and Cart icons */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 -mr-1.5">
            <button
              aria-label="Search catalog"
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-900 cursor-pointer"
            >
              <Search className="h-[18px] w-[18px] stroke-[1.75] text-zinc-900" />
            </button>

            <button
              aria-label="Shopping bag"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-900 cursor-pointer"
            >
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.75] text-zinc-900" />
              {count > 0 && (
                <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold leading-none text-white ring-2 ring-white px-1">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* NUDE-PROJECT INSPIRED MENU DRAWER WITH STORE CATEGORIES & BRAND NAVIGATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-out Drawer Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[92vw] max-w-[400px] h-full bg-white text-zinc-900 flex flex-col border-r border-black/[0.08] shadow-2xl z-10 overflow-hidden"
            >
              {/* 1. TOP HEADER BAR: (X Close, Logo, Action Icons Row) */}
              <div className="flex h-14 sm:h-16 items-center justify-between px-5 sm:px-6 border-b border-black/[0.06] bg-white shrink-0">
                {/* Close (X) Icon */}
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 -ml-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-900 cursor-pointer"
                >
                  <X className="h-5 w-5 stroke-[1.75]" />
                </button>

                {/* Brand Logo */}
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center hover:opacity-85 transition-opacity px-2"
                >
                  <WrittenLogo size="sm" />
                </Link>

                {/* Right Action Icons Row: Search, Account, Wishlist, Bag */}
                <div className="flex items-center gap-1 sm:gap-1.5 -mr-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSearchOpen(true);
                    }}
                    aria-label="Search"
                    className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-800 cursor-pointer"
                  >
                    <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[1.75]" />
                  </button>

                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Account"
                    className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-800 cursor-pointer"
                  >
                    <User className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[1.75]" />
                  </Link>

                  <Link
                    to="/shop"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Wishlist"
                    className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-800 cursor-pointer"
                  >
                    <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[1.75]" />
                  </Link>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setCartOpen(true);
                    }}
                    aria-label="Shopping bag"
                    className="relative p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-zinc-800 cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[1.75]" />
                    {count > 0 && (
                      <span className="absolute top-1 right-1 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-black text-[9px] font-bold leading-none text-white ring-2 ring-white px-0.5">
                        {count}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* 2. SEARCH BAR (Directly Below Top Header) */}
              <div className="border-b border-black/[0.08] px-5 sm:px-6 py-2.5 bg-zinc-50/60 shrink-0">
                <form onSubmit={handleDrawerSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    placeholder="Type to Search"
                    className="w-full bg-transparent font-sans text-xs sm:text-[13px] text-zinc-900 placeholder:text-zinc-400 placeholder:italic focus:outline-none py-1"
                  />
                  {drawerSearch && (
                    <button
                      type="button"
                      onClick={() => setDrawerSearch("")}
                      className="text-zinc-400 hover:text-zinc-700 p-1 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </form>
              </div>

              {/* 3. MAIN SCROLLABLE CONTENT */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-between scrollbar-none space-y-8">
                <div className="space-y-7">
                  {/* LARGE EDITORIAL HEADING AREA */}
                  <div className="space-y-0.5">
                    <Link
                      to="/shop"
                      search={{ category: "Clothing" }}
                      onClick={() => setMenuOpen(false)}
                      className="block font-serif text-[32px] sm:text-[36px] font-bold text-[#2a1711] hover:text-black tracking-tight leading-[1.08] transition-colors"
                    >
                      Clothing
                    </Link>
                    <Link
                      to="/shop"
                      search={{ category: "Women exclusive" }}
                      onClick={() => setMenuOpen(false)}
                      className="block font-serif text-[32px] sm:text-[36px] font-bold text-[#2a1711] hover:text-black tracking-tight leading-[1.08] transition-colors"
                    >
                      Women exclusive
                    </Link>
                  </div>

                  {/* 4. PRODUCT CATEGORIES (With Right Arrows →) */}
                  <ul className="space-y-4 pt-1">
                    <li>
                      <Link
                        to="/shop"
                        search={{ category: "Clothing" }}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between group py-1 text-zinc-900 hover:text-black font-sans text-[15px] sm:text-base font-medium tracking-tight transition-colors"
                      >
                        <span>Clothing</span>
                        <ArrowRight className="h-4 w-4 stroke-[1.5] text-zinc-600 transition-transform duration-200 group-hover:translate-x-1.5" />
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/shop"
                        search={{ category: "Accessories" }}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between group py-1 text-zinc-900 hover:text-black font-sans text-[15px] sm:text-base font-medium tracking-tight transition-colors"
                      >
                        <span>Accessories</span>
                        <ArrowRight className="h-4 w-4 stroke-[1.5] text-zinc-600 transition-transform duration-200 group-hover:translate-x-1.5" />
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/shop"
                        search={{ category: "Women exclusive" }}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between group py-1 text-zinc-900 hover:text-black font-sans text-[15px] sm:text-base font-medium tracking-tight transition-colors"
                      >
                        <span>Women exclusive</span>
                        <ArrowRight className="h-4 w-4 stroke-[1.5] text-zinc-600 transition-transform duration-200 group-hover:translate-x-1.5" />
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/shop"
                        search={{ category: "Mens exclusive" }}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between group py-1 text-zinc-900 hover:text-black font-sans text-[15px] sm:text-base font-medium tracking-tight transition-colors"
                      >
                        <span>Mens exclusive</span>
                        <ArrowRight className="h-4 w-4 stroke-[1.5] text-zinc-600 transition-transform duration-200 group-hover:translate-x-1.5" />
                      </Link>
                    </li>
                  </ul>

                  {/* 5. LOWER SECTION: BRAND & ESSENTIAL NAVIGATION */}
                  <div className="space-y-3.5 pt-6 border-t border-black/[0.06]">
                    <ul className="space-y-3.5">
                      <li>
                        <Link
                          to="/"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between group py-0.5 text-zinc-800 hover:text-black font-sans text-sm sm:text-[15px] font-normal tracking-tight transition-colors"
                        >
                          <span>Home</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/shop"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between group py-0.5 text-zinc-800 hover:text-black font-sans text-sm sm:text-[15px] font-normal tracking-tight transition-colors"
                        >
                          <span>Full Catalog</span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[1.5] text-zinc-500 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/about"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between group py-0.5 text-zinc-800 hover:text-black font-sans text-sm sm:text-[15px] font-normal tracking-tight transition-colors"
                        >
                          <span>About Us</span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[1.5] text-zinc-500 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/contact"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between group py-0.5 text-zinc-800 hover:text-black font-sans text-sm sm:text-[15px] font-normal tracking-tight transition-colors"
                        >
                          <span>Contact Us</span>
                          <ArrowRight className="h-3.5 w-3.5 stroke-[1.5] text-zinc-500 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/about"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between group py-0.5 text-zinc-800 hover:text-black font-sans text-sm sm:text-[15px] font-normal tracking-tight transition-colors"
                        >
                          <span>Norva Members</span>
                          <span className="text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                            VIP
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 6. DRAWER FOOTER & SUPPORT INFO */}
                <div className="space-y-4 pt-6 border-t border-black/[0.08]">
                  <div className="flex items-center justify-between text-[11px] font-display uppercase tracking-wider text-zinc-500 font-semibold">
                    <span>Customer Support</span>
                    <span className="text-zinc-800">IN · INR (₹)</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://wa.me/919971303047"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-black/15 bg-white hover:bg-black hover:text-white text-zinc-900 py-2 px-3 rounded-md text-[11px] font-display uppercase tracking-wider font-semibold transition-colors shadow-xs"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="mailto:norvastorex@gmail.com"
                      className="flex-1 flex items-center justify-center gap-2 border border-black/15 bg-white hover:bg-black hover:text-white text-zinc-900 py-2 px-3 rounded-md text-[11px] font-display uppercase tracking-wider font-semibold transition-colors shadow-xs"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email</span>
                    </a>
                    <a
                      href="https://instagram.com/norvaxstore"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="flex items-center justify-center border border-black/15 bg-white hover:bg-black hover:text-white text-zinc-900 p-2 rounded-md transition-colors shadow-xs"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <div className="text-[10px] font-sans text-zinc-400 flex items-center justify-between pt-1">
                    <span>NØRVA STORE © 2026</span>
                    <span className="text-zinc-500 font-medium">All Rights Reserved</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
