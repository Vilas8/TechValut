import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductCard, getPlaceholderImage } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { Package, ChevronRight, Grid, List } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  features: string[];
  inStock: boolean;
  featured: boolean;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Anker PowerCore 20000mAh Power Bank', slug: 'anker-powercore-20000', price: 3999, originalPrice: 4999, rating: 4.7, reviews: 2345, brand: 'Anker', category: 'Power Banks', features: ['20000mAh', 'Fast Charging', 'USB-C'], inStock: true, featured: true },
  { id: 2, name: 'Belkin USB-C Hub 7-in-1', slug: 'belkin-usb-c-hub', price: 5999, rating: 4.6, reviews: 876, brand: 'Belkin', category: 'USB Hubs', features: ['USB-C', 'HDMI', '7 Ports'], inStock: true, featured: true },
  { id: 3, name: 'Logitech MX Master 3S Wireless Mouse', slug: 'logitech-mx-master-3s', price: 9999, originalPrice: 11999, rating: 4.8, reviews: 3456, brand: 'Logitech', category: 'Mouse', features: ['Wireless', 'Ergonomic', 'Rechargeable'], inStock: true, featured: true },
  { id: 4, name: 'SanDisk Extreme Pro 1TB SSD', slug: 'sandisk-extreme-pro-1tb', price: 14999, rating: 4.7, reviews: 1234, brand: 'SanDisk', category: 'Storage', features: ['1TB', 'Portable', 'Fast Transfer'], inStock: true, featured: false },
  { id: 5, name: 'Apple Magic Keyboard', slug: 'apple-magic-keyboard', price: 12999, originalPrice: 14999, rating: 4.5, reviews: 654, brand: 'Apple', category: 'Keyboards', features: ['Wireless', 'Rechargeable'], inStock: true, featured: false },
  { id: 6, name: 'Samsung T7 Shield 2TB Portable SSD', slug: 'samsung-t7-shield-2tb', price: 22999, rating: 4.8, reviews: 987, brand: 'Samsung', category: 'Storage', features: ['2TB', 'Rugged', 'USB-C'], inStock: true, featured: false },
  { id: 7, name: 'Razer DeathAdder V3 Gaming Mouse', slug: 'razer-deathadder-v3', price: 7999, originalPrice: 9999, rating: 4.6, reviews: 1567, brand: 'Razer', category: 'Mouse', features: ['Gaming', 'RGB', 'Ergonomic'], inStock: true, featured: false },
  { id: 8, name: 'Keychron K2 Mechanical Keyboard', slug: 'keychron-k2', price: 8999, rating: 4.7, reviews: 2345, brand: 'Keychron', category: 'Keyboards', features: ['Mechanical', 'Wireless', 'RGB'], inStock: true, featured: false },
  { id: 9, name: 'Baseus 100W GaN Charger', slug: 'baseus-100w-gan', price: 3499, originalPrice: 3999, rating: 4.5, reviews: 1876, brand: 'Baseus', category: 'Chargers', features: ['100W', 'GaN', 'Multi-Port'], inStock: true, featured: false },
  { id: 10, name: 'Spigen Laptop Stand', slug: 'spigen-laptop-stand', price: 2499, rating: 4.4, reviews: 876, brand: 'Spigen', category: 'Stands', features: ['Adjustable', 'Portable', 'Aluminum'], inStock: true, featured: false },
  { id: 11, name: 'Cable Matters USB-C Cable 3-Pack', slug: 'cable-matters-usbc-3pack', price: 1499, originalPrice: 1999, rating: 4.3, reviews: 3456, brand: 'Cable Matters', category: 'Cables', features: ['USB-C', 'Fast Charging', '3-Pack'], inStock: true, featured: false },
  { id: 12, name: 'Seagate Backup Plus 5TB External HDD', slug: 'seagate-backup-5tb', price: 12999, rating: 4.6, reviews: 1234, brand: 'Seagate', category: 'Storage', features: ['5TB', 'USB 3.0', 'Backup Software'], inStock: false, featured: false },
];

export default function Accessories() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const itemsPerPage = 12;

  const categories = [
    { value: 'Power Banks', label: 'Power Banks', count: 156 },
    { value: 'USB Hubs', label: 'USB Hubs', count: 89 },
    { value: 'Mouse', label: 'Mouse', count: 234 },
    { value: 'Keyboards', label: 'Keyboards', count: 178 },
    { value: 'Storage', label: 'Storage', count: 267 },
    { value: 'Chargers', label: 'Chargers', count: 145 },
    { value: 'Stands', label: 'Stands', count: 67 },
    { value: 'Cables', label: 'Cables', count: 234 },
  ];

  const brands = [
    { value: 'Anker', label: 'Anker' },
    { value: 'Belkin', label: 'Belkin' },
    { value: 'Logitech', label: 'Logitech' },
    { value: 'SanDisk', label: 'SanDisk' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Razer', label: 'Razer' },
    { value: 'Keychron', label: 'Keychron' },
    { value: 'Baseus', label: 'Baseus' },
    { value: 'Spigen', label: 'Spigen' },
    { value: 'Cable Matters', label: 'Cable Matters' },
    { value: 'Seagate', label: 'Seagate' },
  ];

  const priceRanges = [
    { label: 'Under ₹2,000', min: 0, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: 'Over ₹20,000', min: 20000, max: 9999999 },
  ];

  const features = [
    { value: 'Wireless', label: 'Wireless' },
    { value: 'USB-C', label: 'USB-C' },
    { value: 'Fast Charging', label: 'Fast Charging' },
    { value: 'Portable', label: 'Portable' },
    { value: 'Rechargeable', label: 'Rechargeable' },
    { value: 'RGB', label: 'RGB Lighting' },
    { value: 'Gaming', label: 'Gaming' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;
    if (selectedCategories.length > 0) filtered = filtered.filter(p => selectedCategories.includes(p.category));
    if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
    }
    if (selectedFeatures.length > 0) filtered = filtered.filter(p => selectedFeatures.every(f => p.features.includes(f)));

    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'popular': filtered.sort((a, b) => b.reviews - a.reviews); break;
      default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return filtered;
  }, [selectedCategories, selectedBrands, selectedPriceRange, selectedFeatures, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <Link href="/products">Products</Link>
              <ChevronRight size={16} />
              <span className="text-foreground">Accessories</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Package size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Accessories</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Complete your tech setup with essential accessories for productivity and convenience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProductFilters
              categories={categories}
              brands={brands}
              priceRanges={priceRanges}
              features={features}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              selectedPriceRange={selectedPriceRange}
              selectedFeatures={selectedFeatures}
              onCategoryChange={setSelectedCategories}
              onBrandChange={setSelectedBrands}
              onPriceRangeChange={setSelectedPriceRange}
              onFeatureChange={setSelectedFeatures}
              onReset={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setSelectedPriceRange(null);
                setSelectedFeatures([]);
                setCurrentPage(1);
              }}
            />

            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <p className="text-foreground/60">
                  <span className="font-semibold text-foreground">{filteredProducts.length}</span> products found
                </p>
                <div className="flex items-center gap-4">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <div className="hidden sm:flex items-center gap-2 p-1 bg-card border border-border rounded-lg">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}>
                      <Grid size={18} />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}>
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {currentProducts.length > 0 ? (
                <>
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {currentProducts.map((product, index) => (
                      <ProductCard key={product.id} {...product} image={getPlaceholderImage('accessory', (currentPage - 1) * itemsPerPage + index)} />
                    ))}
                  </div>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} itemsPerPage={itemsPerPage} totalItems={filteredProducts.length} />
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-foreground/60 mb-4">No products found</p>
                  <button onClick={() => { setSelectedCategories([]); setSelectedBrands([]); setSelectedPriceRange(null); setSelectedFeatures([]); }} className="btn-primary">Clear Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
