/**
 * SEO Metadata Component
 * 
 * Centralized component for managing SEO metadata, structured data,
 * and social media optimization across the application.
 */

import Head from 'next/head';
import { SEO_CONFIG, generatePageMetadata, generateStructuredData } from '../config/seo';

/**
 * Props for SEO Metadata component
 */
export interface SEOMetadataProps {
  /** Page identifier */
  page?: keyof typeof SEO_CONFIG.pages;
  /** Custom title */
  title?: string;
  /** Custom description */
  description?: string;
  /** Custom keywords */
  keywords?: string[];
  /** Custom image URL */
  image?: string;
  /** Custom canonical URL */
  canonical?: string;
  /** Custom structured data */
  structuredData?: Record<string, unknown>;
  /** Whether to include default structured data */
  includeDefaultStructuredData?: boolean;
  /** Custom Open Graph data */
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  /** Custom Twitter data */
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
    card?: string;
  };
  /** Additional meta tags */
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  /** Whether to include analytics */
  includeAnalytics?: boolean;
}

/**
 * SEO Metadata component for comprehensive SEO optimization
 * 
 * Features:
 * - Dynamic page-specific metadata
 * - Structured data (JSON-LD)
 * - Open Graph optimization
 * - Twitter Cards
 * - Canonical URLs
 * - Analytics integration
 * - Custom meta tags
 * 
 * @param props - SEO Metadata component props
 * @returns JSX element with SEO metadata
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SEOMetadata page="home" />
 * 
 * // Custom metadata
 * <SEOMetadata 
 *   title="Custom Title"
 *   description="Custom description"
 *   keywords={["custom", "keywords"]}
 * />
 * 
 * // With structured data
 * <SEOMetadata 
 *   page="portfolio"
 *   structuredData={customSchema}
 *   includeDefaultStructuredData={true}
 * />
 * ```
 */
export default function SEOMetadata({
  page = 'home',
  title,
  description,
  keywords,
  image,
  canonical,
  structuredData,
  includeDefaultStructuredData = true,
  openGraph,
  twitter,
  additionalMeta = [],
  includeAnalytics = true
}: SEOMetadataProps) {
  // Generate page-specific metadata
  const pageMetadata = generatePageMetadata(page, {
    title,
    description,
    keywords,
    image,
    url: canonical
  });

  // Combine with custom data
  const finalTitle = title || pageMetadata.title;
  const finalDescription = description || pageMetadata.description;
  const finalKeywords = keywords || pageMetadata.keywords;
  const finalImage = image || SEO_CONFIG.openGraph.image.url;
  const finalCanonical = canonical || `${SEO_CONFIG.site.url}/${page}`;

  // Generate structured data
  const defaultStructuredData = includeDefaultStructuredData ? [
    generateStructuredData('organization'),
    generateStructuredData('financialService'),
    generateStructuredData('website')
  ] : [];

  const allStructuredData = [
    ...defaultStructuredData,
    ...(structuredData ? [structuredData] : [])
  ];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="author" content={SEO_CONFIG.metadata.author} />
      <meta name="robots" content={SEO_CONFIG.metadata.robots} />
      <meta name="language" content={SEO_CONFIG.metadata.language} />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Favicon */}
      <link rel="icon" href={SEO_CONFIG.site.favicon} />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Theme and Viewport */}
      <meta name="theme-color" content={SEO_CONFIG.technical.themeColor} />
      <meta name="color-scheme" content={SEO_CONFIG.technical.colorScheme} />
      <meta name="viewport" content={SEO_CONFIG.technical.viewport} />
      
      {/* Open Graph */}
      <meta property="og:type" content={openGraph?.type || SEO_CONFIG.openGraph.type} />
      <meta property="og:title" content={openGraph?.title || finalTitle} />
      <meta property="og:description" content={openGraph?.description || finalDescription} />
      <meta property="og:url" content={openGraph?.url || finalCanonical} />
      <meta property="og:image" content={openGraph?.image || finalImage} />
      <meta property="og:image:width" content={SEO_CONFIG.openGraph.image.width.toString()} />
      <meta property="og:image:height" content={SEO_CONFIG.openGraph.image.height.toString()} />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content={SEO_CONFIG.openGraph.siteName} />
      <meta property="og:locale" content={SEO_CONFIG.openGraph.locale} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitter?.card || SEO_CONFIG.twitter.card} />
      <meta name="twitter:site" content={SEO_CONFIG.twitter.site} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitter.creator} />
      <meta name="twitter:title" content={twitter?.title || finalTitle} />
      <meta name="twitter:description" content={twitter?.description || finalDescription} />
      <meta name="twitter:image" content={twitter?.image || finalImage} />
      
      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name && { name: meta.name })}
          {...(meta.property && { property: meta.property })}
          content={meta.content}
        />
      ))}
      
      {/* Structured Data */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data)
          }}
        />
      ))}
      
      {/* Analytics */}
      {includeAnalytics && SEO_CONFIG.analytics.googleAnalytics && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${SEO_CONFIG.analytics.googleAnalytics}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${SEO_CONFIG.analytics.googleAnalytics}', {
                  page_title: '${finalTitle}',
                  page_location: '${finalCanonical}'
                });
              `
            }}
          />
        </>
      )}
      
      {/* Google Tag Manager */}
      {includeAnalytics && SEO_CONFIG.analytics.gtm && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${SEO_CONFIG.analytics.gtm}');
              `
            }}
          />
        </>
      )}
      
      {/* Facebook Pixel */}
      {includeAnalytics && SEO_CONFIG.analytics.facebookPixel && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${SEO_CONFIG.analytics.facebookPixel}');
              fbq('track', 'PageView');
            `
          }}
        />
      )}
    </Head>
  );
}

/**
 * Hook for SEO metadata management
 */
export function useSEOMetadata() {
  const updateMetadata = (metadata: Partial<SEOMetadataProps>) => {
    // Update document title
    if (metadata.title) {
      document.title = metadata.title;
    }
    
    // Update meta description
    if (metadata.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata.description);
      }
    }
    
    // Update Open Graph title
    if (metadata.title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', metadata.title);
      }
    }
    
    // Update Open Graph description
    if (metadata.description) {
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', metadata.description);
      }
    }
  };

  return {
    updateMetadata
  };
}
