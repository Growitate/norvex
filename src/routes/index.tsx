import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { HeroSlider } from "@/components/HeroSlider";
import { CategorySection } from "@/components/CategorySection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { CollectionBanner } from "@/components/CollectionBanner";
import { SocialVideoMarquee } from "@/components/SocialVideoMarquee";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BrandStatementBanner } from "@/components/BrandStatementBanner";
import lifestyleBanner1 from "@/assets/lifestyle_banner_1.jpg";
import lifestyleBanner2 from "@/assets/lifestyle_banner_2.jpg";
import lifestyleBanner3 from "@/assets/lifestyle_banner_3.jpg";
import brandStatementBg from "@/assets/brand_statement_bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nørva Store — Y2K & Gothic Statement Bags, Apparel & Accessories" },
      {
        name: "description",
        content:
          "Nørva Store helps fashion lovers express their individuality through bold Y2K, gothic, and dark aesthetic statement bags, women's edits, heavyweight streetwear, and accessories.",
      },
      { property: "og:title", content: "Nørva Store — Y2K & Gothic Fashion" },
      {
        property: "og:description",
        content: "Curated limited-edition statement bags, clothing, and accessories with a strong dark aesthetic identity.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const newArrivals = products.filter((p) => p.isNew);
  const bestsellers = products.slice(0, 5);
  const shoulderAndHarness = products.filter(
    (p) => p.category === "Shoulder Bags" || p.category === "Totes & Backpacks",
  );

  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-14 sm:h-16 bg-white" />

      {/* HERO BANNER / VIDEO SECTION */}
      <HeroSlider />

      {/* 1. PRODUCT CAROUSEL (NEW ARRIVALS) */}
      <ProductCarousel
        products={newArrivals.length > 0 ? newArrivals : products}
        flushTop={true}
      />

      {/* 2. BANNER 1 (IMAGE + TITLE + SHOP NOW) */}
      <CollectionBanner
        image={lifestyleBanner1}
        seasonLabel="FW2026 // DROP 01"
        title="New Arrivals"
        description="Architectural dark aesthetic silhouettes, gothic cyber hardware, and limited-edition leather craft."
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop?category=Bags"
        secondaryButtonText="Women's Exclusive"
        secondaryButtonLink="/shop?category=Female+Bags+%26+Clothes"
        position="bottom-left"
      />

      {/* 4. PRODUCT CAROUSEL (SECOND COLLECTION - BESTSELLERS) */}
      <ProductCarousel
        title="Bestsellers"
        badge="MOST WANTED // ICONIC PIECES"
        subtitle="The most coveted statement bags and streetwear of the season"
        products={bestsellers}
        viewAllLink="/shop"
        viewAllText="Explore All"
      />

      {/* 5. BANNER 2 (IMAGE + TITLE + SHOP NOW) */}
      <CollectionBanner
        image={lifestyleBanner2}
        seasonLabel="LIMITED RUN // CRAFT IDENTITY"
        title="Harness & Hardware"
        description="Sculpted metal buckles, industrial eyelet straps, and heavy silver curb chains engineered for longevity."
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop?category=Bags"
        secondaryButtonText="Shop All"
        secondaryButtonLink="/shop"
        position="bottom-center"
      />

      {/* 6. PRODUCT CAROUSEL (THIRD COLLECTION - SHOULDER & HARNESS BAGS) */}
      <ProductCarousel
        title="Shoulder & Harness Bags"
        badge="FEATURED CATEGORY"
        subtitle="Heavy metal chains, O-ring harness details, and textured leather finishes"
        products={shoulderAndHarness.length > 0 ? shoulderAndHarness : products}
        viewAllLink="/shop?category=Shoulder+Bags"
        viewAllText="View Shoulder Bags"
      />

      {/* 7. BANNER 3 (IMAGE + TITLE + SHOP NOW) */}
      <CollectionBanner
        image={lifestyleBanner3}
        seasonLabel="EDITORIAL // LONDON STREETS"
        title="Cyber Streetwear 2026"
        description="Engineered for individuals who refuse mass production. Limited batch releases."
        primaryButtonText="Shop Men's"
        primaryButtonLink="/shop?category=Male+Clothes"
        secondaryButtonText="Explore Accessories"
        secondaryButtonLink="/shop?category=Accessories"
        position="bottom-left"
      />

      {/* 8. COMMUNITY & STYLING REELS SECTION */}
      <SocialVideoMarquee />

      {/* 9. AUTO-SCROLLING CUSTOMER REVIEWS SECTION */}
      <ReviewsSection />

      {/* 10. ANNOUNCEMENT / BRAND STATEMENT BANNER (Tauxxic Style) */}
      <BrandStatementBanner
        image={brandStatementBg}
        tag="NØRVA STORE // STATEMENT"
        statement="We Are Loud and Proud"
        buttonText="Explore"
        buttonLink="/shop"
      />
    </>
  );
}
