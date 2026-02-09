import { useState } from 'react';
import { useLocation } from 'wouter';
import { Star, ShoppingCart, Heart, Share2, Zap } from 'lucide-react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specifications: string;
  rating: number;
  reviewCount: number;
  stock: number;
  category: {
    name: string;
  };
}

export default function ProductDetail() {
  const [location] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  // Extract slug from URL
  const slug = location.split('/').pop() || '';

  // Mock product data - in a real app, this would come from tRPC
  const mockProducts: Record<string, Product> = {
    'macbook-pro-16-m3-max': {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      price: 349900,
      originalPrice: 399900,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      description: 'Powerful laptop with M3 Max chip, 16GB RAM, 512GB SSD. Perfect for professionals and creatives.',
      specifications: JSON.stringify({
        processor: 'Apple M3 Max',
        ram: '16GB Unified Memory',
        storage: '512GB SSD',
        display: '16-inch Liquid Retina XDR',
        battery: '17 hours',
        weight: '2.15 kg',
        ports: 'Thunderbolt 4, HDMI, SD Card',
        os: 'macOS Sonoma',
      }),
      rating: 48,
      reviewCount: 324,
      stock: 15,
      category: { name: 'Laptops' },
    },
    'iphone-15-pro-max': {
      id: 2,
      name: 'iPhone 15 Pro Max',
      price: 119900,
      originalPrice: 129900,
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&h=600&fit=crop',
      description: 'Latest iPhone with A17 Pro chip, 48MP camera, titanium design. 256GB storage.',
      specifications: JSON.stringify({
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        display: '6.7-inch Super Retina XDR',
        camera: '48MP Main + 12MP Ultra Wide',
        battery: '3582 mAh',
        os: 'iOS 17',
        colors: 'Titanium Black, White, Blue, Natural',
      }),
      rating: 49,
      reviewCount: 512,
      stock: 25,
      category: { name: 'Smartphones' },
    },
    'sony-wh-1000xm5': {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 39900,
      originalPrice: 44900,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      description: 'Premium noise-canceling headphones with 30-hour battery life.',
      specifications: JSON.stringify({
        type: 'Over-ear Headphones',
        driver: '40mm',
        frequency: '4Hz - 40kHz',
        impedance: '16 Ohms',
        battery: '30 hours',
        weight: '250g',
        connectivity: 'Bluetooth 5.3',
        features: 'ANC, Ambient Mode, Multipoint Connection',
      }),
      rating: 48,
      reviewCount: 678,
      stock: 30,
      category: { name: 'Audio' },
    },
  };

  const product = mockProducts[slug];

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavigationHeader />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-foreground/60 mb-6">The product you're looking for doesn't exist.</p>
          <Button className="btn-primary">
            <a href="/products">Back to Products</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const specifications = JSON.parse(product.specifications);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const reviews = [
    {
      author: 'John Smith',
      rating: 5,
      title: 'Excellent product!',
      content: 'This product exceeded my expectations. Great quality and fast shipping.',
      date: '2 weeks ago',
    },
    {
      author: 'Sarah Johnson',
      rating: 5,
      title: 'Highly recommended',
      content: 'Amazing performance and build quality. Worth every penny.',
      date: '1 month ago',
    },
    {
      author: 'Mike Chen',
      rating: 4,
      title: 'Very good',
      content: 'Great product overall. Minor issues but nothing major.',
      date: '1 month ago',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
          <a href="/" className="hover:text-accent transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-accent transition-colors">Products</a>
          <span>/</span>
          <a href={`/products?category=${product.category.name.toLowerCase()}`} className="hover:text-accent transition-colors">
            {product.category.name}
          </a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-lg font-semibold text-sm">
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-accent font-medium mb-2">{product.category.name}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-foreground/70">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.round(product.rating / 10) ? 'fill-accent text-accent' : 'text-foreground/20'}
                  />
                ))}
              </div>
              <span className="text-sm text-foreground/60">
                {(product.rating / 10).toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-accent">
                  ₹{(product.price / 100).toFixed(0)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl line-through text-foreground/50">
                    ₹{(product.originalPrice / 100).toFixed(0)}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground/60">Free shipping on this item</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 10 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground/70">In stock ({product.stock} available)</span>
                </>
              ) : product.stock > 0 ? (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-foreground/70">Limited stock ({product.stock} available)</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-foreground/70">Out of stock</span>
                </>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category.name,
                      });
                    }
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 2000);
                  }}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? 'fill-accent text-accent' : 'text-foreground/70'}
                  />
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Share2 size={20} className="text-foreground/70" />
                </button>
              </div>
            </div>

            {/* Key Features */}
            <div className="p-4 bg-card border border-border rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Zap size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Fast Delivery</p>
                  <p className="text-sm text-foreground/60">Free shipping on orders over ₹50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">30-Day Returns</p>
                  <p className="text-sm text-foreground/60">Money-back guarantee if not satisfied</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-card border border-border rounded-xl">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm text-foreground/60 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="font-semibold text-foreground">{String(value)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-6 bg-card border border-border rounded-xl space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{review.author}</p>
                    <p className="text-sm text-foreground/60">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'fill-accent text-accent' : 'text-foreground/20'}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">{review.title}</p>
                  <p className="text-foreground/70">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group card-hover p-6 bg-card border border-border rounded-xl">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                  <Zap size={48} className="text-accent/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Related Product {item}</h3>
                <p className="text-foreground/60 text-sm mb-4">High-performance technology</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">₹999</span>
                  <Button className="btn-primary py-2 px-4">View</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
