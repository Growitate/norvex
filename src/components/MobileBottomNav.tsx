import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ShoppingBag, Search, Menu, Grid } from "lucide-react";
import { useCart } from "@/lib/cart";

interface MobileBottomNavProps {
  onOpenSearch: () => void;
  onOpenMenu: () => void;
}

export function MobileBottomNav({ onOpenSearch, onOpenMenu }: MobileBottomNavProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const setCartOpen = useCart((s) => s.setOpen);

  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/shop");

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#09090b]/95 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
      <nav className="grid grid-cols-5 h-14 max-w-lg mx-auto items-center px-1">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer active:scale-95 ${
            isHome ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[9px] font-display uppercase tracking-widest mt-1">Home</span>
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer active:scale-95 ${
            isShop ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Grid className="h-5 w-5" />
          <span className="text-[9px] font-display uppercase tracking-widest mt-1">Shop</span>
        </Link>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center h-full text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer active:scale-95"
          aria-label="Open Search"
        >
          <Search className="h-5 w-5" />
          <span className="text-[9px] font-display uppercase tracking-widest mt-1">Search</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center justify-center h-full text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer active:scale-95"
          aria-label="Open Bag"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-white text-[9px] font-bold leading-none text-black ring-2 ring-black px-1">
                {count}
              </span>
            )}
          </div>
          <span className="text-[9px] font-display uppercase tracking-widest mt-1">Bag</span>
        </button>

        {/* Menu */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center h-full text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer active:scale-95"
          aria-label="Open Navigation Menu"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[9px] font-display uppercase tracking-widest mt-1">Menu</span>
        </button>
      </nav>
    </div>
  );
}
