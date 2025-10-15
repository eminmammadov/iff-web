'use client';

import { useMemo } from 'react';
import { CarouselDotsProps } from '../types';
import { TOOLS_CONFIG } from '../config';
import { generateDotKey } from '../utils';

/**
 * CarouselDots component that renders navigation dots for carousel/slider.
 * 
 * Features:
 * - Responsive dot navigation
 * - Active state indication
 * - Click handlers for navigation
 * - Accessibility compliant
 * - Performance optimized
 * 
 * @param props - CarouselDots component props
 * @returns JSX element representing the carousel dots
 * 
 * @example
 * ```tsx
 * <CarouselDots
 *   totalSlides={3}
 *   activeSlide={0}
 *   onDotClick={(index) => setCurrentSlide(index)}
 * />
 * ```
 */
export default function CarouselDots({
  totalSlides,
  activeSlide,
  onDotClick,
  className = '',
  testId = 'carousel-dots'
}: CarouselDotsProps) {
  // Memoize dots array for performance
  const dots = useMemo(() => {
    return Array.from({ length: totalSlides }, (_, index) => ({
      index,
      isActive: index === activeSlide,
      key: generateDotKey(index)
    }));
  }, [totalSlides, activeSlide]);

  // Handle dot click
  const handleDotClick = (index: number) => {
    if (index !== activeSlide) {
      onDotClick(index);
    }
  };

  return (
    <div 
      className={`flex items-center justify-center ${TOOLS_CONFIG.carousel.dotSpacing} ${className}`}
      data-testid={testId}
      role="group"
      aria-label={TOOLS_CONFIG.accessibility.carouselAriaLabel}
    >
      {dots.map((dot) => (
        <button
          key={dot.key}
          onClick={() => handleDotClick(dot.index)}
          className={`
            ${dot.isActive ? TOOLS_CONFIG.carousel.activeDotSize : TOOLS_CONFIG.carousel.dotSize}
            ${dot.isActive ? TOOLS_CONFIG.carousel.activeDotColor : TOOLS_CONFIG.carousel.dotColor}
            ${dot.isActive ? 'rounded-lg' : 'rounded-full'} transition-all ${TOOLS_CONFIG.styling.transitionDuration}
            hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300
            ${dot.isActive ? 'opacity-100 ring-2 ring-green-300' : 'opacity-60 hover:opacity-80'}
          `}
          aria-label={`Go to slide ${dot.index + 1}`}
          aria-pressed={dot.isActive}
          data-testid={`${testId}-dot-${dot.index}`}
        />
      ))}
    </div>
  );
}
