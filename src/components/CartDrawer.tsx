import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, CheckCircle2, Phone, User, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { addCustomerOrder } from "@/lib/db";

export function CartDrawer() {
  const { open, setOpen, items, remove, total, clear } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
    setOrderConfirmed(null);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !contactNumber.trim() || items.length === 0) return;

    setIsSubmitting(true);

    const newOrder = addCustomerOrder({
      customerName: customerName.trim(),
      contactNumber: contactNumber.trim(),
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        image: i.image,
        size: i.size,
        qty: i.qty,
      })),
      totalAmount: total(),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderConfirmed(newOrder.id);
      clear();
      setCustomerName("");
      setContactNumber("");
    }, 400);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCheckingOut(false);
    setOrderConfirmed(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] flex h-full w-full max-w-md flex-col bg-white text-zinc-900 border-l border-black/10 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2 className="font-display text-sm uppercase tracking-brand-wide text-zinc-900 font-semibold">
                {orderConfirmed
                  ? "Order Confirmed"
                  : isCheckingOut
                    ? "Express Checkout"
                    : `Bag — ${items.length} ${items.length === 1 ? "item" : "items"}`}
              </h2>
              <button
                onClick={handleClose}
                aria-label="Close cart"
                className="p-1 text-zinc-600 hover:text-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Order Confirmation Screen */}
            {orderConfirmed ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl uppercase font-bold text-zinc-950">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs font-mono text-zinc-600 mt-2">
                  Order Reference ID: <strong className="text-zinc-900">{orderConfirmed}</strong>
                </p>
                <p className="text-xs text-zinc-500 mt-3 max-w-xs">
                  Your order has been recorded and synced to our fulfillment portal.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 px-8 py-3.5 bg-black text-white text-xs font-display uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-5">
                  <div className="bg-zinc-50 border border-zinc-200 p-3.5 text-xs text-zinc-600 font-mono">
                    <p className="font-semibold text-zinc-900 uppercase">
                      Order Summary: {items.length} Item(s)
                    </p>
                    <p className="mt-1">
                      Total Payable:{" "}
                      <strong className="text-zinc-950 font-bold">
                        ₹{total().toLocaleString("en-IN")}
                      </strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-700 mb-1.5 font-semibold">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        required
                        autoFocus
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-zinc-300 text-xs text-zinc-900 focus:border-black focus:outline-none transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-700 mb-1.5 font-semibold">
                      Contact / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-zinc-400" />
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        required
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-zinc-300 text-xs text-zinc-900 font-mono focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-zinc-500 font-mono">
                      Used for order confirmation & dispatch notifications.
                    </p>
                  </div>
                </form>

                <div className="border-t border-black/10 pt-4 mt-6">
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting || !customerName.trim() || !contactNumber.trim()}
                    className="w-full border border-black bg-black py-4 font-display text-xs uppercase tracking-brand-wide text-white font-bold disabled:opacity-40 hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order (₹{total().toLocaleString("en-IN")})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="mt-2.5 w-full text-center text-[11px] uppercase tracking-brand text-zinc-500 hover:text-black py-1 transition-colors"
                  >
                    ← Back to Bag
                  </button>
                </div>
              </div>
            ) : (
              /* Normal Cart List */
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <p className="mt-20 text-center text-xs uppercase tracking-brand text-zinc-500">
                      Your bag is empty.
                    </p>
                  ) : (
                    <ul className="space-y-6">
                      {items.map((it) => (
                        <li
                          key={`${it.id}-${it.size}`}
                          className="grid grid-cols-[80px_1fr_auto] gap-4"
                        >
                          <div className="aspect-[4/5] w-20 overflow-hidden bg-zinc-50 border border-black/10 rounded-sm">
                            <img
                              src={it.image}
                              alt={it.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-display text-xs uppercase tracking-brand text-zinc-900 font-semibold">
                              {it.name}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                              Size {it.size} · Qty {it.qty}
                            </p>
                            <p className="mt-2 text-xs font-semibold text-zinc-900">
                              ₹{(it.price * it.qty).toLocaleString("en-IN")}
                            </p>
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
                    <span className="text-zinc-900 font-bold">
                      ₹{total().toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    disabled={items.length === 0}
                    onClick={handleStartCheckout}
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
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
