import { ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;
  badge?: string;
  inStock?: boolean;
  featured?: boolean;
}

export function ProductCard({
  name,
  slug,
  price,
  originalPrice,
  rating = 4.5,
  reviews = 0,
  image,
  badge,
  inStock = true,
  featured = false,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link href={`/product/${slug}`}>
      <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {badge && (
              <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                {badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                -{discount}%
              </span>
            )}
            {featured && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp size={12} />
                Featured
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-accent transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-border'}
                />
              ))}
            </div>
            <span className="text-xs text-foreground/60">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-accent">₹{price.toLocaleString('en-IN')}</span>
            {originalPrice && (
              <span className="text-sm text-foreground/40 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            className="w-full btn-primary flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic
            }}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

// Utility function to generate placeholder image URLs
export function getPlaceholderImage(category: string, index: number): string {
  const baseUrl = 'https://placehold.co/600x600';
  const categoryColors: Record<string, string> = {
    laptop: '2563eb', // blue
    smartphone: 'ea580c', // orange
    audio: 'dc2626', // red
    wearable: '16a34a', // green
    accessory: '9333ea', // purple
  };
  
  const color = categoryColors[category.toLowerCase()] || '6366f1';
  const text = category.charAt(0).toUpperCase() + category.slice(1);
  
  return `${baseUrl}/${color}/ffffff?text=${text}+${index + 1}`;
}
