/**
 * SEO Module Index
 * 
 * Centralized exports for all SEO-related functionality
 */

// Configuration
export * from './config/seo';

// Components
export * from './components/SEOMetadata';
export * from './components/StructuredData';

// Hooks
export * from './hooks/useSEO';

// Utilities
export * from './lib/sitemap';
export * from './lib/seo-test';
export * from './lib/api-utils';

// Types
export * from './types/global';

/**
 * SEO Module Summary
 * 
 * This module provides comprehensive SEO functionality including:
 * - Configuration management
 * - Metadata generation
 * - Structured data (JSON-LD)
 * - React hooks for SEO management
 * - Sitemap and robots.txt generation
 * - SEO testing utilities
 * - API utilities for SEO endpoints
 * - TypeScript type definitions
 * 
 * Usage:
 * import { SEO_CONFIG, generatePageMetadata, useSEO } from '@/seo';
 * 
 * API Endpoints:
 * - GET /api/seo/sitemap.xml
 * - GET /api/seo/robots.txt
 * - GET /api/seo/manifest.json
 */

