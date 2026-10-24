import { Product, Category, SiteSettings } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Notion Systems',
    slug: 'notion-systems',
    description: 'High-performance operating systems for work, study, and life.',
    icon: 'LayoutGrid'
  },
  {
    id: 'cat-2',
    name: 'Ebooks & Playbooks',
    slug: 'ebooks-playbooks',
    description: 'Direct, actionable guides without fluff for ambitious builders.',
    icon: 'BookOpen'
  },
  {
    id: 'cat-3',
    name: 'Design & UI Assets',
    slug: 'design-assets',
    description: 'Production-ready Figma kits, icons, and aesthetic templates.',
    icon: 'Palette'
  },
  {
    id: 'cat-4',
    name: 'Developer Toolkits',
    slug: 'developer-toolkits',
    description: 'Architecture cheat sheets, boilerplates, and interview blueprints.',
    icon: 'Terminal'
  },
  {
    id: 'cat-5',
    name: 'Freelancer Bundles',
    slug: 'freelancer-bundles',
    description: 'Client proposals, invoices, legal agreements, and rate calculators.',
    icon: 'Briefcase'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-second-brain',
    slug: 'second-brain-life-os-notion',
    title: 'Second Brain 2026: The Ultimate Life & Project OS',
    tagline: 'Organize your thoughts, daily habits, college/work projects, and finances in one aesthetic Notion space.',
    price: 499,
    original_price: 999,
    category: 'notion-systems',
    badge: 'BESTSELLER',
    cover_image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'A complete personal management system built according to the PARA method. Pre-configured with automated databases, habit trackers, and milestone dashboards.',
    description: `Stop juggling ten disconnected apps. The **Second Brain 2026 OS** brings order to mental chaos. Built specifically for students, young founders, and creators aged 18–35 in India, this template eliminates procrastination with a clean, clutter-free dashboard.

### Why you will love this system
- **PARA Architecture**: Organize tasks by Projects, Areas, Resources, and Archives so you never lose an important note again.
- **Smart Habit Streak Tracker**: Visually monitor your daily workouts, reading goals, and sleep schedules.
- **Financial Pulse Monitor**: Track subscriptions, monthly expenses, and freelance cash flow in INR (₹).
- **Weekly & Monthly Review Frameworks**: Automated prompts to evaluate wins, reflect on learnings, and plan the upcoming week in under 15 minutes.`,
    benefits: [
      'Pre-built PARA methodology for instant organization',
      'One-click duplicate into your personal free Notion workspace',
      'Automated daily dashboard with morning & night routines',
      'Integrated Indian expense & subscription tracker',
      'Lifetime updates and free template enhancements'
    ],
    whats_included: [
      { title: 'Notion Workspace Duplicate Link', detail: 'Instant 1-click access to the full dashboard system' },
      { title: '18-Minute Video Setup Walkthrough', detail: 'Step-by-step loom video showing how to customize every section' },
      { title: 'Quick Start PDF Cheat Sheet', detail: 'Keyboard shortcuts and PARA organizational guidelines' },
      { title: 'Curated Resource Hub', detail: '50+ pre-filled bookmarks, book summaries, and learning logs' }
    ],
    file_format: 'Notion Template Link + Quickstart PDF',
    file_size: 'Instant Digital Access',
    license_type: 'Personal Use License (One user, unlimited devices)',
    superprofile_url: 'https://superprofile.bio/plixamind/second-brain-os',
    is_featured: true,
    is_bestseller: true,
    is_published: true,
    faqs: [
      {
        question: 'Do I need a paid Notion account to use this?',
        answer: 'No! This template works 100% smoothly on the free Notion plan. You do not need any paid tier.'
      },
      {
        question: 'How do I receive the template after paying?',
        answer: 'Delivery is instant. SuperProfile immediately shows your download link and also emails your personal copy within seconds.'
      },
      {
        question: 'Can I use this on my phone?',
        answer: 'Yes! The layout is optimized for the Notion mobile app (iOS & Android) as well as desktop browsers.'
      }
    ]
  },
  {
    id: 'prod-creator-playbook',
    slug: 'solo-creator-monetization-playbook',
    title: 'The Solo Creator Playbook: 0 to ₹1 Lakh/Month',
    tagline: 'The no-BS blueprint for turning your digital skills into consistent income in India without an agency.',
    price: 349,
    original_price: 699,
    category: 'ebooks-playbooks',
    badge: 'NEW',
    cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'An actionable 120-page tactical guide packed with real Indian creator benchmarks, pricing calculators, email pitch templates, and distribution channels.',
    description: `Tired of generic Western advice that assumes you have a massive audience and Stripe access? This playbook is crafted specifically for Indian builders and creators.

Learn how to pick a high-value niche, package your existing skills (writing, designing, coding, editing), set prices in INR that clients gladly pay, and close deals via LinkedIn & Twitter DMs.

### Key Highlights
- **Realistic Roadmaps**: Step-by-step roadmap from your first ₹5,000 gig to recurring ₹1,00,000/month retainers.
- **Copy-Paste Outreach Scripts**: 12 battle-tested cold emails and DMs with a >38% response rate.
- **Packaging Micro-Products**: How to sell templates and guides using UPI and SuperProfile with zero upfront capital.`,
    benefits: [
      '120 pages of practical, high-density tactical playbooks',
      '12 cold DM & email templates for landing domestic & international clients',
      'Dynamic Google Sheets pricing calculator included',
      'Tax & invoicing checklist for Indian sole proprietors'
    ],
    whats_included: [
      { title: 'The Complete Playbook (PDF & EPUB)', detail: 'High-res formatted ebook readable on phones, tablets, and Kindles' },
      { title: 'DM Pitch Swipe File', detail: 'Editable Google Doc containing 12 outreach templates' },
      { title: 'Client Retainer Agreement Sample', detail: 'Simple 2-page contract template to prevent payment delays' }
    ],
    file_format: 'PDF (120 Pages) + EPUB + Resource Sheet',
    file_size: '18 MB',
    license_type: 'Single Buyer Educational License',
    superprofile_url: 'https://superprofile.bio/plixamind/creator-playbook',
    is_featured: true,
    is_bestseller: false,
    is_published: true,
    faqs: [
      {
        question: 'Who is this playbook for?',
        answer: 'College students, freelancers, designers, developers, and writers who want to monetize their digital skills directly.'
      },
      {
        question: 'Does this require any paid tools?',
        answer: 'No. Every strategy in the playbook utilizes free tools (Notion, Google Docs, LinkedIn, SuperProfile).'
      }
    ]
  },
  {
    id: 'prod-nova-ui-kit',
    slug: 'nova-dark-mode-saas-figma-ui-kit',
    title: 'Nova Dark Mode UI Kit: 450+ SaaS & App Components',
    tagline: 'Modern, high-contrast dark theme Figma design system built with auto-layout v5, variables, and responsive constraints.',
    price: 799,
    original_price: 1499,
    category: 'design-assets',
    badge: 'FEATURED',
    cover_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'Designed for UI/UX designers, indie hackers, and frontend developers building sleek web apps, mobile products, and AI dashboards.',
    description: `Supercharge your UI design workflow. **Nova** is a meticulously structured Figma library containing 450+ production-grade components, complete token variables for colors, typography, spacing, and 12 complete pre-assembled screens.

### System Specs
- **Full Dark Mode**: Carefully tuned contrast ratios adhering to WCAG AA accessibility standards.
- **Figma Variables**: Instant theme swapping (Electric Purple, Neon Lime, Cyber Cyan).
- **Responsive Auto-Layout**: Every button, modal, card, and navigation bar resizes flawlessly.`,
    benefits: [
      '450+ atomic components (buttons, inputs, dropdowns, cards, navigation)',
      '12 pre-assembled responsive dashboard and landing page layouts',
      'Pre-configured Figma design tokens & variables',
      'Commercial license for client and personal projects'
    ],
    whats_included: [
      { title: 'Figma File (.fig) & Community Link', detail: 'Direct Figma access with regular component library updates' },
      { title: 'Design Tokens Export (JSON)', detail: 'Direct export for Tailwind CSS and CSS variables' },
      { title: 'Component Style Guide Sheet', detail: 'Typography hierarchy and 8pt grid documentation' }
    ],
    file_format: '.FIG (Figma Design File) + Tokens JSON',
    file_size: '34 MB',
    license_type: 'Commercial License (Unlimited client & commercial projects)',
    superprofile_url: 'https://superprofile.bio/plixamind/nova-ui-kit',
    is_featured: true,
    is_bestseller: false,
    is_published: true,
    faqs: [
      {
        question: 'Can I use this for client projects?',
        answer: 'Yes! The commercial license allows you to use Nova in unlimited client projects and commercial SaaS applications.'
      },
      {
        question: 'Which Figma version is required?',
        answer: 'Works on the standard free or paid Figma web & desktop app.'
      }
    ]
  },
  {
    id: 'prod-freelance-freedom',
    slug: 'freelance-contract-proposal-suite',
    title: 'Freelance Shield: Legal Contracts, Proposals & Invoice Pack',
    tagline: 'Protect your payments, prevent scope creep, and pitch like a top-tier agency with Indian-law compliant templates.',
    price: 299,
    original_price: 599,
    category: 'freelancer-bundles',
    badge: 'HOT',
    cover_image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'Never get ghosted on payment again. Pre-drafted master services agreements, scope of work sheets, invoice generators, and polite payment follow-up sequences.',
    description: `Did you know over 60% of independent Indian freelancers face delayed payments or unauthorized scope creep? 

**Freelance Shield** gives you bulletproof legal backing and agency-level presentation. Simply fill in client details, adjust your hourly or milestone rate, and share professional contracts in minutes.

### What is covered:
- **Scope Creep Clause**: Protects against "just one small change" requests.
- **Late Payment Penalty**: Clear, enforceable terms under Indian commercial contract laws.
- **IP Release Upon Final Payment**: Ensures copyright only transfers once your invoice is paid in full.`,
    benefits: [
      'Enforceable clauses tailored for Indian freelancers & agencies',
      'Editable in Google Docs, Notion, Microsoft Word, and PDF',
      'Automated GST & Non-GST invoice calculation sheets',
      '5 polite yet firm email scripts for chasing overdue payments'
    ],
    whats_included: [
      { title: 'Master Service Agreement Template', detail: 'Standard 4-page contract covering IP rights, confidentiality, and payments' },
      { title: 'Project Scope of Work (SOW)', detail: 'Milestone definition sheet that prevents unpaid extra work' },
      { title: 'Google Sheets Automated Invoice Generator', detail: 'Auto-calculates totals, discounts, and TDS/GST' },
      { title: 'Late Payment Escalation Sequence', detail: '5 graded email templates from day 3 to day 30 overdue' }
    ],
    file_format: 'Google Docs + Notion Links + PDF + Excel/Sheets',
    file_size: 'Instant Digital Access',
    license_type: 'Single Freelancer Commercial License',
    superprofile_url: 'https://superprofile.bio/plixamind/freelance-shield',
    is_featured: false,
    is_bestseller: true,
    is_published: true,
    faqs: [
      {
        question: 'Are these contracts valid in India?',
        answer: 'Yes, drafted according to the Indian Contract Act, 1872 principles for electronic agreements.'
      },
      {
        question: 'Can I edit the documents?',
        answer: 'Every file is 100% customizable in Google Docs, Word, or Notion.'
      }
    ]
  },
  {
    id: 'prod-dev-vault',
    slug: 'full-stack-system-design-dsa-vault',
    title: 'Developer Cheat Vault: System Design & DSA Blueprint',
    tagline: 'Visual roadmaps, architectural cheat sheets, and high-frequency technical interview questions summarized for quick review.',
    price: 399,
    original_price: 799,
    category: 'developer-toolkits',
    badge: 'BESTSELLER',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'Crack top tech interviews with 60+ architecture diagrams, database trade-off matrices, and LeetCode pattern summaries.',
    description: `Engineered for CS students and software engineers prepping for product company and startup interviews.

Skip 500-page textbooks and get straight to the core diagrams, trade-off comparisons (CAP theorem, SQL vs NoSQL, sharding, caching strategies), and pattern templates for high-load systems.`,
    benefits: [
      '60+ high-res architecture visual diagrams and flowcharts',
      'Database comparison matrix (PostgreSQL, Redis, Mongo, Kafka)',
      '14 DSA algorithmic pattern templates with code examples',
      'System design interview cheat-sheet printable PDF'
    ],
    whats_included: [
      { title: 'System Design Visual Handbook (PDF)', detail: '80 pages of visual microservices, caching, and distributed system architectures' },
      { title: 'Interactive DSA Notion Board', detail: 'Pattern-based problem tracker with time/space complexity notes' },
      { title: 'Behavioral Interview STAR Framework', detail: 'Scripted answers for managerial and HR rounds' }
    ],
    file_format: 'High-Res PDF + Interactive Notion Database',
    file_size: '26 MB',
    license_type: 'Personal Developer License',
    superprofile_url: 'https://superprofile.bio/plixamind/developer-vault',
    is_featured: false,
    is_bestseller: true,
    is_published: true,
    faqs: [
      {
        question: 'What programming languages are used?',
        answer: 'Examples are illustrated with clean pseudo-code, JavaScript/TypeScript, and Python.'
      }
    ]
  },
  {
    id: 'prod-icon-pack',
    slug: 'aesthetic-vector-icon-pack-1200',
    title: 'Minimalist Vector Icon Pack: 1,200+ Handcrafted Icons',
    tagline: 'Clean, pixel-perfect outline & solid icons in SVG, Figma, and React component formats for modern web apps.',
    price: 249,
    original_price: 499,
    category: 'design-assets',
    badge: 'NEW',
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'Consistent 24x24 grid icons spanning finance, commerce, interface, arrows, social media, and productivity categories.',
    description: `Clean vector iconography elevates any user interface from amateur to award-winning. Every icon in this collection is drawn on a strict 24x24 pixel grid with uniform 2px stroke weight.`,
    benefits: [
      '1,200+ icons in 2 distinct styles (Clean Outline & Solid Fill)',
      'Optimized SVGs with zero extra metadata (<1 KB each)',
      'Direct copy-paste React component library included',
      'Lifetime additions as new icon requests are fulfilled'
    ],
    whats_included: [
      { title: 'Organized SVG Directory (ZIP)', detail: 'Categorized folders for seamless drag-and-drop' },
      { title: 'Figma Component Library', detail: 'Single master component with variants' },
      { title: 'Webfont & CSS bundle', detail: 'Ready for HTML/CSS projects' }
    ],
    file_format: 'ZIP (SVGs, Figma file, React Icon components)',
    file_size: '14 MB',
    license_type: 'Commercial & Personal Multi-Project License',
    superprofile_url: 'https://superprofile.bio/plixamind/vector-icons',
    is_featured: false,
    is_bestseller: false,
    is_published: true,
    faqs: [
      {
        question: 'Are there any usage restrictions?',
        answer: 'You may use them in unlimited commercial client sites and applications. Only reselling the raw pack is prohibited.'
      }
    ]
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  announcement_text: '⚡ FLASH LAUNCH SALE: Get up to 50% OFF all digital templates & toolkits this week! Instant download via SuperProfile.',
  announcement_link: '#products',
  show_announcement: true,
  hero_badge: '⚡ INDIA’S PREMIER DIGITAL ASSET STORE',
  hero_headline: 'Level Up Your Workflow With High-Impact Digital Assets',
  hero_subheadline: 'Actionable Notion systems, developer cheat vaults, battle-tested freelancing contracts, and Figma UI kits built for India’s next-gen creators and builders.',
  hero_cta_text: 'Explore Store',
  support_email: 'support@plixamind.com',
  support_whatsapp: '+91 98765 43210',
  meta_pixel_id: '',
  google_analytics_id: '',
  footer_text: 'Plixamind is an independent digital asset boutique. All payments are processed securely via SuperProfile with support for UPI, RuPay, Visa, Mastercard, and NetBanking.',
  faqs: [
    {
      id: 'faq-1',
      question: 'How do digital downloads and deliveries work?',
      answer: 'Delivery is 100% automated and instant. Once you complete your checkout on SuperProfile, you are immediately redirected to your download page and also receive an email with your access links and files.'
    },
    {
      id: 'faq-2',
      question: 'What payment methods are supported on checkout?',
      answer: 'Our checkout is powered by SuperProfile, which supports all major Indian payment methods: UPI (Google Pay, PhonePe, Paytm, CRED), Debit & Credit Cards (Visa, Mastercard, RuPay), and NetBanking across 50+ Indian banks.'
    },
    {
      id: 'faq-3',
      question: 'What is the refund policy on digital products?',
      answer: 'Because digital files and Notion duplicate links cannot be revoked once delivered, all sales are generally final. However, if a file is damaged or you encounter technical issues, our support team will resolve it or provide an alternate asset within 48 hours.'
    },
    {
      id: 'faq-4',
      question: 'Can I use these assets for client projects or commercial work?',
      answer: 'Products labeled with a Commercial License (like our UI Kits, Contract Suites, and Icon Packs) can be used for unlimited client projects. Products marked Personal License (like personal Notion systems) are intended for single-user personal use.'
    },
    {
      id: 'faq-5',
      question: 'Will I receive future updates to the products I buy?',
      answer: 'Yes! When templates or guides receive major version updates, you will receive an updated download link via email at no extra charge.'
    }
  ]
};
