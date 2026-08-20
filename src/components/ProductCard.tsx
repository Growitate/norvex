import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag } from "lucide-react";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block space-y-3 sm:space-y-4"
      >
        {/* Image Card Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-white border border-black/10 rounded-2xl shadow-xs transition-all duration-300 group-hover:border-black/25 group-hover:shadow-md">
          {product.isNew && (
            <span className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1 font-display text-[10px] uppercase font-bold tracking-widest rounded-full shadow-md">
              NEW
            </span>
          )}

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Quick Add Overlay for Desktop Hover & Mobile Touch */}
          <div className="pointer-events-none absolute inset-0 flex items-end p-3 sm:p-4 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                add({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size: product.sizes?.[0] || "One Size",
                });
              }}
              className="pointer-events-auto w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white py-3 px-4 rounded-full font-display text-[11px] uppercase font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-white" />
              <span>Quick Add</span>
            </button>
          </div>

          {/* Touch Quick Add Icon Button for Mobile */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              add({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: product.sizes?.[0] || "One Size",
              });
            }}
            aria-label={`Quick add ${product.name}`}
            className="sm:hidden absolute right-3 bottom-3 z-10 p-2.5 rounded-full bg-zinc-900/90 text-white backdrop-blur-md shadow-md active:scale-95 transition-transform"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>

        {/* Product Meta Details */}
        <div className="space-y-1 px-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="font-display text-xs sm:text-sm tracking-tight text-zinc-900 font-bold shrink-0">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500 font-medium">
            {product.category}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
