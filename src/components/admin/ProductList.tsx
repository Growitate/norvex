import { useState } from "react";
import { Plus, Edit3, Trash2, Search, Layers } from "lucide-react";
import { type Product } from "@/lib/products";
import { useProducts, deleteProduct } from "@/lib/db";
import { ProductFormDialog } from "./ProductFormDialog";

export function ProductList() {
  const products = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = ["ALL", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the product database?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Action & Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800 p-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog by name, category, or SKU..."
            className="w-full bg-zinc-900 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:border-white focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filters & Add Button */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 font-display text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Catalog Table / Grid */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            <h2 className="font-display text-sm uppercase tracking-widest text-white font-bold">
              Product Catalog ({filteredProducts.length} items)
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase text-zinc-500">
            Real-time storefront synced
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            No products found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/40 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Sizes</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-xs font-sans">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-900/40 transition-colors group">
                    {/* Item Thumbnail & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-sm">
                          <p className="font-medium text-white truncate font-mono text-xs">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-mono truncate mt-0.5">
                            SKU: {product.sku || product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 font-mono text-zinc-400">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] uppercase">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono text-white font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>

                    {/* Sizes */}
                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                      {product.sizes && product.sizes.length > 0
                        ? product.sizes.slice(0, 3).join(", ") +
                          (product.sizes.length > 3 ? ` +${product.sizes.length - 3}` : "")
                        : "One Size"}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Product Pricing & Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 bg-zinc-900 hover:bg-red-950 border border-zinc-800 hover:border-red-800 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog for Add / Edit */}
      <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        productToEdit={editingProduct}
        onSaved={() => {
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
