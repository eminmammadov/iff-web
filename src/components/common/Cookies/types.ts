/**
 * TypeScript type definitions for the Cookies component
 * 
 * This file contains all the TypeScript interfaces, types, and enums
 * used throughout the Cookies component system.
 */

/**
 * Props for the Cookies component
 */
export interface CookiesProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Custom message to display */
  message?: string;
  /** Button text */
  buttonText?: string;
  /** Delay before showing banner in milliseconds */
  autoShowDelay?: number;
  /** Hours to hide banner after acceptance */
  hideForHours?: number;
  /** Callback when cookies are accepted */
  onAccept?: () => void;
  /** Whether to show animations */
  showAnimations?: boolean;
}

/**
 * Cookies banner state interface
 */
export interface CookiesBannerState {
  /** Whether the banner is visible */
  isVisible: boolean;
  /** Whether the banner is animating */
  isAnimating: boolean;
  /** Whether the banner should be rendered */
  shouldRender: boolean;
}

/**
 * Cookie acceptance data stored in localStorage
 */
export interface CookieAcceptanceData {
  /** Timestamp when cookies were accepted */
  timestamp: number;
  /** Whether cookies were accepted */
  accepted: boolean;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Fade in duration */
  fadeInDuration: string;
  /** Fade out duration */
  fadeOutDuration: string;
  /** Slide up animation */
  slideUpClasses: string;
  /** Slide down animation */
  slideDownClasses: string;
  /** Fade in classes */
  fadeInClasses: string;
  /** Fade out classes */
  fadeOutClasses: string;
}

/**
 * Layout configuration
 */
export interface LayoutConfig {
  /** Container max width */
  containerMaxWidth: string;
  /** Container padding */
  containerPadding: string;
  /** Content gap */
  contentGap: string;
  /** Actions gap */
  actionsGap: string;
  /** Desktop positioning */
  desktopPosition: string;
  /** Mobile positioning */
  mobilePosition: string;
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Message font size */
  messageSize: string;
  /** Message font weight */
  messageWeight: string;
  /** Message line height */
  messageLineHeight: string;
  /** Button font size */
  buttonSize: string;
  /** Button font weight */
  buttonWeight: string;
}

/**
 * Styling configuration
 */
export interface StylingConfig {
  /** Background color */
  backgroundColor: string;
  /** Text color */
  textColor: string;
  /** Border radius */
  borderRadius: string;
  /** Box shadow */
  boxShadow: string;
  /** Backdrop filter */
  backdropFilter: string;
  /** Transition duration */
  transitionDuration: string;
  /** Hover effects */
  hoverEffects: string;
}

/**
 * Accessibility configuration
 */
export interface AccessibilityConfig {
  /** ARIA label for the banner */
  ariaLabel: string;
  /** ARIA role */
  role: string;
  /** ARIA live region */
  ariaLive: string;
  /** Button ARIA label prefix */
  buttonAriaLabelPrefix: string;
}

/**
 * Breakpoints configuration
 */
export interface BreakpointsConfig {
  /** Mobile breakpoint */
  mobile: string;
  /** Tablet breakpoint */
  tablet: string;
  /** Desktop breakpoint */
  desktop: string;
}

/**
 * Cookies component error types
 */
export enum CookiesErrorType {
  STORAGE_ERROR = 'STORAGE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RENDER_ERROR = 'RENDER_ERROR'
}

/**
 * Custom error class for Cookies component
 */
export class CookiesError extends Error {
  constructor(
    message: string,
    public type: CookiesErrorType,
    public context?: string
  ) {
    super(message);
    this.name = 'CookiesError';
  }
}
