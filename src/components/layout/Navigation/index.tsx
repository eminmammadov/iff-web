'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useCallback, Suspense } from 'react';
import { TbClearAll, TbCircuitResistor, TbCircuitCapacitorPolarized, TbArrowUpRight } from 'react-icons/tb';
import { NAVIGATION_CONFIG } from './config';
import { COLORS } from '@/config/colors';
import { validateNavigationItems, getSafeNavigationItem, NavigationItem } from './utils';
import { useNavigation } from './context';
import { useDebounce, useLazyDropdown } from './hooks';

/**
 * Props for the Navigation component
 */
interface NavigationProps {
  /** Additional CSS classes to apply to the navigation */
  className?: string;
  /** Whether to show the navigation on mobile (default: hidden) */
  showOnMobile?: boolean;
  /** Currently active page path for automatic active state detection */
  activePath?: string;
  /** Whether to use automatic path detection */
  autoDetectActive?: boolean;
  /** Custom navigation items (overrides default) */
  items?: NavigationItem[];
  /** Theme variant */
  variant?: 'default' | 'dark' | 'minimal';
  /** Animation duration variant */
  animationDuration?: 'fast' | 'normal' | 'slow';
}

/**
 * Default navigation items for the application
 */
const defaultNavigationItems: NavigationItem[] = [
  { 
    label: 'Tools', 
    href: '/tools', 
    hasDropdown: true,
    testId: 'nav-tools',
    submenu: [
      { 
        label: 'Prelist', 
        href: `${NAVIGATION_CONFIG.baseUrl}/prelist`, 
        testId: 'nav-prelist',
        description: 'Discover upcoming projects and early opportunities',
        icon: <TbClearAll />,
        external: true
      },
      { 
        label: 'Crypto Portfolio', 
        href: `${NAVIGATION_CONFIG.baseUrl}/portfolio`, 
        testId: 'nav-portfolio',
        description: 'Track your investments and portfolio performance',
        icon: <TbCircuitResistor />,
        external: true
      },
      { 
        label: 'Markets', 
        href: `${NAVIGATION_CONFIG.baseUrl}/markets`, 
        testId: 'nav-markets',
        description: 'Real-time market data and analysis tools',
        icon: <TbCircuitCapacitorPolarized />,
        external: true
      }
    ]
  },
  { 
    label: 'Members', 
    href: '/members',
    testId: 'nav-members'
  },
  { 
    label: 'Insights', 
    href: '/insights',
    testId: 'nav-insights'
  },
  { 
    label: 'About us', 
    href: '/about',
    testId: 'nav-about'
  }
];

/**
 * Navigation component that renders a horizontal list of navigation links with dropdown support.
 * 
 * Features:
 * - Responsive design (hidden on mobile by default)
 * - Active state support with visual indicators
 * - Dropdown menus with smooth animations
 * - Smooth hover transitions
 * - Accessibility compliant (ARIA labels, keyboard navigation)
 * - Customizable styling and themes
 * - Built-in navigation items
 * - External link support
 * - Performance optimized with useMemo
 * - SEO friendly (nofollow support)
 * - Test-friendly with data attributes
 * 
 * @param props - Navigation component props
 * @returns JSX element representing the navigation menu
 * 
 * @example
 * ```tsx
 * // Basic usage with default items
 * <Navigation />
 * 
 * // With custom active path
 * <Navigation activePath="/members" />
 * 
 * // Show on mobile
 * <Navigation showOnMobile={true} />
 * 
 * // With custom items
 * <Navigation items={customItems} />
 * 
 * // Dark theme
 * <Navigation variant="dark" />
 * ```
 */
/**
 * Loading fallback component
 */
function NavigationLoadingFallback() {
  return (
    <nav className="flex items-center space-x-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`h-8 ${COLORS.bgGray200} rounded w-20`}></div>
      ))}
    </nav>
  );
}

export default function Navigation({
  className = '',
  showOnMobile = false,
  activePath,
  autoDetectActive = true,
  items,
  variant = 'default',
  animationDuration = 'normal'
}: NavigationProps) {
  const pathname = usePathname();
  const { toggleDropdown, closeDropdown, isDropdownOpen } = useNavigation();
  
  const mobileClasses = showOnMobile ? 'flex' : NAVIGATION_CONFIG.breakpoints.desktop;
  
  // Get theme classes from config
  const themeClasses = useMemo(() => NAVIGATION_CONFIG.themes[variant], [variant]);
  
  // Get animation duration from config
  const animationDurationMs = useMemo(() => 
    NAVIGATION_CONFIG.animationDuration[animationDuration], 
    [animationDuration]
  );

  // Determine active state
  const isItemActive = useCallback((item: NavigationItem) => {
    // Special case: Tools should only be active on mobile
    if (item.label === 'Tools') {
      return showOnMobile;
    }
    
    if (activePath) {
      return item.href === activePath;
    }
    if (autoDetectActive && pathname) {
      return pathname === item.href || pathname.startsWith(item.href + '/');
    }
    return item.isActive || false;
  }, [activePath, autoDetectActive, pathname, showOnMobile]);

  // Debounced dropdown handlers for performance
  const debouncedToggleDropdown = useDebounce(toggleDropdown, 100);
  const debouncedCloseDropdown = useDebounce(closeDropdown, 150);

  // Memoized and validated navigation items
  const navigationItems = useMemo(() => {
    const itemsToUse = items || defaultNavigationItems;
    
    try {
      const validatedItems = validateNavigationItems(itemsToUse);
      return validatedItems.map(item => ({
        ...item,
        isActive: isItemActive(item)
      }));
    } catch (error) {
      console.error('Navigation validation error:', error);
      // Fallback to safe items
      return itemsToUse.map(item => getSafeNavigationItem(item, {
        label: 'Unknown',
        href: '#'
      }));
    }
  }, [items, isItemActive]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, itemLabel: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      debouncedToggleDropdown(itemLabel);
    } else if (e.key === 'Escape') {
      debouncedCloseDropdown(itemLabel);
    }
  }, [debouncedToggleDropdown, debouncedCloseDropdown]);

  return (
    <Suspense fallback={<NavigationLoadingFallback />}>
      <nav 
        className={`${mobileClasses} ${showOnMobile ? 'flex-col space-y-2' : 'items-center space-x-4'} ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {navigationItems.map((item, index) => (
          <NavigationItemComponent
            key={index}
            item={item}
            index={index}
            showOnMobile={showOnMobile}
            themeClasses={themeClasses}
            animationDurationMs={animationDurationMs}
            isDropdownOpen={isDropdownOpen}
            onToggleDropdown={debouncedToggleDropdown}
            onCloseDropdown={debouncedCloseDropdown}
            onKeyDown={handleKeyDown}
          />
        ))}
      </nav>
    </Suspense>
  );
}

/**
 * Individual navigation item component for better separation
 */
function NavigationItemComponent({
  item,
  index,
  showOnMobile,
  themeClasses,
  animationDurationMs,
  isDropdownOpen,
  onToggleDropdown,
  onCloseDropdown,
  onKeyDown
}: {
  item: NavigationItem;
  index: number;
  showOnMobile: boolean;
  themeClasses: typeof NAVIGATION_CONFIG.themes.default | typeof NAVIGATION_CONFIG.themes.dark | typeof NAVIGATION_CONFIG.themes.minimal;
  animationDurationMs: number;
  isDropdownOpen: (label: string) => boolean;
  onToggleDropdown: (label: string) => void;
  onCloseDropdown: (label: string) => void;
  onKeyDown: (e: React.KeyboardEvent, label: string) => void;
}) {
  // All dropdowns should be open on mobile
  const shouldShowDropdown = showOnMobile ? true : isDropdownOpen(item.label);
  const lazyDropdownResult = useLazyDropdown(isDropdownOpen(item.label));
  const shouldRenderDropdown = showOnMobile ? true : lazyDropdownResult;

  // Mobile'da dropdown'ları farklı render et
  if (showOnMobile) {
    return (
      <div 
        className="relative group"
        data-testid={item.testId || `nav-item-${index}`}
      >
        {item.hasDropdown && item.submenu ? (
          <div className="relative">
            <button
              className={`flex items-center px-3 py-2 rounded-lg ${themeClasses.link} transition-all duration-${animationDurationMs} ${COLORS.textPrimary} ${
                item.isActive ? themeClasses.active : themeClasses.hover
              }`}
              onClick={() => onToggleDropdown(item.label)}
              onKeyDown={(e) => onKeyDown(e, item.label)}
              onBlur={() => setTimeout(() => onCloseDropdown(item.label), 150)}
              aria-expanded={true}
              aria-haspopup="true"
              aria-label={`${item.label} menu`}
              data-testid={`${item.testId}-button`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
              <svg 
                className={`ml-1 w-4 h-4 transition-transform duration-${animationDurationMs} rotate-180`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Mobile Dropdown - Always visible */}
            <div className={`mt-2 w-full ${COLORS.bgWhite} border border-gray-200 rounded-xl`}>
              {item.submenu.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href}
                  className={`flex items-start p-4 transition-colors duration-200 ${COLORS.hoverGray100} first:rounded-t-xl last:rounded-b-xl group/link`}
                  role="menuitem"
                  data-testid={subItem.testId || `nav-subitem-${subIndex}`}
                  {...(subItem.external && {
                    target: '_blank',
                    rel: subItem.nofollow ? 'nofollow noopener noreferrer' : 'noopener noreferrer'
                  })}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${COLORS.bgGray900} group-hover/link:bg-white group-hover/link:border group-hover/link:border-gray-300 transition-all duration-200`}>
                    {subItem.icon ? (
                      <span className={`${COLORS.textWhite} group-hover/link:${COLORS.textPrimary} text-lg transition-colors duration-200`}>
                        {subItem.icon}
                      </span>
                    ) : (
                      <svg 
                        className="w-5 h-5 text-white group-hover/link:text-gray-900 transition-colors duration-200" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-semibold ${COLORS.textPrimary}`}>
                        {subItem.label}
                      </h3>
                      {subItem.external && (
                        <TbArrowUpRight className={`w-4 h-4 text-gray-500 ml-2 ${COLORS.opacity0} group-hover/link:${COLORS.opacity100} transition-opacity duration-200`} />
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${COLORS.textSecondary}`}>
                      {subItem.description || 'Explore this section'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link 
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg ${themeClasses.link} transition-all duration-${animationDurationMs} ${COLORS.textPrimary} ${
              item.isActive ? themeClasses.active : themeClasses.hover
            }`}
            data-testid={item.testId || `nav-link-${index}`}
            {...(item.external && {
              target: '_blank',
              rel: item.nofollow ? 'nofollow noopener noreferrer' : 'noopener noreferrer'
            })}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div 
      className="relative group"
      data-testid={item.testId || `nav-item-${index}`}
    >
      {item.hasDropdown && item.submenu ? (
        <div className="relative">
          <button
            className={`flex items-center px-3 py-2 rounded-lg ${themeClasses.link} transition-all duration-${animationDurationMs} ${COLORS.textPrimary} ${
              item.isActive ? themeClasses.active : themeClasses.hover
            }`}
            onClick={() => onToggleDropdown(item.label)}
            onKeyDown={(e) => onKeyDown(e, item.label)}
            onBlur={() => setTimeout(() => onCloseDropdown(item.label), 150)}
            aria-expanded={shouldShowDropdown}
            aria-haspopup="true"
            aria-label={`${item.label} menu`}
            data-testid={`${item.testId}-button`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            <svg 
              className={`ml-1 w-4 h-4 transition-transform duration-${animationDurationMs} ${
                shouldShowDropdown ? 'rotate-180' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {shouldRenderDropdown && (
            <div
              className={`${showOnMobile ? NAVIGATION_CONFIG.dropdown.positioning.mobile : NAVIGATION_CONFIG.dropdown.positioning.desktop} ${showOnMobile ? NAVIGATION_CONFIG.dropdown.width.mobile : NAVIGATION_CONFIG.dropdown.width.desktop} ${themeClasses.dropdown} rounded-xl ${COLORS.shadowXl} transition-all duration-${animationDurationMs} z-50 ${
                showOnMobile ? 'opacity-100 visible translate-y-0' : (shouldShowDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2')
              }`}
              role="menu"
              aria-label={`${item.label} submenu`}
              data-testid={`${item.testId}-dropdown`}
            >
              {item.submenu.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href}
                  className={`flex items-start p-4 transition-colors duration-${animationDurationMs} hover:bg-gray-100 first:rounded-t-xl last:rounded-b-xl group/link`}
                  role="menuitem"
                  data-testid={subItem.testId || `nav-subitem-${subIndex}`}
                  {...(subItem.external && {
                    target: '_blank',
                    rel: subItem.nofollow ? 'nofollow noopener noreferrer' : 'noopener noreferrer'
                  })}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${COLORS.bgGray900} group-hover/link:bg-white group-hover/link:border group-hover/link:border-gray-300 transition-all duration-200`}>
                    {subItem.icon ? (
                      <span className={`${COLORS.textWhite} group-hover/link:${COLORS.textPrimary} text-lg transition-colors duration-200`}>
                        {subItem.icon}
                      </span>
                    ) : (
                      <svg 
                        className="w-5 h-5 text-white group-hover/link:text-gray-900 transition-colors duration-200" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-semibold ${COLORS.textPrimary}`}>
                        {subItem.label}
                      </h3>
                      {subItem.external && (
                        <TbArrowUpRight className={`w-4 h-4 text-gray-500 ml-2 ${COLORS.opacity0} group-hover/link:${COLORS.opacity100} transition-opacity duration-200`} />
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${COLORS.textSecondary}`}>
                      {subItem.description || 'Explore this section'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link 
          href={item.href}
          className={`flex items-center px-3 py-2 rounded-lg ${themeClasses.link} transition-all duration-${animationDurationMs} text-gray-900 ${
            item.isActive ? themeClasses.active : themeClasses.hover
          }`}
          data-testid={item.testId || `nav-link-${index}`}
          {...(item.external && {
            target: '_blank',
            rel: item.nofollow ? 'nofollow noopener noreferrer' : 'noopener noreferrer'
          })}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </Link>
      )}
    </div>
  );
}
