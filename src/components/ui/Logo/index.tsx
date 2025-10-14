import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Props for the Logo component
 */
interface LogoProps {
  /** Width of the logo in pixels */
  width?: number;
  /** Height of the logo in pixels */
  height?: number;
  /** Additional CSS classes to apply to the logo */
  className?: string;
  /** URL to navigate to when logo is clicked */
  href?: string;
  /** Alt text for the logo image */
  alt?: string;
  /** Whether to prioritize loading the image */
  priority?: boolean;
}

/**
 * Logo component that displays the Kriptaz Invest logo with optional link functionality.
 * 
 * Features:
 * - Responsive design with customizable dimensions
 * - Fallback display when image fails to load
 * - Priority loading for above-the-fold usage
 * - Accessibility support with proper ARIA labels
 * - Smooth hover transitions
 * 
 * @param props - Logo component props
 * @returns JSX element representing the logo
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Logo />
 * 
 * // Custom size
 * <Logo width={150} height={40} />
 * 
 * // With custom link
 * <Logo href="/dashboard" />
 * 
 * // Priority loading
 * <Logo priority={true} />
 * ```
 */
export default function Logo({ 
  width = 120, 
  height = 32, 
  className = "h-8 w-auto",
  href = "/",
  alt = "Invest Founders Logo",
  priority = true
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback component when image fails to load
  const FallbackLogo = () => (
    <div 
      className={`${className} bg-gray-900 text-white flex items-center justify-center font-semibold text-sm rounded`}
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label={alt}
    >
      KI
    </div>
  );

  return (
    <Link 
      href={href} 
      className="flex items-center transition-opacity duration-200 hover:opacity-80 rounded"
      aria-label="Go to homepage"
    >
      {!imageError ? (
        <Image
          src="/images/logos/kriptaz-invest-full-black-logo.svg"
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          loading="eager"
          onError={handleImageError}
          role="img"
          aria-label={alt}
        />
      ) : (
        <FallbackLogo />
      )}
    </Link>
  );
}