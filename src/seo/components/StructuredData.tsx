/**
 * Structured Data Components
 * 
 * Components for generating and managing structured data (JSON-LD)
 * for better SEO and search engine understanding.
 */

import { SEO_CONFIG } from '../config/seo';

/**
 * Props for StructuredData component
 */
export interface StructuredDataProps {
  /** Structured data object */
  data: Record<string, unknown>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * StructuredData component for rendering JSON-LD
 * 
 * @param props - StructuredData component props
 * @returns JSX element with structured data
 */
export function StructuredData({ data, className = '' }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      className={className}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  );
}

/**
 * Organization structured data component
 */
export function OrganizationStructuredData({
  customData = {}
}: {
  customData?: Record<string, unknown>;
}) {
  const organizationData = {
    ...SEO_CONFIG.structuredData.organization,
    ...customData
  };

  return <StructuredData data={organizationData} />;
}

/**
 * Financial Service structured data component
 */
export function FinancialServiceStructuredData({
  customData = {}
}: {
  customData?: Record<string, unknown>;
}) {
  const financialServiceData = {
    ...SEO_CONFIG.structuredData.financialService,
    ...customData
  };

  return <StructuredData data={financialServiceData} />;
}

/**
 * WebSite structured data component
 */
export function WebSiteStructuredData({
  customData = {}
}: {
  customData?: Record<string, unknown>;
}) {
  const websiteData = {
    ...SEO_CONFIG.structuredData.website,
    ...customData
  };

  return <StructuredData data={websiteData} />;
}

/**
 * BreadcrumbList structured data component
 */
export function BreadcrumbListStructuredData({
  items
}: {
  items: Array<{
    name: string;
    url: string;
  }>;
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <StructuredData data={breadcrumbData} />;
}

/**
 * FAQ structured data component
 */
export function FAQStructuredData({
  faqs
}: {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <StructuredData data={faqData} />;
}

/**
 * Service structured data component
 */
export function ServiceStructuredData({
  serviceName,
  description,
  provider,
  areaServed = "Global",
  serviceType = "Financial Service",
  offers
}: {
  serviceName: string;
  description: string;
  provider: string;
  areaServed?: string;
  serviceType?: string;
  offers?: {
    name: string;
    description: string;
    price?: string;
    priceCurrency?: string;
  };
}) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "areaServed": areaServed,
    "serviceType": serviceType,
    ...(offers && {
      "offers": {
        "@type": "Offer",
        "name": offers.name,
        "description": offers.description,
        ...(offers.price && { "price": offers.price }),
        ...(offers.priceCurrency && { "priceCurrency": offers.priceCurrency })
      }
    })
  };

  return <StructuredData data={serviceData} />;
}

/**
 * Article structured data component
 */
export function ArticleStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url
}: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONFIG.site.name,
      "logo": {
        "@type": "ImageObject",
        "url": SEO_CONFIG.site.logo
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "url": url,
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    })
  };

  return <StructuredData data={articleData} />;
}

/**
 * Product structured data component
 */
export function ProductStructuredData({
  name,
  description,
  image,
  brand,
  offers
}: {
  name: string;
  description: string;
  image?: string;
  brand: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}) {
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": offers.availability,
      "url": offers.url
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    })
  };

  return <StructuredData data={productData} />;
}

/**
 * Local Business structured data component
 */
export function LocalBusinessStructuredData({
  name,
  description,
  address,
  telephone,
  email,
  url,
  openingHours,
  priceRange
}: {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  email?: string;
  url: string;
  openingHours?: string[];
  priceRange?: string;
}) {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "url": url,
    ...(telephone && { "telephone": telephone }),
    ...(email && { "email": email }),
    ...(openingHours && { "openingHours": openingHours }),
    ...(priceRange && { "priceRange": priceRange })
  };

  return <StructuredData data={businessData} />;
}

/**
 * Event structured data component
 */
export function EventStructuredData({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  url
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address?: string;
  };
  organizer: string;
  url: string;
}) {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate || startDate,
    "location": {
      "@type": "Place",
      "name": location.name,
      ...(location.address && { "address": location.address })
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer
    },
    "url": url
  };

  return <StructuredData data={eventData} />;
}

export default StructuredData;
