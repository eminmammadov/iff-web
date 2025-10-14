'use client';

import { useMemo, Suspense } from 'react';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/layout/Navigation';
import Hamburger from '@/components/ui/Hamburger';
import { NavigationProvider, useNavigation } from '@/components/layout/Navigation/context';
import { HEADER_CONFIG } from './config';
import LaunchButton from './LaunchButton';
import HeaderErrorBoundary from './ErrorBoundary';

/**
 * Props for the HeaderContent component
 */
interface HeaderContentProps {
  /** Additional CSS classes to apply to the header */
  className?: string;
}

/**
 * HeaderContent component that renders the main header content.
 * 
 * Features:
 * - Responsive design with mobile/desktop layouts
 * - Performance optimized with useMemo
 * - Error boundary protection
 * - Clean component composition
 * 
 * @param props - HeaderContent component props
 * @returns JSX element representing the header content
 */
function HeaderContent({ className = '' }: HeaderContentProps) {
  const { isMobileMenuOpen, toggleMobileMenu } = useNavigation();

  // Memoize mobile menu classes for performance
  const mobileMenuClasses = useMemo(() => 
    `md:hidden fixed ${HEADER_CONFIG.mobileMenu.top} left-0 right-0 ${HEADER_CONFIG.classes.mobileMenu} ${HEADER_CONFIG.mobileMenu.animation} ${HEADER_CONFIG.mobileMenu.zIndex} ${
      isMobileMenuOpen() 
        ? 'opacity-100 visible translate-y-0' 
        : 'opacity-0 invisible -translate-y-2'
    }`, 
    [isMobileMenuOpen]
  );

  // Memoize mobile button container classes
  const mobileButtonClasses = useMemo(() => 
    `md:hidden flex items-center ${HEADER_CONFIG.spacing.mobile}`,
    []
  );

  return (
    <header className={`${HEADER_CONFIG.classes.header} ${className}`}>
      <div className={HEADER_CONFIG.classes.container}>
        <div className={`${HEADER_CONFIG.padding.all} ${HEADER_CONFIG.classes.flexContainer} ${HEADER_CONFIG.dimensions.height}`}>
          {/* Logo Section */}
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Desktop Connect Button */}
          <div className="hidden md:block">
            <LaunchButton />
          </div>

          {/* Mobile: Button and Hamburger together */}
          <div className={mobileButtonClasses}>
            <LaunchButton />
            <Hamburger 
              isOpen={isMobileMenuOpen()}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={mobileMenuClasses}>
          <div className={HEADER_CONFIG.classes.mobileMenuContent}>
            <Navigation showOnMobile={true} />
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Loading fallback component for Header
 */
function HeaderLoadingFallback() {
  return (
    <header className={HEADER_CONFIG.classes.header}>
      <div className={HEADER_CONFIG.classes.container}>
        <div className={`${HEADER_CONFIG.padding.all} ${HEADER_CONFIG.classes.flexContainer} ${HEADER_CONFIG.dimensions.height}`}>
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          <div className="hidden md:flex space-x-4">
            <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
        </div>
      </div>
    </header>
  );
}

/**
 * Main Header component with error boundary and context provider.
 * 
 * Features:
 * - Error boundary protection
 * - Navigation context provider
 * - Suspense loading fallback
 * - Persistent state management
 * - Performance optimized
 * 
 * @returns JSX element representing the complete header
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Header />
 * 
 * // With custom styling
 * <Header className="custom-header" />
 * ```
 */
export default function Header() {
  return (
    <HeaderErrorBoundary>
      <NavigationProvider persistState={true}>
        <Suspense fallback={<HeaderLoadingFallback />}>
          <HeaderContent />
        </Suspense>
      </NavigationProvider>
    </HeaderErrorBoundary>
  );
}

