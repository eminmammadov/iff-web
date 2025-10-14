/**
 * Centralized color system for the application
 * 
 * Simple color definitions that can be used across components
 */
export const COLORS = {
  /** Primary brand colors */
  primary: '#5CE05C',
  primaryHover: '#AA965F',
  
  /** Green button colors */
  greenBg: 'bg-[#5CE05C]',
  greenHover: 'hover:bg-[#AA965F]',
  
  /** Text colors */
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textWhite: 'text-white',
  textLight: 'text-gray-200',
  
  /** Background colors */
  bgWhite: 'bg-white',
  bgGray100: 'bg-gray-100',
  bgGray200: 'bg-gray-200',
  bgGray900: 'bg-gray-900',
  bgBlack: 'bg-black',
  
  /** Border colors */
  borderGray200: 'border-gray-200',
  borderGray300: 'border-gray-300',
  
  /** Hover states */
  hoverGray200: 'hover:bg-gray-200',
  hoverGray100: 'hover:bg-gray-100',
  
  /** Shadows */
  shadowLg: 'shadow-lg',
  shadowXl: 'shadow-xl',
  
  /** Opacity */
  opacity0: 'opacity-0',
  opacity100: 'opacity-100'
} as const;

export default COLORS;
