import { createManifestResponse } from '@/seo/lib/api-utils';

/**
 * Manifest API route
 * GET /api/seo/manifest.json
 */
export async function GET() {
  return createManifestResponse();
}
