# TechVault Pro - Supabase Setup Guide

Complete step-by-step guide to set up Supabase for TechVault Pro.

---

## Table of Contents

1. [Create Supabase Project](#create-supabase-project)
2. [Get Connection String](#get-connection-string)
3. [Enable Extensions](#enable-extensions)
4. [Configure Local Connection](#configure-local-connection)
5. [Run Migrations](#run-migrations)
6. [Verify Setup](#verify-setup)
7. [Backup & Security](#backup--security)

---

## Create Supabase Project

### Step 1: Sign Up / Login

1. Go to [Supabase](https://supabase.com)
2. Click **"Start your project"** or login if you have an account
3. Sign up with GitHub, Google, or email

### Step 2: Create New Project

1. In Supabase Dashboard, click **"New Project"**
2. Fill in project details:

| Field | Value |
|-------|-------|
| **Project Name** | `techvault-pro` |
| **Database Password** | Create strong password (save securely!) |
| **Region** | Choose closest to your users |
| **Pricing Plan** | Free (sufficient for testing) |

3. Click **"Create new project"**
4. Wait 2-3 minutes for database initialization

### Step 3: Verify Project Created

- You'll see a success message
- Dashboard will show your project
- Status should be "Active"

---

## Get Connection String

### Step 1: Navigate to Database Settings

1. In Supabase Dashboard, click your project
2. Go to **Settings** (bottom left)
3. Click **"Database"**

### Step 2: Copy Connection String

1. Under "Connection string", select **"URI"**
2. You'll see:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```

### Step 3: Prepare Connection String

Replace `[PASSWORD]` with your database password:

**Example**:
```
postgresql://postgres:MySecurePassword123@db.abcdefghij.supabase.co:5432/postgres
```

**Save this string** - you'll need it for `.env.local`

---

## Enable Extensions

### Step 1: Open SQL Editor

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**

### Step 2: Enable UUID Extension

Copy and paste this SQL:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Click **"Run"** and verify success.

### Step 3: Enable PGCrypto Extension

Create another new query:

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

Click **"Run"** and verify success.

### Step 4: Verify Extensions

Run this query to verify:

```sql
SELECT extname FROM pg_extension WHERE extname IN ('uuid-ossp', 'pgcrypto');
```

You should see both extensions listed.

---

## Configure Local Connection

### Step 1: Create .env.local File

In your project root directory, create `.env.local`:

```bash
# From project root
touch .env.local
```

### Step 2: Add Database URL

Edit `.env.local` and add:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres
JWT_SECRET=generate-random-32-character-string-here-minimum
VITE_APP_TITLE=TechVault Pro
NODE_ENV=development
```

**Replace**:
- `YOUR_PASSWORD` - Your database password
- `YOUR_PROJECT_ID` - Your Supabase project ID (from connection string)

### Step 3: Generate JWT Secret

Generate a random 32+ character string:

**Option A**: Use OpenSSL
```bash
openssl rand -base64 32
```

**Option B**: Use Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option C**: Use online generator
- https://generate-random.org/encryption-key-generator

Copy the generated string to `JWT_SECRET` in `.env.local`

### Step 4: Verify .env.local

Your `.env.local` should look like:

```env
DATABASE_URL=postgresql://postgres:MyPassword@db.abc123.supabase.co:5432/postgres
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0
VITE_APP_TITLE=TechVault Pro
NODE_ENV=development
```

---

## Run Migrations

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Run Migrations

```bash
pnpm db:push
```

This command will:
- Generate migration files
- Create all necessary tables
- Set up relationships
- Create indexes

### Step 3: Verify Migration Success

You should see output like:

```
✓ Generated migration
✓ Applied migration
✓ Created tables: users, products, categories, orders, order_items, contacts
```

### Step 4: Check Tables in Supabase

1. Go to Supabase Dashboard
2. Click **"Table Editor"** (left sidebar)
3. You should see tables:
   - `users`
   - `products`
   - `categories`
   - `orders`
   - `order_items`
   - `contacts`

---

## Verify Setup

### Step 1: Start Development Server

```bash
pnpm dev
```

### Step 2: Test Database Connection

Visit `http://localhost:3000` and check:

- ✅ Homepage loads
- ✅ Products display
- ✅ No database errors in console

### Step 3: Check Browser Console

Open browser DevTools (F12) and check:
- No red errors about database
- Network requests to `/api/trpc` succeed

### Step 4: Test Product Loading

1. Go to **Products** page
2. Verify products load from database
3. Check that prices and details display

### Step 5: Test Cart

1. Click **"Add to Cart"** on a product
2. Verify cart updates
3. Go to **Cart** page
4. Verify items display

---

## Backup & Security

### Step 1: Enable Automatic Backups

1. In Supabase Settings, go to **"Backups"**
2. Enable **"Automated backups"**
3. Choose backup frequency (daily recommended)

### Step 2: Set Up RLS (Row Level Security)

For production, enable RLS:

1. Go to **Authentication** → **Policies**
2. Enable RLS on each table
3. Set up appropriate policies

### Step 3: Secure Environment Variables

**Never commit `.env.local` to Git!**

Verify `.gitignore` contains:

```
.env
.env.local
.env.*.local
```

### Step 4: Rotate Database Password

For production:

1. In Supabase Settings → Database
2. Click **"Reset password"**
3. Update `.env.local` with new password
4. Redeploy to Vercel

---

## Troubleshooting

### Issue: Connection Refused

**Error**: `Error: connect ECONNREFUSED`

**Solution**:
1. Verify database is active in Supabase
2. Check connection string is correct
3. Ensure password is correct
4. Check region is accessible

### Issue: Authentication Failed

**Error**: `FATAL: password authentication failed`

**Solution**:
1. Verify database password in connection string
2. Check for special characters in password
3. Reset password in Supabase Settings
4. Update `.env.local`

### Issue: Extension Not Found

**Error**: `ERROR: extension "uuid-ossp" does not exist`

**Solution**:
1. Run SQL queries from "Enable Extensions" section
2. Verify queries executed successfully
3. Check extensions are enabled

### Issue: Migration Failed

**Error**: `Migration failed: relation "users" already exists`

**Solution**:
1. Check if tables already exist in Supabase
2. Delete existing tables if needed
3. Run migrations again
4. Or use `pnpm db:push --force`

### Issue: Can't Connect Locally

**Error**: `getaddrinfo ENOTFOUND db.*.supabase.co`

**Solution**:
1. Check internet connection
2. Verify Supabase project is active
3. Check firewall isn't blocking connection
4. Try connecting from different network

---

## Next Steps

1. **Test All Features**:
   - Create products
   - Add to cart
   - Complete checkout
   - Check order history

2. **Load Sample Data**:
   - Run seed script: `node seed-db.mjs`
   - Or manually add products via Supabase UI

3. **Set Up Backups**:
   - Enable automated backups
   - Test restore process

4. **Prepare for Vercel**:
   - Commit code to Git
   - Follow `DEPLOYMENT_GUIDE.md`

---

## Quick Reference

### Useful Supabase URLs

- Dashboard: https://app.supabase.com
- Project Settings: https://app.supabase.com/project/[PROJECT-ID]/settings/general
- Database: https://app.supabase.com/project/[PROJECT-ID]/editor
- SQL Editor: https://app.supabase.com/project/[PROJECT-ID]/sql

### Connection String Format

```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

### Common Commands

```bash
# Test connection
psql "postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres"

# Run migrations
pnpm db:push

# Generate migrations only
pnpm db:generate

# View schema
pnpm db:studio
```

---

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Community: https://github.com/supabase/supabase/discussions
- Database Issues: https://supabase.com/docs/guides/database

---

**Status**: ✅ Ready for Production  
**Last Updated**: February 2026  
**Version**: 1.0.0
