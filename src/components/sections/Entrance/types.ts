/**
 * TypeScript type definitions for the Entrance component
 * 
 * This file contains all the TypeScript interfaces, types, and enums
 * used throughout the Entrance component system.
 */

/**
 * Props for the Entrance component
 */
export interface EntranceProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Custom title content */
  title?: TitleContent;
  /** Custom CTA button configuration */
  cta?: CTAConfig;
  /** Whether to show animations */
  showAnimations?: boolean;
  /** Custom click handler for CTA button */
  onCTAClick?: () => void;
}

/**
 * Title content structure
 */
export interface TitleContent {
  /** Single line of title */
  line1: TitleLine;
}

/**
 * Title line structure
 */
export interface TitleLine {
  /** Highlighted text */
  highlighted: string;
  /** Regular text */
  regular: string;
}

/**
 * Call to action button configuration
 */
export interface CTAConfig {
  /** Button text */
  text: string;
  /** Button icon */
  icon?: string;
  /** Button href for navigation */
  href?: string;
  /** Whether button is external link */
  external?: boolean;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Title font size */
  titleSize: string;
  /** Title font weight */
  titleWeight: string;
  /** Title line height */
  titleLineHeight: string;
  /** Title letter spacing */
  titleLetterSpacing: string;
  /** Highlighted text color */
  highlightedColor: string;
  /** Regular text color */
  regularColor: string;
  /** Button text size */
  buttonTextSize: string;
  /** Button text weight */
  buttonTextWeight: string;
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
  /** Text alignment */
  textAlignment: string;
  /** Button margin top */
  buttonMarginTop: string;
}

/**
 * Styling configuration
 */
export interface StylingConfig {
  /** Background color */
  backgroundColor: string;
  /** Button background */
  buttonBackground: string;
  /** Button border */
  buttonBorder: string;
  /** Button hover background */
  buttonHoverBackground: string;
  /** Button padding */
  buttonPadding: string;
  /** Button border radius */
  buttonBorderRadius: string;
  /** Button transition */
  buttonTransition: string;
  /** Icon margin */
  iconMargin: string;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Fade in duration */
  fadeInDuration: string;
  /** Fade in delay */
  fadeInDelay: string;
  /** Button hover scale */
  buttonHoverScale: string;
  /** Button hover transition */
  buttonHoverTransition: string;
}

/**
 * Entrance component state
 */
export interface EntranceState {
  /** Whether component is mounted */
  isMounted: boolean;
  /** Whether animations are enabled */
  animationsEnabled: boolean;
  /** Whether button is hovered */
  isButtonHovered: boolean;
}

/**
 * Entrance component context type
 */
export interface EntranceContextType {
  /** Current state */
  state: EntranceState;
  /** Handle button hover */
  handleButtonHover: () => void;
  /** Handle button leave */
  handleButtonLeave: () => void;
  /** Handle CTA click */
  handleCTAClick: () => void;
}

/**
 * Error types for Entrance component
 */
export enum EntranceErrorType {
  CONTENT_LOADING = 'CONTENT_LOADING',
  BUTTON_CLICK = 'BUTTON_CLICK',
  INVALID_PROPS = 'INVALID_PROPS'
}

/**
 * Entrance error interface
 */
export interface EntranceError {
  /** Error type */
  type: EntranceErrorType;
  /** Error message */
  message: string;
  /** Error details */
  details?: unknown;
  /** Timestamp */
  timestamp: Date;
}

export default EntranceProps;
