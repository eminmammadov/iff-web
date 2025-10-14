import Button from '@/components/ui/Button';
import { HEADER_CONFIG } from './config';

/**
 * Props for the LaunchButton component
 */
interface LaunchButtonProps {
  /** Additional CSS classes to apply to the button */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Test ID for testing */
  testId?: string;
}

/**
 * LaunchButton component that renders the main CTA button for the application.
 * 
 * Features:
 * - Consistent styling across mobile and desktop
 * - Status indicator with orange dot
 * - External link to application
 * - Customizable styling and state
 * 
 * @param props - LaunchButton component props
 * @returns JSX element representing the launch button
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <LaunchButton />
 * 
 * // With custom styling
 * <LaunchButton className="w-full" />
 * 
 * // Disabled state
 * <LaunchButton disabled={true} />
 * ```
 */
export default function LaunchButton({ 
  className = '', 
  disabled = false,
  testId = 'launch-button'
}: LaunchButtonProps) {
  return (
    <Button 
      href={HEADER_CONFIG.appUrl} 
      variant="primary"
      className={className}
      disabled={disabled}
      data-testid={testId}
    >
      <div className={`${HEADER_CONFIG.button.statusIndicator.size} ${HEADER_CONFIG.button.statusIndicator.color} ${HEADER_CONFIG.button.statusIndicator.shape} ${HEADER_CONFIG.button.statusIndicator.margin}`}></div>
      {HEADER_CONFIG.button.text}
    </Button>
  );
}
