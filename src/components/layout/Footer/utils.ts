/**
 * Footer component utility functions
 * 
 * This file contains utility functions for validation, content processing,
 * error handling, and other helper functions used throughout the Footer component.
 */

import { 
  FooterProps, 
  FooterLink, 
  SocialLink, 
  NavigationSection, 
  LegalContent, 
  FooterError,
  FooterErrorType
} from './types';
import { FOOTER_CONFIG, FOOTER_ERROR_MESSAGES } from './config';

/**
 * Custom error class for Footer validation failures
 * 
 * Extends the standard Error class to provide additional context
 * about which field caused the validation error.
 * 
 * @example
 * ```typescript
 * throw new FooterValidationError('Invalid URL format', 'href');
 * ```
 */
export class FooterValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'FooterValidationError';
  }
}

/**
 * Validates footer link data
 * 
 * @param link - Footer link to validate
 * @returns True if valid, throws error if invalid
 * @throws FooterValidationError if validation fails
 * 
 * @example
 * ```typescript
 * try {
 *   validateFooterLink({ label: 'Home', href: '/' });
 * } catch (error) {
 *   console.error('Invalid link:', error.message);
 * }
 * ```
 */
export function validateFooterLink(link: FooterLink): boolean {
  if (!link.label || typeof link.label !== 'string') {
    throw new FooterValidationError('Link label is required and must be a string', 'label');
  }

  if (!link.href || typeof link.href !== 'string') {
    throw new FooterValidationError('Link href is required and must be a string', 'href');
  }

  // Validate URL format for external links
  if (link.external) {
    try {
      new URL(link.href);
    } catch {
      throw new FooterValidationError('Invalid URL format for external link', 'href');
    }
  }

  return true;
}

/**
 * Validates social media link data
 * 
 * @param social - Social media link to validate
 * @returns True if valid, throws error if invalid
 * @throws FooterValidationError if validation fails
 * 
 * @example
 * ```typescript
 * try {
 *   validateSocialLink({ 
 *     name: 'Twitter', 
 *     href: 'https://twitter.com/example',
 *     icon: 'twitter',
 *     ariaLabel: 'Follow us on Twitter'
 *   });
 * } catch (error) {
 *   console.error('Invalid social link:', error.message);
 * }
 * ```
 */
export function validateSocialLink(social: SocialLink): boolean {
  if (!social.name || typeof social.name !== 'string') {
    throw new FooterValidationError('Social name is required and must be a string', 'name');
  }

  if (!social.href || typeof social.href !== 'string') {
    throw new FooterValidationError('Social href is required and must be a string', 'href');
  }

  if (!social.icon || typeof social.icon !== 'string') {
    throw new FooterValidationError('Social icon is required and must be a string', 'icon');
  }

  if (!social.ariaLabel || typeof social.ariaLabel !== 'string') {
    throw new FooterValidationError('Social ariaLabel is required and must be a string', 'ariaLabel');
  }

  // Validate URL format
  try {
    new URL(social.href);
  } catch {
    throw new FooterValidationError('Invalid URL format for social link', 'href');
  }

  return true;
}

/**
 * Validates navigation section data
 * 
 * @param section - Navigation section to validate
 * @returns True if valid, throws error if invalid
 * @throws FooterValidationError if validation fails
 * 
 * @example
 * ```typescript
 * try {
 *   validateNavigationSection({
 *     title: 'Fund',
 *     items: [{ label: 'About', href: '/about' }]
 *   });
 * } catch (error) {
 *   console.error('Invalid navigation section:', error.message);
 * }
 * ```
 */
export function validateNavigationSection(section: NavigationSection): boolean {
  if (!section.title || typeof section.title !== 'string') {
    throw new FooterValidationError('Section title is required and must be a string', 'title');
  }

  if (!Array.isArray(section.items)) {
    throw new FooterValidationError('Section items must be an array', 'items');
  }

  // Validate each item in the section
  section.items.forEach((item, index) => {
    try {
      validateFooterLink(item);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown validation error';
      throw new FooterValidationError(
        `Invalid item at index ${index}: ${errorMessage}`,
        `items[${index}]`
      );
    }
  });

  return true;
}

/**
 * Validates legal content data
 * 
 * @param content - Legal content to validate
 * @returns True if valid, throws error if invalid
 * @throws FooterValidationError if validation fails
 * 
 * @example
 * ```typescript
 * try {
 *   validateLegalContent({
 *     disclaimers: ['Disclaimer text'],
 *     notes: [{ number: '1.', text: 'Note text' }]
 *   });
 * } catch (error) {
 *   console.error('Invalid legal content:', error.message);
 * }
 * ```
 */
export function validateLegalContent(content: LegalContent): boolean {
  if (!Array.isArray(content.disclaimers)) {
    throw new FooterValidationError('Disclaimers must be an array', 'disclaimers');
  }

  if (!Array.isArray(content.notes)) {
    throw new FooterValidationError('Notes must be an array', 'notes');
  }

  // Validate disclaimers
  content.disclaimers.forEach((disclaimer, index) => {
    if (!disclaimer || typeof disclaimer !== 'string') {
      throw new FooterValidationError(
        `Disclaimer at index ${index} must be a non-empty string`,
        `disclaimers[${index}]`
      );
    }
  });

  // Validate notes
  content.notes.forEach((note, index) => {
    if (!note.number || typeof note.number !== 'string') {
      throw new FooterValidationError(
        `Note number at index ${index} must be a non-empty string`,
        `notes[${index}].number`
      );
    }

    if (!note.text || typeof note.text !== 'string') {
      throw new FooterValidationError(
        `Note text at index ${index} must be a non-empty string`,
        `notes[${index}].text`
      );
    }
  });

  return true;
}

/**
 * Gets safe footer link data with fallbacks
 * 
 * @param link - Footer link data
 * @returns Safe footer link data
 * 
 * @example
 * ```typescript
 * const safeLink = getSafeFooterLink({ label: 'Home', href: '/' });
 * ```
 */
export function getSafeFooterLink(link?: Partial<FooterLink>): FooterLink {
  return {
    label: link?.label || 'Link',
    href: link?.href || '#',
    external: link?.external || false,
    nofollow: link?.nofollow || false,
    testId: link?.testId || 'footer-link'
  };
}

/**
 * Gets safe social media link data with fallbacks
 * 
 * @param social - Social media link data
 * @returns Safe social media link data
 * 
 * @example
 * ```typescript
 * const safeSocial = getSafeSocialLink({ 
 *   name: 'Twitter', 
 *   href: 'https://twitter.com/example',
 *   icon: 'twitter',
 *   ariaLabel: 'Follow us on Twitter'
 * });
 * ```
 */
export function getSafeSocialLink(social?: Partial<SocialLink>): SocialLink {
  return {
    name: social?.name || 'Social',
    href: social?.href || '#',
    icon: social?.icon || 'twitter',
    ariaLabel: social?.ariaLabel || 'Follow us on social media',
    testId: social?.testId || 'social-link'
  };
}

/**
 * Gets safe navigation section data with fallbacks
 * 
 * @param section - Navigation section data
 * @returns Safe navigation section data
 * 
 * @example
 * ```typescript
 * const safeSection = getSafeNavigationSection({
 *   title: 'Fund',
 *   items: [{ label: 'About', href: '/about' }]
 * });
 * ```
 */
export function getSafeNavigationSection(section?: Partial<NavigationSection>): NavigationSection {
  return {
    title: section?.title || 'Section',
    items: section?.items?.map(item => getSafeFooterLink(item)) || []
  };
}

/**
 * Gets safe legal content data with fallbacks
 * 
 * @param content - Legal content data
 * @returns Safe legal content data
 * 
 * @example
 * ```typescript
 * const safeContent = getSafeLegalContent({
 *   disclaimers: ['Disclaimer text'],
 *   notes: [{ number: '1.', text: 'Note text' }]
 * });
 * ```
 */
export function getSafeLegalContent(content?: Partial<LegalContent>): LegalContent {
  return {
    disclaimers: content?.disclaimers || ['Legal disclaimer text'],
    notes: content?.notes || []
  };
}

/**
 * Creates a footer error object
 * 
 * @param type - Error type
 * @param message - Error message
 * @param details - Additional error details
 * @returns Footer error object
 * 
 * @example
 * ```typescript
 * const error = createFooterError(
 *   FooterErrorType.CONTENT_LOADING_ERROR,
 *   'Failed to load navigation menu'
 * );
 * ```
 */
export function createFooterError(
  type: FooterErrorType,
  message: string,
  details?: string
): FooterError {
  return {
    type,
    message,
    details,
    timestamp: new Date()
  };
}

/**
 * Validates animation speed value
 * 
 * @param speed - Animation speed in milliseconds
 * @returns True if valid, throws error if invalid
 * @throws FooterValidationError if validation fails
 * 
 * @example
 * ```typescript
 * try {
 *   validateAnimationSpeed(300);
 * } catch (error) {
 *   console.error('Invalid animation speed:', error.message);
 * }
 * ```
 */
export function validateAnimationSpeed(speed: number): boolean {
  if (typeof speed !== 'number' || speed < 0 || speed > 10000) {
    throw new FooterValidationError(
      'Animation speed must be a number between 0 and 10000 milliseconds',
      'speed'
    );
  }

  return true;
}

/**
 * Checks if animations should be enabled based on user preferences
 * 
 * @param showAnimations - Whether to show animations
 * @returns True if animations should be enabled
 * 
 * @example
 * ```typescript
 * const shouldAnimate = shouldEnableAnimations(true);
 * ```
 */
export function shouldEnableAnimations(showAnimations?: boolean): boolean {
  if (typeof showAnimations === 'boolean') {
    return showAnimations;
  }

  // Check for reduced motion preference
  if (typeof window !== 'undefined') {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  return true;
}

/**
 * Generates a unique key for footer elements
 * 
 * @param prefix - Key prefix
 * @param index - Element index
 * @returns Unique key string
 * 
 * @example
 * ```typescript
 * const key = generateFooterKey('nav-item', 0);
 * ```
 */
export function generateFooterKey(prefix: string, index: number): string {
  return `${prefix}-${index}`;
}

/**
 * Gets current year for copyright
 * 
 * @returns Current year as string
 * 
 * @example
 * ```typescript
 * const year = getCurrentYear();
 * ```
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}
