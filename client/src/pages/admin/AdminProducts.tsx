import AdminLayout from './AdminLayout';
import { trpc } from '@/lib/trpc';
import { Search, RefreshCw, Plus } from 'lucide-react';
import { useState } from 'react';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const { data: products, isLoading, refetch } = trpc.admin.allProducts.useQuery();

  const filtered = (products ?? []).filter((p) => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.categoryName ?? '').toLowerCase().includes(q);
  });

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{products?.length ?? 0} total products</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Added'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>{[...Array(6)].map((_, j) => <td key={j} className="px-5 py-4"><div className="h-4 bg-muted rounded animate-pulse" /></td>)}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">No products found</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-muted" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">IMG</div>
                        )}
                        <p className="text-sm font-medium text-foreground max-w-[200px] truncate">{p.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.categoryName ?? '—'}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatCurrency(p.price)}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        p.stock > 10 ? 'bg-green-100 text-green-700' :
                        p.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.featured ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {p.featured ? 'Featured' : 'Normal'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
