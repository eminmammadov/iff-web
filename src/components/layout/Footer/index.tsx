'use client';

import React, { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FooterProps, FooterLink, SocialLink } from './types';
import { FOOTER_CONFIG } from './config';
import { 
  getSafeNavigationSection,
  getSafeSocialLink,
  getSafeLegalContent
} from './utils';
import { 
  useFooterState, 
  usePerformanceMonitor, 
  useAnimationConfig,
  useKeyboardNavigation
} from './hooks';
import { COLORS } from '@/config/colors';

/**
 * Loading fallback component for Footer
 */
function FooterLoadingFallback() {
  return (
    <footer className={`
      w-full
      ${FOOTER_CONFIG.styling.relativePosition}
      ${FOOTER_CONFIG.styling.backgroundImage}
      ${FOOTER_CONFIG.styling.backgroundSize}
      ${FOOTER_CONFIG.styling.backgroundOverlay}
      ${FOOTER_CONFIG.layout.verticalSpacing}
    `}>
      <div className={`
        ${FOOTER_CONFIG.layout.containerMaxWidth}
        ${FOOTER_CONFIG.layout.containerPadding}
        relative z-10
      `}>
        <div className="flex flex-wrap gap-8 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-start">
              <div className={`animate-pulse ${COLORS.bgGray200} h-4 w-16 rounded mb-4`}></div>
              <div className="space-y-2">
                <div className={`animate-pulse ${COLORS.bgGray200} h-3 w-20 rounded`}></div>
                <div className={`animate-pulse ${COLORS.bgGray200} h-3 w-24 rounded`}></div>
                <div className={`animate-pulse ${COLORS.bgGray200} h-3 w-18 rounded`}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className={`animate-pulse ${COLORS.bgGray200} h-12 w-48 rounded`}></div>
            <div className="flex items-center gap-4">
              <div className={`animate-pulse ${COLORS.bgGray200} h-4 w-32 rounded`}></div>
              <div className={`animate-pulse ${COLORS.bgGray200} h-8 w-8 rounded`}></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Props for the FooterContent component
 */
interface FooterContentProps {
  /** Additional CSS classes to apply to the footer */
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
 * FooterContent component that renders the main footer content.
 * 
 * Features:
 * - Responsive navigation menu with multiple sections
 * - Legal disclaimers and compliance information
 * - Social media links
 * - Company branding and logo
 * - Accessibility compliant
 * - Performance optimized
 * - Error handling and validation
 * - Config-driven architecture
 * - Smooth animations
 * 
 * @param props - FooterContent component props
 * @returns JSX element representing the footer content
 */
function FooterContent({
  className = '',
  testId = 'footer-section',
  socialLinks,
  onLinkClick,
  onSocialClick,
  showAnimations = true
}: FooterContentProps) {
  // Performance monitoring
  const { logPerformance } = usePerformanceMonitor('Footer');

  // State management
  const { 
    state, 
    handleLinkClick, 
    handleSocialClick
  } = useFooterState(showAnimations);

  // Animation configuration
  const animationConfig = useAnimationConfig(state.animationsEnabled);

  // Keyboard navigation
  const { handleKeyDown } = useKeyboardNavigation();

  // Memoized content
  const safeContent = useMemo(() => {
    logPerformance('Processing footer content');
    return {
      navigationMenu: FOOTER_CONFIG.content.navigationMenu.map(section => 
        getSafeNavigationSection(section)
      ),
      socialLinks: (socialLinks || FOOTER_CONFIG.content.socialLinks).map(social => 
        getSafeSocialLink(social)
      ),
      legalContent: getSafeLegalContent(FOOTER_CONFIG.content.legalContent)
    };
  }, [socialLinks, logPerformance]);

  // Handle link clicks with custom callback support
  const handleLinkClickWithCallback = (link: FooterLink) => {
    if (onLinkClick) {
      onLinkClick(link);
    } else {
      handleLinkClick(link);
    }
  };

  // Handle social clicks with custom callback support
  const handleSocialClickWithCallback = (social: SocialLink) => {
    if (onSocialClick) {
      onSocialClick(social);
    } else {
      handleSocialClick(social);
    }
  };


  return (
    <footer
      className={`
        w-full
        ${FOOTER_CONFIG.styling.relativePosition}
        ${FOOTER_CONFIG.styling.backgroundImage}
        ${FOOTER_CONFIG.styling.backgroundSize}
        ${FOOTER_CONFIG.styling.backgroundOverlay}
        ${FOOTER_CONFIG.layout.verticalSpacing}
        ${className}
      `}
      data-testid={testId}
      aria-label={FOOTER_CONFIG.accessibility.ariaLabel}
      role={FOOTER_CONFIG.accessibility.role}
    >
      <div className={`
        ${FOOTER_CONFIG.layout.containerMaxWidth}
        ${FOOTER_CONFIG.layout.containerPadding}
        relative z-10
      `}>
        {/* Top Section - Navigation Menu */}
        <div className={`
          flex flex-wrap
          ${FOOTER_CONFIG.layout.navigationGap}
          mb-12
          ${state.isVisible ? animationConfig.fadeInClasses : ''}
        `}>
          {safeContent.navigationMenu.map((section, sectionIndex) => (
            <div key={`nav-section-${sectionIndex}`} className="flex flex-col items-start">
              <h3 className={`
                ${FOOTER_CONFIG.typography.navTitleSize}
                ${FOOTER_CONFIG.typography.navTitleWeight}
                ${FOOTER_CONFIG.styling.textPrimary}
                mb-4
                tracking-tight
              `}>
                {section.title}
              </h3>
              <ul className="list-none p-0 m-0">
                {section.items.map((item, itemIndex) => (
                  <li key={`nav-item-${sectionIndex}-${itemIndex}`} className="mb-1">
                    <Link
                      href={item.href}
                      onClick={() => handleLinkClickWithCallback(item)}
                      className={`
                        ${FOOTER_CONFIG.typography.navLinkSize}
                        ${FOOTER_CONFIG.typography.navLinkWeight}
                        ${FOOTER_CONFIG.styling.textSecondary}
                        ${FOOTER_CONFIG.styling.hoverColor}
                        ${FOOTER_CONFIG.styling.transitionDuration}
                        no-underline
                        flex items-center gap-2
                      `}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      data-testid={`${testId}-nav-link-${sectionIndex}-${itemIndex}`}
                    >
                      {item.label}
                      {item.external && (
                        <MdOutlineArrowOutward className="text-xs opacity-70" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Section - Legal Disclaimers */}
        <div className={`
          grid grid-cols-1 lg:grid-cols-3
          ${FOOTER_CONFIG.layout.legalGap}
          mb-12
          pt-8
          border-t border-white/10
          ${state.isVisible ? animationConfig.fadeInClasses : ''}
        `}>
          {/* Disclaimer Text */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {safeContent.legalContent.disclaimers.map((disclaimer, index) => (
              <p 
                key={`disclaimer-${index}`}
                className={`
                  ${FOOTER_CONFIG.typography.disclaimerSize}
                  ${FOOTER_CONFIG.typography.disclaimerLineHeight}
                  ${FOOTER_CONFIG.styling.textSecondary}
                  m-0
                `}
              >
                {disclaimer}
              </p>
            ))}
          </div>

          {/* Numbered Notes */}
          <div className="flex flex-col gap-4">
            {safeContent.legalContent.notes.map((note, index) => (
              <div key={`note-${index}`} className="flex gap-2">
                <span className={`
                  ${FOOTER_CONFIG.typography.noteSize}
                  ${FOOTER_CONFIG.styling.textPrimary}
                  font-normal
                  min-w-[1.5rem]
                `}>
                  {note.number}
                </span>
                <span className={`
                  ${FOOTER_CONFIG.typography.noteSize}
                  ${FOOTER_CONFIG.typography.noteLineHeight}
                  ${FOOTER_CONFIG.styling.textSecondary}
                  flex-1
                `}>
                  {note.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Company Branding */}
        <div className={`
          pt-8
          border-t border-white/10
          ${state.isVisible ? animationConfig.fadeInClasses : ''}
        `}>
          <div className="flex flex-row justify-between items-center gap-2">
            {/* Copyright Text */}
            <div className={`
              text-xs sm:text-sm
              ${FOOTER_CONFIG.typography.copyrightWeight}
              ${FOOTER_CONFIG.styling.textPrimary}
              flex items-center gap-1
            `}>
              <span>{FOOTER_CONFIG.content.copyright.companyName} © {FOOTER_CONFIG.content.copyright.year}</span>
              <span className={FOOTER_CONFIG.styling.textSecondary}>-</span>
              <Link 
                href={FOOTER_CONFIG.content.copyright.termsHref}
                className={`
                  ${FOOTER_CONFIG.styling.textPrimary}
                  ${FOOTER_CONFIG.styling.hoverColor}
                  ${FOOTER_CONFIG.styling.transitionDuration}
                  no-underline
                `}
              >
                Terms of Service
              </Link>
              <span className={FOOTER_CONFIG.styling.textSecondary}>-</span>
              <Link 
                href={FOOTER_CONFIG.content.copyright.privacyHref}
                className={`
                  ${FOOTER_CONFIG.styling.textPrimary}
                  ${FOOTER_CONFIG.styling.hoverColor}
                  ${FOOTER_CONFIG.styling.transitionDuration}
                  no-underline
                `}
              >
                Privacy Policy
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {safeContent.socialLinks.map((social, index) => (
                <a
                  key={`social-${index}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center justify-center
                    w-6 h-6
                    ${FOOTER_CONFIG.styling.textPrimary}
                    cursor-pointer
                    transition-all duration-300
                    ${FOOTER_CONFIG.styling.socialHoverColor}
                    hover:-translate-y-0.5
                    active:translate-y-0
                    rounded
                    p-1
                  `}
                  onClick={() => handleSocialClickWithCallback(social)}
                  aria-label={social.ariaLabel}
                  title={social.ariaLabel}
                  data-testid={`${testId}-social-${index}`}
                >
                  {social.icon === 'twitter' && (
                    <RiTwitterXFill size={16} />
                  )}
                  {social.icon === 'linkedin' && (
                    <FaLinkedin size={16} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Main Footer component with error boundary and context provider.
 * 
 * Features:
 * - Error boundary protection
 * - Suspense loading fallback
 * - Performance optimized
 * - Clean component composition
 * 
 * @param props - Footer component props
 * @returns JSX element representing the complete footer
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Footer />
 * 
 * // With custom styling
 * <Footer className="custom-footer" />
 * 
 * // With custom social links
 * <Footer 
 *   socialLinks={[
 *     { name: 'Twitter', href: 'https://twitter.com/example', icon: 'twitter', ariaLabel: 'Follow us on Twitter' }
 *   ]}
 * />
 * 
 * // With custom callbacks
 * <Footer 
 *   onLinkClick={(link) => console.log('Link clicked:', link)}
 *   onSocialClick={(social) => console.log('Social clicked:', social)}
 *   onLogoClick={() => console.log('Logo clicked')}
 * />
 * ```
 */
export default function Footer(props: FooterProps) {
  return (
    <Suspense fallback={<FooterLoadingFallback />}>
      <FooterContent {...props} />
    </Suspense>
  );
}