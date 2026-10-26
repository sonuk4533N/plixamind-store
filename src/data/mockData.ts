import { Product, Category, SiteSettings } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Notion Systems',
    slug: 'notion-systems',
    description: 'High-performance operating systems for project governance, operations, and focus.',
    icon: 'LayoutGrid'
  },
  {
    id: 'cat-2',
    name: 'Ebooks & Playbooks',
    slug: 'ebooks-playbooks',
    description: 'Authoritative, field-tested guides and monetization playbooks for ambitious builders.',
    icon: 'BookOpen'
  },
  {
    id: 'cat-3',
    name: 'Design & UI Assets',
    slug: 'design-assets',
    description: 'Production-ready Figma design systems, component libraries, and vector assets.',
    icon: 'Palette'
  },
  {
    id: 'cat-4',
    name: 'Developer Toolkits',
    slug: 'developer-toolkits',
    description: 'Distributed system architectures, engineering cheat sheets, and interview blueprints.',
    icon: 'Terminal'
  },
  {
    id: 'cat-5',
    name: 'Freelancer Bundles',
    slug: 'freelancer-bundles',
    description: 'Commercial service agreements, proposal decks, invoice engines, and client workflows.',
    icon: 'Briefcase'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-second-brain',
    slug: 'second-brain-life-os-notion',
    title: 'Second Brain 2026: The Ultimate Life & Project OS',
    tagline: 'Centralize your projects, daily routines, strategic goals, and personal finances into one cohesive Notion workspace.',
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
    short_description: 'An enterprise-grade personal management system built on the PARA methodology. Pre-configured with automated relational databases, habit streaks, and milestone dashboards.',
    description: `Eliminate mental clutter and disconnected tools. The **Second Brain 2026 OS** provides a centralized digital headquarters built on the proven PARA methodology. Architected with clean minimalist aesthetic principles, it streamlines your daily execution and high-priority milestones into a single, high-velocity dashboard.

### Key Capabilities
- **Standardized PARA Architecture**: Seamlessly organize tasks across Projects, Areas, Resources, and Archives so critical information is always accessible.
- **Goal & Habit Streak Engine**: Visually track daily focus sessions, health routines, and long-term milestones with automatic progress metrics.
- **Financial Pulse Monitor**: Track recurring subscriptions, monthly budgets, and independent cash flow in INR (₹).
- **Strategic Review System**: Pre-built weekly and monthly retrospective templates to review accomplishments and schedule upcoming sprints in under 15 minutes.`,
    benefits: [
      'Standardized PARA architecture for structured project governance',
      'One-click workspace duplication compatible with free Notion accounts',
      'Automated daily dashboard with routine and focus tracking',
      'Integrated financial pulse and recurring expense monitor in INR (₹)',
      'Lifetime updates with free version enhancements'
    ],
    whats_included: [
      { title: 'Notion Workspace Duplicate Link', detail: 'Instant 1-click access to the full dashboard system' },
      { title: 'Setup & Customization Video Guide', detail: 'Step-by-step walkthrough detailing how to customize and scale each database' },
      { title: 'Implementation & Shortcut Guide (PDF)', detail: 'Comprehensive quick-reference sheet for PARA structure and keyboard shortcuts' },
      { title: 'Curated Resource Hub', detail: '50+ pre-filled industry bookmarks, reading lists, and reference templates' }
    ],
    file_format: 'Notion Template Link + Quickstart PDF',
    file_size: 'Instant Digital Access',
    license_type: 'Personal Use License (One user, unlimited personal devices)',
    superprofile_url: 'https://superprofile.bio/plixamind/second-brain-os',
    is_featured: true,
    is_bestseller: true,
    is_published: true,
    faqs: [
      {
        question: 'Do I need a paid Notion account to use this?',
        answer: 'No. This operating system is 100% compatible with Notion\'s free tier. No premium subscription is required.'
      },
      {
        question: 'How do I receive access after completing checkout?',
        answer: 'Fulfillment is instantaneous. Once checkout completes on SuperProfile, you are immediately redirected to your access portal and receive a confirmation email with duplication instructions.'
      },
      {
        question: 'Is it optimized for mobile devices?',
        answer: 'Yes. All databases and views are optimized for the Notion mobile application (iOS and Android) as well as desktop displays.'
      }
    ]
  },
  {
    id: 'prod-creator-playbook',
    slug: 'solo-creator-monetization-playbook',
    title: 'The Solo Creator Playbook: 0 to ₹1 Lakh/Month',
    tagline: 'A tactical framework for transforming digital expertise into sustainable recurring income without agency overhead.',
    price: 349,
    original_price: 699,
    category: 'ebooks-playbooks',
    badge: 'NEW',
    cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'An actionable 120-page tactical guide packed with realistic monetization models, client pricing matrices, cold outreach templates, and distribution channels.',
    description: `Most creator playbooks assume preexisting massive audiences or international payment rails. This playbook provides rigorous, localized frameworks built specifically for modern independent specialists, designers, and developers.

From validating high-ticket offerings to structuring service retainers and distributing digital products using UPI and SuperProfile, this guide covers every phase of digital business building.

### Key Highlights
- **Phased Revenue Roadmaps**: Systematic milestones scaling from your initial ₹10,000 engagement to predictable ₹1,00,000+ monthly revenue.
- **Tested Client Outreach Scripts**: 12 calibrated email and direct outreach templates with verified engagement metrics.
- **Micro-Product Launch Systems**: Proven frameworks for packaging templates, guides, and toolkits with zero upfront capital.`,
    benefits: [
      '120 pages of tactical frameworks and field-tested strategies',
      '12 calibrated outreach templates for domestic and global clients',
      'Dynamic financial pricing and retainer model spreadsheet',
      'Invoicing and tax readiness checklist for independent creators'
    ],
    whats_included: [
      { title: 'The Complete Playbook (PDF & EPUB)', detail: 'High-resolution digital book readable on desktop, tablet, and mobile' },
      { title: 'Direct Outreach Swipe File', detail: 'Editable document containing 12 proven outreach scripts and follow-up cadences' },
      { title: 'Client Retainer Agreement Sample', detail: 'Standardized contract template to ensure timely milestone payments' }
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
        question: 'Who is this playbook designed for?',
        answer: 'Independent creators, designers, developers, writers, and digital consultants seeking to monetize their specialized skills directly.'
      },
      {
        question: 'Does this require any expensive subscriptions or tools?',
        answer: 'No. Every strategy in the playbook utilizes standard, readily accessible tools including Notion, Google Docs, LinkedIn, and SuperProfile.'
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
    short_description: 'Engineered for product designers, indie hackers, and frontend teams building sleek web applications, mobile interfaces, and AI dashboards.',
    description: `Accelerate your product design cycle. **Nova** is an enterprise-grade Figma design system engineered with 450+ production-ready components, complete token variables for colors, typography, spacing, and 12 pre-assembled responsive layouts.

### Architecture Highlights
- **WCAG AA Compliant Dark Mode**: Balanced contrast ratios tuned for extended viewing and modern SaaS aesthetics.
- **Figma Variables & Token Architecture**: Instant multi-theme swapping across core accent palettes.
- **Full Auto-Layout Constraints**: Every component, modal, navigation bar, and data table resizes responsively.`,
    benefits: [
      '450+ atomic components (inputs, navigation, modal dialogs, data tables)',
      '12 pre-assembled responsive dashboard and landing page layouts',
      'Configured Figma design tokens and multi-palette variables',
      'Commercial license for unlimited client and commercial products'
    ],
    whats_included: [
      { title: 'Figma File (.fig) & Community Access', detail: 'Full component library with regular architectural updates' },
      { title: 'Design Tokens Export (JSON)', detail: 'Directly importable variables for Tailwind CSS and CSS custom properties' },
      { title: 'Component Style Guide Documentation', detail: 'Design token hierarchy and 8pt spatial grid guidelines' }
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
        question: 'Can I use this for client deliverables and SaaS apps?',
        answer: 'Yes. The commercial license explicitly allows usage across unlimited client deliverables, freelance projects, and commercial SaaS applications.'
      },
      {
        question: 'Which Figma plan or version is required?',
        answer: 'Works seamlessly on both free and paid Figma accounts across web and desktop applications.'
      }
    ]
  },
  {
    id: 'prod-freelance-freedom',
    slug: 'freelance-contract-proposal-suite',
    title: 'Freelance Shield: Legal Contracts, Proposals & Invoice Pack',
    tagline: 'Standardize client contracts, protect milestone deliverables, and eliminate scope creep with commercial agreements.',
    price: 299,
    original_price: 599,
    category: 'freelancer-bundles',
    badge: 'HOT',
    cover_image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'Comprehensive service agreements, statements of work, automated invoice generators, and professional client communication sequences.',
    description: `Contractual clarity and ironclad scope protection are essential for any thriving independent business. **Freelance Shield** delivers production-ready service agreements, structured milestone sheets, and automated financial tools designed to secure your cash flow.

Simply configure client details, define deliverables and payment terms, and deliver enforceable agreements in minutes.

### Legal Coverage
- **Scope Creep Provisions**: Protects billable hours against undefined revision cycles and scope expansion.
- **Late Payment & Interest Clauses**: Clear, enforceable terms under Indian commercial contract law.
- **Intellectual Property Protection**: Guarantees that ownership of deliverables transfers only upon complete settlement of invoices.`,
    benefits: [
      'Enforceable commercial clauses tailored for independent specialists and studios',
      'Fully editable in Google Docs, Notion, Microsoft Word, and PDF',
      'Automated GST and standard invoice calculation spreadsheets',
      'Structured payment communication sequence for prompt reconciliation'
    ],
    whats_included: [
      { title: 'Master Service Agreement (MSA)', detail: 'Standard contract covering scope, intellectual property, confidentiality, and payments' },
      { title: 'Project Scope of Work (SOW)', detail: 'Milestone definition schedule preventing uncompensated revisions' },
      { title: 'Automated Invoice Generator (Sheets)', detail: 'Auto-calculates milestones, sub-totals, TDS deductions, and taxes' },
      { title: 'Payment Communication Cadence', detail: 'Calibrated email and message templates for polite, assertive payment follow-up' }
    ],
    file_format: 'Google Docs + Notion Links + PDF + Sheets',
    file_size: 'Instant Digital Access',
    license_type: 'Single Freelancer Commercial License',
    superprofile_url: 'https://superprofile.bio/plixamind/freelance-shield',
    is_featured: false,
    is_bestseller: true,
    is_published: true,
    faqs: [
      {
        question: 'Are these agreements legally compliant in India?',
        answer: 'Yes. Drafted in accordance with the Indian Contract Act, 1872 and standardized electronic contract principles.'
      },
      {
        question: 'Can I customize the terms for specific clients?',
        answer: 'Every document is completely editable in Google Docs, Word, or Notion, allowing you to tailor terms to specific client requirements.'
      }
    ]
  },
  {
    id: 'prod-dev-vault',
    slug: 'full-stack-system-design-dsa-vault',
    title: 'Developer Cheat Vault: System Design & DSA Blueprint',
    tagline: 'Architectural blueprints, trade-off matrices, and high-frequency technical interview patterns condensed for rapid reference.',
    price: 399,
    original_price: 799,
    category: 'developer-toolkits',
    badge: 'BESTSELLER',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'Comprehensive technical reference featuring 60+ distributed system diagrams, database comparison matrices, and algorithmic pattern summaries.',
    description: `Engineered for software engineers and systems architects preparing for high-standard technical interviews and production system design.

Distills complex distributed systems literature into high-yield visual architectures, trade-off matrices (CAP theorem, relational vs distributed storage, cache invalidation, sharding), and algorithmic patterns for scalable architectures.

### Blueprint Highlights
- **60+ Distributed Systems Visuals**: Clear sequence flows for caching, load balancing, consensus, and event streaming.
- **Trade-off Decision Matrices**: Side-by-side technical comparisons for databases, messaging queues, and compute layers.
- **Core Algorithmic Patterns**: Pattern-first breakdowns for graph traversal, dynamic programming, and two-pointer techniques.`,
    benefits: [
      '60+ high-resolution architectural visual diagrams and flowcharts',
      'Database evaluation matrix (PostgreSQL, Redis, MongoDB, Kafka)',
      '14 algorithmic pattern blueprints with multi-language code snippets',
      'System design interview reference handbook (printable PDF)'
    ],
    whats_included: [
      { title: 'System Design Visual Handbook (PDF)', detail: '80 pages of visual microservices, caching, and distributed system architectures' },
      { title: 'Interactive DSA Notion Database', detail: 'Pattern-based problem tracking repository with time and space complexity notes' },
      { title: 'Technical Leadership STAR Framework', detail: 'Structured response patterns for system architecture and behavioral rounds' }
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
        question: 'What programming languages are demonstrated?',
        answer: 'Core concepts and algorithms are illustrated with clean pseudo-code, TypeScript/JavaScript, and Python.'
      }
    ]
  },
  {
    id: 'prod-icon-pack',
    slug: 'aesthetic-vector-icon-pack-1200',
    title: 'Minimalist Vector Icon Pack: 1,200+ Handcrafted Icons',
    tagline: 'Pixel-perfect outline and solid vector icons optimized in SVG, Figma components, and React code formats.',
    price: 249,
    original_price: 499,
    category: 'design-assets',
    badge: 'NEW',
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    preview_images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    short_description: 'Uniform 24x24 pixel grid vector icons covering software interfaces, commerce, analytics, navigation, and developer tools.',
    description: `Consistent, crisp iconography elevates user interfaces from ordinary to award-winning. Every icon in this collection is drawn on a strict 24x24 pixel grid with uniform 2px stroke geometry and optical balancing.

Optimized for performance with clean SVGs that drop right into web and mobile codebases with zero bloat.

### Design System Specifications
- **Dual Visual Styles**: 1,200+ icons in both clean geometric outline and solid filled weights.
- **Optimized SVG Footprint**: Stripped metadata resulting in sub-1KB file sizes.
- **Component Integration**: Copy-paste React SVG components ready for frontend frameworks.`,
    benefits: [
      '1,200+ icons in 2 distinct styles (Clean Outline & Solid Fill)',
      'Optimized SVGs with zero extraneous metadata (<1 KB per asset)',
      'Direct copy-paste React icon component library included',
      'Free ongoing additions as new icon requests are integrated'
    ],
    whats_included: [
      { title: 'Organized SVG Directory (ZIP)', detail: 'Categorized asset folders for drag-and-drop workflow' },
      { title: 'Figma Master Component Library', detail: 'Single master component with stroke and variant properties' },
      { title: 'Webfont & React Component Kit', detail: 'Ready for instant web integration' }
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
        question: 'Are there any commercial usage limits?',
        answer: 'You may integrate these icons into unlimited client websites, mobile apps, and commercial products. Only direct resale of the raw icon pack is prohibited.'
      }
    ]
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  announcement_text: '⚡ Special Release: Up to 50% off production-grade operating systems, developer blueprints & UI toolkits.',
  announcement_link: '#products',
  show_announcement: true,
  hero_badge: 'VERIFIED DIGITAL ASSETS & SYSTEMS',
  hero_headline: 'Level Up Your Workflow With High-Impact Digital Assets',
  hero_subheadline: 'Production-ready Notion operating systems, architectural roadmaps, commercial legal suites, and Figma design kits engineered for founders, engineers, and digital specialists.',
  hero_cta_text: 'Explore Store',
  support_email: 'support@plixamind.com',
  support_whatsapp: '',
  meta_pixel_id: '',
  google_analytics_id: '',
  footer_text: 'Plixamind is an independent digital asset boutique. All transactions are securely processed via SuperProfile with support for UPI, RuPay, Visa, Mastercard, and NetBanking.',
  faqs: [
    {
      id: 'faq-1',
      question: 'How do digital downloads and deliveries work?',
      answer: 'Delivery is 100% automated and instant. Once checkout is completed on SuperProfile, you are immediately redirected to your access dashboard and also receive a confirmation email containing your direct files and workspace duplicate links.'
    },
    {
      id: 'faq-2',
      question: 'What payment methods are supported at checkout?',
      answer: 'Checkout is powered by SuperProfile, supporting all major payment instruments: UPI (Google Pay, PhonePe, Paytm, CRED), Debit & Credit Cards (Visa, Mastercard, RuPay), and NetBanking across 50+ banks.'
    },
    {
      id: 'faq-3',
      question: 'What is the policy regarding digital product purchases?',
      answer: 'Because Notion workspace duplicate links, design assets, and digital files cannot be recalled once delivered, sales are generally non-refundable. However, if you encounter any technical difficulty or corrupted file, our support team will resolve it or provide an alternate asset within 24 business hours.'
    },
    {
      id: 'faq-4',
      question: 'Can I use these assets for client projects or commercial products?',
      answer: 'Products designated with a Commercial License (including UI Kits, Contract Suites, and Icon Packs) can be utilized in unlimited client projects and commercial SaaS applications. Products marked with a Personal License are for individual productivity and workflow use.'
    },
    {
      id: 'faq-5',
      question: 'Will I receive future updates to the products I purchase?',
      answer: 'Yes. Whenever templates or guides receive architectural updates, new components, or regulatory revisions, an updated download notification is emailed to you at no additional charge.'
    }
  ]
};
