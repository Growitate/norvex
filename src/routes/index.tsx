import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroSlider } from "@/components/HeroSlider";
import modelBag1 from "@/assets/model_banner_bag_1_1786114703183.png";
import modelBag2 from "@/assets/model_banner_bag_2_1786114716814.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nørva Store — Y2K & Gothic Statement Bags" },
      {
        name: "description",
        content:
          "Nørva Store helps fashion lovers express their individuality through bold Y2K, gothic, and dark aesthetic statement bags.",
      },
      { property: "og:title", content: "Nørva Store — Y2K & Gothic Bags" },
      {
        property: "og:description",
        content: "Curated limited-edition statement bags with a strong dark aesthetic identity.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const newArrivals = products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew)).slice(0, 4);

  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-16 sm:h-20 bg-[#050507]" />

      {/* CATEGORY NAV TABS */}
      <CategoryNav />

      {/* HERO SLIDER CAROUSEL */}
      <HeroSlider />

      {/* SECTION 2: DUAL-TONE WHITE SECTION - NEW BAG DROPS */}
      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-black pb-6">
            <div>
              <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-500">
                001 — Y2K & Gothic Bag Drops
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-tight sm:text-5xl md:text-6xl text-black font-semibold">
                New Bag Arrivals
              </h2>
            </div>
            <a
              href="/shop"
              className="hidden font-display text-[11px] uppercase tracking-brand-wide text-black hover:opacity-60 transition-opacity sm:flex items-center gap-2"
            >
              <span>View All Bags</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FULL-WIDTH MODEL EDITORIAL BANNER */}
      <section className="relative overflow-hidden bg-black text-white py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block font-display text-[11px] uppercase tracking-brand-wide text-zinc-400 border border-white/20 px-3 py-1">
              Editorial Collection
            </span>
            <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl text-white">
              Crafted For<br />Fearless<br />Self-Expression.
            </h2>
            <p className="max-w-md text-sm text-zinc-300 leading-relaxed uppercase tracking-wide">
              Nørva Store brings together dark European aesthetic identity, silver curb chain hardware, and limited-edition Y2K leather craft.
            </p>
            <div className="pt-4">
              <a
                href="/shop"
                className="btn-sweep sweep-light inline-flex items-center gap-3 border border-white bg-white px-8 py-4 font-display text-xs uppercase tracking-brand-wide text-black font-bold hover:bg-zinc-200 transition-colors"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative aspect-[4/5] overflow-hidden border border-white/10 rounded-sm"
          >
            <img
              src={modelBag1}
              alt="Model posing with Nørva Store Y2K Gothic Shoulder Bag"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 border border-white/15">
              <p className="font-display text-xs uppercase tracking-brand text-white">Cybergoth Metal Chain Shoulder Bag</p>
              <p className="mt-1 text-[10px] uppercase tracking-brand text-zinc-400">Featured In Editorial Campaign</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: DUAL-TONE WHITE SECTION - MODEL SHOWCASE */}
      <section className="bg-white py-24 text-black md:py-32 border-t border-black">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8 items-center">
          <div className="order-2 md:order-1 aspect-[4/5] overflow-hidden border border-black rounded-sm bg-black/5">
            <img
              src={modelBag2}
              alt="Model styling Y2K Patent Leather Crossbody Bag"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <div>
              <p className="font-display text-[11px] uppercase tracking-brand-wide text-black/50">
                Design Identity
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase leading-tight tracking-tight md:text-6xl text-black">
                Statement Leather & Silver Hardware.
              </h2>
            </div>
            <p className="leading-relaxed text-black/80 text-base">
              Every bag is engineered with custom grommet straps, heavy chrome buckles, and double-stitched leather. Stand out from mass-produced designs with limited-run pieces.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-black/15 pt-8">
              <div>
                <p className="font-display text-xl text-black font-bold">100%</p>
                <p className="mt-1 font-display text-[11px] uppercase tracking-brand text-black/60">Limited Edition Runs</p>
              </div>
              <div>
                <p className="font-display text-xl text-black font-bold">Y2K / Gothic</p>
                <p className="mt-1 font-display text-[11px] uppercase tracking-brand text-black/60">Dark Aesthetic Identity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DARK OBSIDIAN PHILOSOPHY & STORY */}
      <section className="relative overflow-hidden bg-[#050507] py-28 text-white md:py-40 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[clamp(2.5rem,9vw,8rem)] font-medium uppercase leading-[0.9] tracking-tight text-white"
          >
            Express Your<br />Individuality.
          </motion.h2>

          <div className="mt-12 grid gap-12 border-t border-white/15 pt-12 md:grid-cols-3">
            <p className="md:col-span-2 max-w-2xl text-lg leading-relaxed text-zinc-300">
              Nørva Store was created for individuals who see fashion as a form of self-expression.
              Inspired by Y2K trends, gothic culture, and modern European aesthetics, we curate bold
              bags and accessories that help you stand out with confidence. Every piece is selected to blend
              premium quality, unique design, and timeless style.
            </p>
            <div className="space-y-6">
              <div>
                <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">01</p>
                <p className="mt-2 font-display text-sm uppercase tracking-brand text-white">Y2K & Gothic Aesthetics</p>
              </div>
              <div>
                <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">02</p>
                <p className="mt-2 font-display text-sm uppercase tracking-brand text-white">Statement Leather Hardware</p>
              </div>
              <div>
                <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">03</p>
                <p className="mt-2 font-display text-sm uppercase tracking-brand text-white">Limited Edition Drops</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DUAL-TONE WHITE TRUST BAR */}
      <section className="border-y border-black bg-white py-12 text-black">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:px-8 md:text-left">
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-black text-black" />
              ))}
            </div>
            <p className="font-display text-xs uppercase tracking-brand text-black font-semibold">4.9 / 5 · 1,400+ Verified Customer Reviews</p>
          </div>
          <p className="font-display text-xs uppercase tracking-brand-wide text-black font-medium">
            Carefully Curated Dark & Y2K Bag Collections.
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-brand-wide text-black/70 font-semibold">
            <span>Limited Edition</span>
            <span>·</span>
            <span>Premium Leather</span>
            <span>·</span>
            <span>Secure Shopping</span>
          </div>
        </div>
      </section>
    </>
  );
}
