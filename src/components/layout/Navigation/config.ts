/**
 * Navigation configuration constants and settings
 * 
 * This configuration object contains all the constants, themes, animations,
 * and responsive settings used throughout the Navigation component system.
 * 
 * @example
 * ```typescript
 * import { NAVIGATION_CONFIG } from './config';
 * 
 * // Use theme classes
 * const themeClasses = NAVIGATION_CONFIG.themes.default;
 * 
 * // Get animation duration
 * const duration = NAVIGATION_CONFIG.animationDuration.normal;
 * ```
 */
import { COLORS } from '@/config/colors';
export const NAVIGATION_CONFIG = {
  /** Base URL for external links - defaults to production URL if not set */
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://app.if.fund',
  
  /** Animation durations in milliseconds for different speed preferences */
  animationDuration: {
    /** Fast animations (150ms) - for quick interactions */
    fast: 150,
    /** Normal animations (200ms) - default speed for most interactions */
    normal: 200,
    /** Slow animations (300ms) - for smooth, deliberate interactions */
    slow: 300
  },
  
  /** Theme configurations for different visual styles */
  themes: {
    /** Default theme with gray color scheme */
    default: {
      /** Link text colors */
      link: `${COLORS.textSecondary} hover:${COLORS.textPrimary}`,
      /** Active state colors */
      active: `${COLORS.bgGray100} ${COLORS.textPrimary} font-medium`,
      /** Dropdown background and border */
      dropdown: `${COLORS.bgWhite} ${COLORS.borderGray200}`,
      /** Hover state background */
      hover: COLORS.hoverGray200
    },
    /** Dark theme for dark mode interfaces */
    dark: {
      /** Link text colors for dark backgrounds */
      link: 'text-gray-300 hover:text-white',
      /** Active state colors for dark theme */
      active: 'bg-gray-700 text-white font-medium',
      /** Dropdown background and border for dark theme */
      dropdown: 'bg-gray-800 border-gray-700',
      /** Hover state background for dark theme */
      hover: 'hover:bg-gray-700'
    },
    /** Minimal theme with subtle styling */
    minimal: {
      /** Link text colors for minimal design */
      link: 'text-gray-700 hover:text-gray-900',
      /** Active state colors for minimal theme */
      active: 'bg-gray-100 text-gray-900 font-medium',
      /** Dropdown background and border for minimal theme */
      dropdown: 'bg-white border-gray-200',
      /** Hover state background for minimal theme */
      hover: 'hover:bg-gray-100'
    }
  },
  
  /** Responsive breakpoint classes for mobile/desktop visibility */
  breakpoints: {
    /** Mobile breakpoint - visible on mobile, hidden on desktop */
    mobile: 'flex md:hidden',
    /** Desktop breakpoint - hidden on mobile, visible on desktop */
    desktop: 'hidden md:flex'
  },
  
  /** Default dropdown menu settings */
  dropdown: {
    /** Dropdown width settings for different screen sizes */
    width: {
      /** Full width on mobile devices */
      mobile: 'w-full',
      /** Fixed width (400px) on desktop - wider to accommodate content */
      desktop: 'w-[400px]'
    },
    /** Dropdown positioning for different screen sizes */
    positioning: {
      /** Static positioning on mobile */
      mobile: 'static mt-2',
      /** Absolute positioning on desktop */
      desktop: 'absolute top-full left-0 mt-2'
    }
  }
} as const;

/**
 * Navigation item validation schema for runtime type checking
 * 
 * This schema defines the validation rules for navigation items,
 * including required fields, types, and constraints.
 * 
 * @example
 * ```typescript
 * import { NAVIGATION_ITEM_SCHEMA } from './config';
 * 
 * // Validate a navigation item
 * if (NAVIGATION_ITEM_SCHEMA.label.required && typeof item.label === 'string') {
 *   // Item has valid label
 * }
 * ```
 */
export const NAVIGATION_ITEM_SCHEMA = {
  /** Label validation - required string with minimum length */
  label: { required: true, type: 'string', minLength: 1 },
  /** Href validation - required string with minimum length */
  href: { required: true, type: 'string', minLength: 1 },
  /** HasDropdown validation - optional boolean */
  hasDropdown: { required: false, type: 'boolean' },
  /** IsActive validation - optional boolean */
  isActive: { required: false, type: 'boolean' },
  /** Submenu validation - optional array */
  submenu: { required: false, type: 'array' },
  /** External validation - optional boolean */
  external: { required: false, type: 'boolean' },
  /** Nofollow validation - optional boolean */
  nofollow: { required: false, type: 'boolean' },
  /** Icon validation - optional React component */
  icon: { required: false, type: 'object' },
  /** Description validation - optional string */
  description: { required: false, type: 'string' },
  /** TestId validation - optional string for testing */
  testId: { required: false, type: 'string' }
} as const;

/**
 * Error messages for navigation validation and error handling
 * 
 * Centralized error messages used throughout the navigation system
 * for consistent error reporting and debugging.
 */
export const ERROR_MESSAGES = {
  /** Generic invalid item error */
  INVALID_ITEM: 'Invalid navigation item provided',
  /** Missing required property error */
  MISSING_REQUIRED_PROP: 'Required property is missing',
  /** Invalid URL format error */
  INVALID_URL: 'Invalid URL format',
  /** Dropdown rendering error */
  DROPDOWN_ERROR: 'Failed to render dropdown menu'
} as const;
