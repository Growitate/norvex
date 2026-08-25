import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Heart, Plus, Check } from "lucide-react";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col h-full select-none bg-white rounded-none border-0 overflow-hidden"
    >
      {/* Product Image Container: Ultra-clean Nude Project style full-fit image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white rounded-none">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="block w-full h-full cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top-Left: "New In" Capsule Badge */}
        {product.isNew && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none">
            <span className="inline-block bg-white/95 backdrop-blur-xs text-zinc-950 text-[10px] font-sans font-semibold tracking-wider px-2.5 py-0.5 rounded-full border border-black/10 shadow-xs">
              New In
            </span>
          </div>
        )}

        {/* Top-Right: Wishlist Heart Icon */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-7.5 h-7.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white flex items-center justify-center text-zinc-800 transition-all active:scale-90 shadow-2xs cursor-pointer"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-800"
            }`}
          />
        </button>

        {/* Bottom Quick Size Selection Strip on Desktop Hover */}
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

      {/* Details Section Below Image: Clean Minimal High-Fashion Layout */}
      <div className="pt-2.5 pb-1 px-0.5 space-y-1 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Row 1: Product Name */}
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="block font-sans text-xs sm:text-[13px] font-medium text-zinc-950 truncate hover:text-zinc-600 transition-colors"
          >
            {product.name}
          </Link>

          {/* Row 2: Price & Quick-Add "+" Button */}
          <div className="flex items-center justify-between mt-1">
            <span className="font-sans text-xs sm:text-sm font-semibold text-zinc-950">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {/* Quick-Add "+" Button */}
            <button
              onClick={(e) => handleQuickAdd(e)}
              aria-label="Quick add to bag"
              className={`w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                addedAnimation
                  ? "bg-zinc-950 text-white scale-110"
                  : "border border-black/20 hover:border-black hover:bg-black hover:text-white text-zinc-800 active:scale-90"
              }`}
            >
              {addedAnimation ? (
                <Check className="h-3 w-3 stroke-[2.5]" />
              ) : (
                <Plus className="h-3 w-3 stroke-[2]" />
              )}
            </button>
          </div>
        </div>

        {/* Row 3: Color Swatches with Active Underline Bar */}
        {colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
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
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border border-black/15 block transition-transform ${
                      isSelected ? "scale-110" : "opacity-75 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`w-full h-[1.5px] rounded-full transition-all ${
                      isSelected ? "bg-zinc-950" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
