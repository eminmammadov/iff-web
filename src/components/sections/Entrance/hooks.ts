/**
 * Custom hooks for the Entrance component
 * 
 * This file contains performance optimization and utility hooks
 * used throughout the Entrance component system.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { EntranceState } from './types';

/**
 * Hook for managing Entrance component state
 * @param showAnimations - Whether to show animations
 * @returns Entrance state and handlers
 */
export function useEntranceState(showAnimations: boolean = true) {
  const [state, setState] = useState<EntranceState>({
    isMounted: false,
    animationsEnabled: showAnimations,
    isButtonHovered: false
  });

  const handleButtonHover = useCallback(() => {
    setState(prev => ({ ...prev, isButtonHovered: true }));
  }, []);

  const handleButtonLeave = useCallback(() => {
    setState(prev => ({ ...prev, isButtonHovered: false }));
  }, []);

  const handleCTAClick = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('CTA button clicked');
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
    handleButtonHover,
    handleButtonLeave,
    handleCTAClick
  };
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
    fadeInDuration: 'duration-1000',
    fadeInDelay: 'delay-200',
    buttonHoverScale: 'hover:scale-105',
    buttonHoverTransition: 'transition-transform duration-200',
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

const EntranceHooks = {
  useEntranceState,
  usePerformanceMonitor,
  useAnimationConfig,
  useBreakpoint,
  useIntersectionObserver
};

export default EntranceHooks;
