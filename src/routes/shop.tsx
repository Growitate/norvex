import { createFileRoute, useSearch, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, type Product } from "@/lib/products";

const CATEGORIES = [
  "All",
  "Clothing",
  "Accessories",
  "Women exclusive",
  "Mens exclusive",
] as const;

type Cat = (typeof CATEGORIES)[number];

type ShopSearch = {
  category?: string;
  q?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    return {
      category: (search.category as string) || undefined,
      q: (search.q as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Catalog — Nørva Store" },
      {
        name: "description",
        content:
          "Explore Nørva Store's curated collection of statement bags, women's drops, heavyweight streetwear, and dark aesthetic accessories.",
      },
      { property: "og:title", content: "Catalog — Nørva Store" },
      {
        property: "og:description",
        content: "Statement Bags, Streetwear & Gothic Accessories. Express your individuality.",
      },
    ],
  }),
  component: Shop,
});

function matchesCategory(product: Product, selectedCategory: Cat | string): boolean {
  if (!selectedCategory || selectedCategory === "All") return true;

  const catLower = selectedCategory.toLowerCase().trim();

  if (catLower === "clothing" || catLower === "clothes") {
    return !product.isBag && product.category !== "Accessories";
  }

  if (catLower === "accessories") {
    return product.category === "Accessories";
  }

  if (
    catLower === "women exclusive" ||
    catLower === "womens exclusive" ||
    catLower === "female bags & clothes" ||
    catLower === "female"
  ) {
    return product.department === "female";
  }

  if (
    catLower === "mens exclusive" ||
    catLower === "men exclusive" ||
    catLower === "male clothes" ||
    catLower === "male"
  ) {
    return product.department === "male";
  }

  if (catLower === "bags") {
    return product.isBag;
  }

  return product.category.toLowerCase() === catLower;
}

function Shop() {
  const search = useSearch({ from: "/shop" });
  const navigate = useNavigate();
  const [cat, setCat] = useState<Cat>("All");

  useEffect(() => {
    if (search.category) {
      const decoded = decodeURIComponent(search.category);
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase() === decoded.toLowerCase() || c.toLowerCase() === search.category?.toLowerCase(),
      );
      if (matched) {
        setCat(matched);
      } else if (search.category.toLowerCase().includes("all")) {
        setCat("All");
      } else if (search.category.toLowerCase().includes("bag")) {
        setCat("Accessories");
      }
    } else {
      setCat("All");
    }
  }, [search.category]);

  const handleCategoryChange = (newCat: Cat) => {
    setCat(newCat);
    navigate({
      to: "/shop",
      search: {
        category: newCat === "All" ? undefined : newCat,
        q: search.q || undefined,
      },
      replace: true,
    });
  };

  const query = (search.q || "").toLowerCase().trim();

  const filtered = products.filter((p) => {
    const matchesCat = matchesCategory(p, cat);
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  return (
    <section className="bg-white pt-24 sm:pt-36 text-zinc-900 md:pt-40 min-h-screen pb-20">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <header className="border-b border-black/10 pb-6 sm:pb-8">
          <p className="font-display text-[10px] sm:text-[11px] uppercase tracking-brand-wide text-zinc-500 font-semibold">
            Catalog · {filtered.length} Statement Pieces
          </p>
          <h1 className="mt-2 sm:mt-3 font-display text-3xl uppercase tracking-tight sm:text-6xl md:text-7xl text-zinc-900 font-black">
            {cat === "All" ? "The Collection" : cat}
          </h1>
        </header>

        {/* Filter Pills */}
        <div
          className="sticky top-[56px] sm:top-[64px] z-20 -mx-4 flex gap-2 overflow-x-auto border-b border-black/10 bg-white/95 backdrop-blur-md px-4 py-3 sm:py-4 md:-mx-8 md:px-8 scrollbar-none whitespace-nowrap"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => handleCategoryChange(c)}
                className={`shrink-0 rounded-full border px-4 sm:px-5 py-2 font-display text-[10px] sm:text-[11px] uppercase tracking-brand-wide transition-all cursor-pointer min-h-[38px] flex items-center justify-center ${active
                    ? "border-black bg-black text-white font-bold shadow-xs"
                    : "border-black/15 text-zinc-700 hover:border-black hover:text-black active:bg-black/5 font-semibold bg-white"
                  }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 py-10 md:grid-cols-3 md:gap-x-6 md:py-14">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-xs font-display uppercase tracking-brand text-zinc-500 font-semibold">
              No items found in this category
            </p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-display uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors cursor-pointer font-bold"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
