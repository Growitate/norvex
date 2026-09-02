import { createFileRoute } from "@tanstack/react-router";
import { useProducts } from "@/lib/db";
import { HeroVideoSection } from "@/components/HeroVideoSection";
import { CategorySection } from "@/components/CategorySection";
import { ProductCarousel } from "@/components/ProductCarousel";
import { CollectionBanner } from "@/components/CollectionBanner";
import { SocialVideoMarquee } from "@/components/SocialVideoMarquee";
import { ReviewsSection } from "@/components/ReviewsSection";
import newArrivalsBanner from "@/assets/new_arrivals_banner.png";
import newArrivalsBannerDesktop from "@/assets/new_arrivals_banner_desktop.png";
import harnessHardwareBanner from "@/assets/harness_hardware_banner.jpg";
import harnessHardwareBannerDesktop from "@/assets/harness_hardware_banner_desktop.jpg";
import cyberStreetwearBanner from "@/assets/cyber_streetwear_banner.jpg";
import cyberStreetwearBannerDesktop from "@/assets/cyber_streetwear_banner_desktop.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Norva Store — Y2K & Gothic Statement Bags, Apparel & Accessories" },
      {
        name: "description",
        content:
          "Norva Store helps fashion lovers express their individuality through bold Y2K, gothic, and dark aesthetic statement bags, women's edits, heavyweight streetwear, and accessories.",
      },
      { property: "og:title", content: "Norva Store — Y2K & Gothic Fashion" },
      {
        property: "og:description",
        content:
          "Curated limited-edition statement bags, clothing, and accessories with a strong dark aesthetic identity.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const products = useProducts();
  const newArrivals = products.filter((p) => p.isNew);
  const bestsellers = products.slice(0, 5);

  return (
    <>
      {/* HERO BANNER / VIDEO SECTION */}
      <HeroVideoSection />

      {/* 1. PRODUCT CAROUSEL (NEW ARRIVALS) */}
      <ProductCarousel products={newArrivals.length > 0 ? newArrivals : products} flushTop={true} />

      {/* 2. BANNER 1 (IMAGE + TITLE + SINGLE SHOP NOW BUTTON) */}
      <CollectionBanner
        image={newArrivalsBanner}
        desktopImage={newArrivalsBannerDesktop}
        seasonLabel="FW2026"
        title="New Arrivals"
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop?category=Bags"
        position="bottom-center"
        bgColor="#a4c6e2"
      />

      {/* 5. BANNER 2 (HARNESS & HARDWARE) */}
      <CollectionBanner
        image={harnessHardwareBanner}
        desktopImage={harnessHardwareBannerDesktop}
        seasonLabel="FW2026"
        title="Harness & Hardware"
        primaryButtonText="Shop Now"
        primaryButtonLink="/shop?category=Bags"
        position="bottom-center"
        bgColor="#d8caa9"
      />

      {/* 4. PRODUCT CAROUSEL (BESTSELLERS - POSITIONED BELOW HARNESS & HARDWARE BANNER) */}
      <ProductCarousel
        title="Bestsellers"
        products={bestsellers}
        viewAllLink="/shop"
        viewAllText="Explore All"
        className="pb-0"
      />

      {/* 8. COMMUNITY & STYLING REELS SECTION */}
      <SocialVideoMarquee />

      {/* 7. BANNER 3 (ACCESSORIES 2026) */}
      <CollectionBanner
        image={cyberStreetwearBanner}
        desktopImage={cyberStreetwearBannerDesktop}
        seasonLabel="FW2026"
        title="Accessories 2026"
        primaryButtonText="Shop Accessories"
        primaryButtonLink="/shop?category=Accessories"
        position="bottom-center"
        bgColor="#1c2022"
        mobileImagePosition="object-[center_65%]"
        desktopImagePosition="object-center"
      />

      {/* 9. AUTO-SCROLLING CUSTOMER REVIEWS SECTION */}
      <ReviewsSection />
    </>
  );
}
