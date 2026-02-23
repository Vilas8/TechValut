import { TrendingUp, Users, ShoppingBag, DollarSign, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "./AdminLayout";

const topProducts = [
  { name: "MacBook Pro 14\" M3", revenue: "₹18,99,900", units: 10, pct: 90 },
  { name: "iPhone 15 Pro", revenue: "₹13,49,900", units: 10, pct: 75 },
  { name: "Samsung S24 Ultra", revenue: "₹12,99,990", units: 10, pct: 68 },
  { name: "iPad Pro M4", revenue: "₹10,99,000", units: 10, pct: 55 },
  { name: "Sony WH-1000XM5", revenue: "₹2,99,900", units: 10, pct: 30 },
];

const categoryBreakdown = [
  { category: "Laptops", pct: 34, color: "bg-primary" },
  { category: "Smartphones", pct: 28, color: "bg-blue-500" },
  { category: "Tablets", pct: 16, color: "bg-purple-500" },
  { category: "Audio", pct: 12, color: "bg-orange-500" },
  { category: "Wearables", pct: 10, color: "bg-pink-500" },
];

const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
const revenues = [180, 210, 245, 310, 280, 350];
const maxRev = Math.max(...revenues);

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Store performance insights</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Monthly Revenue", value: "₹24.9L", sub: "+12.5% vs last month", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Conversion Rate", value: "3.8%", sub: "+0.4% vs last month", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Avg Order Value", value: "₹19,390", sub: "+6.2% vs last month", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Active Users", value: "3,921", sub: "+15.3% vs last month", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
          ].map(({ label, value, sub, icon: Icon, color, bg }) => (
            <Card key={label} className="border-border">
              <CardContent className="pt-5 pb-4">
                <div className={`${bg} w-8 h-8 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                <p className="text-xs text-green-500 font-medium mt-1">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue bar chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" /> Monthly Revenue
              </CardTitle>
              <CardDescription>Last 6 months revenue in lakhs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-40">
                {months.map((m, i) => (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground font-medium">₹{revenues[i]}K</span>
                    <div
                      className="w-full bg-primary/80 hover:bg-primary transition-colors rounded-t-md"
                      style={{ height: `${(revenues[i] / maxRev) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{m}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category breakdown */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <PieChart className="h-4 w-4 text-primary" /> Sales by Category
              </CardTitle>
              <CardDescription>Revenue distribution across categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryBreakdown.map(({ category, pct, color }) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top products */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs font-bold">{i + 1}</Badge>
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <span className="text-sm font-bold text-primary">{p.revenue}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary/70 rounded-full" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
