import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { open, setOpen, items, remove, total, clear } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] flex h-full w-full max-w-md flex-col bg-white text-zinc-900 border-l border-black/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2 className="font-display text-sm uppercase tracking-brand-wide text-zinc-900 font-semibold">
                Bag — {items.length} {items.length === 1 ? "item" : "items"}
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-1 text-zinc-600 hover:text-black transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-20 text-center text-xs uppercase tracking-brand text-zinc-500">
                  Your bag is empty.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((it) => (
                    <li key={`${it.id}-${it.size}`} className="grid grid-cols-[80px_1fr_auto] gap-4">
                      <div className="aspect-[4/5] w-20 overflow-hidden bg-zinc-50 border border-black/10 rounded-sm">
                        <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-xs uppercase tracking-brand text-zinc-900 font-semibold">
                          {it.name}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Size {it.size} · Qty {it.qty}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-zinc-900">₹{(it.price * it.qty).toLocaleString("en-IN")}</p>
                      </div>
                      <button
                        onClick={() => remove(it.id, it.size)}
                        aria-label="Remove"
                        className="self-start text-zinc-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-black/10 px-6 py-5 bg-zinc-50">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-brand text-zinc-700">
                <span>Subtotal</span>
                <span className="text-zinc-900 font-bold">₹{total().toLocaleString("en-IN")}</span>
              </div>
              <button
                disabled={items.length === 0}
                className="w-full border border-black bg-black py-4 font-display text-xs uppercase tracking-brand-wide text-white font-bold disabled:opacity-40 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Checkout
              </button>
              {items.length > 0 && (
                <button
                  onClick={clear}
                  className="mt-3 w-full text-center text-[10px] uppercase tracking-brand text-zinc-500 hover:text-black transition-colors"
                >
                  Clear bag
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
