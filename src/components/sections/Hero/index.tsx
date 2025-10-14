'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { HERO_CONFIG } from './config';
import { COLORS } from '@/config/colors';
import { HeroProps, HeroContentConfig, BackgroundConfig } from './types';
import HeroContent from './components/HeroContent';

/**
 * Hero component that renders the main hero section of the website.
 * 
 * Features:
 * - Responsive design with single column layout
 * - Background image with dotted pattern overlay
 * - Animated content appearance
 * - Call-to-action buttons
 * - Performance optimized
 * - Accessibility compliant
 * 
 * @param props - Hero component props
 * @returns JSX element representing the hero section
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Hero />
 * 
 * // With custom content
 * <Hero 
 *   title="Custom Title"
 *   description="Custom description"
 *   className="custom-hero"
 * />
 * ```
 */
export default function Hero({
  className = '',
  title,
  description,
  primaryCTA,
  secondaryCTA,
  background,
  animation = { enabled: true },
  testId = 'hero-section'
}: HeroProps) {
  // Memoize content configuration for performance
  const contentConfig: HeroContentConfig = useMemo(() => ({
    title: title || HERO_CONFIG.content.title,
    description: description || HERO_CONFIG.content.description,
    primaryCTA: {
      text: primaryCTA?.text || HERO_CONFIG.content.primaryCTA.text,
      href: primaryCTA?.href || HERO_CONFIG.content.primaryCTA.href,
      icon: primaryCTA?.icon || HERO_CONFIG.content.primaryCTA.icon,
      testId: primaryCTA?.testId || 'hero-primary-cta'
    },
    secondaryCTA: {
      text: secondaryCTA?.text || HERO_CONFIG.content.secondaryCTA.text,
      href: secondaryCTA?.href || HERO_CONFIG.content.secondaryCTA.href,
      testId: secondaryCTA?.testId || 'hero-secondary-cta'
    }
  }), [title, description, primaryCTA, secondaryCTA]);

  // Memoize background configuration for performance
  const backgroundConfig: BackgroundConfig = useMemo(() => ({
    image: background?.image || HERO_CONFIG.background.image,
    alt: background?.alt || HERO_CONFIG.background.alt,
    overlayOpacity: background?.overlayOpacity || HERO_CONFIG.background.overlayOpacity,
    backgroundColor: background?.backgroundColor
  }), [background]);

  return (
    <section 
      className={`${HERO_CONFIG.layout.container} ${COLORS.bgWhite} ${className}`}
      data-testid={testId}
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <Image
            src={backgroundConfig.image || HERO_CONFIG.background.image}
            alt={backgroundConfig.alt || HERO_CONFIG.background.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </video>
        {/* Black overlay for better text readability */}
        <div 
          className={`absolute inset-0 ${COLORS.bgBlack}`} 
          style={{ opacity: backgroundConfig.overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className={`${HERO_CONFIG.layout.contentWrapper} relative z-10`}>
        <div className="max-w-1xl mx-auto text-left">
          <HeroContent 
            content={contentConfig}
            animation={animation}
          />
        </div>
      </div>
    </section>
  );
}
