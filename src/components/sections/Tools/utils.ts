/**
 * Utility functions for the Tools component
 * 
 * This file contains validation, error handling, and helper functions
 * used throughout the Tools component system.
 */

import { ToolsError, ToolsErrorType, TitleContent, CTAConfig, HeroContent } from './types';
import { TOOLS_CONFIG } from './config';

/**
 * Custom error class for Tools component
 */
export class ToolsValidationError extends Error {
  constructor(
    message: string,
    public type: ToolsErrorType,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ToolsValidationError';
  }
}

/**
 * Validates title content structure
 * @param title - Title content to validate
 * @returns True if valid, throws error if invalid
 */
export function validateTitleContent(title: unknown): title is TitleContent {
  if (!title || typeof title !== 'object') {
    throw new ToolsValidationError(
      'Title content is required and must be an object',
      ToolsErrorType.INVALID_PROPS,
      { title }
    );
  }

  const titleObj = title as Record<string, unknown>;

  if (!titleObj.line1 || typeof titleObj.line1 !== 'string') {
    throw new ToolsValidationError(
      'Title line1 is required and must be a string',
      ToolsErrorType.INVALID_PROPS,
      { title }
    );
  }

  if (titleObj.line2 !== undefined && typeof titleObj.line2 !== 'string') {
    throw new ToolsValidationError(
      'Title line2 must be a string if provided',
      ToolsErrorType.INVALID_PROPS,
      { title }
    );
  }

  return true;
}

/**
 * Validates CTA configuration
 * @param cta - CTA config to validate
 * @returns True if valid, throws error if invalid
 */
export function validateCTAConfig(cta: unknown): cta is CTAConfig {
  if (!cta || typeof cta !== 'object') {
    throw new ToolsValidationError(
      'CTA config is required and must be an object',
      ToolsErrorType.INVALID_PROPS,
      { cta }
    );
  }

  const ctaObj = cta as Record<string, unknown>;

  if (!ctaObj.text || typeof ctaObj.text !== 'string') {
    throw new ToolsValidationError(
      'CTA text is required and must be a string',
      ToolsErrorType.INVALID_PROPS,
      { cta }
    );
  }

  if (ctaObj.href && typeof ctaObj.href !== 'string') {
    throw new ToolsValidationError(
      'CTA href must be a string',
      ToolsErrorType.INVALID_PROPS,
      { cta }
    );
  }

  if (ctaObj.external && typeof ctaObj.external !== 'boolean') {
    throw new ToolsValidationError(
      'CTA external must be a boolean',
      ToolsErrorType.INVALID_PROPS,
      { cta }
    );
  }

  return true;
}

/**
 * Validates hero content structure
 * @param hero - Hero content to validate
 * @returns True if valid, throws error if invalid
 */
export function validateHeroContent(hero: unknown): hero is HeroContent {
  if (!hero || typeof hero !== 'object') {
    throw new ToolsValidationError(
      'Hero content is required and must be an object',
      ToolsErrorType.INVALID_PROPS,
      { hero }
    );
  }

  const heroObj = hero as Record<string, unknown>;

  if (!Array.isArray(heroObj.slides)) {
    throw new ToolsValidationError(
      'Hero slides is required and must be an array',
      ToolsErrorType.INVALID_PROPS,
      { hero }
    );
  }

  // Validate each slide
  heroObj.slides.forEach((slide: unknown, index: number) => {
    if (!slide || typeof slide !== 'object') {
      throw new ToolsValidationError(
        `Hero slide ${index} must be an object`,
        ToolsErrorType.INVALID_PROPS,
        { hero, slideIndex: index }
      );
    }

    const slideObj = slide as Record<string, unknown>;

    if (!slideObj.number || typeof slideObj.number !== 'string') {
      throw new ToolsValidationError(
        `Hero slide ${index} number is required and must be a string`,
        ToolsErrorType.INVALID_PROPS,
        { hero, slideIndex: index }
      );
    }

    if (!slideObj.description || typeof slideObj.description !== 'string') {
      throw new ToolsValidationError(
        `Hero slide ${index} description is required and must be a string`,
        ToolsErrorType.INVALID_PROPS,
        { hero, slideIndex: index }
      );
    }

    if (!slideObj.image || typeof slideObj.image !== 'string') {
      throw new ToolsValidationError(
        `Hero slide ${index} image is required and must be a string`,
        ToolsErrorType.INVALID_PROPS,
        { hero, slideIndex: index }
      );
    }

    if (!slideObj.alt || typeof slideObj.alt !== 'string') {
      throw new ToolsValidationError(
        `Hero slide ${index} alt is required and must be a string`,
        ToolsErrorType.INVALID_PROPS,
        { hero, slideIndex: index }
      );
    }
  });

  return true;
}

/**
 * Creates a safe title content object with fallback values
 * @param title - Title content to make safe
 * @returns Safe title content object
 */
export function getSafeTitleContent(title: unknown): TitleContent {
  try {
    validateTitleContent(title);
    return title as TitleContent;
  } catch {
    // Return empty title content
    return { line1: '', line2: '' };
  }
}

/**
 * Creates a safe CTA config object with fallback values
 * @param cta - CTA config to make safe
 * @returns Safe CTA config object
 */
export function getSafeCTAConfig(cta: unknown): CTAConfig {
  try {
    validateCTAConfig(cta);
    return cta as CTAConfig;
  } catch {
    // Return fallback CTA config
    return {
      text: 'Explore products',
      href: 'https://app.if.fund/portfolio',
      variant: 'secondary',
      size: 'md'
    };
  }
}

/**
 * Creates a safe hero content object with fallback values
 * @param hero - Hero content to make safe
 * @returns Safe hero content object
 */
export function getSafeHeroContent(hero: unknown): HeroContent {
  try {
    validateHeroContent(hero);
    return hero as HeroContent;
  } catch {
    // Return fallback hero content from config
    return TOOLS_CONFIG.content.hero as unknown as HeroContent;
  }
}

/**
 * Creates Tools error object
 * @param type - Error type
 * @param message - Error message
 * @param details - Additional error details
 * @returns Tools error object
 */
export function createToolsError(
  type: ToolsErrorType,
  message: string,
  details?: unknown
): ToolsError {
  return {
    type,
    message,
    details,
    timestamp: new Date()
  };
}

/**
 * Validates animation speed
 * @param speed - Speed value to validate
 * @returns Validated speed value
 */
export function validateAnimationSpeed(speed: unknown): number {
  if (typeof speed !== 'number' || speed <= 0) {
    return 1000; // Default speed
  }
  
  if (speed < 100) {
    return 100; // Minimum speed
  }
  
  if (speed > 5000) {
    return 5000; // Maximum speed
  }
  
  return speed;
}

/**
 * Generates unique key for carousel dots
 * @param index - Index of the dot
 * @returns Unique key string
 */
export function generateDotKey(index: number): string {
  return `carousel-dot-${index}`;
}

/**
 * Checks if animations should be enabled
 * @param showAnimations - Whether animations are requested
 * @param isMounted - Whether component is mounted
 * @returns Whether animations should be enabled
 */
export function shouldEnableAnimations(showAnimations: boolean, isMounted: boolean): boolean {
  return showAnimations && isMounted;
}

/**
 * Validates slide index
 * @param index - Slide index to validate
 * @param totalSlides - Total number of slides
 * @returns Validated slide index
 */
export function validateSlideIndex(index: number, totalSlides: number): number {
  if (index < 0) return 0;
  if (index >= totalSlides) return totalSlides - 1;
  return index;
}

const ToolsUtils = {
  validateTitleContent,
  validateCTAConfig,
  validateHeroContent,
  getSafeTitleContent,
  getSafeCTAConfig,
  getSafeHeroContent,
  createToolsError,
  validateAnimationSpeed,
  generateDotKey,
  shouldEnableAnimations,
  validateSlideIndex
};

export default ToolsUtils;
