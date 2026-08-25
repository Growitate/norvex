import { createFileRoute, useSearch, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, type Product } from "@/lib/products";
import { SlidersHorizontal, Check } from "lucide-react";

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
      { title: "Catalog — Norva Store" },
      {
        name: "description",
        content:
          "Explore Norva Store's curated collection of statement bags, women's drops, heavyweight streetwear, and dark aesthetic accessories.",
      },
      { property: "og:title", content: "Catalog — Norva Store" },
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
  const [sortBy, setSortBy] = useState<string>("featured");
  const [sortOpen, setSortOpen] = useState<boolean>(false);

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

  const filtered = products
    .filter((p) => {
      const matchesCat = matchesCategory(p, cat);
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });

  return (
    <section className="bg-white pt-20 sm:pt-28 md:pt-32 text-zinc-900 min-h-screen pb-20 select-none">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        {/* Header Section matching Img 1 & Mobile Responsive */}
        <header className="pb-3 border-b border-black/10">
          <div className="flex items-center justify-between gap-2 xs:gap-4 pb-2">
            {/* Title with Superscript Count (e.g. WOMEN EXCLUSIVE / THE COLLECTION) */}
            <h1 className="font-display font-bold text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide uppercase text-zinc-950 flex items-start gap-0.5 min-w-0 leading-tight">
              <span className="truncate xs:whitespace-normal">{cat === "All" ? "THE COLLECTION" : cat.toUpperCase()}</span>
              <sup className="text-[10px] sm:text-xs font-sans font-medium text-zinc-500 top-[-0.2em] ml-0.5 shrink-0">
                {filtered.length}
              </sup>
            </h1>

            {/* Filter | Sort Button matching Img 1 */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 font-sans text-[11px] sm:text-xs font-semibold text-zinc-800 hover:text-black py-1.5 px-2.5 sm:px-3.5 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer border border-black/15 shadow-2xs"
              >
                <SlidersHorizontal className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-700" />
                <span>Filter | Sort</span>
                {sortBy !== "featured" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black ml-0.5" />
                )}
              </button>

              {/* Sort Dropdown Menu */}
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/10 rounded-xl shadow-xl p-1.5 z-30 font-sans text-xs animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-zinc-400">
                    Sort Catalog
                  </div>
                  {[
                    { id: "featured", label: "Featured" },
                    { id: "newest", label: "Newest Drops" },
                    { id: "price-low", label: "Price: Low to High" },
                    { id: "price-high", label: "Price: High to Low" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        sortBy === option.id
                          ? "bg-black text-white font-bold"
                          : "text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Borderless Horizontal Category Nav Strip (Red Circled Img 1 section) */}
          <div
            className="sticky top-[56px] sm:top-[64px] z-20 -mx-4 md:-mx-8 flex items-center gap-6 sm:gap-8 overflow-x-auto bg-white/95 backdrop-blur-md px-4 md:px-8 pt-3 pb-1 scrollbar-none whitespace-nowrap"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`shrink-0 font-sans text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-0.5 py-1 ${
                    active
                      ? "font-bold text-zinc-950 border-b-2 border-black -mb-[5px] pb-2.5"
                      : "font-medium text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <span>{c}</span>
                  {active && <span className="text-zinc-950 font-bold ml-0.5">•</span>}
                </button>
              );
            })}
          </div>
        </header>

        {/* Product Cards Grid (Fully fits page width with zero horizontal gap) */}
        <div className="-mx-4 md:-mx-8 grid grid-cols-2 gap-x-0 gap-y-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 py-6 sm:py-10">
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
