/**
 * Footer component custom hooks
 * 
 * This file contains custom React hooks for state management, performance monitoring,
 * and other functionality used throughout the Footer component.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FooterProps, 
  FooterState, 
  FooterLink, 
  SocialLink,
  FooterError,
  FooterErrorType
} from './types';
import { FOOTER_CONFIG } from './config';
import { 
  createFooterError, 
  shouldEnableAnimations,
  validateFooterLink,
  validateSocialLink
} from './utils';

/**
 * Hook for managing footer state
 * 
 * @param showAnimations - Whether to show animations
 * @returns Footer state and handlers
 * 
 * @example
 * ```typescript
 * const { state, handleLinkClick, handleSocialClick } = useFooterState(true);
 * ```
 */
export function useFooterState(showAnimations?: boolean) {
  const router = useRouter();
  
  const [state, setState] = useState<FooterState>({
    animationsEnabled: shouldEnableAnimations(showAnimations),
    isVisible: false
  });

  // Trigger visibility animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, isVisible: true }));
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Handle link clicks
  const handleLinkClick = useCallback((link: FooterLink) => {
    try {
      validateFooterLink(link);
      
      if (link.external) {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(link.href);
      }
    } catch (error) {
      console.error('Footer link click error:', error);
    }
  }, [router]);

  // Handle social media clicks
  const handleSocialClick = useCallback((social: SocialLink) => {
    try {
      validateSocialLink(social);
      window.open(social.href, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Footer social click error:', error);
    }
  }, []);

  return {
    state,
    handleLinkClick,
    handleSocialClick
  };
}

/**
 * Hook for performance monitoring
 * 
 * @param componentName - Name of the component being monitored
 * @returns Performance monitoring functions
 * 
 * @example
 * ```typescript
 * const { logPerformance, logError } = usePerformanceMonitor('Footer');
 * ```
 */
export function usePerformanceMonitor(componentName: string) {
  const logPerformance = useCallback((action: string, startTime?: number) => {
    if (process.env.NODE_ENV === 'development') {
      const endTime = performance.now();
      const duration = startTime ? endTime - startTime : 0;
      console.log(`[${componentName}] ${action} - Duration: ${duration.toFixed(2)}ms`);
    }
  }, [componentName]);

  const logError = useCallback((error: FooterError) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${componentName}] Error:`, error);
    }
  }, [componentName]);

  return {
    logPerformance,
    logError
  };
}

/**
 * Hook for animation configuration
 * 
 * @param animationsEnabled - Whether animations are enabled
 * @returns Animation configuration
 * 
 * @example
 * ```typescript
 * const animationConfig = useAnimationConfig(true);
 * ```
 */
export function useAnimationConfig(animationsEnabled: boolean) {
  return useMemo(() => {
    if (!animationsEnabled) {
      return {
        fadeInClasses: '',
        slideUpClasses: '',
        buttonClasses: ''
      };
    }

    return {
      fadeInClasses: `${FOOTER_CONFIG.animation.fadeInDuration} ${FOOTER_CONFIG.animation.fadeInDelay}`,
      slideUpClasses: `transition-all ${FOOTER_CONFIG.animation.slideUpDuration} ${FOOTER_CONFIG.animation.slideUpDelay}`,
      buttonClasses: `${FOOTER_CONFIG.styling.transitionDuration}`
    };
  }, [animationsEnabled]);
}

/**
 * Hook for responsive breakpoint detection
 * 
 * @returns Current breakpoint information
 * 
 * @example
 * ```typescript
 * const { isMobile, isTablet, isDesktop } = useBreakpoint();
 * ```
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop' | 'large'>('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setBreakpoint('mobile');
      } else if (width < 768) {
        setBreakpoint('tablet');
      } else if (width < 1024) {
        setBreakpoint('desktop');
      } else {
        setBreakpoint('large');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isLarge: breakpoint === 'large'
  };
}

/**
 * Hook for intersection observer functionality
 * 
 * @param threshold - Intersection threshold
 * @returns Intersection observer state
 * 
 * @example
 * ```typescript
 * const { isIntersecting, ref } = useIntersectionObserver(0.1);
 * ```
 */
export function useIntersectionObserver(threshold: number = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return {
    isIntersecting,
    ref: setRef
  };
}

/**
 * Hook for memory optimization
 * 
 * @param dependencies - Dependencies to watch for changes
 * @returns Memoized values and cleanup functions
 * 
 * @example
 * ```typescript
 * const { memoizedContent, cleanup } = useMemoryOptimization([content]);
 * ```
 */
export function useMemoryOptimization<T>(dependencies: T[]) {
  const memoizedContent = useMemo(() => {
    return dependencies;
  }, dependencies);

  const cleanup = useCallback(() => {
    // Cleanup function for memory optimization
    if (process.env.NODE_ENV === 'development') {
      console.log('Footer component cleanup');
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    memoizedContent,
    cleanup
  };
}

/**
 * Hook for error handling
 * 
 * @param componentName - Name of the component
 * @returns Error handling functions
 * 
 * @example
 * ```typescript
 * const { handleError, clearError } = useErrorHandler('Footer');
 * ```
 */
export function useErrorHandler(componentName: string) {
  const [error, setError] = useState<FooterError | null>(null);

  const handleError = useCallback((type: FooterErrorType, message: string, details?: string) => {
    const footerError = createFooterError(type, message, details);
    setError(footerError);
    
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${componentName}] Error:`, footerError);
    }
  }, [componentName]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}

/**
 * Hook for keyboard navigation
 * 
 * @returns Keyboard navigation handlers
 * 
 * @example
 * ```typescript
 * const { handleKeyDown } = useKeyboardNavigation();
 * ```
 */
export function useKeyboardNavigation() {
  const handleKeyDown = useCallback((event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  }, []);

  return {
    handleKeyDown
  };
}
