import { ShoppingBag, Heart, Clock, TrendingUp, Package, Star, ArrowRight, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";
import DashboardLayout from "./DashboardLayout";

const stats = [
  { label: "Total Orders", value: "12", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10", change: "+2 this month" },
  { label: "Wishlist Items", value: "5", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10", change: "3 on sale" },
  { label: "Browsing History", value: "47", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10", change: "Last 30 days" },
  { label: "Loyalty Points", value: "1,240", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10", change: "+80 this week" },
];

const recentOrders = [
  { id: "#TV-00123", product: "MacBook Pro 14\"", date: "Feb 20, 2025", status: "Delivered", amount: "₹1,89,990", statusColor: "bg-green-500/10 text-green-600" },
  { id: "#TV-00119", product: "Sony WH-1000XM5", date: "Feb 15, 2025", status: "Shipped", amount: "₹29,990", statusColor: "bg-blue-500/10 text-blue-600" },
  { id: "#TV-00115", product: "iPhone 15 Pro", date: "Feb 10, 2025", status: "Processing", amount: "₹1,34,990", statusColor: "bg-yellow-500/10 text-yellow-600" },
];

const wishlistItems = [
  { name: "Samsung Galaxy S24 Ultra", price: "₹1,29,999", originalPrice: "₹1,44,999", discount: "10%" },
  { name: "iPad Pro M4", price: "₹1,09,900", originalPrice: "₹1,19,900", discount: "8%" },
  { name: "AirPods Pro 2", price: "₹24,900", originalPrice: "₹26,900", discount: "7%" },
];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Here's what's happening with your account.</p>
          </div>
          <Link href="/products">
            <Button size="sm" className="gap-2">
              <Zap className="h-4 w-4" /> Shop Now
            </Button>
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg, change }) => (
            <Card key={label} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${bg} rounded-lg p-2`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />{change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent orders + wishlist */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Recent orders */}
          <Card className="lg:col-span-3 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" /> Recent Orders
              </CardTitle>
              <Link href="/dashboard/orders">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-lg p-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.product}</p>
                      <p className="text-xs text-muted-foreground">{order.id} · {order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{order.amount}</p>
                    <Badge variant="outline" className={`text-xs ${order.statusColor} border-0 mt-0.5`}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Wishlist */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" /> Wishlist
              </CardTitle>
              <Link href="/dashboard/wishlist">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {wishlistItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground line-through">{item.originalPrice}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">{item.price}</p>
                    <Badge className="text-xs bg-green-500/10 text-green-600 border-0">{item.discount} OFF</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
