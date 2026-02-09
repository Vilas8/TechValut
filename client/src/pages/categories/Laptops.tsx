import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductCard, getPlaceholderImage } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { Laptop, ChevronRight, Grid, List } from 'lucide-react';
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
  { id: 1, name: 'Dell XPS 15 9520 - Intel Core i7-12700H', slug: 'dell-xps-15-9520', price: 149999, originalPrice: 174999, rating: 4.8, reviews: 234, brand: 'Dell', category: 'Ultrabooks', features: ['Intel Core i7', '16GB RAM', 'SSD 512GB+', '4K Display'], inStock: true, featured: true },
  { id: 2, name: 'MacBook Pro 16" M3 Pro', slug: 'macbook-pro-16-m3', price: 249999, originalPrice: 269999, rating: 4.9, reviews: 567, brand: 'Apple', category: 'Business', features: ['32GB RAM', 'SSD 512GB+', '4K Display'], inStock: true, featured: true },
  { id: 3, name: 'ASUS ROG Strix G16 - RTX 4070', slug: 'asus-rog-strix-g16', price: 169999, originalPrice: 189999, rating: 4.7, reviews: 189, brand: 'ASUS', category: 'Gaming', features: ['Intel Core i7', '16GB RAM', 'Dedicated GPU', 'SSD 512GB+'], inStock: true, featured: false },
  { id: 4, name: 'HP Spectre x360 14 2-in-1', slug: 'hp-spectre-x360-14', price: 134999, rating: 4.6, reviews: 145, brand: 'HP', category: '2-in-1', features: ['Intel Core i7', '16GB RAM', 'Touchscreen', 'SSD 512GB+'], inStock: true, featured: false },
  { id: 5, name: 'Lenovo ThinkPad X1 Carbon Gen 11', slug: 'lenovo-thinkpad-x1', price: 139999, originalPrice: 159999, rating: 4.8, reviews: 312, brand: 'Lenovo', category: 'Business', features: ['Intel Core i7', '16GB RAM', 'SSD 512GB+'], inStock: true, featured: false },
  { id: 6, name: 'MSI Raider GE78HX - RTX 4090', slug: 'msi-raider-ge78hx', price: 349999, rating: 4.9, reviews: 98, brand: 'MSI', category: 'Gaming', features: ['Intel Core i9', '32GB RAM', 'Dedicated GPU', 'SSD 512GB+', '4K Display'], inStock: true, featured: true },
  { id: 7, name: 'Acer Swift 3 - AMD Ryzen 7', slug: 'acer-swift-3-ryzen7', price: 64999, originalPrice: 74999, rating: 4.4, reviews: 276, brand: 'Acer', category: 'Ultrabooks', features: ['AMD Ryzen 7', '16GB RAM', 'SSD 512GB+'], inStock: true, featured: false },
  { id: 8, name: 'Razer Blade 15 Advanced - RTX 4080', slug: 'razer-blade-15', price: 299999, rating: 4.7, reviews: 156, brand: 'Razer', category: 'Gaming', features: ['Intel Core i9', '32GB RAM', 'Dedicated GPU', '4K Display'], inStock: false, featured: false },
  { id: 9, name: 'HP Pavilion Plus 14 - Intel Core i5', slug: 'hp-pavilion-plus-14', price: 74999, originalPrice: 84999, rating: 4.3, reviews: 412, brand: 'HP', category: 'All Laptops', features: ['Intel Core i5', '16GB RAM', 'SSD 512GB+'], inStock: true, featured: false },
  { id: 10, name: 'Dell Inspiron 16 Plus', slug: 'dell-inspiron-16-plus', price: 94999, rating: 4.5, reviews: 234, brand: 'Dell', category: 'All Laptops', features: ['Intel Core i7', '16GB RAM', 'Dedicated GPU'], inStock: true, featured: false },
  { id: 11, name: 'ASUS ZenBook 14 OLED', slug: 'asus-zenbook-14-oled', price: 89999, originalPrice: 99999, rating: 4.6, reviews: 189, brand: 'ASUS', category: 'Ultrabooks', features: ['Intel Core i7', '16GB RAM', 'SSD 512GB+', 'Touchscreen'], inStock: true, featured: false },
  { id: 12, name: 'Lenovo Yoga 9i 2-in-1', slug: 'lenovo-yoga-9i', price: 124999, rating: 4.7, reviews: 145, brand: 'Lenovo', category: '2-in-1', features: ['Intel Core i7', '16GB RAM', 'Touchscreen', 'SSD 512GB+'], inStock: true, featured: false },
];

export default function Laptops() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const itemsPerPage = 9;

  // Filter configurations
  const categories = [
    { value: 'All Laptops', label: 'All Laptops', count: 245 },
    { value: 'Gaming', label: 'Gaming', count: 78 },
    { value: 'Business', label: 'Business', count: 92 },
    { value: 'Ultrabooks', label: 'Ultrabooks', count: 45 },
    { value: '2-in-1', label: '2-in-1', count: 30 },
  ];

  const brands = [
    { value: 'Apple', label: 'Apple' },
    { value: 'Dell', label: 'Dell' },
    { value: 'HP', label: 'HP' },
    { value: 'Lenovo', label: 'Lenovo' },
    { value: 'ASUS', label: 'ASUS' },
    { value: 'Acer', label: 'Acer' },
    { value: 'MSI', label: 'MSI' },
    { value: 'Razer', label: 'Razer' },
  ];

  const priceRanges = [
    { label: 'Under ₹50,000', min: 0, max: 50000 },
    { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
    { label: '₹1,00,000 - ₹1,50,000', min: 100000, max: 150000 },
    { label: '₹1,50,000 - ₹2,00,000', min: 150000, max: 200000 },
    { label: 'Over ₹2,00,000', min: 200000, max: 9999999 },
  ];

  const features = [
    { value: 'Intel Core i5', label: 'Intel Core i5' },
    { value: 'Intel Core i7', label: 'Intel Core i7' },
    { value: 'Intel Core i9', label: 'Intel Core i9' },
    { value: 'AMD Ryzen 5', label: 'AMD Ryzen 5' },
    { value: 'AMD Ryzen 7', label: 'AMD Ryzen 7' },
    { value: '16GB RAM', label: '16GB RAM' },
    { value: '32GB RAM', label: '32GB RAM' },
    { value: 'SSD 512GB+', label: 'SSD 512GB+' },
    { value: 'Dedicated GPU', label: 'Dedicated GPU' },
    { value: '4K Display', label: '4K Display' },
    { value: 'Touchscreen', label: 'Touchscreen' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Apply price range filter
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Apply features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(p => 
        selectedFeatures.every(feature => p.features.includes(feature))
      );
    }

    // Apply sorting
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
              <span className="text-foreground">Laptops</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Laptop size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Laptops</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Discover our premium collection of laptops for work, gaming, and creativity. 
              From ultraportable ultrabooks to powerful gaming machines.
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
                  {/* Sort */}
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

                  {/* View Mode */}
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
                        image={getPlaceholderImage('laptop', startIndex + index)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
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
