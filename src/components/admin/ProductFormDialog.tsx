import { useState, useEffect, useRef } from "react";
import { X, Upload, Plus, Trash2, Check, Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
import { type Product } from "@/lib/products";
import { addProduct, updateProduct, useCategories } from "@/lib/db";
import { compressImage } from "@/lib/imageUtils";

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSaved: (product: Product) => void;
}

const DEFAULT_CATEGORIES = [
  "Clothing",
  "Accessories",
  "Women exclusive",
  "Mens exclusive",
  "Shoulder Bags",
  "Crossbody",
  "Totes & Backpacks",
  "Mini Bags",
  "Apparel",
];

const PRESET_PRODUCT_IMAGES = [
  { name: "Shoulder Bag (Leather & Chain)", url: "/assets/bag_shoulder_chain_1786114752412.png" },
  { name: "Patent Crossbody Bag", url: "/assets/bag_crossbody_patent_1786114770311.png" },
  { name: "Harness Tote Bag", url: "/assets/bag_harness_tote_1786114785960.png" },
  { name: "Mini Satchel Bag", url: "/assets/bag_mini_satchel_1786114801666.png" },
  { name: "Gothic Cross Bag", url: "/assets/bag_cybergoth_cross.jpg" },
  { name: "Gothic Silver Crossbody", url: "/assets/bag_gothic_silver_crossbody.jpg" },
  { name: "Heavyweight Boxy Hoodie", url: "/assets/male_hoodie_drop.jpg" },
  { name: "Tribal Graphic Tee", url: "/assets/male_tee_drop.jpg" },
  { name: "Tactical D-Ring Cargos", url: "/assets/male_cargo_drop.jpg" },
  { name: "Y2K Female Crop Top", url: "/assets/female_top_drop.jpg" },
  { name: "Gothic Pleated Skirt", url: "/assets/female_skirt_drop.jpg" },
  { name: "Monster Claw Phone Case", url: "/assets/case_gothic_claw.jpg" },
];

const DEPARTMENTS: ("unisex" | "female" | "male")[] = ["unisex", "female", "male"];

export function ProductFormDialog({
  isOpen,
  onClose,
  productToEdit,
  onSaved,
}: ProductFormDialogProps) {
  const dynamicCategories = useCategories();
  const isEditing = Boolean(productToEdit);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = Array.from(
    new Set([
      ...dynamicCategories.map((c) => c.name),
      ...DEFAULT_CATEGORIES,
      ...(productToEdit?.category ? [productToEdit.category] : []),
    ]),
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [sku, setSku] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [category, setCategory] = useState<string>(
    categoryOptions[0] || "Clothing",
  );
  const [department, setDepartment] = useState<"unisex" | "female" | "male">("unisex");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [sizesInput, setSizesInput] = useState("S, M, L, XL");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.price ?? "");
      setSku(productToEdit.sku || "");
      setIsNew(productToEdit.isNew ?? true);
      setCategory(productToEdit.category || "Apparel");
      setDepartment(productToEdit.department || "unisex");
      setDescription(productToEdit.description || "");
      setShortDescription(productToEdit.shortDescription || "");
      setSizesInput(productToEdit.sizes ? productToEdit.sizes.join(", ") : "One Size");

      const allImgs: string[] = [];
      if (productToEdit.image) allImgs.push(productToEdit.image);
      if (productToEdit.gallery) {
        productToEdit.gallery.forEach((g) => {
          if (!allImgs.includes(g)) allImgs.push(g);
        });
      }
      setImages(allImgs.length > 0 ? allImgs : []);
    } else {
      setName("");
      setPrice("");
      setSku("");
      setIsNew(true);
      setCategory("Shoulder Bags");
      setDepartment("unisex");
      setDescription("");
      setShortDescription("");
      setSizesInput("One Size");
      setImages([]);
    }
    setErrorMsg("");
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    const trimmed = newImageUrl.trim();
    if (!images.includes(trimmed)) {
      setImages((prev) => [...prev, trimmed]);
    }
    setNewImageUrl("");
  };

  const handleAddPreset = (url: string) => {
    if (!images.includes(url)) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    setErrorMsg("");

    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedBase64 = await compressImage(file, 1200, 1200, 0.82);
        if (compressedBase64) {
          compressedList.push(compressedBase64);
        }
      }
      setImages((prev) => [...prev, ...compressedList]);
    } catch (err: any) {
      console.error("Image processing error:", err);
      setErrorMsg("Failed to optimize some uploaded images. Please try smaller files or image URLs.");
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Product name is required.");
      return;
    }
    if (price === "" || Number(price) <= 0) {
      setErrorMsg("Please enter a valid price in INR.");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Product description is required.");
      return;
    }

    const defaultFallbackImage =
      category.toLowerCase().includes("bag")
        ? "/assets/bag_shoulder_chain_1786114752412.png"
        : "/assets/male_hoodie_drop.jpg";

    const finalPrimaryImage = images.length > 0 ? images[0] : defaultFallbackImage;
    const finalGallery = images.length > 0 ? images : [finalPrimaryImage];

    const parsedSizes = sizesInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setIsSubmitting(true);

    try {
      if (isEditing && productToEdit) {
        const updated = updateProduct(productToEdit.id, {
          name: name.trim(),
          price: Number(price),
          sku: sku.trim() || undefined,
          isNew,
          category,
          department,
          description: description.trim(),
          shortDescription: shortDescription.trim() || description.slice(0, 100),
          image: finalPrimaryImage,
          gallery: finalGallery,
          sizes: parsedSizes.length > 0 ? parsedSizes : ["One Size"],
        });
        if (updated) {
          onSaved(updated);
          onClose();
        } else {
          throw new Error("Product was not found in the catalog database.");
        }
      } else {
        const created = addProduct({
          name: name.trim(),
          price: Number(price),
          sku: sku.trim() || undefined,
          isNew,
          category,
          department,
          description: description.trim(),
          shortDescription: shortDescription.trim() || description.slice(0, 100),
          image: finalPrimaryImage,
          gallery: finalGallery,
          sizes: parsedSizes.length > 0 ? parsedSizes : ["One Size"],
        });
        if (created) {
          onSaved(created);
          onClose();
        } else {
          throw new Error("Failed to save the new product.");
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "An error occurred while saving the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl my-8 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="font-display text-base uppercase font-bold tracking-widest text-white">
              {isEditing ? "Edit Product" : "Add New Product"}
            </span>
            {isEditing && productToEdit && (
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-zinc-700 bg-zinc-800 text-zinc-300">
                ID: {productToEdit.id}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* Basic Info: Name & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Product Title / Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Crimson Cross Bag"
                required
                className="w-full bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Price (INR ₹) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 font-mono text-xs">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="2499"
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 pl-7 pr-3 py-2.5 text-sm text-white font-mono focus:border-white focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Category, Department & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-sm text-white focus:border-white focus:outline-none transition-colors"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Department / Fit
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as "unisex" | "female" | "male")}
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-sm text-white focus:border-white focus:outline-none transition-colors capitalize"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                SKU Code
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="crb-1001"
                className="w-full bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-sm text-white font-mono focus:border-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* New Arrival Checkbox Toggle */}
          <div className="flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-800/80 p-3">
            <input
              type="checkbox"
              id="isNewArrival"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="w-4 h-4 accent-white bg-zinc-900 border-zinc-700 cursor-pointer"
            />
            <label
              htmlFor="isNewArrival"
              className="text-xs font-mono text-zinc-300 cursor-pointer select-none"
            >
              Tag as <span className="text-white font-bold">New Arrival</span> (Featured in homepage New Arrivals carousel and badge)
            </label>
          </div>

          {/* Description & Short Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Detailed Product Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the craftsmanship story, fabric specs, hardware details..."
                rows={4}
                required
                className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Short Highlight / Hook (Optional)
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="e.g. 480 GSM French terry cotton with mineral fade patina and custom hardware."
                className="w-full bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-white focus:border-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Available Sizes (comma-separated)
              </label>
              <input
                type="text"
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                placeholder="one size, S, M, L, XL"
                className="w-full bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-white font-mono focus:border-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Image Management Section */}
          <div className="border-t border-zinc-800 pt-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-zinc-400" />
                <span>Product Images ({images.length})</span>
              </label>
              <span className="text-[10px] font-mono text-zinc-500">
                First image is Primary Thumbnail
              </span>
            </div>

            {/* Existing Images Gallery Grid */}
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {images.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden"
                  >
                    <img
                      src={imgUrl}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-none transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[9px] font-mono text-zinc-300">
                        {index === 0 ? "PRIMARY" : `ANGLE #${index + 1}`}
                      </span>
                    </div>
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-black/80 text-white text-[8px] font-mono uppercase px-1.5 py-0.5 border border-zinc-700">
                        PRIMARY
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 border border-dashed border-zinc-800 text-center mb-4 bg-zinc-900/30">
                <p className="text-xs text-zinc-500 font-mono">
                  No images uploaded yet. Select a studio preset below or upload image files.
                </p>
              </div>
            )}

            {/* Preset Shoot Selection */}
            <div className="mb-4">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>Quick Preset Studio Shoot Images</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_PRODUCT_IMAGES.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => handleAddPreset(preset.url)}
                    className="text-[10px] font-mono px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-zinc-500" />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload & Add URL Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* File Upload Button with Canvas Compression */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isCompressing}
                  className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono uppercase text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Optimizing Images...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload & Optimize Image</span>
                    </>
                  )}
                </button>
              </div>

              {/* URL Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or paste image URL / asset path..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:border-white focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white flex items-center gap-1 border border-zinc-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-zinc-800 pt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-zinc-800 text-xs font-mono uppercase text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isCompressing}
              className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 text-xs font-display uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isEditing ? "Save Product Updates" : "Create & Publish Product"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
