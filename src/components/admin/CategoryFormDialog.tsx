import { useState, useEffect, useRef } from "react";
import { X, Upload, Check, Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
import { type Category, addCategory, updateCategory } from "@/lib/db";
import { compressImage } from "@/lib/imageUtils";

interface CategoryFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | null;
  onSaved: (category: Category) => void;
}

const PRESET_IMAGES = [
  { name: "Male Streetwear Hoodie", url: "/assets/male_hoodie_drop.jpg" },
  { name: "Female Y2K Crop Top", url: "/assets/female_top_drop.jpg" },
  { name: "Female Gothic Hoodie", url: "/assets/female_hoodie_drop.jpg" },
  { name: "Female Buckle Skirt", url: "/assets/female_skirt_drop.jpg" },
  { name: "Gothic Claw Phone Case", url: "/assets/case_gothic_claw.png" },
  { name: "O-Ring Chain Shoulder Bag", url: "/assets/bag_shoulder_chain_1786114752412.png" },
  { name: "Patent Crossbody Bag", url: "/assets/bag_crossbody_patent_1786114770311.png" },
  { name: "Tactical Harness Tote", url: "/assets/bag_harness_tote_1786114785960.png" },
  { name: "Cyber Statement Banner", url: "/assets/cyber_streetwear_banner.jpg" },
];

const PRESET_BADGES = [
  "Featured Drops",
  "Trending Now",
  "New Release",
  "Heavyweight",
  "Bestseller",
  "Limited Edition",
  "Exclusive Edit",
  "Hardware",
];

const DEPARTMENTS: ("unisex" | "female" | "male" | "all")[] = ["unisex", "female", "male", "all"];

export function CategoryFormDialog({
  isOpen,
  onClose,
  categoryToEdit,
  onSaved,
}: CategoryFormDialogProps) {
  const isEditing = Boolean(categoryToEdit);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tag, setTag] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState<"unisex" | "female" | "male" | "all">("unisex");
  const [badge, setBadge] = useState("New Release");
  const [customBadge, setCustomBadge] = useState("");
  const [image, setImage] = useState("/assets/male_hoodie_drop.jpg");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [featured, setFeatured] = useState<boolean>(true);

  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name || "");
      setSlug(categoryToEdit.slug || "");
      setTag(categoryToEdit.tag || "");
      setSubtitle(categoryToEdit.subtitle || "");
      setDescription(categoryToEdit.description || "");
      setDepartment(categoryToEdit.department || "unisex");
      setBadge(categoryToEdit.badge || "New Release");
      setImage(categoryToEdit.image || "/assets/male_hoodie_drop.jpg");
      setDisplayOrder(categoryToEdit.displayOrder ?? 1);
      setFeatured(categoryToEdit.featured ?? false);
    } else {
      setName("");
      setSlug("");
      setTag("");
      setSubtitle("");
      setDescription("");
      setDepartment("unisex");
      setBadge("New Release");
      setImage("/assets/male_hoodie_drop.jpg");
      setDisplayOrder(1);
      setFeatured(true);
    }
    setImageUrlInput("");
    setCustomBadge("");
    setErrorMsg("");
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  // Auto-generate slug when name changes (only in create mode if user hasn't edited slug)
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      );
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const compressed = await compressImage(file, 1200, 1200, 0.82);
      if (compressed) {
        setImage(compressed);
      }
    } catch (err) {
      console.error("Image compression error:", err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleApplyCustomImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImage(imageUrlInput.trim());
    setImageUrlInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Category name is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const effectiveBadge = customBadge.trim() ? customBadge.trim() : badge;
      const effectiveSlug = slug.trim() || name.trim();

      const categoryData = {
        name: name.trim(),
        slug: effectiveSlug,
        tag: tag.trim() || "COLLECTION",
        subtitle: subtitle.trim(),
        description: description.trim(),
        image: image || "/assets/male_hoodie_drop.jpg",
        badge: effectiveBadge,
        department,
        displayOrder: Number(displayOrder) || 1,
        featured,
      };

      let saved: Category | null = null;
      if (isEditing && categoryToEdit) {
        saved = updateCategory(categoryToEdit.id, categoryData);
      } else {
        saved = addCategory(categoryData);
      }

      if (!saved) {
        throw new Error("Failed to save category into the database.");
      }

      onSaved(saved);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving the category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-none shadow-2xl my-8 overflow-hidden text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <h3 className="font-display text-sm uppercase tracking-widest font-bold">
              {isEditing ? `Edit Category: ${categoryToEdit?.name}` : "Create New Category"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* Basic Info: Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Cyberpunk Outerwear"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Slug / URL Param *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. Cyberpunk-Outerwear"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none"
              />
            </div>
          </div>

          {/* Tag & Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Tagline / Header Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. STREETWEAR & APPAREL"
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Badge / Pill Label
              </label>
              <div className="space-y-1.5">
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
                >
                  {PRESET_BADGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                  <option value="custom">Custom Badge...</option>
                </select>
                {badge === "custom" && (
                  <input
                    type="text"
                    value={customBadge}
                    onChange={(e) => setCustomBadge(e.target.value)}
                    placeholder="Enter custom badge text..."
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Subtitle / Short Description */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Subtitle (Shown on Category Cards)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. 500 GSM French Terry Hoodies, Boxy Cuts & Tactical Cargos"
              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Category Description (Storefront Catalog Header)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the aesthetic and craftsmanship of this category..."
              className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none resize-none"
            />
          </div>

          {/* Department, Display Order & Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono focus:border-white focus:outline-none uppercase"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                min={1}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white font-mono focus:border-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer bg-zinc-900 border border-zinc-800 px-3 py-2 hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-zinc-700 text-white focus:ring-0"
                />
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                  Featured on Home
                </span>
              </label>
            </div>
          </div>

          {/* Cover Image Selection */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Category Cover Image
            </label>

            {/* Current Selected Image Preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-3">
              <div className="relative w-20 h-24 bg-black border border-zinc-700 overflow-hidden shrink-0">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <p className="text-[10px] font-mono text-zinc-400 break-all truncate max-w-sm">
                  Source: {image || "No image selected"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste external image URL (https://...)..."
                className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyCustomImageUrl}
                className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-mono uppercase"
              >
                Apply
              </button>
            </div>

            {/* Quick Preset Library */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                Quick Preset Assets:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`group relative aspect-[3/4] border overflow-hidden transition-all text-left cursor-pointer ${
                      image === preset.url
                        ? "border-white ring-2 ring-white/50"
                        : "border-zinc-800 hover:border-zinc-500"
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <span className="absolute bottom-1 left-1 right-1 text-[8px] font-mono text-white truncate px-1 bg-black/80">
                      {preset.name}
                    </span>
                    {image === preset.url && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-white text-black rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono uppercase transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-white text-black hover:bg-zinc-200 font-display text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isEditing ? "Update Category" : "Create Category"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
