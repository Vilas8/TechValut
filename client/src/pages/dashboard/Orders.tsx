import DashboardLayout from './DashboardLayout';
import { trpc } from '@/lib/trpc';
import { ShoppingBag, Search, RefreshCw, Package } from 'lucide-react';
import { useState } from 'react';

const STATUS_FILTERS = ['All', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;

const statusColor: Record<string, string> = {
  delivered: 'text-green-700 bg-green-100',
  shipped: 'text-blue-700 bg-blue-100',
  confirmed: 'text-indigo-700 bg-indigo-100',
  pending: 'text-yellow-700 bg-yellow-100',
  cancelled: 'text-red-700 bg-red-100',
};

export default function Orders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { data: orders, isLoading, refetch } = trpc.orders.list.useQuery();

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const filtered = (orders ?? []).filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = o.orderNumber.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="text-primary" size={24} /> My Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{orders?.length ?? 0} total orders</p>
        </div>
        <button onClick={() => refetch()} className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl mb-4">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              placeholder="Search by order number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground/70 hover:bg-muted'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Package size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-semibold text-foreground">No orders found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {orders?.length === 0 ? "You haven't placed any orders yet." : 'Try changing your filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => (
            <div key={o.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground font-mono">{o.orderNumber}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Placed on {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Ship to: {o.shippingFirstName} {o.shippingLastName}, {o.shippingCity}, {o.shippingState}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-foreground">{formatCurrency(o.total)}</p>
                  <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColor[o.status] ?? 'bg-muted text-muted-foreground'}`}>
                    {o.status}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex gap-4 text-xs text-muted-foreground">
                <span>Subtotal: {formatCurrency(o.subtotal)}</span>
                <span>Tax: {formatCurrency(o.tax)}</span>
                <span>Shipping: {o.shipping === 0 ? 'Free' : formatCurrency(o.shipping)}</span>
                <span>Payment: {o.paymentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
