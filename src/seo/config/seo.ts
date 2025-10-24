/**
 * SEO Configuration for Invest Founders Platform
 * 
 * Centralized SEO settings, metadata, and structured data configuration
 * for crypto investment, tokenized equity, and asset management services.
 */

export const SEO_CONFIG = {
  /** Site Information */
  site: {
    /** Site name */
    name: "IF Funds",
    /** Full site name */
    fullName: "Invest Founders - Crypto Investment Fund",
    /** Site description */
    description: "Crypto investment, tokenized equity, and asset management funds with in-depth market analysis. Professional crypto portfolio management and investment strategies.",
    /** Site URL */
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://if.fund",
    /** Site logo */
    logo: "/images/logos/if-funds-full-black-logo.svg",
    /** Site favicon */
    favicon: "/favicon.ico"
  },

  /** Default Metadata */
  metadata: {
    /** Default title */
    title: "IF Funds - Crypto Investment & Asset Management Fund",
    /** Default description */
    description: "Professional crypto investment fund specializing in tokenized equity and asset management. Expert market analysis and disciplined investment strategies for sustainable growth.",
    /** Default keywords */
    keywords: [
      "crypto investment",
      "tokenized equity",
      "asset management",
      "cryptocurrency fund",
      "crypto portfolio",
      "investment strategies",
      "crypto market analysis",
      "digital asset management",
      "blockchain investment",
      "crypto fund management"
    ] as string[],
    /** Default author */
    author: "IF Funds",
    /** Default publisher */
    publisher: "IF Funds",
    /** Default robots */
    robots: "index, follow",
    /** Default language */
    language: "en-US",
    /** Default locale */
    locale: "en_US"
  },

  /** Open Graph Configuration */
  openGraph: {
    /** Default OG type */
    type: "website",
    /** Default OG locale */
    locale: "en_US",
    /** Default OG site name */
    siteName: "IF Funds",
    /** Default OG title */
    title: "IF Funds - Crypto Investment & Asset Management Fund",
    /** Default OG description */
    description: "Professional crypto investment fund specializing in tokenized equity and asset management. Expert market analysis and disciplined investment strategies.",
    /** Default OG image */
    image: {
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "IF Funds - Crypto Investment Fund"
    }
  },

  /** Twitter Card Configuration */
  twitter: {
    /** Twitter card type */
    card: "summary_large_image",
    /** Twitter site */
    site: "@iffunds",
    /** Twitter creator */
    creator: "@iffunds",
    /** Twitter title */
    title: "IF Funds - Crypto Investment & Asset Management Fund",
    /** Twitter description */
    description: "Professional crypto investment fund specializing in tokenized equity and asset management.",
    /** Twitter image */
    image: "/images/og-image.jpg"
  },

  /** Structured Data Configuration */
  structuredData: {
    /** Organization schema */
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "IF Funds",
      "alternateName": "Invest Founders",
      "url": "https://if.fund",
      "logo": "https://if.fund/images/logos/if-funds-full-black-logo.svg",
      "description": "Professional crypto investment fund specializing in tokenized equity and asset management.",
      "foundingDate": "2024",
      "industry": "Financial Services",
      "serviceType": "Investment Management",
      "areaServed": "Global",
      "sameAs": [
        "https://x.com/iffunds",
        "https://linkedin.com/company/iffunds"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "url": "https://app.if.fund"
      }
    },

    /** Financial Service schema */
    financialService: {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "IF Funds Crypto Investment Services",
      "description": "Crypto investment, tokenized equity, and asset management funds with in-depth market analysis.",
      "provider": {
        "@type": "Organization",
        "name": "IF Funds"
      },
      "serviceType": "Investment Management",
      "areaServed": "Global",
      "offers": {
        "@type": "Offer",
        "description": "Professional crypto investment fund management",
        "category": "Financial Services"
      }
    },

    /** WebSite schema */
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "IF Funds",
      "url": "https://if.fund",
      "description": "Crypto investment, tokenized equity, and asset management funds with in-depth market analysis.",
      "publisher": {
        "@type": "Organization",
        "name": "IF Funds"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://if.fund/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },

  /** Page-specific SEO configurations */
  pages: {
    /** Homepage SEO */
    home: {
      title: "IF Funds - Professional Crypto Investment & Asset Management Fund",
      description: "Join IF Funds for professional crypto investment, tokenized equity, and asset management. Expert market analysis and disciplined DDGO strategies for sustainable growth.",
      keywords: [
        "crypto investment fund",
        "tokenized equity investment",
        "crypto asset management",
        "professional crypto fund",
        "cryptocurrency investment strategies",
        "crypto portfolio management",
        "blockchain investment fund",
        "digital asset management"
      ] as string[]
    },

    /** About page SEO */
    about: {
      title: "About IF Funds - Crypto Investment Fund Management",
      description: "Learn about IF Funds' professional crypto investment approach, tokenized equity strategies, and disciplined asset management methodologies.",
      keywords: [
        "about crypto fund",
        "crypto investment team",
        "crypto fund management",
        "investment methodology",
        "crypto fund strategy"
      ] as string[]
    },

    /** Portfolio page SEO */
    portfolio: {
      title: "Crypto Portfolio Management - IF Funds Investment Strategies",
      description: "Explore IF Funds' crypto portfolio management services, tokenized equity positions, and comprehensive asset management strategies.",
      keywords: [
        "crypto portfolio management",
        "crypto investment portfolio",
        "tokenized equity portfolio",
        "crypto asset allocation",
        "portfolio management services"
      ] as string[]
    },

    /** Tools page SEO */
    tools: {
      title: "Crypto Investment Tools - Prelist, Portfolio & Market Analysis",
      description: "Access IF Funds' comprehensive crypto investment tools including Prelist for early opportunities, Portfolio management, and real-time market analysis.",
      keywords: [
        "crypto investment tools",
        "crypto prelist",
        "crypto portfolio tools",
        "crypto market analysis",
        "investment analysis tools"
      ] as string[]
    }
  },

  /** Technical SEO Configuration */
  technical: {
    /** Canonical URL */
    canonical: "https://if.fund",
    /** Sitemap URL */
    sitemap: "https://if.fund/sitemap.xml",
    /** Robots.txt URL */
    robots: "https://if.fund/robots.txt",
    /** Default viewport */
    viewport: "width=device-width, initial-scale=1",
    /** Theme color */
    themeColor: "#5CE05C",
    /** Color scheme */
    colorScheme: "light dark"
  },

  /** Analytics Configuration */
  analytics: {
    /** Google Analytics ID */
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    /** Google Tag Manager ID */
    gtm: process.env.NEXT_PUBLIC_GTM_ID,
    /** Facebook Pixel ID */
    facebookPixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID
  }
} as const;

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata(page: keyof typeof SEO_CONFIG.pages, customData?: Partial<{
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}>) {
  const pageConfig = SEO_CONFIG.pages[page];
  const siteConfig = SEO_CONFIG.site;

  return {
    title: customData?.title || pageConfig.title,
    description: customData?.description || pageConfig.description,
    keywords: customData?.keywords || pageConfig.keywords,
    openGraph: {
      title: customData?.title || pageConfig.title,
      description: customData?.description || pageConfig.description,
      url: customData?.url || `${siteConfig.url}/${page}`,
      images: [
        {
          url: customData?.image || SEO_CONFIG.openGraph.image.url,
          width: SEO_CONFIG.openGraph.image.width,
          height: SEO_CONFIG.openGraph.image.height,
          alt: customData?.title || pageConfig.title
        }
      ]
    },
    twitter: {
      card: SEO_CONFIG.twitter.card,
      site: SEO_CONFIG.twitter.site,
      creator: SEO_CONFIG.twitter.creator,
      title: customData?.title || pageConfig.title,
      description: customData?.description || pageConfig.description,
      images: [customData?.image || SEO_CONFIG.twitter.image]
    }
  };
}

/**
 * Generate structured data for a specific page
 */
export function generateStructuredData(type: keyof typeof SEO_CONFIG.structuredData, customData?: Record<string, unknown>) {
  const baseData = SEO_CONFIG.structuredData[type];
  return {
    ...baseData,
    ...customData
  };
}

export default SEO_CONFIG;
