/**
 * Utility functions for the Partners component
 * 
 * This file contains validation, error handling, and helper functions
 * used throughout the Partners component system.
 */

import { PartnersError, PartnersErrorType, PartnerLogo } from './types';
import { PARTNERS_ERROR_MESSAGES } from './config';

/**
 * Custom error class for Partners component
 */
export class PartnersValidationError extends Error {
  constructor(
    message: string,
    public type: PartnersErrorType,
    public details?: unknown
  ) {
    super(message);
    this.name = 'PartnersValidationError';
  }
}

/**
 * Validates a single partner logo object
 * @param logo - Logo object to validate
 * @returns True if valid, throws error if invalid
 */
export function validatePartnerLogo(logo: unknown): logo is PartnerLogo {
  if (!logo || typeof logo !== 'object') {
    throw new PartnersValidationError(
      PARTNERS_ERROR_MESSAGES.LOGO_LOADING_ERROR,
      PartnersErrorType.LOGO_LOADING,
      { logo }
    );
  }

  const logoObj = logo as Record<string, unknown>;

  if (!logoObj.name || typeof logoObj.name !== 'string') {
    throw new PartnersValidationError(
      'Logo name is required and must be a string',
      PartnersErrorType.LOGO_LOADING,
      { logo }
    );
  }

  if (!logoObj.src || typeof logoObj.src !== 'string') {
    throw new PartnersValidationError(
      'Logo src is required and must be a string',
      PartnersErrorType.LOGO_LOADING,
      { logo }
    );
  }

  if (!logoObj.alt || typeof logoObj.alt !== 'string') {
    throw new PartnersValidationError(
      'Logo alt is required and must be a string',
      PartnersErrorType.LOGO_LOADING,
      { logo }
    );
  }

  return true;
}

/**
 * Validates an array of partner logos
 * @param logos - Array of logo objects to validate
 * @returns True if all valid, throws error if any invalid
 */
export function validatePartnerLogos(logos: unknown[]): logos is PartnerLogo[] {
  if (!Array.isArray(logos)) {
    throw new PartnersValidationError(
      'Logos must be an array',
      PartnersErrorType.INVALID_PROPS,
      { logos }
    );
  }

  if (logos.length === 0) {
    throw new PartnersValidationError(
      'At least one logo is required',
      PartnersErrorType.INVALID_PROPS,
      { logos }
    );
  }

  logos.forEach((logo, index) => {
    try {
      validatePartnerLogo(logo);
    } catch (error) {
      throw new PartnersValidationError(
        `Invalid logo at index ${index}`,
        PartnersErrorType.LOGO_LOADING,
        { logo, index, originalError: error }
      );
    }
  });

  return true;
}

/**
 * Creates a safe partner logo object with fallback values
 * @param logo - Logo object to make safe
 * @returns Safe logo object
 */
export function getSafePartnerLogo(logo: unknown): PartnerLogo {
  try {
    validatePartnerLogo(logo);
    return logo as PartnerLogo;
  } catch {
    // Return fallback logo
    return {
      name: 'Unknown Partner',
      src: '/images/partners/placeholder.svg',
      alt: 'Partner Logo'
    };
  }
}

/**
 * Creates safe partner logos array with fallback handling
 * @param logos - Array of logo objects
 * @returns Safe array of logo objects
 */
export function getSafePartnerLogos(logos: readonly unknown[] | unknown[]): PartnerLogo[] {
  if (!Array.isArray(logos) || logos.length === 0) {
    return [getSafePartnerLogo(null)];
  }

  return logos.map(logo => getSafePartnerLogo(logo));
}

/**
 * Duplicates logos array for seamless infinite scroll
 * Creates 4 copies to ensure smooth infinite scrolling
 * @param logos - Array of logos to duplicate
 * @returns Duplicated array with 4 copies
 */
export function duplicateLogosForScroll(logos: PartnerLogo[]): PartnerLogo[] {
  return [...logos, ...logos, ...logos, ...logos];
}

/**
 * Generates unique key for logo item
 * @param logo - Logo object
 * @param index - Index in array
 * @returns Unique key string
 */
export function generateLogoKey(logo: PartnerLogo, index: number): string {
  return `${logo.name}-${index}`;
}

/**
 * Creates Partners error object
 * @param type - Error type
 * @param message - Error message
 * @param details - Additional error details
 * @returns Partners error object
 */
export function createPartnersError(
  type: PartnersErrorType,
  message: string,
  details?: unknown
): PartnersError {
  return {
    type,
    message,
    details,
    timestamp: new Date()
  };
}

/**
 * Checks if animation should be paused
 * @param pauseOnHover - Whether pause on hover is enabled
 * @param isPaused - Current pause state
 * @returns Whether animation should be paused
 */
export function shouldPauseAnimation(pauseOnHover: boolean, isPaused: boolean): boolean {
  return pauseOnHover && isPaused;
}

/**
 * Validates animation speed
 * @param speed - Speed value to validate
 * @returns Validated speed value
 */
export function validateAnimationSpeed(speed: unknown): number {
  if (typeof speed !== 'number' || speed <= 0) {
    return 8000; // Default speed
  }
  
  if (speed < 1000) {
    return 1000; // Minimum speed
  }
  
  if (speed > 30000) {
    return 30000; // Maximum speed
  }
  
  return speed;
}

const PartnersUtils = {
  validatePartnerLogo,
  validatePartnerLogos,
  getSafePartnerLogo,
  getSafePartnerLogos,
  duplicateLogosForScroll,
  generateLogoKey,
  createPartnersError,
  shouldPauseAnimation,
  validateAnimationSpeed
};

export default PartnersUtils;
