/**
 * Hero section configuration constants and settings
 * 
 * This configuration object contains all the constants, content, styling,
 * and responsive settings used throughout the Hero component.
 * 
 * @example
 * ```typescript
 * import { HERO_CONFIG } from './config';
 * 
 * // Use hero content
 * const title = HERO_CONFIG.content.title;
 * 
 * // Get styling classes
 * const containerClass = HERO_CONFIG.styles.container;
 * ```
 */
export const HERO_CONFIG = {
  /** Hero section content */
  content: {
    /** Main heading text */
    title: "Crypto investment and asset management fund",
    /** Description paragraph text */
    description: "Founded with distinguished investors, our regulated fund platform applies disciplined DDGO principles to allocate weekly savings into crypto assets, ensuring transparent, reliable, and sustainable growth.",
    /** Primary CTA button text */
    primaryCTA: {
      text: "Our Portfolio",
      href: "https://app.if.fund/portfolio",
      icon: ""
    },
    /** Secondary CTA button text */
    secondaryCTA: {
      text: "Join Us",
      href: "https://app.if.fund/join"
    }
  },
  
  /** Background image configuration */
  background: {
    /** Background image path */
    image: "/images/hero.jpg",
    /** Background image alt text */
    alt: "Hero background image",
    /** Background overlay opacity */
    overlayOpacity: 0.1
  },
  
  /** Typography configuration */
  typography: {
    /** Main heading styles */
    title: {
      /** Font size classes */
      size: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
      /** Font weight */
      weight: "font-semibold",
      /** Text color */
      color: "text-white",
      /** Line height */
      lineHeight: "leading-none",
      /** Letter spacing */
      letterSpacing: "tracking-tight",
      /** Max width */
      maxWidth: "max-w-[700px]"
    },
    /** Description text styles */
    description: {
      /** Font size classes */
      size: "text-sm md:text-base lg:text-lg",
      /** Font weight */
      weight: "font-normal",
      /** Text color */
      color: "text-gray-200",
      /** Line height */
      lineHeight: "leading-relaxed",
      /** Max width */
      maxWidth: "max-w-xl"
    }
  },
  
  
  /** Layout and spacing configuration */
  layout: {
    /** Container classes */
    container: "h-[70vh] flex items-center relative",
    /** Content wrapper classes */
    contentWrapper: "w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16",
    /** Content area classes */
    contentArea: "space-y-6",
    /** Button container classes */
    buttonContainer: "flex flex-col sm:flex-row gap-2"
  },
  
  /** Responsive breakpoints */
  breakpoints: {
    /** Mobile breakpoint */
    mobile: "sm",
    /** Tablet breakpoint */
    tablet: "md",
    /** Desktop breakpoint */
    desktop: "lg",
    /** Large desktop breakpoint */
    largeDesktop: "xl"
  },
  
  /** Animation configuration */
  animation: {
    /** Fade in duration */
    fadeInDuration: "duration-700",
    /** Slide up duration */
    slideUpDuration: "duration-500",
    /** Stagger delay */
    staggerDelay: "delay-100"
  }
} as const;

/**
 * Error messages for Hero component
 */
export const HERO_ERROR_MESSAGES = {
  /** Image loading error */
  IMAGE_LOAD_ERROR: 'Failed to load hero background image',
  /** Content error */
  CONTENT_ERROR: 'Hero content is missing or invalid',
  /** Button click error */
  BUTTON_CLICK_ERROR: 'Failed to handle button click'
} as const;
