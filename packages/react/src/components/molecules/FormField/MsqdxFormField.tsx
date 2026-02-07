"use client";

import { Box, TextField, styled, alpha, FormHelperText, InputLabel } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_TYPOGRAPHY, MSQDX_INPUT, MSQDX_EFFECTS } from "@msqdx/tokens";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import React from "react";

export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green' | 'black';

export interface MsqdxFormFieldProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  errorText?: string;
  icon?: string | React.ReactNode;
  success?: boolean;
  labelColor?: BrandColor;
  borderColor?: BrandColor;
}

const StyledInputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  width: "100%",
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'success' && prop !== 'borderColor',
})<{ error?: boolean; success?: boolean; disabled?: boolean; borderColor?: BrandColor }>(({ theme, error, success, disabled, borderColor }) => {
  const getBrandColor = (color?: BrandColor) => {
    if (!color) return undefined;
    if (color === 'black') return MSQDX_COLORS.brand.black;
    return MSQDX_COLORS.brand[color];
  };

  const getBorderColor = () => {
    if (disabled) return MSQDX_INPUT.border.disabled;
    if (error) return MSQDX_INPUT.border.error;
    if (success) return MSQDX_INPUT.border.success;
    if (borderColor) {
      const brandColor = getBrandColor(borderColor);
      if (brandColor) return brandColor;
    }
    return MSQDX_INPUT.border.default;
  };

  const defaultBorderColor = getBorderColor();
  const disabledBorderColor = MSQDX_INPUT.border.disabled;

  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: MSQDX_INPUT.borderRadius,
      backgroundColor: disabled ? MSQDX_INPUT.background.disabled : MSQDX_INPUT.background.default,
      backdropFilter: MSQDX_INPUT.backdropFilter,
      WebkitBackdropFilter: MSQDX_INPUT.backdropFilter,
      transition: `border-color ${MSQDX_INPUT.transition}, background-color ${MSQDX_INPUT.transition}, box-shadow ${MSQDX_INPUT.transition}`,
      border: `${MSQDX_EFFECTS.borderWidth.thin}px solid ${disabled ? disabledBorderColor : defaultBorderColor}`,
      '& fieldset': {
        border: 'none',
      },
      '&:hover': {
        backgroundColor: disabled ? MSQDX_INPUT.background.disabled : MSQDX_INPUT.background.hover,
        borderColor: disabled ? disabledBorderColor : (borderColor ? getBrandColor(borderColor) : MSQDX_INPUT.border.hover),
      },
      '&.Mui-focused': {
        backgroundColor: MSQDX_INPUT.background.focused,
        borderColor: borderColor ? getBorderColor() : MSQDX_INPUT.border.focused,
        boxShadow: borderColor ? `0 0 0 4px ${alpha(getBorderColor(), 0.1)}` : MSQDX_INPUT.focusRing.default,
      },
      ...(error && {
        borderColor: MSQDX_INPUT.border.error,
        '&.Mui-focused': {
          boxShadow: MSQDX_INPUT.focusRing.error,
        },
      }),
      ...(success && {
        borderColor: MSQDX_INPUT.border.success,
        '&.Mui-focused': {
          boxShadow: MSQDX_INPUT.focusRing.success,
        },
      }),
      '& .MuiInputBase-input': {
        padding: `${MSQDX_INPUT.size.medium.padding.vertical}px ${MSQDX_INPUT.size.medium.padding.horizontal}px`,
        fontSize: MSQDX_INPUT.size.medium.fontSize,
        fontFamily: MSQDX_INPUT.fontFamily,
        fontWeight: MSQDX_INPUT.fontWeight.input,
        '&::placeholder': {
          opacity: MSQDX_EFFECTS.opacity.half,
        },
      },
      '& .MuiInputAdornment-root': {
        color: MSQDX_INPUT.icon.default,
      },
    },
  };
});

/**
 * MsqdxFormField
 *
 * High-end form field for the msqdx-glass design system.
 * Handles all states: Default, Hover, Focus, Error, Success, and Disabled.
 */
export const MsqdxFormField = ({
  label,
  errorText,
  icon,
  success,
  error,
  required,
  labelColor,
  borderColor,
  ...props
}: MsqdxFormFieldProps) => {
  const getBrandColor = (color?: BrandColor) => {
    if (!color) return undefined;
    if (color === 'black') return MSQDX_COLORS.brand.black;
    return MSQDX_COLORS.brand[color];
  };

  const getLabelColor = () => {
    if (labelColor) {
      const brandColor = getBrandColor(labelColor);
      if (brandColor) return brandColor;
    }
    return alpha(MSQDX_COLORS.brand.green, 0.8);
  };

  return (
    <StyledInputWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <InputLabel
          sx={{
            fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
            fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
            fontWeight: MSQDX_TYPOGRAPHY.fontWeight.semibold,
            textTransform: MSQDX_TYPOGRAPHY.textTransform.uppercase,
            letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.wider,
            color: getLabelColor(),
            ml: 0.5,
          }}
        >
          {label} {required && '*'}
        </InputLabel>
      </Box>
      
      <StyledTextField
        fullWidth
        error={error}
        success={success}
        borderColor={borderColor}
        placeholder={props.placeholder}
        InputProps={{
          startAdornment: icon ? (
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              {typeof icon === 'string' ? <MsqdxIcon name={icon} size="sm" /> : icon}
            </Box>
          ) : null,
          endAdornment: (
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
              {error && <MsqdxIcon name="Error" size="sm" color={MSQDX_COLORS.status.error} />}
              {success && <MsqdxIcon name="CheckCircle" size="sm" color={MSQDX_COLORS.status.success} />}
            </Box>
          ),
          ...props.InputProps,
        }}
        {...props}
      />
      
      {errorText && (
        <FormHelperText error sx={{ ml: 1, fontWeight: MSQDX_TYPOGRAPHY.fontWeight.medium }}>
          {errorText}
        </FormHelperText>
      )}
    </StyledInputWrapper>
  );
};
