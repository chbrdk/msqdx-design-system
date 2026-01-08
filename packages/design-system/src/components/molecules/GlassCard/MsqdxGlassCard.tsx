"use client";

import { Box, styled, alpha } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_SPACING, MSQDX_EFFECTS } from "../../../tokens";
import type { ReactNode } from "react";

export interface MsqdxGlassCardProps extends BoxProps {
  children: ReactNode;
  blur?: number;
  opacity?: number;
  hoverable?: boolean;
  noPadding?: boolean;
  accent?: 'purple' | 'yellow' | 'none';
  borderRadiusVariant?: keyof typeof MSQDX_SPACING.borderRadius;
}

const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => !['blur', 'opacity', 'hoverable', 'noPadding', 'accent', 'borderRadiusVariant'].includes(prop as string),
})<MsqdxGlassCardProps>(({ theme, blur = 12, opacity = 0.05, hoverable, noPadding, accent, borderRadiusVariant }) => ({
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  flexDirection: "column",
  
  // Responsive Border Radius
  ...(borderRadiusVariant ? {
    borderRadius: MSQDX_SPACING.borderRadius[borderRadiusVariant],
  } : {
    borderRadius: MSQDX_SPACING.borderRadius.xxl, // 40px - default for mobile/tablet
    [theme.breakpoints.up('md')]: { 
      borderRadius: MSQDX_SPACING.borderRadius.lg  // 24px - for desktop
    },
  }),

  // Responsive Padding
  ...(noPadding ? {
    padding: 0,
  } : {
    [theme.breakpoints.up('xs')]: { padding: MSQDX_SPACING.scale.md }, // 16px
    [theme.breakpoints.up('md')]: { padding: MSQDX_SPACING.scale.lg }, // 24px
  }),
  
  // The Glass Background
  backgroundColor: alpha(theme.palette.mode === 'dark' ? "#000000" : "#ffffff", opacity),
  backdropFilter: `blur(${blur}px)`,
  WebkitBackdropFilter: `blur(${blur}px)`,
  
  // Border (Refined for a more "premium" glass look)
  border: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.12)}`,
  borderTop: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.18)}`,
  borderLeft: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.18)}`,
  
  // Shadow from design tokens
  boxShadow: theme.palette.mode === 'dark' ? MSQDX_EFFECTS.shadows.dark : MSQDX_EFFECTS.shadows.light,

  ...(hoverable && {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: alpha(theme.palette.mode === 'dark' ? "#000000" : "#ffffff", opacity + 0.05),
      borderColor: alpha(MSQDX_COLORS.brand.green, 0.4),
      boxShadow: theme.palette.mode === 'dark' ? MSQDX_EFFECTS.shadows.dark : MSQDX_EFFECTS.shadows.light,
    },
  }),

  // Optional Accent Border (Top)
  ...(accent !== 'none' && {
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: accent === 'purple' 
        ? MSQDX_COLORS.brand.green 
        : MSQDX_COLORS.brand.yellow,
    }
  }),
}));

/**
 * MsqdxGlassCard
 * 
 * The fundamental container component for the msqdx-glass design system.
 * Implements a high-quality glassmorphism effect with configurable blur and hover states.
 */
export const MsqdxGlassCard = ({ 
  children, 
  blur, 
  opacity, 
  hoverable, 
  noPadding, 
  accent = 'none',
  borderRadiusVariant,
  ...props 
}: MsqdxGlassCardProps) => {
  return (
    <StyledCard 
      blur={blur} 
      opacity={opacity} 
      hoverable={hoverable} 
      noPadding={noPadding}
      accent={accent}
      borderRadiusVariant={borderRadiusVariant}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

