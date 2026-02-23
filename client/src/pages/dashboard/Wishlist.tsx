import { Heart, ShoppingCart, Trash2, Search, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "./DashboardLayout";

const initialWishlist = [
  { id: 1, name: "Samsung Galaxy S24 Ultra", category: "Smartphone", price: 129999, originalPrice: 144999, inStock: true },
  { id: 2, name: "iPad Pro M4 13\" WiFi", category: "Tablet", price: 109900, originalPrice: 119900, inStock: true },
  { id: 3, name: "AirPods Pro 2nd Gen", category: "Audio", price: 24900, originalPrice: 26900, inStock: true },
  { id: 4, name: "Dell XPS 15 OLED", category: "Laptop", price: 189990, originalPrice: 209990, inStock: false },
  { id: 5, name: "Apple Watch Series 9", category: "Wearable", price: 41900, originalPrice: 44900, inStock: true },
];

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function Wishlist() {
  const [items, setItems] = useState(initialWishlist);
  const [search, setSearch] = useState("");

  const remove = (id: number) => {
    setItems((p) => p.filter((i) => i.id !== id));
    toast.success("Removed from wishlist");
  };

  const addToCart = (name: string) => toast.success(`${name} added to cart!`);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Wishlist</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{items.length} items saved</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search wishlist..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <Card className="border-border">
            <CardContent className="text-center py-16">
              <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add items you love to your wishlist</p>
              <Button className="mt-4" size="sm" onClick={() => window.location.href = "/products"}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
              return (
                <Card key={item.id} className="border-border group hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                      <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="bg-muted rounded-xl h-36 flex items-center justify-center mb-4">
                      <Heart className="h-12 w-12 text-muted-foreground/20" />
                    </div>

                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.name}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">{fmt(item.price)}</span>
                      <span className="text-xs text-muted-foreground line-through">{fmt(item.originalPrice)}</span>
                      <Badge className="bg-green-500/10 text-green-600 border-0 text-xs">{discount}% OFF</Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      {!item.inStock && (
                        <Badge variant="destructive" className="text-xs mr-1">Out of Stock</Badge>
                      )}
                      <Button
                        className="flex-1 gap-2 text-xs"
                        size="sm"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item.name)}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
