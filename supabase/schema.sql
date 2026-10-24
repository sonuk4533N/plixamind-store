-- ========================================================
-- PLIXAMIND — Supabase Database Schema & Row Level Security
-- ========================================================
-- Run this script inside your Supabase Project SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Run)
-- ========================================================

-- 1. Create Products Table
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  title text not null,
  tagline text,
  price numeric not null check (price >= 0),
  original_price numeric check (original_price >= 0),
  category text not null,
  badge text,
  cover_image text not null,
  preview_images jsonb default '[]'::jsonb,
  short_description text,
  description text,
  benefits jsonb default '[]'::jsonb,
  whats_included jsonb default '[]'::jsonb,
  file_format text default 'Instant Digital Access',
  file_size text default 'Digital Download',
  license_type text default 'Personal Use License',
  superprofile_url text not null,
  is_featured boolean default false,
  is_bestseller boolean default false,
  is_published boolean default true,
  faqs jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Create Categories Table
create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  created_at timestamptz default now()
);

-- 3. Create Site Settings Table
create table if not exists public.site_settings (
  id text primary key,
  settings jsonb not null,
  updated_at timestamptz default now()
);

-- 4. Create Analytics Events Log Table
create table if not exists public.analytics_events (
  id text primary key,
  event_name text not null,
  product_id text,
  product_title text,
  value numeric,
  currency text default 'INR',
  timestamp timestamptz default now()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS on all tables
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.site_settings enable row level security;
alter table public.analytics_events enable row level security;

-- Products Policies:
drop policy if exists "Public visitors can view published products" on public.products;
create policy "Public visitors can view published products"
  on public.products for select
  using (is_published = true);

drop policy if exists "Authenticated admin full access to products" on public.products;
create policy "Authenticated admin full access to products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Categories Policies:
drop policy if exists "Public can view categories" on public.categories;
create policy "Public can view categories"
  on public.categories for select
  using (true);

drop policy if exists "Admin can modify categories" on public.categories;
create policy "Admin can modify categories"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Site Settings Policies:
drop policy if exists "Public can view site settings" on public.site_settings;
create policy "Public can view site settings"
  on public.site_settings for select
  using (true);

drop policy if exists "Admin can modify site settings" on public.site_settings;
create policy "Admin can modify site settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Analytics Events Policies:
drop policy if exists "Public can insert analytics events" on public.analytics_events;
create policy "Public can insert analytics events"
  on public.analytics_events for insert
  with check (true);

drop policy if exists "Admin can view analytics events" on public.analytics_events;
create policy "Admin can view analytics events"
  on public.analytics_events for select
  using (auth.role() = 'authenticated');

-- ========================================================
-- SEED DATA (Initial Store Content)
-- ========================================================

-- Insert Categories
insert into public.categories (id, name, slug, description, icon) values
  ('cat-1', 'Notion Systems', 'notion-systems', 'High-performance operating systems for work, study, and life.', 'LayoutGrid'),
  ('cat-2', 'Ebooks & Playbooks', 'ebooks-playbooks', 'Direct, actionable guides without fluff for ambitious builders.', 'BookOpen'),
  ('cat-3', 'Design & UI Assets', 'design-assets', 'Production-ready Figma kits, icons, and aesthetic templates.', 'Palette'),
  ('cat-4', 'Developer Toolkits', 'developer-toolkits', 'Architecture cheat sheets, boilerplates, and interview blueprints.', 'Terminal'),
  ('cat-5', 'Freelancer Bundles', 'freelancer-bundles', 'Client proposals, invoices, legal agreements, and rate calculators.', 'Briefcase')
on conflict (id) do nothing;

-- Insert Global Site Settings
insert into public.site_settings (id, settings) values
(
  'global',
  '{
    "announcement_text": "⚡ FLASH LAUNCH SALE: Get up to 50% OFF all digital templates & toolkits this week! Instant download via SuperProfile.",
    "announcement_link": "#products",
    "show_announcement": true,
    "hero_badge": "⚡ INDIA’S PREMIER DIGITAL ASSET STORE",
    "hero_headline": "Level Up Your Workflow With High-Impact Digital Assets",
    "hero_subheadline": "Actionable Notion systems, developer cheat vaults, battle-tested freelancing contracts, and Figma UI kits built for India’s next-gen creators and builders.",
    "hero_cta_text": "Explore Store",
    "support_email": "support@plixamind.com",
    "support_whatsapp": "+91 98765 43210",
    "meta_pixel_id": "",
    "google_analytics_id": "",
    "footer_text": "Plixamind is an independent digital asset boutique. All payments are processed securely via SuperProfile with support for UPI, RuPay, Visa, Mastercard, and NetBanking.",
    "faqs": [
      {
        "id": "faq-1",
        "question": "How do digital downloads and deliveries work?",
        "answer": "Delivery is 100% automated and instant. Once you complete your checkout on SuperProfile, you are immediately redirected to your download page and also receive an email with your access links and files."
      },
      {
        "id": "faq-2",
        "question": "What payment methods are supported on checkout?",
        "answer": "Our checkout is powered by SuperProfile, which supports all major Indian payment methods: UPI (Google Pay, PhonePe, Paytm, CRED), Debit & Credit Cards (Visa, Mastercard, RuPay), and NetBanking across 50+ Indian banks."
      },
      {
        "id": "faq-3",
        "question": "What is the refund policy on digital products?",
        "answer": "Because digital files and Notion duplicate links cannot be revoked once delivered, all sales are generally final. However, if a file is damaged or you encounter technical issues, our support team will resolve it or provide an alternate asset within 48 hours."
      },
      {
        "id": "faq-4",
        "question": "Can I use these assets for client projects or commercial work?",
        "answer": "Products labeled with a Commercial License (like our UI Kits, Contract Suites, and Icon Packs) can be used for unlimited client projects. Products marked Personal License (like personal Notion systems) are intended for single-user personal use."
      },
      {
        "id": "faq-5",
        "question": "Will I receive future updates to the products I buy?",
        "answer": "Yes! When templates or guides receive major version updates, you will receive an updated download link via email at no extra charge."
      }
    ]
  }'::jsonb
)
on conflict (id) do nothing;

-- Insert Initial Products
insert into public.products (
  id, slug, title, tagline, price, original_price, category, badge,
  cover_image, preview_images, short_description, description,
  benefits, whats_included, file_format, file_size, license_type,
  superprofile_url, is_featured, is_bestseller, is_published, faqs
) values
(
  'prod-second-brain',
  'second-brain-life-os-notion',
  'Second Brain 2026: The Ultimate Life & Project OS',
  'Organize your thoughts, daily habits, college/work projects, and finances in one aesthetic Notion space.',
  499,
  999,
  'notion-systems',
  'BESTSELLER',
  'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'A complete personal management system built according to the PARA method. Pre-configured with automated databases, habit trackers, and milestone dashboards.',
  'Stop juggling ten disconnected apps. The Second Brain 2026 OS brings order to mental chaos. Built specifically for students, young founders, and creators aged 18–35 in India, this template eliminates procrastination with a clean, clutter-free dashboard.',
  '["Pre-built PARA methodology for instant organization", "One-click duplicate into your personal free Notion workspace", "Automated daily dashboard with morning & night routines", "Integrated Indian expense & subscription tracker", "Lifetime updates and free template enhancements"]'::jsonb,
  '[{"title": "Notion Workspace Duplicate Link", "detail": "Instant 1-click access to the full dashboard system"}, {"title": "Quick Start PDF Cheat Sheet", "detail": "Keyboard shortcuts and PARA organizational guidelines"}]'::jsonb,
  'Notion Template Link + Quickstart PDF',
  'Instant Digital Access',
  'Personal Use License (One user, unlimited devices)',
  'https://superprofile.bio/plixamind/second-brain-os',
  true,
  true,
  true,
  '[{"question": "Do I need a paid Notion account to use this?", "answer": "No! This template works 100% smoothly on the free Notion plan."}]'::jsonb
),
(
  'prod-creator-playbook',
  'solo-creator-monetization-playbook',
  'The Solo Creator Playbook: 0 to ₹1 Lakh/Month',
  'The no-BS blueprint for turning your digital skills into consistent income in India without an agency.',
  349,
  699,
  'ebooks-playbooks',
  'NEW',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'An actionable 120-page tactical guide packed with real Indian creator benchmarks, pricing calculators, email pitch templates, and distribution channels.',
  'Learn how to pick a high-value niche, package your existing skills (writing, designing, coding, editing), set prices in INR that clients gladly pay, and close deals via LinkedIn & Twitter DMs.',
  '["120 pages of practical, high-density tactical playbooks", "12 cold DM & email templates for landing domestic & international clients", "Tax & invoicing checklist for Indian sole proprietors"]'::jsonb,
  '[{"title": "The Complete Playbook (PDF & EPUB)", "detail": "High-res formatted ebook readable on phones, tablets, and Kindles"}, {"title": "DM Pitch Swipe File", "detail": "Editable Google Doc containing 12 outreach templates"}]'::jsonb,
  'PDF (120 Pages) + EPUB + Resource Sheet',
  '18 MB',
  'Single Buyer Educational License',
  'https://superprofile.bio/plixamind/creator-playbook',
  true,
  false,
  true,
  '[{"question": "Who is this playbook for?", "answer": "College students, freelancers, designers, developers, and writers who want to monetize their digital skills directly."}]'::jsonb
),
(
  'prod-nova-ui-kit',
  'nova-dark-mode-saas-figma-ui-kit',
  'Nova Dark Mode UI Kit: 450+ SaaS & App Components',
  'Modern, high-contrast dark theme Figma design system built with auto-layout v5, variables, and responsive constraints.',
  799,
  1499,
  'design-assets',
  'FEATURED',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Designed for UI/UX designers, indie hackers, and frontend developers building sleek web apps, mobile products, and AI dashboards.',
  'Supercharge your UI design workflow. Nova is a meticulously structured Figma library containing 450+ production-grade components.',
  '["450+ atomic components", "12 pre-assembled responsive dashboard layouts", "Pre-configured Figma design tokens & variables"]'::jsonb,
  '[{"title": "Figma File (.fig) & Community Link", "detail": "Direct Figma access with regular component library updates"}]'::jsonb,
  '.FIG (Figma Design File) + Tokens JSON',
  '34 MB',
  'Commercial License (Unlimited client & commercial projects)',
  'https://superprofile.bio/plixamind/nova-ui-kit',
  true,
  false,
  true,
  '[{"question": "Can I use this for client projects?", "answer": "Yes! The commercial license allows you to use Nova in unlimited client projects."}]'::jsonb
),
(
  'prod-freelance-freedom',
  'freelance-contract-proposal-suite',
  'Freelance Shield: Legal Contracts, Proposals & Invoice Pack',
  'Protect your payments, prevent scope creep, and pitch like a top-tier agency with Indian-law compliant templates.',
  299,
  599,
  'freelancer-bundles',
  'HOT',
  'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Never get ghosted on payment again. Pre-drafted master services agreements, scope of work sheets, invoice generators, and polite payment follow-up sequences.',
  'Freelance Shield gives you bulletproof legal backing and agency-level presentation. Simply fill in client details and share professional contracts in minutes.',
  '["Enforceable clauses tailored for Indian freelancers & agencies", "Editable in Google Docs, Notion, Word, and PDF", "Automated GST & Non-GST invoice calculation sheets"]'::jsonb,
  '[{"title": "Master Service Agreement Template", "detail": "Standard 4-page contract covering IP rights, confidentiality, and payments"}]'::jsonb,
  'Google Docs + Notion Links + PDF + Excel/Sheets',
  'Instant Digital Access',
  'Single Freelancer Commercial License',
  'https://superprofile.bio/plixamind/freelance-shield',
  false,
  true,
  true,
  '[{"question": "Are these contracts valid in India?", "answer": "Yes, drafted according to the Indian Contract Act, 1872 principles."}]'::jsonb
),
(
  'prod-dev-vault',
  'full-stack-system-design-dsa-vault',
  'Developer Cheat Vault: System Design & DSA Blueprint',
  'Visual roadmaps, architectural cheat sheets, and high-frequency technical interview questions summarized for quick review.',
  399,
  799,
  'developer-toolkits',
  'BESTSELLER',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Crack top tech interviews with 60+ architecture diagrams, database trade-off matrices, and LeetCode pattern summaries.',
  'Engineered for CS students and software engineers prepping for product company and startup interviews.',
  '["60+ high-res architecture visual diagrams and flowcharts", "Database comparison matrix (PostgreSQL, Redis, Mongo, Kafka)", "14 DSA algorithmic pattern templates"]'::jsonb,
  '[{"title": "System Design Visual Handbook (PDF)", "detail": "80 pages of visual microservices, caching, and distributed system architectures"}]'::jsonb,
  'High-Res PDF + Interactive Notion Database',
  '26 MB',
  'Personal Developer License',
  'https://superprofile.bio/plixamind/developer-vault',
  false,
  true,
  true,
  '[{"question": "What programming languages are used?", "answer": "Examples are illustrated with clean pseudo-code, JavaScript/TypeScript, and Python."}]'::jsonb
)
on conflict (id) do nothing;
