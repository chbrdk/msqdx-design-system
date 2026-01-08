"use client";

import { Button, CircularProgress, alpha, styled } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_TYPOGRAPHY } from "../../../tokens";

export interface MsqdxButtonProps extends ButtonProps {
  loading?: boolean;
  glass?: boolean;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "loading" && prop !== "glass",
})<MsqdxButtonProps>(({ theme, glass }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.semibold,
  padding: "8px 24px",
  transition: "all 0.2s ease-in-out",
  boxShadow: "none",
  
  "&:hover": {
    boxShadow: "none",
  },

  ...(glass && {
    background: alpha(theme.palette.background.paper, 0.1),
    backdropFilter: "blur(12px)",
    border: `1px solid ${alpha(MSQDX_COLORS.brand.green, 0.3)}`,
    color: theme.palette.text.primary,
    "&:hover": {
      background: alpha(theme.palette.background.paper, 0.2),
      borderColor: MSQDX_COLORS.brand.green,
    },
  }),

  "&.MuiButton-containedPrimary": {
    background: MSQDX_COLORS.brand.green,
    "&:hover": {
      background: alpha(MSQDX_COLORS.brand.green, 0.9),
    },
  },
}));

/**
 * MsqdxButton
 * 
 * Standard button for the msqdx-glass design system.
 * Features pill shape, glassmorphism support, and integrated loading state.
 */
export const MsqdxButton = ({ 
  loading, 
  glass, 
  children, 
  disabled, 
  startIcon, 
  ...props 
}: MsqdxButtonProps) => {
  return (
    <StyledButton
      glass={glass}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

