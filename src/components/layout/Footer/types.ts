/**
 * TypeScript type definitions for the Footer component
 * 
 * This file contains all the TypeScript interfaces, types, and enums
 * used throughout the Footer component system.
 */

/**
 * Props for the Footer component
 */
export interface FooterProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Callback function for link clicks */
  onLinkClick?: (link: FooterLink) => void;
  /** Callback function for social media clicks */
  onSocialClick?: (social: SocialLink) => void;
  /** Whether to show animations */
  showAnimations?: boolean;
}

/**
 * Footer link data structure
 */
export interface FooterLink {
  /** Display text for the link */
  label: string;
  /** URL to navigate to */
  href: string;
  /** Whether this is an external link */
  external?: boolean;
  /** Whether to add nofollow to external links */
  nofollow?: boolean;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Social media link data structure
 */
export interface SocialLink {
  /** Social platform name */
  name: string;
  /** URL to the social media profile */
  href: string;
  /** Icon identifier */
  icon: 'twitter' | 'linkedin' | 'github' | 'instagram';
  /** ARIA label for accessibility */
  ariaLabel: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Navigation menu section structure
 */
export interface NavigationSection {
  /** Section title */
  title: string;
  /** Links in this section */
  items: FooterLink[];
}

/**
 * Legal disclaimer content structure
 */
export interface LegalContent {
  /** Disclaimer text paragraphs */
  disclaimers: string[];
  /** Numbered notes */
  notes: LegalNote[];
}

/**
 * Legal note structure
 */
export interface LegalNote {
  /** Note number */
  number: string;
  /** Note text */
  text: string;
}

/**
 * Footer state management
 */
export interface FooterState {
  /** Whether animations are enabled */
  animationsEnabled: boolean;
  /** Whether component is visible */
  isVisible: boolean;
}

/**
 * Footer error types
 */
export enum FooterErrorType {
  /** Content loading error */
  CONTENT_LOADING_ERROR = 'CONTENT_LOADING_ERROR',
  /** Link click error */
  LINK_CLICK_ERROR = 'LINK_CLICK_ERROR',
  /** Social click error */
  SOCIAL_CLICK_ERROR = 'SOCIAL_CLICK_ERROR',
  /** Logo click error */
  LOGO_CLICK_ERROR = 'LOGO_CLICK_ERROR',
  /** Invalid props error */
  INVALID_PROPS_ERROR = 'INVALID_PROPS_ERROR'
}

/**
 * Footer error structure
 */
export interface FooterError {
  /** Error type */
  type: FooterErrorType;
  /** Error message */
  message: string;
  /** Additional error details */
  details?: string;
  /** Timestamp of error */
  timestamp: Date;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Fade in duration */
  fadeInDuration: string;
  /** Fade in delay */
  fadeInDelay: string;
  /** Slide up duration */
  slideUpDuration: string;
  /** Slide up delay */
  slideUpDelay: string;
  /** Initial opacity */
  initialOpacity: string;
  /** Initial transform */
  initialTransform: string;
  /** Final opacity */
  finalOpacity: string;
  /** Final transform */
  finalTransform: string;
}

/**
 * Layout configuration
 */
export interface LayoutConfig {
  /** Container max width */
  containerMaxWidth: string;
  /** Container padding */
  containerPadding: string;
  /** Vertical spacing */
  verticalSpacing: string;
  /** Navigation section gap */
  navigationGap: string;
  /** Legal section gap */
  legalGap: string;
  /** Brand section gap */
  brandGap: string;
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Navigation title size */
  navTitleSize: string;
  /** Navigation title weight */
  navTitleWeight: string;
  /** Navigation link size */
  navLinkSize: string;
  /** Navigation link weight */
  navLinkWeight: string;
  /** Disclaimer text size */
  disclaimerSize: string;
  /** Disclaimer line height */
  disclaimerLineHeight: string;
  /** Note text size */
  noteSize: string;
  /** Note line height */
  noteLineHeight: string;
  /** Copyright text size */
  copyrightSize: string;
  /** Copyright text weight */
  copyrightWeight: string;
}

/**
 * Styling configuration
 */
export interface StylingConfig {
  /** Background image */
  backgroundImage: string;
  /** Background overlay */
  backgroundOverlay: string;
  /** Background size and position */
  backgroundSize: string;
  /** Background color */
  backgroundColor: string;
  /** Text primary color */
  textPrimary: string;
  /** Text secondary color */
  textSecondary: string;
  /** Border color */
  borderColor: string;
  /** Hover color */
  hoverColor: string;
  /** Social hover color */
  socialHoverColor: string;
  /** Transition duration */
  transitionDuration: string;
  /** Relative positioning for overlay */
  relativePosition: string;
}

/**
 * Accessibility configuration
 */
export interface AccessibilityConfig {
  /** ARIA label for the footer */
  ariaLabel: string;
  /** ARIA role */
  role: string;
  /** Logo ARIA label */
  logoAriaLabel: string;
  /** Social link ARIA label prefix */
  socialAriaLabelPrefix: string;
}
