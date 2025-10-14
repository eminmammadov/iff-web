/**
 * TypeScript type definitions for Hero component
 * 
 * This file contains all the TypeScript interfaces and types
 * used throughout the Hero component system.
 */

/**
 * Props for the main Hero component
 */
export interface HeroProps {
  /** Additional CSS classes to apply to the hero section */
  className?: string;
  /** Custom title text (overrides config) */
  title?: string;
  /** Custom description text (overrides config) */
  description?: string;
  /** Custom primary CTA button configuration */
  primaryCTA?: CTAButtonProps;
  /** Custom secondary CTA button configuration */
  secondaryCTA?: CTAButtonProps;
  /** Background image configuration */
  background?: BackgroundConfig;
  /** Animation configuration */
  animation?: AnimationConfig;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Call-to-Action button configuration
 */
export interface CTAButtonProps {
  /** Button text */
  text: string;
  /** Button href/link */
  href: string;
  /** Optional icon */
  icon?: string;
  /** Button variant */
  variant?: 'primary' | 'secondary';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Background configuration
 */
export interface BackgroundConfig {
  /** Background image path */
  image?: string;
  /** Background image alt text */
  alt?: string;
  /** Background overlay opacity */
  overlayOpacity?: number;
  /** Background color fallback */
  backgroundColor?: string;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Whether animations are enabled */
  enabled?: boolean;
  /** Animation duration */
  duration?: string;
  /** Animation delay */
  delay?: string;
  /** Animation type */
  type?: 'fade' | 'slide' | 'scale';
}

/**
 * Hero content configuration
 */
export interface HeroContentConfig {
  /** Main title */
  title: string;
  /** Description text */
  description: string;
  /** Primary CTA button */
  primaryCTA: CTAButtonProps;
  /** Secondary CTA button */
  secondaryCTA: CTAButtonProps;
}

/**
 * Hero visual configuration
 */
export interface HeroVisualConfig {
  /** Background image */
  background: BackgroundConfig;
  /** Visual effects */
  effects?: {
    /** Dotted pattern */
    dottedPattern?: boolean;
    /** Gradient overlay */
    gradientOverlay?: boolean;
    /** Parallax effect */
    parallax?: boolean;
  };
}

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveConfig {
  /** Mobile breakpoint */
  mobile: string;
  /** Tablet breakpoint */
  tablet: string;
  /** Desktop breakpoint */
  desktop: string;
  /** Large desktop breakpoint */
  largeDesktop: string;
}

/**
 * Hero section state
 */
export interface HeroState {
  /** Whether component is loaded */
  isLoaded: boolean;
  /** Whether background image is loaded */
  isBackgroundLoaded: boolean;
  /** Current animation state */
  animationState: 'idle' | 'entering' | 'entered' | 'exiting';
  /** Error state */
  error?: string;
}

/**
 * Hero component ref methods
 */
export interface HeroRef {
  /** Scroll to hero section */
  scrollTo: () => void;
  /** Trigger animation */
  triggerAnimation: () => void;
  /** Reset animation */
  resetAnimation: () => void;
}

/**
 * Hero analytics event data
 */
export interface HeroAnalytics {
  /** CTA button click events */
  ctaClick: {
    button: 'primary' | 'secondary';
    text: string;
    href: string;
    timestamp: number;
  };
  /** Section view events */
  sectionView: {
    timestamp: number;
    duration: number;
  };
}
