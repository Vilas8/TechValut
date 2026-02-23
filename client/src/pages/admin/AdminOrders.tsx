import AdminLayout from './AdminLayout';
import { trpc } from '@/lib/trpc';
import { Search, RefreshCw, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const STATUS_FILTERS = ['All', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;

const statusColor: Record<string, string> = {
  delivered: 'text-green-700 bg-green-100',
  shipped: 'text-blue-700 bg-blue-100',
  confirmed: 'text-indigo-700 bg-indigo-100',
  pending: 'text-yellow-700 bg-yellow-100',
  cancelled: 'text-red-700 bg-red-100',
};

export default function AdminOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const { data: orders, isLoading, refetch } = trpc.admin.allOrders.useQuery();
  const updateStatus = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => { toast.success('Order status updated'); refetch(); setOpenMenu(null); },
    onError: () => toast.error('Failed to update status'),
  });

  const filtered = (orders ?? []).filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      o.orderNumber.toLowerCase().includes(q) ||
      (o.userName ?? '').toLowerCase().includes(q) ||
      (o.userEmail ?? '').toLowerCase().includes(q) ||
      `${o.shippingFirstName} ${o.shippingLastName}`.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} of {orders?.length ?? 0} orders</p>
        </div>
        <button onClick={() => refetch()} className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl">
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search orders, customers..."
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Order ID', 'Customer', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
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
                <tr><td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">No orders found</td></tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30 transition-colors relative">
                    <td className="px-5 py-4 text-sm font-mono font-medium text-primary">{o.orderNumber}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-foreground">{o.userName ?? `${o.shippingFirstName} ${o.shippingLastName}`}</p>
                      <p className="text-xs text-muted-foreground">{o.userEmail ?? o.shippingEmail}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatCurrency(o.total)}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColor[o.status] ?? 'bg-muted text-muted-foreground'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 relative">
                      <button onClick={() => setOpenMenu(openMenu === o.id ? null : o.id)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-muted-foreground" />
                      </button>
                      {openMenu === o.id && (
                        <div className="absolute right-4 top-12 z-20 w-44 bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                          {(['pending','confirmed','shipped','delivered','cancelled'] as const).map((s) => (
                            <button
                              key={s}
                              disabled={o.status === s}
                              onClick={() => updateStatus.mutate({ orderId: o.id, status: s })}
                              className={`w-full text-left px-4 py-2.5 text-sm capitalize transition-colors ${
                                o.status === s ? 'text-muted-foreground cursor-default' : 'text-foreground hover:bg-muted'
                              }`}
                            >
                              {o.status === s ? `✓ ${s}` : `Mark ${s}`}
                            </button>
                          ))}
                        </div>
                      )}
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
