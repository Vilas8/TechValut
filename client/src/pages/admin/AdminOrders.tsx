import { ShoppingBag, Search, MoreVertical, CheckCircle2, Truck, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "./AdminLayout";

const orders = [
  { id: "#TV-01284", user: "Priya Sharma", product: "MacBook Pro 14\" M3 Pro", amount: "₹1,89,990", status: "Delivered", date: "Feb 22, 2025" },
  { id: "#TV-01283", user: "Rahul Verma", product: "iPhone 15 Pro 256GB", amount: "₹1,34,990", status: "Shipped", date: "Feb 21, 2025" },
  { id: "#TV-01282", user: "Aarti Patel", product: "Sony WH-1000XM5", amount: "₹29,990", status: "Processing", date: "Feb 20, 2025" },
  { id: "#TV-01281", user: "Kiran Kumar", product: "iPad Pro M4 11\" WiFi", amount: "₹1,09,900", status: "Delivered", date: "Feb 19, 2025" },
  { id: "#TV-01280", user: "Deepak Singh", product: "Apple Watch Ultra 2", amount: "₹89,900", status: "Cancelled", date: "Feb 18, 2025" },
  { id: "#TV-01279", user: "Neha Gupta", product: "Samsung Galaxy S24 Ultra", amount: "₹1,29,999", status: "Shipped", date: "Feb 17, 2025" },
  { id: "#TV-01278", user: "Arjun Nair", product: "Dell XPS 15 OLED", amount: "₹1,89,990", status: "Delivered", date: "Feb 16, 2025" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  Delivered: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-500/10" },
  Shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-500/10" },
  Processing: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-500/10" },
  Cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-500/10" },
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const statuses = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

  const filtered = orders.filter((o) => {
    const matchSearch = o.user.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{orders.length} total orders</p>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders, users, products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex gap-2 flex-wrap">
                {statuses.map((s) => (
                  <Button key={s} variant={filterStatus === s ? "default" : "outline"} size="sm" onClick={() => setFilterStatus(s)} className="text-xs">{s}</Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((o) => {
                    const cfg = statusConfig[o.status];
                    return (
                      <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 pr-4 font-mono text-xs">{o.id}</td>
                        <td className="py-3 pr-4 font-medium">{o.user}</td>
                        <td className="py-3 pr-4 text-muted-foreground max-w-[180px] truncate">{o.product}</td>
                        <td className="py-3 pr-4 font-bold">{o.amount}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{o.date}</td>
                        <td className="py-3 pr-4">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${cfg.bg}`}>
                            <cfg.icon className={`h-3 w-3 ${cfg.color}`} />
                            <span className={`text-xs font-medium ${cfg.color}`}>{o.status}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success(`${o.id} marked as Shipped`)} className="gap-2">
                                <Truck className="h-4 w-4" /> Mark Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success(`${o.id} marked as Delivered`)} className="gap-2">
                                <CheckCircle2 className="h-4 w-4" /> Mark Delivered
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.error(`${o.id} cancelled`)} className="gap-2 text-destructive">
                                <XCircle className="h-4 w-4" /> Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
