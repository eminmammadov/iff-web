/**
 * ModalDevelopment Component
 * 
 * Development stage modal component with timeline and progress indicators
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { ModalDevelopmentProps } from './types';
import { MODAL_DEVELOPMENT_CONFIG } from './config';
import { useModalDevelopment, useModalAnimation } from './hooks';
import { getPhaseConfig, getTimelineLineClasses, getTimelineContainerClasses, formatLegendText } from './utils';
import TimelineDot from './TimelineDot';
import Button from '@/components/ui/Button';
import { FaXTwitter } from 'react-icons/fa6';

/**
 * ModalDevelopment component that displays the current development stage
 * 
 * Features:
 * - Timeline with colored dots for different phases
 * - Responsive design with thin, elegant layout
 * - Keyboard navigation (ESC to close)
 * - Click outside to close
 * - Smooth fade in/out animations
 * - Professional dark theme using project colors
 * 
 * @param props - ModalDevelopment component props
 * @returns JSX element representing the development modal
 * 
 * @example
 * ```tsx
 * <ModalDevelopment 
 *   isOpen={isModalOpen} 
 *   onClose={() => setIsModalOpen(false)} 
 * />
 * ```
 */
export default function ModalDevelopment({ 
  isOpen, 
  onClose, 
  className = '',
  testId = 'modal-development'
}: ModalDevelopmentProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { handleClickOutside, preventBodyScroll } = useModalDevelopment();
  const { 
    getModalEnterClasses, 
    getModalExitClasses, 
    getOverlayEnterClasses, 
    getOverlayExitClasses 
  } = useModalAnimation();

  // Handle modal visibility with smooth transitions
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    preventBodyScroll(isOpen);
    
    return () => {
      preventBodyScroll(false);
    };
  }, [isOpen, preventBodyScroll]);

  // Handle click outside to close
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      handleClickOutside(event, modalRef, onClose);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose, handleClickOutside]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Don't render if modal is not visible
  if (!isVisible) return null;

  // Get phase configurations
  const initialPhase = getPhaseConfig('completed');
  const developmentPhase = getPhaseConfig('current');
  const testPhase = getPhaseConfig('upcoming');

  // Format legend text
  const legendLines = formatLegendText();

  return (
    <div 
      className={`${MODAL_DEVELOPMENT_CONFIG.classes.overlay} ${
        isOpen ? getOverlayEnterClasses() : getOverlayExitClasses()
      }`}
      data-testid={testId}
    >
      <div 
        ref={modalRef}
        className={`${MODAL_DEVELOPMENT_CONFIG.classes.container} ${MODAL_DEVELOPMENT_CONFIG.dimensions.width} ${MODAL_DEVELOPMENT_CONFIG.dimensions.height} ${MODAL_DEVELOPMENT_CONFIG.dimensions.padding} ${
          isOpen ? getModalEnterClasses() : getModalExitClasses()
        } ${className}`}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        aria-modal="true"
      >
        <div className={MODAL_DEVELOPMENT_CONFIG.classes.content}>
          {/* Header */}
          <div className="mb-4">
            <h2 
              id="modal-title"
              className={MODAL_DEVELOPMENT_CONFIG.typography.title}
            >
              {MODAL_DEVELOPMENT_CONFIG.content.title}
            </h2>
            <p 
              id="modal-description"
              className={MODAL_DEVELOPMENT_CONFIG.typography.description}
            >
              {MODAL_DEVELOPMENT_CONFIG.content.description}
            </p>
          </div>

          {/* Legend */}
          <div className="mb-6">
            {legendLines.map((line, index) => (
              <p key={index} className={MODAL_DEVELOPMENT_CONFIG.typography.legend}>
                {line}
              </p>
            ))}
          </div>

          {/* Timeline */}
          <div className={getTimelineContainerClasses()}>
            {/* Timeline line */}
            <div className={getTimelineLineClasses()}></div>

            {/* Initial Phase */}
            <div className="relative mb-4">
              <TimelineDot phase={initialPhase} />
              <div className="ml-12">
                <h3 className={MODAL_DEVELOPMENT_CONFIG.typography.phaseTitle}>
                  {initialPhase.title}
                </h3>
                <p className={MODAL_DEVELOPMENT_CONFIG.typography.phaseDescription}>
                  {initialPhase.description}
                </p>
              </div>
            </div>

            {/* Development Phase */}
            <div className="relative mb-4">
              <TimelineDot phase={developmentPhase} />
              <div className="ml-12">
                <h3 className={MODAL_DEVELOPMENT_CONFIG.typography.phaseTitle}>
                  {developmentPhase.title}
                </h3>
                <p className={MODAL_DEVELOPMENT_CONFIG.typography.phaseDescription}>
                  {developmentPhase.description}
                </p>
              </div>
            </div>

            {/* Test Phase */}
            <div className="relative mb-4">
              <TimelineDot phase={testPhase} />
              <div className="ml-12">
                <h3 className={MODAL_DEVELOPMENT_CONFIG.typography.phaseTitle}>
                  {testPhase.title}
                </h3>
                <p className={MODAL_DEVELOPMENT_CONFIG.typography.phaseDescription}>
                  {testPhase.description}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 mt-4">
            <Button
              onClick={() => {
                // Upcoming button action
                console.log('Upcoming clicked');
              }}
              variant="primary"
              className="flex-1"
              aria-label="Development stage information"
            >
              Upcoming
            </Button>
            <Button
              onClick={onClose}
              variant="green"
              className="flex-1"
              aria-label="Close modal"
            >
              Close
            </Button>
          </div>

          {/* Footer */}
          <p className={MODAL_DEVELOPMENT_CONFIG.typography.footer}>
            Follow us on{' '}
            <a 
              href="https://x.com/IFFunds" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline inline-flex items-center"
            >
              <FaXTwitter className="w-3 h-3 mr-1" />
            </a>
            {' '}for updates.
          </p>
        </div>
      </div>
    </div>
  );
}
