/**
 * SEO Hooks
 * 
 * Custom React hooks for SEO management and optimization.
 */

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SEO_CONFIG } from '../config/seo';

/**
 * Hook for managing page SEO metadata dynamically
 */
export function useSEO() {

  /**
   * Update page title
   */
  const updateTitle = useCallback((title: string) => {
    document.title = title;
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
  }, []);

  /**
   * Update page description
   */
  const updateDescription = useCallback((description: string) => {
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
  }, []);

  /**
   * Update canonical URL
   */
  const updateCanonical = useCallback((url: string) => {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
    
    // Update Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    }
  }, []);

  /**
   * Update page image
   */
  const updateImage = useCallback((imageUrl: string) => {
    // Update Open Graph image
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', imageUrl);
    }
    
    // Update Twitter image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', imageUrl);
    }
  }, []);

  /**
   * Update keywords
   */
  const updateKeywords = useCallback((keywords: string[]) => {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords.join(', '));
    }
  }, []);

  /**
   * Track page view for analytics
   */
  const trackPageView = useCallback((pageTitle: string, pageUrl: string) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', SEO_CONFIG.analytics.googleAnalytics || '', {
        page_title: pageTitle,
        page_location: pageUrl
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

  /**
   * Track custom events
   */
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  }, []);

  return {
    updateTitle,
    updateDescription,
    updateCanonical,
    updateImage,
    updateKeywords,
    trackPageView,
    trackEvent
  };
}

/**
 * Hook for managing structured data
 */
export function useStructuredData() {
  /**
   * Add structured data to page
   */
  const addStructuredData = useCallback((data: Record<string, unknown>) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  /**
   * Remove structured data from page
   */
  const removeStructuredData = useCallback((data: Record<string, unknown>) => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => {
      try {
        const scriptData = JSON.parse(script.textContent || '{}');
        if (JSON.stringify(scriptData) === JSON.stringify(data)) {
          script.remove();
        }
      } catch (error) {
        console.warn('Error parsing structured data:', error);
      }
    });
  }, []);

  return {
    addStructuredData,
    removeStructuredData
  };
}

/**
 * Hook for managing page performance metrics
 */
export function usePagePerformance() {
  /**
   * Track Core Web Vitals
   */
  const trackWebVitals = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime)
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (window.gtag && 'processingStart' in entry) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round((entry as PerformanceEntry).processingStart! - entry.startTime)
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!('hadRecentInput' in entry) || !(entry as PerformanceEntry).hadRecentInput) {
          clsValue += ('value' in entry) ? (entry as PerformanceEntry).value! : 0;
        }
      });
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000)
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }, []);

  /**
   * Track page load time
   */
  const trackPageLoadTime = useCallback(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const loadTime = performance.now();
      
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          event_category: 'Performance',
          event_label: 'Page Load',
          value: Math.round(loadTime)
        });
      }
    });
  }, []);

  useEffect(() => {
    trackWebVitals();
    trackPageLoadTime();
  }, [trackWebVitals, trackPageLoadTime]);

  return {
    trackWebVitals,
    trackPageLoadTime
  };
}

/**
 * Hook for managing SEO-friendly navigation
 */
export function useSEONavigation() {
  const router = useRouter();

  /**
   * Navigate with SEO tracking
   */
  const navigateWithSEO = useCallback((url: string, title?: string) => {
    // Track navigation event
    if (window.gtag) {
      window.gtag('event', 'navigation', {
        event_category: 'User Interaction',
        event_label: 'Page Navigation',
        page_url: url,
        page_title: title
      });
    }

    // Navigate
    router.push(url);
  }, [router]);

  return {
    navigateWithSEO
  };
}

const seoHooks = {
  useSEO,
  useStructuredData,
  usePagePerformance,
  useSEONavigation
};

export default seoHooks;
