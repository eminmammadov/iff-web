/**
 * ModalDevelopment Component Hooks
 * 
 * Custom React hooks for the development stage modal
 */

import { useEffect, useCallback } from 'react';

/**
 * Hook for managing modal state and interactions
 */
export function useModalDevelopment() {
  /**
   * Handle escape key press to close modal
   */
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // This will be handled by the parent component
      const closeEvent = new CustomEvent('closeModal');
      window.dispatchEvent(closeEvent);
    }
  }, []);

  /**
   * Handle click outside modal to close
   */
  const handleClickOutside = useCallback((event: MouseEvent, modalRef: React.RefObject<HTMLDivElement | null>, onClose: () => void) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, []);

  /**
   * Prevent body scroll when modal is open
   */
  const preventBodyScroll = useCallback((isOpen: boolean) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, []);

  /**
   * Setup event listeners
   */
  useEffect(() => {
    const handleCloseModal = () => {
      // This will be handled by the parent component
    };

    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('closeModal', handleCloseModal);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('closeModal', handleCloseModal);
    };
  }, [handleEscapeKey]);

  return {
    handleEscapeKey,
    handleClickOutside,
    preventBodyScroll
  };
}

/**
 * Hook for managing modal animations
 */
export function useModalAnimation() {
  /**
   * Get modal animation classes based on open state
   */
  const getModalClasses = useCallback((isOpen: boolean) => {
    return isOpen 
      ? 'opacity-100 scale-100 translate-y-0' 
      : 'opacity-0 scale-95 -translate-y-4';
  }, []);

  /**
   * Get overlay animation classes based on open state
   */
  const getOverlayClasses = useCallback((isOpen: boolean) => {
    return isOpen 
      ? 'opacity-100' 
      : 'opacity-0';
  }, []);

  /**
   * Get modal enter animation classes
   */
  const getModalEnterClasses = useCallback(() => {
    return 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out';
  }, []);

  /**
   * Get modal exit animation classes
   */
  const getModalExitClasses = useCallback(() => {
    return 'animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-4 duration-200 ease-in';
  }, []);

  /**
   * Get overlay enter animation classes
   */
  const getOverlayEnterClasses = useCallback(() => {
    return 'animate-in fade-in-0 duration-300 ease-out';
  }, []);

  /**
   * Get overlay exit animation classes
   */
  const getOverlayExitClasses = useCallback(() => {
    return 'animate-out fade-out-0 duration-200 ease-in';
  }, []);

  return {
    getModalClasses,
    getOverlayClasses,
    getModalEnterClasses,
    getModalExitClasses,
    getOverlayEnterClasses,
    getOverlayExitClasses
  };
}

const modalDevelopmentHooks = {
  useModalDevelopment,
  useModalAnimation
};

export default modalDevelopmentHooks;
