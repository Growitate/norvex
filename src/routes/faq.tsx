import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Package,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Instagram,
  Mail,
  ArrowRight,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions | Norva Store" },
      {
        name: "description",
        content:
          "Find answers to frequently asked questions about orders, shipping timelines across India, return & refund policies, craftsmanship, and payments at Norva Store.",
      },
      { property: "og:title", content: "FAQ — Frequently Asked Questions | Norva Store" },
      {
        property: "og:description",
        content:
          "Have questions? Browse our FAQ covering shipping, tracking, returns, materials, and support.",
      },
    ],
  }),
  component: FAQPage,
});

interface FAQItem {
  id: string;
  category: "orders" | "returns" | "materials" | "payments";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // Orders & Shipping
  {
    id: "orders-1",
    category: "orders",
    question: "How long does shipping and delivery take across India?",
    answer:
      "All orders are processed within 24 to 48 business hours. Standard express shipping across major metros (Delhi NCR, Mumbai, Bengaluru, etc.) takes 3–5 business days. Rest of India typically arrives within 5–7 business days.",
  },
  {
    id: "orders-2",
    category: "orders",
    question: "How can I track my Norva order status?",
    answer:
      "Once your drop package is dispatched, we send an automated SMS update with your tracking link and AWB number. You can also reach out to us with your Order ID via email at norvastorex@gmail.com or DM us on Instagram @norvaxstore for real-time tracking.",
  },
  {
    id: "orders-3",
    category: "orders",
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes, Cash on Delivery is supported for select pin codes across India. Pre-paid orders via UPI and Cards receive priority dispatch processing.",
  },
  {
    id: "orders-4",
    category: "orders",
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "We process drops quickly! If you need to change your delivery address or cancel an order, please message us via email (norvastorex@gmail.com) or Instagram DM (@norvaxstore) within 3 hours of placing the order before dispatch.",
  },

  // Returns & Refunds
  {
    id: "returns-1",
    category: "returns",
    question: "What is your return & exchange policy?",
    answer:
      "Return requests can only be raised after 2 days from the shipping date. Items must be unworn, unused, and in their original packaging. We replace items if they are defective or damaged upon arrival when reported within 48 hours of delivery.",
  },
  {
    id: "returns-2",
    category: "returns",
    question: "How are refunds processed?",
    answer:
      "Refunds are only applicable if the product is received damaged. Once your return is received and inspected, approved refunds are processed within 5–10 business days to your original payment method.",
  },
  {
    id: "returns-3",
    category: "returns",
    question: "What if I received an incorrect or defective item?",
    answer:
      "We inspect every item before packaging. However, if an error occurs, simply message us with photos via email at norvastorex@gmail.com or DM us on Instagram @norvaxstore. We will arrange a free reverse pickup and dispatch a brand new piece immediately.",
  },

  // Materials & Quality
  {
    id: "materials-1",
    category: "materials",
    question: "What materials are Norva accessories crafted from?",
    answer:
      "Our statement accessories and bags are crafted using premium grade stainless steel, reinforced brass alloys with electroplated finishes, high-density vegan leather, and durable custom hardware designed to withstand daily wear.",
  },
  {
    id: "materials-2",
    category: "materials",
    question: "Are the jewelry and accessory pieces tarnish-resistant?",
    answer:
      "Yes! Our metal pieces feature protective PVD and multi-layer anti-tarnish coatings. To keep them looking pristine, avoid direct contact with harsh perfumes, chlorine pools, or abrasive chemicals, and wipe gently with a soft cloth after use.",
  },
  {
    id: "materials-3",
    category: "materials",
    question: "Are drops and collections limited edition?",
    answer:
      "Yes, many Norva signature bags and statement accessories are curated and released in small, exclusive batch drops. Once a batch sells out, restocks are not guaranteed.",
  },

  // Payments & Security
  {
    id: "payments-1",
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We support all major payment modes including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, and Cash on Delivery.",
  },
  {
    id: "payments-2",
    category: "payments",
    question: "Is online checkout secure?",
    answer:
      "Absolutely. All transactions are encrypted via 256-bit SSL and processed through RBI-approved secure payment gateways. We never store your full card details or banking credentials.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "orders", label: "Orders & Shipping", icon: Package },
  { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
  { id: "materials", label: "Quality & Care", icon: Sparkles },
  { id: "payments", label: "Payment & Security", icon: CreditCard },
] as const;

function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "orders-1": true,
    "returns-1": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-16 sm:h-20 bg-white" />

      <main className="bg-white min-h-screen text-zinc-900 pb-20 sm:pb-28">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-10 sm:pt-16 md:pt-20 pb-10 sm:pb-14 border-b border-black/10">
          <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 md:px-8 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 sm:space-y-4 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-zinc-900 text-white text-[10px] sm:text-[11px] font-display font-semibold tracking-widest uppercase shadow-md">
                <HelpCircle className="h-3 sm:h-3.5 w-3 sm:w-3.5" /> HELP CENTER & FAQ
              </div>

              <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-[1.1]">
                Frequently Asked <span className="text-zinc-400">Questions</span>
              </h1>

              <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto px-2">
                Have questions about our statement bag drops, shipping timelines across India, or care
                guides? Everything you need to know is below.
              </p>
            </motion.div>

            {/* Live Search Bar */}
            <div className="max-w-xl mx-auto pt-2 sm:pt-4">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4 sm:h-5 w-4 sm:w-5 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., shipping, returns, COD, tarnish)..."
                  className="w-full bg-zinc-50 hover:bg-zinc-100/80 focus:bg-white border border-black/15 focus:border-zinc-900 rounded-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-xs font-semibold text-zinc-400 hover:text-zinc-800 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 pt-8 sm:pt-12">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 scrollbar-none no-scrollbar justify-start md:justify-center">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-md"
                      : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border border-black/5"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-zinc-500"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Accordion Questions List */}
          <div className="mt-6 sm:mt-10 max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16 px-4 bg-zinc-50 rounded-2xl border border-black/10">
                <HelpCircle className="h-10 w-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="font-display text-base sm:text-lg font-bold uppercase text-zinc-900">
                  No matching answers found
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-1 max-w-md mx-auto">
                  We couldn't find anything matching "{searchQuery}". Reach out to our direct support team
                  for instant answers!
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-display font-bold uppercase tracking-wider hover:bg-black transition-colors"
                >
                  View All FAQs
                </button>
              </div>
            ) : (
              filteredFAQs.map((item, idx) => {
                const isOpen = !!openItems[item.id];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="border border-black/10 rounded-2xl bg-white shadow-xs overflow-hidden transition-colors hover:border-black/25"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <span className="font-display text-xs sm:text-sm md:text-base font-bold text-zinc-900 tracking-tight leading-snug">
                        {item.question}
                      </span>
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? "bg-zinc-900 text-white rotate-180" : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm font-sans text-zinc-600 leading-relaxed border-t border-black/5">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Quick Help & Contact Cards */}
          <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
            <div className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-800/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="space-y-3 max-w-md">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-display font-semibold tracking-widest uppercase text-white border border-white/15">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> DIRECT ASSISTANCE
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                    Still have questions?
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Our concierge support is available daily. DM us on Instagram @norvaxstore or email
                    us directly at norvastorex@gmail.com.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href="https://www.instagram.com/norvaxstore?igsh=MWxubzhoZHNmN3B5aA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white px-6 py-3.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram DM</span>
                  </a>

                  <a
                    href="mailto:norvastorex@gmail.com"
                    className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-zinc-100 text-zinc-950 px-6 py-3.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
