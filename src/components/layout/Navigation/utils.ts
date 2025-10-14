import { ERROR_MESSAGES } from './config';

/**
 * Navigation item interface defining the structure of navigation items
 * 
 * This interface describes all possible properties that can be used
 * in navigation items, including dropdowns, external links, and styling.
 * 
 * @example
 * ```typescript
 * const navItem: NavigationItem = {
 *   label: 'Tools',
 *   href: '/tools',
 *   hasDropdown: true,
 *   submenu: [
 *     { label: 'Prelist', href: '/prelist', external: true }
 *   ]
 * };
 * ```
 */
export interface NavigationItem {
  /** Display text for the navigation item */
  label: string;
  /** URL to navigate to */
  href: string;
  /** Whether this item has a dropdown indicator */
  hasDropdown?: boolean;
  /** Whether this item is currently active */
  isActive?: boolean;
  /** Submenu items for dropdown */
  submenu?: NavigationItem[];
  /** Whether this is an external link */
  external?: boolean;
  /** Whether to add nofollow to external links */
  nofollow?: boolean;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Description text for dropdown items */
  description?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Custom error class for navigation validation failures
 * 
 * Extends the standard Error class to provide additional context
 * about which field caused the validation error.
 * 
 * @example
 * ```typescript
 * throw new NavigationValidationError('Invalid URL format', 'href');
 * ```
 */
export class NavigationValidationError extends Error {
  /**
   * Creates a new NavigationValidationError instance
   * 
   * @param message - The error message describing what went wrong
   * @param field - Optional field name that caused the validation error
   */
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'NavigationValidationError';
  }
}

/**
 * Validates a single navigation item against the NavigationItem interface
 * 
 * This function performs comprehensive validation of a navigation item,
 * checking required fields, data types, URL formats, and nested submenu items.
 * 
 * @param item - The unknown item to validate
 * @returns True if the item is a valid NavigationItem
 * @throws {NavigationValidationError} When validation fails
 * 
 * @example
 * ```typescript
 * try {
 *   const isValid = validateNavigationItem(someItem);
 *   if (isValid) {
 *     // Item is valid, safe to use
 *   }
 * } catch (error) {
 *   if (error instanceof NavigationValidationError) {
 *     console.error(`Validation failed for field ${error.field}: ${error.message}`);
 *   }
 * }
 * ```
 */
export function validateNavigationItem(item: unknown): item is NavigationItem {
  if (!item || typeof item !== 'object') {
    throw new NavigationValidationError(ERROR_MESSAGES.INVALID_ITEM);
  }

  const navItem = item as Record<string, unknown>;

  // Check required fields
  if (!navItem.label || typeof navItem.label !== 'string' || navItem.label.trim().length === 0) {
    throw new NavigationValidationError(ERROR_MESSAGES.MISSING_REQUIRED_PROP, 'label');
  }

  if (!navItem.href || typeof navItem.href !== 'string' || navItem.href.trim().length === 0) {
    throw new NavigationValidationError(ERROR_MESSAGES.MISSING_REQUIRED_PROP, 'href');
  }

  // Validate URL format
  try {
    new URL(navItem.href as string);
  } catch {
    // If it's not a full URL, check if it's a valid path
    if (!navItem.href.toString().startsWith('/') && !navItem.href.toString().startsWith('#')) {
      throw new NavigationValidationError(ERROR_MESSAGES.INVALID_URL, 'href');
    }
  }

  // Validate optional fields
  if (navItem.hasDropdown !== undefined && typeof navItem.hasDropdown !== 'boolean') {
    throw new NavigationValidationError('hasDropdown must be boolean', 'hasDropdown');
  }

  if (navItem.isActive !== undefined && typeof navItem.isActive !== 'boolean') {
    throw new NavigationValidationError('isActive must be boolean', 'isActive');
  }

  if (navItem.external !== undefined && typeof navItem.external !== 'boolean') {
    throw new NavigationValidationError('external must be boolean', 'external');
  }

  if (navItem.nofollow !== undefined && typeof navItem.nofollow !== 'boolean') {
    throw new NavigationValidationError('nofollow must be boolean', 'nofollow');
  }

  // Validate submenu if present
  if (navItem.submenu && Array.isArray(navItem.submenu)) {
    navItem.submenu.forEach((subItem: unknown, index: number) => {
      try {
        validateNavigationItem(subItem);
      } catch (error) {
        if (error instanceof NavigationValidationError) {
          throw new NavigationValidationError(
            `Submenu item ${index}: ${error.message}`,
            `submenu[${index}].${error.field || 'unknown'}`
          );
        }
        throw error;
      }
    });
  }

  return true;
}

/**
 * Validates an array of navigation items
 * 
 * This function validates each item in the array and returns a typed array
 * of valid NavigationItem objects. If any item fails validation, an error
 * is thrown with detailed information about which item and field failed.
 * 
 * @param items - Array of unknown items to validate
 * @returns Array of validated NavigationItem objects
 * @throws {NavigationValidationError} When any item fails validation
 * 
 * @example
 * ```typescript
 * try {
 *   const validItems = validateNavigationItems(rawItems);
 *   // All items are now validated and typed as NavigationItem[]
 * } catch (error) {
 *   console.error('Navigation validation failed:', error.message);
 * }
 * ```
 */
export function validateNavigationItems(items: unknown[]): NavigationItem[] {
  if (!Array.isArray(items)) {
    throw new NavigationValidationError('Navigation items must be an array');
  }

  const validatedItems: NavigationItem[] = [];
  
  items.forEach((item, index) => {
    try {
      validateNavigationItem(item);
      validatedItems.push(item as NavigationItem);
    } catch (error) {
      if (error instanceof NavigationValidationError) {
        throw new NavigationValidationError(
          `Item ${index}: ${error.message}`,
          `items[${index}].${error.field || 'unknown'}`
        );
      }
      throw error;
    }
  });

  return validatedItems;
}

/**
 * Creates a safe navigation item with fallback values
 * 
 * This function attempts to validate an item and returns either the validated
 * item or a fallback item with safe default values. This is useful for
 * graceful error handling when dealing with potentially invalid data.
 * 
 * @param item - The unknown item to validate and convert
 * @param fallback - Optional fallback values to use if validation fails
 * @returns A valid NavigationItem, either the original or a fallback
 * 
 * @example
 * ```typescript
 * const safeItem = getSafeNavigationItem(unknownItem, {
 *   label: 'Fallback Link',
 *   href: '/fallback'
 * });
 * // safeItem is guaranteed to be a valid NavigationItem
 * ```
 */
export function getSafeNavigationItem(item: unknown, fallback: Partial<NavigationItem> = {}): NavigationItem {
  try {
    validateNavigationItem(item);
    return item as NavigationItem;
  } catch {
    return {
      label: fallback.label || 'Unknown',
      href: fallback.href || '#',
      ...fallback
    };
  }
}
