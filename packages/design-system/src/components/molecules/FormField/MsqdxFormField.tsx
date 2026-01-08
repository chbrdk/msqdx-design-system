"use client";

import { 
  Box, 
  TextField, 
  styled, 
  alpha,
  FormHelperText,
  InputLabel
} from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_SPACING, MSQDX_TYPOGRAPHY } from "../../../tokens";
import React from "react";

export interface MsqdxFormFieldProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  errorText?: string;
  icon?: string | React.ReactNode;
  success?: boolean;
}

const StyledInputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  width: "100%",
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'success',
})<{ success?: boolean }>(({ theme, error, success }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: MSQDX_SPACING.borderRadius.lg,
    backgroundColor: alpha(theme.palette.background.paper, 0.05),
    backdropFilter: "blur(8px)",
    transition: "all 0.2s ease-in-out",
    border: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.1)}`,

    '& fieldset': {
      border: 'none',
    },

    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.08),
      borderColor: alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.2),
    },

    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
      borderColor: MSQDX_COLORS.brand.green,
      boxShadow: `0 0 0 4px ${alpha(MSQDX_COLORS.brand.green, 0.1)}`,
    },

    ...(error && {
      borderColor: theme.palette.error.main,
      '&.Mui-focused': {
        boxShadow: `0 0 0 4px ${alpha(theme.palette.error.main, 0.1)}`,
      },
    }),

    ...(success && {
      borderColor: MSQDX_COLORS.status.success,
      '&.Mui-focused': {
        boxShadow: `0 0 0 4px ${alpha(MSQDX_COLORS.status.success, 0.1)}`,
      },
    }),

    '& .MuiInputBase-input': {
      padding: '12px 16px',
      fontSize: '0.875rem',
      '&::placeholder': {
        opacity: 0.5,
      },
    },
    
    '& .MuiInputAdornment-root': {
      color: alpha(theme.palette.text.primary, 0.5),
    }
  },
}));

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
  ...props 
}: MsqdxFormFieldProps) => {
  return (
    <StyledInputWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <InputLabel 
          sx={{ 
            fontSize: '0.75rem', 
            fontWeight: MSQDX_TYPOGRAPHY.fontWeight.semibold, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            color: alpha(MSQDX_COLORS.brand.green, 0.8),
            ml: 0.5
          }}
        >
          {label} {required && '*'}
        </InputLabel>
      </Box>

      <StyledTextField
        fullWidth
        error={error}
        success={success}
        placeholder={props.placeholder}
        InputProps={{
          startAdornment: icon ? (
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              {typeof icon === 'string' ? (
                <span style={{ fontSize: '20px' }}>{icon}</span>
              ) : (
                icon
              )}
            </Box>
          ) : null,
          endAdornment: (
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
              {error && <span style={{ fontSize: '20px', color: MSQDX_COLORS.status.error }}>⚠</span>}
              {success && <span style={{ fontSize: '20px', color: MSQDX_COLORS.status.success }}>✓</span>}
            </Box>
          ),
          ...props.InputProps
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

