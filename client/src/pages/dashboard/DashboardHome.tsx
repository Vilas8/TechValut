import DashboardLayout from './DashboardLayout';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBag, Heart, Clock, TrendingUp, ArrowRight, Package } from 'lucide-react';
import { useLocation } from 'wouter';

const statusColor: Record<string, string> = {
  delivered: 'text-green-700 bg-green-100',
  shipped: 'text-blue-700 bg-blue-100',
  confirmed: 'text-indigo-700 bg-indigo-100',
  pending: 'text-yellow-700 bg-yellow-100',
  cancelled: 'text-red-700 bg-red-100',
};

export default function DashboardHome() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: orders, isLoading } = trpc.orders.list.useQuery();

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const totalSpent = (orders ?? []).reduce((sum, o) => sum + o.total, 0);
  const recentOrders = (orders ?? []).slice(0, 3);

  const statCards = [
    { label: 'Total Orders', value: isLoading ? '...' : (orders?.length ?? 0).toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', href: '/dashboard/orders' },
    { label: 'Total Spent', value: isLoading ? '...' : formatCurrency(totalSpent), icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/dashboard/orders' },
    { label: 'Wishlist', value: '0', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', href: '/dashboard/wishlist' },
    { label: 'History', value: '0', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', href: '/dashboard/history' },
  ];

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's a summary of your activity</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((s) => (
          <button
            key={s.label}
            onClick={() => setLocation(s.href)}
            className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
          <button onClick={() => setLocation('/dashboard/orders')} className="text-xs text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight size={12} />
          </button>
        </div>
        <div className="divide-y divide-border">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="px-5 py-4 flex justify-between animate-pulse">
                <div className="h-4 bg-muted rounded w-40" />
                <div className="h-4 bg-muted rounded w-20" />
              </div>
            ))
          ) : recentOrders.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Package size={36} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">No orders yet</p>
              <p className="text-xs text-muted-foreground mt-1">Products you purchase will appear here</p>
              <button onClick={() => setLocation('/products')} className="mt-3 text-xs text-primary hover:underline">Browse products →</button>
            </div>
          ) : (
            recentOrders.map((o) => (
              <div key={o.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold font-mono text-foreground">{o.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}{o.shippingCity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(o.total)}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColor[o.status] ?? 'bg-muted text-muted-foreground'}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
