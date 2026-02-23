import { Package, Truck, CheckCircle2, Clock, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";

const orders = [
  { id: "#TV-00123", product: "MacBook Pro 14\" M3 Pro", category: "Laptop", date: "Feb 20, 2025", status: "Delivered", amount: "₹1,89,990", qty: 1, image: null },
  { id: "#TV-00119", product: "Sony WH-1000XM5", category: "Audio", date: "Feb 15, 2025", status: "Shipped", amount: "₹29,990", qty: 1, image: null },
  { id: "#TV-00115", product: "iPhone 15 Pro 256GB", category: "Smartphone", date: "Feb 10, 2025", status: "Processing", amount: "₹1,34,990", qty: 1, image: null },
  { id: "#TV-00110", product: "Apple Watch Ultra 2", category: "Wearable", date: "Jan 28, 2025", status: "Delivered", amount: "₹89,900", qty: 1, image: null },
  { id: "#TV-00102", product: "iPad Pro M4 11\" WiFi", category: "Tablet", date: "Jan 15, 2025", status: "Delivered", amount: "₹1,09,900", qty: 1, image: null },
  { id: "#TV-00098", product: "Samsung 27\" 4K Monitor", category: "Monitor", date: "Jan 05, 2025", status: "Cancelled", amount: "₹49,990", qty: 1, image: null },
];

const statusConfig: Record<string, { icon: typeof Package; color: string; bg: string }> = {
  Delivered: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-500/10" },
  Shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-500/10" },
  Processing: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-500/10" },
  Cancelled: { icon: Package, color: "text-red-600", bg: "bg-red-500/10" },
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const statuses = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

  const filtered = orders.filter((o) => {
    const matchSearch = o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track and manage your purchases</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statuses.slice(1).map((s) => {
            const count = orders.filter((o) => o.status === s).length;
            const cfg = statusConfig[s];
            return (
              <Card key={s} className="border-border cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus(s === filterStatus ? "All" : s)}>
                <CardContent className="pt-4 pb-4">
                  <div className={`${cfg.bg} w-8 h-8 rounded-lg flex items-center justify-center mb-2`}>
                    <cfg.icon className={`h-4 w-4 ${cfg.color}`} />
                  </div>
                  <p className="text-xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">{s}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex gap-2 flex-wrap">
                {statuses.map((s) => (
                  <Button key={s} variant={filterStatus === s ? "default" : "outline"} size="sm" onClick={() => setFilterStatus(s)} className="text-xs">{s}</Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-10">
                <Package className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No orders found</p>
              </div>
            ) : (
              filtered.map((order) => {
                const cfg = statusConfig[order.status];
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted rounded-xl p-3 shrink-0">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{order.product}</p>
                        <p className="text-xs text-muted-foreground">{order.id} · {order.date} · {order.category}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm">{order.amount}</p>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${cfg.bg} mt-1`}>
                        <cfg.icon className={`h-3 w-3 ${cfg.color}`} />
                        <span className={`text-xs font-medium ${cfg.color}`}>{order.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
