"use client";

import { Chip, styled, alpha } from "@mui/material";
import type { ChipProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_TYPOGRAPHY } from "../../../tokens";
import React from "react";

export interface MsqdxChipProps extends Omit<ChipProps, 'variant'> {
  variant?: 'glass' | 'filled' | 'outlined';
  glow?: boolean;
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'glow' && prop !== 'customVariant',
})<MsqdxChipProps & { customVariant?: 'glass' | 'filled' | 'outlined' }>(({ theme, customVariant, glow, color = 'primary' }) => {
  const getBaseColor = () => {
    if (color === 'primary') return MSQDX_COLORS.brand.green;
    if (color === 'secondary') return MSQDX_COLORS.brand.yellow;
    if (color === 'success') return MSQDX_COLORS.status.success;
    if (color === 'warning') return MSQDX_COLORS.status.warning;
    if (color === 'error') return MSQDX_COLORS.status.error;
    if (color === 'info') return MSQDX_COLORS.status.info;
    return theme.palette.grey[500];
  };
  const baseColor = getBaseColor();

  return {
    borderRadius: '8px',
    fontWeight: customVariant === 'filled' 
      ? MSQDX_TYPOGRAPHY.fontWeight.semibold 
      : MSQDX_TYPOGRAPHY.fontWeight.medium,
    fontSize: '0.75rem',
    height: '24px',
    transition: 'all 0.2s ease-in-out',

    ...(customVariant === 'glass' && {
      backgroundColor: alpha(baseColor, 0.1),
      backdropFilter: 'blur(4px)',
      border: `1px solid ${alpha(baseColor, 0.3)}`,
      color: theme.palette.mode === 'dark' ? '#fff' : baseColor,
      '&:hover': {
        backgroundColor: alpha(baseColor, 0.2),
        borderColor: alpha(baseColor, 0.5),
      },
    }),

    ...(customVariant === 'filled' && {
      backgroundColor: baseColor,
      color: theme.palette.getContrastText(baseColor),
      '&:hover': {
        backgroundColor: alpha(baseColor, 0.9),
      },
    }),

    ...(customVariant === 'outlined' && {
      backgroundColor: 'transparent',
      border: `1px solid ${alpha(baseColor, 0.5)}`,
      color: baseColor,
      '&:hover': {
        backgroundColor: alpha(baseColor, 0.05),
        borderColor: baseColor,
      },
    }),

    ...(glow && {
      boxShadow: `0 0 10px ${alpha(baseColor, 0.3)}`,
    }),

    '& .MuiChip-icon': {
      fontSize: '14px',
      marginLeft: '8px',
      color: 'inherit',
    },
    
    '& .MuiChip-label': {
      paddingLeft: '8px',
      paddingRight: '8px',
    }
  };
});

/**
 * MsqdxChip
 * 
 * Versatile chip component for categories, tags, and status indicators.
 * Supports glassmorphism, filled, and outlined styles with optional glow.
 */
export const MsqdxChip = ({ variant = 'glass', glow, ...props }: MsqdxChipProps) => {
  // Map our custom variant to MUI variant
  const muiVariant = variant === 'glass' || variant === 'filled' ? 'filled' : 'outlined';
  
  return <StyledChip variant={muiVariant} customVariant={variant} glow={glow} {...props} />;
};

