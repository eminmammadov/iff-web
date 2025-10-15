'use client';

import { useMemo } from 'react';
import { ToolsCardContent } from '../types';
import { TOOLS_CONFIG } from '../config';
import { getSafeTitleContent } from '../utils';

/**
 * Props for the ToolsCard component
 */
interface ToolsCardProps {
  /** Card content configuration */
  content: ToolsCardContent;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * ToolsCard component that renders the right side content card with title and description.
 * 
 * Features:
 * - Content card with title and description
 * - Responsive design
 * - Accessibility compliant
 * - Performance optimized
 * 
 * @param props - ToolsCard component props
 * @returns JSX element representing the content card
 * 
 * @example
 * ```tsx
 * <ToolsCard
 *   content={cardContent}
 * />
 * ```
 */
export default function ToolsCard({
  content,
  className = '',
  testId = 'tools-card'
}: ToolsCardProps) {
  // Memoize safe content for performance
  const safeContent = useMemo(() => ({
    title: getSafeTitleContent(content.title),
    description: content.description || ''
  }), [content]);

  return (
    <div 
      className={`
        ${TOOLS_CONFIG.layout.cardPadding}
        ${TOOLS_CONFIG.layout.cardBackgroundColor}
        ${TOOLS_CONFIG.layout.cardBorderRadius}
        ${TOOLS_CONFIG.styling.cardShadow}
        border border-gray-300
        ${TOOLS_CONFIG.layout.cardHeight}
        ${TOOLS_CONFIG.layout.cardLayout}
        ${className}
      `}
      data-testid={testId}
      role="article"
      aria-label="Tools information card"
    >
      {/* Title */}
      <div className={`mb-4 ${TOOLS_CONFIG.layout.cardTitleMaxWidth}`}>
        <h2 
          className={`
            ${TOOLS_CONFIG.typography.cardTitleSize}
            ${TOOLS_CONFIG.typography.cardTitleWeight}
            ${TOOLS_CONFIG.typography.cardTitleLineHeight}
            ${TOOLS_CONFIG.styling.textPrimary}
            mb-0
          `}
          data-testid={`${testId}-title-line1`}
        >
          {safeContent.title.line1}
        </h2>
        {safeContent.title.line2 && (
          <h3 
            className={`
              ${TOOLS_CONFIG.typography.cardTitleSize}
              ${TOOLS_CONFIG.typography.cardTitleWeight}
              ${TOOLS_CONFIG.typography.cardTitleLineHeight}
              ${TOOLS_CONFIG.styling.textPrimary}
            `}
            data-testid={`${testId}-title-line2`}
          >
            {safeContent.title.line2}
          </h3>
        )}
      </div>

      {/* Main Description */}
      <p 
        className={`
          ${TOOLS_CONFIG.typography.cardDescriptionSize}
          ${TOOLS_CONFIG.typography.cardDescriptionWeight}
          ${TOOLS_CONFIG.typography.cardDescriptionLineHeight}
          ${TOOLS_CONFIG.styling.textSecondary}
          ${TOOLS_CONFIG.layout.cardDescriptionMaxWidth}
        `}
        data-testid={`${testId}-description`}
      >
        {safeContent.description}
      </p>
    </div>
  );
}
