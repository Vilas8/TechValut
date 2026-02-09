# TechVault Pro - Vercel & Supabase Deployment Guide

This guide will help you deploy TechVault Pro on Vercel with Supabase as your database.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Set Up Supabase Database](#step-1-set-up-supabase-database)
3. [Step 2: Configure Local Environment](#step-2-configure-local-environment)
4. [Step 3: Prepare Project for Vercel](#step-3-prepare-project-for-vercel)
5. [Step 4: Deploy to Vercel](#step-4-deploy-to-vercel)
6. [Step 5: Configure Vercel Environment Variables](#step-5-configure-vercel-environment-variables)
7. [Step 6: Run Database Migrations](#step-6-run-database-migrations)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** package manager - Install with `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up free](https://supabase.com/)
- **Vercel Account** - [Sign up free](https://vercel.com/)

---

## Step 1: Set Up Supabase Database

### 1.1 Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click **"New Project"**
3. Fill in the project details:
   - **Name**: `techvault-pro`
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** and wait for initialization (2-3 minutes)

### 1.2 Get Database Connection String

1. In Supabase Dashboard, go to **Settings → Database**
2. Under "Connection string", select **"URI"**
3. Copy the connection string (it will look like):
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```
4. Replace `[PASSWORD]` with your database password from Step 1.1

### 1.3 Enable Required Extensions

1. In Supabase, go to **SQL Editor**
2. Create a new query and run:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";
   ```

---

## Step 2: Configure Local Environment

### 2.1 Extract and Prepare Project

```bash
# Extract the zip file
unzip techvault-pro-complete.zip
cd techvault-pro-web

# Install dependencies
pnpm install
```

### 2.2 Create Local Environment File

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update with your Supabase credentials:

```env
# Supabase Database Configuration
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres

# JWT Secret (generate a random string, min 32 characters)
JWT_SECRET=your-random-jwt-secret-key-min-32-chars-long

# App Configuration
VITE_APP_TITLE=TechVault Pro
VITE_APP_LOGO=https://your-logo-url.com/logo.png

# Optional: OAuth Configuration (if using)
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.example.com
VITE_OAUTH_PORTAL_URL=https://oauth.example.com

# Optional: API Keys
VITE_FRONTEND_FORGE_API_KEY=your-key
VITE_FRONTEND_FORGE_API_URL=https://api.example.com
BUILT_IN_FORGE_API_KEY=your-key
BUILT_IN_FORGE_API_URL=https://api.example.com
```

### 2.3 Run Database Migrations

```bash
# Generate and run migrations
pnpm db:push
```

This will create all necessary tables in your Supabase database.

### 2.4 Test Locally

```bash
# Start development server
pnpm dev
```

Visit `http://localhost:3000` to verify everything works.

---

## Step 3: Prepare Project for Vercel

### 3.1 Create Git Repository

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: TechVault Pro setup"
```

### 3.2 Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new)
2. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/techvault-pro.git
   git branch -M main
   git push -u origin main
   ```

### 3.3 Update vercel.json (if needed)

The project includes a `vercel.json` configuration. Verify it contains:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## Step 4: Deploy to Vercel

### 4.1 Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New" → "Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository (`techvault-pro`)
5. Click **"Import"**

### 4.2 Configure Project Settings

1. **Project Name**: `techvault-pro` (or your preferred name)
2. **Framework**: Select **"Other"** (or **"Node.js"**)
3. **Root Directory**: Leave as default (or set to `./` if needed)
4. Click **"Continue"**

---

## Step 5: Configure Vercel Environment Variables

### 5.1 Add Environment Variables

In the Vercel project settings:

1. Go to **Settings → Environment Variables**
2. Add each variable from your `.env.local`:

| Variable | Value | Type |
|----------|-------|------|
| `DATABASE_URL` | Your Supabase connection string | Production |
| `JWT_SECRET` | Your JWT secret | Production |
| `VITE_APP_TITLE` | TechVault Pro | Production |
| `VITE_APP_LOGO` | Your logo URL | Production |
| `NODE_ENV` | production | Production |

3. Click **"Save"**

### 5.2 Trigger Deployment

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Wait for build to complete (usually 2-5 minutes)

---

## Step 6: Run Database Migrations on Production

After deployment, run migrations on your production database:

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Connect to your Vercel project
vercel link

# Run migrations
vercel env pull .env.production.local
pnpm db:push
```

### Option B: Manual Migration

1. Connect to your Supabase database using a SQL client
2. Run the migration files from `drizzle/migrations/` directory
3. Or use Supabase SQL Editor to run the migrations

---

## Verification Checklist

After deployment, verify:

- ✅ Website loads at your Vercel URL
- ✅ Homepage displays with images
- ✅ Products page loads and displays products
- ✅ Product detail pages work with carousel
- ✅ Search and filtering work
- ✅ Cart functionality works
- ✅ Checkout process completes
- ✅ Database queries return data
- ✅ Theme toggle works (dark/light)
- ✅ Responsive design on mobile

---

## Troubleshooting

### Issue: Database Connection Error

**Error**: `Error: connect ECONNREFUSED`

**Solution**:
1. Verify `DATABASE_URL` is correct in Vercel environment variables
2. Check Supabase project is active (not paused)
3. Ensure database password is correct
4. Test connection locally first with `.env.local`

### Issue: Build Fails on Vercel

**Error**: `Build failed`

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are listed in `package.json`
3. Verify `pnpm-lock.yaml` is committed to git
4. Run `pnpm install` locally and commit changes

### Issue: Migrations Don't Run

**Error**: `Migration failed`

**Solution**:
1. Ensure `DATABASE_URL` points to correct Supabase database
2. Check database user has permissions to create tables
3. Run migrations manually via Supabase SQL Editor
4. Verify `drizzle.config.ts` has correct database URL

### Issue: Images Not Loading

**Error**: 404 errors for product images

**Solution**:
1. Verify image URLs in product data are accessible
2. Check S3 bucket permissions (if using S3)
3. Update image URLs if using different CDN
4. Ensure CORS is configured if needed

### Issue: Environment Variables Not Loaded

**Error**: `undefined` values for env variables

**Solution**:
1. Verify variables are added to Vercel environment
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)
4. Use `VITE_` prefix for frontend variables

---

## Performance Tips

1. **Enable Vercel Edge Caching**:
   - Go to Vercel Settings → Caching
   - Enable "Edge Caching"

2. **Optimize Database**:
   - Add indexes to frequently queried columns
   - Use connection pooling in Supabase

3. **Image Optimization**:
   - Use Vercel Image Optimization
   - Compress images before upload

4. **Monitor Performance**:
   - Use Vercel Analytics
   - Monitor database query performance

---

## Next Steps

1. **Set Up Custom Domain**:
   - In Vercel Settings → Domains
   - Add your custom domain

2. **Configure Email Notifications**:
   - Set up email service (SendGrid, Resend, etc.)
   - Add email sending to order confirmations

3. **Add Payment Processing**:
   - Integrate Stripe for payments
   - Update checkout flow

4. **Set Up Monitoring**:
   - Enable Vercel Analytics
   - Set up error tracking (Sentry, etc.)

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Drizzle ORM Docs**: https://orm.drizzle.team/
- **tRPC Docs**: https://trpc.io/

---

## Quick Reference

### Useful Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run database migrations
pnpm db:push

# Run tests
pnpm test

# Format code
pnpm format

# Type check
pnpm check
```

### Important Files

- `.env.local` - Local environment variables
- `drizzle/schema.ts` - Database schema
- `server/routers.ts` - API procedures
- `client/src/App.tsx` - Main app component
- `vercel.json` - Vercel configuration

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Production Ready
