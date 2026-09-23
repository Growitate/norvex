import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Trash2,
  CheckCircle2,
  Phone,
  User,
  ArrowRight,
  CreditCard,
  Truck,
  ShieldCheck,
  Mail,
  MapPin,
  Lock,
  AlertCircle,
  Loader2,
  Zap,
  Tag,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { addCustomerOrder, type CustomerOrder } from "@/lib/db";
import {
  initiateRazorpayPayment,
  applyPromoCode,
  type PromoCodeResult,
  RAZORPAY_CONFIG,
} from "@/lib/razorpay";

export function CartDrawer() {
  const { open, setOpen, items, remove, total, clear } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay_magic" | "razorpay_standard" | "cod">(
    "razorpay_magic",
  );
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Coupon state
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeResult | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  const cartSubtotal = total();
  const discountAmount = appliedPromo?.discount_amount || 0;
  const payableTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleApplyCoupon = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promoCodeInput.trim()) return;

    setIsApplyingPromo(true);
    setPromoError(null);

    const result = await applyPromoCode(promoCodeInput.trim(), cartSubtotal);
    setIsApplyingPromo(false);

    if (result.valid) {
      setAppliedPromo(result);
      setPromoError(null);
    } else {
      setPromoError(result.message || "Invalid promo code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedPromo(null);
    setPromoCodeInput("");
    setPromoError(null);
  };

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
    setConfirmedOrder(null);
    setCheckoutError(null);
  };

  // Direct 1-Click Magic Checkout (handles address & payment inside Razorpay modal)
  const handleDirectMagicCheckout = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    setCheckoutError(null);

    const orderItems = items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      image: i.image,
      size: i.size,
      qty: i.qty,
    }));

    try {
      await initiateRazorpayPayment({
        amount: payableTotal,
        customerName: customerName || undefined,
        contactNumber: contactNumber || undefined,
        customerEmail: customerEmail || undefined,
        shippingAddress: shippingAddress || undefined,
        oneClickCheckout: true,
        couponCode: appliedPromo?.code,
        onSuccess: async (rzpResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: rzpResponse.razorpay_order_id,
                razorpay_payment_id: rzpResponse.razorpay_payment_id,
                razorpay_signature: rzpResponse.razorpay_signature,
                orderInput: {
                  customerName: customerName.trim() || "Magic Checkout Shopper",
                  contactNumber: contactNumber.trim() || "+91 (Verified via OTP)",
                  customerEmail: customerEmail.trim(),
                  shippingAddress: shippingAddress.trim() || "Auto-retrieved via Magic Checkout",
                  items: orderItems,
                  totalAmount: payableTotal,
                },
              }),
            });

            let recordedOrder: CustomerOrder;
            if (verifyRes.ok) {
              const data = await verifyRes.json();
              recordedOrder = data.order;
            } else {
              recordedOrder = addCustomerOrder({
                customerName: customerName.trim() || "Magic Checkout Shopper",
                contactNumber: contactNumber.trim() || "+91 (Verified via OTP)",
                customerEmail: customerEmail.trim(),
                shippingAddress: shippingAddress.trim() || "Auto-retrieved via Magic Checkout",
                items: orderItems,
                totalAmount: payableTotal,
                paymentMethod: "Razorpay",
                paymentId: rzpResponse.razorpay_payment_id,
                razorpayOrderId: rzpResponse.razorpay_order_id,
                paymentStatus: "Paid",
              });
            }

            addCustomerOrder({
              customerName: customerName.trim() || "Magic Checkout Shopper",
              contactNumber: contactNumber.trim() || "+91 (Verified via OTP)",
              customerEmail: customerEmail.trim(),
              shippingAddress: shippingAddress.trim() || "Auto-retrieved via Magic Checkout",
              items: orderItems,
              totalAmount: payableTotal,
              paymentMethod: "Razorpay",
              paymentId: rzpResponse.razorpay_payment_id,
              razorpayOrderId: rzpResponse.razorpay_order_id,
              paymentStatus: "Paid",
            });

            setConfirmedOrder(recordedOrder);
            clear();
            setIsSubmitting(false);
          } catch (err: any) {
            console.error("Error finalizing Magic Checkout order:", err);
            const fallbackOrder = addCustomerOrder({
              customerName: customerName.trim() || "Magic Checkout Shopper",
              contactNumber: contactNumber.trim() || "+91 (Verified via OTP)",
              customerEmail: customerEmail.trim(),
              shippingAddress: shippingAddress.trim() || "Auto-retrieved via Magic Checkout",
              items: orderItems,
              totalAmount: payableTotal,
              paymentMethod: "Razorpay",
              paymentId: rzpResponse.razorpay_payment_id,
              paymentStatus: "Paid",
            });
            setConfirmedOrder(fallbackOrder);
            clear();
            setIsSubmitting(false);
          }
        },
        onDismiss: () => {
          setIsSubmitting(false);
        },
        onError: (err) => {
          setCheckoutError(err.message || "Payment modal dismissed.");
          setIsSubmitting(false);
        },
      });
    } catch (err: any) {
      setCheckoutError(err.message || "Could not launch Magic Checkout.");
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !contactNumber.trim() || items.length === 0) {
      setCheckoutError("Please fill in your name and contact number.");
      return;
    }

    setCheckoutError(null);
    setIsSubmitting(true);

    const orderItems = items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      image: i.image,
      size: i.size,
      qty: i.qty,
    }));

    if (paymentMethod === "razorpay_magic" || paymentMethod === "razorpay_standard") {
      try {
        await initiateRazorpayPayment({
          amount: payableTotal,
          customerName: customerName.trim(),
          contactNumber: contactNumber.trim(),
          customerEmail: customerEmail.trim() || undefined,
          shippingAddress: shippingAddress.trim() || undefined,
          oneClickCheckout: paymentMethod === "razorpay_magic",
          couponCode: appliedPromo?.code,
          onSuccess: async (rzpResponse) => {
            try {
              const verifyRes = await fetch("/api/razorpay/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: rzpResponse.razorpay_order_id,
                  razorpay_payment_id: rzpResponse.razorpay_payment_id,
                  razorpay_signature: rzpResponse.razorpay_signature,
                  orderInput: {
                    customerName: customerName.trim(),
                    contactNumber: contactNumber.trim(),
                    customerEmail: customerEmail.trim(),
                    shippingAddress: shippingAddress.trim(),
                    items: orderItems,
                    totalAmount: payableTotal,
                  },
                }),
              });

              let recordedOrder: CustomerOrder;
              if (verifyRes.ok) {
                const data = await verifyRes.json();
                recordedOrder = data.order;
              } else {
                recordedOrder = addCustomerOrder({
                  customerName: customerName.trim(),
                  contactNumber: contactNumber.trim(),
                  customerEmail: customerEmail.trim(),
                  shippingAddress: shippingAddress.trim(),
                  items: orderItems,
                  totalAmount: payableTotal,
                  paymentMethod: "Razorpay",
                  paymentId: rzpResponse.razorpay_payment_id,
                  razorpayOrderId: rzpResponse.razorpay_order_id,
                  paymentStatus: "Paid",
                });
              }

              addCustomerOrder({
                customerName: customerName.trim(),
                contactNumber: contactNumber.trim(),
                customerEmail: customerEmail.trim(),
                shippingAddress: shippingAddress.trim(),
                items: orderItems,
                totalAmount: payableTotal,
                paymentMethod: "Razorpay",
                paymentId: rzpResponse.razorpay_payment_id,
                razorpayOrderId: rzpResponse.razorpay_order_id,
                paymentStatus: "Paid",
              });

              setConfirmedOrder(recordedOrder);
              clear();
              setCustomerName("");
              setContactNumber("");
              setCustomerEmail("");
              setShippingAddress("");
              setIsSubmitting(false);
            } catch (err: any) {
              console.error("Error recording verified order:", err);
              const fallbackOrder = addCustomerOrder({
                customerName: customerName.trim(),
                contactNumber: contactNumber.trim(),
                customerEmail: customerEmail.trim(),
                shippingAddress: shippingAddress.trim(),
                items: orderItems,
                totalAmount: payableTotal,
                paymentMethod: "Razorpay",
                paymentId: rzpResponse.razorpay_payment_id,
                paymentStatus: "Paid",
              });
              setConfirmedOrder(fallbackOrder);
              clear();
              setIsSubmitting(false);
            }
          },
          onDismiss: () => {
            setIsSubmitting(false);
          },
          onError: (err) => {
            setCheckoutError(err.message || "Payment window closed.");
            setIsSubmitting(false);
          },
        });
      } catch (err: any) {
        setCheckoutError(err.message || "Could not launch Razorpay.");
        setIsSubmitting(false);
      }
    } else {
      // Cash on Delivery
      try {
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: customerName.trim(),
            contactNumber: contactNumber.trim(),
            customerEmail: customerEmail.trim(),
            shippingAddress: shippingAddress.trim(),
            items: orderItems,
            totalAmount: payableTotal,
            paymentMethod: "Cash on Delivery",
            paymentStatus: "Pending",
          }),
        });

        let newOrder: CustomerOrder;
        if (orderRes.ok) {
          const resData = await orderRes.json();
          newOrder = resData.order;
        } else {
          newOrder = addCustomerOrder({
            customerName: customerName.trim(),
            contactNumber: contactNumber.trim(),
            customerEmail: customerEmail.trim(),
            shippingAddress: shippingAddress.trim(),
            items: orderItems,
            totalAmount: payableTotal,
            paymentMethod: "Cash on Delivery",
            paymentStatus: "Pending",
          });
        }

        addCustomerOrder({
          customerName: customerName.trim(),
          contactNumber: contactNumber.trim(),
          customerEmail: customerEmail.trim(),
          shippingAddress: shippingAddress.trim(),
          items: orderItems,
          totalAmount: payableTotal,
          paymentMethod: "Cash on Delivery",
          paymentStatus: "Pending",
        });

        setConfirmedOrder(newOrder);
        clear();
        setCustomerName("");
        setContactNumber("");
        setCustomerEmail("");
        setShippingAddress("");
      } catch (err: any) {
        setCheckoutError(err.message || "Failed to place order.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsCheckingOut(false);
    setConfirmedOrder(null);
    setCheckoutError(null);
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
              <div className="flex items-center gap-2">
                <h2 className="font-display text-sm uppercase tracking-brand-wide text-zinc-900 font-semibold">
                  {confirmedOrder
                    ? "Order Confirmed"
                    : isCheckingOut
                      ? "Express Checkout"
                      : `Bag — ${items.length} ${items.length === 1 ? "item" : "items"}`}
                </h2>
                {isCheckingOut && (
                  <span className="flex items-center gap-1 text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 font-bold">
                    <Lock className="w-2.5 h-2.5" /> Razorpay Secured
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                aria-label="Close cart"
                className="p-1 text-zinc-600 hover:text-black transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Order Confirmation Screen */}
            {confirmedOrder ? (
              <div className="flex-1 flex flex-col items-center justify-between p-6 text-center overflow-y-auto">
                <div className="w-full flex flex-col items-center my-auto">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl uppercase font-bold text-zinc-950">
                    Order Confirmed!
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 font-sans">
                    Thank you,{" "}
                    <strong className="text-zinc-900">{confirmedOrder.customerName}</strong>. Your
                    order is secured.
                  </p>

                  {/* Summary Box */}
                  <div className="w-full mt-6 bg-zinc-50 border border-zinc-200 p-4 text-left font-mono text-xs space-y-2.5">
                    <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                      <span className="text-zinc-500 uppercase text-[10px]">Order ID</span>
                      <strong className="text-zinc-950 font-bold">{confirmedOrder.id}</strong>
                    </div>

                    {confirmedOrder.paymentId && (
                      <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                        <span className="text-zinc-500 uppercase text-[10px]">Razorpay Payment ID</span>
                        <span className="text-emerald-700 font-bold break-all">
                          {confirmedOrder.paymentId}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                      <span className="text-zinc-500 uppercase text-[10px]">Payment Method</span>
                      <span className="text-zinc-900 font-semibold">
                        {confirmedOrder.paymentMethod || "Razorpay Live"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                      <span className="text-zinc-500 uppercase text-[10px]">Payment Status</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs ${
                          confirmedOrder.paymentStatus === "Paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {confirmedOrder.paymentStatus || "Paid"}
                      </span>
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-zinc-500 uppercase text-[10px]">Total Paid</span>
                      <strong className="text-zinc-950 text-sm font-bold">
                        ₹{confirmedOrder.totalAmount.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 mt-4 max-w-xs font-mono">
                    A notification has been dispatched to fulfillment. You will receive real-time SMS
                    and delivery updates.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full mt-6 px-8 py-3.5 bg-black text-white text-xs font-display uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Magic 1-Click Banner */}
                  <div className="bg-linear-to-r from-zinc-950 via-zinc-900 to-black text-white p-4 border border-zinc-800 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-amber-400 text-black rounded-xs">
                          <Zap className="w-3.5 h-3.5 fill-black" />
                        </span>
                        <span className="font-display text-xs uppercase tracking-wider font-bold text-white">
                          Razorpay Magic Checkout
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 font-bold">
                        Live 1-Click
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400 mt-1.5">
                      Auto-fills saved addresses & 1-tap instant payment across UPI, GPay, Paytm & Cards.
                    </p>

                    <button
                      type="button"
                      onClick={handleDirectMagicCheckout}
                      disabled={isSubmitting}
                      className="mt-3 w-full bg-linear-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black py-2.5 px-3 font-display text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Launching Magic Checkout...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 fill-black" />
                          <span>Instant 1-Click Pay · ₹{payableTotal.toLocaleString("en-IN")}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="grow border-t border-zinc-200"></div>
                    <span className="shrink mx-3 text-[10px] font-mono uppercase text-zinc-400">
                      or fill details manually
                    </span>
                    <div className="grow border-t border-zinc-200"></div>
                  </div>

                  <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-3.5">
                    {checkoutError && (
                      <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 p-3 text-xs font-mono">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                        <span>{checkoutError}</span>
                      </div>
                    )}

                    {/* Customer Info */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-1 font-semibold">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute inset-y-0 left-3 my-auto w-3.5 h-3.5 text-zinc-400" />
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          required
                          className="w-full pl-8 pr-3 py-2 bg-white border border-zinc-300 text-xs text-zinc-900 focus:border-black focus:outline-none transition-colors font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-1 font-semibold">
                        Phone Number * (UPI & Delivery SMS)
                      </label>
                      <div className="relative">
                        <Phone className="absolute inset-y-0 left-3 my-auto w-3.5 h-3.5 text-zinc-400" />
                        <input
                          type="tel"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder="e.g. 9876543210"
                          required
                          className="w-full pl-8 pr-3 py-2 bg-white border border-zinc-300 text-xs text-zinc-900 font-mono focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-1 font-semibold">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="absolute inset-y-0 left-3 my-auto w-3.5 h-3.5 text-zinc-400" />
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="e.g. alex@example.com"
                          className="w-full pl-8 pr-3 py-2 bg-white border border-zinc-300 text-xs text-zinc-900 focus:border-black focus:outline-none transition-colors font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-1 font-semibold">
                        Delivery Address (Optional)
                      </label>
                      <div className="relative">
                        <MapPin className="absolute top-2.5 left-3 w-3.5 h-3.5 text-zinc-400" />
                        <textarea
                          rows={2}
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Flat/Building, Street, City, Pincode"
                          className="w-full pl-8 pr-3 py-2 bg-white border border-zinc-300 text-xs text-zinc-900 focus:border-black focus:outline-none transition-colors font-sans resize-none"
                        />
                      </div>
                    </div>

                    {/* Payment Mode Selector */}
                    <div className="pt-1">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-2 font-semibold">
                        Payment Mode
                      </label>

                      <div className="space-y-2">
                        {/* Razorpay Option */}
                        <label
                          className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                            paymentMethod === "razorpay_magic"
                              ? "border-black bg-zinc-950 text-white"
                              : "border-zinc-200 bg-zinc-50/60 text-zinc-800 hover:border-zinc-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="razorpay_magic"
                            checked={paymentMethod === "razorpay_magic"}
                            onChange={() => setPaymentMethod("razorpay_magic")}
                            className="mt-1 text-black focus:ring-0 accent-black"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                                Razorpay Live (UPI / Cards)
                              </span>
                              <span
                                className={`text-[9px] font-mono uppercase px-1.5 py-0.5 border font-bold ${
                                  paymentMethod === "razorpay_magic"
                                    ? "border-emerald-500/60 bg-emerald-950 text-emerald-300"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                }`}
                              >
                                Instant
                              </span>
                            </div>
                            <p
                              className={`text-[11px] mt-0.5 font-mono ${
                                paymentMethod === "razorpay_magic"
                                  ? "text-zinc-400"
                                  : "text-zinc-500"
                              }`}
                            >
                              GPay, PhonePe, Paytm, Cards & NetBanking
                            </p>
                          </div>
                        </label>

                        {/* Cash on Delivery Option */}
                        <label
                          className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                            paymentMethod === "cod"
                              ? "border-black bg-zinc-950 text-white"
                              : "border-zinc-200 bg-zinc-50/60 text-zinc-800 hover:border-zinc-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="mt-1 text-black focus:ring-0 accent-black"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
                                <Truck className="w-3.5 h-3.5 text-zinc-400" />
                                Cash on Delivery (COD)
                              </span>
                            </div>
                            <p
                              className={`text-[11px] mt-0.5 font-mono ${
                                paymentMethod === "cod" ? "text-zinc-400" : "text-zinc-500"
                              }`}
                            >
                              Pay cash or UPI upon doorstep arrival
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="border-t border-black/10 pt-4 mt-4">
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting || !customerName.trim() || !contactNumber.trim()}
                    className="w-full border border-black bg-black py-4 font-display text-xs uppercase tracking-brand-wide text-white font-bold disabled:opacity-40 hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Connecting to Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {paymentMethod === "cod" ? "Confirm COD Order" : "Proceed with Razorpay"} · ₹
                          {payableTotal.toLocaleString("en-IN")}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 mt-2 text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Razorpay Live Verified
                    </span>
                    <span>·</span>
                    <span>Merchant: {RAZORPAY_CONFIG.merchantId}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="mt-2 w-full text-center text-[11px] uppercase tracking-brand text-zinc-500 hover:text-black py-1 transition-colors cursor-pointer"
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
                    <div className="space-y-6">
                      {/* Products List */}
                      <ul className="space-y-5">
                        {items.map((it) => (
                          <li
                            key={`${it.id}-${it.size}`}
                            className="grid grid-cols-[70px_1fr_auto] gap-3.5 pb-4 border-b border-zinc-100"
                          >
                            <div className="aspect-4/5 w-18 overflow-hidden bg-zinc-50 border border-black/10 rounded-xs">
                              <img
                                src={it.image}
                                alt={it.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex flex-col justify-center">
                              <p className="truncate font-display text-xs uppercase tracking-brand text-zinc-900 font-semibold">
                                {it.name}
                              </p>
                              <p className="mt-0.5 text-[11px] text-zinc-500 font-mono">
                                Size: {it.size} · Qty: {it.qty}
                              </p>
                              <p className="mt-1 text-xs font-semibold text-zinc-900 font-mono">
                                ₹{(it.price * it.qty).toLocaleString("en-IN")}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(it.id, it.size)}
                              aria-label="Remove"
                              className="self-start text-zinc-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>

                      {/* Promo Code Section */}
                      <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-xs">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-900 mb-2">
                          <Tag className="w-3.5 h-3.5 text-zinc-600" />
                          <span>Promo Code / Coupons</span>
                        </div>

                        {appliedPromo ? (
                          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 text-xs font-mono text-emerald-800">
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                              <strong className="font-bold">{appliedPromo.code}</strong>
                              <span>(-₹{appliedPromo.discount_amount})</span>
                            </div>
                            <button
                              onClick={handleRemoveCoupon}
                              className="text-[10px] uppercase text-emerald-700 hover:text-red-600 underline cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleApplyCoupon} className="flex gap-2">
                            <input
                              type="text"
                              value={promoCodeInput}
                              onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                              placeholder="Try: NORVA10 or FIRST500"
                              className="flex-1 bg-white border border-zinc-300 px-3 py-1.5 text-xs font-mono uppercase focus:border-black focus:outline-none"
                            />
                            <button
                              type="submit"
                              disabled={isApplyingPromo || !promoCodeInput.trim()}
                              className="bg-black text-white px-3 py-1.5 text-xs font-display uppercase tracking-wider font-bold disabled:opacity-40 hover:bg-zinc-800 cursor-pointer transition-colors"
                            >
                              {isApplyingPromo ? "Applying..." : "Apply"}
                            </button>
                          </form>
                        )}

                        {promoError && (
                          <p className="text-[10px] text-red-600 font-mono mt-1.5">{promoError}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-black/10 px-6 py-5 bg-zinc-50 space-y-3">
                  {/* Calculations breakdown */}
                  <div className="space-y-1.5 text-xs font-mono text-zinc-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-zinc-900">
                        ₹{cartSubtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount ({appliedPromo?.code})</span>
                        <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="text-emerald-600 font-bold uppercase text-[10px]">FREE</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-zinc-200 text-sm font-bold text-zinc-950">
                      <span>Total Amount</span>
                      <span>₹{payableTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Magic 1-Click Checkout Button */}
                  <button
                    disabled={items.length === 0 || isSubmitting}
                    onClick={handleDirectMagicCheckout}
                    className="w-full bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-black py-3.5 px-4 font-display text-xs uppercase tracking-widest font-bold disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm border border-amber-500/30"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Opening Magic Checkout...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-black" />
                        <span>⚡ 1-Click Magic Checkout (Razorpay)</span>
                      </>
                    )}
                  </button>

                  <button
                    disabled={items.length === 0}
                    onClick={handleStartCheckout}
                    className="w-full border border-black bg-black py-3 font-display text-xs uppercase tracking-brand-wide text-white font-bold disabled:opacity-40 hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Standard Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {items.length > 0 && (
                    <button
                      onClick={clear}
                      className="w-full text-center text-[10px] uppercase tracking-brand text-zinc-500 hover:text-black transition-colors cursor-pointer"
                    >
                      Clear Bag
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
