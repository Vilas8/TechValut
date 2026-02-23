import { Clock, Eye, Search, Calendar, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";

const history = [
  { id: 1, name: "MacBook Pro 14\" M3 Pro", category: "Laptop", price: "₹1,89,990", viewedAt: "Today, 2:34 PM", views: 3 },
  { id: 2, name: "Sony WH-1000XM5 Headphones", category: "Audio", price: "₹29,990", viewedAt: "Today, 11:20 AM", views: 1 },
  { id: 3, name: "iPhone 15 Pro Max 256GB", category: "Smartphone", price: "₹1,59,990", viewedAt: "Yesterday, 6:45 PM", views: 5 },
  { id: 4, name: "Samsung Galaxy Tab S9 Ultra", category: "Tablet", price: "₹1,08,999", viewedAt: "Yesterday, 3:12 PM", views: 2 },
  { id: 5, name: "Apple Watch Ultra 2", category: "Wearable", price: "₹89,900", viewedAt: "Feb 21, 2025", views: 2 },
  { id: 6, name: "Logitech MX Master 3S", category: "Accessory", price: "₹9,495", viewedAt: "Feb 21, 2025", views: 1 },
  { id: 7, name: "LG UltraGear 27\" 4K 144Hz", category: "Monitor", price: "₹79,990", viewedAt: "Feb 20, 2025", views: 4 },
  { id: 8, name: "AirPods Pro 2nd Gen", category: "Audio", price: "₹24,900", viewedAt: "Feb 20, 2025", views: 2 },
];

export default function History() {
  const [search, setSearch] = useState("");

  const filtered = history.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()) || h.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Browsing History</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Products you recently viewed</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
            Clear All History
          </Button>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search history..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Button variant="outline" size="sm" className="gap-2 shrink-0">
                <ArrowUpDown className="h-4 w-4" /> Sort
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-10">
                <Clock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No history found</p>
              </div>
            ) : (
              filtered.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-xl p-3 shrink-0">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />{item.viewedAt}
                        </span>
                        {item.views > 1 && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Eye className="h-3 w-3" />Viewed {item.views}x
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm">{item.price}</p>
                    <Button variant="ghost" size="sm" className="text-xs mt-0.5 h-auto py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Again
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
