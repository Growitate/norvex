import crypto from "node:crypto";
import { products as baseProducts, type Product, setServerProductLookup } from "./products";
import {
  type CustomerOrder,
  type Category,
  defaultCategories,
  setServerProductsLookup,
  setServerOrdersLookup,
  setServerCategoriesLookup,
} from "./db";
import { ADMIN_HARDCODED_PASSWORD } from "./adminAuth";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_live_TXzsbr1LC74Prr";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "Rq2Gx7djS1BSNXxekpbxFAIf";
const RAZORPAY_MERCHANT_ID = process.env.RAZORPAY_MERCHANT_ID || "T6Ai3vaGgQ9UEK";

function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  if (!orderId || !paymentId || !signature) return false;
  try {
    const text = `${orderId}|${paymentId}`;
    const expected = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(text).digest("hex");
    return expected === signature;
  } catch {
    return false;
  }
}

// In-memory server database state (persists across requests during server runtime)
let serverProducts: Product[] = JSON.parse(JSON.stringify(baseProducts));
let serverCategories: Category[] = JSON.parse(JSON.stringify(defaultCategories));

export function getServerProducts(): Product[] {
  return serverProducts;
}

export function getServerProduct(id: string): Product | undefined {
  return serverProducts.find((p) => p.id === id);
}

export function getServerOrders(): CustomerOrder[] {
  return serverOrders;
}

export function getServerCategories(): Category[] {
  return serverCategories;
}

// Hook into SSR resolvers
setServerProductLookup(getServerProduct);
setServerProductsLookup(getServerProducts);
setServerOrdersLookup(getServerOrders);
setServerCategoriesLookup(getServerCategories);
let serverOrders: CustomerOrder[] = [
  {
    id: "ORD-98421",
    customerName: "Aarav Mehta",
    contactNumber: "+91 98201 45872",
    items: [
      {
        id: "oversized-distressed-cross-hoodie",
        name: "Oversized Distressed Cross Heavyweight Hoodie",
        price: 3499,
        image: "/assets/male_hoodie_drop.jpg",
        size: "L",
        qty: 1,
      },
    ],
    totalAmount: 3499,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "Confirmed",
  },
  {
    id: "ORD-98418",
    customerName: "Sneha Kapoor",
    contactNumber: "+91 97114 83920",
    items: [
      {
        id: "gothic-monster-claw-case",
        name: "Gothic Monster Claw Embossed Soft Silicone Case",
        price: 249,
        image: "/assets/case_gothic_claw.jpg",
        size: "iPhone 15 Pro",
        qty: 2,
      },
      {
        id: "sensual-o-ring-leather-shoulder-bag",
        name: "Sensual O-Ring Hardware Slouch Shoulder Bag",
        price: 4299,
        image: "/assets/bag_shoulder_chain_1786114752412.png",
        size: "One Size",
        qty: 1,
      },
    ],
    totalAmount: 4797,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: "Processing",
  },
];

const ADMIN_TOKEN = "norva_token_vault_session_2026";

function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Password",
      ...headers,
    },
  });
}

async function parseJsonBody(request: Request): Promise<any> {
  try {
    const text = await request.text();
    if (!text || !text.trim()) return {};
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function verifyAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get("Authorization") || "";
  const customPassHeader = request.headers.get("X-Admin-Password") || "";
  const cookieHeader = request.headers.get("Cookie") || "";

  if (customPassHeader === ADMIN_HARDCODED_PASSWORD) return true;
  if (authHeader === `Bearer ${ADMIN_TOKEN}` || authHeader === `Bearer ${ADMIN_HARDCODED_PASSWORD}`) return true;
  if (cookieHeader.includes(`admin_token=${ADMIN_TOKEN}`)) return true;

  return false;
}

export async function handleApiRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method.toUpperCase();

  // Handle CORS Preflight
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Password",
      },
    });
  }

  // Health check
  if (pathname === "/api/health") {
    return jsonResponse({
      status: "healthy",
      service: "Norva Store Vault API",
      timestamp: new Date().toISOString(),
      productsCount: serverProducts.length,
      ordersCount: serverOrders.length,
    });
  }

  // ----------------------------------------------------
  // ADMIN AUTH ENDPOINTS
  // ----------------------------------------------------
  if (pathname === "/api/admin/login" && method === "POST") {
    try {
      const body = await parseJsonBody(request);
      const password = body.password || "";
      if (password === ADMIN_HARDCODED_PASSWORD) {
        return jsonResponse(
          {
            success: true,
            message: "Authentication successful. Access granted to Norva Secure Vault.",
            token: ADMIN_TOKEN,
            user: {
              role: "administrator",
              portal: "/portal-secure-x98f2k3",
            },
          },
          200,
          {
            "Set-Cookie": `admin_token=${ADMIN_TOKEN}; Path=/; HttpOnly; SameSite=Lax`,
          },
        );
      }
      return jsonResponse(
        {
          success: false,
          error: "Access Denied. Invalid master administrator password.",
        },
        401,
      );
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  if (pathname === "/api/admin/verify" && method === "GET") {
    const isAuth = verifyAdminAuth(request);
    return jsonResponse({
      authenticated: isAuth,
      portal: "/portal-secure-x98f2k3",
      timestamp: new Date().toISOString(),
    });
  }

  if (pathname === "/api/admin/logout" && method === "POST") {
    return jsonResponse(
      { success: true, message: "Logged out from administrator session." },
      200,
      {
        "Set-Cookie": `admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    );
  }

  if (pathname === "/api/admin/reset" && method === "POST") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }
    serverProducts = JSON.parse(JSON.stringify(baseProducts));
    serverCategories = JSON.parse(JSON.stringify(defaultCategories));
    serverOrders = [
      {
        id: "ORD-98421",
        customerName: "Aarav Mehta",
        contactNumber: "+91 98201 45872",
        items: [
          {
            id: "oversized-distressed-cross-hoodie",
            name: "Oversized Distressed Cross Heavyweight Hoodie",
            price: 3499,
            image: "/assets/male_hoodie_drop.jpg",
            size: "L",
            qty: 1,
          },
        ],
        totalAmount: 3499,
        createdAt: new Date().toISOString(),
        status: "Confirmed",
      },
    ];
    return jsonResponse({
      success: true,
      message: "Database successfully reset to initial default products, categories and sample orders.",
      productsCount: serverProducts.length,
      categoriesCount: serverCategories.length,
      ordersCount: serverOrders.length,
    });
  }

  // ----------------------------------------------------
  // CATEGORIES CRUD ENDPOINTS
  // ----------------------------------------------------
  if (pathname === "/api/categories" && method === "GET") {
    const list = serverCategories.map((cat) => {
      const productCount = serverProducts.filter((p) => {
        const pCat = (p.category || "").toLowerCase().trim();
        const cName = (cat.name || "").toLowerCase().trim();
        const cSlug = (cat.slug || "").toLowerCase().trim();
        return pCat === cName || pCat === cSlug;
      }).length;

      return {
        ...cat,
        productCount,
      };
    });

    return jsonResponse({
      categories: list,
      total: serverCategories.length,
      totalProducts: serverProducts.length,
    });
  }

  const categoryDetailMatch = pathname.match(/^\/api\/categories\/([^/]+)$/);

  // Single Category GET: /api/categories/:id
  if (categoryDetailMatch && method === "GET") {
    const id = decodeURIComponent(categoryDetailMatch[1]).toLowerCase();
    const found = serverCategories.find(
      (c) => c.id.toLowerCase() === id || c.slug.toLowerCase() === id || c.name.toLowerCase() === id,
    );
    if (!found) {
      return jsonResponse({ success: false, error: `Category with ID "${id}" not found.` }, 404);
    }
    const productCount = serverProducts.filter((p) => {
      const pCat = (p.category || "").toLowerCase().trim();
      return pCat === found.name.toLowerCase() || pCat === found.slug.toLowerCase();
    }).length;

    return jsonResponse({ success: true, category: { ...found, productCount } });
  }

  // Create Category POST: /api/categories
  if (pathname === "/api/categories" && method === "POST") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    try {
      const body = await parseJsonBody(request);
      if (!body.name || !body.name.trim()) {
        return jsonResponse(
          {
            success: false,
            error: "Category name is required.",
          },
          400,
        );
      }

      const rawSlug = (body.slug || body.name)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const id = body.id || rawSlug || `cat-${Date.now().toString(36)}`;

      const exists = serverCategories.some(
        (c) => c.id === id || c.name.toLowerCase() === body.name.trim().toLowerCase(),
      );
      if (exists) {
        return jsonResponse(
          {
            success: false,
            error: `Category "${body.name.trim()}" already exists.`,
          },
          400,
        );
      }

      const newCategory: Category = {
        id,
        name: body.name.trim(),
        slug: body.slug?.trim() || body.name.trim(),
        tag: body.tag?.trim() || "COLLECTION",
        subtitle: body.subtitle?.trim() || "",
        description: body.description?.trim() || "",
        image: body.image || "/assets/male_hoodie_drop.jpg",
        badge: body.badge?.trim() || "New Release",
        department: body.department || "unisex",
        displayOrder: body.displayOrder ?? serverCategories.length + 1,
        featured: body.featured ?? false,
      };

      serverCategories = [...serverCategories, newCategory];

      return jsonResponse(
        {
          success: true,
          message: `Category "${newCategory.name}" created successfully.`,
          category: newCategory,
        },
        201,
      );
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  // Update Category PUT/PATCH: /api/categories/:id
  if (categoryDetailMatch && (method === "PUT" || method === "PATCH")) {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    const id = decodeURIComponent(categoryDetailMatch[1]).toLowerCase();
    const index = serverCategories.findIndex(
      (c) => c.id.toLowerCase() === id || c.slug.toLowerCase() === id || c.name.toLowerCase() === id,
    );
    if (index === -1) {
      return jsonResponse({ success: false, error: `Category with ID "${id}" not found.` }, 404);
    }

    try {
      const updates = await parseJsonBody(request);
      const existing = serverCategories[index];
      const oldName = existing.name;

      const updated: Category = {
        ...existing,
        ...updates,
        id: existing.id,
      };

      serverCategories[index] = updated;

      // Update product category references if name was changed
      if (updates.name && updates.name !== oldName) {
        serverProducts = serverProducts.map((p) => {
          if (p.category === oldName) {
            return { ...p, category: updates.name };
          }
          return p;
        });
      }

      return jsonResponse({
        success: true,
        message: `Category "${existing.name}" updated successfully.`,
        category: updated,
      });
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  // Delete Category DELETE: /api/categories/:id
  if (categoryDetailMatch && method === "DELETE") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    const id = decodeURIComponent(categoryDetailMatch[1]).toLowerCase();
    const prevLength = serverCategories.length;
    serverCategories = serverCategories.filter(
      (c) => c.id.toLowerCase() !== id && c.slug.toLowerCase() !== id && c.name.toLowerCase() !== id,
    );

    if (serverCategories.length === prevLength) {
      return jsonResponse({ success: false, error: `Category with ID "${id}" not found.` }, 404);
    }

    return jsonResponse({
      success: true,
      message: `Category was deleted successfully.`,
      remainingCategoriesCount: serverCategories.length,
    });
  }

  if (pathname === "/api/products" && method === "GET") {
    const search = url.searchParams.get("search")?.toLowerCase();
    const category = url.searchParams.get("category");
    const department = url.searchParams.get("department")?.toLowerCase();
    const isNewParam = url.searchParams.get("isNew");

    let result = [...serverProducts];

    if (category && category !== "ALL" && category !== "All") {
      const catLower = category.toLowerCase().trim();
      if (catLower === "clothing" || catLower === "clothes") {
        result = result.filter((p) => !p.isBag && p.category !== "Accessories");
      } else if (catLower === "bags" || catLower === "bag") {
        result = result.filter((p) => p.isBag);
      } else if (
        catLower === "women exclusive" ||
        catLower === "womens exclusive" ||
        catLower === "female"
      ) {
        result = result.filter((p) => p.department === "female");
      } else if (
        catLower === "mens exclusive" ||
        catLower === "men exclusive" ||
        catLower === "male"
      ) {
        result = result.filter((p) => p.department === "male");
      } else {
        result = result.filter((p) => p.category.toLowerCase() === catLower);
      }
    }

    if (department) {
      result = result.filter((p) => p.department?.toLowerCase() === department);
    }

    if (isNewParam !== null) {
      const isNew = isNewParam === "true";
      result = result.filter((p) => p.isNew === isNew);
    }

    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          (p.sku && p.sku.toLowerCase().includes(search)),
      );
    }

    return jsonResponse({
      total: result.length,
      categoryFilter: category || "ALL",
      departmentFilter: department || "ALL",
      products: result,
    });
  }

  // Single Product GET: /api/products/:id
  const productDetailMatch = pathname.match(/^\/api\/products\/([^/]+)$/);
  if (productDetailMatch && method === "GET") {
    const id = productDetailMatch[1];
    const found = serverProducts.find((p) => p.id === id);
    if (!found) {
      return jsonResponse({ success: false, error: `Product with ID "${id}" not found.` }, 404);
    }
    return jsonResponse({ success: true, product: found });
  }

  // Create Product POST: /api/products
  if (pathname === "/api/products" && method === "POST") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    try {
      const body = await parseJsonBody(request);
      if (!body.name || !body.price || !body.category) {
        return jsonResponse(
          {
            success: false,
            error: "Missing required fields: 'name', 'price', and 'category' are required.",
          },
          400,
        );
      }

      const slug = body.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const id = body.id || `${slug}-${Date.now().toString(36)}`;

      const newProduct: Product = {
        id,
        name: body.name.trim(),
        price: Number(body.price),
        image: body.image || body.images?.[0] || "/assets/male_hoodie_drop.jpg",
        gallery:
          body.gallery && body.gallery.length > 0
            ? body.gallery
            : body.images && body.images.length > 0
            ? body.images
            : [body.image || "/assets/male_hoodie_drop.jpg"],
        category: body.category,
        department: body.department || "unisex",
        isBag:
          body.isBag ??
          (body.category === "Shoulder Bags" ||
            body.category === "Crossbody" ||
            body.category === "Totes & Backpacks" ||
            body.category === "Mini Bags"),
        isAccessory: body.isAccessory ?? body.category === "Accessories",
        isPhoneCase: body.isPhoneCase ?? false,
        isNew: body.isNew ?? true,
        sku: body.sku || `NV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        shortDescription: body.shortDescription || body.description?.slice(0, 120) || "",
        description: body.description || "Crafted with precision luxury streetwear materials.",
        sizes: body.sizes && body.sizes.length > 0 ? body.sizes : ["One Size"],
        soldOutSizes: body.soldOutSizes || [],
        colors: body.colors || [{ name: "Shadow Black", hex: "#09090b" }],
        details: body.details || [
          "Premium heavy craftsmanship",
          "Signature gothic hardware accent",
          "Custom Norva packaging included",
        ],
      };

      serverProducts = [newProduct, ...serverProducts];
      return jsonResponse(
        {
          success: true,
          message: `Product "${newProduct.name}" created successfully.`,
          product: newProduct,
        },
        201,
      );
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  // Update Product PUT/PATCH: /api/products/:id
  if (productDetailMatch && (method === "PUT" || method === "PATCH")) {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    const id = productDetailMatch[1];
    const index = serverProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return jsonResponse({ success: false, error: `Product with ID "${id}" not found.` }, 404);
    }

    try {
      const updates = await parseJsonBody(request);
      const existing = serverProducts[index];
      const updated: Product = {
        ...existing,
        ...updates,
        price: updates.price !== undefined ? Number(updates.price) : existing.price,
        gallery: updates.gallery || updates.images || existing.gallery,
        isCustomUpdated: true,
      };
      serverProducts[index] = updated;

      return jsonResponse({
        success: true,
        message: `Product "${id}" updated successfully.`,
        product: updated,
      });
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  // Delete Product DELETE: /api/products/:id
  if (productDetailMatch && method === "DELETE") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    const id = productDetailMatch[1];
    const prevLength = serverProducts.length;
    serverProducts = serverProducts.filter((p) => p.id !== id);

    if (serverProducts.length === prevLength) {
      return jsonResponse({ success: false, error: `Product with ID "${id}" not found.` }, 404);
    }

    return jsonResponse({
      success: true,
      message: `Product with ID "${id}" was deleted successfully.`,
      remainingProductsCount: serverProducts.length,
    });
  }

  // ----------------------------------------------------
  // ORDERS CRUD ENDPOINTS
  // ----------------------------------------------------
  if (pathname === "/api/orders" && method === "GET") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search")?.toLowerCase();

    let result = [...serverOrders];
    if (status && status !== "ALL") {
      result = result.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      result = result.filter(
        (o) =>
          o.customerName.toLowerCase().includes(search) ||
          o.contactNumber.includes(search) ||
          o.id.toLowerCase().includes(search) ||
          o.items.some((i) => i.name.toLowerCase().includes(search)),
      );
    }

    return jsonResponse({
      total: result.length,
      orders: result,
    });
  }

  // Single Order GET: /api/orders/:id
  const orderDetailMatch = pathname.match(/^\/api\/orders\/([^/]+)$/);
  if (orderDetailMatch && method === "GET") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }
    const id = orderDetailMatch[1];
    const found = serverOrders.find((o) => o.id === id);
    if (!found) {
      return jsonResponse({ success: false, error: `Order with ID "${id}" not found.` }, 404);
    }
    return jsonResponse({ success: true, order: found });
  }

  // ----------------------------------------------------
  // RAZORPAY PAYMENT GATEWAY & MAGIC CHECKOUT ENDPOINTS
  // ----------------------------------------------------
  if (pathname === "/api/razorpay/config" && method === "GET") {
    return jsonResponse({
      success: true,
      keyId: RAZORPAY_KEY_ID,
      merchantId: RAZORPAY_MERCHANT_ID,
      companyName: "NORVA",
      currency: "INR",
      status: "active",
      mode: RAZORPAY_KEY_ID.startsWith("rzp_live_") ? "live" : "test",
      magicCheckout: {
        enabled: true,
        oneClickCheckout: true,
        getPromotionsUrl: "/api/razorpay/magic/promotions",
        applyPromotionsUrl: "/api/razorpay/magic/apply-promotion",
        shippingInfoUrl: "/api/razorpay/magic/shipping",
      },
    });
  }

  // Magic Checkout: Public Unauthenticated Get Promotions endpoint for Razorpay Magic Modal
  if (pathname === "/api/razorpay/magic/promotions" && method === "GET") {
    return jsonResponse({
      success: true,
      promotions: [
        {
          code: "NORVA10",
          title: "10% OFF STOREWIDE",
          description: "Instant 10% discount on all luxury streetwear items.",
          type: "percentage",
          value: 10,
          min_order_amount: 0,
        },
        {
          code: "FIRST500",
          title: "FLAT ₹500 OFF",
          description: "Flat ₹500 instant discount on drops above ₹2,000.",
          type: "flat",
          value: 500,
          min_order_amount: 2000,
        },
        {
          code: "FREESHIP",
          title: "FREE EXPRESS SHIPPING",
          description: "Complimentary 48-hr Express Delivery across India.",
          type: "shipping",
          value: 0,
          min_order_amount: 0,
        },
      ],
    });
  }

  // Magic Checkout: Public Unauthenticated Apply Promotion endpoint for Razorpay Magic Modal
  if (pathname === "/api/razorpay/magic/apply-promotion" && method === "POST") {
    try {
      const body = await parseJsonBody(request);
      const code = (body.code || body.promo_code || "").trim().toUpperCase();
      const rawAmount = Number(body.amount) || Number(body.order_amount) || 0;
      // Handle paise if amount > 100000 or raw INR
      const orderAmount = rawAmount > 50000 ? Math.round(rawAmount / 100) : rawAmount;

      let discount = 0;
      let valid = false;
      let message = "";

      if (code === "NORVA10") {
        discount = Math.round(orderAmount * 0.1);
        valid = true;
        message = `Coupon NORVA10 applied! You saved ₹${discount}`;
      } else if (code === "FIRST500") {
        if (orderAmount >= 2000) {
          discount = 500;
          valid = true;
          message = "Coupon FIRST500 applied! Flat ₹500 saved.";
        } else {
          valid = false;
          message = "FIRST500 requires a minimum order value of ₹2,000.";
        }
      } else if (code === "FREESHIP") {
        discount = 0;
        valid = true;
        message = "FREESHIP applied! Express shipping is on us.";
      } else {
        valid = false;
        message = `Promo code "${code}" is invalid or expired.`;
      }

      const finalAmount = Math.max(0, orderAmount - discount);

      return jsonResponse({
        valid,
        status: valid ? "applied" : "invalid",
        code,
        discount_amount: discount,
        discount_in_paise: discount * 100,
        final_amount: finalAmount,
        final_amount_in_paise: finalAmount * 100,
        message,
      });
    } catch (err: any) {
      return jsonResponse({ valid: false, error: err.message }, 400);
    }
  }

  // Magic Checkout: Public Unauthenticated Shipping Info endpoint for Razorpay Magic Modal
  if (pathname === "/api/razorpay/magic/shipping" && (method === "POST" || method === "GET")) {
    return jsonResponse({
      success: true,
      shipping_methods: [
        {
          id: "norva-express-free",
          name: "Norva Express Air Delivery (2-3 Days)",
          description: "Insured express air freight with signature packaging",
          amount: 0,
          amount_in_paise: 0,
          default: true,
          estimated_days: "2-3 business days",
        },
        {
          id: "norva-priority-nextday",
          name: "VIP Next-Day Priority Dispatch",
          description: "Priority processing with 24-hr expedited dispatch",
          amount: 149,
          amount_in_paise: 14900,
          default: false,
          estimated_days: "1-2 business days",
        },
      ],
    });
  }

  if (pathname === "/api/razorpay/create-order" && method === "POST") {
    try {
      const body = await parseJsonBody(request);
      const amount = Number(body.amount) || 0;
      if (amount <= 0) {
        return jsonResponse({ success: false, error: "Invalid order amount." }, 400);
      }

      const receipt = body.receipt || `rcpt_${Date.now()}`;
      const amountInPaise = Math.round(amount * 100);

      const authHeader = `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")}`;
      const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt,
          notes: {
            merchant_id: RAZORPAY_MERCHANT_ID,
            customer_name: body.customerName || "Customer",
            contact_number: body.contactNumber || "",
          },
        }),
      });

      if (rzpResponse.ok) {
        const orderData = await rzpResponse.json();
        return jsonResponse({
          success: true,
          orderId: orderData.id,
          amount: orderData.amount,
          currency: orderData.currency,
          keyId: RAZORPAY_KEY_ID,
          merchantId: RAZORPAY_MERCHANT_ID,
        });
      } else {
        const errorData = await rzpResponse.json().catch(() => ({}));
        console.warn("Razorpay API create order warning:", errorData);
        return jsonResponse({
          success: false,
          fallback: true,
          keyId: RAZORPAY_KEY_ID,
          merchantId: RAZORPAY_MERCHANT_ID,
          error: errorData.error?.description || "Proceeding with standard client checkout.",
        });
      }
    } catch (err: any) {
      return jsonResponse({
        success: false,
        fallback: true,
        keyId: RAZORPAY_KEY_ID,
        merchantId: RAZORPAY_MERCHANT_ID,
        error: err.message,
      });
    }
  }

  if (pathname === "/api/razorpay/verify-payment" && method === "POST") {
    try {
      const body = await parseJsonBody(request);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderInput } = body;

      if (!razorpay_payment_id) {
        return jsonResponse({ success: false, error: "Missing razorpay_payment_id." }, 400);
      }

      let isValid = true;
      if (razorpay_order_id && razorpay_signature) {
        isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
      }

      if (!isValid) {
        return jsonResponse({ success: false, error: "Invalid payment signature." }, 400);
      }

      const totalAmount =
        orderInput?.totalAmount ??
        orderInput?.items?.reduce(
          (sum: number, item: any) => sum + (Number(item.price) || 0) * (Number(item.qty) || 1),
          0,
        ) ??
        0;

      const newOrder: CustomerOrder = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName: (orderInput?.customerName || "Customer").trim(),
        contactNumber: (orderInput?.contactNumber || "").trim(),
        customerEmail: (orderInput?.customerEmail || "").trim(),
        shippingAddress: (orderInput?.shippingAddress || "").trim(),
        items: orderInput?.items || [],
        totalAmount,
        createdAt: new Date().toISOString(),
        status: "Confirmed",
        paymentMethod: "Razorpay",
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        paymentStatus: "Paid",
      };

      serverOrders = [newOrder, ...serverOrders];

      return jsonResponse(
        {
          success: true,
          message: "Payment verified and order confirmed successfully.",
          order: newOrder,
        },
        201,
      );
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  // Place Order POST: /api/orders (Public storefront or Admin)
  if (pathname === "/api/orders" && method === "POST") {
    try {
      const body = await parseJsonBody(request);
      if (!body.customerName || !body.contactNumber || !Array.isArray(body.items) || body.items.length === 0) {
        return jsonResponse(
          {
            success: false,
            error: "Invalid order data. 'customerName', 'contactNumber', and 'items' array are required.",
          },
          400,
        );
      }

      const totalAmount =
        body.totalAmount ??
        body.items.reduce((sum: number, item: any) => sum + (Number(item.price) || 0) * (Number(item.qty) || 1), 0);

      const newOrder: CustomerOrder = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName: body.customerName.trim(),
        contactNumber: body.contactNumber.trim(),
        customerEmail: body.customerEmail?.trim(),
        shippingAddress: body.shippingAddress?.trim(),
        items: body.items,
        totalAmount,
        createdAt: new Date().toISOString(),
        status: "Confirmed",
        paymentMethod: body.paymentMethod || "Razorpay",
        paymentId: body.paymentId,
        razorpayOrderId: body.razorpayOrderId,
        paymentStatus: body.paymentStatus || (body.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid"),
      };

      serverOrders = [newOrder, ...serverOrders];
      return jsonResponse(
        {
          success: true,
          message: "Order placed successfully.",
          order: newOrder,
        },
        201,
      );
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  // Update Order Status PATCH/PUT: /api/orders/:id
  if (orderDetailMatch && (method === "PATCH" || method === "PUT")) {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    const id = orderDetailMatch[1];
    const index = serverOrders.findIndex((o) => o.id === id);
    if (index === -1) {
      return jsonResponse({ success: false, error: `Order with ID "${id}" not found.` }, 404);
    }

    try {
      const body = await parseJsonBody(request);
      const validStatuses = ["Confirmed", "Processing", "Dispatched", "Delivered"];
      if (body.status && !validStatuses.includes(body.status)) {
        return jsonResponse(
          {
            success: false,
            error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
          },
          400,
        );
      }

      const updated: CustomerOrder = {
        ...serverOrders[index],
        ...body,
      };
      serverOrders[index] = updated;

      return jsonResponse({
        success: true,
        message: `Order "${id}" updated successfully.`,
        order: updated,
      });
    } catch (err: any) {
      return jsonResponse({ success: false, error: err.message }, 400);
    }
  }

  // Delete Order DELETE: /api/orders/:id
  if (orderDetailMatch && method === "DELETE") {
    if (!verifyAdminAuth(request)) {
      return jsonResponse({ success: false, error: "Unauthorized. Admin credentials required." }, 401);
    }

    const id = orderDetailMatch[1];
    const prevLength = serverOrders.length;
    serverOrders = serverOrders.filter((o) => o.id !== id);

    if (serverOrders.length === prevLength) {
      return jsonResponse({ success: false, error: `Order with ID "${id}" not found.` }, 404);
    }

    return jsonResponse({
      success: true,
      message: `Order "${id}" deleted successfully.`,
      remainingOrdersCount: serverOrders.length,
    });
  }

  // Not an API route or unhandled API endpoint
  if (pathname.startsWith("/api/")) {
    return jsonResponse(
      {
        error: "Not Found",
        message: `API endpoint '${method} ${pathname}' does not exist.`,
      },
      404,
    );
  }

  return null;
}
