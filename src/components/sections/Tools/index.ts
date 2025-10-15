/**
 * Tools section component exports
 * 
 * This file provides a centralized export point for all Tools section components,
 * types, configurations, and utilities.
 */

// Main component
export { default as ToolsSection } from './components/ToolsSection';

// Sub-components
export { default as ToolsHero } from './components/ToolsHero';
export { default as ToolsCard } from './components/ToolsCard';
export { default as CarouselDots } from './components/CarouselDots';

// Types
export type {
  ToolsProps,
  TitleContent,
  CTAConfig,
  HeroContent,
  ToolsState,
  CarouselDotsProps,
  ToolsCardContent,
  AnimationConfig,
  LayoutConfig,
  TypographyConfig,
  ToolsError
} from './types';

export { ToolsErrorType } from './types';

// Configuration
export { TOOLS_CONFIG, TOOLS_ERROR_MESSAGES } from './config';

// Utilities
export {
  ToolsValidationError,
  validateTitleContent,
  validateCTAConfig,
  validateHeroContent,
  getSafeTitleContent,
  getSafeCTAConfig,
  getSafeHeroContent,
  createToolsError,
  validateAnimationSpeed,
  generateDotKey,
  shouldEnableAnimations,
  formatTitleLines,
  validateSlideIndex
} from './utils';

// Hooks
export {
  useToolsState,
  useCarouselAutoPlay,
  usePerformanceMonitor,
  useAnimationConfig,
  useBreakpoint,
  useIntersectionObserver,
  useMemoryOptimization
} from './hooks';

// Default export
export { default } from './components/ToolsSection';
