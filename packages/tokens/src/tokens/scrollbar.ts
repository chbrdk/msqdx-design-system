/**
 * MSQDX Scrollbar Tokens
 *
 * Hairline scrollbars — transparent track, low-contrast thumb.
 */
import { MSQDX_EFFECTS } from './effects';

export const MSQDX_SCROLLBAR = {
  /**
   * Scrollbar sizes
   */
  size: {
    thin: {
      width: '4px',
      height: '4px',
    },
    medium: {
      width: '6px',
      height: '6px',
    },
    thick: {
      width: '8px',
      height: '8px',
    },
  },
  /**
   * Scrollbar colors
   */
  color: {
    default: {
      track: 'transparent',
      thumb: 'rgba(0, 0, 0, 0.18)',
      thumbHover: 'rgba(0, 0, 0, 0.32)',
      thumbActive: 'rgba(0, 0, 0, 0.44)',
    },
    purple: {
      track: 'transparent',
      thumb: 'rgba(182, 56, 255, 0.28)',
      thumbHover: 'rgba(182, 56, 255, 0.45)',
      thumbActive: 'rgba(182, 56, 255, 0.6)',
    },
    yellow: {
      track: 'transparent',
      thumb: 'rgba(180, 160, 20, 0.35)',
      thumbHover: 'rgba(180, 160, 20, 0.5)',
      thumbActive: 'rgba(180, 160, 20, 0.65)',
    },
    pink: {
      track: 'transparent',
      thumb: 'rgba(242, 86, 182, 0.28)',
      thumbHover: 'rgba(242, 86, 182, 0.45)',
      thumbActive: 'rgba(242, 86, 182, 0.6)',
    },
    orange: {
      track: 'transparent',
      thumb: 'rgba(255, 106, 59, 0.28)',
      thumbHover: 'rgba(255, 106, 59, 0.45)',
      thumbActive: 'rgba(255, 106, 59, 0.6)',
    },
    green: {
      track: 'transparent',
      thumb: 'rgba(0, 202, 85, 0.28)',
      thumbHover: 'rgba(0, 202, 85, 0.45)',
      thumbActive: 'rgba(0, 202, 85, 0.6)',
    },
    black: {
      track: 'transparent',
      thumb: 'rgba(0, 0, 0, 0.22)',
      thumbHover: 'rgba(0, 0, 0, 0.38)',
      thumbActive: 'rgba(0, 0, 0, 0.52)',
    },
  },
  /**
   * Scrollbar border radius
   */
  borderRadius: {
    thin: '999px',
    medium: '999px',
    thick: '999px',
  },
  /**
   * Scrollbar transitions
   */
  transition: MSQDX_EFFECTS.transitions.standard,
} as const;

/**
 * Get scrollbar size values
 */
export const getScrollbarSize = (size: keyof typeof MSQDX_SCROLLBAR.size = 'thin') => {
  return MSQDX_SCROLLBAR.size[size];
};

/**
 * Get scrollbar color values
 */
export const getScrollbarColor = (color: keyof typeof MSQDX_SCROLLBAR.color = 'default') => {
  return MSQDX_SCROLLBAR.color[color];
};
