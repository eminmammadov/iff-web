'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

/**
 * Navigation state interface defining the current state of navigation components
 * 
 * This interface describes all the state properties managed by the navigation
 * context, including dropdown states, active items, and mobile menu state.
 */
interface NavigationState {
  /** Set of currently open dropdown labels */
  openDropdowns: Set<string>;
  /** Currently active navigation item label */
  activeItem: string | null;
  /** Whether the mobile menu is open */
  mobileMenuOpen: boolean;
  /** Timestamp of the last user interaction */
  lastInteraction: number;
}

/**
 * Navigation action types for state management
 * 
 * Union type defining all possible actions that can be dispatched
 * to update the navigation state.
 */
type NavigationAction =
  | { type: 'TOGGLE_DROPDOWN'; payload: string }
  | { type: 'CLOSE_DROPDOWN'; payload: string }
  | { type: 'CLOSE_ALL_DROPDOWNS' }
  | { type: 'SET_ACTIVE_ITEM'; payload: string | null }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'SET_MOBILE_MENU'; payload: boolean }
  | { type: 'UPDATE_INTERACTION' };

/**
 * Navigation context interface defining the API available to consumers
 * 
 * This interface describes all the functions and state available through
 * the navigation context for managing navigation state.
 */
interface NavigationContextType {
  /** Current navigation state */
  state: NavigationState;
  /** Toggle a dropdown open/closed */
  toggleDropdown: (itemLabel: string) => void;
  /** Close a specific dropdown */
  closeDropdown: (itemLabel: string) => void;
  /** Close all open dropdowns */
  closeAllDropdowns: () => void;
  /** Set the currently active navigation item */
  setActiveItem: (itemLabel: string | null) => void;
  /** Toggle mobile menu open/closed */
  toggleMobileMenu: () => void;
  /** Set mobile menu state explicitly */
  setMobileMenu: (open: boolean) => void;
  /** Check if a specific dropdown is open */
  isDropdownOpen: (itemLabel: string) => boolean;
  /** Check if mobile menu is open */
  isMobileMenuOpen: () => boolean;
}

/**
 * Initial navigation state with default values
 * 
 * Defines the starting state for the navigation context when the
 * application first loads or when the context is reset.
 */
const initialState: NavigationState = {
  /** No dropdowns open initially */
  openDropdowns: new Set(),
  /** No active item initially */
  activeItem: null,
  /** Mobile menu closed initially */
  mobileMenuOpen: false,
  /** Current timestamp for initial interaction */
  lastInteraction: Date.now()
};

/**
 * Navigation state reducer for managing complex state updates
 * 
 * Handles all state transitions for the navigation context using
 * a reducer pattern for predictable state management.
 * 
 * @param state - Current navigation state
 * @param action - Action to perform on the state
 * @returns New navigation state after applying the action
 */
function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case 'TOGGLE_DROPDOWN': {
      const newSet = new Set(state.openDropdowns);
      if (newSet.has(action.payload)) {
        newSet.delete(action.payload);
      } else {
        newSet.add(action.payload);
      }
      return {
        ...state,
        openDropdowns: newSet,
        lastInteraction: Date.now()
      };
    }
    
    case 'CLOSE_DROPDOWN': {
      const newSet = new Set(state.openDropdowns);
      newSet.delete(action.payload);
      return {
        ...state,
        openDropdowns: newSet,
        lastInteraction: Date.now()
      };
    }
    
    case 'CLOSE_ALL_DROPDOWNS':
      return {
        ...state,
        openDropdowns: new Set(),
        lastInteraction: Date.now()
      };
    
    case 'SET_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload,
        lastInteraction: Date.now()
      };
    
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen,
        lastInteraction: Date.now()
      };
    
    case 'SET_MOBILE_MENU':
      return {
        ...state,
        mobileMenuOpen: action.payload,
        lastInteraction: Date.now()
      };
    
    case 'UPDATE_INTERACTION':
      return {
        ...state,
        lastInteraction: Date.now()
      };
    
    default:
      return state;
  }
}

/**
 * Navigation context for providing navigation state and actions
 * 
 * React context that provides navigation state management throughout
 * the component tree. Must be used within a NavigationProvider.
 */
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * Props for the NavigationProvider component
 */
interface NavigationProviderProps {
  /** Child components that will have access to navigation context */
  children: ReactNode;
  /** Whether to persist navigation state to localStorage */
  persistState?: boolean;
}

/**
 * Navigation provider component for managing global navigation state
 * 
 * Provides navigation context to all child components and manages
 * state persistence if enabled. Should wrap the entire application
 * or navigation-related components.
 * 
 * @param props - NavigationProvider props
 * @returns JSX element providing navigation context
 * 
 * @example
 * ```typescript
 * <NavigationProvider persistState={true}>
 *   <App />
 * </NavigationProvider>
 * ```
 */
export function NavigationProvider({ children, persistState = false }: NavigationProviderProps) {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  // Persist state to localStorage if enabled
  React.useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      const savedState = localStorage.getItem('navigation-state');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          if (parsed.openDropdowns) {
            dispatch({ type: 'SET_MOBILE_MENU', payload: parsed.mobileMenuOpen || false });
          }
        } catch (error) {
          console.warn('Failed to restore navigation state:', error);
        }
      }
    }
  }, [persistState]);

  // Save state to localStorage if enabled
  React.useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      const stateToSave = {
        mobileMenuOpen: state.mobileMenuOpen,
        lastInteraction: state.lastInteraction
      };
      localStorage.setItem('navigation-state', JSON.stringify(stateToSave));
    }
  }, [state.mobileMenuOpen, state.lastInteraction, persistState]);

  const toggleDropdown = useCallback((itemLabel: string) => {
    dispatch({ type: 'TOGGLE_DROPDOWN', payload: itemLabel });
  }, []);

  const closeDropdown = useCallback((itemLabel: string) => {
    dispatch({ type: 'CLOSE_DROPDOWN', payload: itemLabel });
  }, []);

  const closeAllDropdowns = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL_DROPDOWNS' });
  }, []);

  const setActiveItem = useCallback((itemLabel: string | null) => {
    dispatch({ type: 'SET_ACTIVE_ITEM', payload: itemLabel });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  }, []);

  const setMobileMenu = useCallback((open: boolean) => {
    dispatch({ type: 'SET_MOBILE_MENU', payload: open });
  }, []);

  const isDropdownOpen = useCallback((itemLabel: string) => {
    return state.openDropdowns.has(itemLabel);
  }, [state.openDropdowns]);

  const isMobileMenuOpen = useCallback(() => {
    return state.mobileMenuOpen;
  }, [state.mobileMenuOpen]);

  const contextValue: NavigationContextType = {
    state,
    toggleDropdown,
    closeDropdown,
    closeAllDropdowns,
    setActiveItem,
    toggleMobileMenu,
    setMobileMenu,
    isDropdownOpen,
    isMobileMenuOpen
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Hook to access navigation context and state management functions
 * 
 * Provides access to all navigation state and actions. Must be used
 * within a NavigationProvider component tree.
 * 
 * @returns Navigation context with state and action functions
 * @throws Error if used outside of NavigationProvider
 * 
 * @example
 * ```typescript
 * const { toggleDropdown, isDropdownOpen } = useNavigation();
 * 
 * const handleClick = () => {
 *   toggleDropdown('Tools');
 * };
 * 
 * const isOpen = isDropdownOpen('Tools');
 * ```
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
