import { Product } from '../types';
import { storeService } from './storeService';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let activePixelId: string | null = null;
let activeGaId: string | null = null;

export const analyticsService = {
  initialize(pixelId?: string, gaId?: string) {
    if (typeof window === 'undefined') return;

    // Initialize Meta Pixel
    if (pixelId && pixelId.trim() && pixelId !== activePixelId) {
      activePixelId = pixelId.trim();
      try {
        if (!window.fbq) {
          /* eslint-disable */
          (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
            if (f.fbq) return;
            n = f.fbq = function () {
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
          })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
          /* eslint-enable */
        }
        window.fbq?.('init', activePixelId);
        window.fbq?.('track', 'PageView');
        console.info(`[Analytics] Meta Pixel initialized with ID: ${activePixelId}`);
      } catch (err) {
        console.warn('[Analytics] Failed to initialize Meta Pixel:', err);
      }
    }

    // Initialize Google Analytics 4
    if (gaId && gaId.trim() && gaId !== activeGaId) {
      activeGaId = gaId.trim();
      try {
        const scriptId = 'google-analytics-script';
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(activeGaId)}`;
          document.head.appendChild(script);

          window.dataLayer = window.dataLayer || [];
          window.gtag = function () {
            window.dataLayer?.push(arguments);
          };
          window.gtag('js', new Date());
          window.gtag('config', activeGaId);
          console.info(`[Analytics] Google Analytics initialized with ID: ${activeGaId}`);
        }
      } catch (err) {
        console.warn('[Analytics] Failed to initialize Google Analytics:', err);
      }
    }
  },

  trackPageView(path?: string) {
    storeService.recordEvent({
      event_name: 'PageView',
      product_title: path || window.location.pathname
    });

    if (window.fbq && activePixelId) {
      window.fbq('track', 'PageView');
    }
    if (window.gtag && activeGaId) {
      window.gtag('event', 'page_view', {
        page_path: path || window.location.pathname
      });
    }
  },

  trackViewContent(product: Product) {
    storeService.recordEvent({
      event_name: 'ViewContent',
      product_id: product.id,
      product_title: product.title,
      value: product.price,
      currency: 'INR'
    });

    if (window.fbq && activePixelId) {
      window.fbq('track', 'ViewContent', {
        content_name: product.title,
        content_category: product.category,
        content_ids: [product.id, product.slug],
        content_type: 'product',
        value: product.price,
        currency: 'INR'
      });
    }

    if (window.gtag && activeGaId) {
      window.gtag('event', 'view_item', {
        currency: 'INR',
        value: product.price,
        items: [
          {
            item_id: product.slug,
            item_name: product.title,
            item_category: product.category,
            price: product.price
          }
        ]
      });
    }
  },

  trackInitiateCheckout(product: Product) {
    storeService.recordEvent({
      event_name: 'InitiateCheckout',
      product_id: product.id,
      product_title: product.title,
      value: product.price,
      currency: 'INR'
    });

    if (window.fbq && activePixelId) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: product.title,
        content_category: product.category,
        content_ids: [product.id, product.slug],
        content_type: 'product',
        value: product.price,
        currency: 'INR',
        num_items: 1
      });
    }

    if (window.gtag && activeGaId) {
      window.gtag('event', 'begin_checkout', {
        currency: 'INR',
        value: product.price,
        items: [
          {
            item_id: product.slug,
            item_name: product.title,
            item_category: product.category,
            price: product.price
          }
        ]
      });
    }
  }
};
