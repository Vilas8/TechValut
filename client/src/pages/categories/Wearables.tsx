import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductCard, getPlaceholderImage } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { Watch, ChevronRight, Grid, List } from 'lucide-react';
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
  { id: 1, name: 'Apple Watch Ultra 2', slug: 'apple-watch-ultra-2', price: 89900, rating: 4.9, reviews: 876, brand: 'Apple', category: 'Smartwatch', features: ['GPS', 'Heart Rate', 'Sleep Tracking', 'Waterproof'], inStock: true, featured: true },
  { id: 2, name: 'Samsung Galaxy Watch 6 Classic', slug: 'galaxy-watch-6-classic', price: 39999, originalPrice: 44999, rating: 4.7, reviews: 654, brand: 'Samsung', category: 'Smartwatch', features: ['GPS', 'Heart Rate', 'Sleep Tracking'], inStock: true, featured: true },
  { id: 3, name: 'Fitbit Charge 6', slug: 'fitbit-charge-6', price: 14999, originalPrice: 16999, rating: 4.5, reviews: 1234, brand: 'Fitbit', category: 'Fitness Band', features: ['Heart Rate', 'Sleep Tracking', 'Waterproof'], inStock: true, featured: false },
  { id: 4, name: 'Garmin Fenix 7X Pro', slug: 'garmin-fenix-7x-pro', price: 94999, rating: 4.8, reviews: 432, brand: 'Garmin', category: 'Smartwatch', features: ['GPS', 'Heart Rate', 'Sleep Tracking', 'Waterproof', 'Long Battery'], inStock: true, featured: true },
  { id: 5, name: 'Amazfit GTR 4', slug: 'amazfit-gtr-4', price: 18999, originalPrice: 21999, rating: 4.4, reviews: 987, brand: 'Amazfit', category: 'Smartwatch', features: ['GPS', 'Heart Rate', 'Sleep Tracking'], inStock: true, featured: false },
  { id: 6, name: 'Noise ColorFit Pro 5', slug: 'noise-colorfit-pro-5', price: 3999, originalPrice: 4999, rating: 4.2, reviews: 3456, brand: 'Noise', category: 'Smartwatch', features: ['Heart Rate', 'Sleep Tracking'], inStock: true, featured: false },
  { id: 7, name: 'Polar Vantage V3', slug: 'polar-vantage-v3', price: 54999, rating: 4.6, reviews: 234, brand: 'Polar', category: 'Smartwatch', features: ['GPS', 'Heart Rate', 'Sleep Tracking', 'Waterproof'], inStock: true, featured: false },
  { id: 8, name: 'Xiaomi Smart Band 8', slug: 'xiaomi-band-8', price: 2999, originalPrice: 3499, rating: 4.3, reviews: 2345, brand: 'Xiaomi', category: 'Fitness Band', features: ['Heart Rate', 'Sleep Tracking', 'Waterproof'], inStock: true, featured: false },
  { id: 9, name: 'OnePlus Watch 2', slug: 'oneplus-watch-2', price: 24999, originalPrice: 27999, rating: 4.5, reviews: 765, brand: 'OnePlus', category: 'Smartwatch', features: ['GPS', 'Heart Rate', 'Sleep Tracking'], inStock: false, featured: false },
  { id: 10, name: 'Boat Wave Sigma 3', slug: 'boat-wave-sigma-3', price: 4999, rating: 4.1, reviews: 1876, brand: 'Boat', category: 'Smartwatch', features: ['Heart Rate', 'Sleep Tracking'], inStock: true, featured: false },
];

export default function Wearables() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const itemsPerPage = 9;

  const categories = [
    { value: 'Smartwatch', label: 'Smartwatch', count: 234 },
    { value: 'Fitness Band', label: 'Fitness Band', count: 156 },
  ];

  const brands = [
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Fitbit', label: 'Fitbit' },
    { value: 'Garmin', label: 'Garmin' },
    { value: 'Amazfit', label: 'Amazfit' },
    { value: 'Noise', label: 'Noise' },
    { value: 'Polar', label: 'Polar' },
    { value: 'Xiaomi', label: 'Xiaomi' },
    { value: 'OnePlus', label: 'OnePlus' },
    { value: 'Boat', label: 'Boat' },
  ];

  const priceRanges = [
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
    { label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
    { label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
    { label: 'Over ₹50,000', min: 50000, max: 9999999 },
  ];

  const features = [
    { value: 'GPS', label: 'GPS' },
    { value: 'Heart Rate', label: 'Heart Rate Monitor' },
    { value: 'Sleep Tracking', label: 'Sleep Tracking' },
    { value: 'Waterproof', label: 'Waterproof' },
    { value: 'Long Battery', label: 'Long Battery Life' },
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
              <span className="text-foreground">Wearables</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Watch size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Wearables</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Track your fitness and stay connected with our range of smartwatches and fitness bands.
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
                      <ProductCard key={product.id} {...product} image={getPlaceholderImage('wearable', (currentPage - 1) * itemsPerPage + index)} />
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
