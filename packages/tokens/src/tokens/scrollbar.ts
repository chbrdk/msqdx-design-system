/**
 * MSQDX Scrollbar Tokens
 *
 * Scrollbar-specific design tokens for consistent scrollbar styling across the design system.
 */
import { MSQDX_EFFECTS } from './effects';

export const MSQDX_SCROLLBAR = {
  /**
   * Scrollbar sizes
   */
  size: {
    thin: {
      width: '6px',
      height: '6px',
    },
    medium: {
      width: '10px',
      height: '10px',
    },
    thick: {
      width: '14px',
      height: '14px',
    },
  },
  /**
   * Scrollbar colors
   */
  color: {
    default: {
      track: 'rgba(0, 0, 0, 0.05)',
      thumb: 'rgba(0, 0, 0, 0.2)',
      thumbHover: 'rgba(0, 0, 0, 0.3)',
      thumbActive: 'rgba(0, 0, 0, 0.4)',
    },
    purple: {
      track: 'rgba(182, 56, 255, 0.1)',
      thumb: 'rgba(182, 56, 255, 0.4)',
      thumbHover: 'rgba(182, 56, 255, 0.6)',
      thumbActive: 'rgba(182, 56, 255, 0.8)',
    },
    yellow: {
      track: 'rgba(254, 241, 77, 0.1)',
      thumb: 'rgba(254, 241, 77, 0.4)',
      thumbHover: 'rgba(254, 241, 77, 0.6)',
      thumbActive: 'rgba(254, 241, 77, 0.8)',
    },
    pink: {
      track: 'rgba(242, 86, 182, 0.1)',
      thumb: 'rgba(242, 86, 182, 0.4)',
      thumbHover: 'rgba(242, 86, 182, 0.6)',
      thumbActive: 'rgba(242, 86, 182, 0.8)',
    },
    orange: {
      track: 'rgba(255, 106, 59, 0.1)',
      thumb: 'rgba(255, 106, 59, 0.4)',
      thumbHover: 'rgba(255, 106, 59, 0.6)',
      thumbActive: 'rgba(255, 106, 59, 0.8)',
    },
    green: {
      track: 'rgba(0, 202, 85, 0.1)',
      thumb: 'rgba(0, 202, 85, 0.4)',
      thumbHover: 'rgba(0, 202, 85, 0.6)',
      thumbActive: 'rgba(0, 202, 85, 0.8)',
    },
    black: {
      track: 'rgba(0, 0, 0, 0.1)',
      thumb: 'rgba(0, 0, 0, 0.3)',
      thumbHover: 'rgba(0, 0, 0, 0.5)',
      thumbActive: 'rgba(0, 0, 0, 0.7)',
    },
  },
  /**
   * Scrollbar border radius
   */
  borderRadius: {
    thin: '3px',
    medium: '5px',
    thick: '7px',
  },
  /**
   * Scrollbar transitions
   */
  transition: MSQDX_EFFECTS.transitions.standard,
} as const;

/**
 * Get scrollbar size values
 */
export const getScrollbarSize = (size: keyof typeof MSQDX_SCROLLBAR.size = 'medium') => {
  return MSQDX_SCROLLBAR.size[size];
};

/**
 * Get scrollbar color values
 */
export const getScrollbarColor = (color: keyof typeof MSQDX_SCROLLBAR.color = 'default') => {
  return MSQDX_SCROLLBAR.color[color];
};
