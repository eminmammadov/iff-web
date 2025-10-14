'use client';

import React from 'react';

/**
 * Props for the Hamburger component
 */
interface HamburgerProps {
  /** Whether the menu is open */
  isOpen?: boolean;
  /** Function to call when hamburger is clicked */
  onClick?: () => void;
  /** Additional CSS classes to apply to the hamburger */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Hamburger component that renders a mobile menu toggle button.
 * 
 * Features:
 * - Animated hamburger icon with smooth transitions
 * - Open/closed state management
 * - Accessibility compliant
 * - Customizable styling
 * - Click handler support
 * 
 * @param props - Hamburger component props
 * @returns JSX element representing the hamburger menu button
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Hamburger />
 * 
 * // With click handler
 * <Hamburger onClick={() => setMenuOpen(!menuOpen)} />
 * 
 * // With custom styling
 * <Hamburger className="text-blue-600" />
 * 
 * // Controlled state
 * <Hamburger isOpen={menuOpen} onClick={toggleMenu} />
 * ```
 */
export default function Hamburger({
  isOpen = false,
  onClick,
  className = '',
  testId = 'hamburger-menu'
}: HamburgerProps) {
  return (
    <button 
      className={`text-gray-900 hover:text-gray-900 transition-colors duration-200 cursor-pointer ${className}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      data-testid={testId}
    >
      <div className="w-7 h-9.5 flex flex-col justify-center items-center">
        {/* Top line */}
        <div 
          className={`w-7 h-[3px] rounded-lg bg-current transition-all duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-[3px]' : ''
          }`}
        />
        
        {/* Bottom line */}
        <div 
          className={`w-7 h-[3px] rounded-lg bg-current transition-all duration-300 ease-in-out mt-1.5 ${
            isOpen ? '-rotate-45 -translate-y-[4.75px]' : ''
          }`}
        />
      </div>
    </button>
  );
}
