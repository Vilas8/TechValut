import AdminLayout from './AdminLayout';
import { trpc } from '@/lib/trpc';
import { RefreshCw, TrendingUp } from 'lucide-react';

export default function AdminAnalytics() {
  const { data, isLoading, refetch } = trpc.admin.analytics.useQuery();
  const stats = trpc.admin.stats.useQuery();

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const monthlySales: any[] = data?.monthlySales ?? [];
  const categoryStats: any[] = data?.categoryStats ?? [];
  const topProducts: any[] = data?.topProducts ?? [];

  const maxRevenue = Math.max(...monthlySales.map((m: any) => Number(m.revenue ?? 0)), 1);
  const totalCategoryRevenue = categoryStats.reduce((acc: number, c: any) => acc + Number(c.revenue ?? 0), 0);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Store performance insights — live data</p>
        </div>
        <button onClick={() => { refetch(); stats.refetch(); }} className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Summary Cards */}
      {stats.data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Monthly Revenue', value: formatCurrency(stats.data.totalRevenue) },
            { label: 'Total Orders', value: stats.data.totalOrders.toLocaleString() },
            { label: 'Avg Order Value', value: stats.data.totalOrders > 0 ? formatCurrency(Math.round(stats.data.totalRevenue / stats.data.totalOrders)) : '₹0' },
            { label: 'Active Users', value: stats.data.totalUsers.toLocaleString() },
          ].map((c) => (
            <div key={c.label} className="bg-card border border-border rounded-xl p-5">
              <p className="text-2xl font-bold text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-primary" />
            <h2 className="font-semibold text-foreground">Monthly Revenue</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-5">Last 6 months revenue</p>
          {isLoading ? (
            <div className="h-48 flex items-end gap-2">
              {[...Array(6)].map((_, i) => <div key={i} className="flex-1 bg-muted rounded-t animate-pulse" style={{ height: `${(i + 1) * 15}%` }} />)}
            </div>
          ) : monthlySales.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">No revenue data yet</div>
          ) : (
            <div className="flex items-end gap-2 h-48">
              {monthlySales.map((m: any, i: number) => {
                const pct = (Number(m.revenue) / maxRevenue) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <p className="text-[10px] text-muted-foreground font-medium">{formatCurrency(Number(m.revenue))}</p>
                    <div
                      className="w-full rounded-t-md bg-primary/70 hover:bg-primary transition-colors"
                      style={{ height: `${Math.max(pct, 4)}%` }}
                      title={`${m.month}: ${formatCurrency(Number(m.revenue))}`}
                    />
                    <p className="text-[10px] text-muted-foreground">{m.month}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sales by Category */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold text-foreground mb-1">Sales by Category</h2>
          <p className="text-xs text-muted-foreground mb-5">Revenue distribution</p>
          {isLoading ? (
            <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-muted rounded animate-pulse" />)}</div>
          ) : categoryStats.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">No category data yet</div>
          ) : (
            <div className="space-y-4">
              {categoryStats.map((c: any, i: number) => {
                const pct = totalCategoryRevenue > 0 ? Math.round((Number(c.revenue) / totalCategoryRevenue) * 100) : 0;
                const colors = ['bg-blue-500', 'bg-orange-500', 'bg-purple-500', 'bg-green-500', 'bg-pink-500'];
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-foreground">{c.category}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${colors[i % colors.length]} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-card border border-border rounded-xl">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Top Selling Products</h2>
          <p className="text-xs text-muted-foreground mt-0.5">By total units sold</p>
        </div>
        {isLoading ? (
          <div className="p-6 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-muted rounded animate-pulse" />)}</div>
        ) : topProducts.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">No sales data yet</div>
        ) : (
          <div className="divide-y divide-border">
            {topProducts.map((p: any, i: number) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-5">#{i + 1}</span>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-muted" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-muted" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.totalSold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{formatCurrency(Number(p.totalRevenue))}</p>
                  <p className="text-xs text-muted-foreground">revenue</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
