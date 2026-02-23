import { Users, ShoppingBag, Package, TrendingUp, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminLayout from "./AdminLayout";
import { Link } from "wouter";

const stats = [
  { label: "Total Revenue", value: "₹24,89,540", change: "+12.5%", up: true, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Total Orders", value: "1,284", change: "+8.2%", up: true, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Total Users", value: "3,921", change: "+15.3%", up: true, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Products", value: "248", change: "-2.1%", up: false, icon: Package, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const recentOrders = [
  { id: "#TV-01284", user: "Priya Sharma", product: "MacBook Pro 14\"", amount: "₹1,89,990", status: "Delivered" },
  { id: "#TV-01283", user: "Rahul Verma", product: "iPhone 15 Pro", amount: "₹1,34,990", status: "Shipped" },
  { id: "#TV-01282", user: "Aarti Patel", product: "Sony WH-1000XM5", amount: "₹29,990", status: "Processing" },
  { id: "#TV-01281", user: "Kiran Kumar", product: "iPad Pro M4", amount: "₹1,09,900", status: "Delivered" },
  { id: "#TV-01280", user: "Deepak Singh", product: "Apple Watch Ultra 2", amount: "₹89,900", status: "Cancelled" },
];

const recentUsers = [
  { name: "Priya Sharma", email: "priya@example.com", joinedAt: "Feb 22, 2025", orders: 3 },
  { name: "Rahul Verma", email: "rahul@example.com", joinedAt: "Feb 21, 2025", orders: 1 },
  { name: "Aarti Patel", email: "aarti@example.com", joinedAt: "Feb 20, 2025", orders: 5 },
  { name: "Kiran Kumar", email: "kiran@example.com", joinedAt: "Feb 19, 2025", orders: 2 },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-500/10 text-green-600",
  Shipped: "bg-blue-500/10 text-blue-600",
  Processing: "bg-yellow-500/10 text-yellow-600",
  Cancelled: "bg-red-500/10 text-red-600",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Overview of your store performance</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500/10 text-green-600 border-0 gap-1"><Activity className="h-3 w-3" /> Live</Badge>
            <Badge variant="outline" className="text-xs">Feb 23, 2025</Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, change, up, icon: Icon, color, bg }) => (
            <Card key={label} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${bg} rounded-lg p-2`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? "text-green-500" : "text-red-500"}`}>
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {change}
                  </span>
                </div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent orders + new users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" /> Recent Orders
              </CardTitle>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm" className="text-xs">View all</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold">{o.user}</p>
                    <p className="text-xs text-muted-foreground">{o.id} · {o.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{o.amount}</p>
                    <Badge variant="outline" className={`text-xs border-0 ${statusColors[o.status]}`}>{o.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> New Users
              </CardTitle>
              <Link href="/admin/users">
                <Button variant="ghost" size="sm" className="text-xs">View all</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUsers.map((u) => (
                <div key={u.email} className="flex items-center gap-3 py-1 border-b border-border last:border-0">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{u.orders} orders</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
