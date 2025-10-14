'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

/**
 * Debounce hook for performance optimization
 * 
 * Delays the execution of a function until after a specified delay has passed
 * since the last time it was invoked. Useful for optimizing performance by
 * reducing the frequency of expensive operations like API calls or DOM updates.
 * 
 * @template T - The function type to debounce
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced function
 * 
 * @example
 * ```typescript
 * const debouncedSearch = useDebounce((query: string) => {
 *   // Perform search after user stops typing
 *   searchAPI(query);
 * }, 300);
 * 
 * // Usage
 * debouncedSearch('search term');
 * ```
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
 * Throttle hook for performance optimization
 * 
 * Limits the execution of a function to at most once per specified time period.
 * Unlike debounce, throttle ensures the function is called at regular intervals
 * while the trigger is active, making it ideal for scroll handlers and resize events.
 * 
 * @template T - The function type to throttle
 * @param callback - The function to throttle
 * @param delay - The minimum time between executions in milliseconds
 * @returns The throttled function
 * 
 * @example
 * ```typescript
 * const throttledScroll = useThrottle((event: Event) => {
 *   // Handle scroll event, but not more than once per 100ms
 *   updateScrollPosition(event);
 * }, 100);
 * 
 * // Usage
 * window.addEventListener('scroll', throttledScroll);
 * ```
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
 * Lazy loading hook for dropdown content
 * 
 * Controls when dropdown content should be rendered based on the open state.
 * Adds a small delay before rendering to improve performance and prevent
 * unnecessary DOM updates for quickly opened/closed dropdowns.
 * 
 * @param isOpen - Whether the dropdown should be open
 * @param delay - Delay in milliseconds before rendering content (default: 100ms)
 * @returns Whether the dropdown content should be rendered
 * 
 * @example
 * ```typescript
 * const shouldRender = useLazyDropdown(isDropdownOpen);
 * 
 * return (
 *   <div>
 *     {shouldRender && <DropdownContent />}
 *   </div>
 * );
 * ```
 */
export function useLazyDropdown(isOpen: boolean, delay: number = 100) {
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        setShouldRender(true);
      }, delay);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShouldRender(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, delay]);

  return shouldRender;
}

/**
 * Intersection observer hook for virtualization and lazy loading
 * 
 * Uses the Intersection Observer API to detect when an element enters or leaves
 * the viewport. Useful for implementing virtual scrolling, lazy loading images,
 * or triggering animations when elements become visible.
 * 
 * @param elementRef - React ref to the element to observe
 * @param options - Intersection Observer options (threshold, rootMargin, etc.)
 * @returns Whether the element is currently intersecting with the viewport
 * 
 * @example
 * ```typescript
 * const elementRef = useRef<HTMLDivElement>(null);
 * const isVisible = useIntersectionObserver(elementRef, { threshold: 0.5 });
 * 
 * return (
 *   <div ref={elementRef}>
 *     {isVisible ? <ExpensiveComponent /> : <Placeholder />}
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
}

/**
 * Performance monitoring hook for development debugging
 * 
 * Tracks render count and measures render times for components.
 * Only active in development mode to avoid performance overhead in production.
 * Useful for identifying performance bottlenecks and unnecessary re-renders.
 * 
 * @param componentName - Name of the component being monitored
 * @returns Object with render count and measurement utilities
 * 
 * @example
 * ```typescript
 * const { renderCount, measureRender } = usePerformanceMonitor('MyComponent');
 * 
 * useEffect(() => {
 *   measureRender(() => {
 *     // Expensive operation to measure
 *     processLargeDataset(data);
 *   });
 * }, [data]);
 * ```
 */
export function usePerformanceMonitor(componentName: string) {
  const renderCountRef = useRef(0);
  const startTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    renderCountRef.current += 1;
    startTimeRef.current = performance.now();
  });

  useEffect(() => {
    if (startTimeRef.current) {
      const renderTime = performance.now() - startTimeRef.current;
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render #${renderCountRef.current}: ${renderTime.toFixed(2)}ms`);
      }
    }
  });

  return {
    renderCount: renderCountRef.current,
    measureRender: (fn: () => void) => {
      const start = performance.now();
      fn();
      const end = performance.now();
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} operation: ${(end - start).toFixed(2)}ms`);
      }
    }
  };
}

/**
 * Memory optimization hook for cleanup management
 * 
 * Provides a centralized way to register cleanup functions that will be
 * called when the component unmounts. Helps prevent memory leaks by ensuring
 * all subscriptions, timers, and other resources are properly cleaned up.
 * 
 * @returns Object with addCleanup function for registering cleanup handlers
 * 
 * @example
 * ```typescript
 * const { addCleanup } = useMemoryOptimization();
 * 
 * useEffect(() => {
 *   const subscription = someService.subscribe(callback);
 *   addCleanup(() => subscription.unsubscribe());
 *   
 *   const timer = setInterval(updateData, 1000);
 *   addCleanup(() => clearInterval(timer));
 * }, []);
 * ```
 */
export function useMemoryOptimization() {
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctionsRef.current.push(cleanup);
  }, []);

  useEffect(() => {
    return () => {
      cleanupFunctionsRef.current.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];
    };
  }, []);

  return { addCleanup };
}
