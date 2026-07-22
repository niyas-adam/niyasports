"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Search,
  X,
  Upload,
} from "lucide-react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  created_at: string;
};

const defaultProduct = {
  title: "",
  description: "",
  price: 0,
  category: "Apparel",
  stock: 0,
  image_url: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultProduct);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const fetchProducts = useCallback(async () => {
    let query = supabase.from("products").select("*").order("created_at", { ascending: false });
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }
    const { data } = await query;
    if (data) setProducts(data);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openCreate = () => {
    setForm(defaultProduct);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setForm({
      title: product.title,
      description: product.description,
      price: Number(product.price),
      category: product.category,
      stock: product.stock,
      image_url: product.image_url || "",
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      await supabase.from("products").update(form).eq("id", editingId);
    } else {
      await supabase.from("products").insert(form);
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const categories = [
    "Apparel", "Footwear", "Training Equipment", "Accessories",
    "Basketball", "Running", "Yoga", "Fitness", "Strength", "Cardio",
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="text-accent-bright" size={28} />
          <h1 className="font-anton text-3xl text-ink">Products</h1>
        </div>
        <button
          onClick={openCreate}
          className="bg-accent hover:bg-accent-bright text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright transition text-sm"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-bg border border-line w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-line">
              <h2 className="text-lg font-semibold text-ink">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted hover:text-ink transition">
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright transition text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright transition text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 bg-surface border border-line text-ink focus:outline-none focus:border-accent-bright transition text-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Product Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright transition text-sm"
                  />
                  <label className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-line text-ink text-sm cursor-pointer hover:bg-surface transition whitespace-nowrap">
                    <Upload size={16} />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const fd = new FormData();
                          fd.append("image", file);
                          const res = await fetch("/api/upload/product-image", {
                            method: "POST",
                            body: fd,
                          });
                          const data = await res.json();
                          if (res.ok && data.url) {
                            setForm({ ...form, image_url: data.url });
                          } else {
                            alert(data.error || "Upload failed");
                          }
                        } catch {
                          alert("Upload failed");
                        }
                        setUploading(false);
                      }}
                    />
                  </label>
                </div>
                {form.image_url && (
                  <img
                    src={form.image_url}
                    alt="Preview"
                    className="mt-2 h-24 w-24 object-cover border border-line"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                {uploading && (
                  <p className="text-xs text-muted mt-1">Uploading...</p>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 border border-line text-muted hover:text-ink hover:bg-surface-2 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-accent hover:bg-accent-bright disabled:opacity-50 text-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-bright mx-auto" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-surface border border-line">
          <Package className="mx-auto text-muted" size={48} />
          <p className="text-muted mt-3">No products found</p>
        </div>
      ) : (
        <div className="bg-surface border border-line overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Category</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Price</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Stock</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-ink">{product.title}</p>
                    <p className="text-xs text-muted truncate max-w-xs">{product.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-surface-2 text-muted px-2 py-1 border border-line">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-medium text-ink">
                    ₹{Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-xs font-medium px-2 py-1 ${
                        product.stock <= 0
                          ? "bg-accent/10 text-accent-bright"
                          : product.stock < 10
                          ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-green-900/30 text-green-400"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 text-muted hover:text-ink transition"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-muted hover:text-accent-bright transition"
                      >
                        <Trash2 size={16} />
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
  );
}
