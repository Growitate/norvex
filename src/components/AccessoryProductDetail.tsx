import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Tag,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  CheckCircle2,
  X,
  ChevronDown,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCarousel } from "./ProductCarousel";

interface AccessoryProductDetailProps {
  product: Product;
}

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
      "iQOO Neo 7 Pro",
      "iQOO Z9 Turbo",
      "iQOO Z9 5G",
      "iQOO Z7 Pro",
    ],
  },
  {
    name: "Motorola",
    models: [
      "Edge 50 Ultra",
      "Edge 50 Pro",
      "Edge 50 Fusion",
      "Razr 50 Ultra",
      "Moto G85 5G",
      "Moto G64 5G",
    ],
  },
  {
    name: "Realme",
    models: [
      "Realme GT 6",
      "Realme GT 6T",
      "Realme 13 Pro+",
      "Realme 13 Pro",
      "Realme 12 Pro+",
      "Realme 12x 5G",
      "Realme C67 5G",
    ],
  },
  {
    name: "Xiaomi",
    models: [
      "Xiaomi 14 Ultra",
      "Xiaomi 14",
      "Redmi Note 13 Pro+",
      "Redmi Note 13 Pro",
      "Redmi Note 13 5G",
      "Redmi 13C 5G",
    ],
  },
  {
    name: "Poco",
    models: [
      "POCO F6 Pro",
      "POCO F6",
      "POCO X6 Pro 5G",
      "POCO X6 5G",
      "POCO M6 Pro 5G",
      "POCO C65",
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
      "Vivo T3 5G",
    ],
  },
  {
    name: "Oppo",
    models: [
      "Find X7 Ultra",
      "Reno 12 Pro 5G",
      "Reno 12 5G",
      "Reno 11 Pro",
      "F27 Pro+ 5G",
      "F25 Pro 5G",
    ],
  },
  {
    name: "Infinix",
    models: [
      "GT 20 Pro",
      "Note 40 Pro+ 5G",
      "Note 40 Pro 5G",
      "Zero 30 5G",
      "Hot 40 Pro",
    ],
  },
  {
    name: "Itel",
    models: [
      "Itel Color Pro 5G",
      "Itel S23+",
      "Itel P55+ 5G",
      "Itel A70",
    ],
  },
  {
    name: "Lava",
    models: [
      "Agni 2 5G",
      "Blaze Curve 5G",
      "Blaze 2 5G",
      "Storm 5G",
      "Yuva 3 Pro",
    ],
  },
  {
    name: "Lenovo",
    models: [
      "Legion Y90",
      "Legion Duel 2",
      "K14 Plus",
    ],
  },
  {
    name: "Nokia",
    models: [
      "Nokia G42 5G",
      "Nokia XR21",
      "Nokia G22",
      "Nokia C32",
    ],
  },
];

export function AccessoryProductDetail({ product }: AccessoryProductDetailProps) {
  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  // Brand & Model Selection
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 16 Pro Max");
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);

  // Add-on Upsells
  const [addGrip, setAddGrip] = useState(false);
  const [addKeyChain, setAddKeyChain] = useState(false);
  const [addScreenGuard, setAddScreenGuard] = useState(false);

  // Quantity
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = useCart((s) => s.add);
  const setCartOpen = useCart((s) => s.setOpen);

  const currentBrandData = PHONE_BRANDS.find((b) => b.name === selectedBrand) || PHONE_BRANDS[0];

  // Price Calculation
  const basePrice = product.price || 249;
  const gripPrice = addGrip ? 49 : 0;
  const keyChainPrice = addKeyChain ? 29 : 0;
  const screenGuardPrice = addScreenGuard ? 29 : 0;
  const singleUnitPrice = basePrice + gripPrice + keyChainPrice + screenGuardPrice;
  const totalPrice = singleUnitPrice * qty;

  const originalPrice = 599;

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    const newBrandData = PHONE_BRANDS.find((b) => b.name === brandName);
    if (newBrandData && newBrandData.models.length > 0) {
      setSelectedModel(newBrandData.models[0]);
    }
    setBrandModalOpen(false);
  };

  const handleModelSelect = (modelName: string) => {
    setSelectedModel(modelName);
    setModelModalOpen(false);
  };

  const handleAddToCart = () => {
    const addonsList = [];
    if (addGrip) addonsList.push("Phone Grip (+₹49)");
    if (addKeyChain) addonsList.push("Key Chain (+₹29)");
    if (addScreenGuard) addonsList.push("Screen Guard (+₹29)");

    const addonsText = addonsList.length > 0 ? ` [w/ ${addonsList.join(", ")}]` : "";

    addToCart({
      id: `${product.id}-${selectedBrand}-${selectedModel.replace(/\s+/g, "-")}-${addGrip}-${addKeyChain}-${addScreenGuard}`,
      name: `${product.name} — ${selectedBrand} ${selectedModel}${addonsText}`,
      price: singleUnitPrice,
      image: gallery[selectedImgIdx] || product.image,
      size: `${selectedBrand} ${selectedModel}`,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setTimeout(() => setCartOpen(true), 300);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setCartOpen(true);
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div className="bg-[#f8f9fa] text-zinc-900 min-h-screen selection:bg-zinc-900 selection:text-white">
      {/* Fixed Header Spacer */}
      <div className="h-14 sm:h-16 bg-white" />

      {/* Top Free Delivery Notification Bar matching Zapvi/Img 2 */}
      <div className="bg-[#111] text-white text-center py-2 px-4 text-xs font-sans font-medium flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        <span>Hurry! Add ₹150 More to Unlock Free Delivery — Offer Ends Today!</span>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-black/[0.08]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs font-sans text-zinc-500 uppercase tracking-wide">
            <Link to="/" className="hover:text-black">
              HOME
            </Link>
            <span className="text-zinc-400">/</span>
            <Link to="/shop" search={{ category: "Accessories" }} className="hover:text-black">
              SOFT SILICONE MOBILE COVER
            </Link>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ========================================================= */}
          {/* LEFT: PRODUCT IMAGE & THUMBNAIL GALLERY                   */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 bg-white p-4 sm:p-6 rounded-lg border border-black/10 shadow-xs space-y-4">
            {/* Main Product Showcase */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full bg-zinc-50 rounded-md overflow-hidden flex items-center justify-center p-4">
              <img
                src={gallery[selectedImgIdx] || product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
              />

              {/* Discount Badge */}
              <div className="absolute top-3 left-3 bg-[#e11d48] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-xs uppercase">
                58% OFF
              </div>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImgIdx(i)}
                    className={`aspect-square p-2 bg-zinc-50 rounded-md border cursor-pointer transition-all ${
                      selectedImgIdx === i
                        ? "border-black ring-2 ring-black/80"
                        : "border-black/15 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT: BUY BOX & BRAND/MODEL SELECTOR (Img 2, 3, 4 Style)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-8 rounded-lg border border-black/10 shadow-xs space-y-6">
            {/* Title, Category & Ratings */}
            <div className="space-y-2 border-b border-black/[0.08] pb-5">
              <span className="text-[11px] font-sans uppercase tracking-widest text-zinc-500 font-semibold">
                PREMIUM UV EMBOSSED COVER
              </span>

              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-zinc-950 leading-tight">
                {product.name}
              </h1>

              {/* Price Row matching Img 2: Strikethrough + Bold Red/Dark Sale Price */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-sm sm:text-base text-zinc-400 line-through font-sans">
                  ₹{originalPrice.toFixed(2)}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-sans text-zinc-950">
                  ₹{basePrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                  Save ₹{originalPrice - basePrice}
                </span>
              </div>

              {/* Review Stars Bar */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-sans text-zinc-600 font-medium">
                  <strong>(4.9/5)</strong> 3,645 Ratings & 168 Reviews
                </span>
              </div>
            </div>

            {/* Feature Highlights List with Icons (matching Img 2 exactly) */}
            <div className="space-y-2.5 text-xs sm:text-[13px] font-sans text-zinc-700 bg-zinc-50/80 p-4 rounded-md border border-black/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="text-base">✒️</span>
                <span>Thin & Soft Shockproof Silicone Rubber case</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base">⭐️</span>
                <span>Half edge smooth matte finish with precision camera bezel</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base">📸</span>
                <span>Photo-realistic high-density UV embossed print quality</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base">🔄</span>
                <span>Hassle-free replacements on fitting issues</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base">🚚</span>
                <span>Express courier delivery in 3–5 working days</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* BRAND & MODEL SELECTORS (Img 2 & Img 3 Style)             */}
            {/* ========================================================= */}
            <div className="space-y-3 pt-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                Select Your Device
              </label>

              {/* 1. Choose Your Brand Selector */}
              <div>
                <button
                  type="button"
                  onClick={() => setBrandModalOpen(true)}
                  className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100 border border-black/20 rounded-md transition-colors text-left cursor-pointer group"
                >
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Brand</span>
                    <span className="text-sm font-bold text-zinc-900">{selectedBrand}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600 group-hover:text-black font-semibold">
                    <span>Change Brand</span>
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  </div>
                </button>
              </div>

              {/* 2. Choose Your Model Selector */}
              <div>
                <button
                  type="button"
                  onClick={() => setModelModalOpen(true)}
                  className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100 border border-black/20 rounded-md transition-colors text-left cursor-pointer group"
                >
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Model</span>
                    <span className="text-sm font-bold text-zinc-900">{selectedModel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600 group-hover:text-black font-semibold">
                    <span>Change Model</span>
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  </div>
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* ADD-ON UPSELL CHECKBOXES (Img 2 & Img 4 Style)            */}
            {/* ========================================================= */}
            <div className="space-y-3 pt-2 border-t border-black/10">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 block">
                Frequently Bought Together
              </span>

              <div className="space-y-2.5">
                {/* 1. Phone Grip */}
                <label className="flex items-center justify-between p-3 rounded-md border border-black/10 hover:border-black/30 bg-zinc-50/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addGrip}
                      onChange={(e) => setAddGrip(e.target.checked)}
                      className="w-4 h-4 rounded-sm text-black focus:ring-black border-black/30 accent-zinc-900 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-medium text-zinc-900">
                      Add Matching Design Phone Grip
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 line-through mr-1.5">₹129.00</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900">+₹49.00</span>
                  </div>
                </label>

                {/* 2. Key Chain */}
                <label className="flex items-center justify-between p-3 rounded-md border border-black/10 hover:border-black/30 bg-zinc-50/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addKeyChain}
                      onChange={(e) => setAddKeyChain(e.target.checked)}
                      className="w-4 h-4 rounded-sm text-black focus:ring-black border-black/30 accent-zinc-900 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-medium text-zinc-900">
                      Add Matching Design Key Chain
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 line-through mr-1.5">₹99.00</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900">+₹29.00</span>
                  </div>
                </label>

                {/* 3. Screen Guard */}
                <label className="flex items-center justify-between p-3 rounded-md border border-black/10 hover:border-black/30 bg-zinc-50/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addScreenGuard}
                      onChange={(e) => setAddScreenGuard(e.target.checked)}
                      className="w-4 h-4 rounded-sm text-black focus:ring-black border-black/30 accent-zinc-900 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm font-medium text-zinc-900">
                      Add 9D Tempered Glass Screen Guard
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 line-through mr-1.5">₹99.00</span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-900">+₹29.00</span>
                  </div>
                </label>
              </div>
            </div>

            {/* ========================================================= */}
            {/* QUANTITY & CTA BUTTONS (Img 2 & Img 4 Style)              */}
            {/* ========================================================= */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Box */}
                <div className="flex items-center border border-black/20 rounded-md bg-zinc-50 overflow-hidden h-12">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 cursor-pointer text-zinc-800"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold font-sans text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 cursor-pointer text-zinc-800"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Primary Add To Cart Button (Amber/Gold or Solid Black) */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-[#eab308] hover:bg-[#ca8a04] text-zinc-950 font-display text-xs sm:text-sm font-black uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                      <span>Added To Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add To Cart — ₹{totalPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full h-12 bg-black hover:bg-zinc-800 text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Instant Buy Now</span>
              </button>
            </div>

            {/* ========================================================= */}
            {/* DISCOUNT & COUPON OFFERS STRIP (Img 4 Style)              */}
            {/* ========================================================= */}
            <div className="bg-zinc-50 border border-black/10 rounded-md p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800">
                <Tag className="h-3.5 w-3.5 text-red-500" />
                <span>Available Offers & Coupons</span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between p-2 rounded bg-white border border-black/5">
                  <span className="text-zinc-700">
                    Order ₹399 & Above — <strong>Get Free Shipping</strong>
                  </span>
                  <span className="bg-[#0f766e] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    No Code Needed
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white border border-black/5">
                  <span className="text-zinc-700">
                    Order ₹599 & Above — <strong>Extra ₹100 OFF</strong>
                  </span>
                  <span className="bg-[#78350f] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    NORVA100
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white border border-black/5">
                  <span className="text-zinc-700">
                    Order ₹799 & Above — <strong>Extra ₹150 OFF</strong>
                  </span>
                  <span className="bg-[#78350f] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    NORVA150
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: CHOOSE YOUR BRAND (Exact Video Screenshot Style)  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {brandModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
              onClick={() => setBrandModalOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-lg bg-[#181628] text-white rounded-t-2xl sm:rounded-2xl max-h-[82vh] flex flex-col z-10 shadow-2xl overflow-hidden border border-[#2c284a]"
            >
              {/* Drag Handle */}
              <div className="pt-2.5 pb-1 flex justify-center bg-[#181628]">
                <div className="w-10 h-1 bg-zinc-600/70 rounded-full" />
              </div>

              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#292542] bg-[#141222]">
                <h3 className="font-sans text-base font-medium text-white tracking-wide">
                  Choose Your Brand
                </h3>
                <button
                  onClick={() => setBrandModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close brand selector"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Brand Options List (matching screenshot dark list & radio styles) */}
              <div className="overflow-y-auto divide-y divide-[#25213b] scrollbar-none">
                {PHONE_BRANDS.map((brand) => {
                  const isSelected = selectedBrand === brand.name;
                  return (
                    <button
                      key={brand.name}
                      onClick={() => handleBrandSelect(brand.name)}
                      className={`w-full flex items-center justify-between py-4 px-5 transition-colors text-left cursor-pointer ${
                        isSelected
                          ? "bg-[#232038] text-white font-medium"
                          : "text-[#e2e8f0] hover:bg-white/5 active:bg-white/10"
                      }`}
                    >
                      <span className="text-[15px] font-sans tracking-wide">{brand.name}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-purple-400 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                            : "border-[#524d73] bg-transparent"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
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
      {/* MODAL 2: CHOOSE YOUR MODEL (Exact Matching Style)          */}
      {/* ========================================================= */}
      <AnimatePresence>
        {modelModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
              onClick={() => setModelModalOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-lg bg-[#181628] text-white rounded-t-2xl sm:rounded-2xl max-h-[82vh] flex flex-col z-10 shadow-2xl overflow-hidden border border-[#2c284a]"
            >
              {/* Drag Handle */}
              <div className="pt-2.5 pb-1 flex justify-center bg-[#181628]">
                <div className="w-10 h-1 bg-zinc-600/70 rounded-full" />
              </div>

              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#292542] bg-[#141222]">
                <h3 className="font-sans text-base font-medium text-white tracking-wide">
                  Choose {selectedBrand} Model
                </h3>
                <button
                  onClick={() => setModelModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close model selector"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Models List */}
              <div className="overflow-y-auto divide-y divide-[#25213b] scrollbar-none">
                {currentBrandData.models.map((model) => {
                  const isSelected = selectedModel === model;
                  return (
                    <button
                      key={model}
                      onClick={() => handleModelSelect(model)}
                      className={`w-full flex items-center justify-between py-4 px-5 transition-colors text-left cursor-pointer ${
                        isSelected
                          ? "bg-[#232038] text-white font-medium"
                          : "text-[#e2e8f0] hover:bg-white/5 active:bg-white/10"
                      }`}
                    >
                      <span className="text-[15px] font-sans tracking-wide">{model}</span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-purple-400 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                            : "border-[#524d73] bg-transparent"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recommended Accessories Carousel */}
      <div className="border-t border-black/10 mt-12 sm:mt-16 bg-white py-12">
        <ProductCarousel
          title="You Might Also Like"
          badge="MORE ACCESSORIES"
          subtitle="Explore trending phone cases, chains, and streetwear hardware"
          products={related}
          viewAllLink="/shop?category=Accessories"
          viewAllText="View All Accessories"
        />
      </div>
    </div>
  );
}
