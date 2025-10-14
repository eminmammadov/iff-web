'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { PARTNERS_CONFIG } from './config';
import { PartnersProps } from './types';
import { 
  getSafePartnerLogos, 
  duplicateLogosForScroll, 
  generateLogoKey 
} from './utils';
import { usePartnersState, usePerformanceMonitor } from './hooks';

/**
 * Partners slider component that displays partner logos in an infinite scrolling animation.
 * 
 * Features:
 * - Infinite horizontal scrolling animation
 * - Responsive design with proper spacing
 * - Pause on hover functionality
 * - Smooth transitions
 * - Accessibility compliant
 * - Performance optimized
 * - Error handling and validation
 * - Config-driven architecture
 * 
 * @param props - Partners component props
 * @returns JSX element representing the partners slider
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Partners />
 * 
 * // With custom speed
 * <Partners speed={5000} />
 * 
 * // With pause on hover disabled
 * <Partners pauseOnHover={false} />
 * 
 * // With custom logos
 * <Partners logos={customLogos} />
 * ```
 */
export default function Partners({
  className = '',
  testId = 'partners-slider',
  speed = PARTNERS_CONFIG.animation.speed,
  pauseOnHover = PARTNERS_CONFIG.animation.pauseOnHover,
  showGradients = true,
  logos
}: PartnersProps) {
  // Performance monitoring
  const { logPerformance } = usePerformanceMonitor('Partners');

  // State management
  const { 
    state, 
    handleMouseEnter, 
    handleMouseLeave 
  } = usePartnersState(speed, pauseOnHover);

  // Memoized logo data
  const safeLogos = useMemo(() => {
    logPerformance('Processing logos');
    const logoData = logos || PARTNERS_CONFIG.logos;
    return getSafePartnerLogos(logoData);
  }, [logos, logPerformance]);

  // Memoized duplicated logos for seamless scroll
  const duplicatedLogos = useMemo(() => {
    logPerformance('Duplicating logos');
    return duplicateLogosForScroll(safeLogos);
  }, [safeLogos, logPerformance]);

  // Memoized CSS styles
  const styles = useMemo(() => {
    return `
      ${PARTNERS_CONFIG.animations.scrollKeyframes}
      ${PARTNERS_CONFIG.animations.scrollClass}
      ${PARTNERS_CONFIG.animations.pauseClass}
    `;
  }, []);

  // Animation class
  const animationClass = state.isPaused ? 'animate-pause' : 'animate-scroll';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section 
        className={`w-full ${PARTNERS_CONFIG.styling.padding} ${PARTNERS_CONFIG.styling.backgroundColor} ${className}`}
        data-testid={testId}
        aria-label={PARTNERS_CONFIG.accessibility.ariaLabel}
        role={PARTNERS_CONFIG.accessibility.role}
        tabIndex={PARTNERS_CONFIG.accessibility.tabIndex}
      >
        <div className="w-full">
          {/* Slider Container */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Slider Track */}
            <div 
              className={`flex items-center ${PARTNERS_CONFIG.dimensions.spacing} ${animationClass}`}
              style={{
                animationDuration: `${state.currentSpeed}ms`,
                animationTimingFunction: PARTNERS_CONFIG.animation.timingFunction,
                animationIterationCount: PARTNERS_CONFIG.animation.iterationCount
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={generateLogoKey(logo, index)}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className={`relative ${PARTNERS_CONFIG.dimensions.logoWidth} ${PARTNERS_CONFIG.dimensions.logoHeight} ${PARTNERS_CONFIG.styling.logoOpacity} ${PARTNERS_CONFIG.styling.logoHoverOpacity} transition-opacity ${PARTNERS_CONFIG.styling.transitionDuration}`}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className={`object-contain ${PARTNERS_CONFIG.styling.logoFilter} ${PARTNERS_CONFIG.styling.logoHoverFilter} transition-all ${PARTNERS_CONFIG.styling.transitionDuration}`}
                      sizes="(max-width: 768px) 96px, 96px"
                      loading="lazy"
                      onError={(e) => {
                        if (process.env.NODE_ENV === 'development') {
                          console.warn(`Failed to load logo: ${logo.name}`, e);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient Overlays for smooth edges */}
            {showGradients && (
              <>
                <div className={`absolute left-0 top-0 bottom-0 ${PARTNERS_CONFIG.dimensions.gradientWidth} bg-gradient-to-r from-white to-transparent pointer-events-none z-10`} />
                <div className={`absolute right-0 top-0 bottom-0 ${PARTNERS_CONFIG.dimensions.gradientWidth} bg-gradient-to-l from-white to-transparent pointer-events-none z-10`} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
