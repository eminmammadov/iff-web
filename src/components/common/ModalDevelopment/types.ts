/**
 * ModalDevelopment Component Types
 * 
 * TypeScript type definitions for the development stage modal
 */

export interface ModalDevelopmentProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

export interface DevelopmentPhase {
  /** Phase status */
  status: 'completed' | 'current' | 'upcoming';
  /** Phase color */
  color: string;
  /** Phase title */
  title: string;
  /** Phase description */
  description: string;
}

export interface TimelineDotProps {
  /** Phase data */
  phase: DevelopmentPhase;
  /** Additional CSS classes */
  className?: string;
}