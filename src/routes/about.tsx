import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import heroImg from "@/assets/hero-model.jpg";
import { CTAButton } from "@/components/CTAButton";

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
      {/* Hero */}
      <section className="relative grid min-h-[65svh] sm:min-h-[75svh] place-items-center overflow-hidden bg-[#050507] pt-28 sm:pt-40 pb-16 sm:pb-24 text-white">
        <div className="mx-auto max-w-[1600px] px-4 text-center md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[clamp(2.5rem,8vw,7.5rem)] font-medium uppercase leading-[0.95] tracking-tight text-white"
          >
            Express Your<br />Individuality.<br />Uncompromising.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-sm uppercase tracking-brand text-zinc-400"
          >
            Inspired by Y2K trends, gothic culture, and modern European aesthetics.
          </motion.p>
        </div>
      </section>

      {/* Story 1 */}
      <section className="bg-[#09090b] py-24 text-white md:py-32 border-t border-white/10">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
            <img src={about1} alt="Nørva Store aesthetics" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="self-center">
            <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
              Brand Story
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight md:text-5xl text-white">
              Curated for bold self-expression.
            </h2>
            <p className="mt-6 leading-relaxed text-zinc-300">
              Nørva Store was created for individuals who see fashion as a form of self-expression.
              Inspired by Y2K trends, gothic culture, and modern European aesthetics, we curate bold
              accessories that help you stand out with confidence. Every piece is selected to blend
              premium quality, unique design, and timeless style, allowing you to express your individuality without compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#050507] py-28 text-white md:py-36 border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">Mission Statement</p>
          <p className="mt-6 font-display text-[clamp(1.8rem,5vw,5rem)] font-medium uppercase leading-[1.1] tracking-tight text-white">
            Our mission is to make premium Y2K and gothic fashion accessible through carefully curated, high-quality accessories that empower people to express their unique identity with confidence.
          </p>
        </div>
      </section>

      {/* Vision / USP */}
      <section className="bg-[#09090b] py-24 text-white md:py-32 border-t border-white/10">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="order-2 self-center md:order-1">
            <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
              Vision & Identity
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight md:text-5xl text-white">
              Global Destination for Dark Aesthetic Fashion.
            </h2>
            <p className="mt-6 leading-relaxed text-zinc-300">
              Our vision is to become a globally recognized destination for Y2K, gothic, and dark aesthetic fashion,
              inspiring a community that embraces individuality, creativity, and fearless self-expression through premium accessories.
            </p>
          </div>
          <div className="order-1 aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 rounded-sm md:order-2">
            <img src={about2} alt="Nørva Store accessory process" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="border-t border-white/10 bg-[#050507] py-24 text-center text-white md:py-32">
        <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
          Join the Community
        </p>
        <h2 className="mt-3 font-display text-3xl uppercase tracking-tight md:text-6xl text-white">
          @norvaxstore
        </h2>
        <div className="mt-10">
          <CTAButton tone="light" href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA==">
            Follow on Instagram →
          </CTAButton>
        </div>
      </section>
    </>
  );
}
