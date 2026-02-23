import { Package, Search, Plus, Edit, Trash2, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "./AdminLayout";

const products = [
  { id: 1, name: "MacBook Pro 14\" M3 Pro", category: "Laptop", price: "₹1,89,990", stock: 24, status: "In Stock" },
  { id: 2, name: "iPhone 15 Pro 256GB", category: "Smartphone", price: "₹1,34,990", stock: 58, status: "In Stock" },
  { id: 3, name: "Sony WH-1000XM5", category: "Audio", price: "₹29,990", stock: 3, status: "Low Stock" },
  { id: 4, name: "iPad Pro M4 11\" WiFi", category: "Tablet", price: "₹1,09,900", stock: 12, status: "In Stock" },
  { id: 5, name: "Apple Watch Ultra 2", category: "Wearable", price: "₹89,900", stock: 0, status: "Out of Stock" },
  { id: 6, name: "Samsung Galaxy S24 Ultra", category: "Smartphone", price: "₹1,29,999", stock: 31, status: "In Stock" },
  { id: 7, name: "Dell XPS 15 OLED", category: "Laptop", price: "₹1,89,990", stock: 7, status: "Low Stock" },
  { id: 8, name: "AirPods Pro 2nd Gen", category: "Audio", price: "₹24,900", stock: 45, status: "In Stock" },
];

const stockColor: Record<string, string> = {
  "In Stock": "bg-green-500/10 text-green-600",
  "Low Stock": "bg-yellow-500/10 text-yellow-600",
  "Out of Stock": "bg-red-500/10 text-red-600",
};

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{products.length} total products</p>
          </div>
          <Button className="gap-2" size="sm" onClick={() => toast.success("Product form coming soon!")}
          >
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-lg p-2 shrink-0">
                            <Package className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="font-medium">{p.name}</p>
                        </div>
                      </td>
                      <td className="py-3 pr-4"><Badge variant="secondary" className="text-xs">{p.category}</Badge></td>
                      <td className="py-3 pr-4 font-bold">{p.price}</td>
                      <td className="py-3 pr-4">{p.stock}</td>
                      <td className="py-3 pr-4">
                        <Badge className={`text-xs border-0 ${stockColor[p.status]}`}>{p.status}</Badge>
                      </td>
                      <td className="py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.success(`Editing ${p.name}`)} className="gap-2">
                              <Edit className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.error(`${p.name} deleted`)} className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
