import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCategories, useProducts, type Category } from "@/lib/db";

export function CategorySection() {
  const dynamicCategories = useCategories();
  const products = useProducts();

  // Pick featured categories (or first 4 categories)
  const featuredCategories = dynamicCategories.filter((c) => c.featured);
  const displayCategories =
    featuredCategories.length >= 2 ? featuredCategories : dynamicCategories.slice(0, 4);

  const getCountForCategory = (cat: Category) => {
    const cName = (cat.name || "").toLowerCase().trim();
    const cSlug = (cat.slug || "").toLowerCase().trim();

    return products.filter((p) => {
      const pCat = (p.category || "").toLowerCase().trim();
      if (cName === "clothing" || cSlug === "clothing") {
        return !p.isBag && p.category !== "Accessories";
      }
      if (cName === "accessories" || cSlug === "accessories") {
        return p.category === "Accessories";
      }
      if (cName.includes("women") || cSlug.includes("women")) {
        return p.department === "female";
      }
      if (cName.includes("mens") || cSlug.includes("mens") || cName.includes("men")) {
        return p.department === "male";
      }
      if (cName.includes("bag") || cSlug.includes("bag")) {
        return p.isBag;
      }
      return pCat === cName || pCat === cSlug;
    }).length;
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-black/10 select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-black/10 pb-6 gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 text-zinc-800" />
              CURATED DEPARTMENTS // FW2026
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight uppercase text-zinc-950">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-normal max-w-xl">
              Explore handcrafted leather statement bags, women's lookbook edits, heavyweight men's
              streetwear, and gothic accessories.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors group"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Dynamic Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayCategories.map((cat) => {
            const count = getCountForCategory(cat);
            return (
              <Link
                key={cat.id}
                to="/shop"
                search={{ category: cat.slug || cat.name }}
                className="group relative flex flex-col justify-between overflow-hidden bg-zinc-50 border border-black/10 rounded-sm hover:border-black transition-all duration-300 shadow-2xs hover:shadow-lg cursor-pointer"
              >
                {/* Top info badge bar */}
                <div className="p-4 sm:p-5 flex items-center justify-between z-10">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-black transition-colors">
                    {cat.tag || "COLLECTION"}
                  </span>
                  <span className="inline-block bg-white/90 backdrop-blur-xs text-zinc-900 text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full border border-black/10 shadow-2xs">
                    {count} Styles
                  </span>
                </div>

                {/* Image Container with high fashion aspect ratio */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-4">
                  <img
                    src={cat.image || "/assets/male_hoodie_drop.jpg"}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Floating pill badge */}
                  {cat.badge && (
                    <div className="absolute bottom-3 left-4">
                      <span className="inline-block bg-black/80 backdrop-blur-xs text-white text-[10px] font-display uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs">
                        {cat.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="p-4 sm:p-5 bg-white border-t border-black/10 flex flex-col justify-between gap-2 flex-1">
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-sans mt-0.5 line-clamp-1">
                      {cat.subtitle || cat.description || "Explore curated luxury streetwear."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-zinc-900 group-hover:translate-x-0.5 transition-transform">
                    <span>Explore Collection</span>
                    <div className="w-7 h-7 rounded-full bg-zinc-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
