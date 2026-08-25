import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Sparkles,
  Maximize2,
  ChevronRight,
  ChevronDown,
  Check,
  ShoppingBag,
  Zap,
  Search,
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Star,
  Minus,
  Plus,
  Layers,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "./ProductCard";

interface AccessoryProductDetailProps {
  product: Product;
}

type TabType = "details" | "care" | "shipping";

// Comprehensive Brand & Model Data matching Zapvi / reference list
const PHONE_BRANDS = [
  {
    name: "Apple",
    models: [
      "iPhone 16 Pro Max",
      "iPhone 16 Pro",
      "iPhone 16 Plus",
      "iPhone 16",
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15 Plus",
      "iPhone 15",
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 14 Plus",
      "iPhone 14",
      "iPhone 13 Pro Max",
      "iPhone 13 Pro",
      "iPhone 13",
      "iPhone 12 Pro Max",
      "iPhone 12 Pro",
      "iPhone 12",
      "iPhone 11 Pro Max",
      "iPhone 11",
    ],
  },
  {
    name: "Samsung",
    models: [
      "Galaxy S24 Ultra",
      "Galaxy S24+",
      "Galaxy S24",
      "Galaxy S23 Ultra",
      "Galaxy S23 FE",
      "Galaxy S23+",
      "Galaxy S23",
      "Galaxy S22 Ultra",
      "Galaxy S22",
      "Galaxy Z Flip 6",
      "Galaxy Z Fold 6",
      "Galaxy A55 5G",
      "Galaxy A35 5G",
      "Galaxy M34 5G",
    ],
  },
  {
    name: "Oneplus",
    models: [
      "OnePlus 12",
      "OnePlus 12R",
      "OnePlus 11",
      "OnePlus 11R",
      "OnePlus Nord 4",
      "OnePlus Nord CE 4",
      "OnePlus Nord CE 3",
      "OnePlus Open",
      "OnePlus 10 Pro",
      "OnePlus 10R",
    ],
  },
  {
    name: "Google",
    models: [
      "Pixel 9 Pro XL",
      "Pixel 9 Pro",
      "Pixel 9",
      "Pixel 8 Pro",
      "Pixel 8a",
      "Pixel 8",
      "Pixel 7 Pro",
      "Pixel 7a",
      "Pixel 7",
      "Pixel 6a",
    ],
  },
  {
    name: "Nothing",
    models: [
      "Nothing Phone (2)",
      "Nothing Phone (2a) Plus",
      "Nothing Phone (2a)",
      "Nothing Phone (1)",
      "CMF Phone 1",
    ],
  },
  {
    name: "iQOO",
    models: [
      "iQOO 12 5G",
      "iQOO Neo 9 Pro",
      "iQOO Z9 5G",
      "iQOO Z9x 5G",
      "iQOO 11 5G",
      "iQOO Neo 7 Pro",
    ],
  },
  {
    name: "Realme",
    models: [
      "Realme GT 6 5G",
      "Realme GT 6T",
      "Realme 13 Pro+ 5G",
      "Realme 12 Pro+ 5G",
      "Realme 12+ 5G",
      "Realme P1 Pro 5G",
      "Realme Narzo 70 Pro",
    ],
  },
  {
    name: "Vivo",
    models: [
      "Vivo X100 Pro",
      "Vivo X100",
      "Vivo V40 Pro",
      "Vivo V40",
      "Vivo V30 Pro",
      "Vivo V30",
      "Vivo T3 5G",
      "Vivo Y200e 5G",
    ],
  },
  {
    name: "Xiaomi",
    models: [
      "Xiaomi 14 Ultra",
      "Xiaomi 14",
      "Xiaomi 14 Civi",
      "Redmi Note 13 Pro+ 5G",
      "Redmi Note 13 Pro 5G",
      "Redmi Note 13 5G",
      "Poco F6 5G",
      "Poco X6 Pro 5G",
      "Poco M6 Pro 5G",
    ],
  },
  {
    name: "Motorola",
    models: [
      "Moto Edge 50 Ultra",
      "Moto Edge 50 Pro",
      "Moto Edge 50 Fusion",
      "Moto G85 5G",
      "Moto G64 5G",
      "Razr 50 Ultra",
    ],
  },
];

export function AccessoryProductDetail({ product }: AccessoryProductDetailProps) {
  const addToCart = useCart((s) => s.add);

  // Gallery state - guarantees 5 angles matching Img 2 product view layout
  const rawGallery: string[] =
    product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const gallery: string[] =
    rawGallery.length >= 5
      ? rawGallery
      : [
          ...rawGallery,
          ...Array(Math.max(0, 5 - rawGallery.length)).fill(rawGallery[0]),
        ];
  const primaryImage = gallery[0] || product.image;
  const secondaryAngles = gallery.slice(1);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const thumbScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbScrollRef.current) return;
    const activeThumb = thumbScrollRef.current.children[activeMobileIdx] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeMobileIdx]);

  // Interactive Device selection state
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 15 Pro");

  // Upsell checkbox state
  const [addGrip, setAddGrip] = useState(false);
  const [addKeyChain, setAddKeyChain] = useState(false);
  const [addScreenGuard, setAddScreenGuard] = useState(false);

  // Modals state
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Cart animation & wishlist state
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("details");

  // Calculations
  const basePrice = product.price || 249;
  const originalPrice = basePrice + 350;
  const gripPrice = addGrip ? 49 : 0;
  const keyChainPrice = addKeyChain ? 29 : 0;
  const screenGuardPrice = addScreenGuard ? 29 : 0;
  const totalPrice = basePrice + gripPrice + keyChainPrice + screenGuardPrice;

  // Active brand data
  const currentBrandObj =
    PHONE_BRANDS.find((b) => b.name === selectedBrand) || PHONE_BRANDS[0];

  // Filtered models for search
  const filteredModels = currentBrandObj.models.filter((m) =>
    m.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    const newBrandObj = PHONE_BRANDS.find((b) => b.name === brandName);
    if (newBrandObj && newBrandObj.models.length > 0) {
      setSelectedModel(newBrandObj.models[0]);
    }
    setBrandModalOpen(false);
  };

  const handleModelSelect = (modelName: string) => {
    setSelectedModel(modelName);
    setModelModalOpen(false);
  };

  const handleAddToCart = () => {
    const addons = [];
    if (addGrip) addons.push("Matching Phone Grip (+₹49)");
    if (addKeyChain) addons.push("Matching Key Chain (+₹29)");
    if (addScreenGuard) addons.push("9D Screen Guard (+₹29)");

    const titleWithAddons =
      addons.length > 0
        ? `${product.name} [${selectedBrand} ${selectedModel}] (with ${addons.join(", ")})`
        : `${product.name} [${selectedBrand} ${selectedModel}]`;

    addToCart({
      id: `${product.id}-${selectedBrand.toLowerCase()}-${selectedModel.toLowerCase().replace(/\s+/g, "-")}`,
      name: titleWithAddons,
      price: totalPrice,
      image: primaryImage,
      size: `${selectedBrand} ${selectedModel}`,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    const active = Math.round(scrollLeft / clientWidth);
    setActiveMobileIdx(active);
  };

  const scrollToMobileIndex = (index: number) => {
    if (!mobileScrollRef.current) return;
    const itemWidth = mobileScrollRef.current.clientWidth;
    mobileScrollRef.current.scrollTo({ left: index * itemWidth, behavior: "smooth" });
    setActiveMobileIdx(index);
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans pb-16 selection:bg-black selection:text-white">
      {/* Top Ticker Bar */}
      <div className="bg-black text-white text-[11px] font-sans tracking-wide py-2 overflow-hidden select-none border-b border-zinc-800">
        <div className="flex animate-marquee whitespace-nowrap gap-12 font-medium">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Hurry! Add ₹150 More to Unlock Free Delivery — Offer Ends Today!</span>
              <span className="text-zinc-600 ml-6">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid Layout Container (Matches UniversalProductDetail.tsx) */}
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-8 pt-0 lg:pt-3.5 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">

          {/* ========================================================================= */}
          {/* MOBILE ONLY: 100% FULL-BLEED CAROUSEL                                     */}
          {/* ========================================================================= */}
          <div className="lg:hidden col-span-1 -mx-4 sm:-mx-6 space-y-1 pb-1 mt-0">
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
                  onClick={() => setLightboxOpen(true)}
                  className="relative aspect-[3/4] w-screen shrink-0 snap-center bg-white overflow-hidden cursor-zoom-in select-none"
                >
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
              <div className="flex items-center justify-center gap-1.5 pt-1">
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

            {/* Horizontal Image Thumbnails Selector (Mobile Friendly Touch Scrollable Track) */}
            {gallery.length > 1 && (
              <div
                ref={thumbScrollRef}
                className="flex items-center justify-center gap-2 overflow-x-auto pt-1 pb-0.5 scrollbar-none px-4 touch-pan-x overscroll-x-contain"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
              >
                {gallery.map((imgSrc, i) => {
                  const isActive = activeMobileIdx === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => scrollToMobileIndex(i)}
                      className={`relative w-14 h-18 sm:w-16 sm:h-20 shrink-0 overflow-hidden bg-white rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? "border-2 border-black shadow-md ring-1 ring-black scale-102"
                          : "border border-zinc-200/80 opacity-70 hover:opacity-100 hover:border-zinc-400"
                      }`}
                      aria-label={`View thumbnail angle ${i + 1}`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${product.name} angle ${i + 1}`}
                        className="w-full h-full object-cover object-center pointer-events-none"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 1: LEFT PRIMARY HERO LOOK (DESKTOP)                                */}
          {/* ========================================================================= */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 lg:sticky lg:top-16 lg:self-start">
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] w-full bg-white rounded-[24px] overflow-hidden border border-[#e4e4e7] shadow-2xs group select-none cursor-zoom-in"
            >
              {/* Discount Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 bg-black text-white px-3 py-1 font-display text-[10px] uppercase tracking-brand font-semibold rounded-full shadow-xs">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  58% OFF
                </span>
              </div>

              {/* Wishlist Bookmark Button */}
              <button
                type="button"
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

              {/* Inspector Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center backdrop-blur-md border border-black/10 opacity-0 group-hover:opacity-100 transition-all shadow-xs cursor-pointer"
                title="Inspect in Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Primary Static Image */}
              <img
                src={primaryImage}
                alt={`${product.name} — main look`}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              />

              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xs text-white text-[11px] font-sans px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Layers className="h-3 w-3 text-zinc-300" />
                <span>Angle 1 of {gallery.length}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2: CENTER VERTICAL STREAM OF SECONDARY ANGLES (DESKTOP)            */}
          {/* ========================================================================= */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 space-y-3.5 -ml-2.5 sm:-ml-3">
            {secondaryAngles.length > 0
              ? secondaryAngles.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxOpen(true)}
                    className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] w-full bg-white rounded-[24px] overflow-hidden border border-[#e4e4e7] hover:border-zinc-400 shadow-2xs transition-all duration-300 group select-none cursor-zoom-in"
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} — angle ${idx + 2}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                    />

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-xs text-white text-[10px] font-sans px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span>Angle {idx + 2} of {gallery.length}</span>
                      <span className="text-zinc-400">· Click to zoom</span>
                    </div>
                  </div>
                ))
              : null}
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 3: RIGHT STICKY PURCHASE PANEL & INFO CARDS (MATCHES CLOTHES PAGE) */}
          {/* ========================================================================= */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-4 lg:sticky lg:top-20 lg:self-start space-y-3 pr-0.5 pt-0 sm:pt-2 lg:pt-16">

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 1: PURCHASE SELECTION BOX                                         */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-white border border-[#e4e4e7] rounded-[18px] p-4 sm:p-5 space-y-3 relative z-10 shadow-2xs">

              {/* Row 1: Product Title & Bookmark */}
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

                  {/* Price Row: Strikethrough + Base Price */}
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-zinc-950 font-bold text-base">
                      ₹{basePrice.toFixed(2)}
                    </span>
                    <span className="text-zinc-400 line-through text-xs font-normal">
                      ₹{originalPrice.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Save ₹{originalPrice - basePrice}
                    </span>
                  </div>

                  {/* Rating Stars Bar */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-black">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-black text-black" />
                      ))}
                    </div>
                    <span className="text-[11px] font-sans text-zinc-500 font-medium">
                      <strong>4.9 ★</strong> (3,645 Reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Device Brand & Model Selectors */}
              <div className="space-y-2 pt-1 border-t border-black/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Select Device Model
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {/* Brand Button */}
                  <button
                    type="button"
                    onClick={() => setBrandModalOpen(true)}
                    className="flex items-center justify-between p-2.5 bg-zinc-50 hover:bg-zinc-100 border border-[#e4e4e7] rounded-xl transition-all text-left cursor-pointer group"
                  >
                    <div>
                      <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider block">Brand</span>
                      <span className="text-xs font-bold text-zinc-950 truncate block">{selectedBrand}</span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-500 group-hover:text-black shrink-0" />
                  </button>

                  {/* Model Button */}
                  <button
                    type="button"
                    onClick={() => setModelModalOpen(true)}
                    className="flex items-center justify-between p-2.5 bg-zinc-50 hover:bg-zinc-100 border border-[#e4e4e7] rounded-xl transition-all text-left cursor-pointer group"
                  >
                    <div>
                      <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider block">Model</span>
                      <span className="text-xs font-bold text-zinc-950 truncate block">{selectedModel}</span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-500 group-hover:text-black shrink-0" />
                  </button>
                </div>
              </div>

              {/* Add-on Upsell Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-black/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-800 block">
                  Frequently Bought Together
                </span>

                <div className="space-y-1.5 text-xs">
                  {/* Phone Grip */}
                  <label className="flex items-center justify-between p-2 rounded-lg border border-black/10 bg-zinc-50/50 cursor-pointer hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addGrip}
                        onChange={(e) => setAddGrip(e.target.checked)}
                        className="w-3.5 h-3.5 rounded-xs accent-zinc-900 cursor-pointer"
                      />
                      <span className="text-[11.5px] font-medium text-zinc-900">Add Matching Grip</span>
                    </div>
                    <span className="text-[11.5px] font-bold text-zinc-900">+₹49</span>
                  </label>

                  {/* Key Chain */}
                  <label className="flex items-center justify-between p-2 rounded-lg border border-black/10 bg-zinc-50/50 cursor-pointer hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addKeyChain}
                        onChange={(e) => setAddKeyChain(e.target.checked)}
                        className="w-3.5 h-3.5 rounded-xs accent-zinc-900 cursor-pointer"
                      />
                      <span className="text-[11.5px] font-medium text-zinc-900">Add Key Chain</span>
                    </div>
                    <span className="text-[11.5px] font-bold text-zinc-900">+₹29</span>
                  </label>

                  {/* Screen Guard */}
                  <label className="flex items-center justify-between p-2 rounded-lg border border-black/10 bg-zinc-50/50 cursor-pointer hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addScreenGuard}
                        onChange={(e) => setAddScreenGuard(e.target.checked)}
                        className="w-3.5 h-3.5 rounded-xs accent-zinc-900 cursor-pointer"
                      />
                      <span className="text-[11.5px] font-medium text-zinc-900">Add 9D Screen Guard</span>
                    </div>
                    <span className="text-[11.5px] font-bold text-zinc-900">+₹29</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons (ADD TO BAG & BUY NOW) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-2.5 sm:py-3 rounded-full border border-[#e4e4e7] bg-white text-zinc-950 font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-50 transition-colors cursor-pointer text-center"
                >
                  {isAdded ? "ADDED TO BAG" : "ADD TO BAG"}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-2.5 sm:py-3 rounded-full bg-black text-white font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer text-center shadow-xs"
                >
                  BUY NOW
                </button>
              </div>

            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 2: DETAILS & DESCRIPTION TAB CARD (MATCHES CLOTHES PAGE)          */}
            {/* ----------------------------------------------------------------------- */}
            <div className="bg-white border border-[#e4e4e7] rounded-[18px] p-4 sm:p-5 shadow-2xs transition-all duration-500 relative z-10 mt-3.5">
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
                  Details & Specs
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("care")}
                  className={`pb-2.5 -mb-[11px] font-sans text-xs sm:text-[13px] transition-all cursor-pointer ${
                    activeTab === "care"
                      ? "border-b-[2.5px] border-zinc-800 text-zinc-950 font-bold"
                      : "border-b-[2.5px] border-transparent text-zinc-400 hover:text-zinc-700 font-medium"
                  }`}
                >
                  Care & Warranty
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
                      <div>
                        <p className="font-bold text-zinc-950 text-xs sm:text-[13px] mb-1.5">Details & Features</p>
                        <div className="space-y-1 text-zinc-600 text-xs sm:text-[12px] leading-snug font-normal pl-4">
                          <p>• Photo-Realistic High-Density 3D UV Embossed Print Quality</p>
                          <p>• Shockproof Thermoplastic Polyurethane (TPU) Rubber</p>
                          <p>• Raised 1.2mm Bezel for Camera Lens & Screen Protection</p>
                          <p>• Anti-Slip Half-Edge Matte Finish Side Grip</p>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-zinc-950 text-xs sm:text-[13px] mb-1.5">Description</p>
                        <p className="text-zinc-600 text-xs sm:text-[12px] leading-relaxed font-normal">
                          Crafted with precision UV embossing for an authentic 3D tactile finish. Protects your device against drops and scratches while keeping a lightweight profile.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Care & Warranty */}
                  {activeTab === "care" && (
                    <motion.div
                      key="care"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.12 }}
                      className="space-y-3 text-zinc-600 text-xs sm:text-[12px] leading-relaxed"
                    >
                      <p className="font-bold text-zinc-950">Maintenance & Cleaning</p>
                      <p>Wipe clean with a damp microfiber cloth. Avoid using harsh chemical solvents, acetone, or isopropyl alcohol on the embossed surface.</p>
                      <p className="font-bold text-zinc-950 pt-1">Guarantee</p>
                      <p>Includes a hassle-free replacement guarantee for fitting or manufacturing imperfections.</p>
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
                      className="space-y-3 text-zinc-600 text-xs sm:text-[12px] leading-relaxed"
                    >
                      <p className="font-bold text-zinc-950">Delivery Timeline</p>
                      <p>Dispatched within 24 hours. Express courier delivery takes 3 to 5 business days across India.</p>
                      <p className="font-bold text-zinc-950 pt-1">Shipping Offer</p>
                      <p>Free Standard Shipping on all orders above ₹399.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* RECENTLY VIEWED & STYLING IDEAS SECTIONS (Matches Clothes Page)           */}
        {/* ========================================================================= */}
        <div className="mt-16 space-y-12 border-t border-zinc-200/80 pt-10">

          {/* Recently Viewed Grid */}
          <div>
            <h3 className="font-display font-bold text-zinc-950 text-base sm:text-lg uppercase tracking-wider mb-4">
              Recently viewed
            </h3>
            <div className="-mx-4 sm:-mx-6 md:-mx-8 grid grid-cols-2 sm:grid-cols-4 gap-x-0 gap-y-6">
              {related.map((item, idx) => (
                <ProductCard key={item.id} product={item} index={idx} />
              ))}
            </div>
          </div>

          {/* Styling Ideas Grid */}
          <div>
            <h3 className="font-display font-bold text-zinc-950 text-base sm:text-lg uppercase tracking-wider mb-4">
              Styling ideas
            </h3>
            <div className="-mx-4 sm:-mx-6 md:-mx-8 grid grid-cols-2 sm:grid-cols-4 gap-x-0 gap-y-6">
              {related.map((item, idx) => (
                <ProductCard key={item.id} product={item} index={idx} />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: CHOOSE YOUR BRAND (Luxury Modern Sheet)          */}
      {/* ========================================================= */}
      <AnimatePresence>
        {brandModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
              onClick={() => setBrandModalOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-md bg-white text-zinc-900 rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col z-10 shadow-2xl overflow-hidden border border-black/10"
            >
              <div className="pt-3 pb-1 flex justify-center bg-white">
                <div className="w-12 h-1 bg-zinc-200 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-6 py-3 border-b border-black/10 bg-white">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-950">
                    Choose Your Brand
                  </h3>
                  <p className="text-[11px] font-sans text-zinc-400">Select manufacturer to filter available models</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBrandModalOpen(false)}
                  className="p-2 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
                  aria-label="Close brand selector"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 space-y-2 overflow-y-auto max-h-[60vh] scrollbar-none bg-zinc-50/50">
                {PHONE_BRANDS.map((brand) => {
                  const isSelected = selectedBrand === brand.name;
                  return (
                    <button
                      key={brand.name}
                      type="button"
                      onClick={() => handleBrandSelect(brand.name)}
                      className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? "border-black bg-black text-white shadow-md font-bold"
                          : "border-zinc-200/80 bg-white hover:border-black/30 hover:bg-zinc-50/80 text-zinc-800 font-medium"
                      }`}
                    >
                      <div>
                        <span className="text-sm sm:text-base font-sans font-bold tracking-tight block">{brand.name}</span>
                        <span className={`text-[11px] ${isSelected ? "text-zinc-300" : "text-zinc-400"}`}>
                          {brand.models.length} models available
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-white text-black shadow-2xs"
                            : "border border-zinc-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3] text-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL 2: CHOOSE YOUR MODEL (With Real-Time Search Bar)   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {modelModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
              onClick={() => {
                setModelModalOpen(false);
                setSearchQuery("");
              }}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-md bg-white text-zinc-900 rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col z-10 shadow-2xl overflow-hidden border border-black/10"
            >
              <div className="pt-3 pb-1 flex justify-center bg-white">
                <div className="w-12 h-1 bg-zinc-200 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-6 py-3 border-b border-black/10 bg-white">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-950">
                    Choose Your {selectedBrand} Model
                  </h3>
                  <p className="text-[11px] font-sans text-zinc-400">Search or pick your exact device variant</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModelModalOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
                  aria-label="Close model selector"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Realtime Search Bar */}
              <div className="px-6 py-3 border-b border-black/10 bg-white">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${selectedBrand} models...`}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-black/15 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-black focus:bg-white transition-all text-zinc-900"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filtered Models List */}
              <div className="p-4 space-y-1.5 overflow-y-auto max-h-[50vh] scrollbar-none bg-zinc-50/50">
                {filteredModels.length > 0 ? (
                  filteredModels.map((modelName) => {
                    const isSelected = selectedModel === modelName;
                    return (
                      <button
                        key={modelName}
                        type="button"
                        onClick={() => handleModelSelect(modelName)}
                        className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer shadow-2xs ${
                          isSelected
                            ? "border-black bg-black text-white shadow-md font-bold"
                            : "border-zinc-200/80 bg-white hover:border-black/30 hover:bg-zinc-50/80 text-zinc-800 font-medium"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-sans tracking-tight">{modelName}</span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-white text-black shadow-2xs"
                              : "border border-zinc-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3] text-black" />}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-zinc-500 font-sans text-xs">
                    No models found for "{searchQuery}". Try a different search.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4">
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-20 text-white hover:text-zinc-300 p-2 cursor-pointer"
            >
              <X className="h-8 w-8" />
            </button>

            <img
              src={gallery[activeMobileIdx] || primaryImage}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
