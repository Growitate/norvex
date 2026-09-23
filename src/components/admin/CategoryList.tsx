import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  FolderTree,
  ExternalLink,
  Sparkles,
  Package,
} from "lucide-react";
import { type Category, useCategories, deleteCategory, useProducts } from "@/lib/db";
import { CategoryFormDialog } from "./CategoryFormDialog";

export function CategoryList() {
  const categories = useCategories();
  const products = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Compute live product count for each category
  const getProductCountForCategory = (cat: Category) => {
    return products.filter((p) => {
      const pCat = (p.category || "").toLowerCase().trim();
      const cName = (cat.name || "").toLowerCase().trim();
      const cSlug = (cat.slug || "").toLowerCase().trim();

      if (cName === "clothing" || cSlug === "clothing") {
        return !p.isBag && p.category !== "Accessories";
      }
      if (cName === "accessories" || cSlug === "accessories") {
        return p.category === "Accessories";
      }
      if (cName.includes("women") || cSlug.includes("women")) {
        return p.department === "female";
      }
      if (cName.includes("mens") || cSlug.includes("mens") || cName.includes("men")) {
        return p.department === "male";
      }
      if (cName.includes("bag") || cSlug.includes("bag")) {
        return p.isBag;
      }

      return pCat === cName || pCat === cSlug;
    }).length;
  };

  const filteredCategories = categories.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.tag && c.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment =
      selectedDepartment === "ALL" || (c.department && c.department === selectedDepartment);

    return matchesQuery && matchesDepartment;
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = (category: Category) => {
    const count = getProductCountForCategory(category);
    const confirmMessage =
      count > 0
        ? `Category "${category.name}" has ${count} assigned product(s). Are you sure you want to delete this category?`
        : `Are you sure you want to delete category "${category.name}"?`;

    if (window.confirm(confirmMessage)) {
      deleteCategory(category.id);
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
            placeholder="Search categories by name, tag, or slug..."
            className="w-full bg-zinc-900 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:border-white focus:outline-none transition-colors"
          />
        </div>

        {/* Department Filter & Add Button */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-white uppercase"
          >
            <option value="ALL">All Departments</option>
            <option value="unisex">Unisex</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-white text-black hover:bg-zinc-200 font-display text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Category List Table & Cards */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-zinc-400" />
            <h2 className="font-display text-sm uppercase tracking-widest text-white font-bold">
              Storefront Categories ({filteredCategories.length} categories)
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase text-zinc-500">
            Real-time catalog & nav synced
          </span>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-mono text-xs">
            No categories found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/40 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Tag & Subtitle</th>
                  <th className="py-3 px-4">Department / Badge</th>
                  <th className="py-3 px-4">Catalog Count</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-xs font-sans">
                {filteredCategories.map((cat) => {
                  const productCount = getProductCountForCategory(cat);
                  return (
                    <tr key={cat.id} className="hover:bg-zinc-900/40 transition-colors group">
                      {/* Thumbnail & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden relative">
                            {cat.image ? (
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                <Package className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs sm:max-w-sm">
                            <p className="font-medium text-white truncate font-display text-xs uppercase tracking-wide">
                              {cat.name}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono truncate mt-0.5">
                              Slug: <span className="text-zinc-400">{cat.slug}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Tag & Subtitle */}
                      <td className="py-3 px-4">
                        <div className="max-w-xs space-y-0.5">
                          {cat.tag && (
                            <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                              {cat.tag}
                            </span>
                          )}
                          <p className="text-[11px] text-zinc-400 truncate">
                            {cat.subtitle || cat.description || "—"}
                          </p>
                        </div>
                      </td>

                      {/* Department & Badge */}
                      <td className="py-3 px-4 font-mono text-zinc-400 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] uppercase text-zinc-300">
                            {cat.department || "unisex"}
                          </span>
                          {cat.badge && (
                            <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-[10px] text-white">
                              {cat.badge}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Product Count */}
                      <td className="py-3 px-4 font-mono">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-xs text-white">
                          <Package className="w-3 h-3 text-zinc-400" />
                          <span>{productCount} items</span>
                        </span>
                      </td>

                      {/* Featured Indicator */}
                      <td className="py-3 px-4 font-mono">
                        {cat.featured ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-[10px] uppercase">
                            <Sparkles className="w-3 h-3" />
                            <span>Home Featured</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-zinc-600 uppercase">Standard</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/shop?category=${encodeURIComponent(cat.slug || cat.name)}`}
                            target="_blank"
                            rel="noreferrer"
                            title="View in Storefront"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleOpenEdit(cat)}
                            title="Edit Category"
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(cat)}
                            title="Delete Category"
                            className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/60 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Category Create/Edit Modal Dialog */}
      <CategoryFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categoryToEdit={editingCategory}
        onSaved={() => {
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
