import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { getProduct, products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — Nørva Store` },
        {
          name: "description",
          content:
            p?.description ?? "Nørva Store product. Premium Y2K and gothic accessories.",
        },
        { property: "og:title", content: `${p?.name ?? "Product"} — Nørva Store` },
        { property: "og:description", content: p?.description ?? "" },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-[#09090b] text-white">
      <div className="text-center">
        <p className="font-display text-3xl uppercase tracking-brand">Product Not Found</p>
        <Link to="/shop" className="mt-6 inline-block underline text-zinc-300 hover:text-white">
          Back to shop
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const product = Route.useLoaderData() as Product;
  const [size, setSize] = useState(product.sizes[0]);
  const add = useCart((s) => s.add);
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <section className="bg-[#09090b] pt-24 sm:pt-32 text-white md:pt-40 min-h-screen pb-24 md:pb-16">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <nav className="mb-6 sm:mb-8 font-display text-[10px] uppercase tracking-brand-wide text-zinc-400">
            <Link to="/" className="hover:text-white">Home</Link> /{" "}
            <Link to="/shop" className="hover:text-white">Shop</Link> /{" "}
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Images */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 rounded-sm"
              >
                {product.isNew && (
                  <span className="absolute left-4 top-4 z-10 inline-flex items-center bg-white px-3 py-1 font-display text-[10px] uppercase tracking-brand-wide text-black font-semibold">
                    New Drop
                  </span>
                )}
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </motion.div>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {[product.image, product.image, product.image, product.image].map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden border border-white/10 bg-white/5 rounded-sm">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:pt-4">
              <p className="font-display text-[10px] sm:text-[11px] uppercase tracking-brand-wide text-zinc-400">
                {product.category}
              </p>
              <h1 className="mt-2 sm:mt-3 font-display text-2xl uppercase leading-tight tracking-tight sm:text-5xl text-white font-semibold">
                {product.name}
              </h1>
              <p className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl tracking-brand text-zinc-200">₹{product.price.toLocaleString("en-IN")}</p>

              <div className="my-6 sm:my-10 h-px bg-white/15" />

              <div>
                <p className="font-display text-[10px] sm:text-[11px] uppercase tracking-brand-wide text-zinc-400">
                  Size / Option
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
                  {product.sizes.map((s: string) => {
                    const active = s === size;
                    return (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`min-w-12 sm:min-w-14 border px-4 sm:px-5 py-2.5 sm:py-3 font-display text-xs uppercase tracking-brand-wide transition-colors cursor-pointer ${
                          active
                            ? "border-white bg-white text-black font-bold"
                            : "border-white/20 text-zinc-300 hover:border-white hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() =>
                  add({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size,
                  })
                }
                className="btn-sweep sweep-light mt-8 w-full border border-white bg-white py-4 sm:py-5 font-display text-xs uppercase tracking-brand-wide text-black font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Add to Cart — ₹{product.price.toLocaleString("en-IN")}
              </button>

              <div className="mt-10 space-y-6 border-t border-white/15 pt-8">
                <div>
                  <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
                    Description
                  </p>
                  <p className="mt-3 leading-relaxed text-zinc-300">{product.description}</p>
                </div>
                <ul className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 text-xs uppercase tracking-brand text-zinc-400">
                  <li>Y2K & Gothic Statement Piece</li>
                  <li>Premium Metallic Finish</li>
                  <li>Limited Edition Release</li>
                  <li>Expressive Dark Aesthetics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-[#050507] py-24 text-white border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <h2 className="mb-8 border-b border-white/15 pb-4 font-display text-2xl uppercase tracking-tight sm:text-4xl text-white">
            You Might Also Love
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6">
            {related.map((p, i) => (
              <ProductCardMini key={p.id} index={i} {...p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCardMini({ id, name, price, image }: { id: string; name: string; price: number; image: string; index: number }) {
  return (
    <Link to="/product/$id" params={{ id }} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-display text-xs uppercase tracking-brand text-white group-hover:text-zinc-300 transition-colors">{name}</h3>
        <span className="font-display text-xs tracking-brand text-zinc-400">₹{price.toLocaleString("en-IN")}</span>
      </div>
    </Link>
  );
}
