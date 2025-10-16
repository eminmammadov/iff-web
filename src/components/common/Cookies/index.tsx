'use client';

import React, { Suspense } from 'react';
import Button from '@/components/ui/Button';
import { CookiesProps } from './types';
import { COOKIES_CONFIG } from './config';
import { 
  useBannerInitialization,
  useCookieAcceptance,
  useKeyboardNavigation,
  usePerformanceMonitor
} from './hooks';
import { getSafeCookiesProps } from './utils';

/**
 * Loading fallback component for Cookies
 */
function CookiesLoadingFallback() {
  return (
    <div className={`
      fixed
      ${COOKIES_CONFIG.zIndex.banner}
      ${COOKIES_CONFIG.layout.desktopPosition}
      ${COOKIES_CONFIG.layout.mobilePosition}
      ${COOKIES_CONFIG.layout.containerMaxWidth}
      ${COOKIES_CONFIG.layout.containerPadding}
      ${COOKIES_CONFIG.styling.backgroundColor}
      ${COOKIES_CONFIG.styling.borderRadius}
      ${COOKIES_CONFIG.styling.boxShadow}
      ${COOKIES_CONFIG.styling.backdropFilter}
      ${COOKIES_CONFIG.styling.transitionDuration}
      opacity-0
      transform translate-y-5
    `}>
      <div className={`
        ${COOKIES_CONFIG.layout.contentGap}
        ${COOKIES_CONFIG.layout.actionsGap}
      `}>
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Cookies content component
 */
interface CookiesContentProps {
  className?: string;
  testId?: string;
  message?: string;
  buttonText?: string;
  autoShowDelay?: number;
  hideForHours?: number;
  onAccept?: () => void;
  showAnimations?: boolean;
}

function CookiesContent({
  className = '',
  testId = 'cookies-banner',
  message,
  buttonText,
  autoShowDelay,
  hideForHours,
  onAccept,
  showAnimations = true
}: CookiesContentProps) {
  const { logPerformance: _logPerformance } = usePerformanceMonitor('Cookies');
  const { state, handleVisibility } = useBannerInitialization(
    autoShowDelay,
    hideForHours,
    showAnimations
  );
  const { handleAccept } = useCookieAcceptance(hideForHours);
  const { handleKeyDown } = useKeyboardNavigation(() => {
    handleAccept(onAccept);
    handleVisibility(false);
  });

  // Get safe props with defaults
  const safeProps = getSafeCookiesProps({
    message,
    buttonText,
    autoShowDelay,
    hideForHours,
    onAccept,
    showAnimations
  });

  // Don't render if not needed
  if (!state.shouldRender) {
    return null;
  }

  return (
    <div
      className={`
        fixed
        ${COOKIES_CONFIG.zIndex.banner}
        ${COOKIES_CONFIG.layout.mobilePosition}
        ${COOKIES_CONFIG.layout.containerMaxWidth}
        ${COOKIES_CONFIG.layout.containerPadding}
        ${COOKIES_CONFIG.styling.backgroundColor}
        ${COOKIES_CONFIG.styling.borderRadius}
        ${COOKIES_CONFIG.styling.boxShadow}
        ${COOKIES_CONFIG.styling.backdropFilter}
        ${COOKIES_CONFIG.styling.transitionDuration}
        ${state.isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-full'}
        ${className}
      `}
      role={COOKIES_CONFIG.accessibility.role}
      aria-label={COOKIES_CONFIG.accessibility.ariaLabel}
      aria-live="polite"
      data-testid={testId}
      onKeyDown={handleKeyDown}
    >
      <div className={`
        flex flex-col md:flex-row md:items-center md:justify-between
        ${COOKIES_CONFIG.layout.contentGap}
        max-w-7xl mx-auto
      `}>
        <p 
          className={`
            ${COOKIES_CONFIG.typography.messageSize}
            ${COOKIES_CONFIG.typography.messageWeight}
            ${COOKIES_CONFIG.typography.messageLineHeight}
            ${COOKIES_CONFIG.styling.textColor}
            m-0
          `}
        >
          {safeProps.message}
        </p>
        
        <div className={`
          flex justify-start md:justify-end
          ${COOKIES_CONFIG.layout.actionsGap}
        `}>
          <Button
            onClick={() => {
              handleAccept(safeProps.onAccept);
              handleVisibility(false);
            }}
            variant="primary"
            size="sm"
            aria-label={`${COOKIES_CONFIG.accessibility.buttonAriaLabelPrefix} - ${safeProps.buttonText}`}
          >
            {safeProps.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Cookies component with Suspense wrapper
 */
export default function Cookies(props: CookiesProps) {
  return (
    <Suspense fallback={<CookiesLoadingFallback />}>
      <CookiesContent {...props} />
    </Suspense>
  );
}
