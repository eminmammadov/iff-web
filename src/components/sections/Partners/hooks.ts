/**
 * Custom hooks for the Partners component
 * 
 * This file contains performance optimization and utility hooks
 * used throughout the Partners component system.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { PartnersState, AnimationConfig } from './types';
import { validateAnimationSpeed } from './utils';

/**
 * Hook for managing Partners component state
 * @param initialSpeed - Initial animation speed
 * @param pauseOnHover - Whether to pause on hover
 * @returns Partners state and handlers
 */
export function usePartnersState(
  initialSpeed: number = 8000,
  pauseOnHover: boolean = true
) {
  const [state, setState] = useState<PartnersState>({
    isPaused: false,
    isMounted: false,
    currentSpeed: validateAnimationSpeed(initialSpeed)
  });

  const pauseAnimation = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeAnimation = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const updateSpeed = useCallback((speed: number) => {
    setState(prev => ({ 
      ...prev, 
      currentSpeed: validateAnimationSpeed(speed) 
    }));
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      pauseAnimation();
    }
  }, [pauseOnHover, pauseAnimation]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      resumeAnimation();
    }
  }, [pauseOnHover, resumeAnimation]);

  useEffect(() => {
    setState(prev => ({ ...prev, isMounted: true }));
    
    return () => {
      setState(prev => ({ ...prev, isMounted: false }));
    };
  }, []);

  return {
    state,
    pauseAnimation,
    resumeAnimation,
    updateSpeed,
    handleMouseEnter,
    handleMouseLeave
  };
}

/**
 * Hook for debouncing function calls
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook for throttling function calls
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: never[]) => void>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef<number>(0);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
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

/**
 * Hook for animation configuration
 * @param config - Animation configuration
 * @returns Processed animation config
 */
export function useAnimationConfig(config: AnimationConfig) {
  return useMemo(() => ({
    speed: validateAnimationSpeed(config.speed),
    pauseOnHover: config.pauseOnHover,
    timingFunction: config.timingFunction,
    iterationCount: config.iterationCount
  }), [config.speed, config.pauseOnHover, config.timingFunction, config.iterationCount]);
}

const PartnersHooks = {
  usePartnersState,
  useDebounce,
  useThrottle,
  usePerformanceMonitor,
  useMemoryOptimization,
  useAnimationConfig
};

export default PartnersHooks;
