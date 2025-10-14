import Link from 'next/link';

/**
 * Props for the Button component
 */
interface ButtonProps {
  /** Content to display inside the button */
  children: React.ReactNode;
  /** URL to navigate to when button is clicked (makes it a link) */
  href?: string;
  /** Function to call when button is clicked */
  onClick?: () => void;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'green';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes to apply to the button */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Test ID for testing */
  testId?: string;
}

/**
 * A versatile Button component that can render as either a button or a link.
 * 
 * Features:
 * - Polymorphic design (button or link based on href prop)
 * - Multiple visual variants (primary, secondary, outline, green)
 * - Three size options (sm, md, lg)
 * - Disabled state support
 * - Accessibility compliant
 * - Smooth hover transitions
 * - Customizable styling
 * 
 * @param props - Button component props
 * @returns JSX element representing the button or link
 * 
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 * 
 * // Link button
 * <Button href="/dashboard">Go to Dashboard</Button>
 * 
 * // Different variants
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="green">Green</Button>
 * 
 * // Different sizes
 * <Button size="sm">Small</Button>
 * <Button size="lg">Large</Button>
 * 
 * // With click handler
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * 
 * // Disabled state
 * <Button disabled>Disabled</Button>
 * ```
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  testId
}: ButtonProps) {
  const baseClasses = 'flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    secondary: 'bg-gray-900 hover:bg-gray-800 text-white',
    outline: 'border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900',
    green: 'bg-[#5CE05C] hover:bg-[#AA965F] text-black'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses} data-testid={testId}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      data-testid={testId}
    >
      {children}
    </button>
  );
}
