import { trpc } from "@/lib/trpc";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";
import { Clock, Trash2, ExternalLink, BarChart2, PackageSearch } from "lucide-react";
import { toast } from "sonner";

function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return past.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function History() {
  const { user } = useAuth();
  const utils = trpc.useUtils();

  const { data: history, isLoading, error } = trpc.user.history.useQuery(undefined, {
    enabled: !!user,
  });

  const clearMutation = trpc.user.clearHistory.useMutation({
    onSuccess: () => {
      utils.user.history.invalidate();
      toast.success("Browsing history cleared");
    },
    onError: () => toast.error("Failed to clear history"),
  });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Clock className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Sign in to view your history</h2>
        <p className="text-muted-foreground mb-4">Your browsing history will appear here.</p>
        <Link href="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition">
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Browsing History</h1>
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-xl h-24" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Clock className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Failed to load history</h2>
        <p className="text-muted-foreground">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Browsing History</h1>
          {history && history.length > 0 && (
            <span className="text-sm text-muted-foreground">{history.length} item{history.length !== 1 ? 's' : ''}</span>
          )}
        </div>
        {history && history.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Clear all browsing history?")) {
                clearMutation.mutate();
              }
            }}
            disabled={clearMutation.isPending}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition border border-border hover:border-destructive px-3 py-1.5 rounded-lg disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {!history || history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl">
          <PackageSearch className="w-14 h-14 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No browsing history yet</h2>
          <p className="text-muted-foreground mb-6">Products you view will appear here automatically.</p>
          <Link href="/products" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:opacity-90 transition font-medium">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <Link href={`/product/${item.slug}`}>
                <img
                  src={item.image ?? "/placeholder.png"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 hover:opacity-90 transition"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="font-semibold text-foreground hover:text-primary transition line-clamp-1">
                  {item.name}
                </Link>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-base font-bold text-primary">{formatPrice(item.price)}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(item.viewedAt)}
                  </span>
                  {item.viewCount > 1 && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <BarChart2 className="w-3 h-3" />
                      Viewed {item.viewCount}x
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={`/product/${item.slug}`}
                className="flex items-center gap-1.5 border border-border px-3 py-1.5 rounded-lg text-sm hover:bg-muted transition flex-shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
