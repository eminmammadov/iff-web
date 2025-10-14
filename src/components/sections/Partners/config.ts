/**
 * Partners component configuration constants and settings
 * 
 * This configuration object contains all the constants, logos, animations,
 * and styling settings used throughout the Partners component.
 * 
 * @example
 * ```typescript
 * import { PARTNERS_CONFIG } from './config';
 * 
 * // Use logo data
 * const logos = PARTNERS_CONFIG.logos;
 * 
 * // Get animation settings
 * const animation = PARTNERS_CONFIG.animation;
 * ```
 */
import { COLORS } from '@/config/colors';

export const PARTNERS_CONFIG = {
  /** Partner logo data */
  logos: [
    { name: 'Arbitrum', src: '/images/partners/arbitrum.svg', alt: 'Arbitrum Logo' },
    { name: 'Arkham', src: '/images/partners/arkham.svg', alt: 'Arkham Logo' },
    { name: 'BlackRock', src: '/images/partners/blackrock.svg', alt: 'BlackRock Logo' },
    { name: 'Ethereum', src: '/images/partners/ethereum.svg', alt: 'Ethereum Logo' },
    { name: 'Grayscale', src: '/images/partners/grayscale.svg', alt: 'Grayscale Logo' },
    { name: 'Jupiter', src: '/images/partners/jupiter.svg', alt: 'Jupiter Logo' },
    { name: 'Ondo', src: '/images/partners/ondo.svg', alt: 'Ondo Logo' },
    { name: 'Ripple', src: '/images/partners/ripple.svg', alt: 'Ripple Logo' },
    { name: 'Solana', src: '/images/partners/solana.svg', alt: 'Solana Logo' },
    { name: 'XStocks', src: '/images/partners/xstocks.svg', alt: 'XStocks Logo' }
  ],

  /** Animation configuration */
  animation: {
    /** Default animation speed in milliseconds */
    speed: 12000,
    /** Whether to pause animation on hover */
    pauseOnHover: true,
    /** Animation timing function */
    timingFunction: 'linear',
    /** Animation iteration count */
    iterationCount: 'infinite'
  },

  /** Dimensions and spacing */
  dimensions: {
    /** Logo container width */
    logoWidth: 'w-24',
    /** Logo container height */
    logoHeight: 'h-16',
    /** Spacing between logos */
    spacing: 'space-x-12',
    /** Gradient overlay width */
    gradientWidth: 'w-20'
  },

  /** Styling configuration */
  styling: {
    /** Logo opacity */
    logoOpacity: 'opacity-60',
    /** Logo hover opacity */
    logoHoverOpacity: 'hover:opacity-100',
    /** Logo filter */
    logoFilter: 'filter grayscale',
    /** Logo hover filter */
    logoHoverFilter: 'hover:grayscale-0',
    /** Transition duration */
    transitionDuration: 'duration-300',
    /** Background color */
    backgroundColor: COLORS.bgWhite,
    /** Padding */
    padding: 'py-1'
  },

  /** CSS animations */
  animations: {
    /** Scroll keyframes */
    scrollKeyframes: `
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-25%);
        }
      }
    `,
    /** Scroll animation class */
    scrollClass: `
      .animate-scroll {
        animation: scroll linear infinite;
      }
    `,
    /** Pause animation class */
    pauseClass: `
      .animate-pause {
        animation-play-state: paused;
      }
    `
  },

  /** Responsive breakpoints */
  breakpoints: {
    /** Mobile breakpoint */
    mobile: 'sm',
    /** Tablet breakpoint */
    tablet: 'md',
    /** Desktop breakpoint */
    desktop: 'lg'
  },

  /** Accessibility settings */
  accessibility: {
    /** ARIA label for the slider */
    ariaLabel: 'Partner logos',
    /** ARIA role */
    role: 'region',
    /** Tab index */
    tabIndex: 0
  }
} as const;

/**
 * Error messages for Partners component
 */
export const PARTNERS_ERROR_MESSAGES = {
  /** Logo loading error */
  LOGO_LOADING_ERROR: 'Failed to load partner logo',
  /** Animation error */
  ANIMATION_ERROR: 'Failed to initialize animation',
  /** Invalid props error */
  INVALID_PROPS_ERROR: 'Invalid props provided to Partners component'
} as const;

export default PARTNERS_CONFIG;
