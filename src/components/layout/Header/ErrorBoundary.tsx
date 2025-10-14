'use client';

import React, { Component, ReactNode } from 'react';
import Link from 'next/link';

/**
 * Props for the HeaderErrorBoundary component
 */
interface HeaderErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Custom fallback component */
  fallback?: ReactNode;
}

/**
 * State interface for the error boundary
 */
interface HeaderErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** Error message if available */
  error?: Error;
}

/**
 * Error boundary component for Header that catches JavaScript errors
 * and displays a fallback UI instead of crashing the entire application.
 * 
 * Features:
 * - Catches errors in child components
 * - Displays fallback UI
 * - Logs errors for debugging
 * - Graceful error recovery
 * 
 * @param props - HeaderErrorBoundary props
 * @returns JSX element with error boundary functionality
 * 
 * @example
 * ```tsx
 * <HeaderErrorBoundary>
 *   <HeaderContent />
 * </HeaderErrorBoundary>
 * ```
 */
export default class HeaderErrorBoundary extends Component<
  HeaderErrorBoundaryProps,
  HeaderErrorBoundaryState
> {
  constructor(props: HeaderErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static method to update state when an error occurs
   */
  static getDerivedStateFromError(error: Error): HeaderErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called when an error occurs
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error('Header Error Boundary caught an error:', error, errorInfo);
    
    // You could also send error to logging service here
    // logErrorToService(error, errorInfo);
  }

  /**
   * Render method that shows fallback UI when error occurs
   */
  render() {
    if (this.state.hasError) {
      // Return custom fallback or default fallback
      return this.props.fallback || <HeaderFallback />;
    }

    return this.props.children;
  }
}

/**
 * Fallback component displayed when Header encounters an error
 * 
 * Provides a minimal header that ensures the application remains functional
 * even when the main header component fails.
 */
function HeaderFallback() {
  return (
    <header className="w-full bg-white border-b border-gray-100 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Simple logo fallback */}
          <div className="text-xl font-bold text-gray-900">
            Kriptaz Invest
          </div>
          
          {/* Simple navigation fallback */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>
          
          {/* Simple button fallback */}
          <div className="hidden md:block">
            <a 
              href="https://app.if.fund" 
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Launch App
            </a>
          </div>
          
          {/* Mobile fallback */}
          <div className="md:hidden">
            <a 
              href="https://app.if.fund" 
              className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
            >
              Launch App
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
