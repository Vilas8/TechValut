import { useState } from 'react';
import { useLocation } from 'wouter';
import { Zap, Grid, List } from 'lucide-react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

// Real products data with slugs and images
const PRODUCTS = [
  { id: 1, name: 'MacBook Pro 16"', slug: 'macbook-pro-16', price: 249900, originalPrice: 299900, category: 'Laptops', rating: 4.8, reviews: 342, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/wVEtjEqxIBaKourD.png' },
  { id: 2, name: 'Dell XPS 15', slug: 'dell-xps-15', price: 189900, originalPrice: 229900, category: 'Laptops', rating: 4.7, reviews: 298, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/yUthukxxpqnlZrsE.png' },
  { id: 3, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', price: 159900, originalPrice: 179900, category: 'Smartphones', rating: 4.9, reviews: 512, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/PEDTHAQjEVxQIkSf.png' },
  { id: 4, name: 'Samsung Galaxy S24', slug: 'samsung-galaxy-s24', price: 129900, originalPrice: 149900, category: 'Smartphones', rating: 4.6, reviews: 287, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/nWKmLGBrzbTNKISn.png' },
  { id: 5, name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5', price: 39900, originalPrice: 49900, category: 'Audio', rating: 4.8, reviews: 623, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/lbIPPOlTeWArjRKW.png' },
  { id: 6, name: 'Bose QuietComfort 45', slug: 'bose-quietcomfort-45', price: 34900, originalPrice: 44900, category: 'Audio', rating: 4.7, reviews: 456, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/RAHWifcxzOSkspNm.png' },
  { id: 7, name: 'Apple Watch Series 9', slug: 'apple-watch-series-9', price: 49900, originalPrice: 59900, category: 'Wearables', rating: 4.8, reviews: 389, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/xzOPweGiTciyybIN.png' },
  { id: 8, name: 'Samsung Galaxy Watch 6', slug: 'samsung-galaxy-watch-6', price: 39900, originalPrice: 49900, category: 'Wearables', rating: 4.5, reviews: 267, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/IPIEIiJHiQBKCXvD.png' },
  { id: 9, name: 'USB-C Hub Pro', slug: 'usb-c-hub-pro', price: 8990, originalPrice: 12990, category: 'Accessories', rating: 4.6, reviews: 178, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/DnhogxHIoQuaIqxg.png' },
  { id: 10, name: 'Wireless Charging Pad', slug: 'wireless-charging-pad', price: 4990, originalPrice: 7990, category: 'Accessories', rating: 4.4, reviews: 234, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/VmoxzJQuoBYFaQBe.png' },
  { id: 11, name: 'Lenovo ThinkPad X1', slug: 'lenovo-thinkpad-x1', price: 169900, originalPrice: 199900, category: 'Laptops', rating: 4.7, reviews: 321, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/GhWQecoDbVhWVQnT.png' },
  { id: 12, name: 'Google Pixel 8 Pro', slug: 'google-pixel-8-pro', price: 139900, originalPrice: 159900, category: 'Smartphones', rating: 4.8, reviews: 445, image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/wlRbBFzTMjRWgUBH.png' },
];

const CATEGORIES = [
  { id: 1, name: 'Laptops', slug: 'laptops' },
  { id: 2, name: 'Smartphones', slug: 'smartphones' },
  { id: 3, name: 'Audio', slug: 'audio' },
  { id: 4, name: 'Wearables', slug: 'wearables' },
  { id: 5, name: 'Accessories', slug: 'accessories' },
];

export default function Products() {
  const [location] = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Products</h1>
          <p className="text-foreground/60">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Browse our collection of premium electronics'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    !selectedCategory
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-secondary text-foreground/70'
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name.toLowerCase())}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name.toLowerCase()
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-secondary text-foreground/70'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Price Range</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground/70">Under ₹50,000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground/70">₹50,000 - ₹100,000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground/70">₹100,000 - ₹200,000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground/70">Over ₹200,000</span>
                </label>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-foreground/70">{rating}★ & up</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 p-4 bg-card border border-border rounded-lg">
              <span className="text-sm text-foreground/60">
                Showing {sortedProducts.length} products
              </span>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-accent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-secondary text-foreground/70'
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-secondary text-foreground/70'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group card-hover p-6 bg-card border border-border rounded-xl transition-all ${
                      viewMode === 'list' ? 'flex gap-6' : ''
                    }`}
                  >
                    <a href={`/product/${product.slug}`} className="block">
                      <div
                        className={`bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors ${
                          viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'mb-4'
                        }`}
                        style={viewMode === 'list' ? {} : { aspectRatio: '1' }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>

                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <div className="text-sm text-accent font-medium mb-2">
                        {product.category}
                      </div>
                      <a href={`/product/${product.slug}`} className="hover:text-accent transition-colors">
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                      </a>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-foreground/60">
                          ★ {product.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-foreground/60">
                          ({product.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-accent">
                            ₹{(product.price / 100).toFixed(0)}
                          </div>
                          {product.originalPrice > product.price && (
                            <div className="text-sm line-through text-foreground/50">
                              ₹{(product.originalPrice / 100).toFixed(0)}
                            </div>
                          )}
                        </div>
                        <a href={`/product/${product.slug}`}>
                          <Button className="btn-primary py-2 px-4">
                            {viewMode === 'list' ? 'View Details' : 'View'}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <Zap size={48} className="text-foreground/20 mx-auto" />
                <p className="text-foreground/60">No products found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
