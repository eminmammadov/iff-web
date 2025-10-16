/**
 * Custom React hooks for the Cookies component
 * 
 * This file contains all custom hooks used throughout the Cookies
 * component system for state management, animations, and interactions.
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { CookiesBannerState, AnimationConfig } from './types';
import { COOKIES_CONFIG } from './config';

/**
 * Hook to manage cookies banner state
 * 
 * @param showAnimations - Whether to enable animations
 * @returns Banner state and handlers
 */
export function useCookiesState(_showAnimations: boolean = true) {
  const [state, setState] = useState<CookiesBannerState>({
    isVisible: false,
    isAnimating: false,
    shouldRender: false
  });

  /**
   * Show the banner with animation
   */
  const showBanner = useCallback(() => {
    setState(prev => ({ ...prev, shouldRender: true }));
    
    // Small delay for smooth entrance
    setTimeout(() => {
      setState(prev => ({ ...prev, isVisible: true }));
    }, 50);
  }, []);

  /**
   * Hide the banner with animation
   */
  const hideBanner = useCallback(() => {
    setState(prev => ({ ...prev, isVisible: false, isAnimating: true }));
    
    // Remove from DOM after animation
    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        shouldRender: false, 
        isAnimating: false 
      }));
    }, COOKIES_CONFIG.timing.animationDuration);
  }, []);

  /**
   * Handle banner visibility based on cookie acceptance
   */
  const handleVisibility = useCallback((shouldShow: boolean) => {
    if (shouldShow) {
      showBanner();
    } else {
      hideBanner();
    }
  }, [showBanner, hideBanner]);

  return {
    state,
    showBanner,
    hideBanner,
    handleVisibility
  };
}

/**
 * Hook to manage cookie acceptance logic
 * 
 * @param hideForHours - Hours to hide banner after acceptance
 * @returns Cookie acceptance handlers
 */
export function useCookieAcceptance(hideForHours: number = COOKIES_CONFIG.timing.hideForHours) {
  /**
   * Check if cookies have been accepted and if the time limit has passed
   */
  const checkCookieAcceptance = useCallback(() => {
    try {
      const acceptedData = localStorage.getItem(COOKIES_CONFIG.content.defaultMessage);
      if (!acceptedData) {
        return false;
      }

      const { timestamp } = JSON.parse(acceptedData);
      const now = Date.now();
      const hoursInMs = hideForHours * 60 * 60 * 1000;
      
      // If more than specified hours have passed, show the banner again
      return (now - timestamp) < hoursInMs;
    } catch (error) {
      console.warn('Error checking cookie acceptance:', error);
      return false;
    }
  }, [hideForHours]);

  /**
   * Store cookie acceptance with timestamp
   */
  const storeCookieAcceptance = useCallback(() => {
    try {
      const acceptanceData = {
        timestamp: Date.now(),
        accepted: true
      };
      localStorage.setItem(COOKIES_CONFIG.content.defaultMessage, JSON.stringify(acceptanceData));
    } catch (error) {
      console.warn('Error storing cookie acceptance:', error);
    }
  }, []);

  /**
   * Handle accept button click
   */
  const handleAccept = useCallback((onAccept?: () => void) => {
    storeCookieAcceptance();
    onAccept?.();
  }, [storeCookieAcceptance]);

  return {
    checkCookieAcceptance,
    storeCookieAcceptance,
    handleAccept
  };
}

/**
 * Hook to manage animation configuration
 * 
 * @param animationsEnabled - Whether animations are enabled
 * @returns Animation configuration
 */
export function useAnimationConfig(animationsEnabled: boolean) {
  return useMemo((): AnimationConfig => {
    if (!animationsEnabled) {
      return {
        fadeInDuration: 'duration-0',
        fadeOutDuration: 'duration-0',
        slideUpClasses: '',
        slideDownClasses: '',
        fadeInClasses: '',
        fadeOutClasses: ''
      };
    }

    return {
      fadeInDuration: COOKIES_CONFIG.animation.fadeInDuration,
      fadeOutDuration: COOKIES_CONFIG.animation.fadeOutDuration,
      slideUpClasses: COOKIES_CONFIG.animation.slideUpClasses,
      slideDownClasses: COOKIES_CONFIG.animation.slideDownClasses,
      fadeInClasses: COOKIES_CONFIG.animation.fadeInClasses,
      fadeOutClasses: COOKIES_CONFIG.animation.fadeOutClasses
    };
  }, [animationsEnabled]);
}

/**
 * Hook to manage keyboard navigation
 * 
 * @param onAccept - Accept handler
 * @returns Keyboard event handlers
 */
export function useKeyboardNavigation(onAccept: () => void) {
  /**
   * Handle keyboard events
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onAccept();
    }
  }, [onAccept]);

  return {
    handleKeyDown
  };
}

/**
 * Hook to manage performance monitoring
 * 
 * @param componentName - Name of the component for logging
 * @returns Performance monitoring functions
 */
export function usePerformanceMonitor(componentName: string) {
  /**
   * Log performance metrics
   */
  const logPerformance = useCallback((action: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] ${action} - ${Date.now()}`);
    }
  }, [componentName]);

  return {
    logPerformance
  };
}

/**
 * Hook to manage banner initialization
 * 
 * @param autoShowDelay - Delay before showing banner
 * @param hideForHours - Hours to hide banner after acceptance
 * @param showAnimations - Whether to show animations
 * @returns Initialization handlers
 */
export function useBannerInitialization(
  autoShowDelay: number = COOKIES_CONFIG.timing.autoShowDelay,
  hideForHours: number = COOKIES_CONFIG.timing.hideForHours,
  showAnimations: boolean = true
) {
  const { state, handleVisibility } = useCookiesState(showAnimations);
  const { checkCookieAcceptance } = useCookieAcceptance(hideForHours);

  /**
   * Initialize banner visibility
   */
  useEffect(() => {
    const shouldShow = !checkCookieAcceptance();
    
    if (shouldShow) {
      // Show with delay for smooth entrance
      const timer = setTimeout(() => {
        handleVisibility(true);
      }, autoShowDelay);

      return () => clearTimeout(timer);
    }
  }, [checkCookieAcceptance, autoShowDelay, handleVisibility]);

  return {
    state,
    handleVisibility
  };
}
