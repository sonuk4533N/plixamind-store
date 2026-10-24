import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  Zap,
  Layers,
  ChevronRight,
  Share2
} from 'lucide-react';
import type { Product, SiteSettings } from '../types';
import { storeService } from '../services/storeService';
import { analyticsService } from '../services/analyticsService';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);

      const [foundProduct, allProducts, siteConfig] = await Promise.all([
        storeService.getProductBySlug(slug),
        storeService.getProducts(),
        storeService.getSiteSettings()
      ]);

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.cover_image);

        // SEO meta
        document.title = `${foundProduct.title} — Plixamind`;

        // Analytics tracking: ViewContent
        analyticsService.trackViewContent(foundProduct);

        // Related products (same category or other published products)
        const related = allProducts
          .filter(p => p.id !== foundProduct.id && p.is_published)
          .sort((a, b) => (a.category === foundProduct.category ? -1 : 1))
          .slice(0, 3);
        setRelatedProducts(related);
      } else {
        document.title = 'Product Not Found — Plixamind';
      }

      setSettings(siteConfig);
      setLoading(false);
    }

    loadData();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBuyNowClick = () => {
    if (product) {
      analyticsService.trackInitiateCheckout(product);
    }
  };

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-neon-bright border-t-transparent animate-spin" />
          <p className="text-sm font-semibold tracking-wide text-slate-300">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex flex-col justify-between">
        {settings && <Navbar />}
        <main className="max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-display font-extrabold text-white mb-3">Product Not Found</h1>
          <p className="text-slate-400 text-sm mb-6">
            The digital product you are looking for may have been retired or moved.
          </p>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-bright to-neon-lime text-charcoal-950 font-bold text-sm inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>
        </main>
        {settings && <Footer settings={settings} />}
      </div>
    );
  }

  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const galleryImages = [
    product.cover_image,
    ...(product.preview_images || [])
  ].filter((img, idx, arr) => img && arr.indexOf(img) === idx);

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-between selection:bg-neon-bright selection:text-charcoal-950">
      
      {/* Announcement Bar & Header */}
      {settings && <AnnouncementBar settings={settings} />}
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <Link to="/#products" className="hover:text-white transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <span className="text-slate-200 font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Hero Grid (Left: Gallery, Right: Details & SuperProfile Buy Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Showcase Image */}
            <div className="glass-card rounded-3xl overflow-hidden aspect-[16/10] bg-charcoal-900 border border-white/10 relative group">
              <img
                src={selectedImage || product.cover_image}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badge && (
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-neon-bright text-charcoal-950 uppercase tracking-wider shadow-lg">
                    {product.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-rose-500 text-white shadow-lg">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Carousel / Selector */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      selectedImage === imgUrl
                        ? 'border-neon-bright scale-105 shadow-md shadow-neon/20'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Format & Size Specs Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-charcoal-900/80 border border-white/8 text-center text-xs">
              <div>
                <p className="text-slate-400">File Type</p>
                <p className="font-semibold text-white truncate mt-0.5">{product.file_format}</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-slate-400">Delivery</p>
                <p className="font-semibold text-neon-bright mt-0.5">Instant Access</p>
              </div>
              <div>
                <p className="text-slate-400">License</p>
                <p className="font-semibold text-white truncate mt-0.5">{product.license_type.split('(')[0]}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Pricing & SuperProfile Checkout Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Category & Share */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-electric/15 text-electric-light border border-electric/30 uppercase tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>

                <button
                  onClick={handleShareClick}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5"
                  title="Copy product link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                </button>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing Card */}
              <div className="p-6 rounded-2xl glass-card border border-purple-500/30 space-y-4">
                
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-display font-black text-white">
                      ₹{product.price}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-base text-slate-400 line-through ml-3">
                        ₹{product.original_price}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-neon-bright bg-neon/10 px-2.5 py-1 rounded-full border border-neon/20">
                    One-time payment
                  </span>
                </div>

                {/* Primary Buy Now Button */}
                <a
                  href={product.superprofile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBuyNowClick}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-neon-bright via-neon-lime to-emerald-400 text-charcoal-950 font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2.5 hover:opacity-95 shadow-xl shadow-neon/20 transition-all cursor-pointer group"
                >
                  <Zap className="w-5 h-5 fill-charcoal-950" />
                  <span>Buy Now — Instant Download</span>
                  <ExternalLink className="w-4 h-4 text-charcoal-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Payment & Security Trust Bullets */}
                <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Secure 256-bit checkout powered by <strong>SuperProfile</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Accepted: UPI (GPay, PhonePe, Paytm), RuPay, Cards & NetBanking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-neon-bright flex-shrink-0" />
                    <span>Instant access link displayed on screen and sent to your email</span>
                  </div>
                </div>

              </div>

              {/* Quick Benefits Bullet List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Highlights
                </h4>
                {product.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-neon-bright flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Detailed Tabs / Product Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 border-t border-white/10">
          
          {/* Main Content: Description & Whats Included (2 Cols) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Description */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                About This Digital Asset
              </h2>
              <div className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                {product.description}
              </div>
            </div>

            {/* What's Included (Itemized Checklist) */}
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                What's Included in Your Download
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.whats_included.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-charcoal-900/90 border border-white/8 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                      <FileText className="w-4 h-4 text-neon-bright flex-shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">
                  Product FAQs
                </h2>
                <div className="space-y-3">
                  {product.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-charcoal-900 border border-white/8"
                    >
                      <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 pl-6 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: License & Delivery Details (1 Col) */}
          <div className="space-y-6">
            
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-neon-bright" />
                <span>License Terms</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {product.license_type}
              </p>
              <ul className="text-xs text-slate-400 space-y-2 border-t border-white/10 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neon-bright flex-shrink-0" />
                  <span>Lifetime personal or client use</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neon-bright flex-shrink-0" />
                  <span>Free future version updates</span>
                </li>
                <li className="flex items-center gap-2 text-rose-300">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] flex items-center justify-center font-bold flex-shrink-0">✕</span>
                  <span>Reselling or redistributing raw files is strictly prohibited</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link to="/license" className="text-xs text-neon-bright hover:underline">
                  Read complete licensing policy →
                </Link>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
              <h3 className="font-display font-bold text-base text-white">
                Questions before buying?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reach out to our support team directly. We respond within 12 hours.
              </p>
              <Link
                to="/contact"
                className="inline-block text-xs font-bold text-electric-light hover:underline pt-1"
              >
                Chat with Plixamind Support →
              </Link>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="py-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  You Might Also Like
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Complementary assets to supercharge your workflow.
                </p>
              </div>
              <Link
                to="/#products"
                className="text-xs font-bold text-neon-bright hover:underline"
              >
                View all products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      {settings && <Footer settings={settings} />}
    </div>
  );
};
