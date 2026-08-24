import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Plus,
  Minus,
  Check,
  Ruler,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Bookmark,
} from "lucide-react";
import { Product, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { WhatFitsModal } from "./WhatFitsModal";
import { ProductCarousel } from "./ProductCarousel";

interface BagProductDetailProps {
  product: Product;
}

export function BagProductDetail({ product }: BagProductDetailProps) {
  const addToCart = useCart((s) => s.add);
  const setCartOpen = useCart((s) => s.setOpen);

  // Gallery array (strictly this product's images)
  const rawGallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];
  const galleryImages = rawGallery;
  const primaryImage = galleryImages[0] || product.image;
  const secondaryAngles = galleryImages.slice(1);

  // Mobile active image index tracking for horizontal scroll snap
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    const active = Math.round(scrollLeft / clientWidth);
    setMobileActiveIdx(active);
  };

  // Color Swatch state
  const colors =
    product.colors && product.colors.length > 0
      ? product.colors
      : [{ name: "Obsidian Black", hex: "#18181b" }];
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // Wishlist & UI states
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [whatFitsOpen, setWhatFitsOpen] = useState(false);

  // Accordions (Details open by default like Liebeskind Berlin)
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [materialCareOpen, setMaterialCareOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const selectedColor = colors[selectedColorIdx] || colors[0];

  // Bottom Recommendations
  const relatedBags = products.filter((p) => p.isBag && p.id !== product.id);
  const otherCustomersChosen = products.filter((p) => p.id !== product.id).slice(0, 6);

  const handleAddToBasket = () => {
    addToCart({
      id: `${product.id}-${selectedColor.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: `${product.name} (${selectedColor.name})`,
      price: product.price,
      image: galleryImages[0] || product.image,
      size: "One Size",
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setTimeout(() => setCartOpen(true), 300);
  };

  return (
    <>
      <div className="bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
        {/* Spacer for fixed header */}
        <div className="h-14 sm:h-16 bg-white" />



        {/* Main Product Container */}
        <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
            {/* ========================================================================= */}
            {/* MOBILE ONLY: 100% FULL-BLEED CAROUSEL                                     */}
            {/* ========================================================================= */}
            <div className="lg:hidden col-span-1 space-y-3 pb-2">
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-2 -mx-4 px-3 sm:px-4 touch-pan-x overscroll-x-contain"
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                  scrollBehavior: "smooth",
                }}
              >
                {galleryImages.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="w-[91vw] xs:w-[92vw] sm:w-[93vw] max-w-[500px] shrink-0 snap-center relative aspect-[3/4.1] bg-zinc-950 rounded-2xl overflow-hidden shadow-xs select-none"
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} — view ${idx + 1}`}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover object-center pointer-events-none"
                    />
                    {galleryImages.length > 1 && (
                      <div className="absolute bottom-4 left-4 z-10 text-white font-sans text-xs font-semibold tracking-wider drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] select-none">
                        {idx + 1} / {galleryImages.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile pagination indicators */}
              {galleryImages.length > 1 && (
                <div className="flex justify-center items-center gap-1.5 pt-0.5">
                  {galleryImages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${mobileActiveIdx === i ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-300"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* DESKTOP COLUMN 1: STATIC / STICKY HERO IMAGE (IMAGE 1)                     */}
            {/* ========================================================================= */}
            <div className={`hidden lg:block ${secondaryAngles.length > 0 ? "lg:col-span-4 xl:col-span-4" : "lg:col-span-7"} lg:sticky lg:top-20 lg:self-start`}>
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.1] w-full bg-white rounded-[20px] overflow-hidden border border-[#e4e4e7] shadow-2xs group select-none cursor-zoom-in">
                {/* New Drop Tag */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 font-display text-[10px] uppercase tracking-brand font-semibold rounded-full shadow-xs">
                      <Sparkles className="h-3 w-3 text-zinc-300" />
                      New Drop
                    </span>
                  </div>
                )}

                {/* Wishlist Bookmark Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlisted(!isWishlisted);
                  }}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-xs ${isWishlisted
                      ? "bg-black text-white"
                      : "bg-white/90 hover:bg-white text-zinc-800 hover:scale-105 active:scale-95 border border-black/10"
                    }`}
                >
                  <Bookmark
                    className={`h-4 w-4 transition-transform ${isWishlisted ? "fill-white text-white scale-110" : "text-zinc-800"
                      }`}
                  />
                </button>

                {/* Static Primary Hero Image (Image 1) */}
                <img
                  src={primaryImage}
                  alt={`${product.name} — main look`}
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                />

                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-sans px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <span>Angle 1 of {galleryImages.length}</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DESKTOP COLUMN 2: SECONDARY BAG ANGLES (SCROLLABLE VERTICAL STREAM)       */}
            {/* ========================================================================= */}
            {secondaryAngles.length > 0 && (
              <div className="hidden lg:block lg:col-span-3 xl:col-span-3 space-y-3.5">
                {secondaryAngles.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.1] w-full bg-white rounded-[20px] overflow-hidden border border-[#e4e4e7] hover:border-zinc-400 shadow-2xs transition-all duration-300 group select-none cursor-zoom-in"
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} — angle ${idx + 2}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                    />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-xs text-white text-[10px] font-sans px-2 py-0.5 rounded-full">
                      {idx + 2} / {galleryImages.length}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ========================================================= */}
            {/* DESKTOP COLUMN 3: STICKY PURCHASE PANEL & INFO CARDS      */}
            {/* ========================================================= */}
            <div className={`${secondaryAngles.length > 0 ? "lg:col-span-5 xl:col-span-5" : "lg:col-span-5"} lg:sticky lg:top-20 lg:self-start max-h-[calc(100vh-5.5rem)] overflow-y-auto scrollbar-none pr-1 space-y-3`}>
              {/* Professional Purchase Selection Box (Ultra-Compact & Sleek Spacing) */}
              <div className="bg-white border border-[#e4e4e7] rounded-[18px] p-3.5 sm:p-4 space-y-2.5 shadow-2xs">
                {/* Title & Short Description */}
                <div className="space-y-1 border-b border-black/[0.08] pb-2.5">
                  <h1 className="font-display text-lg sm:text-xl xl:text-2xl font-bold uppercase tracking-tight text-zinc-950 leading-tight">
                    {product.name}
                  </h1>

                  {product.shortDescription && (
                    <p className="text-xs text-zinc-600 font-sans leading-snug pt-0.5">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Price */}
                  <div className="pt-1 flex items-baseline gap-2">
                    <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] font-sans text-zinc-500">
                      (incl. all taxes · Free standard shipping)
                    </span>
                  </div>
                </div>

                {/* Color Swatch Selector */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-semibold text-zinc-900">
                      Color: <span className="text-zinc-600 font-normal">{selectedColor.name}</span>
                    </span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      {colors.length} {colors.length === 1 ? "Option" : "Options"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {colors.map((color, idx) => {
                      const isSelected = selectedColorIdx === idx;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColorIdx(idx)}
                          title={color.name}
                          aria-label={`Select color ${color.name}`}
                          className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${isSelected
                            ? "ring-2 ring-black ring-offset-2 scale-105 shadow-xs"
                            : "hover:scale-105 opacity-80 hover:opacity-100"
                            }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-black/20 block"
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* "What fits in this bag?" interactive link row (Slim & Compact) */}
                <button
                  type="button"
                  onClick={() => setWhatFitsOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-black/10 transition-colors font-sans text-zinc-800 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <Ruler className="h-3 w-3 text-zinc-600" />
                    <span className="font-semibold text-[10.5px]">Check bag capacity & dimensions</span>
                  </div>
                  <span className="font-display text-[9.5px] font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-0.5">
                    View Guide <ChevronRight className="h-2.5 w-2.5" />
                  </span>
                </button>

                {/* Add to Basket & Wishlist Side by Side */}
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    onClick={handleAddToBasket}
                    className="flex-1 btn-sweep sweep-light border border-black bg-black text-white py-2.5 px-5 font-display text-xs font-bold uppercase tracking-brand-wide flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors cursor-pointer rounded-full shadow-xs"
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Added to Basket</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Add to Basket — ₹{product.price.toLocaleString("en-IN")}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all cursor-pointer ${isWishlisted
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-black/20 hover:border-black text-zinc-800 hover:bg-black/5"
                      }`}
                  >
                    <Heart
                      className={`h-4 w-4 transition-transform ${isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-zinc-800"
                        }`}
                    />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-black/[0.08] text-[10px] font-sans text-zinc-600">
                  <div className="flex items-center gap-1">
                    <Truck className="h-3 w-3 text-zinc-800 shrink-0" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RotateCcw className="h-3 w-3 text-zinc-800 shrink-0" />
                    <span>7-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-zinc-800 shrink-0" />
                    <span>100% Authentic</span>
                  </div>
                </div>
              </div>

              {/* Expandable Accordions & Craft Story Card (Matching Clothes Page Style) */}
              <div className="bg-white border border-[#e4e4e7] rounded-[18px] p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="space-y-0 divide-y divide-black/10">
                  {/* 1. DETAILS ACCORDION */}
                  <div className="pb-3">
                    <button
                      onClick={() => setDetailsOpen(!detailsOpen)}
                      className="w-full flex items-center justify-between font-display text-xs sm:text-sm font-bold uppercase tracking-brand py-1 text-zinc-950 hover:text-zinc-600 transition-colors text-left cursor-pointer"
                    >
                      <span>Details</span>
                      {detailsOpen ? (
                        <Minus className="h-4 w-4 text-zinc-900" />
                      ) : (
                        <Plus className="h-4 w-4 text-zinc-900" />
                      )}
                    </button>

                    <AnimatePresence>
                      {detailsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pt-2 pb-2"
                        >
                          <ul className="space-y-2 font-sans text-xs text-zinc-600">
                            {product.details?.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            )) || (
                                <>
                                  <li className="flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                    <span>Distressed fine-grain leather with metallic chrome hardware</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                    <span>Main compartment with dual polished silver zip fastening</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                    <span>Interior zip safety pocket and slip card compartment</span>
                                  </li>
                                </>
                              )}
                          </ul>

                          {/* Dimensions Callout inside Details */}
                          {product.dimensions && (
                            <div className="mt-3.5 p-3 bg-zinc-50 border border-black/5 rounded-xl space-y-1 text-[11px] font-sans text-zinc-700">
                              <p className="font-semibold text-zinc-900">
                                Dimensions: {product.dimensions.height} (H) × {product.dimensions.width} (W) × {product.dimensions.depth} (D)
                              </p>
                              {product.dimensions.strapDrop && (
                                <p>Strap Drop: {product.dimensions.strapDrop}</p>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 2. MATERIAL & CARE ACCORDION */}
                  <div className="py-3">
                    <button
                      onClick={() => setMaterialCareOpen(!materialCareOpen)}
                      className="w-full flex items-center justify-between font-display text-xs sm:text-sm font-bold uppercase tracking-brand py-1 text-zinc-950 hover:text-zinc-600 transition-colors text-left cursor-pointer"
                    >
                      <span>Material & Care</span>
                      {materialCareOpen ? (
                        <Minus className="h-4 w-4 text-zinc-900" />
                      ) : (
                        <Plus className="h-4 w-4 text-zinc-900" />
                      )}
                    </button>

                    <AnimatePresence>
                      {materialCareOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pt-2 pb-2"
                        >
                          <ul className="space-y-2 font-sans text-xs text-zinc-600">
                            {product.materialCare?.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            )) || (
                                <>
                                  <li className="flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                    <span>Outer material: 100% fine cowhide leather</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                    <span>Hardware: Polished silver-tone zinc alloy (rust-resistant)</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-800 mt-1.5 shrink-0" />
                                    <span>Care: Clean with a soft, slightly damp cloth. Avoid direct moisture.</span>
                                  </li>
                                </>
                              )}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 3. SHIPPING & RETURNS ACCORDION */}
                  <div className="pt-3">
                    <button
                      onClick={() => setShippingOpen(!shippingOpen)}
                      className="w-full flex items-center justify-between font-display text-xs sm:text-sm font-bold uppercase tracking-brand py-1 text-zinc-950 hover:text-zinc-600 transition-colors text-left cursor-pointer"
                    >
                      <span>Shipping & Returns</span>
                      {shippingOpen ? (
                        <Minus className="h-4 w-4 text-zinc-900" />
                      ) : (
                        <Plus className="h-4 w-4 text-zinc-900" />
                      )}
                    </button>

                    <AnimatePresence>
                      {shippingOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pt-2 pb-2 font-sans text-xs text-zinc-600 space-y-2"
                        >
                          <p>
                            <strong className="text-zinc-900 font-semibold">Standard Delivery:</strong> 2–4 business days across India. Dispatched in custom dust bag & protective rigid box.
                          </p>
                          <p>
                            <strong className="text-zinc-900 font-semibold">Returns:</strong> 7-day hassle-free returns on unused items with original tags attached.
                          </p>
                          <p>
                            <strong className="text-zinc-900 font-semibold">Payments:</strong> UPI, Cards, NetBanking, and Cash on Delivery accepted.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Product Story / Description Block */}
                <div className="pt-3 border-t border-black/[0.08] space-y-2">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-zinc-950">
                    {product.storyTitle || `${product.name} | Craft Story`}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-zinc-600">
                    {product.storyDescription || product.description}
                  </p>

                  {/* Item SKU */}
                  <div className="pt-1 text-[11px] font-sans text-zinc-400">
                    Item number: {product.sku || "NV-2026-BAG01"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM SECTION: "YOU MIGHT ALSO LIKE" CAROUSEL             */}
        {/* ========================================================= */}
        <div className="border-t border-black/10 mt-12 sm:mt-16">
          <ProductCarousel
            title="You Might Also Like"
            badge="CURATED RECOMMENDATIONS"
            subtitle="Explore complementary dark aesthetic and cyber silhouettes"
            products={relatedBags.length > 0 ? relatedBags : products}
            viewAllLink="/shop"
            viewAllText="Explore All Bags"
          />
        </div>

        {/* ========================================================= */}
        {/* ADDITIONAL: "THIS IS WHAT OTHER CUSTOMERS ALSO CHOSE"     */}
        {/* ========================================================= */}
        <div className="border-t border-black/10 bg-zinc-50/50">
          <ProductCarousel
            title="This Is What Other Customers Have Additionally Chosen"
            badge="POPULAR DROPS"
            subtitle="Trending accessories and limited releases"
            products={otherCustomersChosen}
            viewAllLink="/shop"
            viewAllText="View Catalog"
          />
        </div>
      </div>

      {/* What Fits Modal */}
      <WhatFitsModal
        isOpen={whatFitsOpen}
        onClose={() => setWhatFitsOpen(false)}
        product={product}
      />
    </>
  );
}
