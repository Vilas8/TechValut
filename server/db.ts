import { eq, or, like, desc, count, sum, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, categories, products, contactSubmissions, InsertContactSubmission, orders, orderItems, InsertOrder, InsertOrderItem } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories);
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result[0];
}

export async function getProducts(limit?: number, offset?: number) {
  const db = await getDb();
  if (!db) return [];
  let query: any = db.select().from(products);
  if (limit) query = query.limit(limit);
  if (offset) query = query.offset(offset);
  return query;
}

export async function getFeaturedProducts(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.featured, 1)).limit(limit);
}

export async function getProductsByCategory(categoryId: number, limit?: number, offset?: number) {
  const db = await getDb();
  if (!db) return [];
  let query: any = db.select().from(products).where(eq(products.categoryId, categoryId));
  if (limit) query = query.limit(limit);
  if (offset) query = query.offset(offset);
  return query;
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result[0];
}

export async function searchProducts(query: string, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(or(like(products.name, `%${query}%`), like(products.description, `%${query}%`))).limit(limit);
}

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(contactSubmissions).values(data);
}

export async function createOrder(data: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(orders).values(data);
}

export async function createOrderItem(data: InsertOrderItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(orderItems).values(data);
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return result[0];
}

export async function getOrderItemsByOrderId(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

export async function updateUserProfile(userId: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(users).set(data).where(eq(users.id, userId));
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result[0];
}

// ─── ADMIN QUERIES ────────────────────────────────────────────────────────────

export async function adminGetAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function adminGetAllOrders() {
  const db = await getDb();
  if (!db) return [];
  // Join orders with users to get customer name
  const result = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      status: orders.status,
      total: orders.total,
      paymentStatus: orders.paymentStatus,
      createdAt: orders.createdAt,
      userId: orders.userId,
      shippingFirstName: orders.shippingFirstName,
      shippingLastName: orders.shippingLastName,
      shippingEmail: orders.shippingEmail,
      userName: users.name,
      userEmail: users.email,
    })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt));
  return result;
}

export async function adminGetDashboardStats() {
  const db = await getDb();
  if (!db) return { totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 };

  const [revenueResult] = await db.select({ total: sum(orders.total) }).from(orders).where(eq(orders.paymentStatus, 'completed'));
  const [orderCount] = await db.select({ count: count() }).from(orders);
  const [userCount] = await db.select({ count: count() }).from(users);
  const [productCount] = await db.select({ count: count() }).from(products);

  return {
    totalRevenue: Number(revenueResult?.total ?? 0),
    totalOrders: orderCount?.count ?? 0,
    totalUsers: userCount?.count ?? 0,
    totalProducts: productCount?.count ?? 0,
  };
}

export async function adminGetRecentOrders(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      status: orders.status,
      total: orders.total,
      createdAt: orders.createdAt,
      shippingFirstName: orders.shippingFirstName,
      shippingLastName: orders.shippingLastName,
      userName: users.name,
    })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt))
    .limit(limit);
}

export async function adminGetRecentUsers(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt)).limit(limit);
}

export async function adminUpdateOrderStatus(orderId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(orders).set({ status: status as any, updatedAt: new Date() }).where(eq(orders.id, orderId));
}

export async function adminGetAnalytics() {
  const db = await getDb();
  if (!db) return { monthlySales: [], categoryStats: [], topProducts: [] };

  // Monthly revenue for last 6 months
  const monthlySales = await db.execute(sql`
    SELECT 
      DATE_FORMAT(createdAt, '%b') as month,
      DATE_FORMAT(createdAt, '%Y-%m') as yearMonth,
      SUM(total) as revenue,
      COUNT(*) as orderCount
    FROM orders
    WHERE paymentStatus = 'completed'
      AND createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
    GROUP BY DATE_FORMAT(createdAt, '%Y-%m'), DATE_FORMAT(createdAt, '%b')
    ORDER BY yearMonth ASC
  `);

  // Sales by category
  const categoryStats = await db.execute(sql`
    SELECT 
      c.name as category,
      SUM(oi.subtotal) as revenue,
      COUNT(oi.id) as itemsSold
    FROM orderItems oi
    JOIN products p ON oi.productId = p.id
    JOIN categories c ON p.categoryId = c.id
    JOIN orders o ON oi.orderId = o.id
    WHERE o.paymentStatus = 'completed'
    GROUP BY c.id, c.name
    ORDER BY revenue DESC
    LIMIT 5
  `);

  // Top selling products
  const topProducts = await db.execute(sql`
    SELECT 
      p.name,
      p.price,
      p.image,
      SUM(oi.quantity) as totalSold,
      SUM(oi.subtotal) as totalRevenue
    FROM orderItems oi
    JOIN products p ON oi.productId = p.id
    JOIN orders o ON oi.orderId = o.id
    WHERE o.paymentStatus = 'completed'
    GROUP BY p.id, p.name, p.price, p.image
    ORDER BY totalSold DESC
    LIMIT 5
  `);

  return {
    monthlySales: (monthlySales as any[])[0] ?? [],
    categoryStats: (categoryStats as any[])[0] ?? [],
    topProducts: (topProducts as any[])[0] ?? [],
  };
}

export async function adminGetAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      stock: products.stock,
      featured: products.featured,
      image: products.image,
      createdAt: products.createdAt,
      categoryId: products.categoryId,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(desc(products.createdAt));
}
