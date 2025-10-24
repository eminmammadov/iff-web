import { createRobotsTxtResponse } from '@/seo/lib/api-utils';

/**
 * Robots.txt API route
 * GET /api/seo/robots.txt
 */
export async function GET() {
  return createRobotsTxtResponse();
}
