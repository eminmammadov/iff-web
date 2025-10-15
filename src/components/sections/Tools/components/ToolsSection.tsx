'use client';

import { useMemo, useState, useEffect } from 'react';
import { ToolsProps } from '../types';
import { TOOLS_CONFIG } from '../config';
import { 
  getSafeCTAConfig, 
  getSafeHeroContent 
} from '../utils';
import { useToolsState, useCarouselAutoPlay, usePerformanceMonitor } from '../hooks';
import ToolsHero from './ToolsHero';
import ToolsCard from './ToolsCard';
import Button from '@/components/ui/Button';

/**
 * ToolsSection component that renders the main tools section with 2x2 grid layout.
 * 
 * Features:
 * - 2x2 Grid layout (Title, Description+CTA, Slider, Hero Card)
 * - Responsive design (mobile-first)
 * - Carousel functionality with auto-play
 * - Smooth animations
 * - Accessibility compliant
 * - Performance optimized
 * - Error handling and validation
 * - Config-driven architecture
 * 
 * @param props - ToolsSection component props
 * @returns JSX element representing the tools section
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ToolsSection />
 * 
 * // With custom content
 * <ToolsSection 
 *   title={{
 *     line1: 'Custom Title',
 *     line2: 'Custom Subtitle'
 *   }}
 *   description="Custom description"
 *   onCTAClick={() => console.log('CTA clicked')}
 * />
 * ```
 */
export default function ToolsSection({
  className = '',
  testId = 'tools-section',
  cta,
  hero,
  showAnimations = true,
  onCTAClick
}: ToolsProps) {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Performance monitoring
  const { logPerformance } = usePerformanceMonitor('ToolsSection');

  // State management
  const { 
    state, 
    handleSlideChange, 
    handleNextSlide, 
    handleCTAClick 
  } = useToolsState(showAnimations, TOOLS_CONFIG.carousel.totalSlides);

  // Carousel auto-play
  useCarouselAutoPlay(
    state.isAutoPlaying,
    handleNextSlide,
    TOOLS_CONFIG.carousel.autoPlayInterval
  );

  // Memoized content
  const safeContent = useMemo(() => {
    logPerformance('Processing content');
    return {
      cta: getSafeCTAConfig(cta),
      hero: getSafeHeroContent(hero)
    };
  }, [cta, hero, logPerformance]);

  // Animation classes
  const animationClasses = useMemo(() => {
    if (!state.animationsEnabled) return '';
    return `${TOOLS_CONFIG.animation.fadeInDuration} ${TOOLS_CONFIG.animation.fadeInDelay}`;
  }, [state.animationsEnabled]);

  // Slide up animation classes
  const slideUpClasses = useMemo(() => {
    const baseClasses = `transition-all ${TOOLS_CONFIG.animation.slideUpDuration} ${TOOLS_CONFIG.animation.slideUpDelay}`;
    
    if (isVisible) {
      return `${baseClasses} ${TOOLS_CONFIG.animation.finalOpacity} ${TOOLS_CONFIG.animation.finalTransform}`;
    }
    
    return `${baseClasses} ${TOOLS_CONFIG.animation.initialOpacity} ${TOOLS_CONFIG.animation.initialTransform}`;
  }, [isVisible]);

  // Handle CTA click
  const handleClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      handleCTAClick();
    }
  };

  return (
    <section 
      className={`
        w-full 
        ${TOOLS_CONFIG.layout.verticalSpacing} 
        ${TOOLS_CONFIG.styling.backgroundColor} 
        ${className}
      `}
      data-testid={testId}
      aria-label={TOOLS_CONFIG.accessibility.ariaLabel}
      role={TOOLS_CONFIG.accessibility.role}
    >
      <div className={`
        ${TOOLS_CONFIG.layout.containerMaxWidth} 
        ${TOOLS_CONFIG.layout.containerPadding} 
        mx-auto
      `}>
        {/* Main Grid Layout - 2x2 Grid */}
        <div className={`
          flex flex-col
          ${TOOLS_CONFIG.layout.gridSectionGap}
          ${slideUpClasses}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {/* Top Grid - Title and Description+CTA */}
          <div className={`
            grid grid-cols-1 lg:grid-cols-4
            ${TOOLS_CONFIG.layout.gridGap}
          `}>
          {/* Grid 1 - Title (Sol üst) */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <div className={`${TOOLS_CONFIG.layout.titleMaxWidth}`}>
              <h1 
                className={`
                  ${TOOLS_CONFIG.typography.titleSize}
                  ${TOOLS_CONFIG.typography.titleWeight}
                  ${TOOLS_CONFIG.typography.titleLineHeight}
                  ${TOOLS_CONFIG.styling.textPrimary}
                  mb-0
                `}
                data-testid={`${testId}-title-line1`}
              >
                Monitor your portfolio
              </h1>
              <h2 
                className={`
                  ${TOOLS_CONFIG.typography.titleSize}
                  ${TOOLS_CONFIG.typography.titleWeight}
                  ${TOOLS_CONFIG.typography.titleLineHeight}
                  ${TOOLS_CONFIG.styling.textPrimary}
                `}
                data-testid={`${testId}-title-line2`}
              >
                and grow smarter
              </h2>
            </div>
          </div>

          {/* Grid 2 - Description and CTA (Sağ üst) */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <p 
              className={`
                ${TOOLS_CONFIG.typography.shortDescriptionSize}
                ${TOOLS_CONFIG.typography.descriptionWeight}
                ${TOOLS_CONFIG.typography.shortDescriptionLineHeight}
                ${TOOLS_CONFIG.styling.textSecondary}
                ${TOOLS_CONFIG.layout.shortDescriptionMarginBottom}
              `}
              data-testid={`${testId}-description`}
            >
              Stay in control of your investments with real-time insights and performance tracking. Helps you make informed decisions, optimise your strategy, and grow your portfolio with confidence.
            </p>
            
            {/* CTA Button */}
            <div className="flex justify-start">
              <Button
                href={safeContent.cta.href}
                variant={safeContent.cta.variant}
                size={safeContent.cta.size}
                onClick={handleClick}
                className={`
                  ${TOOLS_CONFIG.styling.transitionDuration}
                  ${TOOLS_CONFIG.styling.buttonHoverScale}
                `}
                testId={`${testId}-cta-button`}
              >
                {safeContent.cta.text}
              </Button>
            </div>
          </div>
          </div>

          {/* Bottom Grid - Slider and Hero Card */}
          <div className={`
            grid grid-cols-1 lg:grid-cols-4
            ${TOOLS_CONFIG.layout.gridGap}
          `}>
          {/* Grid 3 - Slider (Sol alt) */}
          <div className="lg:col-span-2">
            <ToolsHero
              content={safeContent.hero}
              activeSlide={state.currentSlide}
              totalSlides={TOOLS_CONFIG.carousel.totalSlides}
              onDotClick={handleSlideChange}
              className={animationClasses}
              testId={`${testId}-hero`}
            />
          </div>

          {/* Grid 4 - Hero Card (Sağ alt) */}
          <div className="lg:col-span-2">
            <ToolsCard
              content={{
                title: {
                  line1: safeContent.hero.slides[state.currentSlide].cardTitle,
                  line2: ''
                },
                description: safeContent.hero.slides[state.currentSlide].cardDescription,
                cta: safeContent.cta
              }}
              className={animationClasses}
              testId={`${testId}-card`}
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}