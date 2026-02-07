"use client";

import { useState, useCallback } from 'react';
import { Box, styled } from '@mui/material';
import type { InputBaseProps } from '@mui/material';
import { MSQDX_COLORS, MSQDX_TYPOGRAPHY, MSQDX_INPUT, MSQDX_EFFECTS, MSQDX_LAYOUT, getInputSize } from '@msqdx/tokens';
import { reducedMotionStyles } from '../../../utils/atomA11y';
import { MsqdxIcon } from '../Icon/MsqdxIcon';
import React from 'react';

export type InputSize = 'small' | 'medium' | 'large';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'range' | 'file';
export type InputState = 'default' | 'error' | 'success' | 'disabled';
export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green' | 'black';

export interface MsqdxInputProps extends Omit<InputBaseProps, 'size' | 'type' | 'ref'> {
  /**
   * Input label
   */
  label?: string;
  
  /**
   * Required field indicator
   */
  required?: boolean;
  
  /**
   * Input type
   * @default 'text'
   */
  type?: InputType;
  
  /**
   * Input size
   * @default 'medium'
   */
  size?: InputSize;
  
  /**
   * Start icon (Material Icon name or React node)
   */
  startIcon?: string | React.ReactNode;
  
  /**
   * End icon (Material Icon name or React node) - typically for status indicators
   */
  endIcon?: string | React.ReactNode;
  
  /**
   * Error state - shows error styling and optional error message
   */
  error?: boolean;
  
  /**
   * Error message text
   */
  errorText?: string;
  
  /**
   * Success state - shows success styling
   */
  success?: boolean;
  
  /**
   * Helper text (shown below input)
   */
  helperText?: string;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Input value
   */
  value?: string | number;
  
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string | number;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Full width
   */
  fullWidth?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Label color (brand colors or black)
   * @default undefined (uses default text color)
   */
  labelColor?: BrandColor;
  
  /**
   * Border color (brand colors or black)
   * @default undefined (uses default border color)
   */
  borderColor?: BrandColor;
  
  /**
   * Called when input is invalid (HTML5 validation)
   */
  onInvalid?: (event: React.InvalidEvent<HTMLInputElement>) => void;
  
  /**
   * Called when a key is pressed down
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  
  /**
   * Called when a key is released
   */
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  
  /**
   * Called when mouse enters the input wrapper
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Called when mouse leaves the input wrapper
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const InputWrapper = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'inputSize' &&
    prop !== 'inputState' &&
    prop !== 'isFocused' &&
    prop !== 'fullWidth' &&
    prop !== 'labelColor' &&
    prop !== 'borderColor',
})<{
  inputSize: ReturnType<typeof getInputSize>;
  inputState: InputState;
  isFocused: boolean;
  fullWidth?: boolean;
  labelColor?: BrandColor;
  borderColor?: BrandColor;
}>(({ inputSize, inputState, isFocused, fullWidth, labelColor, borderColor }) => {
  const getBrandColor = (color?: BrandColor) => {
    if (!color) return undefined;
    if (color === 'black') return MSQDX_COLORS.brand.black;
    return MSQDX_COLORS.brand[color];
  };

  const getBorderColor = () => {
    // Custom border color takes precedence (except for error/success/disabled states)
    if (inputState === 'disabled') return MSQDX_INPUT.border.disabled;
    if (inputState === 'error') return MSQDX_INPUT.border.error;
    if (inputState === 'success') return MSQDX_INPUT.border.success;
    
    // Use custom border color if provided (always full color)
    if (borderColor) {
      const brandColor = getBrandColor(borderColor);
      if (brandColor) return brandColor;
    }
    
    if (isFocused) return MSQDX_INPUT.border.focused;
    return MSQDX_INPUT.border.default;
  };

  const getLabelColor = () => {
    if (labelColor) {
      const brandColor = getBrandColor(labelColor);
      if (brandColor) return brandColor;
    }
    return MSQDX_COLORS.light.textPrimary;
  };

  const getBackgroundColor = () => {
    if (inputState === 'disabled') return MSQDX_INPUT.background.disabled;
    if (isFocused) return MSQDX_INPUT.background.focused;
    return MSQDX_INPUT.background.default;
  };

  const getFocusRing = () => {
    if (!isFocused) return 'none';
    if (inputState === 'error') return MSQDX_INPUT.focusRing.error;
    if (inputState === 'success') return MSQDX_INPUT.focusRing.success;
    return MSQDX_INPUT.focusRing.default;
  };

  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `${MSQDX_INPUT.label.gap}px`,
    width: fullWidth ? '100%' : 'auto',
    
    '& .msqdx-input-wrapper': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: `${MSQDX_INPUT.borderRadius}px`,
      border: `${MSQDX_EFFECTS.borderWidth.thin}px solid ${getBorderColor()}`,
      backgroundColor: getBackgroundColor(),
      backdropFilter: MSQDX_INPUT.backdropFilter,
      WebkitBackdropFilter: MSQDX_INPUT.backdropFilter,
      transition: `border-color ${MSQDX_INPUT.transition}, background-color ${MSQDX_INPUT.transition}, box-shadow ${MSQDX_INPUT.transition}`,
      ...reducedMotionStyles,
      minHeight: `${inputSize.height}px`,
      width: '100%',
      
      '&:hover': {
        backgroundColor: inputState === 'disabled'
          ? MSQDX_INPUT.background.disabled
          : MSQDX_INPUT.background.hover,
        borderColor: inputState === 'disabled'
          ? MSQDX_INPUT.border.disabled
          : (borderColor ? getBrandColor(borderColor) : MSQDX_INPUT.border.hover),
      },
      
      '&.focused': {
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        boxShadow: getFocusRing(),
      },
      
      '&.error': {
        borderColor: MSQDX_INPUT.border.error,
        '&.focused': {
          boxShadow: MSQDX_INPUT.focusRing.error,
        },
      },
      
      '&.success': {
        borderColor: MSQDX_INPUT.border.success,
        '&.focused': {
          boxShadow: MSQDX_INPUT.focusRing.success,
        },
      },
      
      '&.disabled': {
        opacity: MSQDX_EFFECTS.opacity.half,
        cursor: MSQDX_LAYOUT.cursor.notAllowed,
      },
    },
    
    '& .msqdx-input-icon-start': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${inputSize.iconSize}px`,
      height: `${inputSize.iconSize}px`,
      marginLeft: `${inputSize.padding.horizontal}px`,
      marginRight: `${inputSize.gap}px`,
      flexShrink: 0,
      color: inputState === 'error'
        ? MSQDX_INPUT.icon.error
        : inputState === 'success'
          ? MSQDX_INPUT.icon.success
          : inputState === 'disabled'
            ? MSQDX_INPUT.icon.disabled
            : MSQDX_INPUT.icon.default,
    },
    
    '& .msqdx-input-icon-end': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${inputSize.iconSize}px`,
      height: `${inputSize.iconSize}px`,
      marginRight: `${inputSize.padding.horizontal}px`,
      marginLeft: `${inputSize.gap}px`,
      flexShrink: 0,
      color: inputState === 'error'
        ? MSQDX_INPUT.icon.error
        : inputState === 'success'
          ? MSQDX_INPUT.icon.success
          : inputState === 'disabled'
            ? MSQDX_INPUT.icon.disabled
            : MSQDX_INPUT.icon.default,
    },
    
    '& .msqdx-input': {
      flex: 1,
      padding: `${inputSize.padding.vertical}px ${inputSize.padding.horizontal}px`,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'inherit',
      width: '100%',
      fontFamily: MSQDX_INPUT.fontFamily,
      fontSize: inputSize.fontSize,
      fontWeight: MSQDX_INPUT.fontWeight.input,
      lineHeight: MSQDX_TYPOGRAPHY.lineHeight.normal,
      
      '&::placeholder': {
        opacity: MSQDX_EFFECTS.opacity.half,
        color: 'inherit',
      },
      
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: MSQDX_EFFECTS.opacity.half,
      },
    },
    
    '& .msqdx-input-label': {
      fontSize: MSQDX_INPUT.label.fontSize,
      fontFamily: MSQDX_INPUT.label.fontFamily,
      fontWeight: MSQDX_INPUT.fontWeight.label,
      textTransform: MSQDX_INPUT.label.textTransform,
      letterSpacing: MSQDX_INPUT.label.letterSpacing,
      color: getLabelColor(),
      marginBottom: 0,
    },
    
    '& .msqdx-input-helper': {
      fontSize: MSQDX_INPUT.helper.fontSize,
      fontFamily: MSQDX_INPUT.fontFamily,
      fontWeight: MSQDX_INPUT.fontWeight.helper,
      marginTop: `${MSQDX_INPUT.helper.marginTop}px`,
      color: inputState === 'error'
        ? MSQDX_COLORS.status.error
        : MSQDX_COLORS.light.textSecondary,
    },
  };
});

/**
 * MsqdxInput
 *
 * Comprehensive input field component for the MSQDX Glass Design System.
 *
 * Features:
 * - All HTML input types: text, email, password, number, tel, url, search, date, time, etc.
 * - Three sizes: small, medium, large
 * - States: default, error, success, disabled
 * - Icon support: start and end icons
 * - Glassmorphism effect
 * - Focus states with rings
 * - Helper text and error messages
 * - Fully tokenized with design tokens
 *
 * @example
 * ```tsx
 * // Basic text input
 * <MsqdxInput
 *   label="Name"
 *   placeholder="Enter your name"
 *   required
 * />
 *
 * // Email input with icon
 * <MsqdxInput
 *   type="email"
 *   label="Email"
 *   startIcon="Email"
 *   required
 * />
 *
 * // Password with error
 * <MsqdxInput
 *   type="password"
 *   label="Password"
 *   error
 *   errorText="Password must be at least 8 characters"
 * />
 * ```
 */
export const MsqdxInput = ({
  label,
  required = false,
  type = 'text',
  size = 'medium',
  startIcon,
  endIcon,
  error = false,
  errorText,
  success = false,
  helperText,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  fullWidth = true,
  className,
  labelColor,
  borderColor,
  onFocus,
  onBlur,
  onChange,
  onInvalid,
  onKeyDown,
  onKeyUp,
  onMouseEnter,
  onMouseLeave,
  ...props
}: MsqdxInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputSize = getInputSize(size);
  
  // Determine input state
  const inputState: InputState = disabled
    ? 'disabled'
    : error
      ? 'error'
      : success
        ? 'success'
        : 'default';

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  // Render icon helper
  const renderIcon = (icon: string | React.ReactNode | undefined, position: 'start' | 'end') => {
    if (!icon) return null;
    
    const iconClass = position === 'start' ? 'msqdx-input-icon-start' : 'msqdx-input-icon-end';
    
    if (typeof icon === 'string') {
      return (
        <div className={iconClass}>
          <MsqdxIcon name={icon} customSize={inputSize.iconSize} />
        </div>
      );
    }
    
    return <div className={iconClass}>{icon}</div>;
  };

  // Determine end icon (error/success indicators or custom)
  const finalEndIcon = error
    ? 'ErrorOutline'
    : success
      ? 'CheckCircleOutline'
      : endIcon;

  return (
    <InputWrapper
      inputSize={inputSize}
      inputState={inputState}
      isFocused={isFocused}
      fullWidth={fullWidth}
      labelColor={labelColor}
      borderColor={borderColor}
      className={className}
    >
      {label && (
        <label className="msqdx-input-label">
          {label} {required && '*'}
        </label>
      )}
      
      <div
        className={`msqdx-input-wrapper ${isFocused ? 'focused' : ''} ${inputState}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {renderIcon(startIcon, 'start')}
        <input
          type={type}
          className="msqdx-input"
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          onInvalid={onInvalid}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          {...props}
        />
        {renderIcon(finalEndIcon, 'end')}
      </div>
      
      {(errorText || helperText) && (
        <div className="msqdx-input-helper">
          {errorText || helperText}
        </div>
      )}
    </InputWrapper>
  );
};
