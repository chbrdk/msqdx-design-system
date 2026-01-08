"use client";

import { Box, styled, alpha } from "@mui/material";
import { MSQDX_COLORS, MSQDX_TYPOGRAPHY } from "../../../tokens";
import React from "react";

export interface MsqdxBadgeProps {
  label: string | number;
  sublabel?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
}

const BadgeContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'size',
})<{ color: string; size: string }>(({ theme, color, size }) => {
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
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: size === 'small' ? '2px 8px' : '4px 12px',
    borderRadius: '6px',
    backgroundColor: alpha(baseColor, 0.1),
    borderRight: `3px solid ${baseColor}`,
    minWidth: '60px',
  };
});

const Label = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.extrabold,
  color: theme.palette.text.primary,
  lineHeight: 1,
}));

const Sublabel = styled('span')(({ theme }) => ({
  fontSize: '0.625rem',
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.medium,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: theme.palette.text.secondary,
  opacity: 0.8,
  marginTop: '2px',
}));

/**
 * MsqdxBadge
 * 
 * A specialized badge for displaying metrics and scores with a consistent msqdx-glass look.
 */
export const MsqdxBadge = ({ label, sublabel, color = 'primary', size = 'medium' }: MsqdxBadgeProps) => {
  return (
    <BadgeContainer color={color} size={size}>
      <Label>{label}</Label>
      {sublabel && <Sublabel>{sublabel}</Sublabel>}
    </BadgeContainer>
  );
};

