export const RAZORPAY_CONFIG = {
  keyId:
    (typeof process !== "undefined" && process.env?.RAZORPAY_KEY_ID) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_RAZORPAY_KEY_ID) ||
    "rzp_live_TXzsbr1LC74Prr",
  merchantId:
    (typeof process !== "undefined" && process.env?.RAZORPAY_MERCHANT_ID) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_RAZORPAY_MERCHANT_ID) ||
    "T6Ai3vaGgQ9UEK",
  companyName: "NORVA",
  themeColor: "#09090b", // Luxury Dark
  currency: "INR",
  magicCheckout: {
    enabled: true,
    oneClickCheckout: true,
  },
};

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayCheckoutOptions {
  amount: number; // in INR
  customerName?: string;
  contactNumber?: string;
  customerEmail?: string;
  shippingAddress?: string;
  oneClickCheckout?: boolean;
  couponCode?: string;
  orderNotes?: Record<string, string>;
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void;
  onDismiss?: () => void;
  onError?: (error: Error) => void;
}

export interface PromoCodeResult {
  valid: boolean;
  code: string;
  discount_amount: number;
  final_amount: number;
  message: string;
}

/**
 * Dynamically loads the official Razorpay Checkout SDK script into document head
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Creates a server-side Razorpay order
 */
export async function createServerRazorpayOrder(
  amount: number,
  customerName?: string,
  contactNumber?: string,
): Promise<{ success: boolean; orderId?: string; error?: string; keyId?: string }> {
  try {
    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        customerName: customerName || "Norva Customer",
        contactNumber: contactNumber || "",
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.warn("Server order generation notice:", err);
    return { success: false, error: err.message, keyId: RAZORPAY_CONFIG.keyId };
  }
}

/**
 * Validates and applies a coupon code via the Magic Checkout promotions endpoint
 */
export async function applyPromoCode(code: string, amount: number): Promise<PromoCodeResult> {
  try {
    const res = await fetch("/api/razorpay/magic/apply-promotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, amount }),
    });
    return await res.json();
  } catch (err: any) {
    return {
      valid: false,
      code,
      discount_amount: 0,
      final_amount: amount,
      message: err.message || "Could not validate coupon.",
    };
  }
}

/**
 * Fetches available store promotions
 */
export async function fetchAvailablePromotions() {
  try {
    const res = await fetch("/api/razorpay/magic/promotions");
    const data = await res.json();
    return data.promotions || [];
  } catch {
    return [];
  }
}

/**
 * Launches the Razorpay checkout overlay with Magic Checkout & 1-Click support
 */
export async function initiateRazorpayPayment(options: RazorpayCheckoutOptions): Promise<void> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    const err = new Error("Failed to load Razorpay payment SDK. Please check your internet connection.");
    options.onError?.(err);
    throw err;
  }

  // Attempt to create server-side order
  let orderId: string | undefined = undefined;
  try {
    const orderRes = await createServerRazorpayOrder(
      options.amount,
      options.customerName,
      options.contactNumber,
    );
    if (orderRes.success && orderRes.orderId) {
      orderId = orderRes.orderId;
    }
  } catch (e) {
    console.warn("Proceeding with standard direct checkout popup:", e);
  }

  const amountInPaise = Math.round(options.amount * 100);

  const rzpOptions: any = {
    key: RAZORPAY_CONFIG.keyId,
    amount: amountInPaise,
    currency: RAZORPAY_CONFIG.currency,
    name: RAZORPAY_CONFIG.companyName,
    description: "Luxury Streetwear Order",
    image: "/assets/male_hoodie_drop.jpg",
    // Enable Razorpay Magic 1-Click Checkout
    one_click_checkout: options.oneClickCheckout !== false,
    ...(orderId ? { order_id: orderId } : {}),
    prefill: {
      name: options.customerName || "",
      contact: options.contactNumber || "",
      email: options.customerEmail || "",
    },
    notes: {
      merchant_id: RAZORPAY_CONFIG.merchantId,
      customer_name: options.customerName || "Customer",
      contact_number: options.contactNumber || "",
      shipping_address: options.shippingAddress || "Pre-filled via Magic Checkout",
      coupon_code: options.couponCode || "",
      checkout_type: options.oneClickCheckout ? "magic_1_click" : "standard",
      ...options.orderNotes,
    },
    theme: {
      color: RAZORPAY_CONFIG.themeColor,
      backdrop_color: "rgba(0, 0, 0, 0.85)",
    },
    handler: function (response: RazorpayPaymentSuccessResponse) {
      options.onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        options.onDismiss?.();
      },
      animation: true,
      escape: true,
      backdropclose: false,
    },
  };

  const rzp = new (window as any).Razorpay(rzpOptions);

  rzp.on("payment.failed", function (response: any) {
    const err = new Error(
      response.error?.description || response.error?.reason || "Payment was declined or cancelled.",
    );
    options.onError?.(err);
  });

  rzp.open();
}
