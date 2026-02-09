import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { categories, products } from './drizzle/schema.js';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

const categoryData = [
  {
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-performance laptops for work and gaming',
    icon: '💻',
  },
  {
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest flagship and mid-range smartphones',
    icon: '📱',
  },
  {
    name: 'Audio',
    slug: 'audio',
    description: 'Premium headphones, earbuds, and speakers',
    icon: '🎧',
  },
  {
    name: 'Wearables',
    slug: 'wearables',
    description: 'Smartwatches and fitness trackers',
    icon: '⌚',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Cables, chargers, and protective gear',
    icon: '🔌',
  },
];

const productData = [
  // Laptops
  {
    categoryName: 'Laptops',
    name: 'MacBook Pro 16" M3 Max',
    slug: 'macbook-pro-16-m3-max',
    description: 'Powerful laptop with M3 Max chip, 16GB RAM, 512GB SSD. Perfect for professionals and creatives.',
    price: 349900,
    originalPrice: 399900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      processor: 'Apple M3 Max',
      ram: '16GB Unified Memory',
      storage: '512GB SSD',
      display: '16-inch Liquid Retina XDR',
      battery: '17 hours',
      weight: '2.15 kg',
    }),
    stock: 15,
    rating: 48,
    reviewCount: 324,
    featured: 1,
  },
  {
    categoryName: 'Laptops',
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'Premium Windows laptop with Intel Core i7, RTX 4060, 16GB RAM, 512GB SSD.',
    price: 299900,
    originalPrice: 349900,
    image: 'https://images.unsplash.com/photo-1588872657840-218e412ee5ff?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      processor: 'Intel Core i7-13700H',
      ram: '16GB DDR5',
      storage: '512GB NVMe SSD',
      display: '15.6-inch 4K OLED',
      gpu: 'NVIDIA RTX 4060',
      weight: '2.0 kg',
    }),
    stock: 12,
    rating: 46,
    reviewCount: 287,
    featured: 1,
  },
  {
    categoryName: 'Laptops',
    name: 'Lenovo ThinkPad X1 Carbon',
    slug: 'lenovo-thinkpad-x1-carbon',
    description: 'Business-class ultrabook with Intel Core i7, 16GB RAM, 512GB SSD. Lightweight and durable.',
    price: 199900,
    originalPrice: 249900,
    image: 'https://images.unsplash.com/photo-1588872657840-218e412ee5ff?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      processor: 'Intel Core i7-1365U',
      ram: '16GB LPDDR5',
      storage: '512GB SSD',
      display: '14-inch FHD IPS',
      battery: '15 hours',
      weight: '1.19 kg',
    }),
    stock: 20,
    rating: 45,
    reviewCount: 156,
    featured: 0,
  },

  // Smartphones
  {
    categoryName: 'Smartphones',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'Latest iPhone with A17 Pro chip, 48MP camera, titanium design. 256GB storage.',
    price: 119900,
    originalPrice: 129900,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      display: '6.7-inch Super Retina XDR',
      camera: '48MP Main + 12MP Ultra Wide',
      battery: '3582 mAh',
    }),
    stock: 25,
    rating: 49,
    reviewCount: 512,
    featured: 1,
  },
  {
    categoryName: 'Smartphones',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Flagship Android phone with Snapdragon 8 Gen 3, 200MP camera, 12GB RAM.',
    price: 129900,
    originalPrice: 139900,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      display: '6.8-inch Dynamic AMOLED 2X',
      camera: '200MP Main + 50MP Periscope',
      battery: '5000 mAh',
    }),
    stock: 18,
    rating: 48,
    reviewCount: 445,
    featured: 1,
  },
  {
    categoryName: 'Smartphones',
    name: 'Google Pixel 8 Pro',
    slug: 'google-pixel-8-pro',
    description: 'Google\'s flagship with Tensor G3, advanced AI features, 50MP camera.',
    price: 99900,
    originalPrice: 109900,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '256GB',
      display: '6.7-inch QHD+ OLED',
      camera: '50MP Main + 48MP Telephoto',
      battery: '5050 mAh',
    }),
    stock: 22,
    rating: 47,
    reviewCount: 389,
    featured: 0,
  },

  // Audio
  {
    categoryName: 'Audio',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Premium noise-canceling headphones with 30-hour battery life.',
    price: 39900,
    originalPrice: 44900,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      type: 'Over-ear Headphones',
      driver: '40mm',
      frequency: '4Hz - 40kHz',
      impedance: '16 Ohms',
      battery: '30 hours',
      weight: '250g',
    }),
    stock: 30,
    rating: 48,
    reviewCount: 678,
    featured: 1,
  },
  {
    categoryName: 'Audio',
    name: 'Apple AirPods Pro 2',
    slug: 'apple-airpods-pro-2',
    description: 'Wireless earbuds with active noise cancellation and spatial audio.',
    price: 24900,
    originalPrice: 29900,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      type: 'True Wireless Earbuds',
      driver: '6mm',
      frequency: '20Hz - 20kHz',
      battery: '6 hours (30 with case)',
      weight: '4.3g per earbud',
      charging: 'MagSafe',
    }),
    stock: 35,
    rating: 47,
    reviewCount: 523,
    featured: 1,
  },
  {
    categoryName: 'Audio',
    name: 'Bose QuietComfort 45',
    slug: 'bose-quietcomfort-45',
    description: 'Comfortable noise-canceling headphones with excellent sound quality.',
    price: 34900,
    originalPrice: 39900,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      type: 'Over-ear Headphones',
      driver: '40mm',
      frequency: '20Hz - 20kHz',
      impedance: '32 Ohms',
      battery: '24 hours',
      weight: '238g',
    }),
    stock: 28,
    rating: 46,
    reviewCount: 412,
    featured: 0,
  },

  // Wearables
  {
    categoryName: 'Wearables',
    name: 'Apple Watch Series 9',
    slug: 'apple-watch-series-9',
    description: 'Advanced smartwatch with fitness tracking, ECG, and always-on display.',
    price: 39900,
    originalPrice: 44900,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      display: '1.9-inch Retina LTPO OLED',
      processor: 'S9 SiP',
      storage: '32GB',
      battery: '18 hours',
      water: '50m',
      weight: '38g',
    }),
    stock: 40,
    rating: 48,
    reviewCount: 567,
    featured: 1,
  },
  {
    categoryName: 'Wearables',
    name: 'Samsung Galaxy Watch 6',
    slug: 'samsung-galaxy-watch-6',
    description: 'Versatile smartwatch with health tracking and long battery life.',
    price: 29900,
    originalPrice: 34900,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      display: '1.3-inch AMOLED',
      processor: 'Exynos W920',
      storage: '16GB',
      battery: '40 hours',
      water: '50m',
      weight: '33.8g',
    }),
    stock: 32,
    rating: 46,
    reviewCount: 334,
    featured: 0,
  },
  {
    categoryName: 'Wearables',
    name: 'Fitbit Charge 6',
    slug: 'fitbit-charge-6',
    description: 'Fitness tracker with heart rate monitoring and sleep tracking.',
    price: 16900,
    originalPrice: 19900,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      display: '1.04-inch AMOLED',
      processor: 'Qualcomm Snapdragon Wear',
      storage: '4GB',
      battery: '7 days',
      water: '50m',
      weight: '29.5g',
    }),
    stock: 45,
    rating: 45,
    reviewCount: 289,
    featured: 0,
  },

  // Accessories
  {
    categoryName: 'Accessories',
    name: 'Anker 737 Power Bank',
    slug: 'anker-737-power-bank',
    description: '24000mAh power bank with 140W output. Fast charging for all devices.',
    price: 8999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      capacity: '24000mAh',
      output: '140W',
      ports: '2x USB-C, 1x USB-A',
      weight: '680g',
      dimensions: '6.2 x 3.1 x 1.3 inches',
    }),
    stock: 60,
    rating: 46,
    reviewCount: 234,
    featured: 0,
  },
  {
    categoryName: 'Accessories',
    name: 'Belkin USB-C Cable 2m',
    slug: 'belkin-usb-c-cable-2m',
    description: 'Durable USB-C cable with 100W power delivery. 2-meter length.',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      length: '2 meters',
      powerDelivery: '100W',
      dataTransfer: 'USB 3.1 Gen 2',
      material: 'Braided Nylon',
      warranty: 'Lifetime',
    }),
    stock: 100,
    rating: 47,
    reviewCount: 156,
    featured: 0,
  },
  {
    categoryName: 'Accessories',
    name: 'Spigen Tough Armor Case',
    slug: 'spigen-tough-armor-case',
    description: 'Protective phone case with dual-layer protection. Available for most phones.',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    specifications: JSON.stringify({
      material: 'Polycarbonate + TPU',
      protection: 'Drop tested 12ft',
      compatibility: 'iPhone 15 Pro Max',
      weight: '45g',
      color: 'Black',
    }),
    stock: 80,
    rating: 45,
    reviewCount: 198,
    featured: 0,
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Insert categories
    console.log('📦 Inserting categories...');
    for (const cat of categoryData) {
      await db.insert(categories).values(cat).catch(() => {
        // Category might already exist
      });
    }

    // Get category IDs
    const allCategories = await db.select().from(categories);
    const categoryMap = new Map(allCategories.map((c) => [c.slug, c.id]));

    // Insert products
    console.log('🛍️ Inserting products...');
    for (const prod of productData) {
      const categoryId = categoryMap.get(prod.categoryName.toLowerCase().replace(/\s+/g, '-'));
      if (!categoryId) {
        console.warn(`⚠️ Category not found for ${prod.categoryName}`);
        continue;
      }

      await db
        .insert(products)
        .values({
          ...prod,
          categoryId,
          categoryName: undefined,
        })
        .catch((err) => {
          // Product might already exist
          console.log(`ℹ️ Product ${prod.name} already exists or error: ${err.message}`);
        });
    }

    console.log('✅ Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
