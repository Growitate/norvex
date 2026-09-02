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
  items: CustomerOrderItem[];
  totalAmount: number;
  createdAt: string;
  status: "Confirmed" | "Processing" | "Dispatched" | "Delivered";
}

const PRODUCTS_STORAGE_KEY = "norva_products_db_v2";
const ORDERS_STORAGE_KEY = "norva_orders_db_v1";
const DB_SYNC_EVENT = "norva_db_synced";

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

// Helper to get raw products
export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") {
    return baseProducts;
  }
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(baseProducts));
      return baseProducts;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p: Product) => {
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
    }
    return baseProducts;
  } catch (err) {
    console.error("Error reading stored products:", err);
    return baseProducts;
  }
}

// Helper to get stored orders
export function getStoredOrders(): CustomerOrder[] {
  if (typeof window === "undefined") {
    return initialOrders;
  }
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return initialOrders;
  } catch (err) {
    console.error("Error reading stored orders:", err);
    return initialOrders;
  }
}

// Emit event for state sync
function broadcastDbChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DB_SYNC_EVENT));
  }
}

// React Hook for dynamic products
export function useProducts(): Product[] {
  const [productList, setProductList] = useState<Product[]>(getStoredProducts);

  useEffect(() => {
    setProductList(getStoredProducts());

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
    name: newProductData.name,
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
        newProductData.category === "Mini Bags"),
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
  };

  const updated = [created, ...currentProducts];
  if (typeof window !== "undefined") {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    broadcastDbChange();
  }
  return created;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const currentProducts = getStoredProducts();
  const index = currentProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = currentProducts[index];
  const updated: Product = {
    ...existing,
    ...updates,
    price: updates.price !== undefined ? Number(updates.price) : existing.price,
    gallery: updates.gallery !== undefined ? updates.gallery : existing.gallery,
    isCustomUpdated: true,
  };

  currentProducts[index] = updated;
  if (typeof window !== "undefined") {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(currentProducts));
    broadcastDbChange();
  }
  return updated;
}

export function deleteProduct(id: string): boolean {
  const currentProducts = getStoredProducts();
  const filtered = currentProducts.filter((p) => p.id !== id);
  if (filtered.length === currentProducts.length) return false;

  if (typeof window !== "undefined") {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filtered));
    broadcastDbChange();
  }
  return true;
}

export function addCustomerOrder(orderInput: {
  customerName: string;
  contactNumber: string;
  items: CustomerOrderItem[];
  totalAmount: number;
}): CustomerOrder {
  const currentOrders = getStoredOrders();
  const newOrder: CustomerOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: orderInput.customerName.trim(),
    contactNumber: orderInput.contactNumber.trim(),
    items: orderInput.items,
    totalAmount: orderInput.totalAmount,
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  };

  const updated = [newOrder, ...currentOrders];
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    broadcastDbChange();
  }
  return newOrder;
}

export function resetDatabaseToDefaults(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    broadcastDbChange();
  }
}
