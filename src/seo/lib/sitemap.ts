/**
 * Sitemap Generation
 * 
 * Dynamic sitemap generation for better SEO and search engine crawling.
 */

import { SEO_CONFIG } from '../config/seo';

/**
 * Sitemap URL entry interface
 */
export interface SitemapUrl {
  /** URL path */
  loc: string;
  /** Last modification date */
  lastmod?: string;
  /** Change frequency */
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Priority (0.0 to 1.0) */
  priority?: number;
}

/**
 * Generate sitemap XML
 */
export function generateSitemap(urls: SitemapUrl[]): string {
  const baseUrl = SEO_CONFIG.site.url;
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapUrls = urls.map(url => {
    const fullUrl = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    const lastmod = url.lastmod || currentDate;
    const changefreq = url.changefreq || 'weekly';
    const priority = url.priority || 0.8;

    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;
}

/**
 * Default sitemap URLs for IF Funds
 */
export const defaultSitemapUrls: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: 1.0
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: '/members',
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    loc: '/insights',
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    loc: '/tools',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: '/portfolio',
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: '/prelist',
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: '/markets',
    changefreq: 'hourly',
    priority: 0.9
  },
  {
    loc: '/terms-of-service',
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: '/privacy-policy',
    changefreq: 'yearly',
    priority: 0.3
  }
];

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const baseUrl = SEO_CONFIG.site.url;
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important pages
Allow: /
Allow: /about
Allow: /members
Allow: /insights
Allow: /tools
Allow: /portfolio
Allow: /prelist
Allow: /markets

# Block common bot traps
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*ref=*
Disallow: /*?*source=*

# Allow social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Block aggressive crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`;
}

/**
 * Generate manifest.json for PWA
 */
export function generateManifest(): string {
  return JSON.stringify({
    "name": SEO_CONFIG.site.fullName,
    "short_name": SEO_CONFIG.site.name,
    "description": SEO_CONFIG.site.description,
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": SEO_CONFIG.technical.themeColor,
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/favicon/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/favicon/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "categories": ["finance", "business", "productivity"],
    "lang": "en-US",
    "dir": "ltr"
  }, null, 2);
}

const sitemapUtils = {
  generateSitemap,
  generateRobotsTxt,
  generateManifest,
  defaultSitemapUrls
};

export default sitemapUtils;
