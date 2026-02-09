# TechVault Pro - Quick Start Deployment

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Supabase account (free at supabase.com)
- Vercel account (free at vercel.com)

### Step 1: Setup Supabase (2 minutes)

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your connection string from Settings → Database
3. Save it for later

### Step 2: Setup Local Project (1 minute)

```bash
# Extract and navigate
unzip techvault-pro-complete.zip
cd techvault-pro-web

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
```

### Step 3: Configure Database (1 minute)

Edit `.env.local`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres
JWT_SECRET=generate-a-random-32-character-string-here
VITE_APP_TITLE=TechVault Pro
```

### Step 4: Run Migrations (1 minute)

```bash
pnpm db:push
```

### Step 5: Deploy to Vercel (Next)

See `DEPLOYMENT_GUIDE.md` for detailed Vercel deployment instructions.

---

## 📋 Folder Structure Changes

The project has been renamed from Manus to TechVault:

```
✅ __manus__ → __techvault__
✅ .manus-logs → .techvault-logs
✅ All references updated
```

---

## 🔧 Environment Variables

### Required
- `DATABASE_URL` - Supabase connection string
- `JWT_SECRET` - Random 32+ character string

### Optional
- `VITE_APP_TITLE` - App title (default: TechVault Pro)
- `VITE_APP_LOGO` - Logo URL
- `NODE_ENV` - Set to 'production' on Vercel

---

## 📚 Full Documentation

For complete deployment guide, see: **`DEPLOYMENT_GUIDE.md`**

---

## ✨ Features

- ✅ 12 Premium Products with Carousel
- ✅ Shopping Cart System
- ✅ User Accounts & Order History
- ✅ Dark/Light Theme
- ✅ Responsive Design
- ✅ INR Currency Support
- ✅ Product Search & Filtering
- ✅ Fully Database Integrated

---

## 🆘 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for troubleshooting
2. Review Vercel logs in dashboard
3. Check Supabase database status
4. Verify all environment variables are set

---

## 📞 Support Resources

- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Drizzle ORM: https://orm.drizzle.team/

---

**Ready to deploy?** Follow the `DEPLOYMENT_GUIDE.md` for step-by-step instructions!
