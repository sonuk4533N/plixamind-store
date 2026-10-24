export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number;
  original_price?: number;
  category: string;
  badge?: 'BESTSELLER' | 'NEW' | 'FEATURED' | 'HOT' | 'SALE' | '';
  cover_image: string;
  preview_images: string[];
  short_description: string;
  description: string;
  benefits: string[];
  whats_included: { title: string; detail: string }[];
  file_format: string;
  file_size: string;
  license_type: string;
  superprofile_url: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_published: boolean;
  faqs: { question: string; answer: string }[];
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  announcement_text: string;
  announcement_link?: string;
  show_announcement: boolean;
  hero_badge: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_cta_text: string;
  support_email: string;
  support_whatsapp: string;
  meta_pixel_id: string;
  google_analytics_id: string;
  footer_text: string;
  faqs: FAQItem[];
}

export interface TrackingEventRecord {
  id: string;
  event_name: 'PageView' | 'ViewContent' | 'InitiateCheckout';
  product_id?: string;
  product_title?: string;
  value?: number;
  currency?: string;
  timestamp: string;
}
