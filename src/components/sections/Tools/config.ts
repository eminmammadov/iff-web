/**
 * Tools component configuration constants and settings
 * 
 * This configuration object contains all the constants, content, animations,
 * and styling settings used throughout the Tools component.
 * 
 * @example
 * ```typescript
 * import { TOOLS_CONFIG } from './config';
 * 
 * // Use text content
 * const title = TOOLS_CONFIG.content.title;
 * 
 * // Get styling settings
 * const styling = TOOLS_CONFIG.styling;
 * ```
 */
import { COLORS } from '@/config/colors';

export const TOOLS_CONFIG = {
  /** Text content configuration */
  content: {
    /** CTA button text */
    cta: {
      /** Button text */
      text: 'Explorer products',
      /** Button href */
      href: 'https://app.if.fund/portfolio',
      /** Button variant */
      variant: 'secondary' as const,
      /** Button size */
      size: 'md' as const
    },
    /** Hero content */
    hero: {
      /** Slides array */
      slides: [
        {
          /** Slide number */
          number: '01',
          /** Slide description */
          description: 'Discover upcoming projects and early opportunities before they gain traction, and be among the first to invest in the next big innovations.',
          /** Slide image */
          image: '/images/graphics/prelist.svg',
          /** Image alt text */
          alt: 'Discover upcoming projects and early opportunities',
          /** Card title for this slide */
          cardTitle: 'Discover upcoming projects and early opportunities.',
          /** Card description for this slide */
          cardDescription: 'Stay ahead of the market by discovering high-potential projects before they go mainstream. Helps you identify early opportunities, analyze project credibility, and make informed investment decisions — giving you a strategic edge in the fast-moving world of crypto innovation.'
        },
        {
          /** Slide number */
          number: '02',
          /** Slide description */
          description: 'Track your investments and portfolio performance in real time, and gain deeper insights to optimize your strategy and maximize returns.',
          /** Slide image */
          image: '/images/graphics/portfolio.svg',
          /** Image alt text */
          alt: 'Track your investments and portfolio performance',
          /** Card title for this slide */
          cardTitle: 'Track your investments and portfolio performance',
          /** Card description for this slide */
          cardDescription: 'Keep full visibility over your assets with real-time tracking and detailed analytics. Empowers you to understand your portfolio\'s performance, spot growth opportunities, and refine your investment strategy to achieve better, data-driven results.'
        },
        {
          /** Slide number */
          number: '03',
          /** Slide description */
          description: 'Access real-time market data and advanced analysis tools to stay informed, identify trends, and make smarter investment decisions.',
          /** Slide image */
          image: '/images/graphics/market.svg',
          /** Image alt text */
          alt: 'Real-time market data and analysis tools',
          /** Card title for this slide */
          cardTitle: 'Real-time market data and analysis tools',
          /** Card description for this slide */
          cardDescription: 'Stay informed with live market insights and professional-grade analysis tools. Provides the data you need to track market trends, evaluate assets, and make confident, well-timed investment decisions in a rapidly changing market.'
        }
      ]
    }
  },

  /** Typography configuration */
  typography: {
    /** Main title font size */
    titleSize: 'text-4xl md:text-5xl lg:text-5xl xl:text-5xl',
    /** Main title font weight */
    titleWeight: 'font-medium',
    /** Main title line height */
    titleLineHeight: 'leading-none',
    /** Main title letter spacing */
    titleLetterSpacing: 'tracking-tight',
    /** Description font size */
    descriptionSize: 'text-base md:text-lg lg:text-xl',
    /** Short description font size */
    shortDescriptionSize: 'text-sm lg:text-base',
    /** Description font weight */
    descriptionWeight: 'font-normal',
    /** Description line height */
    descriptionLineHeight: 'leading-relaxed',
    /** Short description line height */
    shortDescriptionLineHeight: 'leading-tight',
    /** Card title font size */
    cardTitleSize: 'text-2xl lg:text-3xl',
    /** Card title font weight */
    cardTitleWeight: 'font-medium',
    /** Card title line height */
    cardTitleLineHeight: 'leading-none',
    /** Card description font size */
    cardDescriptionSize: 'text-sm md:text-base lg:text-lg',
    /** Card description font weight */
    cardDescriptionWeight: 'font-normal',
    /** Card description line height */
    cardDescriptionLineHeight: 'leading-tight'
  },

  /** Layout configuration */
  layout: {
    /** Container max width */
    containerMaxWidth: 'max-w-full',
    /** Container padding */
    containerPadding: 'px-4 sm:px-6 lg:px-8 xl:px-12',
    /** Vertical spacing */
    verticalSpacing: 'py-16 md:py-20 lg:py-24',
    /** Grid gap */
    gridGap: 'gap-4 lg:gap-6',
    /** Gap between top and bottom grid sections */
    gridSectionGap: 'gap-8 lg:gap-12',
    /** Card padding */
    cardPadding: 'p-4 lg:p-6',
    /** Card border radius */
    cardBorderRadius: 'rounded-xl',
    /** Hero area padding */
    heroPadding: 'p-4 lg:p-6',
    /** Hero area border radius */
    heroBorderRadius: 'rounded-xl',
    /** Title container max width */
    titleMaxWidth: 'max-w-lg',
    /** Card title container max width */
    cardTitleMaxWidth: 'max-w-sm',
    /** Card description container max width */
    cardDescriptionMaxWidth: 'max-w-150',
    /** Short description margin bottom */
    shortDescriptionMarginBottom: 'mb-6',
    /** Card height */
    cardHeight: 'min-h-[200px] lg:min-h-[500px]',
    /** Card layout */
    cardLayout: 'flex flex-col justify-between',
    /** Card background color */
    cardBackgroundColor: 'bg-gray-50'
  },

  /** Styling configuration */
  styling: {
    /** Background color */
    backgroundColor: COLORS.bgWhite,
    /** Card background color */
    cardBackgroundColor: COLORS.bgGray100,
    /** Hero background color */
    heroBackgroundColor: COLORS.bgGray200,
    /** Text colors */
    textPrimary: COLORS.textPrimary,
    /** Text secondary */
    textSecondary: COLORS.textSecondary,
    /** Card shadow */
    cardShadow: 'shadow-none',
    /** Hero shadow */
    heroShadow: 'shadow-none',
    /** Transition duration */
    transitionDuration: 'duration-300',
    /** Button hover scale */
    buttonHoverScale: 'hover:scale-105'
  },

  /** Animation configuration */
  animation: {
    /** Fade in duration */
    fadeInDuration: 'duration-700',
    /** Fade in delay */
    fadeInDelay: 'delay-100',
    /** Slide transition duration */
    slideDuration: 'duration-500',
    /** Slide up duration */
    slideUpDuration: 'duration-500',
    /** Slide up delay */
    slideUpDelay: 'delay-100',
    /** Button animation delay */
    buttonDelay: 'delay-200',
    /** Stagger delay */
    staggerDelay: 'delay-100',
    /** Slider transition duration */
    sliderTransitionDuration: 'duration-700',
    /** Slider transition easing */
    sliderTransitionEasing: 'ease-in-out',
    /** Initial state classes */
    initialOpacity: 'opacity-0',
    initialTransform: 'translate-y-4',
    /** Final state classes */
    finalOpacity: 'opacity-100',
    finalTransform: 'translate-y-0'
  },

    /** Carousel configuration */
  carousel: {
    /** Auto-play interval in milliseconds */
    autoPlayInterval: 5000,
    /** Number of slides */
    totalSlides: 3,
    /** Initial slide index */
    initialSlide: 0,
    /** Dot size */
    dotSize: 'w-2 h-2',
    /** Active dot size */
    activeDotSize: 'w-6 h-2',
    /** Dot spacing */
    dotSpacing: 'space-x-2',
    /** Dot colors */
    dotColor: 'bg-gray-400',
    /** Active dot color */
    activeDotColor: 'bg-green-500',
    /** Dot hover color */
    dotHoverColor: 'hover:bg-green-400'
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
    ariaLabel: 'Tools section',
    /** ARIA role */
    role: 'region',
    /** Button ARIA label */
    buttonAriaLabel: 'Explore our products and services',
    /** Carousel ARIA label */
    carouselAriaLabel: 'Product showcase carousel'
  }
} as const;

/**
 * Error messages for Tools component
 */
export const TOOLS_ERROR_MESSAGES = {
  /** Content loading error */
  CONTENT_LOADING_ERROR: 'Failed to load tools content',
  /** Button click error */
  BUTTON_CLICK_ERROR: 'Failed to handle button click',
  /** Invalid props error */
  INVALID_PROPS_ERROR: 'Invalid props provided to Tools component',
  /** Carousel error */
  CAROUSEL_ERROR: 'Failed to initialize carousel'
} as const;

export default TOOLS_CONFIG;
