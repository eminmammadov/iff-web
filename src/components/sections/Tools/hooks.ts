/**
 * Custom hooks for the Tools component
 * 
 * This file contains performance optimization and utility hooks
 * used throughout the Tools component system.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ToolsState } from './types';
import { validateAnimationSpeed, validateSlideIndex } from './utils';

/**
 * Hook for managing Tools component state
 * @param showAnimations - Whether to show animations
 * @param totalSlides - Total number of carousel slides
 * @returns Tools state and handlers
 */
export function useToolsState(showAnimations: boolean = true, totalSlides: number = 3) {
  const [state, setState] = useState<ToolsState>({
    isMounted: false,
    animationsEnabled: showAnimations,
    currentSlide: 0,
    isAutoPlaying: true
  });

  const handleSlideChange = useCallback((slideIndex: number) => {
    const validatedIndex = validateSlideIndex(slideIndex, totalSlides);
    setState(prev => ({ ...prev, currentSlide: validatedIndex }));
  }, [totalSlides]);

  const handleNextSlide = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSlide: (prev.currentSlide + 1) % totalSlides
    }));
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSlide: prev.currentSlide === 0 ? totalSlides - 1 : prev.currentSlide - 1
    }));
  }, [totalSlides]);

  const toggleAutoPlay = useCallback(() => {
    setState(prev => ({ ...prev, isAutoPlaying: !prev.isAutoPlaying }));
  }, []);

  const handleCTAClick = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Tools CTA button clicked');
    }
  }, []);

  useEffect(() => {
    setState(prev => ({ ...prev, isMounted: true }));
    
    return () => {
      setState(prev => ({ ...prev, isMounted: false }));
    };
  }, []);

  return {
    state,
    handleSlideChange,
    handleNextSlide,
    handlePrevSlide,
    toggleAutoPlay,
    handleCTAClick
  };
}

/**
 * Hook for carousel auto-play functionality
 * @param isAutoPlaying - Whether auto-play is enabled
 * @param onNextSlide - Function to call for next slide
 * @param interval - Auto-play interval in milliseconds
 * @returns Auto-play control functions
 */
export function useCarouselAutoPlay(
  isAutoPlaying: boolean,
  onNextSlide: () => void,
  interval: number = 5000
) {
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        onNextSlide();
      }, validateAnimationSpeed(interval));
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, onNextSlide, interval]);

  const pauseAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resumeAutoPlay = useCallback(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        onNextSlide();
      }, validateAnimationSpeed(interval));
    }
  }, [isAutoPlaying, onNextSlide, interval]);

  return { pauseAutoPlay, resumeAutoPlay };
}

/**
 * Hook for performance monitoring (development only)
 * @param componentName - Name of the component
 * @returns Performance monitoring functions
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCountRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    renderCountRef.current += 1;
    startTimeRef.current = performance.now();

    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render #${renderCountRef.current}`);
    }

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  const logPerformance = useCallback((action: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} - ${action}: ${performance.now().toFixed(2)}ms`);
    }
  }, [componentName]);

  return { logPerformance };
}

/**
 * Hook for animation configuration
 * @param showAnimations - Whether animations are enabled
 * @param isMounted - Whether component is mounted
 * @returns Animation configuration
 */
export function useAnimationConfig(showAnimations: boolean, isMounted: boolean) {
  return useMemo(() => ({
    fadeInDuration: 'duration-700',
    fadeInDelay: 'delay-100',
    slideDuration: 'duration-500',
    buttonHoverScale: 'hover:scale-105',
    buttonDelay: 'delay-200',
    enabled: showAnimations && isMounted
  }), [showAnimations, isMounted]);
}

/**
 * Hook for responsive breakpoint detection
 * @returns Current breakpoint
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<string>('sm');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setBreakpoint('xl');
      } else if (width >= 1024) {
        setBreakpoint('lg');
      } else if (width >= 768) {
        setBreakpoint('md');
      } else if (width >= 640) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  return breakpoint;
}

/**
 * Hook for intersection observer (for animations)
 * @param threshold - Intersection threshold
 * @returns Intersection observer ref and isIntersecting state
 */
export function useIntersectionObserver(threshold: number = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isIntersecting };
}

/**
 * Hook for memory optimization and cleanup
 * @returns Cleanup functions
 */
export function useMemoryOptimization() {
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctionsRef.current.push(cleanup);
  }, []);

  const removeCleanup = useCallback((cleanup: () => void) => {
    const index = cleanupFunctionsRef.current.indexOf(cleanup);
    if (index > -1) {
      cleanupFunctionsRef.current.splice(index, 1);
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Cleanup function error:', error);
          }
        }
      });
      cleanupFunctionsRef.current = [];
    };
  }, []);

  return { addCleanup, removeCleanup };
}

const ToolsHooks = {
  useToolsState,
  useCarouselAutoPlay,
  usePerformanceMonitor,
  useAnimationConfig,
  useBreakpoint,
  useIntersectionObserver,
  useMemoryOptimization
};

export default ToolsHooks;
