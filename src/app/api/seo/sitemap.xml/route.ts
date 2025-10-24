import { createSitemapResponse } from '@/seo/lib/api-utils';

/**
 * Sitemap API route
 * GET /api/seo/sitemap.xml
 */
export async function GET() {
  return createSitemapResponse();
}
