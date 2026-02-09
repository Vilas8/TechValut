import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductCard, getPlaceholderImage } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { Headphones, ChevronRight, Grid, List } from 'lucide-react';
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
  { id: 1, name: 'Sony WH-1000XM5 Wireless Headphones', slug: 'sony-wh-1000xm5', price: 29990, originalPrice: 34990, rating: 4.9, reviews: 1567, brand: 'Sony', category: 'Headphones', features: ['ANC', 'Bluetooth', '30H Battery', 'Premium Sound'], inStock: true, featured: true },
  { id: 2, name: 'Apple AirPods Pro 2nd Gen', slug: 'airpods-pro-2', price: 24900, rating: 4.8, reviews: 2345, brand: 'Apple', category: 'TWS Earbuds', features: ['ANC', 'Bluetooth', 'Spatial Audio', 'USB-C'], inStock: true, featured: true },
  { id: 3, name: 'Bose QuietComfort Ultra', slug: 'bose-qc-ultra', price: 32990, originalPrice: 36990, rating: 4.7, reviews: 876, brand: 'Bose', category: 'Headphones', features: ['ANC', 'Bluetooth', '24H Battery', 'Premium Sound'], inStock: true, featured: true },
  { id: 4, name: 'JBL Flip 6 Portable Speaker', slug: 'jbl-flip-6', price: 11999, originalPrice: 13999, rating: 4.6, reviews: 1234, brand: 'JBL', category: 'Speakers', features: ['Bluetooth', 'Waterproof', '12H Battery'], inStock: true, featured: false },
  { id: 5, name: 'Sennheiser Momentum 4 Wireless', slug: 'sennheiser-momentum-4', price: 31990, rating: 4.8, reviews: 543, brand: 'Sennheiser', category: 'Headphones', features: ['ANC', 'Bluetooth', '60H Battery', 'Premium Sound'], inStock: true, featured: false },
  { id: 6, name: 'Samsung Galaxy Buds2 Pro', slug: 'galaxy-buds2-pro', price: 16990, originalPrice: 19990, rating: 4.5, reviews: 987, brand: 'Samsung', category: 'TWS Earbuds', features: ['ANC', 'Bluetooth', 'Spatial Audio'], inStock: true, featured: false },
  { id: 7, name: 'Marshall Kilburn II Speaker', slug: 'marshall-kilburn-2', price: 24999, rating: 4.7, reviews: 432, brand: 'Marshall', category: 'Speakers', features: ['Bluetooth', '20H Battery', 'Premium Sound'], inStock: true, featured: false },
  { id: 8, name: 'Nothing Ear (2)', slug: 'nothing-ear-2', price: 9999, originalPrice: 11999, rating: 4.4, reviews: 1567, brand: 'Nothing', category: 'TWS Earbuds', features: ['ANC', 'Bluetooth', 'Transparency Mode'], inStock: true, featured: false },
  { id: 9, name: 'Audio-Technica ATH-M50xBT2', slug: 'audio-technica-m50xbt2', price: 19990, rating: 4.6, reviews: 765, brand: 'Audio-Technica', category: 'Headphones', features: ['Bluetooth', '50H Battery', 'Studio Sound'], inStock: true, featured: false },
  { id: 10, name: 'Boat Airdopes 800', slug: 'boat-airdopes-800', price: 2999, originalPrice: 3999, rating: 4.2, reviews: 3456, brand: 'Boat', category: 'TWS Earbuds', features: ['Bluetooth', 'IPX7', 'Fast Charging'], inStock: true, featured: false },
  { id: 11, name: 'Sonos Move 2 Speaker', slug: 'sonos-move-2', price: 44999, rating: 4.8, reviews: 234, brand: 'Sonos', category: 'Speakers', features: ['Bluetooth', 'WiFi', '24H Battery', 'Premium Sound'], inStock: false, featured: false },
  { id: 12, name: 'Beats Studio Pro', slug: 'beats-studio-pro', price: 34999, originalPrice: 39999, rating: 4.5, reviews: 876, brand: 'Beats', category: 'Headphones', features: ['ANC', 'Bluetooth', 'Spatial Audio', '40H Battery'], inStock: true, featured: false },
];

export default function Audio() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const itemsPerPage = 9;

  const categories = [
    { value: 'Headphones', label: 'Headphones', count: 156 },
    { value: 'TWS Earbuds', label: 'TWS Earbuds', count: 234 },
    { value: 'Speakers', label: 'Speakers', count: 145 },
    { value: 'Soundbars', label: 'Soundbars', count: 67 },
  ];

  const brands = [
    { value: 'Sony', label: 'Sony' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Bose', label: 'Bose' },
    { value: 'JBL', label: 'JBL' },
    { value: 'Sennheiser', label: 'Sennheiser' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Marshall', label: 'Marshall' },
    { value: 'Nothing', label: 'Nothing' },
    { value: 'Audio-Technica', label: 'Audio-Technica' },
    { value: 'Boat', label: 'Boat' },
    { value: 'Sonos', label: 'Sonos' },
    { value: 'Beats', label: 'Beats' },
  ];

  const priceRanges = [
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
    { label: '₹15,000 - ₹25,000', min: 15000, max: 25000 },
    { label: '₹25,000 - ₹35,000', min: 25000, max: 35000 },
    { label: 'Over ₹35,000', min: 35000, max: 9999999 },
  ];

  const features = [
    { value: 'ANC', label: 'Active Noise Cancellation' },
    { value: 'Bluetooth', label: 'Bluetooth' },
    { value: 'WiFi', label: 'WiFi' },
    { value: 'Spatial Audio', label: 'Spatial Audio' },
    { value: 'Waterproof', label: 'Waterproof' },
    { value: 'IPX7', label: 'IPX7 Rating' },
    { value: 'Premium Sound', label: 'Premium Sound' },
    { value: 'Fast Charging', label: 'Fast Charging' },
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
              <span className="text-foreground">Audio</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Headphones size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Audio</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Immerse yourself in premium sound with our collection of headphones, earbuds, and speakers.
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
                      <ProductCard key={product.id} {...product} image={getPlaceholderImage('audio', (currentPage - 1) * itemsPerPage + index)} />
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
