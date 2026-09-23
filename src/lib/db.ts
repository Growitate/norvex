import { useState, useEffect } from "react";
import { products as baseProducts, type Product, type ProductColor } from "./products";

export interface CustomerOrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  contactNumber: string;
  customerEmail?: string;
  shippingAddress?: string;
  items: CustomerOrderItem[];
  totalAmount: number;
  createdAt: string;
  status: "Confirmed" | "Processing" | "Dispatched" | "Delivered";
  paymentMethod?: "Razorpay" | "Cash on Delivery" | "UPI/Card";
  paymentId?: string;
  razorpayOrderId?: string;
  paymentStatus?: "Paid" | "Pending" | "Failed";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tag?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badge?: string;
  department?: "unisex" | "female" | "male" | "all";
  displayOrder?: number;
  featured?: boolean;
}

export const defaultCategories: Category[] = [
  {
    id: "clothing",
    name: "Clothing",
    slug: "Clothing",
    tag: "STREETWEAR & APPAREL",
    subtitle: "500 GSM French Terry Hoodies, Tees & Cargos",
    description: "Handcrafted 500 GSM heavyweight streetwear, boxy oversized silhouettes, and tactical cargo essentials.",
    image: "/assets/male_hoodie_drop.jpg",
    badge: "Featured Drops",
    department: "unisex",
    displayOrder: 1,
    featured: true,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "Accessories",
    tag: "HARDWARE & EXTRAS",
    subtitle: "Gothic Phone Cases, Chains & Caps",
    description: "Gothic phone cases, custom cast silver chain hardware, snapbacks, and aesthetic styling extras.",
    image: "/assets/case_gothic_claw.jpg",
    badge: "New Release",
    department: "unisex",
    displayOrder: 2,
    featured: true,
  },
  {
    id: "women-exclusive",
    name: "Women exclusive",
    slug: "Women exclusive",
    tag: "WOMEN'S EDIT",
    subtitle: "Y2K Chrome Baby Tees, Pleated Skirts & Hoodies",
    description: "Y2K cyber aesthetic cropped baby tees, gothic pleated buckle skirts, and custom relaxed hoodies.",
    image: "/assets/female_top_drop.jpg",
    badge: "Trending Now",
    department: "female",
    displayOrder: 3,
    featured: true,
  },
  {
    id: "mens-exclusive",
    name: "Mens exclusive",
    slug: "Mens exclusive",
    tag: "MEN'S STREETWEAR",
    subtitle: "Boxy Graphic Tees, Tactical Cargos & Zip Hoodies",
    description: "Heavyweight boxy cut graphic t-shirts, tactical cargo pants with metal D-rings, and distressed zip-up hoodies.",
    image: "/assets/male_hoodie_drop.jpg",
    badge: "Heavyweight",
    department: "male",
    displayOrder: 4,
    featured: true,
  },
  {
    id: "shoulder-bags",
    name: "Shoulder Bags",
    slug: "Shoulder Bags",
    tag: "LEATHER & CHAINS",
    subtitle: "Sensual O-Ring Hardware Slouch Shoulder Bags",
    description: "Sensual hardware accents, slouch vegan leather profiles, and heavy metal chain straps.",
    image: "/assets/bag_shoulder_chain_1786114752412.png",
    badge: "Bestseller",
    department: "female",
    displayOrder: 5,
    featured: false,
  },
  {
    id: "crossbody",
    name: "Crossbody",
    slug: "Crossbody",
    tag: "EVERYDAY UTILITY",
    subtitle: "Crossbody Patent & Gothic Silver Bags",
    description: "Sleek compact crossbody bags with quick-access zip compartments and gothic metallic accents.",
    image: "/assets/bag_crossbody_patent_1786114770311.png",
    badge: "Popular",
    department: "unisex",
    displayOrder: 6,
    featured: false,
  },
  {
    id: "totes-backpacks",
    name: "Totes & Backpacks",
    slug: "Totes & Backpacks",
    tag: "OVERSIZED UTILITY",
    subtitle: "Tactical Harness Totes & Heavyweight Backpacks",
    description: "Tactical harness totes and daily utility carryalls built for everyday carry and statement styling.",
    image: "/assets/bag_harness_tote_1786114785960.png",
    badge: "Drop 1",
    department: "unisex",
    displayOrder: 7,
    featured: false,
  },
  {
    id: "mini-bags",
    name: "Mini Bags",
    slug: "Mini Bags",
    tag: "COMPACT STATEMENT",
    subtitle: "Mini Satchels & Micro Accents",
    description: "Compact micro bags and satchels designed as iconic statement centerpieces.",
    image: "/assets/bag_mini_satchel_1786114801666.png",
    badge: "Limited",
    department: "female",
    displayOrder: 8,
    featured: false,
  },
];

const PRODUCTS_STORAGE_KEY = "norva_products_db_v2";
const CATEGORIES_STORAGE_KEY = "norva_categories_db_v2";
const ORDERS_STORAGE_KEY = "norva_orders_db_v1";
const DB_SYNC_EVENT = "norva_db_synced";
const ADMIN_TOKEN = "norva_token_vault_session_2026";

// Initial seed orders
const initialOrders: CustomerOrder[] = [
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

// Server-side lookup hooks for SSR
let serverProductsLookup: (() => Product[]) | null = null;
export function setServerProductsLookup(fn: () => Product[]) {
  serverProductsLookup = fn;
}

let serverOrdersLookup: (() => CustomerOrder[]) | null = null;
export function setServerOrdersLookup(fn: () => CustomerOrder[]) {
  serverOrdersLookup = fn;
}

let serverCategoriesLookup: (() => Category[]) | null = null;
export function setServerCategoriesLookup(fn: () => Category[]) {
  serverCategoriesLookup = fn;
}

// In-memory runtime fallbacks in case localStorage is unavailable or exhausted
let memoryProducts: Product[] | null = null;
let memoryCategories: Category[] | null = null;
let memoryOrders: CustomerOrder[] | null = null;

/**
 * Safe LocalStorage setter with QuotaExceededError protection and fallback pruning
 */
function safeSetStorage(key: string, data: any): boolean {
  if (typeof window === "undefined") return true;
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (err: any) {
    console.warn(`[Norva Storage] Quota exceeded or storage error on key "${key}". Attempting pruning...`, err);
    try {
      // If setting products failed, prune large base64 strings or excess gallery angles
      if (key === PRODUCTS_STORAGE_KEY && Array.isArray(data)) {
        const pruned = data.map((item: any) => {
          if (!item) return item;
          const clean = { ...item };
          if (Array.isArray(clean.gallery) && clean.gallery.length > 2) {
            clean.gallery = clean.gallery.slice(0, 2);
          }
          return clean;
        });
        localStorage.setItem(key, JSON.stringify(pruned));
        return true;
      }
    } catch (retryErr) {
      console.error(`[Norva Storage] Fallback storage failed for "${key}". Keeping in memory state.`, retryErr);
    }
    return false;
  }
}

// Emit event for state sync
function broadcastDbChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DB_SYNC_EVENT));
  }
}

// Helper to get raw products
export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") {
    if (serverProductsLookup) {
      return serverProductsLookup();
    }
    return baseProducts;
  }
  if (memoryProducts) {
    return memoryProducts;
  }
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      safeSetStorage(PRODUCTS_STORAGE_KEY, baseProducts);
      memoryProducts = baseProducts;
      return baseProducts;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const merged = parsed.map((p: Product) => {
        const base = baseProducts.find((bp) => bp.id === p.id);
        if (base && !p.isCustomUpdated) {
          return {
            ...p,
            image: base.image,
            gallery: base.gallery ? base.gallery : p.gallery,
          };
        }
        return p;
      });
      memoryProducts = merged;
      return merged;
    }
    memoryProducts = baseProducts;
    return baseProducts;
  } catch (err) {
    console.error("Error reading stored products:", err);
    memoryProducts = baseProducts;
    return baseProducts;
  }
}

// Helper to get stored orders
export function getStoredOrders(): CustomerOrder[] {
  if (typeof window === "undefined") {
    if (serverOrdersLookup) {
      return serverOrdersLookup();
    }
    return initialOrders;
  }
  if (memoryOrders) {
    return memoryOrders;
  }
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      safeSetStorage(ORDERS_STORAGE_KEY, initialOrders);
      memoryOrders = initialOrders;
      return initialOrders;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryOrders = parsed;
      return parsed;
    }
    memoryOrders = initialOrders;
    return initialOrders;
  } catch (err) {
    console.error("Error reading stored orders:", err);
    memoryOrders = initialOrders;
    return initialOrders;
  }
}

// Helper to get stored categories
export function getStoredCategories(): Category[] {
  if (typeof window === "undefined") {
    if (serverCategoriesLookup) {
      return serverCategoriesLookup();
    }
    return defaultCategories;
  }
  if (memoryCategories) {
    return memoryCategories;
  }
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!raw) {
      safeSetStorage(CATEGORIES_STORAGE_KEY, defaultCategories);
      memoryCategories = defaultCategories;
      return defaultCategories;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryCategories = parsed;
      return parsed;
    }
    memoryCategories = defaultCategories;
    return defaultCategories;
  } catch (err) {
    console.error("Error reading stored categories:", err);
    memoryCategories = defaultCategories;
    return defaultCategories;
  }
}

// React Hook for dynamic products
export function useProducts(): Product[] {
  const [productList, setProductList] = useState<Product[]>(getStoredProducts);

  useEffect(() => {
    setProductList(getStoredProducts());

    // Background sync with server API if in browser
    if (typeof window !== "undefined") {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.products) && data.products.length > 0) {
            const current = getStoredProducts();
            // Merge any server products that might not be in client storage yet
            const currentIds = new Set(current.map((p) => p.id));
            const newFromServer = data.products.filter((p: Product) => !currentIds.has(p.id));
            if (newFromServer.length > 0) {
              const merged = [...newFromServer, ...current];
              memoryProducts = merged;
              safeSetStorage(PRODUCTS_STORAGE_KEY, merged);
              setProductList(merged);
            }
          }
        })
        .catch(() => {});
    }

    const handleSync = () => {
      setProductList(getStoredProducts());
    };

    window.addEventListener(DB_SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(DB_SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  return productList;
}

// React Hook for single product lookup
export function useProduct(id: string): Product | undefined {
  const products = useProducts();
  return products.find((p) => p.id === id);
}

// React Hook for dynamic customer orders
export function useOrders(): CustomerOrder[] {
  const [orderList, setOrderList] = useState<CustomerOrder[]>(getStoredOrders);

  useEffect(() => {
    setOrderList(getStoredOrders());

    const handleSync = () => {
      setOrderList(getStoredOrders());
    };

    window.addEventListener(DB_SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(DB_SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  return orderList;
}

// React Hook for dynamic categories
export function useCategories(): Category[] {
  const [categoryList, setCategoryList] = useState<Category[]>(getStoredCategories);

  useEffect(() => {
    setCategoryList(getStoredCategories());

    // Background sync with server API
    if (typeof window !== "undefined") {
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.categories) && data.categories.length > 0) {
            const current = getStoredCategories();
            const currentIds = new Set(current.map((c) => c.id));
            const newCats = data.categories.filter((c: Category) => !currentIds.has(c.id));
            if (newCats.length > 0) {
              const merged = [...current, ...newCats];
              memoryCategories = merged;
              safeSetStorage(CATEGORIES_STORAGE_KEY, merged);
              setCategoryList(merged);
            }
          }
        })
        .catch(() => {});
    }

    const handleSync = () => {
      setCategoryList(getStoredCategories());
    };

    window.addEventListener(DB_SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(DB_SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  return categoryList;
}

// React Hook for single category lookup
export function useCategory(idOrSlug: string): Category | undefined {
  const categories = useCategories();
  const lower = idOrSlug.toLowerCase();
  return categories.find(
    (c) => c.id.toLowerCase() === lower || c.slug.toLowerCase() === lower || c.name.toLowerCase() === lower,
  );
}

// Database Mutations

export function addProduct(
  newProductData: Partial<Product> & {
    name: string;
    price: number;
    category: Product["category"];
  },
): Product {
  const currentProducts = getStoredProducts();
  const slug = newProductData.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const id = newProductData.id || `${slug}-${Date.now().toString(36)}`;

  const created: Product = {
    id,
    name: newProductData.name.trim(),
    price: Number(newProductData.price),
    image: newProductData.image || "/assets/male_hoodie_drop.jpg",
    gallery:
      newProductData.gallery && newProductData.gallery.length > 0
        ? newProductData.gallery
        : [newProductData.image || "/assets/male_hoodie_drop.jpg"],
    category: newProductData.category,
    department: newProductData.department || "unisex",
    isBag:
      newProductData.isBag ??
      (newProductData.category === "Shoulder Bags" ||
        newProductData.category === "Crossbody" ||
        newProductData.category === "Totes & Backpacks" ||
        newProductData.category === "Mini Bags" ||
        newProductData.category.toLowerCase().includes("bag")),
    isAccessory: newProductData.isAccessory ?? newProductData.category === "Accessories",
    isPhoneCase: newProductData.isPhoneCase ?? false,
    isNew: newProductData.isNew ?? true,
    sku:
      newProductData.sku ||
      `NV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    shortDescription:
      newProductData.shortDescription || newProductData.description?.slice(0, 120) || "",
    description:
      newProductData.description || "Crafted with precision luxury streetwear materials.",
    sizes:
      newProductData.sizes && newProductData.sizes.length > 0 ? newProductData.sizes : ["One Size"],
    soldOutSizes: newProductData.soldOutSizes || [],
    colors:
      newProductData.colors && newProductData.colors.length > 0
        ? newProductData.colors
        : [{ name: "Shadow Black", hex: "#09090b" }],
    details: newProductData.details || [
      "Premium heavy craftsmanship",
      "Signature gothic hardware accent",
      "Custom Norva packaging included",
    ],
    isCustomUpdated: true,
  };

  const updated = [created, ...currentProducts.filter((p) => p.id !== created.id)];
  memoryProducts = updated;

  safeSetStorage(PRODUCTS_STORAGE_KEY, updated);
  broadcastDbChange();

  // Async server sync
  if (typeof window !== "undefined") {
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify(created),
    }).catch((err) => {
      console.warn("Async product server sync notice:", err);
    });
  }

  return created;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const currentProducts = getStoredProducts();
  const index = currentProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = currentProducts[index];
  const isBag =
    updates.category !== undefined
      ? updates.category === "Shoulder Bags" ||
        updates.category === "Crossbody" ||
        updates.category === "Totes & Backpacks" ||
        updates.category === "Mini Bags" ||
        updates.category.toLowerCase().includes("bag")
      : existing.isBag;

  const isAccessory =
    updates.category !== undefined
      ? updates.category === "Accessories"
      : existing.isAccessory;

  const updated: Product = {
    ...existing,
    ...updates,
    isBag,
    isAccessory,
    price: updates.price !== undefined ? Number(updates.price) : existing.price,
    gallery: updates.gallery !== undefined ? updates.gallery : existing.gallery,
    isCustomUpdated: true,
  };

  currentProducts[index] = updated;
  memoryProducts = [...currentProducts];

  safeSetStorage(PRODUCTS_STORAGE_KEY, currentProducts);
  broadcastDbChange();

  // Async server sync
  if (typeof window !== "undefined") {
    fetch(`/api/products/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify(updates),
    }).catch((err) => {
      console.warn("Async product update server sync notice:", err);
    });
  }

  return updated;
}

export function deleteProduct(id: string): boolean {
  const currentProducts = getStoredProducts();
  const filtered = currentProducts.filter((p) => p.id !== id);
  if (filtered.length === currentProducts.length) return false;

  memoryProducts = filtered;
  safeSetStorage(PRODUCTS_STORAGE_KEY, filtered);
  broadcastDbChange();

  // Async server sync
  if (typeof window !== "undefined") {
    fetch(`/api/products/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
    }).catch((err) => {
      console.warn("Async product delete server sync notice:", err);
    });
  }

  return true;
}

export function addCustomerOrder(orderInput: {
  customerName: string;
  contactNumber: string;
  customerEmail?: string;
  shippingAddress?: string;
  items: CustomerOrderItem[];
  totalAmount: number;
  paymentMethod?: "Razorpay" | "Cash on Delivery" | "UPI/Card";
  paymentId?: string;
  razorpayOrderId?: string;
  paymentStatus?: "Paid" | "Pending" | "Failed";
}): CustomerOrder {
  const currentOrders = getStoredOrders();
  const newOrder: CustomerOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: orderInput.customerName.trim(),
    contactNumber: orderInput.contactNumber.trim(),
    customerEmail: orderInput.customerEmail?.trim(),
    shippingAddress: orderInput.shippingAddress?.trim(),
    items: orderInput.items,
    totalAmount: orderInput.totalAmount,
    createdAt: new Date().toISOString(),
    status: "Confirmed",
    paymentMethod: orderInput.paymentMethod || "Razorpay",
    paymentId: orderInput.paymentId,
    razorpayOrderId: orderInput.razorpayOrderId,
    paymentStatus: orderInput.paymentStatus || (orderInput.paymentMethod === "Razorpay" ? "Paid" : "Pending"),
  };

  const updated = [newOrder, ...currentOrders];
  memoryOrders = updated;

  safeSetStorage(ORDERS_STORAGE_KEY, updated);
  broadcastDbChange();
  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: CustomerOrder["status"],
): CustomerOrder | null {
  const currentOrders = getStoredOrders();
  const index = currentOrders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const updated: CustomerOrder = {
    ...currentOrders[index],
    status: newStatus,
  };
  currentOrders[index] = updated;
  memoryOrders = [...currentOrders];

  safeSetStorage(ORDERS_STORAGE_KEY, currentOrders);
  broadcastDbChange();
  return updated;
}

export function deleteOrder(orderId: string): boolean {
  const currentOrders = getStoredOrders();
  const filtered = currentOrders.filter((o) => o.id !== orderId);
  if (filtered.length === currentOrders.length) return false;

  memoryOrders = filtered;
  safeSetStorage(ORDERS_STORAGE_KEY, filtered);
  broadcastDbChange();
  return true;
}

export function addCategory(
  categoryInput: Partial<Category> & {
    name: string;
  },
): Category {
  const currentCategories = getStoredCategories();
  const rawId = categoryInput.id || categoryInput.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  // Check if id already exists, append timestamp if so
  const idExists = currentCategories.some((c) => c.id === rawId);
  const id = idExists ? `${rawId}-${Date.now().toString(36)}` : rawId;

  const newCategory: Category = {
    id,
    name: categoryInput.name.trim(),
    slug: categoryInput.slug?.trim() || categoryInput.name.trim(),
    tag: categoryInput.tag?.trim() || "COLLECTION",
    subtitle: categoryInput.subtitle?.trim() || "",
    description: categoryInput.description?.trim() || "",
    image: categoryInput.image || "/assets/male_hoodie_drop.jpg",
    badge: categoryInput.badge?.trim() || "New Release",
    department: categoryInput.department || "unisex",
    displayOrder: categoryInput.displayOrder ?? currentCategories.length + 1,
    featured: categoryInput.featured ?? false,
  };

  const updated = [...currentCategories, newCategory];
  memoryCategories = updated;

  safeSetStorage(CATEGORIES_STORAGE_KEY, updated);
  broadcastDbChange();

  // Async server sync
  if (typeof window !== "undefined") {
    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify(newCategory),
    }).catch((err) => {
      console.warn("Async category server sync notice:", err);
    });
  }

  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const currentCategories = getStoredCategories();
  const index = currentCategories.findIndex(
    (c) => c.id === id || c.slug.toLowerCase() === id.toLowerCase(),
  );
  if (index === -1) return null;

  const existing = currentCategories[index];
  const oldName = existing.name;
  const updated: Category = {
    ...existing,
    ...updates,
    id: existing.id,
  };

  currentCategories[index] = updated;
  memoryCategories = [...currentCategories];

  safeSetStorage(CATEGORIES_STORAGE_KEY, currentCategories);

  if (updates.name && updates.name !== oldName) {
    const currentProducts = getStoredProducts();
    let productChanged = false;
    const updatedProducts = currentProducts.map((p) => {
      if (p.category === oldName) {
        productChanged = true;
        return { ...p, category: updates.name! };
      }
      return p;
    });
    if (productChanged) {
      memoryProducts = updatedProducts;
      safeSetStorage(PRODUCTS_STORAGE_KEY, updatedProducts);
    }
  }

  broadcastDbChange();

  // Async server sync
  if (typeof window !== "undefined") {
    fetch(`/api/categories/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify(updates),
    }).catch((err) => {
      console.warn("Async category update server sync notice:", err);
    });
  }

  return updated;
}

export function deleteCategory(id: string): boolean {
  const currentCategories = getStoredCategories();
  const filtered = currentCategories.filter(
    (c) => c.id !== id && c.slug.toLowerCase() !== id.toLowerCase(),
  );
  if (filtered.length === currentCategories.length) return false;

  memoryCategories = filtered;
  safeSetStorage(CATEGORIES_STORAGE_KEY, filtered);
  broadcastDbChange();

  // Async server sync
  if (typeof window !== "undefined") {
    fetch(`/api/categories/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
    }).catch((err) => {
      console.warn("Async category delete server sync notice:", err);
    });
  }

  return true;
}

export function resetDatabaseToDefaults(): void {
  memoryProducts = null;
  memoryCategories = null;
  memoryOrders = null;
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(PRODUCTS_STORAGE_KEY);
      localStorage.removeItem(CATEGORIES_STORAGE_KEY);
      localStorage.removeItem(ORDERS_STORAGE_KEY);
    } catch {}
    broadcastDbChange();

    fetch("/api/admin/reset", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
    }).catch(() => {});
  }
}
