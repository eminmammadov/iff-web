/**
 * Utility functions for the Cookies component
 * 
 * This file contains all utility functions used throughout the Cookies
 * component system for validation, error handling, and data processing.
 */

import { CookiesError, CookiesErrorType, CookieAcceptanceData } from './types';
import { COOKIES_CONFIG } from './config';

/**
 * Validate cookie acceptance data
 * 
 * @param data - Data to validate
 * @throws {CookiesError} If validation fails
 */
export function validateCookieAcceptanceData(data: unknown): asserts data is CookieAcceptanceData {
  if (!data || typeof data !== 'object') {
    throw new CookiesError(
      'Invalid cookie acceptance data: must be an object',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookieAcceptanceData'
    );
  }

  const cookieData = data as Record<string, unknown>;

  if (typeof cookieData.timestamp !== 'number') {
    throw new CookiesError(
      'Invalid cookie acceptance data: timestamp must be a number',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookieAcceptanceData'
    );
  }

  if (typeof cookieData.accepted !== 'boolean') {
    throw new CookiesError(
      'Invalid cookie acceptance data: accepted must be a boolean',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookieAcceptanceData'
    );
  }

  // Validate timestamp is reasonable (not in the future, not too old)
  const now = Date.now();
  const maxAge = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

  if (cookieData.timestamp > now) {
    throw new CookiesError(
      'Invalid cookie acceptance data: timestamp cannot be in the future',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookieAcceptanceData'
    );
  }

  if (now - cookieData.timestamp > maxAge) {
    throw new CookiesError(
      'Invalid cookie acceptance data: timestamp is too old',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookieAcceptanceData'
    );
  }
}

/**
 * Safely parse cookie acceptance data from localStorage
 * 
 * @param data - Raw data from localStorage
 * @returns Parsed and validated data or null if invalid
 */
export function parseCookieAcceptanceData(data: string | null): CookieAcceptanceData | null {
  if (!data) {
    return null;
  }

  try {
    const parsed = JSON.parse(data);
    validateCookieAcceptanceData(parsed);
    return parsed as CookieAcceptanceData;
  } catch (error) {
    if (error instanceof CookiesError) {
      throw error;
    }
    
    throw new CookiesError(
      `Failed to parse cookie acceptance data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      CookiesErrorType.VALIDATION_ERROR,
      'parseCookieAcceptanceData'
    );
  }
}

/**
 * Safely get cookie acceptance data from localStorage
 * 
 * @returns Cookie acceptance data or null if not found/invalid
 */
export function getSafeCookieAcceptanceData(): CookieAcceptanceData | null {
  try {
    const data = localStorage.getItem(COOKIES_CONFIG.content.defaultMessage);
    return parseCookieAcceptanceData(data);
  } catch (error) {
    console.warn('Error getting cookie acceptance data:', error);
    return null;
  }
}

/**
 * Safely set cookie acceptance data in localStorage
 * 
 * @param data - Data to store
 * @throws {CookiesError} If storage fails
 */
export function setSafeCookieAcceptanceData(data: CookieAcceptanceData): void {
  try {
    validateCookieAcceptanceData(data);
    localStorage.setItem(COOKIES_CONFIG.content.defaultMessage, JSON.stringify(data));
  } catch (error) {
    if (error instanceof CookiesError) {
      throw error;
    }
    
    throw new CookiesError(
      `Failed to store cookie acceptance data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      CookiesErrorType.STORAGE_ERROR,
      'setSafeCookieAcceptanceData'
    );
  }
}

/**
 * Check if cookies should be shown based on acceptance data
 * 
 * @param hideForHours - Hours to hide banner after acceptance
 * @returns True if banner should be shown
 */
export function shouldShowCookiesBanner(hideForHours: number = COOKIES_CONFIG.timing.hideForHours): boolean {
  try {
    const data = getSafeCookieAcceptanceData();
    
    if (!data) {
      return true; // Show banner if no data
    }

    const now = Date.now();
    const hoursInMs = hideForHours * 60 * 60 * 1000;
    
    // Show banner if more than specified hours have passed
    return (now - data.timestamp) >= hoursInMs;
  } catch (error) {
    console.warn('Error checking if cookies should be shown:', error);
    return true; // Show banner on error
  }
}

/**
 * Create cookie acceptance data
 * 
 * @returns Fresh cookie acceptance data
 */
export function createCookieAcceptanceData(): CookieAcceptanceData {
  return {
    timestamp: Date.now(),
    accepted: true
  };
}

/**
 * Validate component props
 * 
 * @param props - Props to validate
 * @throws {CookiesError} If validation fails
 */
export function validateCookiesProps(props: Record<string, unknown>): void {
  if (props.message !== undefined && typeof props.message !== 'string') {
    throw new CookiesError(
      'Invalid props: message must be a string',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookiesProps'
    );
  }

  if (props.buttonText !== undefined && typeof props.buttonText !== 'string') {
    throw new CookiesError(
      'Invalid props: buttonText must be a string',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookiesProps'
    );
  }

  if (props.autoShowDelay !== undefined && (typeof props.autoShowDelay !== 'number' || props.autoShowDelay < 0)) {
    throw new CookiesError(
      'Invalid props: autoShowDelay must be a non-negative number',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookiesProps'
    );
  }

  if (props.hideForHours !== undefined && (typeof props.hideForHours !== 'number' || props.hideForHours <= 0)) {
    throw new CookiesError(
      'Invalid props: hideForHours must be a positive number',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookiesProps'
    );
  }

  if (props.onAccept !== undefined && typeof props.onAccept !== 'function') {
    throw new CookiesError(
      'Invalid props: onAccept must be a function',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookiesProps'
    );
  }

  if (props.showAnimations !== undefined && typeof props.showAnimations !== 'boolean') {
    throw new CookiesError(
      'Invalid props: showAnimations must be a boolean',
      CookiesErrorType.VALIDATION_ERROR,
      'validateCookiesProps'
    );
  }
}

/**
 * Get safe component props with defaults
 * 
 * @param props - Raw props
 * @returns Safe props with defaults applied
 */
export function getSafeCookiesProps(props: Record<string, unknown>) {
  try {
    validateCookiesProps(props);
  } catch (error) {
    console.warn('Invalid cookies props:', error);
  }

  return {
    message: (props.message as string) || COOKIES_CONFIG.content.defaultMessage,
    buttonText: (props.buttonText as string) || COOKIES_CONFIG.content.defaultButtonText,
    autoShowDelay: (props.autoShowDelay as number) || COOKIES_CONFIG.timing.autoShowDelay,
    hideForHours: (props.hideForHours as number) || COOKIES_CONFIG.timing.hideForHours,
    onAccept: props.onAccept as (() => void) | undefined,
    showAnimations: (props.showAnimations as boolean) ?? true
  };
}

/**
 * Check if localStorage is available
 * 
 * @returns True if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safe localStorage operations with fallback
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful
 */
export function safeLocalStorageSet(key: string, value: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safe localStorage get with fallback
 * 
 * @param key - Storage key
 * @returns Value or null if not available
 */
export function safeLocalStorageGet(key: string): string | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
