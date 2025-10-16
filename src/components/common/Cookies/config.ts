/**
 * Configuration constants for the Cookies component
 * 
 * This file centralizes all configuration values, styling options,
 * and content for the Cookies component system.
 */

import { COLORS } from '@/config/colors';
import { 
  AnimationConfig,
  LayoutConfig,
  TypographyConfig,
  StylingConfig,
  AccessibilityConfig,
  BreakpointsConfig
} from './types';

/**
 * Default message for cookies banner
 */
export const DEFAULT_COOKIES_MESSAGE = `May fortune favor your every step. Our online fund platform, developed by carefully selected investors from our close network, adheres to official regulations and offers you a transparent, personalized investment partner. Guided by disciplined strategies and our 'DDGO' principle (meaning 'steady progress toward the goal'), we channel your weekly savings into crypto assets to foster consistent growth and secure a prosperous future.`;

/**
 * Storage key for tracking cookie acceptance
 */
export const COOKIES_STORAGE_KEY = 'if_funds_cookies_accepted';

/**
 * Main configuration object for Cookies component
 */
export const COOKIES_CONFIG = {
  /** Content configuration */
  content: {
    /** Default message */
    defaultMessage: DEFAULT_COOKIES_MESSAGE,
    /** Default button text */
    defaultButtonText: 'OK',
    /** Default auto show delay in milliseconds */
    defaultAutoShowDelay: 1000,
    /** Default hide duration in hours */
    defaultHideForHours: 3
  },

  /** Layout configuration */
  layout: {
    /** Container max width */
    containerMaxWidth: 'w-full',
    /** Container padding */
    containerPadding: 'px-4 py-6',
    /** Content gap */
    contentGap: 'gap-4',
    /** Actions gap */
    actionsGap: 'gap-2',
    /** Desktop positioning */
    desktopPosition: 'bottom-0 left-0 right-0',
    /** Mobile positioning */
    mobilePosition: 'bottom-0 left-0 right-0'
  } as LayoutConfig,

  /** Typography configuration */
  typography: {
    /** Message font size */
    messageSize: 'text-xs',
    /** Message font weight */
    messageWeight: 'font-light',
    /** Message line height */
    messageLineHeight: 'leading-relaxed',
    /** Button font size */
    buttonSize: 'text-sm',
    /** Button font weight */
    buttonWeight: 'font-medium'
  } as TypographyConfig,

  /** Styling configuration */
  styling: {
    /** Background color with glass effect */
    backgroundColor: 'bg-black/80',
    /** Text color */
    textColor: COLORS.textWhite,
    /** Border radius */
    borderRadius: 'rounded-none',
    /** Box shadow */
    boxShadow: 'shadow-lg',
    /** Backdrop filter */
    backdropFilter: 'backdrop-blur-md',
    /** Transition duration */
    transitionDuration: 'transition-all duration-500 ease-in-out',
    /** Hover effects */
    hoverEffects: 'hover:bg-black/90'
  } as StylingConfig,

  /** Animation configuration */
  animation: {
    /** Fade in duration */
    fadeInDuration: 'duration-500',
    /** Fade out duration */
    fadeOutDuration: 'duration-300',
    /** Slide up animation */
    slideUpClasses: 'transform translate-y-5 opacity-0',
    /** Slide down animation */
    slideDownClasses: 'transform translate-y-0 opacity-100',
    /** Fade in classes */
    fadeInClasses: 'animate-fade-in',
    /** Fade out classes */
    fadeOutClasses: 'animate-fade-out'
  } as AnimationConfig,

  /** Breakpoints configuration */
  breakpoints: {
    /** Mobile breakpoint */
    mobile: 'max-w-sm',
    /** Tablet breakpoint */
    tablet: 'sm:max-w-md',
    /** Desktop breakpoint */
    desktop: 'md:max-w-lg'
  } as BreakpointsConfig,

  /** Accessibility configuration */
  accessibility: {
    /** ARIA label for the banner */
    ariaLabel: 'Cookies consent banner',
    /** ARIA role */
    role: 'dialog',
    /** ARIA live region */
    ariaLive: 'polite' as const,
    /** Button ARIA label prefix */
    buttonAriaLabelPrefix: 'Accept cookies and close banner'
  } as AccessibilityConfig,

  /** Z-index configuration */
  zIndex: {
    /** Banner z-index */
    banner: 'z-50',
    /** Overlay z-index */
    overlay: 'z-40'
  },

  /** Animation timing */
  timing: {
    /** Auto show delay */
    autoShowDelay: 1000,
    /** Animation duration */
    animationDuration: 500,
    /** Hide duration in hours */
    hideForHours: 3
  }
} as const;
