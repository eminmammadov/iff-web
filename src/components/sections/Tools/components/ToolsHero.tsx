'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroContent } from '../types';
import { TOOLS_CONFIG } from '../config';
import CarouselDots from './CarouselDots';

/**
 * Props for the ToolsHero component
 */
interface ToolsHeroProps {
  /** Hero content configuration */
  content: HeroContent;
  /** Currently active slide index */
  activeSlide: number;
  /** Total number of slides */
  totalSlides: number;
  /** Click handler for dot navigation */
  onDotClick: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * ToolsHero component that renders the left side hero area with carousel functionality.
 * 
 * Features:
 * - Dynamic slider with multiple slides
 * - Slide number in top-left corner
 * - Background image in center
 * - Description in bottom-left corner
 * - Pagination dots in bottom-right corner
 * - Responsive design
 * - Accessibility compliant
 * - Performance optimized
 * 
 * @param props - ToolsHero component props
 * @returns JSX element representing the hero area
 * 
 * @example
 * ```tsx
 * <ToolsHero
 *   content={heroContent}
 *   activeSlide={0}
 *   totalSlides={3}
 *   onDotClick={(index) => setActiveSlide(index)}
 * />
 * ```
 */
export default function ToolsHero({
  content,
  activeSlide,
  totalSlides,
  onDotClick,
  className = '',
  testId = 'tools-hero'
}: ToolsHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > TOOLS_CONFIG.carousel.touchSensitivity;
    const isRightSwipe = distance < -TOOLS_CONFIG.carousel.touchSensitivity;

    if (isLeftSwipe && activeSlide < totalSlides - 1) {
      onDotClick(activeSlide + 1);
    }
    if (isRightSwipe && activeSlide > 0) {
      onDotClick(activeSlide - 1);
    }
  };

  // Get current slide data
  const currentSlide = useMemo(() => {
    return content.slides[activeSlide] || TOOLS_CONFIG.content.hero.slides[0];
  }, [content.slides, activeSlide]);

  return (
        <div
          className={`
            ${TOOLS_CONFIG.layout.heroPadding}
            bg-gray-50
            ${TOOLS_CONFIG.layout.heroBorderRadius}
            ${TOOLS_CONFIG.styling.heroShadow}
            border border-gray-300
            relative overflow-hidden
            min-h-[400px] lg:min-h-[500px]
            ${className}
          `}
          data-testid={testId}
          role="img"
          aria-label={`Slide ${currentSlide.number}: ${currentSlide.alt}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[350px] lg:min-h-[450px]">
            {/* Top Section - Slide Number */}
            <div className="flex justify-start">
              <span
                className={`
                  ${TOOLS_CONFIG.typography.cardTitleSize}
                  ${TOOLS_CONFIG.typography.cardTitleWeight}
                  ${TOOLS_CONFIG.styling.textPrimary}
                  font-mono
                  transition-all ${TOOLS_CONFIG.animation.sliderTransitionDuration} ${TOOLS_CONFIG.animation.sliderTransitionEasing}
                  transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                `}
                data-testid={`${testId}-slide-number`}
              >
                {currentSlide.number}
              </span>
            </div>

            {/* Center Section - Image */}
            <div className="flex items-center justify-center flex-1 mt-2 mb-2">
              <div className={`
                transition-all ${TOOLS_CONFIG.animation.sliderTransitionDuration} ${TOOLS_CONFIG.animation.sliderTransitionEasing}
                transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
              `}>
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.alt}
                  width={500}
                  height={500}
                  className="object-contain opacity-50"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom Section - Description and Dots */}
            <div className="flex justify-between items-end">
              {/* Left - Description */}
              <div className="max-w-sm lg:max-w-md">
                <p
                  className={`
                    ${TOOLS_CONFIG.typography.cardDescriptionSize}
                    ${TOOLS_CONFIG.typography.cardDescriptionWeight}
                    leading-tight
                    ${TOOLS_CONFIG.styling.textSecondary}
                    break-words
                    transition-all ${TOOLS_CONFIG.animation.sliderTransitionDuration} ${TOOLS_CONFIG.animation.sliderTransitionEasing}
                    transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                  `}
                  data-testid={`${testId}-description`}
                >
                  {currentSlide.description}
                </p>
              </div>

              {/* Right - Pagination Dots */}
              <div className="flex-shrink-0 ml-4">
                <CarouselDots
                  totalSlides={totalSlides}
                  activeSlide={activeSlide}
                  onDotClick={onDotClick}
                  testId={`${testId}-dots`}
                />
              </div>
            </div>
          </div>
        </div>
  );
}