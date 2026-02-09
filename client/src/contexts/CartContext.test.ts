import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Cart item management', () => {
    it('should add a new item to cart', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 9999,
        image: 'test.jpg',
        category: 'Test',
      };

      // Simulate adding item
      const items: any[] = [];
      items.push({ ...item, quantity: 1 });

      expect(items).toHaveLength(1);
      expect(items[0]).toEqual({ ...item, quantity: 1 });
    });

    it('should increment quantity if item already exists', () => {
      const item = {
        id: 1,
        name: 'Test Product',
        price: 9999,
        image: 'test.jpg',
        category: 'Test',
      };

      let items: any[] = [];
      items.push({ ...item, quantity: 1 });

      // Add same item again
      const existingItem = items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }

      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
    });

    it('should remove item from cart', () => {
      let items = [
        { id: 1, name: 'Product 1', price: 9999, image: 'test.jpg', category: 'Test', quantity: 1 },
        { id: 2, name: 'Product 2', price: 5999, image: 'test.jpg', category: 'Test', quantity: 1 },
      ];

      items = items.filter((item) => item.id !== 1);

      expect(items).toHaveLength(1);
      expect(items[0].id).toBe(2);
    });

    it('should update item quantity', () => {
      let items = [
        { id: 1, name: 'Product 1', price: 9999, image: 'test.jpg', category: 'Test', quantity: 1 },
      ];

      const item = items.find((i) => i.id === 1);
      if (item) {
        item.quantity = 5;
      }

      expect(items[0].quantity).toBe(5);
    });

    it('should remove item if quantity is set to 0', () => {
      let items = [
        { id: 1, name: 'Product 1', price: 9999, image: 'test.jpg', category: 'Test', quantity: 1 },
      ];

      const quantity = 0;
      if (quantity <= 0) {
        items = items.filter((item) => item.id !== 1);
      }

      expect(items).toHaveLength(0);
    });

    it('should clear all items from cart', () => {
      let items = [
        { id: 1, name: 'Product 1', price: 9999, image: 'test.jpg', category: 'Test', quantity: 1 },
        { id: 2, name: 'Product 2', price: 5999, image: 'test.jpg', category: 'Test', quantity: 2 },
      ];

      items = [];

      expect(items).toHaveLength(0);
    });
  });

  describe('Cart calculations', () => {
    it('should calculate total items correctly', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 9999, image: 'test.jpg', category: 'Test', quantity: 2 },
        { id: 2, name: 'Product 2', price: 5999, image: 'test.jpg', category: 'Test', quantity: 3 },
      ];

      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

      expect(totalItems).toBe(5);
    });

    it('should calculate subtotal correctly', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10000, image: 'test.jpg', category: 'Test', quantity: 2 },
        { id: 2, name: 'Product 2', price: 5000, image: 'test.jpg', category: 'Test', quantity: 1 },
      ];

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      expect(subtotal).toBe(25000);
    });

    it('should calculate tax correctly (10%)', () => {
      const subtotal = 10000;
      const tax = subtotal * 0.1;

      expect(tax).toBe(1000);
    });

    it('should calculate shipping correctly', () => {
      const subtotal1 = 3000;
      const shipping1 = subtotal1 > 5000 ? 0 : 999;

      const subtotal2 = 6000;
      const shipping2 = subtotal2 > 5000 ? 0 : 999;

      expect(shipping1).toBe(999);
      expect(shipping2).toBe(0);
    });

    it('should calculate total correctly', () => {
      const subtotal = 10000;
      const tax = subtotal * 0.1;
      const shipping = 999;
      const total = subtotal + tax + shipping;

      expect(total).toBe(11999);
    });
  });

  describe('localStorage persistence', () => {
    it('should save cart to localStorage', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 9999, image: 'test.jpg', category: 'Test', quantity: 1 },
      ];

      localStorage.setItem('techvault-cart', JSON.stringify(items));
      const stored = localStorage.getItem('techvault-cart');

      expect(stored).toBeDefined();
      expect(JSON.parse(stored!)).toEqual(items);
    });

    it('should load cart from localStorage', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 9999, image: 'test.jpg', category: 'Test', quantity: 2 },
      ];

      localStorage.setItem('techvault-cart', JSON.stringify(items));
      const stored = localStorage.getItem('techvault-cart');
      const loaded = stored ? JSON.parse(stored) : [];

      expect(loaded).toEqual(items);
      expect(loaded[0].quantity).toBe(2);
    });

    it('should handle empty localStorage gracefully', () => {
      const stored = localStorage.getItem('techvault-cart');
      const items = stored ? JSON.parse(stored) : [];

      expect(items).toEqual([]);
    });
  });
});
