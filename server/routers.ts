import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(async () => db.getProducts(20)),
    featured: publicProcedure.query(async () => db.getFeaturedProducts(6)),
    byCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => db.getProductsByCategory(input.categoryId, 20)),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => db.getProductBySlug(input.slug)),
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => db.searchProducts(input.query, 20)),
  }),

  categories: router({
    list: publicProcedure.query(async () => db.getCategories()),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => db.createContactSubmission(input)),
  }),

  orders: router({
    create: protectedProcedure
      .input(z.object({
        shippingFirstName: z.string(),
        shippingLastName: z.string(),
        shippingEmail: z.string().email(),
        shippingPhone: z.string().optional(),
        shippingAddress: z.string(),
        shippingCity: z.string(),
        shippingState: z.string().optional(),
        shippingZipCode: z.string(),
        shippingCountry: z.string(),
        subtotal: z.number(),
        tax: z.number(),
        shipping: z.number(),
        total: z.number(),
        paymentMethod: z.string(),
        items: z.array(z.object({
          productId: z.number(),
          productName: z.string(),
          productImage: z.string(),
          price: z.number(),
          quantity: z.number(),
          subtotal: z.number(),
        })),
      }))
      .mutation(async ({ input, ctx }) => {
        const orderNumber = `TV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const orderResult = await db.createOrder({
          userId: ctx.user.id,
          orderNumber,
          status: "pending",
          shippingFirstName: input.shippingFirstName,
          shippingLastName: input.shippingLastName,
          shippingEmail: input.shippingEmail,
          shippingPhone: input.shippingPhone,
          shippingAddress: input.shippingAddress,
          shippingCity: input.shippingCity,
          shippingState: input.shippingState,
          shippingZipCode: input.shippingZipCode,
          shippingCountry: input.shippingCountry,
          subtotal: Math.round(input.subtotal),
          tax: Math.round(input.tax),
          shipping: Math.round(input.shipping),
          total: Math.round(input.total),
          paymentMethod: input.paymentMethod,
          paymentStatus: "completed",
        });
        const orderId = (orderResult as any).insertId;
        for (const item of input.items) {
          await db.createOrderItem({
            orderId,
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            price: Math.round(item.price),
            quantity: item.quantity,
            subtotal: Math.round(item.subtotal),
          });
        }
        return { orderId, orderNumber };
      }),

    list: protectedProcedure.query(async ({ ctx }) => db.getOrdersByUserId(ctx.user.id)),

    getById: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input, ctx }) => {
        const order = await db.getOrderById(input.orderId);
        if (!order || order.userId !== ctx.user.id) throw new Error("Unauthorized");
        const items = await db.getOrderItemsByOrderId(input.orderId);
        return { ...order, items };
      }),
  }),

  user: router({
    profile: protectedProcedure.query(async ({ ctx }) => db.getUserById(ctx.user.id)),
    updateProfile: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => db.updateUserProfile(ctx.user.id, input)),

    // ─── WISHLIST ──────────────────────────────────────────────────────────────
    wishlist: protectedProcedure
      .query(async ({ ctx }) => db.getWishlistByUser(ctx.user.id)),

    isInWishlist: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .query(async ({ input, ctx }) => db.isInWishlist(ctx.user.id, input.productId)),

    addToWishlist: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ input, ctx }) => db.addWishlistItem(ctx.user.id, input.productId)),

    removeFromWishlist: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ input, ctx }) => db.removeWishlistItem(ctx.user.id, input.productId)),

    // ─── BROWSING HISTORY ──────────────────────────────────────────────────────
    history: protectedProcedure
      .query(async ({ ctx }) => db.getHistoryByUser(ctx.user.id, 50)),

    trackView: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ input, ctx }) => db.trackProductView(ctx.user.id, input.productId)),

    clearHistory: protectedProcedure
      .mutation(async ({ ctx }) => db.clearHistory(ctx.user.id)),
  }),

  // ─── ADMIN ROUTES ────────────────────────────────────────────────────────────
  admin: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.adminGetDashboardStats();
    }),
    recentOrders: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.adminGetRecentOrders(10);
    }),
    recentUsers: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.adminGetRecentUsers(10);
    }),
    allUsers: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.adminGetAllUsers();
    }),
    allOrders: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.adminGetAllOrders();
    }),
    updateOrderStatus: protectedProcedure
      .input(z.object({ orderId: z.number(), status: z.enum(['pending','confirmed','shipped','delivered','cancelled']) }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
        return db.adminUpdateOrderStatus(input.orderId, input.status);
      }),
    analytics: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.adminGetAnalytics();
    }),
    allProducts: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.adminGetAllProducts();
    }),
  }),
});

export type AppRouter = typeof appRouter;
