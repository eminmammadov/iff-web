'use client';

import { useMemo, useState, useEffect } from 'react';
import { TbArrowDownRight } from 'react-icons/tb';
import { ENTRANCE_CONFIG } from './config';
import { EntranceProps } from './types';
import { 
  getSafeTitleContent, 
  getSafeCTAConfig 
} from './utils';
import { useEntranceState, usePerformanceMonitor } from './hooks';
import Button from '@/components/ui/Button';

/**
 * Entrance component that displays a minimalist hero section with highlighted text and CTA button.
 * 
 * Features:
 * - Minimalist design with highlighted text
 * - Responsive typography
 * - Smooth animations
 * - Accessibility compliant
 * - Performance optimized
 * - Error handling and validation
 * - Config-driven architecture
 * 
 * @param props - Entrance component props
 * @returns JSX element representing the entrance section
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Entrance />
 * 
 * // With custom title
 * <Entrance 
 *   title={{
 *     line1: { highlighted: 'Building', regular: 'the future of AI' },
 *     line2: { highlighted: 'empowering', regular: 'everyone to succeed' }
 *   }} 
 * />
 * 
 * // With custom CTA
 * <Entrance 
 *   cta={{ text: 'Start now', icon: '🚀', href: '/signup' }} 
 * />
 * ```
 */
export default function Entrance({
  className = '',
  testId = 'entrance-section',
  title,
  cta,
  showAnimations = true,
  onCTAClick
}: EntranceProps) {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // Çok küçük gecikme

    return () => clearTimeout(timer);
  }, []);

  // Performance monitoring
  const { logPerformance } = usePerformanceMonitor('Entrance');

  // State management
  const { 
    state, 
    handleCTAClick 
  } = useEntranceState(showAnimations);

  // Memoized content
  const safeTitle = useMemo(() => {
    logPerformance('Processing title content');
    const titleData = title || ENTRANCE_CONFIG.content.title;
    return getSafeTitleContent(titleData);
  }, [title, logPerformance]);

  const safeCTA = useMemo(() => {
    logPerformance('Processing CTA config');
    return getSafeCTAConfig(cta);
  }, [cta, logPerformance]);

  // Animation classes
  const animationClasses = useMemo(() => {
    if (!state.animationsEnabled) return '';
    return `${ENTRANCE_CONFIG.animation.fadeInDuration} ${ENTRANCE_CONFIG.animation.fadeInDelay}`;
  }, [state.animationsEnabled]);

  // Slide up animation classes
  const slideUpClasses = useMemo(() => {
    const baseClasses = `transition-all ${ENTRANCE_CONFIG.animation.slideUpDuration} ${ENTRANCE_CONFIG.animation.slideUpDelay}`;
    
    if (isVisible) {
      return `${baseClasses} ${ENTRANCE_CONFIG.animation.finalOpacity} ${ENTRANCE_CONFIG.animation.finalTransform}`;
    }
    
    return `${baseClasses} ${ENTRANCE_CONFIG.animation.initialOpacity} ${ENTRANCE_CONFIG.animation.initialTransform}`;
  }, [isVisible]);

  // Button animation classes (delayed)
  const buttonAnimationClasses = useMemo(() => {
    const baseClasses = `transition-all ${ENTRANCE_CONFIG.animation.slideUpDuration} ${ENTRANCE_CONFIG.animation.buttonDelay}`;
    
    if (isVisible) {
      return `${baseClasses} ${ENTRANCE_CONFIG.animation.finalOpacity} ${ENTRANCE_CONFIG.animation.finalTransform}`;
    }
    
    return `${baseClasses} ${ENTRANCE_CONFIG.animation.initialOpacity} ${ENTRANCE_CONFIG.animation.initialTransform}`;
  }, [isVisible]);

  // Handle CTA click
  const handleClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      handleCTAClick();
    }
    
    // Scroll to Tools section
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      className={`w-full ${ENTRANCE_CONFIG.layout.verticalSpacing} ${ENTRANCE_CONFIG.styling.backgroundColor} ${className}`}
      data-testid={testId}
      aria-label={ENTRANCE_CONFIG.accessibility.ariaLabel}
      role={ENTRANCE_CONFIG.accessibility.role}
    >
      <div className={`${ENTRANCE_CONFIG.layout.containerMaxWidth} ${ENTRANCE_CONFIG.layout.containerPadding} mx-auto`}>
        <div className={`${ENTRANCE_CONFIG.layout.textAlignment} ${animationClasses}`}>
          {/* Title */}
          <div className={slideUpClasses}>
            {/* Single line title */}
            <h1 className={`${ENTRANCE_CONFIG.typography.titleSize} ${ENTRANCE_CONFIG.typography.titleWeight} ${ENTRANCE_CONFIG.typography.titleLineHeight} ${ENTRANCE_CONFIG.typography.titleLetterSpacing}`}>
              <span className={ENTRANCE_CONFIG.typography.highlightedColor}>
                {safeTitle.line1.highlighted}
              </span>
              {safeTitle.line1.regular && (
                <span className={ENTRANCE_CONFIG.typography.regularColor}>
                  {' '}{safeTitle.line1.regular}
                </span>
              )}
            </h1>
          </div>

          {/* CTA Button */}
          <div className={`${ENTRANCE_CONFIG.layout.buttonMarginTop} ${buttonAnimationClasses}`}>
            <Button
              variant="primary"
              size="md"
              onClick={handleClick}
              className="inline-flex items-center"
              testId={`${testId}-cta-button`}
            >
              {safeCTA.text}
              {safeCTA.icon && (
                <span className={ENTRANCE_CONFIG.styling.iconMargin}>
                  <TbArrowDownRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
