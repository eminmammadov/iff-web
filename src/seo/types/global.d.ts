/**
 * Global Type Declarations for Analytics and Performance APIs
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    fbq?: (
      command: 'init' | 'track' | 'trackCustom',
      eventName?: string,
      parameters?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }

  interface PerformanceEntry {
    processingStart?: number;
    hadRecentInput?: boolean;
    value?: number;
  }

  interface PerformanceObserverEntryList {
    getEntries(): PerformanceEntry[];
  }

  interface PerformanceObserver {
    observe(options: { entryTypes: string[] }): void;
  }

  interface PerformanceObserverConstructor {
    new (callback: (list: PerformanceObserverEntryList) => void): PerformanceObserver;
  }

  var PerformanceObserver: PerformanceObserverConstructor;
}

export {};
