import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Laptop, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'wouter';

export default function Laptops() {
  const filters = [
    { name: 'All Laptops', count: 245 },
    { name: 'Gaming', count: 78 },
    { name: 'Business', count: 92 },
    { name: 'Ultrabooks', count: 45 },
    { name: '2-in-1', count: 30 },
  ];

  const brands = ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Razer'];
  const priceRanges = [
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $1500', min: 1000, max: 1500 },
    { label: '$1500 - $2000', min: 1500, max: 2000 },
    { label: 'Over $2000', min: 2000, max: 99999 },
  ];

  const features = [
    'Intel Core i5',
    'Intel Core i7',
    'AMD Ryzen 5',
    'AMD Ryzen 7',
    '16GB RAM',
    '32GB RAM',
    'SSD 512GB+',
    'Dedicated GPU',
    '4K Display',
    'Touchscreen',
  ];

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
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter size={20} className="text-accent" />
                  <h2 className="font-semibold text-lg">Filters</h2>
                </div>

                {/* Category Filters */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Category</h3>
                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <label key={filter.name} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="flex-1 group-hover:text-accent transition-colors">{filter.name}</span>
                        <span className="text-sm text-foreground/40">({filter.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filters */}
                <div className="space-y-4 mb-8 pt-6 border-t border-border">
                  <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="group-hover:text-accent transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4 mb-8 pt-6 border-t border-border">
                  <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="price" className="rounded-full border-border" />
                        <span className="group-hover:text-accent transition-colors">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Features</h3>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm group-hover:text-accent transition-colors">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full btn-outline mt-6">
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3 space-y-6">
              {/* Sorting & View Options */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-foreground/60">
                  Showing <span className="font-semibold text-foreground">245</span> laptops
                </p>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-foreground/60">Sort by:</label>
                  <select className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Sample Product Cards */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                      <Laptop size={64} className="text-accent/30 group-hover:text-accent/50 transition-colors" />
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-accent transition-colors">
                        Premium Laptop Model {i}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-2">
                        Intel Core i7, 16GB RAM, 512GB SSD, NVIDIA RTX Graphics
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-accent">
                            ${(999 + i * 200).toLocaleString()}
                          </div>
                          <div className="text-xs text-foreground/40 line-through">
                            ${(1299 + i * 200).toLocaleString()}
                          </div>
                        </div>
                        <button className="btn-primary px-4 py-2 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 pt-8">
                <button className="px-4 py-2 border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      page === 1
                        ? 'bg-accent text-white border-accent'
                        : 'border-border hover:border-accent hover:text-accent'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
