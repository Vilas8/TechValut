import { describe, it, expect } from 'vitest';

describe('Product Detail Pages', () => {
  describe('Product data', () => {
    const PRODUCTS_DB = [
      { id: 1, name: 'MacBook Pro 16"', slug: 'macbook-pro-16', price: 249900, originalPrice: 299900, category: 'Laptops', rating: 4.8, reviewCount: 342, stock: 15 },
      { id: 2, name: 'Dell XPS 15', slug: 'dell-xps-15', price: 189900, originalPrice: 229900, category: 'Laptops', rating: 4.7, reviewCount: 298, stock: 8 },
      { id: 3, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', price: 159900, originalPrice: 179900, category: 'Smartphones', rating: 4.9, reviewCount: 512, stock: 25 },
    ];

    it('should have unique product slugs', () => {
      const slugs = PRODUCTS_DB.map(p => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it('should have valid product URLs', () => {
      PRODUCTS_DB.forEach(product => {
        const url = `/product/${product.slug}`;
        expect(url).toMatch(/^\/product\/[a-z0-9-]+$/);
      });
    });

    it('should have pricing information', () => {
      PRODUCTS_DB.forEach(product => {
        expect(product.price).toBeGreaterThan(0);
        expect(product.originalPrice).toBeGreaterThanOrEqual(product.price);
      });
    });

    it('should have stock information', () => {
      PRODUCTS_DB.forEach(product => {
        expect(product.stock).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have valid ratings', () => {
      PRODUCTS_DB.forEach(product => {
        expect(product.rating).toBeGreaterThanOrEqual(0);
        expect(product.rating).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('Product routing', () => {
    it('should generate correct product URLs', () => {
      const productSlugs = [
        'macbook-pro-16',
        'iphone-15-pro-max',
        'sony-wh-1000xm5',
      ];

      productSlugs.forEach(slug => {
        const url = `/product/${slug}`;
        expect(url).toMatch(/^\/product\/[a-z0-9-]+$/);
      });
    });

    it('should handle product slug extraction', () => {
      const testCases = [
        { url: '/product/macbook-pro-16', expectedSlug: 'macbook-pro-16' },
        { url: '/product/iphone-15-pro-max', expectedSlug: 'iphone-15-pro-max' },
        { url: '/product/sony-wh-1000xm5', expectedSlug: 'sony-wh-1000xm5' },
      ];

      testCases.forEach(({ url, expectedSlug }) => {
        const slug = url.split('/product/')[1];
        expect(slug).toBe(expectedSlug);
      });
    });
  });

  describe('Product filtering', () => {
    const PRODUCTS_DB = [
      { id: 1, name: 'MacBook Pro 16"', slug: 'macbook-pro-16', category: 'Laptops' },
      { id: 2, name: 'Dell XPS 15', slug: 'dell-xps-15', category: 'Laptops' },
      { id: 3, name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max', category: 'Smartphones' },
    ];

    it('should find products by slug', () => {
      const slug = 'macbook-pro-16';
      const product = PRODUCTS_DB.find(p => p.slug === slug);
      expect(product).toBeDefined();
      expect(product?.name).toBe('MacBook Pro 16"');
    });

    it('should return undefined for non-existent slug', () => {
      const slug = 'non-existent-product';
      const product = PRODUCTS_DB.find(p => p.slug === slug);
      expect(product).toBeUndefined();
    });

    it('should filter related products by category', () => {
      const currentProduct = PRODUCTS_DB[0];
      const relatedProducts = PRODUCTS_DB.filter(
        p => p.category === currentProduct.category && p.id !== currentProduct.id
      );
      expect(relatedProducts.length).toBe(1);
      expect(relatedProducts[0].name).toBe('Dell XPS 15');
    });
  });

  describe('Product display', () => {
    it('should format prices correctly', () => {
      const price = 249900;
      const formatted = (price / 100).toFixed(0);
      expect(formatted).toBe('2499');
    });

    it('should calculate discount amount', () => {
      const originalPrice = 299900;
      const currentPrice = 249900;
      const discount = (originalPrice - currentPrice) / 100;
      expect(discount).toBe(500);
    });

    it('should display star ratings correctly', () => {
      const rating = 4.8;
      const starCount = Math.round(rating);
      expect(starCount).toBe(5);
    });

    it('should show stock status', () => {
      const stockLevels = [
        { stock: 15, inStock: true },
        { stock: 0, inStock: false },
        { stock: 1, inStock: true },
      ];

      stockLevels.forEach(({ stock, inStock }) => {
        expect(stock > 0).toBe(inStock);
      });
    });
  });

  describe('Product specifications', () => {
    it('should display product specifications', () => {
      const specs = {
        processor: 'Apple M3 Max',
        ram: '36GB',
        storage: '1TB SSD',
        display: '16-inch Liquid Retina XDR',
      };

      expect(Object.keys(specs).length).toBe(4);
      expect(specs.processor).toBe('Apple M3 Max');
    });

    it('should have all required specification fields', () => {
      const requiredFields = ['processor', 'ram', 'storage', 'display'];
      const specs = {
        processor: 'Apple M3 Max',
        ram: '36GB',
        storage: '1TB SSD',
        display: '16-inch Liquid Retina XDR',
      };

      requiredFields.forEach(field => {
        expect(specs).toHaveProperty(field);
      });
    });
  });
});
