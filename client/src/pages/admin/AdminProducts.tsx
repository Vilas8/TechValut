import AdminLayout from './AdminLayout';
import { trpc } from '@/lib/trpc';
import {
  Search, RefreshCw, Plus, Edit2, Trash2, X, Upload, Package,
  Tag, DollarSign, Layers, Star, ImageIcon, AlignLeft, Hash
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type ProductForm = {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  stock: string;
  categoryId: string;
  featured: boolean;
  slug: string;
};

const emptyForm = (): ProductForm => ({
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  image: '',
  stock: '',
  categoryId: '',
  featured: false,
  slug: '',
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function InputField({
  label, icon: Icon, required, ...props
}: {
  label: string;
  icon?: React.ElementType;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
        {Icon && <Icon size={12} />}
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-3 py-2.5 bg-background border rounded-lg text-sm transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${props.className ?? 'border-border'}`}
      />
    </div>
  );
}

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm());
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState<Partial<ProductForm>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: products, isLoading, refetch } = trpc.admin.allProducts.useQuery();
  const { data: categories } = trpc.categories.list.useQuery();
  const createProduct = trpc.admin.createProduct.useMutation();
  const updateProduct = trpc.admin.updateProduct.useMutation();
  const deleteProduct = trpc.admin.deleteProduct.useMutation();

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filtered = (products ?? []).filter((p) => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.categoryName ?? '').toLowerCase().includes(q);
  });

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
    setImagePreview('');
    setModalOpen(true);
  };

  const openEdit = (p: any) => {
    setEditingId(p.id);
    setForm({
      name: p.name ?? '',
      description: p.description ?? '',
      price: String(p.price ?? ''),
      originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      image: p.image ?? '',
      stock: String(p.stock ?? ''),
      categoryId: String(p.categoryId ?? ''),
      featured: Boolean(p.featured),
      slug: p.slug ?? '',
    });
    setErrors({});
    setImagePreview(p.image ?? '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
    setImagePreview('');
  };

  // Close modal on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) closeModal();
    };
    if (modalOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [modalOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const setField = (field: keyof ProductForm, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'name' && !editingId ? { slug: slugify(String(value)) } : {}),
    }));
    if (field === 'image') setImagePreview(String(value));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<ProductForm> = {};
    if (!form.name.trim()) e.name = 'Product name is required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Valid price required';
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = 'Valid stock quantity required';
    if (!form.categoryId) e.categoryId = 'Category is required';
    if (!form.slug.trim()) e.slug = 'Slug is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        image: form.image.trim() || null,
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
        featured: form.featured ? 1 : 0,
        slug: form.slug.trim(),
      };
      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, ...payload });
        showToast('Product updated successfully!', 'success');
      } else {
        await createProduct.mutateAsync(payload);
        showToast('Product added successfully!', 'success');
      }
      refetch();
      closeModal();
    } catch (err: any) {
      showToast(err?.message ?? 'Something went wrong', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct.mutateAsync({ id });
      showToast('Product deleted.', 'success');
      refetch();
    } catch (err: any) {
      showToast(err?.message ?? 'Failed to delete', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  return (
    <AdminLayout>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium transition-all animate-in slide-in-from-top-2
          ${ toast.type === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-red-600 text-white'
          }`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {products?.length ?? 0} total product{(products?.length ?? 0) !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Added', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Package size={40} className="opacity-30" />
                      <div>
                        <p className="font-medium">{search ? 'No products match your search' : 'No products yet'}</p>
                        <p className="text-xs mt-1">{!search && 'Click "Add Product" to get started'}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-muted shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                            <ImageIcon size={16} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground max-w-[180px] truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground font-mono truncate max-w-[180px]">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium">
                        {p.categoryName ?? '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-foreground">{formatCurrency(p.price)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        p.stock > 10 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        p.stock > 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        p.featured
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {p.featured ? '★ Featured' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                          title="Edit product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="p-1.5 rounded-lg hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div
            ref={modalRef}
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package size={18} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground text-base">
                    {editingId ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {editingId ? 'Update product details' : 'Fill in the details to list a new product'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

                {/* Image preview + URL */}
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                        onError={() => setImagePreview('')}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <ImageIcon size={24} />
                        <span className="text-xs">Preview</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Upload size={12} /> Product Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={form.image}
                      onChange={e => setField('image', e.target.value)}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">Paste a direct image URL. Preview updates automatically.</p>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <InputField
                    label="Product Name"
                    icon={Package}
                    required
                    placeholder="e.g. Sony WH-1000XM5 Headphones"
                    value={form.name}
                    onChange={e => setField('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : 'border-border'}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <InputField
                    label="URL Slug"
                    icon={Hash}
                    required
                    placeholder="e.g. sony-wh-1000xm5-headphones"
                    value={form.slug}
                    onChange={e => setField('slug', e.target.value)}
                    className={errors.slug ? 'border-red-500' : 'border-border'}
                  />
                  {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                  <p className="text-xs text-muted-foreground">Auto-generated from name. Used in product URLs.</p>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                    <AlignLeft size={12} /> Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the product features, specs, and highlights..."
                    value={form.description}
                    onChange={e => setField('description', e.target.value)}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>

                {/* Price + Original Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <InputField
                      label="Price (₹)"
                      icon={DollarSign}
                      required
                      type="number"
                      min="1"
                      placeholder="e.g. 24999"
                      value={form.price}
                      onChange={e => setField('price', e.target.value)}
                      className={errors.price ? 'border-red-500' : 'border-border'}
                    />
                    {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <InputField
                      label="Original Price (₹)"
                      icon={Tag}
                      type="number"
                      min="0"
                      placeholder="e.g. 29999 (optional)"
                      value={form.originalPrice}
                      onChange={e => setField('originalPrice', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Shown as strikethrough for discounts.</p>
                  </div>
                </div>

                {/* Stock + Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <InputField
                      label="Stock Quantity"
                      icon={Layers}
                      required
                      type="number"
                      min="0"
                      placeholder="e.g. 50"
                      value={form.stock}
                      onChange={e => setField('stock', e.target.value)}
                      className={errors.stock ? 'border-red-500' : 'border-border'}
                    />
                    {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Tag size={12} /> Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.categoryId}
                      onChange={e => setField('categoryId', e.target.value)}
                      className={`w-full px-3 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.categoryId ? 'border-red-500' : 'border-border'
                      }`}
                    >
                      <option value="">Select category...</option>
                      {(categories ?? []).map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId}</p>}
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <Star size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Featured Product</p>
                      <p className="text-xs text-muted-foreground">Featured products appear on the homepage spotlight</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setField('featured', !form.featured)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      form.featured ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      form.featured ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20 shrink-0 rounded-b-2xl">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {submitting ? (
                    <><RefreshCw size={14} className="animate-spin" /> {editingId ? 'Saving...' : 'Adding...'}</>
                  ) : (
                    <>{editingId ? <><Edit2 size={14} /> Save Changes</> : <><Plus size={14} /> Add Product</>}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Delete Product?</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              The product will be permanently removed from your store and will no longer appear to customers.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
