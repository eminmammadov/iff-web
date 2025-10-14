/**
 * Header configuration constants and settings
 * 
 * This configuration object contains all the constants, URLs, dimensions,
 * and styling settings used throughout the Header component.
 * 
 * @example
 * ```typescript
 * import { HEADER_CONFIG } from './config';
 * 
 * // Use header height
 * const headerHeight = HEADER_CONFIG.height;
 * 
 * // Get app URL
 * const appUrl = HEADER_CONFIG.appUrl;
 * ```
 */
import { COLORS } from '@/config/colors';
export const HEADER_CONFIG = {
  /** Application URL for external links */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://app.if.fund',
  
  /** Header dimensions and spacing */
  dimensions: {
    /** Header height class */
    height: 'h-16',
    /** Header height in pixels for calculations */
    heightPx: 64
  },
  
  /** Mobile menu configuration */
  mobileMenu: {
    /** Top position when fixed */
    top: 'top-16',
    /** Animation classes */
    animation: 'transition-all duration-300 ease-in-out',
    /** Z-index for overlay */
    zIndex: 'z-50'
  },
  
  /** Spacing configuration */
  spacing: {
    /** Mobile spacing between elements */
    mobile: 'space-x-3',
    /** Desktop spacing between elements */
    desktop: 'space-x-4'
  },
  
  /** Responsive padding configuration */
  padding: {
    /** Base padding for all screen sizes */
    base: 'px-4',
    /** Small screen padding */
    sm: 'sm:px-6',
    /** Large screen padding */
    lg: 'lg:px-8',
    /** Extra large screen padding */
    xl: 'xl:px-12',
    /** 2XL screen padding */
    '2xl': '2xl:px-16',
    /** Combined padding classes */
    all: 'px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
  },
  
  /** Button configuration */
  button: {
    /** Launch button text */
    text: 'Launch App',
    /** Status indicator configuration */
    statusIndicator: {
      /** Size classes */
      size: 'w-2 h-2',
      /** Color class */
      color: 'bg-orange-500',
      /** Shape class */
      shape: 'rounded-full',
      /** Margin class */
      margin: 'mr-2'
    }
  },
  
  /** CSS classes for different states */
  classes: {
    /** Header container classes */
    header: `w-full ${COLORS.bgWhite} border-b border-gray-100 relative`,
    /** Main container classes */
    container: 'w-full',
    /** Flex container classes */
    flexContainer: 'flex items-center justify-between',
    /** Mobile menu classes */
    mobileMenu: `md:hidden fixed left-0 right-0 ${COLORS.bgWhite} border-t border-gray-100 ${COLORS.shadowLg}`,
    /** Mobile menu content classes */
    mobileMenuContent: 'px-4 py-4'
  }
} as const;

/**
 * Error messages for Header component
 */
export const HEADER_ERROR_MESSAGES = {
  /** Navigation context error */
  NAVIGATION_CONTEXT_ERROR: 'Header must be used within NavigationProvider',
  /** Mobile menu error */
  MOBILE_MENU_ERROR: 'Failed to toggle mobile menu',
  /** Button click error */
  BUTTON_CLICK_ERROR: 'Failed to handle button click'
} as const;
