/**
 * TypeScript type definitions for the Partners component
 * 
 * This file contains all the TypeScript interfaces, types, and enums
 * used throughout the Partners component system.
 */

/**
 * Props for the Partners component
 */
export interface PartnersProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Animation speed in milliseconds */
  speed?: number;
  /** Whether to pause animation on hover */
  pauseOnHover?: boolean;
  /** Whether to show gradient overlays */
  showGradients?: boolean;
  /** Custom logo data */
  logos?: PartnerLogo[];
}

/**
 * Partner logo data structure
 */
export interface PartnerLogo {
  /** Partner name */
  name: string;
  /** Logo image source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional link URL */
  href?: string;
  /** Whether the logo is external link */
  external?: boolean;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Animation speed in milliseconds */
  speed: number;
  /** Whether to pause on hover */
  pauseOnHover: boolean;
  /** Animation timing function */
  timingFunction: string;
  /** Animation iteration count */
  iterationCount: string;
}

/**
 * Dimensions configuration
 */
export interface DimensionsConfig {
  /** Logo container width */
  logoWidth: string;
  /** Logo container height */
  logoHeight: string;
  /** Spacing between logos */
  spacing: string;
  /** Gradient overlay width */
  gradientWidth: string;
}

/**
 * Styling configuration
 */
export interface StylingConfig {
  /** Logo opacity */
  logoOpacity: string;
  /** Logo hover opacity */
  logoHoverOpacity: string;
  /** Logo filter */
  logoFilter: string;
  /** Logo hover filter */
  logoHoverFilter: string;
  /** Transition duration */
  transitionDuration: string;
  /** Background color */
  backgroundColor: string;
  /** Padding */
  padding: string;
}

/**
 * Partners component state
 */
export interface PartnersState {
  /** Whether animation is paused */
  isPaused: boolean;
  /** Whether component is mounted */
  isMounted: boolean;
  /** Current animation speed */
  currentSpeed: number;
}

/**
 * Partners component context type
 */
export interface PartnersContextType {
  /** Current state */
  state: PartnersState;
  /** Pause animation */
  pauseAnimation: () => void;
  /** Resume animation */
  resumeAnimation: () => void;
  /** Update speed */
  updateSpeed: (speed: number) => void;
}

/**
 * Error types for Partners component
 */
export enum PartnersErrorType {
  LOGO_LOADING = 'LOGO_LOADING',
  ANIMATION_INIT = 'ANIMATION_INIT',
  INVALID_PROPS = 'INVALID_PROPS'
}

/**
 * Partners error interface
 */
export interface PartnersError {
  /** Error type */
  type: PartnersErrorType;
  /** Error message */
  message: string;
  /** Error details */
  details?: unknown;
  /** Timestamp */
  timestamp: Date;
}

export default PartnersProps;
