import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const CATEGORIES = ["All Bags", "Shoulder Bags", "Crossbody", "Totes & Backpacks", "Mini Bags"] as const;
type Cat = (typeof CATEGORIES)[number];

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Catalog — Nørva Store" },
      {
        name: "description",
        content:
          "Explore Nørva Store's curated collection of Y2K, gothic, and dark aesthetic bags. Limited-edition statement pieces.",
      },
      { property: "og:title", content: "Catalog — Nørva Store" },
      { property: "og:description", content: "Statement Y2K & Gothic Bags. Express your individuality." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<Cat>("All Bags");
  const filtered = cat === "All Bags" ? products : products.filter((p) => p.category === cat);

  return (
    <section className="bg-[#09090b] pt-28 sm:pt-40 text-white md:pt-48 min-h-screen">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <header className="border-b border-white/15 pb-6 sm:pb-8">
          <p className="font-display text-[10px] sm:text-[11px] uppercase tracking-brand-wide text-zinc-400">
            All Products · {products.length} Statement Pieces
          </p>
          <h1 className="mt-2 sm:mt-3 font-display text-3xl uppercase tracking-tight sm:text-7xl md:text-8xl text-white font-semibold">
            The Collection
          </h1>
        </header>

        {/* Filters */}
        <div
          className="sticky top-[56px] sm:top-[80px] z-20 -mx-4 flex gap-2 overflow-x-auto border-b border-white/10 bg-[#09090b]/95 backdrop-blur-md px-4 py-3 sm:py-4 md:-mx-8 md:px-8 scrollbar-none whitespace-nowrap"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 border px-4 sm:px-5 py-2 font-display text-[10px] sm:text-[11px] uppercase tracking-brand-wide transition-colors cursor-pointer min-h-[38px] flex items-center justify-center ${
                  active
                    ? "border-white bg-white text-black font-bold"
                    : "border-white/20 text-zinc-300 hover:border-white hover:text-white active:bg-white/10"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-14 py-12 md:grid-cols-3 md:gap-x-6 md:py-16">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-32 text-center text-xs uppercase tracking-brand text-zinc-400">
            No items found — check back soon for new drops
          </p>
        )}
      </div>
    </section>
  );
}
