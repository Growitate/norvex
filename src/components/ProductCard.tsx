import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
          {product.isNew && (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center bg-white px-3 py-1 font-display text-[10px] uppercase tracking-brand-wide text-black font-semibold">
              New
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 sm:opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                add({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size: product.sizes[0],
                });
              }}
              className="pointer-events-auto m-2 sm:m-4 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] border border-white bg-white py-2.5 sm:py-3 font-display text-[10px] uppercase tracking-brand-wide text-black font-bold transition-colors hover:bg-black hover:text-white active:bg-zinc-200"
            >
              Quick Add
            </button>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-1 sm:gap-2">
          <h3 className="font-display text-[11px] sm:text-xs uppercase tracking-brand text-white group-hover:text-zinc-300 transition-colors line-clamp-1">{product.name}</h3>
          <span className="font-display text-[11px] sm:text-xs tracking-brand text-zinc-300 font-semibold">₹{product.price.toLocaleString("en-IN")}</span>
        </div>
        <p className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-brand text-zinc-400">
          {product.category}
        </p>
      </Link>
    </motion.div>
  );
}
