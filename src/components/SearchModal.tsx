import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X, ArrowRight, ShoppingBag } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TAGS = ["Shoulder Bags", "Crossbody", "Gothic Metal", "Mini Bags", "Cyberpunk", "Chrome"];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const results: Product[] = query.trim()
    ? products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-start sm:pt-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 flex flex-col w-full h-[90vh] sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:mx-auto bg-white text-zinc-900 border-t sm:border border-black/10 sm:rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Mobile handle indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1 bg-black/20 rounded-full" />
        </div>

        {/* Input Header */}
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b border-black/10 bg-zinc-50">
          <Search className="h-5 w-5 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search statement bags..."
            className="flex-1 bg-transparent py-2 text-base sm:text-sm font-display tracking-wide uppercase text-zinc-900 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 rounded-full hover:bg-black/5 text-zinc-500 hover:text-black"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 text-zinc-500 hover:text-black cursor-pointer"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results / Popular Searches */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
          {query.trim() === "" ? (
            <div>
              <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-500 mb-3 font-semibold">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="border border-black/15 bg-black/5 hover:bg-black/10 px-3.5 py-2 rounded-full font-display text-[11px] uppercase tracking-brand text-zinc-700 hover:text-black transition-colors cursor-pointer min-h-[36px] flex items-center"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-500 mb-3 font-semibold">
                Trending Items
              </p>
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 2).map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 border border-black/10 rounded-sm bg-zinc-50 hover:bg-zinc-100 transition-colors"
                  >
                    <img src={p.image} alt={p.name} className="w-12 h-14 object-cover rounded-xs" />
                    <div className="min-w-0">
                      <p className="font-display text-[10px] uppercase tracking-brand text-zinc-900 truncate font-semibold">{p.name}</p>
                      <p className="text-[10px] text-zinc-600 font-semibold">₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="font-display text-[10px] uppercase tracking-brand-wide text-zinc-500">
                Found {results.length} {results.length === 1 ? "result" : "results"}
              </p>
              <div className="grid gap-3">
                {results.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-4 p-3 border border-black/10 rounded-sm bg-zinc-50 hover:bg-zinc-100 transition-colors group"
                  >
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      onClick={onClose}
                      className="flex items-center gap-4 min-w-0 flex-1"
                    >
                      <img src={p.image} alt={p.name} className="w-14 h-16 object-cover rounded-xs shrink-0" />
                      <div className="min-w-0">
                        <p className="font-display text-xs uppercase tracking-brand text-zinc-900 group-hover:text-zinc-600 truncate font-semibold">
                          {p.name}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-brand text-zinc-500">{p.category}</p>
                        <p className="mt-1 font-display text-xs text-zinc-900 font-bold">₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        add({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                          size: p.sizes[0],
                        });
                      }}
                      className="p-2.5 rounded-full bg-zinc-900 hover:bg-black text-white transition-colors cursor-pointer shrink-0"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-display text-sm uppercase tracking-brand text-zinc-500">
                No statement bags match "{query}"
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Try searching for 'Shoulder', 'Crossbody', or 'Gothic'
              </p>
            </div>
          )}
        </div>

        {/* View all catalog link */}
        <div className="border-t border-black/10 p-4 bg-zinc-50 text-center">
          <Link
            to="/shop"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-brand-wide text-zinc-700 hover:text-black font-semibold"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
