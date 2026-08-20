import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, Plus, Check } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

interface ProductCarouselProps {
  title?: string;
  badge?: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  products: Product[];
  flushTop?: boolean;
  className?: string;
}

export function ProductCarousel({
  title,
  badge,
  subtitle,
  viewAllLink = "/shop",
  viewAllText = "View All",
  products,
  flushTop = false,
  className = "",
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 280;
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`w-full bg-white text-zinc-900 select-none ${
        flushTop ? "pt-0 pb-10 sm:pb-14" : "py-10 sm:py-14"
      } ${className}`}
    >
      {/* Optional Title Bar when title provided */}
      {title && (
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 mb-4">
          <div className="flex items-end justify-between border-b border-black/[0.08] pb-4">
            <div className="space-y-1">
              {badge && (
                <span className="inline-block font-display text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400">
                  {badge}
                </span>
              )}
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-zinc-900">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-zinc-500 font-normal">{subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {viewAllLink && (
                <Link
                  to={viewAllLink}
                  className="hidden sm:inline-flex items-center text-xs font-display font-bold uppercase tracking-wider text-zinc-800 hover:text-black transition-colors mr-2 underline underline-offset-4"
                >
                  {viewAllText}
                </Link>
              )}

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous products"
                  className={`w-8 h-8 rounded-full border border-black/15 flex items-center justify-center transition-all cursor-pointer ${
                    canScrollLeft
                      ? "hover:bg-black hover:text-white text-zinc-900 border-black active:scale-95"
                      : "opacity-30 cursor-not-allowed text-zinc-400 border-zinc-200"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2]" />
                </button>

                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next products"
                  className={`w-8 h-8 rounded-full border border-black/15 flex items-center justify-center transition-all cursor-pointer ${
                    canScrollRight
                      ? "hover:bg-black hover:text-white text-zinc-900 border-black active:scale-95"
                      : "opacity-30 cursor-not-allowed text-zinc-400 border-zinc-200"
                  }`}
                >
                  <ChevronRight className="h-4 w-4 stroke-[2]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horizontally Scrollable Track (Nude Project full-bleed tight edge-to-edge layout) */}
      <div className="relative border-t border-b border-black/[0.08] bg-zinc-50/50">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none divide-x divide-black/[0.08]"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[210px] sm:w-[250px] md:w-[280px] lg:w-[310px] shrink-0 snap-start bg-white"
            >
              <NudeProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Floating Desktop Navigation Arrows for Flush Carousel */}
        {!title && (
          <>
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-black/15 flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                canScrollLeft
                  ? "hover:bg-black hover:text-white text-zinc-900 active:scale-95"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronLeft className="h-5 w-5 stroke-[2]" />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next products"
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-black/15 flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                canScrollRight
                  ? "hover:bg-black hover:text-white text-zinc-900 active:scale-95"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronRight className="h-5 w-5 stroke-[2]" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

/**
 * Nude-Project Product Card:
 * Flat full-bleed top image touching the carousel border,
 * "New In" pill badge top-left, Wishlist heart top-right,
 * Bottom size selection strip on hover,
 * Product title, Price with "+" Quick-Add button, and Swatches with active indicator bar.
 */
function NudeProductCard({ product }: { product: Product }) {
  const addToCart = useCart((s) => s.add);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || "One Size"
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const colors = product.colors || [
    { name: "Obsidian Black", hex: "#18181b" },
    { name: "Washed Sand", hex: "#d6c7b2" },
  ];

  const availableSizes =
    product.sizes && product.sizes.length > 1
      ? product.sizes
      : product.category === "Apparel"
      ? ["XS", "S", "M", "L", "XL", "XXL"]
      : [];

  const handleQuickAdd = (e: React.MouseEvent, chosenSize?: string) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: chosenSize || selectedSize,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group flex flex-col h-full select-none bg-white">
      {/* Product Image Container: flush, aspect-[4/5] */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100/60">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block w-full h-full cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top-Left: "New In" Badge (Nude Project Style) */}
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-block bg-white/95 backdrop-blur-xs text-zinc-900 text-[10px] font-sans font-medium tracking-normal px-2 py-0.5 rounded-full border border-black/10 shadow-xs">
              New In
            </span>
          </div>
        )}

        {/* Top-Right: Wishlist Heart Icon */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white flex items-center justify-center text-zinc-700 transition-all active:scale-90 shadow-xs cursor-pointer"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-700"
            }`}
          />
        </button>

        {/* Bottom Size Bar on Hover (Matching Nude Project Reference) */}
        {availableSizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 z-10 bg-white/95 backdrop-blur-xs border-t border-black/10 py-1.5 px-2 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  setSelectedSize(size);
                  handleQuickAdd(e, size);
                }}
                className="text-[10px] font-sans font-medium text-zinc-700 hover:text-black hover:font-bold px-1.5 py-0.5 rounded hover:bg-black/5 transition-all cursor-pointer"
                title={`Quick add size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details Section Below Image */}
      <div className="p-3 sm:p-4 space-y-1.5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Row 1: Product Name */}
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="block font-sans text-xs sm:text-[13px] font-medium text-zinc-900 truncate hover:text-zinc-600 transition-colors"
          >
            {product.name}
          </Link>

          {/* Row 2: Price & Quick-Add "+" Button */}
          <div className="flex items-center justify-between mt-1">
            <span className="font-sans text-xs sm:text-sm font-semibold text-zinc-900">
              Rs. {product.price.toLocaleString("en-IN")}
            </span>

            {/* Quick-Add "+" Button */}
            <button
              onClick={(e) => handleQuickAdd(e)}
              aria-label="Quick add to bag"
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                addedAnimation
                  ? "bg-zinc-900 text-white scale-110"
                  : "border border-black/20 hover:border-black hover:bg-black hover:text-white text-zinc-800 active:scale-90"
              }`}
            >
              {addedAnimation ? (
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
              ) : (
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2]" />
              )}
            </button>
          </div>
        </div>

        {/* Row 3: Color Swatches with Active Underline */}
        <div className="flex items-center gap-2 pt-1">
          {colors.map((color, idx) => {
            const isSelected = selectedColorIdx === idx;
            return (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColorIdx(idx);
                }}
                title={color.name}
                aria-label={color.name}
                className="flex flex-col items-center gap-0.5 cursor-pointer group/swatch"
              >
                <span
                  className={`w-3.5 h-3.5 rounded-xs border border-black/15 block transition-transform ${
                    isSelected ? "scale-110" : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                {/* Active indicator bar matching Nude Project reference */}
                <span
                  className={`w-full h-[1.5px] rounded-full transition-all ${
                    isSelected ? "bg-zinc-900" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
