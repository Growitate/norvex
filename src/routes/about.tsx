import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import heroImg from "@/assets/hero-model.jpg";
import { ArrowRight, Sparkles, Instagram, ShieldCheck, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nørva Store" },
      {
        name: "description",
        content:
          "Nørva Store was created for individuals who see fashion as a form of self-expression. Inspired by Y2K trends, gothic culture, and modern European aesthetics.",
      },
      { property: "og:title", content: "About — Nørva Store" },
      { property: "og:description", content: "Express your individuality through bold Y2K, gothic, and dark aesthetic accessories." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-16 sm:h-20 bg-white" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 sm:pt-24 pb-20 sm:pb-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-4 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-[11px] font-display font-semibold tracking-widest uppercase shadow-md">
              <Sparkles className="h-3.5 w-3.5" /> OUR STORY & PHILOSOPHY
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-900 leading-[1.08] uppercase">
              Express Your Individuality. <span className="text-zinc-400">Uncompromising.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-600 font-sans leading-relaxed">
              Inspired by Y2K trends, gothic culture, and modern European aesthetics. We curate bold, limited-edition statement accessories designed for fearless self-expression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-white py-20 md:py-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] overflow-hidden bg-zinc-50 border border-black/10 rounded-2xl shadow-sm"
          >
            <img src={about1} alt="Nørva Store aesthetics" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>

          <div className="space-y-6">
            <span className="font-display text-[11px] uppercase tracking-widest text-zinc-500 font-bold block">
              01 // BRAND STORY
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 leading-tight">
              Curated for Bold Self-Expression.
            </h2>

            <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed">
              Nørva Store was created for individuals who see fashion as a form of art and identity. Inspired by Y2K aesthetic trends, gothic street culture, and modern dark aesthetics, we curate bold bags and hardware accessories that help you stand out with confidence.
            </p>

            <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed">
              Every piece is selected to blend premium quality, unique architectural hardware design, and timeless style, allowing you to express your individuality without compromise.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-black/10">
              <div>
                <span className="font-display text-2xl font-bold text-zinc-900 block">100%</span>
                <span className="font-sans text-xs text-zinc-500 font-medium">Curated Limited Drops</span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-zinc-900 block">Y2K / GOTH</span>
                <span className="font-sans text-xs text-zinc-500 font-medium">Dark Aesthetic Craft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20 md:py-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 bg-white text-[11px] font-display font-semibold tracking-widest uppercase text-zinc-600 mb-6 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-zinc-900" /> 02 // MISSION STATEMENT
          </div>

          <blockquote className="font-display font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900 leading-[1.25] max-w-4xl mx-auto">
            "Our mission is to make premium Y2K and gothic fashion accessible through carefully curated accessories that empower people to express their unique identity with confidence."
          </blockquote>

          <div className="mt-10 pt-8 border-t border-black/10 flex flex-wrap items-center justify-center gap-8 text-xs font-display uppercase tracking-widest text-zinc-600 font-semibold">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-zinc-900" /> Premium Quality
            </span>
            <span className="text-zinc-300">✦</span>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-zinc-900" /> Authentic Design
            </span>
            <span className="text-zinc-300">✦</span>
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4 text-zinc-900" /> Limited Edition Drops
            </span>
          </div>
        </div>
      </section>

      {/* Vision & Identity Section */}
      <section className="bg-white py-20 md:py-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <span className="font-display text-[11px] uppercase tracking-widest text-zinc-500 font-bold block">
              03 // VISION & IDENTITY
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 leading-tight">
              Global Destination for Dark Aesthetic Fashion.
            </h2>

            <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed">
              Our vision is to become a globally recognized destination for Y2K, gothic, and dark aesthetic fashion—inspiring a global community that embraces individuality, creativity, and fearless style through statement accessories.
            </p>

            <div className="pt-4">
              <a
                href="/shop"
                className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-black text-white px-7 py-4 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>EXPLORE ALL DROPS</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 aspect-[4/5] overflow-hidden bg-zinc-50 border border-black/10 rounded-2xl shadow-sm"
          >
            <img src={about2} alt="Nørva Store accessory process" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Instagram Community CTA */}
      <section className="bg-white py-20 text-center text-zinc-900">
        <div className="mx-auto max-w-xl px-4 space-y-6">
          <span className="font-display text-[11px] uppercase tracking-widest text-zinc-500 font-bold block">
            JOIN THE COMMUNITY
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            @norvaxstore
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans">
            Follow our official Instagram for exclusive behind-the-scenes, campaign lookbooks, and early drop announcements.
          </p>
          <div className="pt-4">
            <a
              href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-black text-white px-8 py-4 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md"
            >
              <Instagram className="h-4 w-4" />
              <span>FOLLOW ON INSTAGRAM</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
