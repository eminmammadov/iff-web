/**
 * Entrance component configuration constants and settings
 * 
 * This configuration object contains all the constants, text content,
 * animations, and styling settings used throughout the Entrance component.
 * 
 * @example
 * ```typescript
 * import { ENTRANCE_CONFIG } from './config';
 * 
 * // Use text content
 * const title = ENTRANCE_CONFIG.content.title;
 * 
 * // Get styling settings
 * const styling = ENTRANCE_CONFIG.styling;
 * ```
 */
import { COLORS } from '@/config/colors';

export const ENTRANCE_CONFIG = {
  /** Text content configuration */
  content: {
    /** Main title with highlighted words */
    title: {
      /** Single line title */
      line1: {
        /** Highlighted text */
        highlighted: 'Invest Founders Fund was established together with close friends to create a trusted space for shared growth and investment opportunities.',
        /** Regular text */
        regular: ''
      }
    },
    /** Call to action button text */
    cta: {
      /** Button text */
      text: 'Explore',
      /** Button icon */
      icon: 'TbArrowDownRight'
    }
  },

  /** Typography configuration */
  typography: {
    /** Title font size */
    titleSize: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
    /** Title font weight */
    titleWeight: 'font-thin',
    /** Title line height */
    titleLineHeight: 'leading-none',
    /** Title letter spacing */
    titleLetterSpacing: 'tracking-normal',
    /** Highlighted text color */
    highlightedColor: COLORS.textPrimary,
    /** Regular text color */
    regularColor: COLORS.textSecondary,
    /** Button text size */
    buttonTextSize: 'text-sm',
    /** Button text weight */
    buttonTextWeight: 'font-light'
  },

  /** Layout configuration */
  layout: {
    /** Container max width */
    containerMaxWidth: 'max-w-6xl',
    /** Container padding */
    containerPadding: 'px-4 sm:px-6 lg:px-8',
    /** Vertical spacing */
    verticalSpacing: 'py-16 md:py-20 lg:py-24',
    /** Text alignment */
    textAlignment: 'text-center',
    /** Button margin top */
    buttonMarginTop: 'mt-8'
  },

  /** Styling configuration */
  styling: {
    /** Background color */
    backgroundColor: COLORS.bgWhite,
    /** Button background */
    buttonBackground: 'transparent',
    /** Button border */
    buttonBorder: 'border-2 border-gray-300',
    /** Button hover background */
    buttonHoverBackground: COLORS.hoverGray200,
    /** Button padding */
    buttonPadding: 'px-6 py-3',
    /** Button border radius */
    buttonBorderRadius: 'rounded-lg',
    /** Button transition */
    buttonTransition: 'transition-all duration-300',
    /** Icon margin */
    iconMargin: 'ml-2'
  },

  /** Animation configuration */
  animation: {
    /** Fade in duration */
    fadeInDuration: 'duration-600',
    /** Fade in delay */
    fadeInDelay: 'delay-50',
    /** Button hover scale */
    buttonHoverScale: 'hover:scale-105',
    /** Button animation delay */
    buttonDelay: 'delay-150',
    /** Slide up animation */
    slideUpDuration: 'duration-600',
    /** Slide up delay */
    slideUpDelay: 'delay-50',
    /** Initial state classes */
    initialOpacity: 'opacity-0',
    initialTransform: 'translate-y-4',
    /** Final state classes */
    finalOpacity: 'opacity-100',
    finalTransform: 'translate-y-0'
  },

  /** Responsive breakpoints */
  breakpoints: {
    /** Mobile breakpoint */
    mobile: 'sm',
    /** Tablet breakpoint */
    tablet: 'md',
    /** Desktop breakpoint */
    desktop: 'lg',
    /** Large desktop breakpoint */
    largeDesktop: 'xl'
  },

  /** Accessibility settings */
  accessibility: {
    /** ARIA label for the section */
    ariaLabel: 'Entrance section',
    /** ARIA role */
    role: 'banner',
    /** Button ARIA label */
    buttonAriaLabel: 'Get started with our platform'
  }
} as const;

/**
 * Error messages for Entrance component
 */
export const ENTRANCE_ERROR_MESSAGES = {
  /** Content loading error */
  CONTENT_LOADING_ERROR: 'Failed to load entrance content',
  /** Button click error */
  BUTTON_CLICK_ERROR: 'Failed to handle button click',
  /** Invalid props error */
  INVALID_PROPS_ERROR: 'Invalid props provided to Entrance component'
} as const;

export default ENTRANCE_CONFIG;
