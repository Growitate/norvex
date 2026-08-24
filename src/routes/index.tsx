import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { HeroVideoSection } from "@/components/HeroVideoSection";
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
      {/* HERO BANNER / VIDEO SECTION */}
      <HeroVideoSection />

      {/* 1. PRODUCT CAROUSEL (NEW ARRIVALS) */}
      <ProductCarousel
        products={newArrivals.length > 0 ? newArrivals : products}
        flushTop={true}
      />

      {/* 2. BANNER 1 (IMAGE + TITLE + SINGLE SHOP NOW BUTTON) */}
      <CollectionBanner
        image={lifestyleBanner1}
        title="New Arrivals"
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop?category=Bags"
        position="bottom-left"
      />

      {/* 4. PRODUCT CAROUSEL (SECOND COLLECTION - BESTSELLERS) */}
      <ProductCarousel
        title="Bestsellers"
        products={bestsellers}
        viewAllLink="/shop"
        viewAllText="Explore All"
        className="pb-0"
      />

      {/* 5. BANNER 2 (IMAGE + TITLE + SINGLE SHOP NOW BUTTON) */}
      <CollectionBanner
        image={lifestyleBanner2}
        title="Harness & Hardware"
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop?category=Bags"
        position="bottom-center"
      />

      {/* 6. PRODUCT CAROUSEL (THIRD COLLECTION - SHOULDER & HARNESS BAGS) */}
      <ProductCarousel
        title="Shoulder & Harness Bags"
        products={shoulderAndHarness.length > 0 ? shoulderAndHarness : products}
        viewAllLink="/shop?category=Shoulder+Bags"
        viewAllText="View Shoulder Bags"
        className="pb-0"
      />

      {/* 7. BANNER 3 (IMAGE + TITLE + SINGLE SHOP NOW BUTTON) */}
      <CollectionBanner
        image={lifestyleBanner3}
        title="Cyber Streetwear 2026"
        primaryButtonText="Shop Men's"
        primaryButtonLink="/shop?category=Male+Clothes"
        position="bottom-left"
      />

      {/* 8. COMMUNITY & STYLING REELS SECTION */}
      <SocialVideoMarquee />

      {/* 9. AUTO-SCROLLING CUSTOMER REVIEWS SECTION */}
      <ReviewsSection />

      {/* 10. ANNOUNCEMENT / BRAND STATEMENT BANNER (Tauxxic Style) */}
      <BrandStatementBanner
        image={brandStatementBg}
        statement="We Are Loud and Proud"
        buttonText="Explore"
        buttonLink="/shop"
      />
    </>
  );
}
