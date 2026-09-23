import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import heroImg from "@/assets/hero-model.jpg";
import { ArrowRight, Sparkles, Instagram, ShieldCheck, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Norva Store" },
      {
        name: "description",
        content:
          "Bold fashion, distinctive accessories, and statement bags curated for those who embrace individuality, confidence, and an unapologetic sense of style.",
      },
      { property: "og:title", content: "About — Norva Store" },
      {
        property: "og:description",
        content:
          "Bold fashion, distinctive accessories, and statement bags curated for those who embrace individuality, confidence, and an unapologetic sense of style.",
      },
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
      <section className="relative overflow-hidden bg-white pt-10 sm:pt-20 md:pt-24 pb-14 sm:pb-24 md:pb-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto max-w-[1400px] px-4 text-center sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-zinc-900 text-white text-[10px] sm:text-[11px] font-display font-semibold tracking-widest uppercase shadow-md">
              <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5" /> OUR STORY & PHILOSOPHY
            </div>

            <h1 className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-zinc-900 leading-[1.1] sm:leading-[1.08] uppercase break-words">
              Express Your Individuality. <span className="text-zinc-400 block sm:inline">Uncompromising.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-zinc-600 font-sans leading-relaxed px-2">
              Bold fashion, distinctive accessories, and statement bags curated for those who
              embrace individuality, confidence, and an unapologetic sense of style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-white py-14 sm:py-20 md:py-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 md:grid-cols-2 md:gap-16 px-4 sm:px-6 md:px-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto md:max-w-none aspect-[4/5] overflow-hidden bg-zinc-50 border border-black/10 rounded-2xl shadow-sm"
          >
            <img
              src={about1}
              alt="Nørva Store aesthetics"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500 font-bold block">
              01 • BRAND STORY
            </span>

            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 leading-tight">
              Curated for Bold Self-Expression.
            </h2>

            <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed">
              Norva Store was created for those who believe style is more than what you wear — it’s
              an attitude. We curate distinctive menswear, womenswear, statement accessories, and
              bags designed to bring confidence, character, and individuality to every look.
            </p>

            <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed">
              Every piece is carefully selected for its bold details, quality, and timeless appeal —
              from standout silhouettes to accessories that complete the look. Wear it your way. Own
              the attention.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 sm:gap-6 border-t border-black/10">
              <div className="bg-zinc-50/70 md:bg-transparent p-3.5 sm:p-0 rounded-xl md:rounded-none border border-black/5 md:border-0">
                <span className="font-display text-xl sm:text-2xl font-bold text-zinc-900 block">100%</span>
                <span className="font-sans text-[11px] sm:text-xs text-zinc-500 font-medium">
                  CURATED STYLES.
                </span>
              </div>
              <div className="bg-zinc-50/70 md:bg-transparent p-3.5 sm:p-0 rounded-xl md:rounded-none border border-black/5 md:border-0">
                <span className="font-display text-xl sm:text-2xl font-bold text-zinc-900 block">
                  BOLD COLLECTIONS
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-zinc-500 font-medium">
                  MENS WEAR. WOMENS WEAR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-14 sm:py-20 md:py-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 bg-white text-[10px] sm:text-[11px] font-display font-semibold tracking-widest uppercase text-zinc-600 mb-6 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-zinc-900" /> 02 • MISSION STATEMENT
          </div>

          <blockquote className="font-display font-normal text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900 leading-[1.3] sm:leading-[1.25] max-w-4xl mx-auto">
            "Our mission is to make premium western and Vegas-inspired fashion accessible through
            carefully curated accessories and bags that empower men and women to express their bold
            identity with confidence."
          </blockquote>

          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-black/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-display uppercase tracking-widest text-zinc-600 font-semibold">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-zinc-900" /> Premium Quality
            </span>
            <span className="text-zinc-300 hidden sm:inline">✦</span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Heart className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-zinc-900" /> Authentic Design
            </span>
            <span className="text-zinc-300 hidden sm:inline">✦</span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <Award className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-zinc-900" /> Limited Edition Drops
            </span>
          </div>
        </div>
      </section>

      {/* Vision & Identity Section */}
      <section className="bg-white py-14 sm:py-20 md:py-28 text-zinc-900 border-b border-black/10">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 md:grid-cols-2 md:gap-16 px-4 sm:px-6 md:px-8 items-center">
          <div className="order-2 md:order-1 space-y-4 sm:space-y-6">
            <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500 font-bold block">
              03 • VISION & IDENTITY
            </span>

            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900 leading-tight">
              Global Destination for Bold  Western Style.
            </h2>

            <p className="text-sm sm:text-base text-zinc-700 font-sans leading-relaxed">
              Our vision is to become a globally recognized destination for western-inspired fashion
              — inspiring a global community that embraces freedom, grit, and fearless style through
              statement accessories and bags for men and women.
            </p>

            <div className="pt-2 sm:pt-4">
              <a
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-zinc-900 hover:bg-black text-white px-7 py-3.5 sm:py-4 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
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
            className="order-1 md:order-2 w-full max-w-md mx-auto md:max-w-none aspect-[4/5] overflow-hidden bg-zinc-50 border border-black/10 rounded-2xl shadow-sm"
          >
            <img
              src={about2}
              alt="Nørva Store accessory process"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Instagram Community CTA */}
      <section className="bg-white py-14 sm:py-20 text-center text-zinc-900">
        <div className="mx-auto max-w-xl px-4 sm:px-6 space-y-4 sm:space-y-6">
          <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500 font-bold block">
            JOIN THE COMMUNITY
          </span>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-900">
            @norvaxstore
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed px-2">
            Follow our official Instagram for exclusive behind-the-scenes, campaign lookbooks, and
            early drop announcements.
          </p>
          <div className="pt-2 sm:pt-4">
            <a
              href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-zinc-900 hover:bg-black text-white px-8 py-3.5 sm:py-4 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md active:scale-95"
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
