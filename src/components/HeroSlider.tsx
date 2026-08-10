import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import modelBag1 from "@/assets/model_banner_bag_1_1786114703183.png";
import modelBag2 from "@/assets/model_banner_bag_2_1786114716814.png";
import modelBag3 from "@/assets/model_banner_bag_3_1786114733990.png";

type Slide = {
  image: string;
  link: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    image: modelBag1,
    link: "/shop",
    alt: "Gothic Metal Chain Shoulder Bag",
  },
  {
    image: modelBag2,
    link: "/shop",
    alt: "Y2K Patent Leather Crossbody Bag",
  },
  {
    image: modelBag3,
    link: "/shop",
    alt: "Metallic Chrome Gothic Mini Tote",
  },
];


export function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const goToMobileRef = useRef<((v: number) => void) | null>(null);
  
  const total = SLIDES.length;
  
  // Slide settings
  const SLIDE_W_DESKTOP = 522;
  const GAP_DESKTOP = 6;
  const BASE_SPEED = 0.35; // speed at snap center (slowest)
  const PEAK_SPEED = 2.4;  // speed between snap centers (fastest)
  const AUTOPLAY_DELAY = 4000;
  const TRANSITION_SPEED = 500;

  // Refs to hold animation state variables
  const stateRef = useRef({
    contX: 0,
    isDesktop: true,
    vIdx: total, // mobile step index starting at first original
    isAnimating: false,
    autoplayTimer: null as any,
    rafId: 0,
    dragStart: 0,
    isDragging: false,
    dragDiff: 0,
    containerWidth: 0,
  });

  // Calculate sizes based on viewport
  const getSlideWidth = (isD: boolean, containerW: number) => {
    return isD ? SLIDE_W_DESKTOP : containerW;
  };

  const getSlideGap = (isD: boolean) => {
    return isD ? GAP_DESKTOP : 0;
  };

  const getStepSize = (isD: boolean, containerW: number) => {
    return getSlideWidth(isD, containerW) + getSlideGap(isD);
  };

  const getCenterOffset = (isD: boolean, containerW: number) => {
    return isD ? (containerW - SLIDE_W_DESKTOP) / 2 : 0;
  };

  const getOffsetFor = (v: number, isD: boolean, containerW: number) => {
    return v * getStepSize(isD, containerW) - getCenterOffset(isD, containerW);
  };

  // Speed modulation function based on position
  const getDesktopSpeedAt = (x: number, containerW: number) => {
    const s = getStepSize(true, containerW);
    const raw = x + getCenterOffset(true, containerW);
    const t = (((raw % s) + s) % s) / s; // percentage through current slide step
    const sine = Math.sin(Math.PI * t);
    return BASE_SPEED + (PEAK_SPEED - BASE_SPEED) * sine;
  };

  // Determine closest slide index to center
  const getDesktopActiveIdx = (x: number, containerW: number) => {
    const s = getStepSize(true, containerW);
    const raw = x + getCenterOffset(true, containerW);
    const n = Math.round(raw / s);
    return ((n - total) % total + total) % total;
  };

  // Build duplicated slides for looping: [clones] [originals] [clones]
  const renderSlides = () => {
    const allSlides: JSX.Element[] = [];
    
    // Clones before
    SLIDES.forEach((slide, i) => {
      allSlides.push(
        <div
          key={`clone-prev-${i}`}
          className="hs-slide shrink-0 select-none relative overflow-hidden"
          style={{ width: isDesktop ? `${SLIDE_W_DESKTOP}px` : "100vw", height: isDesktop ? "750px" : "650px" }}
          data-index={i}
        >
          <Link to={slide.link} className="block w-full h-full">
            <img src={slide.image} alt={slide.alt} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </Link>
        </div>
      );
    });

    // Originals
    SLIDES.forEach((slide, i) => {
      allSlides.push(
        <div
          key={`original-${i}`}
          className="hs-slide shrink-0 select-none relative overflow-hidden"
          style={{ width: isDesktop ? `${SLIDE_W_DESKTOP}px` : "100vw", height: isDesktop ? "750px" : "650px" }}
          data-index={i + total}
        >
          <Link to={slide.link} className="block w-full h-full">
            <img src={slide.image} alt={slide.alt} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </Link>
        </div>
      );
    });

    // Clones after
    SLIDES.forEach((slide, i) => {
      allSlides.push(
        <div
          key={`clone-next-${i}`}
          className="hs-slide shrink-0 select-none relative overflow-hidden"
          style={{ width: isDesktop ? `${SLIDE_W_DESKTOP}px` : "100vw", height: isDesktop ? "750px" : "650px" }}
          data-index={i + total * 2}
        >
          <Link to={slide.link} className="block w-full h-full">
            <img src={slide.image} alt={slide.alt} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </Link>
        </div>
      );
    });

    return allSlides;
  };

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.offsetWidth;
      const d = window.innerWidth >= 768;
      
      setIsDesktop(d);
      
      const state = stateRef.current;
      state.isDesktop = d;
      state.containerWidth = width;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Core Slider Loop Effect
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const state = stateRef.current;

    // Continuous Animation Function (Desktop + Mobile)
    const rafTick = () => {
      const isD = state.isDesktop;
      const stepSize = getStepSize(isD, state.containerWidth);
      const loopEnd = getOffsetFor(total * 2, isD, state.containerWidth);
      const loopLen = total * stepSize;

      if (!state.isDragging) {
        // Continuous auto-scrolling speed calculation
        const currentSpeed = isD
          ? getDesktopSpeedAt(state.contX, state.containerWidth)
          : (BASE_SPEED + (PEAK_SPEED - BASE_SPEED) * Math.sin(Math.PI * ((((state.contX % stepSize) + stepSize) % stepSize) / stepSize))) * (state.containerWidth / 522);

        state.contX += Math.max(0.4, currentSpeed);

        // Seamless infinite loop back when reaching clones boundary
        if (state.contX >= loopEnd) {
          state.contX -= loopLen;
        }

        track.style.transform = `translateX(-${state.contX}px)`;
      }

      // Class toggles & active index
      const ri = getDesktopActiveIdx(state.contX, state.containerWidth);
      setActiveIdx(ri);

      const slides = track.querySelectorAll(".hs-slide");
      slides.forEach((slide) => {
        const slideIndex = parseInt((slide as HTMLElement).dataset.index || "0");
        const isCurrentActive = (slideIndex % total) === ri;
        if (isCurrentActive) {
          slide.classList.add("is-active");
        } else {
          slide.classList.remove("is-active");
        }
      });

      state.rafId = requestAnimationFrame(rafTick);
    };

    const startSlider = () => {
      cancelAnimationFrame(state.rafId);
      clearInterval(state.autoplayTimer);

      // Reset position to center of originals
      state.contX = getOffsetFor(total, state.isDesktop, state.containerWidth);
      track.style.transition = "none";
      state.rafId = requestAnimationFrame(rafTick);
    };

    startSlider();

    return () => {
      cancelAnimationFrame(state.rafId);
      clearInterval(state.autoplayTimer);
    };
  }, [isDesktop, total]);

  // Touch and drag handlers for mobile & desktop
  const handleDragStart = (clientX: number) => {
    const state = stateRef.current;
    state.dragStart = clientX;
    state.isDragging = true;
  };

  const handleDragMove = (clientX: number) => {
    const state = stateRef.current;
    if (!state.isDragging) return;

    const diff = state.dragStart - clientX;
    state.dragStart = clientX;
    state.contX += diff;

    const track = trackRef.current;
    if (track) {
      track.style.transition = "none";
      track.style.transform = `translateX(-${state.contX}px)`;
    }
  };

  const handleDragEnd = () => {
    const state = stateRef.current;
    state.isDragging = false;
  };

  // Nav actions (arrows)
  const handleNavClick = (direction: "next" | "prev") => {
    const state = stateRef.current;
    const stepSize = getStepSize(state.isDesktop, state.containerWidth);
    
    if (direction === "next") {
      state.contX += stepSize;
    } else {
      state.contX -= stepSize;
    }

    const track = trackRef.current;
    if (track) {
      track.style.transition = `transform ${TRANSITION_SPEED}ms cubic-bezier(.25,.46,.45,.94)`;
      track.style.transform = `translateX(-${state.contX}px)`;
      setTimeout(() => {
        if (track) track.style.transition = "none";
      }, TRANSITION_SPEED);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#09090b] py-4 md:py-6"
    >
      <div
        className="hs-track-wrap relative w-full h-[460px] sm:h-[580px] md:h-[750px] overflow-hidden md:overflow-visible touch-pan-y"
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div
          ref={trackRef}
          className="hs-track flex h-full will-change-transform gap-0 md:gap-[6px]"
        >
          {renderSlides()}
        </div>

        {/* Mobile-only Navigation Arrows */}
        {!isDesktop && (
          <>
            <button
              onClick={() => handleNavClick("prev")}
              className="hs-arrow hs-arrow--prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border-none cursor-pointer transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleNavClick("next")}
              className="hs-arrow hs-arrow--next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border-none cursor-pointer transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Slide Pagination Dots */}
        <div className="hs-pagination absolute bottom-[18px] left-0 right-0 z-10 flex items-center justify-center gap-[7px] pointer-events-none">
          {SLIDES.map((_, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={`dot-${i}`}
                type="button"
                className={`hs-dot h-[7px] rounded-[4px] border-none p-0 cursor-pointer pointer-events-auto transition-all duration-350 ${
                  isActive ? "w-[28px] bg-white" : "w-[7px] bg-white/40"
                }`}
                onClick={() => {
                  if (isDesktop) return;
                  const state = stateRef.current;
                  clearInterval(state.autoplayTimer);
                  goToMobileRef.current?.(total + i);
                }}
                role="tab"
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={isActive}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        /* Smooth scaling and layout rules matching target design */
        .hs-slide {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease;
          opacity: 0.6;
          transform: scale(0.95);
        }
        
        .hs-slide.is-active {
          opacity: 1;
          transform: scale(1.0);
        }

        @media (max-width: 767px) {
          .hs-slide {
            opacity: 1;
            transform: scale(1.0);
          }
        }
      `}</style>
    </div>
  );
}
