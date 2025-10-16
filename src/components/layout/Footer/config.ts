/**
 * Footer component configuration constants and settings
 * 
 * This configuration object contains all the constants, text content,
 * animations, and styling settings used throughout the Footer component.
 * 
 * @example
 * ```typescript
 * import { FOOTER_CONFIG } from './config';
 * 
 * // Use text content
 * const navigationMenu = FOOTER_CONFIG.content.navigationMenu;
 * 
 * // Get styling settings
 * const styling = FOOTER_CONFIG.styling;
 * ```
 */
import { COLORS } from '@/config/colors';
import { 
  NavigationSection, 
  LegalContent, 
  SocialLink,
  AnimationConfig,
  LayoutConfig,
  TypographyConfig,
  StylingConfig,
  AccessibilityConfig
} from './types';

export const FOOTER_CONFIG = {
  /** Text content configuration */
  content: {
    /** Navigation menu sections */
    navigationMenu: [
      {
        title: 'Fund',
        items: [
          { label: 'About us', href: '/about', external: false },
          { label: 'Members', href: '/members', external: false },
          { label: 'Insights', href: '/insights', external: false }
        ]
      },
      {
        title: 'App',
        items: [
          { label: 'Join', href: 'https://app.if.fund/join', external: true },
          { label: 'Crypto Portfolio', href: 'https://app.if.fund/portfolio', external: true },
          { label: 'Prelist', href: 'https://app.if.fund/prelist', external: true },
          { label: 'Markets', href: 'https://app.if.fund/markets', external: true },

        ]
      },
      {
        title: 'Legal',
        items: [
          { label: 'Terms of Service', href: '/terms', external: false },
          { label: 'Privacy Policy', href: '/privacy', external: false }
        ]
      }
    ] as NavigationSection[],

    /** Social media links */
    socialLinks: [
      {
        name: 'X',
        href: 'https://x.com/iffunds',
        icon: 'twitter' as const,
        ariaLabel: 'Follow us on X'
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/iffunds',
        icon: 'linkedin' as const,
        ariaLabel: 'Follow us on LinkedIn'
      }
    ] as SocialLink[],

    /** Legal disclaimer content */
    legalContent: {
        disclaimers: [
          "* IF Funds provides crypto investment, tokenized equity, and asset management services with in-depth market analysis. Our investment opportunities are not registered securities under applicable securities laws and regulations and may be subject to regulatory restrictions in certain jurisdictions.",
          "The Fund operates as an alternative investment vehicle specializing in cryptocurrency investments, tokenized equity positions, and comprehensive asset management strategies. While we provide detailed market analysis and adhere to regulatory standards, investors should be aware that crypto investments carry substantial risks and are subject to high volatility.",
          "Our investment methodologies and asset management strategies are proprietary approaches that do not guarantee future performance. Past performance, if any, is not indicative of future results. The Fund's disciplined approach to crypto asset allocation and tokenized equity investments may result in partial or total loss of invested capital.",
          "IF Funds, as the Fund manager, provides investment management services including crypto investment strategies and tokenized equity management but makes no representations or warranties regarding investment outcomes. The Fund is not registered as an investment company under applicable investment company regulations.",
          "RISK DISCLOSURE: Cryptocurrency investments, tokenized equity, and asset management involve significant risks, including but not limited to: market volatility, regulatory changes, technological risks, liquidity constraints, and potential total loss of investment. Investments allocated through our platform may fluctuate substantially in value.",
          "Nothing herein constitutes an offer to sell or solicitation to buy any securities or investment products. Participation in the Fund requires acceptance of additional terms and conditions. Prospective investors should conduct independent due diligence and consult with qualified financial advisors before making investment decisions.",
          "For additional terms and conditions, please visit: if.fund/terms-of-service, docs.if.fund, and if.fund."
        ],
        notes: [
          {
            number: "1.",
            text: "Fund performance metrics are calculated based on changes in net asset value over specified periods and may not accurately reflect actual investor returns due to the timing of contributions and withdrawals."
          },
          {
            number: "2.",
            text: "Investment allocations, crypto investments, and tokenized equity positions are subject to market conditions as of the stated date. Investment strategies and asset management approaches may be modified at the Fund's discretion."
          },
          {
            number: "3.",
            text: "Regulatory compliance standards for crypto investments and tokenized equity are based on current interpretations and may change over time. Additional restrictions and requirements may apply to asset management services."
          }
        ]
    } as LegalContent,

    /** Copyright information */
    copyright: {
      companyName: "IF Funds",
      year: new Date().getFullYear(),
      termsHref: "/terms-of-service",
      privacyHref: "/privacy-policy"
    }
  },

  /** Typography configuration */
  typography: {
    /** Navigation title font size */
    navTitleSize: 'text-base',
    /** Navigation title font weight */
    navTitleWeight: 'font-medium',
    /** Navigation link font size */
    navLinkSize: 'text-sm',
    /** Navigation link font weight */
    navLinkWeight: 'font-normal',
    /** Disclaimer text font size */
    disclaimerSize: 'text-xs',
    /** Disclaimer line height */
    disclaimerLineHeight: 'leading-relaxed',
    /** Note text font size */
    noteSize: 'text-xs',
    /** Note line height */
    noteLineHeight: 'leading-snug',
    /** Copyright text font size */
    copyrightSize: 'text-xs',
    /** Copyright text font weight */
    copyrightWeight: 'font-normal'
  } as TypographyConfig,

  /** Layout configuration */
  layout: {
    /** Container max width - Full width */
    containerMaxWidth: 'w-full',
    /** Container padding */
    containerPadding: 'px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16',
    /** Vertical spacing */
    verticalSpacing: 'py-16 md:py-20',
    /** Navigation section gap */
    navigationGap: 'gap-8 md:gap-16',
    /** Legal section gap */
    legalGap: 'gap-8 md:gap-12',
    /** Brand section gap */
    brandGap: 'gap-4'
  } as LayoutConfig,

  /** Styling configuration */
  styling: {
    /** Background image */
    backgroundImage: 'bg-[url("/images/footer-bg.jpg")]',
    /** Background overlay */
    backgroundOverlay: 'before:absolute before:inset-0 before:bg-black/90 before:z-0',
    /** Background size and position */
    backgroundSize: 'bg-cover bg-center bg-no-repeat',
    /** Background color fallback */
    backgroundColor: COLORS.bgBlack,
    /** Text primary color */
    textPrimary: COLORS.textWhite,
    /** Text secondary color */
    textSecondary: COLORS.textLight,
    /** Border color */
    borderColor: 'border-white/10',
    /** Hover color */
    hoverColor: 'hover:text-gray-200',
    /** Social hover color */
    socialHoverColor: 'hover:text-[#5CE05C]',
    /** Transition duration */
    transitionDuration: 'transition-colors duration-300',
    /** Relative positioning for overlay */
    relativePosition: 'relative'
  } as StylingConfig,

  /** Animation configuration */
  animation: {
    /** Fade in duration */
    fadeInDuration: 'duration-600',
    /** Fade in delay */
    fadeInDelay: 'delay-50',
    /** Slide up duration */
    slideUpDuration: 'duration-600',
    /** Slide up delay */
    slideUpDelay: 'delay-50',
    /** Initial opacity */
    initialOpacity: 'opacity-0',
    /** Initial transform */
    initialTransform: 'translate-y-4',
    /** Final opacity */
    finalOpacity: 'opacity-100',
    /** Final transform */
    finalTransform: 'translate-y-0'
  } as AnimationConfig,

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
    /** ARIA label for the footer */
    ariaLabel: 'Footer section',
    /** ARIA role */
    role: 'contentinfo',
    /** Logo ARIA label */
    logoAriaLabel: 'Invest Founders - Go to homepage',
    /** Social link ARIA label prefix */
    socialAriaLabelPrefix: 'Follow us on'
  } as AccessibilityConfig
} as const;

/**
 * Error messages for Footer component
 */
export const FOOTER_ERROR_MESSAGES = {
  /** Content loading error */
  CONTENT_LOADING_ERROR: 'Failed to load footer content',
  /** Link click error */
  LINK_CLICK_ERROR: 'Failed to handle link click',
  /** Social click error */
  SOCIAL_CLICK_ERROR: 'Failed to handle social media click',
  /** Logo click error */
  LOGO_CLICK_ERROR: 'Failed to handle logo click',
  /** Invalid props error */
  INVALID_PROPS_ERROR: 'Invalid props provided to Footer component'
} as const;

export default FOOTER_CONFIG;
