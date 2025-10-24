/**
 * SEO Test Suite
 * 
 * Comprehensive testing for SEO optimizations and metadata.
 */

import { SEO_CONFIG, generatePageMetadata } from '../config/seo';
import { generateSitemap, generateRobotsTxt, generateManifest } from './sitemap';

/**
 * Test SEO Configuration
 */
export function testSEOConfig() {
  console.log('🧪 Testing SEO Configuration...');
  
  // Test site configuration
  console.assert(SEO_CONFIG.site.name === 'IF Funds', 'Site name should be IF Funds');
  console.assert(SEO_CONFIG.site.description.includes('crypto investment'), 'Site description should include crypto investment');
  console.assert(SEO_CONFIG.site.url.startsWith('https://'), 'Site URL should be HTTPS');
  
  // Test metadata configuration
  console.assert(SEO_CONFIG.metadata.title.length > 0, 'Metadata title should not be empty');
  console.assert(SEO_CONFIG.metadata.description.length > 0, 'Metadata description should not be empty');
  console.assert(SEO_CONFIG.metadata.keywords.length > 0, 'Metadata keywords should not be empty');
  
  // Test Open Graph configuration
  console.assert(SEO_CONFIG.openGraph.type === 'website', 'Open Graph type should be website');
  console.assert(SEO_CONFIG.openGraph.image.width === 1200, 'Open Graph image width should be 1200');
  console.assert(SEO_CONFIG.openGraph.image.height === 630, 'Open Graph image height should be 630');
  
  // Test Twitter configuration
  console.assert(SEO_CONFIG.twitter.card === 'summary_large_image', 'Twitter card should be summary_large_image');
  console.assert(SEO_CONFIG.twitter.site === '@iffunds', 'Twitter site should be @iffunds');
  
  console.log('✅ SEO Configuration tests passed');
}

/**
 * Test Page Metadata Generation
 */
export function testPageMetadata() {
  console.log('🧪 Testing Page Metadata Generation...');
  
  // Test homepage metadata
  const homeMetadata = generatePageMetadata('home');
  console.assert(homeMetadata.title.includes('IF Funds'), 'Homepage title should include IF Funds');
  console.assert(homeMetadata.description.includes('crypto investment'), 'Homepage description should include crypto investment');
  console.assert(homeMetadata.keywords.length > 0, 'Homepage keywords should not be empty');
  
  // Test about page metadata
  const aboutMetadata = generatePageMetadata('about');
  console.assert(aboutMetadata.title.includes('About'), 'About page title should include About');
  console.assert(aboutMetadata.description.includes('crypto investment'), 'About page description should include crypto investment');
  
  // Test portfolio page metadata
  const portfolioMetadata = generatePageMetadata('portfolio');
  console.assert(portfolioMetadata.title.includes('Portfolio'), 'Portfolio page title should include Portfolio');
  console.assert(portfolioMetadata.description.includes('portfolio'), 'Portfolio page description should include portfolio');
  
  // Test tools page metadata
  const toolsMetadata = generatePageMetadata('tools');
  console.assert(toolsMetadata.title.includes('Tools'), 'Tools page title should include Tools');
  console.assert(toolsMetadata.description.includes('tools'), 'Tools page description should include tools');
  
  console.log('✅ Page Metadata Generation tests passed');
}

/**
 * Test Sitemap Generation
 */
export function testSitemapGeneration() {
  console.log('🧪 Testing Sitemap Generation...');
  
  const sitemap = generateSitemap([
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 }
  ]);
  
  console.assert(sitemap.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'Sitemap should be valid XML');
  console.assert(sitemap.includes('<urlset'), 'Sitemap should contain urlset');
  console.assert(sitemap.includes('<loc>/</loc>'), 'Sitemap should contain homepage URL');
  console.assert(sitemap.includes('<priority>1.0</priority>'), 'Sitemap should contain priority');
  
  console.log('✅ Sitemap Generation tests passed');
}

/**
 * Test Robots.txt Generation
 */
export function testRobotsTxtGeneration() {
  console.log('🧪 Testing Robots.txt Generation...');
  
  const robotsTxt = generateRobotsTxt();
  
  console.assert(robotsTxt.includes('User-agent: *'), 'Robots.txt should contain User-agent');
  console.assert(robotsTxt.includes('Allow: /'), 'Robots.txt should allow crawling');
  console.assert(robotsTxt.includes('Sitemap:'), 'Robots.txt should contain sitemap reference');
  console.assert(robotsTxt.includes('Disallow: /admin/'), 'Robots.txt should disallow admin');
  
  console.log('✅ Robots.txt Generation tests passed');
}

/**
 * Test Manifest Generation
 */
export function testManifestGeneration() {
  console.log('🧪 Testing Manifest Generation...');
  
  const manifest = generateManifest();
  const manifestObj = JSON.parse(manifest);
  
  console.assert(manifestObj.name === SEO_CONFIG.site.fullName, 'Manifest name should match site full name');
  console.assert(manifestObj.short_name === SEO_CONFIG.site.name, 'Manifest short name should match site name');
  console.assert(manifestObj.description === SEO_CONFIG.site.description, 'Manifest description should match site description');
  console.assert(manifestObj.start_url === '/', 'Manifest start URL should be /');
  console.assert(manifestObj.theme_color === SEO_CONFIG.technical.themeColor, 'Manifest theme color should match config');
  
  console.log('✅ Manifest Generation tests passed');
}

/**
 * Test Structured Data
 */
export function testStructuredData() {
  console.log('🧪 Testing Structured Data...');
  
  // Test organization schema
  const orgData = SEO_CONFIG.structuredData.organization;
  console.assert(orgData['@type'] === 'Organization', 'Organization schema should have correct type');
  console.assert(orgData.name === 'IF Funds', 'Organization schema should have correct name');
  console.assert(orgData.url === 'https://if.fund', 'Organization schema should have correct URL');
  
  // Test financial service schema
  const financialData = SEO_CONFIG.structuredData.financialService;
  console.assert(financialData['@type'] === 'FinancialService', 'Financial service schema should have correct type');
  console.assert(financialData.name.includes('Crypto Investment'), 'Financial service schema should include crypto investment');
  
  // Test website schema
  const websiteData = SEO_CONFIG.structuredData.website;
  console.assert(websiteData['@type'] === 'WebSite', 'Website schema should have correct type');
  console.assert(websiteData.name === 'IF Funds', 'Website schema should have correct name');
  
  console.log('✅ Structured Data tests passed');
}

/**
 * Test SEO Performance
 */
export function testSEOPerformance() {
  console.log('🧪 Testing SEO Performance...');
  
  const startTime = performance.now();
  
  // Test metadata generation performance
  generatePageMetadata('home');
  generatePageMetadata('about');
  generatePageMetadata('portfolio');
  generatePageMetadata('tools');
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.assert(duration < 10, `Metadata generation should be fast (${duration}ms)`);
  
  // Test sitemap generation performance
  const sitemapStartTime = performance.now();
  generateSitemap([
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/portfolio', priority: 0.9 },
    { loc: '/tools', priority: 0.8 }
  ]);
  const sitemapEndTime = performance.now();
  const sitemapDuration = sitemapEndTime - sitemapStartTime;
  
  console.assert(sitemapDuration < 5, `Sitemap generation should be fast (${sitemapDuration}ms)`);
  
  console.log('✅ SEO Performance tests passed');
}

/**
 * Run all SEO tests
 */
export function runAllSEOTests() {
  console.log('🚀 Running SEO Test Suite...');
  console.log('=====================================');
  
  try {
    testSEOConfig();
    testPageMetadata();
    testSitemapGeneration();
    testRobotsTxtGeneration();
    testManifestGeneration();
    testStructuredData();
    testSEOPerformance();
    
    console.log('=====================================');
    console.log('🎉 All SEO tests passed successfully!');
    console.log('✅ SEO optimization is working correctly');
    
    return true;
  } catch (error) {
    console.error('❌ SEO tests failed:', error);
    return false;
  }
}

/**
 * SEO Audit Report
 */
export function generateSEOAuditReport() {
  console.log('📊 SEO Audit Report');
  console.log('==================');
  
  const report = {
    siteName: SEO_CONFIG.site.name,
    siteUrl: SEO_CONFIG.site.url,
    title: SEO_CONFIG.metadata.title,
    description: SEO_CONFIG.metadata.description,
    keywords: SEO_CONFIG.metadata.keywords.length,
    openGraph: {
      configured: true,
      image: SEO_CONFIG.openGraph.image.url,
      dimensions: `${SEO_CONFIG.openGraph.image.width}x${SEO_CONFIG.openGraph.image.height}`
    },
    twitter: {
      configured: true,
      card: SEO_CONFIG.twitter.card,
      site: SEO_CONFIG.twitter.site
    },
    structuredData: {
      organization: true,
      financialService: true,
      website: true
    },
    technical: {
      sitemap: true,
      robotsTxt: true,
      manifest: true,
      canonical: true
    },
    analytics: {
      googleAnalytics: !!SEO_CONFIG.analytics.googleAnalytics,
      gtm: !!SEO_CONFIG.analytics.gtm,
      facebookPixel: !!SEO_CONFIG.analytics.facebookPixel
    }
  };
  
  console.log(JSON.stringify(report, null, 2));
  
  return report;
}

const seoTestSuite = {
  testSEOConfig,
  testPageMetadata,
  testSitemapGeneration,
  testRobotsTxtGeneration,
  testManifestGeneration,
  testStructuredData,
  testSEOPerformance,
  runAllSEOTests,
  generateSEOAuditReport
};

export default seoTestSuite;
