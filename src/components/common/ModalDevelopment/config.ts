/**
 * ModalDevelopment Component Configuration
 * 
 * Configuration for the development stage modal component
 */

import { COLORS } from '@/config/colors';

export const MODAL_DEVELOPMENT_CONFIG = {
  /** Modal dimensions and spacing */
  dimensions: {
    /** Modal width - resme uygun boyut */
    width: 'w-full max-w-sm',
    /** Modal height - resme uygun yükseklik */
    height: 'max-h-[600px]',
    /** Modal padding */
    padding: 'p-8'
  },

  /** Modal styling */
  classes: {
    /** Modal overlay - glass effect */
    overlay: 'fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 w-full',
    /** Modal container - glass effect, opak arka plan */
    container: `${COLORS.bgBlack} backdrop-blur-md border border-gray-600 rounded-xl shadow-2xl overflow-y-auto mx-4 w-full max-w-sm`,
    /** Modal content */
    content: 'flex flex-col h-full'
  },

  /** Typography */
  typography: {
    /** Main title */
    title: 'text-xl font-bold text-white mb-3',
    /** Description text */
    description: 'text-xs text-gray-300 mb-0 leading-none',
    /** Legend text */
    legend: 'text-xs text-gray-400 mb-0',
    /** Phase title */
    phaseTitle: 'text-sm font-bold text-white mb-1',
    /** Phase description */
    phaseDescription: 'text-xs text-gray-300 mb-4',
    /** Footer text */
    footer: 'text-xs text-gray-400 text-left mt-3'
  },

  /** Timeline styling */
  timeline: {
    /** Timeline line - resme uygun, dashed */
    line: 'absolute left-[27px] top-0 bottom-0 border-l border-dashed border-gray-600',
    /** Timeline container */
    container: 'relative pl-0',
    /** Dot sizes - resme uygun */
    dotSize: 'w-3 h-3',
    /** Dot positioning - dot'un merkezi line'ın merkeziyle aynı hizada */
    dotPosition: 'absolute left-[21px] top-0'
  },

  /** Development phases */
  phases: {
    /** Initial phase (completed) */
    initial: {
      status: 'completed',
      color: 'bg-gray-500',
      title: 'Grey dot: Initial Phase',
      description: 'Completed'
    },
    /** Development phase (current) */
    development: {
      status: 'current',
      color: 'bg-orange-500',
      title: 'Orange dot: Development Stage',
      description: 'We\'re currently at this stage. Development is ongoing, and we\'ll soon enter the testing phase.'
    },
    /** Test phase (upcoming) */
    test: {
      status: 'upcoming',
      color: 'bg-green-500',
      title: 'Green dot: Test Stage',
      description: 'Access to the system will be activated once the testing phase begins. Access is currently closed due to ongoing development.'
    }
  },

  /** Content */
  content: {
    /** Main title */
    title: 'System Development Stage',
    /** Description */
    description: 'Our app is currently under development. You can follow the progress below.',
    /** Legend */
    legend: '• Grey dot: Initial phase\n• Orange dot: Development phase\n• Green dot: Testing phase',
    /** Footer text */
    footer: 'Follow us on X for updates.'
  },

  /** Animations */
  animations: {
    /** Fade in/out duration */
    duration: 'duration-300',
    /** Modal enter animation */
    enter: 'animate-in fade-in-0 zoom-in-95 duration-300',
    /** Modal exit animation */
    exit: 'animate-out fade-out-0 zoom-out-95 duration-300',
    /** Overlay enter animation */
    overlayEnter: 'animate-in fade-in-0 duration-300',
    /** Overlay exit animation */
    overlayExit: 'animate-out fade-out-0 duration-300'
  }
} as const;

export default MODAL_DEVELOPMENT_CONFIG;
