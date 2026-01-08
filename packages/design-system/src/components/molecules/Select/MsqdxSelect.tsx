"use client";

import { 
  Box, 
  Select, 
  MenuItem, 
  Typography, 
  styled, 
  alpha,
  InputLabel,
  FormControl
} from "@mui/material";
import type { SelectProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_SPACING } from "../../../tokens";
import React from "react";

export interface MsqdxSelectProps extends Omit<SelectProps, 'children'> {
  label: string;
  options: { value: string | number; label: string }[];
  helperText?: string;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  gap: theme.spacing(0.5),
  minWidth: 120,
}));

const StyledSelect = styled(Select)(({ theme, error }) => ({
  borderRadius: MSQDX_SPACING.borderRadius.lg,
  backgroundColor: alpha(theme.palette.background.paper, 0.05),
  backdropFilter: "blur(8px)",
  transition: "all 0.2s ease-in-out",
  border: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.1)}`,

  '& .MuiOutlinedInput-notchedOutline': {
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

  '& .MuiSelect-select': {
    padding: '8px 16px',
    fontSize: '0.875rem',
  },

  '& .MuiSvgIcon-root': {
    display: 'none', // Hide default arrow
  },
  
  '& .MuiSelect-icon': {
    display: 'none', // Hide default arrow
  }
}));

/**
 * MsqdxSelect
 * 
 * Styled select component matching the glassmorphism design system.
 */
export const MsqdxSelect = ({ label, options, helperText, id, fullWidth, size, ...props }: MsqdxSelectProps) => {
  const labelId = id ? `${id}-label` : 'msqdx-select-label';
  return (
    <StyledFormControl fullWidth={fullWidth} size={size}>
      <InputLabel 
        id={labelId}
        sx={{ 
          position: 'static',
          transform: 'none',
          fontSize: '0.75rem', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          color: alpha(MSQDX_COLORS.brand.green, 0.8),
          mb: 0.5,
          ml: 0.5
        }}
      >
        {label}
      </InputLabel>
      <Box 
        sx={{ 
          position: 'relative',
          '&:hover .msqdx-select-icon': {
            color: alpha(MSQDX_COLORS.brand.green, 0.8),
          },
          '&:has(.Mui-focused) .msqdx-select-icon': {
            color: MSQDX_COLORS.brand.green,
          }
        }}
      >
        <StyledSelect
          labelId={labelId}
          id={id}
          fullWidth={fullWidth}
          size={size}
          {...props}
          IconComponent={() => null} // Remove default icon
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.875rem' }}>
              {opt.label}
            </MenuItem>
          ))}
        </StyledSelect>
        <Box
          className="msqdx-select-icon"
          sx={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            color: alpha(MSQDX_COLORS.brand.green, 0.6),
            transition: 'color 0.2s ease-in-out',
          }}
        >
          <span style={{ fontSize: '20px' }}>▼</span>
        </Box>
      </Box>
      {helperText && (
        <Typography variant="caption" sx={{ ml: 1, opacity: 0.7 }}>
          {helperText}
        </Typography>
      )}
    </StyledFormControl>
  );
};

