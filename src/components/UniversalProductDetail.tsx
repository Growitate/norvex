import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Check,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  Sparkles,
  Ruler,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
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
  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const primaryImage = gallery[0] || product.image;
  const secondaryAngles = gallery.slice(1);

  // Active Hero Image Index (defaults to first image, changes on click)
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

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

  // Available Sizes
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL", "XXL"];
  const soldOutSizes = product.soldOutSizes || [];
  const defaultSize = sizes.find((s) => !soldOutSizes.includes(s)) || sizes[0];
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);

  // Color Swatches
  const colors = product.colors || [];
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // States
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const addToCart = useCart((s) => s.add);
  const setCartOpen = useCart((s) => s.setOpen);

  const related = products.filter((p) => !p.isBag && p.id !== product.id).slice(0, 6);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: gallery[activeHeroIdx] || product.image,
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
      image: gallery[activeHeroIdx] || product.image,
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
    <div className="bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white min-h-screen">
      {/* Fixed Header Spacer */}
      <div className="h-14 sm:h-16 bg-white" />

      {/* Top Breadcrumb Bar */}
      <div className="border-b border-black/[0.06] bg-zinc-50/50">
        <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-8 py-3">
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

      {/* Main Grid Container */}
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* MOBILE ONLY: 100% FULL-BLEED EDGE-TO-EDGE SIDEWAYS SWIPE CAROUSEL         */}
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
                  className="relative aspect-[3/4.2] w-screen shrink-0 snap-center bg-zinc-950 overflow-hidden cursor-zoom-in select-none"
                >
                  {/* New Drop Pill */}
                  {idx === 0 && product.isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 font-display text-[9px] uppercase tracking-brand font-semibold rounded-full shadow-xs">
                        <Sparkles className="h-2.5 w-2.5 text-zinc-300" />
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
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs cursor-pointer ${
                      isWishlisted
                        ? "bg-black text-white"
                        : "bg-white/90 text-zinc-800 border border-black/10"
                    }`}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        isWishlisted ? "fill-white text-white" : "text-zinc-800"
                      }`}
                    />
                  </button>

                  {/* Bottom-Left Minimal Counter Tag (Exact Screenshot Style: "7 / 9") */}
                  <div className="absolute bottom-4 left-4 z-10 text-white font-sans text-xs font-semibold tracking-wider drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] select-none">
                    {idx + 1} / {gallery.length}
                  </div>

                  {/* 100% Fully Filled Edge-to-Edge Product Image */}
                  <img
                    src={imgSrc}
                    alt={`${product.name} — angle ${idx + 1}`}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-center pointer-events-none"
                  />
                </div>
              ))}
            </div>

            {/* Pagination Dots Indicator */}
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
          {/* COLUMN 1: LEFT PRIMARY FULL HERO LOOK (STATIC & FIXED TO GALLERY[0])       */}
          {/* ========================================================================= */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 lg:sticky lg:top-20 lg:self-start">
            <div
              onClick={() => openLightbox(0)}
              className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] w-full bg-zinc-50 rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm group select-none cursor-zoom-in"
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
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Static Lookbook Tag */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xs text-white text-[11px] font-sans px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Layers className="h-3 w-3 text-zinc-300" />
                <span>Angle 1 of {gallery.length}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2: CENTER VERTICAL STREAM OF SECONDARY ANGLES (STARTS FROM ANGLE 2) */}
          {/* ========================================================================= */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 space-y-4 sm:space-y-6">
            {secondaryAngles.length > 0 ? (
              secondaryAngles.map((imgSrc, idx) => {
                const angleNumber = idx + 2;

                return (
                  <div
                    key={idx}
                    onClick={() => openLightbox(idx + 1)}
                    className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] w-full bg-zinc-50 rounded-2xl overflow-hidden border border-black/[0.08] hover:border-black/50 shadow-sm transition-all duration-300 group select-none cursor-zoom-in"
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} — angle ${angleNumber}`}
                      loading={idx < 2 ? "eager" : "lazy"}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
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
          {/* COLUMN 3: RIGHT STICKY PURCHASE PANEL (Exact Bluorng / Img 2 Style)        */}
          {/* ========================================================================= */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-4 lg:sticky lg:top-20 space-y-6 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-none pr-1">
            {/* Title, Bookmark & Price */}
            <div className="space-y-2 border-b border-black/[0.08] pb-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400 block mb-1">
                    NORVEX // {product.category}
                  </span>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-950 leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Inline Bookmark Icon matching Bluorng Header */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Wishlist"
                  className="p-1.5 text-zinc-800 hover:text-black transition-colors cursor-pointer"
                >
                  <Bookmark
                    className={`h-5 w-5 ${
                      isWishlisted ? "fill-black text-black" : "text-zinc-700"
                    }`}
                  />
                </button>
              </div>

              {/* Price */}
              <div className="pt-1 flex items-baseline gap-3">
                <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                  Rs. {product.price.toLocaleString("en-IN")}.00
                </span>
                <span className="text-[11px] font-sans text-zinc-500">
                  (MRP incl. of all taxes)
                </span>
              </div>
            </div>

            {/* Optional Color Swatches */}
            {colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-semibold text-zinc-900">
                    Color:{" "}
                    <span className="text-zinc-600 font-normal">
                      {colors[selectedColorIdx]?.name}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {colors.map((color, idx) => {
                    const isSelected = selectedColorIdx === idx;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIdx(idx)}
                        title={color.name}
                        className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "ring-2 ring-black ring-offset-2 scale-105"
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
            )}

            {/* Size Selector as Pill Buttons (Matching Bluorng 2-Row Grid) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-semibold text-zinc-900">Select Size</span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-zinc-600 hover:text-black font-semibold flex items-center gap-1 transition-colors cursor-pointer text-[11px] underline underline-offset-2"
                >
                  <Ruler className="h-3 w-3" />
                  <span>Size Guide</span>
                </button>
              </div>

              {/* 2-Row Pill Button Grid */}
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((s) => {
                  const isSoldOut = soldOutSizes.includes(s);
                  const isSelected = selectedSize === s && !isSoldOut;

                  return (
                    <button
                      key={s}
                      disabled={isSoldOut}
                      onClick={() => setSelectedSize(s)}
                      className={`h-11 rounded-full font-sans text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                        isSoldOut
                          ? "opacity-30 line-through bg-zinc-100 border border-zinc-200 text-zinc-400 cursor-not-allowed"
                          : isSelected
                            ? "bg-[#18181b] text-white border border-[#18181b] shadow-xs"
                            : "bg-white text-zinc-800 border border-black/15 hover:border-black hover:bg-black/5"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stacked CTAs: ADD TO BAG (Outline) + BUY NOW (Solid Black) */}
            <div className="space-y-2.5 pt-2">
              {/* ADD TO BAG Outline Pill */}
              <button
                onClick={handleAddToCart}
                disabled={soldOutSizes.includes(selectedSize)}
                className="w-full h-12 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white font-display text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.99]"
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 stroke-[3]" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add To Bag</span>
                  </>
                )}
              </button>

              {/* BUY NOW Solid Black Pill */}
              <button
                onClick={handleBuyNow}
                disabled={soldOutSizes.includes(selectedSize)}
                className="w-full h-12 rounded-full bg-black text-white hover:bg-zinc-800 font-display text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.99]"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Buy It Now</span>
              </button>
            </div>

            {/* Delivery & Return Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-black/[0.08] text-xs font-sans text-zinc-600">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-zinc-800 shrink-0" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-zinc-800 shrink-0" />
                <span>7-Day Easy Exchange</span>
              </div>
            </div>

            {/* Tabs: Details & Description | Washcare | Shipping (Bluorng exact style) */}
            <div className="space-y-4 pt-1">
              <div className="flex border-b border-black/10">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 pb-2.5 font-sans text-xs font-bold transition-all border-b-2 cursor-pointer text-left ${
                    activeTab === "details"
                      ? "border-black text-zinc-950"
                      : "border-transparent text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  Details & Description
                </button>
                <button
                  onClick={() => setActiveTab("washcare")}
                  className={`flex-1 pb-2.5 font-sans text-xs font-bold transition-all border-b-2 cursor-pointer text-left ${
                    activeTab === "washcare"
                      ? "border-black text-zinc-950"
                      : "border-transparent text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  Washcare
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`flex-1 pb-2.5 font-sans text-xs font-bold transition-all border-b-2 cursor-pointer text-left ${
                    activeTab === "shipping"
                      ? "border-black text-zinc-950"
                      : "border-transparent text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  Shipping
                </button>
              </div>

              {/* Tab Content Panes */}
              <div className="min-h-[140px] pt-1">
                <AnimatePresence mode="wait">
                  {/* TAB 1: Details & Description */}
                  {activeTab === "details" && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {/* Specifications List */}
                      <div className="space-y-1.5 text-xs font-sans text-zinc-700">
                        <p className="font-bold text-zinc-900 mb-1">Details</p>
                        {product.details ? (
                          product.details.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>{item}</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>100% bio-washed cotton French terry</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Weight - 280 gsm dense weave</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>High-density gothic embroidery & screenprint</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Oversize drop-shoulder fit</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Description Paragraph */}
                      <div className="pt-2 border-t border-black/5 text-xs font-sans text-zinc-600 leading-relaxed space-y-2">
                        <p className="font-bold text-zinc-900">Description</p>
                        <p>{product.description}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Washcare */}
                  {activeTab === "washcare" && (
                    <motion.div
                      key="washcare"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3"
                    >
                      <p className="font-bold text-zinc-900 text-xs">Care Instructions</p>
                      <div className="space-y-2 font-sans text-xs text-zinc-600">
                        {product.washcare?.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-zinc-400">•</span>
                            <span>{item}</span>
                          </div>
                        )) || (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Cold machine wash reverse (30°C delicate cycle)</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Wash with similar dark colors only</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Do not iron directly over embroidery or prints</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Line dry flat in shade; do not tumble dry</span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Shipping */}
                  {activeTab === "shipping" && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-3"
                    >
                      <p className="font-bold text-zinc-900 text-xs">Delivery & Return Policies</p>
                      <div className="space-y-2 font-sans text-xs text-zinc-600">
                        {product.shippingInfo?.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-zinc-400">•</span>
                            <span>{item}</span>
                          </div>
                        )) || (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Dispatches within 24–48 hours from studio</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Standard express courier delivery in 2–4 business days</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>7-day easy size exchange guarantee</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-zinc-400">•</span>
                              <span>Prepaid and Cash on Delivery supported pan-India</span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                    onClick={() => {
                      setLightboxIdx(idx);
                      setActiveHeroIdx(idx);
                    }}
                    className={`w-14 h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      lightboxIdx === idx ? "border-white scale-105" : "border-white/20 opacity-60 hover:opacity-100"
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
