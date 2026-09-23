import { useState } from "react";
import {
  LogOut,
  ExternalLink,
  Package,
  ShoppingBag,
  ShieldCheck,
  FolderTree,
  RefreshCw,
} from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import { ProductList } from "./ProductList";
import { CategoryList } from "./CategoryList";
import { OrdersList } from "./OrdersList";
import { useProducts, useCategories, useOrders, resetDatabaseToDefaults } from "@/lib/db";

export function AdminPanel() {
  const { logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "orders">("products");
  const products = useProducts();
  const categories = useCategories();
  const orders = useOrders();

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Reset database to default initial products, categories and sample orders? Any custom edits will be reverted.",
      )
    ) {
      resetDatabaseToDefaults();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand / Logo */}
            <div className="flex items-center gap-3">
              <span className="font-display tracking-widest text-lg font-bold uppercase text-white">
                NORVA
              </span>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-zinc-800 bg-zinc-900 text-zinc-300">
                  SECURE VAULT
                </span>
                <span className="text-[9px] font-mono text-zinc-500">/portal-secure-x98f2k3</span>
              </div>
            </div>

            {/* Top Right Utilities */}
            <div className="flex items-center gap-3">
              <a
                href="/shop"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono uppercase transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Storefront</span>
              </a>

              <button
                onClick={handleResetDefaults}
                title="Reset to Initial Data"
                className="p-1.5 text-zinc-500 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-700 bg-zinc-950 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-950/60 hover:bg-red-900/80 border border-red-800/80 text-red-300 hover:text-white text-xs font-mono uppercase transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar: 3 Clean Tabs */}
          <div className="flex border-t border-zinc-900 gap-6 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-3 text-xs font-display uppercase tracking-widest font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === "products"
                  ? "border-white text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Product Management</span>
              <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 text-zinc-400">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`py-3 text-xs font-display uppercase tracking-widest font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === "categories"
                  ? "border-white text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Category Management</span>
              <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 text-zinc-400">
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`py-3 text-xs font-display uppercase tracking-widest font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer shrink-0 ${
                activeTab === "orders"
                  ? "border-white text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Customer Orders</span>
              <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 bg-zinc-900 border border-zinc-800 text-zinc-400">
                {orders.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "products" && <ProductList />}
        {activeTab === "categories" && <CategoryList />}
        {activeTab === "orders" && <OrdersList />}
      </main>
    </div>
  );
}
