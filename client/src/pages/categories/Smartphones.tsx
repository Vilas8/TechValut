import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductCard, getPlaceholderImage } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { Smartphone, ChevronRight, Grid, List } from 'lucide-react';
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

// Mock product data with INR pricing
const mockProducts: Product[] = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', slug: 'iphone-15-pro-max', price: 159900, originalPrice: 169900, rating: 4.9, reviews: 1234, brand: 'Apple', category: 'Flagship', features: ['5G', '256GB Storage', 'Pro Camera', '120Hz Display'], inStock: true, featured: true },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-s24-ultra', price: 129999, originalPrice: 149999, rating: 4.8, reviews: 987, brand: 'Samsung', category: 'Flagship', features: ['5G', '256GB Storage', 'Pro Camera', '120Hz Display', 'Fast Charging'], inStock: true, featured: true },
  { id: 3, name: 'Google Pixel 8 Pro', slug: 'google-pixel-8-pro', price: 106999, rating: 4.7, reviews: 654, brand: 'Google', category: 'Flagship', features: ['5G', '256GB Storage', 'Pro Camera', '120Hz Display'], inStock: true, featured: true },
  { id: 4, name: 'OnePlus 12 5G', slug: 'oneplus-12', price: 64999, originalPrice: 69999, rating: 4.6, reviews: 543, brand: 'OnePlus', category: 'Mid-Range', features: ['5G', '256GB Storage', '120Hz Display', 'Fast Charging'], inStock: true, featured: false },
  { id: 5, name: 'Xiaomi 14 Pro', slug: 'xiaomi-14-pro', price: 54999, rating: 4.5, reviews: 432, brand: 'Xiaomi', category: 'Mid-Range', features: ['5G', '256GB Storage', 'Pro Camera', 'Fast Charging'], inStock: true, featured: false },
  { id: 6, name: 'Vivo X100 Pro', slug: 'vivo-x100-pro', price: 89999, originalPrice: 94999, rating: 4.7, reviews: 321, brand: 'Vivo', category: 'Flagship', features: ['5G', '256GB Storage', 'Pro Camera', '120Hz Display'], inStock: true, featured: false },
  { id: 7, name: 'Oppo Find X7 Ultra', slug: 'oppo-find-x7', price: 99999, rating: 4.6, reviews: 234, brand: 'Oppo', category: 'Flagship', features: ['5G', '512GB Storage', 'Pro Camera', '120Hz Display'], inStock: true, featured: false },
  { id: 8, name: 'Realme GT 5 Pro', slug: 'realme-gt-5-pro', price: 44999, originalPrice: 49999, rating: 4.4, reviews: 567, brand: 'Realme', category: 'Mid-Range', features: ['5G', '256GB Storage', '120Hz Display', 'Fast Charging'], inStock: true, featured: false },
  { id: 9, name: 'Nothing Phone (2)', slug: 'nothing-phone-2', price: 39999, rating: 4.3, reviews: 789, brand: 'Nothing', category: 'Mid-Range', features: ['5G', '256GB Storage', '120Hz Display'], inStock: true, featured: false },
  { id: 10, name: 'Motorola Edge 50 Ultra', slug: 'motorola-edge-50', price: 59999, originalPrice: 64999, rating: 4.5, reviews: 345, brand: 'Motorola', category: 'Mid-Range', features: ['5G', '256GB Storage', 'Pro Camera', '144Hz Display'], inStock: false, featured: false },
  { id: 11, name: 'ASUS ROG Phone 8 Pro', slug: 'asus-rog-phone-8', price: 99999, rating: 4.8, reviews: 456, brand: 'ASUS', category: 'Gaming', features: ['5G', '512GB Storage', '165Hz Display', 'Fast Charging'], inStock: true, featured: false },
  { id: 12, name: 'Samsung Galaxy Z Fold 6', slug: 'samsung-z-fold-6', price: 164999, originalPrice: 179999, rating: 4.6, reviews: 234, brand: 'Samsung', category: 'Foldable', features: ['5G', '512GB Storage', '120Hz Display', 'Pro Camera'], inStock: true, featured: true },
  { id: 13, name: 'iPhone 14 128GB', slug: 'iphone-14', price: 69900, originalPrice: 79900, rating: 4.7, reviews: 1567, brand: 'Apple', category: 'Mid-Range', features: ['5G', '128GB Storage', 'Pro Camera'], inStock: true, featured: false },
  { id: 14, name: 'Poco F6 Pro 5G', slug: 'poco-f6-pro', price: 29999, originalPrice: 34999, rating: 4.4, reviews: 892, brand: 'Poco', category: 'Budget', features: ['5G', '256GB Storage', '120Hz Display', 'Fast Charging'], inStock: true, featured: false },
  { id: 15, name: 'iQOO 12 5G', slug: 'iqoo-12', price: 52999, rating: 4.5, reviews: 467, brand: 'iQOO', category: 'Gaming', features: ['5G', '256GB Storage', '144Hz Display', 'Fast Charging'], inStock: true, featured: false },
];

export default function Smartphones() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const itemsPerPage = 12;

  // Filter configurations
  const categories = [
    { value: 'Flagship', label: 'Flagship', count: 156 },
    { value: 'Mid-Range', label: 'Mid-Range', count: 234 },
    { value: 'Budget', label: 'Budget', count: 189 },
    { value: 'Gaming', label: 'Gaming', count: 45 },
    { value: 'Foldable', label: 'Foldable', count: 23 },
  ];

  const brands = [
    { value: 'Apple', label: 'Apple' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Google', label: 'Google' },
    { value: 'OnePlus', label: 'OnePlus' },
    { value: 'Xiaomi', label: 'Xiaomi' },
    { value: 'Vivo', label: 'Vivo' },
    { value: 'Oppo', label: 'Oppo' },
    { value: 'Realme', label: 'Realme' },
    { value: 'Nothing', label: 'Nothing' },
    { value: 'Motorola', label: 'Motorola' },
    { value: 'ASUS', label: 'ASUS' },
    { value: 'Poco', label: 'Poco' },
    { value: 'iQOO', label: 'iQOO' },
  ];

  const priceRanges = [
    { label: 'Under ₹30,000', min: 0, max: 30000 },
    { label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
    { label: '₹50,000 - ₹80,000', min: 50000, max: 80000 },
    { label: '₹80,000 - ₹1,20,000', min: 80000, max: 120000 },
    { label: 'Over ₹1,20,000', min: 120000, max: 9999999 },
  ];

  const features = [
    { value: '5G', label: '5G' },
    { value: '128GB Storage', label: '128GB Storage' },
    { value: '256GB Storage', label: '256GB Storage' },
    { value: '512GB Storage', label: '512GB Storage' },
    { value: 'Pro Camera', label: 'Pro Camera' },
    { value: '120Hz Display', label: '120Hz Display' },
    { value: '144Hz Display', label: '144Hz Display' },
    { value: '165Hz Display', label: '165Hz Display' },
    { value: 'Fast Charging', label: 'Fast Charging' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(p => 
        selectedFeatures.every(feature => p.features.includes(feature))
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [selectedCategories, selectedBrands, selectedPriceRange, selectedFeatures, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    setSelectedFeatures([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <Link href="/products">Products</Link>
              <ChevronRight size={16} />
              <span className="text-foreground">Smartphones</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Smartphone size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Smartphones</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Explore the latest smartphones with cutting-edge technology, stunning cameras, 
              and powerful performance for every budget.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
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
              onReset={handleReset}
            />

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <p className="text-foreground/60">
                  <span className="font-semibold text-foreground">{filteredProducts.length}</span> products found
                </p>
                
                <div className="flex items-center gap-4">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>

                  <div className="hidden sm:flex items-center gap-2 p-1 bg-card border border-border rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {currentProducts.length > 0 ? (
                <>
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {currentProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        image={getPlaceholderImage('smartphone', startIndex + index)}
                      />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredProducts.length}
                  />
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-foreground/60 mb-4">No products found matching your filters</p>
                  <button onClick={handleReset} className="btn-primary">
                    Clear Filters
                  </button>
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
