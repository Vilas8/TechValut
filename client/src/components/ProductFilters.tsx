import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface ProductFiltersProps {
  categories?: FilterOption[];
  brands?: FilterOption[];
  priceRanges?: PriceRange[];
  features?: FilterOption[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPriceRange: string | null;
  selectedFeatures: string[];
  onCategoryChange: (categories: string[]) => void;
  onBrandChange: (brands: string[]) => void;
  onPriceRangeChange: (range: string | null) => void;
  onFeatureChange: (features: string[]) => void;
  onReset: () => void;
}

export function ProductFilters({
  categories = [],
  brands = [],
  priceRanges = [],
  features = [],
  selectedCategories,
  selectedBrands,
  selectedPriceRange,
  selectedFeatures,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onFeatureChange,
  onReset,
}: ProductFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleCategoryToggle = (value: string) => {
    const newCategories = selectedCategories.includes(value)
      ? selectedCategories.filter(c => c !== value)
      : [...selectedCategories, value];
    onCategoryChange(newCategories);
  };

  const handleBrandToggle = (value: string) => {
    const newBrands = selectedBrands.includes(value)
      ? selectedBrands.filter(b => b !== value)
      : [...selectedBrands, value];
    onBrandChange(newBrands);
  };

  const handleFeatureToggle = (value: string) => {
    const newFeatures = selectedFeatures.includes(value)
      ? selectedFeatures.filter(f => f !== value)
      : [...selectedFeatures, value];
    onFeatureChange(newFeatures);
  };

  const activeFilterCount = 
    selectedCategories.length + 
    selectedBrands.length + 
    selectedFeatures.length + 
    (selectedPriceRange ? 1 : 0);

  const FiltersContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-accent" />
          <h2 className="font-semibold text-lg">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {showMobileFilters && (
          <button
            onClick={() => setShowMobileFilters(false)}
            className="lg:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Category</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <label key={category.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryToggle(category.value)}
                  className="rounded border-border accent-accent"
                />
                <span className="flex-1 group-hover:text-accent transition-colors">{category.label}</span>
                {category.count !== undefined && (
                  <span className="text-sm text-foreground/40">({category.count})</span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filters */}
      {brands.length > 0 && (
        <div className="space-y-4 mb-8 pt-6 border-t border-border">
          <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Brands</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.value)}
                  onChange={() => handleBrandToggle(brand.value)}
                  className="rounded border-border accent-accent"
                />
                <span className="group-hover:text-accent transition-colors">{brand.label}</span>
                {brand.count !== undefined && (
                  <span className="text-sm text-foreground/40">({brand.count})</span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      {priceRanges.length > 0 && (
        <div className="space-y-4 mb-8 pt-6 border-t border-border">
          <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRange === range.label}
                  onChange={() => onPriceRangeChange(range.label)}
                  className="border-border accent-accent"
                />
                <span className="group-hover:text-accent transition-colors">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="font-medium text-sm text-foreground/60 uppercase tracking-wide">Features</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {features.map((feature) => (
              <label key={feature.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.value)}
                  onChange={() => handleFeatureToggle(feature.value)}
                  className="rounded border-border accent-accent"
                />
                <span className="text-sm group-hover:text-accent transition-colors">{feature.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={onReset}
        disabled={activeFilterCount === 0}
        className="w-full btn-outline mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset Filters
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-accent text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <Filter size={24} />
        {activeFilterCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Desktop Filters */}
      <aside className="hidden lg:block lg:col-span-1 space-y-6">
        <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
          <FiltersContent />
        </div>
      </aside>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border shadow-xl overflow-y-auto">
            <div className="p-6">
              <FiltersContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
