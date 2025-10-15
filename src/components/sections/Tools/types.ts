/**
 * TypeScript type definitions for the Tools component
 * 
 * This file contains all the TypeScript interfaces, types, and enums
 * used throughout the Tools component system.
 */

/**
 * Props for the main Tools component
 */
export interface ToolsProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Custom CTA button configuration */
  cta?: CTAConfig;
  /** Custom hero content */
  hero?: HeroContent;
  /** Whether to show animations */
  showAnimations?: boolean;
  /** Custom click handler for CTA button */
  onCTAClick?: () => void;
}

/**
 * Title content structure
 */
export interface TitleContent {
  /** Main title line */
  line1: string;
  /** Subtitle line */
  line2: string;
}

/**
 * Call to action button configuration
 */
export interface CTAConfig {
  /** Button text */
  text: string;
  /** Button href for navigation */
  href?: string;
  /** Whether button is external link */
  external?: boolean;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'green';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Test ID for testing */
  testId?: string;
}

/**
 * Individual slide content structure
 */
export interface SlideContent {
  /** Slide number */
  number: string;
  /** Slide description */
  description: string;
  /** Slide image source */
  image: string;
  /** Image alt text */
  alt: string;
  /** Card title for this slide */
  cardTitle: string;
  /** Card description for this slide */
  cardDescription: string;
}

/**
 * Hero content structure for the left side
 */
export interface HeroContent {
  /** Array of slides */
  slides: SlideContent[];
}

/**
 * Tools section state
 */
export interface ToolsState {
  /** Whether component is mounted */
  isMounted: boolean;
  /** Whether animations are enabled */
  animationsEnabled: boolean;
  /** Current slide index */
  currentSlide: number;
  /** Whether carousel is auto-playing */
  isAutoPlaying: boolean;
}

/**
 * Carousel dots configuration
 */
export interface CarouselDotsProps {
  /** Total number of slides */
  totalSlides: number;
  /** Currently active slide index */
  activeSlide: number;
  /** Click handler for dot navigation */
  onDotClick: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Tools card content structure
 */
export interface ToolsCardContent {
  /** Card title */
  title: TitleContent;
  /** Card description */
  description: string;
  /** CTA button configuration */
  cta: CTAConfig;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Fade in duration */
  fadeInDuration: string;
  /** Fade in delay */
  fadeInDelay: string;
  /** Slide transition duration */
  slideDuration: string;
  /** Button hover scale */
  buttonHoverScale: string;
  /** Button animation delay */
  buttonDelay: string;
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
  /** Grid gap */
  gridGap: string;
  /** Card padding */
  cardPadding: string;
  /** Card border radius */
  cardBorderRadius: string;
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Main title font size */
  titleSize: string;
  /** Main title font weight */
  titleWeight: string;
  /** Main title line height */
  titleLineHeight: string;
  /** Main title letter spacing */
  titleLetterSpacing: string;
  /** Description font size */
  descriptionSize: string;
  /** Description font weight */
  descriptionWeight: string;
  /** Description line height */
  descriptionLineHeight: string;
  /** Card title font size */
  cardTitleSize: string;
  /** Card title font weight */
  cardTitleWeight: string;
}

/**
 * Error types for Tools component
 */
export enum ToolsErrorType {
  CONTENT_LOADING = 'CONTENT_LOADING',
  BUTTON_CLICK = 'BUTTON_CLICK',
  INVALID_PROPS = 'INVALID_PROPS',
  CAROUSEL_ERROR = 'CAROUSEL_ERROR'
}

/**
 * Tools error interface
 */
export interface ToolsError {
  /** Error type */
  type: ToolsErrorType;
  /** Error message */
  message: string;
  /** Error details */
  details?: unknown;
  /** Timestamp */
  timestamp: Date;
}

export default ToolsProps;
