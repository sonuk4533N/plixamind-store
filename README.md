# ⚡ Plixamind — Premium Digital Product Storefront

> A high-performance, dark-charcoal digital storefront built for Indian creators, developers, students, and freelancers aged 15–35. Powered by React, Vite, TypeScript, Tailwind CSS, Supabase, and SuperProfile checkout.

---

## 🚀 Quick Start (Run Locally in 60 Seconds)

If you have never run code before, follow these simple steps:

1. **Open PowerShell or Terminal** inside the project folder:
   ```bash
   cd plixamind
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and visit:
   - **Storefront**: [http://localhost:5173/](http://localhost:5173/)
   - **Admin Management Console**: [http://localhost:5173/admin](http://localhost:5173/admin)

*Note: The store runs automatically in **Local Demo Mode** out of the box with realistic sample products, so you can test adding products, editing content, and inspecting analytics immediately without needing any setup.*

---

## 🌟 Key Features

- **Distinctive Gen Z Visual Identity**: Dark charcoal background (`#07080B`), vibrant electric purple (`#8B5CF6`) and neon lime (`#A3E635` / `#BEF264`) accents, subtle glassmorphism, and bold Outfit/Plus Jakarta typography.
- **Dedicated Product Pages (`/products/:slug`)**: Each product opens in a **new browser tab** with safe `target="_blank" rel="noopener noreferrer"` attributes, leaving the original store open.
- **Frictionless SuperProfile Checkout**: Every product has its own configurable SuperProfile checkout URL supporting Indian payment methods: **UPI (Google Pay, PhonePe, Paytm, CRED)**, RuPay, Visa, Mastercard, and NetBanking.
- **Admin Management Console (`/admin`)**:
  - Add, edit, publish, unpublish, and delete products.
  - Set title, slug, price in INR (₹), discount original price, category, badges, and cover/gallery images.
  - Manage categories and store collections.
  - Edit homepage announcement bar, hero headline, support contacts, and FAQs.
  - Configure Meta Pixel ID and Google Analytics 4 (GA4) ID.
  - Inspect live traffic, product views, and `InitiateCheckout` clicks.
- **Security & Row Level Security (RLS)**:
  - Database powered by Supabase PostgreSQL.
  - Public visitors can **only read published products and public settings**.
  - Only authenticated administrators can modify or delete data.
  - Zero sensitive payment or bank details stored on your server (handled securely by SuperProfile).
- **SEO & Compliance**:
  - OpenGraph metadata, XML Sitemap (`/sitemap.xml`), and `robots.txt`.
  - Legally crafted Privacy Policy (India DPDP Act 2023), Terms of Service, Refund Policy, and Product License guides.

---

## 🗄️ Supabase Cloud Database Setup (100% Free)

You can run Plixamind completely free forever using Supabase's generous Free Tier ($0/month):

### Step 1: Create a Free Project
1. Visit [supabase.com](https://supabase.com) and create a free account.
2. Click **New Project**, choose a project name (e.g., `plixamind-store`), and set a database password.

### Step 2: Run the SQL Schema
1. In your Supabase project dashboard, click on the **SQL Editor** tab on the left menu.
2. Click **New Query**.
3. Copy the contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste it into the editor.
4. Click **Run**.
5. *This automatically creates the `products`, `categories`, `site_settings`, and `analytics_events` tables with Row Level Security (RLS) policies.*

### Step 3: Add Keys to `.env.local`
1. In Supabase, go to **Project Settings** (gear icon) → **API**.
2. Create a file named `.env.local` in the root of your project folder:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Restart your dev server (`npm run dev`). Plixamind will automatically detect Supabase and switch from Demo Mode to Live Cloud Mode!

### Step 4: Create Your First Admin User
1. In Supabase dashboard, click **Authentication** → **Users** → **Add User**.
2. Enter your email (e.g. `you@domain.com`) and choose a strong password.
3. You can now log in at `http://localhost:5173/admin` with this email and password!

---

## 🎯 Meta Pixel & SuperProfile Conversions Guide

To track ads and customer journeys accurately without duplicate purchase counting:

1. **In Plixamind Admin (`/admin` → Meta Pixel & Tracking)**:
   - Enter your **Meta Pixel ID** (e.g., `1234567890123456`).
   - Plixamind will automatically report:
     - `PageView`: When someone visits your store.
     - `ViewContent`: When someone views a product page.
     - `InitiateCheckout`: When a customer clicks the "Buy Now" button.

2. **In SuperProfile Dashboard**:
   - Go to **Settings & Integrations** → **Meta Pixel & CAPI**.
   - Paste the **exact same Meta Pixel ID** and your **Conversions API Access Token**.
   - When a customer completes payment via UPI or Card, SuperProfile will directly fire the verified `Purchase` event with the order amount.
   - *This ensures you never falsely record a purchase if someone clicks Buy Now but cancels their payment.*

---

## 🌐 Deploying to the Web (₹0 Budget)

You can host Plixamind on **Netlify** or **Cloudflare Pages** for free with commercial permissions on their standard tiers:

### Option A: 1-Click Drag-and-Drop (Netlify Drop)
1. In your terminal, build the production files:
   ```bash
   npm run build
   ```
   *This creates an optimized, ready-to-deploy folder called `dist/`.*
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder into the Netlify window.
4. Your storefront is live instantly with an SSL certificate (`https://your-store.netlify.app`)!

### Option B: Deploy with Git (Recommended)
1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial launch of Plixamind storefront"
   git remote add origin https://github.com/your-username/plixamind.git
   git push -u origin main
   ```
2. Log into [Netlify](https://netlify.com), click **Add new site** → **Import an existing project**.
3. Choose your repository. Netlify will detect Vite automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Under **Environment variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy Site**. Every time you push code to GitHub, your site updates automatically!

---

## 📋 Environment Variables Summary

| Variable Name | Required? | Description |
| :--- | :---: | :--- |
| `VITE_SUPABASE_URL` | Optional | Your Supabase project URL (e.g. `https://xyz.supabase.co`). If blank, runs in local demo mode. |
| `VITE_SUPABASE_ANON_KEY` | Optional | Your Supabase public anonymous key for client requests. |

---

## 🛡️ License & Copyright

Designed and engineered for **Plixamind**. All digital product descriptions and assets are proprietary to the store owner.
