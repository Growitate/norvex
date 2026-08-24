import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Review {
  id: string;
  author: string;
  title: string;
  text: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Rohan Sharma',
    title: 'Absolutely next level baggy fit',
    text: 'I have been searching for proper oversized streetwear pants in India for months and this is it. The drape is perfect, heavy cotton, sits beautifully on sneakers. Ordering the grey one next!',
    rating: 5,
  },
  {
    id: '2',
    author: 'Sanya Sen',
    title: 'Sensational fabric & drop',
    text: 'Super cozy, heavyweight feel, and the silhouette is perfectly street. The details on the waistband and pocket lining are very premium. NORVA is doing it right.',
    rating: 5,
  },
  {
    id: '3',
    author: 'Rhea Malhotra',
    title: 'Best statement bag I own',
    text: 'The silver chain hardware and patent leather finish are incredible quality. Got so many compliments everywhere. Definitely buying the harness tote next!',
    rating: 5,
  },
  {
    id: '4',
    author: 'Aarav Sharma',
    title: 'Unmatched gothic aesthetic',
    text: 'Heavyweight metal buckles, sturdy stitching, and fits everything I need for night events. Absolutely worth every rupee!',
    rating: 5,
  },
  {
    id: '5',
    author: 'Ananya Patel',
    title: 'Top tier streetwear quality',
    text: "The hoodie weight is crazy good, 450GSM minimum feel. Doesn't lose shape after washing. NØRVA is setting new benchmarks.",
    rating: 5,
  },
  {
    id: '6',
    author: 'Kabir Verma',
    title: 'Insane attention to detail',
    text: 'From the custom zipper pulls to the custom inner tags, everything feels luxury level without the crazy designer markup.',
    rating: 5,
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentReview = REVIEWS[currentIndex];

  // Vertical bottom-to-top scroll animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-white py-10 sm:py-14 text-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 text-center">
        {/* Main Section Header */}
        <div className="space-y-4 mb-12">
          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-zinc-900">
            Let NØRVA speak for itself
          </h2>

          {/* Overall Rating Summary */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#00B67A] text-[#00B67A]" />
              ))}
            </div>
            <p className="font-sans text-xs sm:text-sm font-normal text-zinc-600 flex items-center gap-1.5 tracking-wide">
              <span>from 3649 reviews</span>
              <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#00A3FF] text-white text-[10px] font-bold leading-none shadow-xs">
                ✓
              </span>
            </p>
          </div>
        </div>

        {/* Auto-scrolling Vertical Review Container (without arrow buttons) */}
        <div
          className="relative max-w-2xl mx-auto px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="relative min-h-[270px] sm:min-h-[240px] flex items-center justify-center bg-zinc-50 border border-black/10 rounded-2xl p-8 sm:p-10 shadow-xs overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentReview.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="w-full flex flex-col items-center text-center space-y-4"
              >
                {/* 5 Green Stars */}
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-[#00B67A] text-[#00B67A]" />
                  ))}
                </div>

                {/* Review Title */}
                <h3 className="font-sans text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                  {currentReview.title}
                </h3>

                {/* Review Text */}
                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-lg">
                  "{currentReview.text}"
                </p>

                {/* Review Author */}
                <p className="font-sans text-xs font-semibold tracking-widest uppercase text-zinc-500 pt-3 border-t border-black/10 w-full max-w-[200px]">
                  {currentReview.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
