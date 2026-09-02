import { useState, useEffect, useRef } from "react";
import { X, Upload, Plus, Trash2, Check, Image as ImageIcon } from "lucide-react";
import { type Product } from "@/lib/products";
import { addProduct, updateProduct } from "@/lib/db";

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSaved: (product: Product) => void;
}

const CATEGORIES: Product["category"][] = [
  "Shoulder Bags",
  "Crossbody",
  "Totes & Backpacks",
  "Mini Bags",
  "Apparel",
  "Accessories",
];

const DEPARTMENTS: ("unisex" | "female" | "male")[] = ["unisex", "female", "male"];

export function ProductFormDialog({
  isOpen,
  onClose,
  productToEdit,
  onSaved,
}: ProductFormDialogProps) {
  const isEditing = Boolean(productToEdit);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState<Product["category"]>("Apparel");
  const [department, setDepartment] = useState<"unisex" | "female" | "male">("unisex");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [sizesInput, setSizesInput] = useState("S, M, L, XL");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.price ?? "");
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
      setCategory("Apparel");
      setDepartment("unisex");
      setDescription("");
      setShortDescription("");
      setSizesInput("S, M, L, XL");
      setImages([]);
    }
    setErrorMsg("");
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImages((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    const finalPrimaryImage = images.length > 0 ? images[0] : "/assets/male_hoodie_drop.jpg";
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
        }
      } else {
        const created = addProduct({
          name: name.trim(),
          price: Number(price),
          category,
          department,
          description: description.trim(),
          shortDescription: shortDescription.trim() || description.slice(0, 100),
          image: finalPrimaryImage,
          gallery: finalGallery,
          sizes: parsedSizes.length > 0 ? parsedSizes : ["One Size"],
        });
        onSaved(created);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred while saving the product.");
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
                placeholder="e.g. Cyber Tribal Gothic Heavyweight Tee"
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

          {/* Category & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Product["category"])}
                className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-sm text-white focus:border-white focus:outline-none transition-colors"
              >
                {CATEGORIES.map((cat) => (
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
                placeholder="S, M, L, XL or One Size"
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
                        className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-none transition-colors"
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
                  No images uploaded yet. Upload a local file or provide an image URL.
                </p>
              </div>
            )}

            {/* Upload & Add URL Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* File Upload Button */}
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
                  className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono uppercase text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Image Files</span>
                </button>
              </div>

              {/* URL Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or paste Image URL..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:border-white focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white flex items-center gap-1 border border-zinc-700"
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
              className="px-5 py-2.5 border border-zinc-800 text-xs font-mono uppercase text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 text-xs font-display uppercase tracking-widest font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? "Save Product Updates" : "Create & Publish Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
