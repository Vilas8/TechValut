import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { Heart, ShoppingCart, Trash2, ExternalLink, PackageSearch } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

export default function Wishlist() {
  const { user } = useAuth();
  const utils = trpc.useUtils();

  const { data: items, isLoading, error } = trpc.user.wishlist.useQuery(undefined, {
    enabled: !!user,
  });

  const removeMutation = trpc.user.removeFromWishlist.useMutation({
    onSuccess: () => {
      utils.user.wishlist.invalidate();
      toast.success("Removed from wishlist");
    },
    onError: () => toast.error("Failed to remove item"),
  });

  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image ?? "",
      slug: item.slug,
      stock: item.stock,
    });
    toast.success(`${item.name} added to cart`);
  };

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Sign in to view your wishlist</h2>
        <p className="text-muted-foreground mb-4">Save products you love and access them anytime.</p>
        <Link href="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-xl h-28" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to load wishlist</h2>
        <p className="text-muted-foreground">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        {items && items.length > 0 && (
          <span className="ml-auto text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {!items || items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl">
          <PackageSearch className="w-14 h-14 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Browse products and click the heart icon to save items here.</p>
          <Link href="/products" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition font-medium">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <Link href={`/product/${item.slug}`}>
                <img
                  src={item.image ?? "/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 hover:opacity-90 transition"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="font-semibold text-foreground hover:text-primary transition line-clamp-1">
                  {item.name}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>
                <span className={`text-xs mt-1 inline-block ${
                  item.stock > 0 ? 'text-green-600' : 'text-destructive'
                }`}>
                  {item.stock > 0 ? `In Stock (${item.stock} left)` : 'Out of Stock'}
                </span>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0}
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <div className="flex gap-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="flex-1 flex items-center justify-center gap-1 border border-border px-3 py-1.5 rounded-lg text-sm hover:bg-muted transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View
                  </Link>
                  <button
                    onClick={() => removeMutation.mutate({ productId: item.productId })}
                    disabled={removeMutation.isPending}
                    className="flex items-center justify-center border border-border px-3 py-1.5 rounded-lg text-sm hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
