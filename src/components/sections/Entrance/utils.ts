/**
 * Utility functions for the Entrance component
 * 
 * This file contains validation, error handling, and helper functions
 * used throughout the Entrance component system.
 */

import { EntranceError, EntranceErrorType, TitleContent, CTAConfig } from './types';

/**
 * Custom error class for Entrance component
 */
export class EntranceValidationError extends Error {
  constructor(
    message: string,
    public type: EntranceErrorType,
    public details?: unknown
  ) {
    super(message);
    this.name = 'EntranceValidationError';
  }
}

/**
 * Validates title content structure
 * @param title - Title content to validate
 * @returns True if valid, throws error if invalid
 */
export function validateTitleContent(title: unknown): title is TitleContent {
  if (!title || typeof title !== 'object') {
    throw new EntranceValidationError(
      'Title content is required and must be an object',
      EntranceErrorType.INVALID_PROPS,
      { title }
    );
  }

  const titleObj = title as Record<string, unknown>;

  // Validate line1
  if (!titleObj.line1 || typeof titleObj.line1 !== 'object') {
    throw new EntranceValidationError(
      'Title line1 is required and must be an object',
      EntranceErrorType.INVALID_PROPS,
      { title }
    );
  }

  const line1 = titleObj.line1 as Record<string, unknown>;
  if (!line1.highlighted || typeof line1.highlighted !== 'string') {
    throw new EntranceValidationError(
      'Title line1 highlighted text is required and must be a string',
      EntranceErrorType.INVALID_PROPS,
      { title }
    );
  }
  if (!line1.regular || typeof line1.regular !== 'string') {
    throw new EntranceValidationError(
      'Title line1 regular text is required and must be a string',
      EntranceErrorType.INVALID_PROPS,
      { title }
    );
  }

  // Validate line2
  if (!titleObj.line2 || typeof titleObj.line2 !== 'object') {
    throw new EntranceValidationError(
      'Title line2 is required and must be an object',
      EntranceErrorType.INVALID_PROPS,
      { title }
    );
  }

  // Validate line3
  if (!titleObj.line3 || typeof titleObj.line3 !== 'object') {
    throw new EntranceValidationError(
      'Title line3 is required and must be an object',
      EntranceErrorType.INVALID_PROPS,
      { title }
    );
  }

  const line3 = titleObj.line3 as Record<string, unknown>;
  if (!line3.highlighted || typeof line3.highlighted !== 'string') {
    throw new EntranceValidationError(
      'Title line3 highlighted text is required and must be a string',
      EntranceErrorType.INVALID_PROPS,
      { title }
    );
  }
  if (!line3.regular || typeof line3.regular !== 'string') {
    throw new EntranceValidationError(
      'Title line3 regular text is required and must be a string',
      EntranceErrorType.INVALID_PROPS,
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
    throw new EntranceValidationError(
      'CTA config is required and must be an object',
      EntranceErrorType.INVALID_PROPS,
      { cta }
    );
  }

  const ctaObj = cta as Record<string, unknown>;

  if (!ctaObj.text || typeof ctaObj.text !== 'string') {
    throw new EntranceValidationError(
      'CTA text is required and must be a string',
      EntranceErrorType.INVALID_PROPS,
      { cta }
    );
  }

  if (ctaObj.icon && typeof ctaObj.icon !== 'string') {
    throw new EntranceValidationError(
      'CTA icon must be a string',
      EntranceErrorType.INVALID_PROPS,
      { cta }
    );
  }

  if (ctaObj.href && typeof ctaObj.href !== 'string') {
    throw new EntranceValidationError(
      'CTA href must be a string',
      EntranceErrorType.INVALID_PROPS,
      { cta }
    );
  }

  if (ctaObj.external && typeof ctaObj.external !== 'boolean') {
    throw new EntranceValidationError(
      'CTA external must be a boolean',
      EntranceErrorType.INVALID_PROPS,
      { cta }
    );
  }

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
    // Return fallback title content
    return {
      line1: {
        highlighted: 'Invest Founders Fund was established together with close friends to create a trusted space for shared growth and investment opportunities.',
        regular: ''
      }
    };
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
      text: 'Explore',
      icon: '→',
      variant: 'outline'
    };
  }
}

/**
 * Creates Entrance error object
 * @param type - Error type
 * @param message - Error message
 * @param details - Additional error details
 * @returns Entrance error object
 */
export function createEntranceError(
  type: EntranceErrorType,
  message: string,
  details?: unknown
): EntranceError {
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
 * Generates unique key for title line
 * @param line - Title line object
 * @param index - Index in array
 * @returns Unique key string
 */
export function generateTitleLineKey(line: TitleContent['line1'], index: number): string {
  return `title-line-${index}-${line.highlighted}-${line.regular}`;
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
 * Formats title line for display
 * @param line - Title line to format
 * @returns Formatted title line
 */
export function formatTitleLine(line: TitleContent['line1']): string {
  return `${line.highlighted} ${line.regular}`;
}

const EntranceUtils = {
  validateTitleContent,
  validateCTAConfig,
  getSafeTitleContent,
  getSafeCTAConfig,
  createEntranceError,
  validateAnimationSpeed,
  generateTitleLineKey,
  shouldEnableAnimations,
  formatTitleLine
};

export default EntranceUtils;
