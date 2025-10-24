/**
 * ModalDevelopment Component Utilities
 * 
 * Utility functions for the development stage modal
 */

import { MODAL_DEVELOPMENT_CONFIG } from './config';
import { DevelopmentPhase } from './types';

/**
 * Get phase configuration by status
 */
export function getPhaseConfig(status: 'completed' | 'current' | 'upcoming'): DevelopmentPhase {
  const phases = MODAL_DEVELOPMENT_CONFIG.phases;
  
  switch (status) {
    case 'completed':
      return phases.initial;
    case 'current':
      return phases.development;
    case 'upcoming':
      return phases.test;
    default:
      return phases.initial;
  }
}

/**
 * Get timeline dot classes
 */
export function getTimelineDotClasses(phase: DevelopmentPhase): string {
  const baseClasses = `${MODAL_DEVELOPMENT_CONFIG.timeline.dotSize} ${MODAL_DEVELOPMENT_CONFIG.timeline.dotPosition} rounded-full`;
  return `${baseClasses} ${phase.color}`;
}

/**
 * Get timeline line classes
 */
export function getTimelineLineClasses(): string {
  return MODAL_DEVELOPMENT_CONFIG.timeline.line;
}

/**
 * Get timeline container classes
 */
export function getTimelineContainerClasses(): string {
  return MODAL_DEVELOPMENT_CONFIG.timeline.container;
}

/**
 * Format legend text with line breaks
 */
export function formatLegendText(): string[] {
  return MODAL_DEVELOPMENT_CONFIG.content.legend.split('\n');
}

/**
 * Validate modal props
 */
export function validateModalProps(props: {
  isOpen: boolean;
  onClose: () => void;
}): boolean {
  return typeof props.isOpen === 'boolean' && typeof props.onClose === 'function';
}

const modalDevelopmentUtils = {
  getPhaseConfig,
  getTimelineDotClasses,
  getTimelineLineClasses,
  getTimelineContainerClasses,
  formatLegendText,
  validateModalProps
};

export default modalDevelopmentUtils;
