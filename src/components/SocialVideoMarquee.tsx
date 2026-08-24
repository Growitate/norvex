import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Instagram,
  ShoppingBag,
  X,
  ExternalLink,
} from "lucide-react";
import reel1 from "@/assets/reels/reel1.png";
import reel2 from "@/assets/reels/reel2.png";
import reel3 from "@/assets/reels/reel3.png";
import modelBag1 from "@/assets/model_banner_bag_1_1786114703183.png";
import modelBag2 from "@/assets/model_banner_bag_2_1786114716814.png";
import bagHarness from "@/assets/bag_harness_tote_1786114785960.png";
import { useCart } from "@/lib/cart";

interface VideoReel {
  id: string;
  poster: string;
  videoUrl?: string;
  duration: string;
  handle: string;
  title: string;
  productName: string;
  productPrice: number;
  productImage: string;
  views: string;
  likes: string;
}

const SOCIAL_REELS: VideoReel[] = [
  {
    id: "reel-1",
    poster: reel1,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "00:15",
    handle: "@norvaxstore",
    title: "Autumn Gothic Suede Tote Bag Styling",
    productName: "Gothic Suede Harness Tote",
    productPrice: 1699,
    productImage: bagHarness,
    views: "142.5K",
    likes: "18.4K",
  },
  {
    id: "reel-2",
    poster: reel2,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "00:15",
    handle: "@norvaxstore",
    title: "Luxury Leather Craftsmanship & Details",
    productName: "Y2K Suede Oversized Shoulder Tote",
    productPrice: 1899,
    productImage: reel2,
    views: "98.2K",
    likes: "12.1K",
  },
  {
    id: "reel-3",
    poster: reel3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "00:09",
    handle: "@norvaxstore",
    title: "Aesthetic Unboxing & Cash Organizer Reveal",
    productName: "Cybergoth Silver Chain Shoulder Bag",
    productPrice: 1499,
    productImage: modelBag1,
    views: "210.8K",
    likes: "34.6K",
  },
  {
    id: "reel-4",
    poster: modelBag1,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4",
    duration: "00:22",
    handle: "@norvaxstore",
    title: "Dark European Editorial Lookbook Drop 01",
    productName: "Obsidian Harness Chain Bag",
    productPrice: 1599,
    productImage: modelBag1,
    views: "75.4K",
    likes: "9.8K",
  },
  {
    id: "reel-5",
    poster: modelBag2,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: "00:18",
    handle: "@norvaxstore",
    title: "Streetwear Crossbody Patent Leather Fit",
    productName: "Y2K Patent Leather Crossbody Bag",
    productPrice: 1299,
    productImage: modelBag2,
    views: "164.1K",
    likes: "22.3K",
  },
];

export function SocialVideoMarquee() {
  const [selectedReel, setSelectedReel] = useState<VideoReel | null>(null);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(25);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const addToCart = useCart((s) => s.add);

  const marqueeItems = [...SOCIAL_REELS, ...SOCIAL_REELS, ...SOCIAL_REELS];

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  const togglePlay = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(Math.min(Math.max(progress, 15), 85));
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-5 sm:py-6 text-zinc-900 select-none">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 space-y-3 sm:space-y-4">
        {/* Top Header - Tight Nude-Project Style */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1 sm:pb-1.5">
          <div className="space-y-0.5">
            <span className="inline-block font-display text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400">
              COMMUNITY • @NORVAXSTORE
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-zinc-900">
              Community & Styling Reels
            </h2>
          </div>
        </div>

        {/* Carousel Track Container */}
        <div
          className="relative group/marquee"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Floating Circle Left Arrow Button (Desktop Only) */}
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/95 text-zinc-900 border border-black/15 shadow-md items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2]" />
          </button>

          {/* Floating Circle Right Arrow Button (Desktop Only) */}
          <button
            onClick={handleScrollRight}
            aria-label="Scroll Right"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/95 text-zinc-900 border border-black/15 shadow-md items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4 stroke-[2]" />
          </button>

          {/* Scrollable Track - Tight Card Gap */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-2.5 sm:gap-3.5 overflow-x-auto scrollbar-none py-0.5 no-scrollbar touch-pan-x"
            style={{ scrollBehavior: "smooth" }}
          >
            <div
              className={`flex gap-2.5 sm:gap-3.5 shrink-0 gpu-layer ${
                isHovered ? "" : "animate-marquee"
              } transition-all`}
            >
              {marqueeItems.map((reel, idx) => {
                const uniqueKey = `${reel.id}-${idx}`;
                const playing = !!isPlaying[uniqueKey];

                return (
                  <div
                    key={uniqueKey}
                    onClick={() => setSelectedReel(reel)}
                    className="group/card relative w-[165px] xs:w-[185px] sm:w-[215px] md:w-[245px] aspect-[9/14] shrink-0 rounded-md sm:rounded-lg overflow-hidden bg-zinc-900 border border-black/10 shadow-xs cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] active:scale-98"
                  >
                    {/* Media Display */}
                    {playing && reel.videoUrl ? (
                      <video
                        src={reel.videoUrl}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={reel.poster}
                        alt={reel.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25 opacity-90 transition-opacity group-hover/card:opacity-80" />

                    {/* Mute Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 hover:bg-black/70 hover:text-white transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                    </button>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={(e) => togglePlay(uniqueKey, e)}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-zinc-900 flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 group-hover/card:bg-white"
                        aria-label={playing ? "Pause video" : "Play video"}
                      >
                        {playing ? (
                          <Pause className="h-3.5 w-3.5 fill-current" />
                        ) : (
                          <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>

                    {/* Bottom Content Info */}
                    <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 space-y-1 text-white">
                      <div className="flex items-center gap-1 text-[10px] font-display font-semibold tracking-wider text-white/80">
                        <Instagram className="h-2.5 w-2.5 text-pink-400" />
                        <span>{reel.handle}</span>
                      </div>

                      <p className="font-sans text-[11px] font-medium leading-snug line-clamp-2 text-white">
                        {reel.title}
                      </p>

                      {/* Tagged Product Pill */}
                      <div className="pt-0.5">
                        <div className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[9px] font-sans text-white transition-colors">
                          <ShoppingBag className="h-2.5 w-2.5" />
                          <span className="truncate max-w-[95px]">{reel.productName}</span>
                          <span className="font-semibold">
                            ₹{reel.productPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Progress & IG Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-0.5">
          <div className="w-full sm:w-1/2 flex items-center gap-2.5">
            <span className="font-display text-[9px] uppercase font-bold tracking-widest text-zinc-400">
              EXPLORE
            </span>
            <div className="flex-1 h-0.5 bg-black/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-zinc-400 font-semibold">
              {Math.round(scrollProgress)}%
            </span>
          </div>

          <a
            href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 font-display text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-black hover:border-black transition-colors"
          >
            <span>VIEW OUR INSTAGRAM</span>
            <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Modal Player */}
      <AnimatePresence>
        {selectedReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-black/10 shadow-2xl grid md:grid-cols-2 no-scrollbar"
            >
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-zinc-900 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[9/14] bg-zinc-900 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedReel.poster}
                  alt={selectedReel.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {selectedReel.duration}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <span className="font-display text-[10px] uppercase font-bold text-white/80">
                    {selectedReel.handle}
                  </span>
                  <p className="font-sans text-xs font-semibold text-white">{selectedReel.title}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-[9px] font-display font-bold uppercase tracking-wider">
                    FEATURED IN REEL
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-900 uppercase leading-tight">
                    {selectedReel.productName}
                  </h3>

                  <p className="font-sans text-xs text-zinc-600 leading-relaxed font-normal">
                    Crafted with silver curb hardware, reinforced leather straps, and dark European
                    aesthetic details.
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-black/10">
                    <span className="font-display text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                      Price
                    </span>
                    <span className="font-sans text-lg font-bold text-zinc-900">
                      ₹{selectedReel.productPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-black/10">
                  <button
                    onClick={() => {
                      addToCart({
                        id: selectedReel.id,
                        name: selectedReel.productName,
                        price: selectedReel.productPrice,
                        image: selectedReel.productImage,
                        size: "One Size",
                      });
                      setSelectedReel(null);
                    }}
                    className="w-full bg-zinc-900 hover:bg-black text-white font-sans text-xs uppercase font-bold tracking-wider py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add Bag To Cart</span>
                  </button>

                  <a
                    href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-black/15 bg-white hover:bg-zinc-100 text-zinc-900 font-sans text-xs uppercase font-bold tracking-wider py-2.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Instagram className="h-3.5 w-3.5 text-pink-600" />
                    <span>Open On Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
