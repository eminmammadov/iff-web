/**
 * TimelineDot Component
 * 
 * Individual dot component for the development timeline
 */

import { TimelineDotProps } from './types';
import { getTimelineDotClasses } from './utils';

/**
 * TimelineDot component that renders a colored dot for the timeline
 * 
 * @param props - TimelineDot component props
 * @returns JSX element representing the timeline dot
 */
export default function TimelineDot({ phase, className = '' }: TimelineDotProps) {
  const dotClasses = getTimelineDotClasses(phase);
  
  return (
    <div 
      className={`${dotClasses} ${className}`}
      aria-label={`${phase.status} phase`}
      role="img"
    />
  );
}
