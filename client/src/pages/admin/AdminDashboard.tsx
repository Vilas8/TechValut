import AdminLayout from './AdminLayout';
import { trpc } from '@/lib/trpc';
import { ShoppingBag, Users, DollarSign, Package, TrendingUp, TrendingDown, ArrowRight, RefreshCw } from 'lucide-react';
import { useLocation } from 'wouter';

const statusColor: Record<string, string> = {
  delivered: 'text-green-600 bg-green-50',
  shipped: 'text-blue-600 bg-blue-50',
  confirmed: 'text-indigo-600 bg-indigo-50',
  pending: 'text-yellow-600 bg-yellow-50',
  cancelled: 'text-red-600 bg-red-50',
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const stats = trpc.admin.stats.useQuery();
  const recentOrders = trpc.admin.recentOrders.useQuery();
  const recentUsers = trpc.admin.recentUsers.useQuery();

  const isLoading = stats.isLoading || recentOrders.isLoading || recentUsers.isLoading;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const statCards = stats.data
    ? [
        { label: 'Total Revenue', value: formatCurrency(stats.data.totalRevenue), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Total Orders', value: stats.data.totalOrders.toLocaleString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Users', value: stats.data.totalUsers.toLocaleString(), icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'Products', value: stats.data.totalProducts.toLocaleString(), icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Live store performance</p>
        </div>
        <button
          onClick={() => { stats.refetch(); recentOrders.refetch(); recentUsers.refetch(); }}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-3" />
              <div className="h-7 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon size={20} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Orders</h2>
            <button onClick={() => setLocation('/admin/orders')} className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowRight size={12} /></button>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.isLoading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="px-5 py-3 flex justify-between animate-pulse">
                  <div className="h-4 bg-muted rounded w-40" />
                  <div className="h-4 bg-muted rounded w-20" />
                </div>
              ))
            ) : recentOrders.data?.length === 0 ? (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">No orders yet</div>
            ) : (
              recentOrders.data?.map((order) => (
                <div key={order.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.userName ?? `${order.shippingFirstName}`}</p>
                    <p className="text-xs text-muted-foreground">{order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{formatCurrency(order.total)}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColor[order.status] ?? 'text-muted-foreground bg-muted'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-card border border-border rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">New Users</h2>
            <button onClick={() => setLocation('/admin/users')} className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowRight size={12} /></button>
          </div>
          <div className="divide-y divide-border">
            {recentUsers.isLoading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="px-5 py-3 flex gap-3 animate-pulse">
                  <div className="w-8 h-8 bg-muted rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : recentUsers.data?.length === 0 ? (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">No users yet</div>
            ) : (
              recentUsers.data?.map((u) => (
                <div key={u.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                    {(u.name ?? u.email ?? '?')[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{u.name ?? 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
