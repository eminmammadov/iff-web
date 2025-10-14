import Button from '@/components/ui/Button';
import { HERO_CONFIG } from '../config';
import { HeroContentConfig } from '../types';

/**
 * Props for the HeroContent component
 */
interface HeroContentProps {
  /** Content configuration */
  content: HeroContentConfig;
  /** Additional CSS classes */
  className?: string;
  /** Animation configuration */
  animation?: {
    enabled?: boolean;
    delay?: string;
  };
}

/**
 * HeroContent component that renders the main text content of the hero section.
 * 
 * Features:
 * - Responsive typography
 * - Animated text appearance
 * - Call-to-action buttons using Button UI component
 * - Accessibility compliant
 * 
 * @param props - HeroContent component props
 * @returns JSX element representing the hero content
 * 
 * @example
 * ```tsx
 * <HeroContent 
 *   content={heroContentConfig}
 *   animation={{ enabled: true, delay: 'delay-100' }}
 * />
 * ```
 */
export default function HeroContent({ 
  content, 
  className = '',
  animation = { enabled: true, delay: 'delay-100' }
}: HeroContentProps) {
  const animationClasses = animation.enabled 
    ? `opacity-0 translate-y-4 animate-fade-in-up ${animation.delay || ''}` 
    : '';

  return (
    <div className={`${HERO_CONFIG.layout.contentArea} text-left ${className}`}>
      {/* Main Heading */}
      <h1 className={`
        ${HERO_CONFIG.typography.title.size}
        ${HERO_CONFIG.typography.title.weight}
        ${HERO_CONFIG.typography.title.color}
        ${HERO_CONFIG.typography.title.lineHeight}
        ${HERO_CONFIG.typography.title.letterSpacing}
        ${HERO_CONFIG.typography.title.maxWidth}
        ${animationClasses}
        whitespace-pre-line
      `}>
        {content.title}
      </h1>

      {/* Description */}
      <p className={`
        ${HERO_CONFIG.typography.description.size}
        ${HERO_CONFIG.typography.description.weight}
        ${HERO_CONFIG.typography.description.color}
        ${HERO_CONFIG.typography.description.lineHeight}
        ${HERO_CONFIG.typography.description.maxWidth}
        ${animationClasses}
      `}>
        {content.description}
      </p>

      {/* Call-to-Action Buttons */}
      <div className={`${HERO_CONFIG.layout.buttonContainer} ${animationClasses}`}>
        {/* Primary CTA Button */}
        <Button
          href={content.primaryCTA.href}
          variant="green"
          testId={content.primaryCTA.testId || 'hero-primary-cta'}
        >
          {content.primaryCTA.text}
          {content.primaryCTA.icon && (
            <span>{content.primaryCTA.icon}</span>
          )}
        </Button>

        {/* Secondary CTA Button */}
        <Button
          href={content.secondaryCTA.href}
          variant="primary"
          testId={content.secondaryCTA.testId || 'hero-secondary-cta'}
        >
          {content.secondaryCTA.text}
        </Button>
      </div>
    </div>
  );
}
