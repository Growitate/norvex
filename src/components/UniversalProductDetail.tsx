import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Ruler,
  Sparkles,
  Layers,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCarousel } from "./ProductCarousel";

interface UniversalProductDetailProps {
  product: Product;
}

type TabType = "details" | "washcare" | "shipping";

export function UniversalProductDetail({ product }: UniversalProductDetailProps) {
  const gallery = useMemo(
    () =>
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image],
    [product.gallery, product.image]
  );

  const primaryImage = gallery[0] || product.image;
  const secondaryAngles = gallery.slice(1);

  // Mobile Sideways Carousel State
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (mobileScrollRef.current) {
      const { scrollLeft, clientWidth } = mobileScrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveMobileIdx(Math.min(Math.max(index, 0), gallery.length - 1));
    }
  };

  const scrollToMobileIndex = (index: number) => {
    if (mobileScrollRef.current) {
      const clientWidth = mobileScrollRef.current.clientWidth;
      mobileScrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth",
      });
      setActiveMobileIdx(index);
    }
  };

  // Fullscreen Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // Available Sizes matching exact screenshot
  const sizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const soldOutSizes = product.soldOutSizes || [];
  const defaultSize = sizes.find((s) => !soldOutSizes.includes(s)) || sizes[0];
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);

  // States
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Last Image Intersection / Scroll Detection
  const lastIndex = Math.max(0, gallery.length - 1);
  const lastImageRef = useRef<HTMLDivElement>(null);
  const [isLastImageInView, setIsLastImageInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const el = lastImageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.75) {
        setIsLastImageInView(true);
      } else {
        setIsLastImageInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [product.id]);

  const isOverlapTriggered =
    activeMobileIdx >= lastIndex || isLastImageInView;

  const addToCart = useCart((s) => s.add);
  const setCartOpen = useCart((s) => s.setOpen);

  const related = products.filter((p) => !p.isBag && p.id !== product.id).slice(0, 6);
  const recentlyViewed = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      size: selectedSize,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      size: selectedSize,
    });

    setCartOpen(true);
  };

  const openLightbox = (index: number) => {
    setLightboxIdx(index);
    setLightboxOpen(true);
  };

  const handlePrevLightbox = () => {
    setLightboxIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextLightbox = () => {
    setLightboxIdx((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#ededf0] text-zinc-900 selection:bg-zinc-900 selection:text-white min-h-screen font-sans pb-16">
      {/* Header Spacer */}
      <div className="h-14 sm:h-16 bg-white" />

      {/* Top Navigation / Breadcrumb */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-8 py-2">
          <nav className="flex items-center gap-2 text-xs font-sans text-zinc-500 font-medium">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span className="text-zinc-400 font-normal">&gt;</span>
            <Link
              to="/shop"
              search={{ category: product.category }}
              className="hover:text-black transition-colors"
            >
              {product.category}
            </Link>
            <span className="text-zinc-400 font-normal">&gt;</span>
            <span className="text-zinc-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Grid Layout Container */}
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-8 pt-2 sm:pt-3.5 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
          
          {/* ========================================================================= */}
          {/* MOBILE ONLY: 100% FULL-BLEED CAROUSEL                                     */}
          {/* ========================================================================= */}
          <div className="lg:hidden col-span-1 -mx-4 sm:-mx-6 space-y-3 pb-3">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-0 touch-pan-x overscroll-x-contain"
              style={{
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
              }}
            >
              {gallery.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative aspect-[3/4.2] w-screen shrink-0 snap-center bg-zinc-100 overflow-hidden cursor-zoom-in select-none"
                >
                  {/* Image counter pill bottom left */}
                  <div className="absolute bottom-4 left-4 z-10 text-white font-sans text-xs font-semibold tracking-wider drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] select-none bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                    {idx + 1} / {gallery.length}
                  </div>

                  <img
                    src={imgSrc}
                    alt={`${product.name} — angle ${idx + 1}`}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {gallery.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-0.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToMobileIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeMobileIdx === i ? "w-6 bg-black" : "w-1.5 bg-black/20"
                    }`}
                    aria-label={`View angle ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 1: LEFT PRIMARY HERO LOOK (MATCHES EXACT SCREENSHOT ROUNDED CORNERS)*/}
          {/* ========================================================================= */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 lg:sticky lg:top-16 lg:self-start">
            <div
              ref={lastIndex === 0 ? lastImageRef : null}
              onClick={() => openLightbox(0)}
              className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] w-full bg-white rounded-[24px] overflow-hidden border border-[#e4e4e7] shadow-2xs group select-none cursor-zoom-in"
            >
              {/* New Drop Pill */}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWishlisted(!isWishlisted);
                }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-4 right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-xs ${
                  isWishlisted
                    ? "bg-black text-white"
                    : "bg-white/90 hover:bg-white text-zinc-800 hover:scale-105 active:scale-95 border border-black/10"
                }`}
              >
                <Bookmark
                  className={`h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform ${
                    isWishlisted ? "fill-white text-white scale-110" : "text-zinc-800"
                  }`}
                />
              </button>

              {/* Fullscreen Inspector Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(0);
                }}
                className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center backdrop-blur-md border border-black/10 opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer"
                title="Inspect in Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Primary Static Hero Image */}
              <img
                src={primaryImage}
                alt={`${product.name} — main look`}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              />

              {/* Static Lookbook Tag */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xs text-white text-[11px] font-sans px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Layers className="h-3 w-3 text-zinc-300" />
                <span>Angle 1 of {gallery.length}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2: CENTER VERTICAL STREAM OF SECONDARY ANGLES                       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 space-y-3.5 -ml-2.5 sm:-ml-3">
            {secondaryAngles.length > 0 ? (
              secondaryAngles.map((imgSrc, idx) => {
                const angleNumber = idx + 2;
                const isLast = idx + 1 === lastIndex;

                return (
                  <div
                    key={idx}
                    ref={isLast ? lastImageRef : null}
                    onClick={() => openLightbox(idx + 1)}
                    className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] w-full bg-white rounded-[24px] overflow-hidden border border-[#e4e4e7] hover:border-zinc-400 shadow-2xs transition-all duration-300 group select-none cursor-zoom-in"
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} — angle ${angleNumber}`}
                      loading={idx < 2 ? "eager" : "lazy"}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                    />

                    {/* Angle Tag */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-xs text-white text-[10px] font-sans px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span>Angle {angleNumber} of {gallery.length}</span>
                      <span className="text-zinc-400">· Click to zoom</span>
                    </div>
                  </div>
                );
              })
            ) : null}
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 3: RIGHT STICKY PURCHASE PANEL (PERMANENTLY PINNED ALONGSIDE GALLERY) */}
          {/* ========================================================================= */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-4 lg:sticky lg:top-20 lg:self-start space-y-3.5 pr-0.5 pt-8 sm:pt-12 lg:pt-16">
            
            {/* ----------------------------------------------------------------------- */}
            {/* CARD 1: PURCHASE SELECTION BOX (DESKTOP STICKY OVERLAP ONLY)           */}
            {/* ----------------------------------------------------------------------- */}
            <div
              className={`bg-white border border-[#e4e4e7] rounded-[18px] p-4 sm:p-5 space-y-2.5 transition-all duration-500 relative z-10 shadow-2xs ${
                isOverlapTriggered
                  ? "lg:sticky lg:top-24 lg:z-20 lg:shadow-md"
                  : ""
              }`}
            >
              
              {/* Row 1: Product Title & Bookmark & Price & Size Guide */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="font-bold text-zinc-950 text-base sm:text-lg tracking-tight leading-snug flex items-center gap-1.5">
                    <span>{product.name}</span>
                    <button
                      type="button"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      aria-label="Save to Wishlist"
                      className="p-0.5 text-zinc-700 hover:text-black transition-colors inline-flex cursor-pointer"
                    >
                      <Bookmark
                        className={`h-4 w-4 transition-all ${
                          isWishlisted ? "fill-zinc-800 text-zinc-800" : "fill-zinc-400 text-zinc-400"
                        }`}
                      />
                    </button>
                  </h1>

                  {/* Price: RS. 8,900 */}
                  <p className="text-zinc-500 font-normal text-xs mt-0.5">
                    RS. {product.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Size Guide Button on Top Right */}
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="bg-[#e4e4e7] hover:bg-[#d4d4d8] text-zinc-800 font-medium text-[11px] px-2.5 py-1 rounded-md cursor-pointer transition-colors shrink-0 mt-0.5"
                >
                  Size Guide
                </button>
              </div>

              {/* Row 2: Size Selector Pills Grid */}
              <div className="pt-1">
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    const isSoldOut = soldOutSizes.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={isSoldOut}
                        onClick={() => setSelectedSize(s)}
                        className={`h-9 sm:h-10 rounded-full font-semibold text-[11px] transition-all cursor-pointer flex items-center justify-center ${
                          isSoldOut
                            ? "bg-zinc-50 border border-zinc-200 text-zinc-400 line-through cursor-not-allowed opacity-50"
                            : isSelected
                              ? "bg-[#18181b] text-white border border-[#18181b] shadow-2xs"
                              : "bg-white border border-[#e4e4e7] text-zinc-800 hover:border-black"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Action Buttons (ADD TO BAG & BUY NOW) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* ADD TO BAG Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={soldOutSizes.includes(selectedSize)}
                  className="w-full py-2.5 sm:py-3 rounded-full border border-[#e4e4e7] bg-white text-zinc-950 font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-50 transition-colors cursor-pointer text-center"
                >
                  {isAdded ? "ADDED TO BAG" : "ADD TO BAG"}
                </button>

                {/* BUY NOW Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={soldOutSizes.includes(selectedSize)}
                  className="w-full py-2.5 sm:py-3 rounded-full bg-black text-white font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer text-center shadow-xs"
                >
                  BUY NOW
                </button>
              </div>

            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 2: DETAILS & DESCRIPTION TAB CARD (DESKTOP UNDERLAP ONLY)          */}
            {/* ----------------------------------------------------------------------- */}
            <div
              className={`bg-white border border-[#e4e4e7] rounded-[18px] p-4 sm:p-5 shadow-2xs transition-all duration-500 relative z-10 mt-3.5 ${
                isOverlapTriggered ? "lg:-mt-5 lg:shadow-md" : ""
              }`}
            >
              
              {/* Tabs Header */}
              <div className="flex border-b border-zinc-200/90 pb-2.5 justify-between items-center text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab("details")}
                  className={`pb-2.5 -mb-[11px] font-sans text-xs sm:text-[13px] transition-all cursor-pointer ${
                    activeTab === "details"
                      ? "border-b-[2.5px] border-zinc-800 text-zinc-950 font-bold"
                      : "border-b-[2.5px] border-transparent text-zinc-400 hover:text-zinc-700 font-medium"
                  }`}
                >
                  Details & Description
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("washcare")}
                  className={`pb-2.5 -mb-[11px] font-sans text-xs sm:text-[13px] transition-all cursor-pointer ${
                    activeTab === "washcare"
                      ? "border-b-[2.5px] border-zinc-800 text-zinc-950 font-bold"
                      : "border-b-[2.5px] border-transparent text-zinc-400 hover:text-zinc-700 font-medium"
                  }`}
                >
                  Washcare
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2.5 -mb-[11px] font-sans text-xs sm:text-[13px] transition-all cursor-pointer ${
                    activeTab === "shipping"
                      ? "border-b-[2.5px] border-zinc-800 text-zinc-950 font-bold"
                      : "border-b-[2.5px] border-transparent text-zinc-400 hover:text-zinc-700 font-medium"
                  }`}
                >
                  Shipping
                </button>
              </div>

              {/* Tab Contents */}
              <div className="pt-3.5">
                <AnimatePresence mode="wait">
                  {/* TAB 1: Details & Description */}
                  {activeTab === "details" && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.12 }}
                      className="space-y-3.5"
                    >
                      {/* Details Section */}
                      <div>
                        <p className="font-bold text-zinc-950 text-xs sm:text-[13px] mb-1.5">Details</p>
                        <div className="space-y-0.5 text-zinc-600 text-xs sm:text-[12px] leading-snug font-normal pl-4">
                          {(
                            product.details || [
                              "100% terrycotton",
                              "Weight - 330 gsm",
                              "8,00,000 embroidery stitches",
                              "Oversize fit",
                            ]
                          ).map((detail, idx) => (
                            <p key={idx}>{detail}</p>
                          ))}
                        </div>
                      </div>

                      {/* Description Section */}
                      <div>
                        <p className="font-bold text-zinc-950 text-xs sm:text-[13px] mb-1.5">Description</p>
                        <div className="space-y-2 text-zinc-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                          {(product.description || "").split("\n\n").map((paragraph, idx) => {
                            if (!paragraph) return null;
                            if (paragraph.toLowerCase().includes("wears a size")) {
                              const match = paragraph.match(/(.*wears a size\s+)(\w+)(.*)/i);
                              if (match && match[1] && match[2]) {
                                return (
                                  <p key={idx}>
                                    {match[1]}
                                    <strong className="font-bold text-zinc-950">{match[2]}</strong>
                                    {match[3] || ""}
                                  </p>
                                );
                              }
                            }
                            return <p key={idx}>{paragraph}</p>;
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Washcare */}
                  {activeTab === "washcare" && (
                    <motion.div
                      key="washcare"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.12 }}
                      className="space-y-2"
                    >
                      <p className="font-bold text-zinc-950 text-xs sm:text-[13px] mb-1.5">Washcare Instructions</p>
                      <div className="space-y-1 text-zinc-600 text-xs sm:text-[12px] leading-snug font-normal pl-4">
                        {(
                          product.washcare || [
                            "Dry clean only or cold hand wash",
                            "Do not bleach or tumble dry",
                            "Steam iron inside out on low heat setting",
                            "Store folded to retain shoulder structure",
                          ]
                        ).map((item, idx) => (
                          <p key={idx}>{item}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Shipping */}
                  {activeTab === "shipping" && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.12 }}
                      className="space-y-2"
                    >
                      <p className="font-bold text-zinc-950 text-xs sm:text-[13px] mb-1.5">Shipping Information</p>
                      <div className="space-y-1 text-zinc-600 text-xs sm:text-[12px] leading-snug font-normal pl-4">
                        {(
                          product.shippingInfo || [
                            "Dispatches within 24-48 hours",
                            "Free express shipping pan-India",
                            "7-day easy exchange and return policy",
                          ]
                        ).map((item, idx) => (
                          <p key={idx}>{item}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* RECENTLY VIEWED & STYLING IDEAS SECTIONS (Matches Image 1 Bottom Layout)    */}
        {/* ========================================================================= */}
        <div className="mt-16 space-y-12 border-t border-zinc-200/80 pt-10">
          
          {/* Recently Viewed Grid */}
          <div>
            <h3 className="font-bold text-zinc-950 text-sm uppercase tracking-wide mb-4">
              Recently viewed
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewed.map((item) => (
                <Link
                  key={item.id}
                  to="/product/$id"
                  params={{ id: item.id }}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-900 mb-2 border border-zinc-200/60 shadow-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-zinc-800 shadow-2xs">
                        <Bookmark className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-xs text-zinc-900 truncate group-hover:underline">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    RS. {item.price.toLocaleString("en-IN")}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Styling Ideas Grid */}
          <div>
            <h3 className="font-bold text-zinc-950 text-sm uppercase tracking-wide mb-4">
              Styling ideas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {related.slice(0, 2).map((item) => (
                <Link
                  key={item.id}
                  to="/product/$id"
                  params={{ id: item.id }}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-900 mb-2 border border-zinc-200/60 shadow-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                  <h4 className="font-bold text-xs text-zinc-900 truncate group-hover:underline">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    RS. {item.price.toLocaleString("en-IN")}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen High-Definition Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 select-none">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev / Next Controls */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextLightbox}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Center High-Res Image */}
            <div className="relative max-h-[82vh] max-w-4xl w-full flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIdx}
                  src={gallery[lightboxIdx]}
                  alt={`${product.name} — high resolution angle ${lightboxIdx + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
                />
              </AnimatePresence>

              {/* Thumbnails below lightbox */}
              <div className="flex items-center gap-2 pt-4 overflow-x-auto max-w-full px-2">
                {gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIdx(idx)}
                    className={`w-14 h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      lightboxIdx === idx
                        ? "border-white scale-105"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
              onClick={() => setSizeGuideOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 z-10 shadow-2xl border border-black/10 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-zinc-900" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-zinc-950">
                    Oversized Fit Size Guide
                  </h3>
                </div>
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-xs text-zinc-600 font-sans">
                Our silhouettes are cut with an intentional boxy drop-shoulder drape. Take your regular size for the intended streetwear fit, or size down for a standard fit.
              </p>

              {/* Measurement Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-sans text-left border border-black/10 rounded-lg overflow-hidden">
                  <thead className="bg-zinc-100 font-bold uppercase tracking-wider text-zinc-900">
                    <tr>
                      <th className="p-3 border-b border-r border-black/10">Size</th>
                      <th className="p-3 border-b border-r border-black/10">Chest (in)</th>
                      <th className="p-3 border-b border-r border-black/10">Length (in)</th>
                      <th className="p-3 border-b border-black/10">Shoulder (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 text-zinc-700">
                    <tr>
                      <td className="p-3 font-bold border-r border-black/10 bg-zinc-50">S</td>
                      <td className="p-3 border-r border-black/10">44"</td>
                      <td className="p-3 border-r border-black/10">28"</td>
                      <td className="p-3">21.5"</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold border-r border-black/10 bg-zinc-50">M</td>
                      <td className="p-3 border-r border-black/10">46"</td>
                      <td className="p-3 border-r border-black/10">29"</td>
                      <td className="p-3">22.5"</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold border-r border-black/10 bg-zinc-50">L</td>
                      <td className="p-3 border-r border-black/10">48"</td>
                      <td className="p-3 border-r border-black/10">30"</td>
                      <td className="p-3">23.5"</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold border-r border-black/10 bg-zinc-50">XL</td>
                      <td className="p-3 border-r border-black/10">50"</td>
                      <td className="p-3 border-r border-black/10">31"</td>
                      <td className="p-3">24.5"</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold border-r border-black/10 bg-zinc-50">XXL</td>
                      <td className="p-3 border-r border-black/10">52"</td>
                      <td className="p-3 border-r border-black/10">32"</td>
                      <td className="p-3">25.5"</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  className="px-5 py-2.5 bg-black text-white text-xs font-display uppercase tracking-wider font-bold rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble Button at Bottom Right (Matches Image 2) */}
      <button
        type="button"
        aria-label="Customer Support Chat"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#18181b] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer border border-white/20"
      >
        <MessageSquare className="h-5 w-5 fill-white text-white" />
      </button>

      {/* "Wear It With" / "You Might Also Like" Carousel (Bluorng bottom section) */}
      {related.length > 0 && (
        <div className="border-t border-black/10 mt-12 sm:mt-16">
          <ProductCarousel
            title="Wear It With"
            badge="STYLE RECOMMENDATIONS"
            subtitle="Explore complementary streetwear drops and accessories"
            products={related}
            viewAllLink="/shop"
            viewAllText="Explore Full Collection"
          />
        </div>
      )}
    </div>
  );
}
