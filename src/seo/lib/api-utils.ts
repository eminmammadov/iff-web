/**
 * SEO API Utilities
 * 
 * Utilities for SEO-related API endpoints
 */

import { NextResponse } from 'next/server';
import { generateSitemap, generateRobotsTxt, generateManifest, defaultSitemapUrls } from '../lib/sitemap';

/**
 * Generate sitemap response
 */
export function createSitemapResponse(urls = defaultSitemapUrls) {
  try {
    const sitemap = generateSitemap(urls);
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

/**
 * Generate robots.txt response
 */
export function createRobotsTxtResponse() {
  try {
    const robotsTxt = generateRobotsTxt();
    
    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new NextResponse('Error generating robots.txt', { status: 500 });
  }
}

/**
 * Generate manifest response
 */
export function createManifestResponse() {
  try {
    const manifest = generateManifest();
    
    return new NextResponse(manifest, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  } catch (error) {
    console.error('Error generating manifest:', error);
    return new NextResponse('Error generating manifest', { status: 500 });
  }
}

/**
 * SEO API error handler
 */
export function handleSEOError(error: unknown, message: string) {
  console.error(`SEO API Error - ${message}:`, error);
  return new NextResponse(`Error: ${message}`, { status: 500 });
}

/**
 * SEO API success handler
 */
export function handleSEOSuccess(data: string, contentType: string, cacheControl?: string) {
  const headers: Record<string, string> = {
    'Content-Type': contentType
  };
  
  if (cacheControl) {
    headers['Cache-Control'] = cacheControl;
  }
  
  return new NextResponse(data, {
    status: 200,
    headers
  });
}

const seoApiUtils = {
  createSitemapResponse,
  createRobotsTxtResponse,
  createManifestResponse,
  handleSEOError,
  handleSEOSuccess
};

export default seoApiUtils;
