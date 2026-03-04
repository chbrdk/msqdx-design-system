"use client";

import { Tabs, Tab, styled, alpha } from "@mui/material";
import { MSQDX_BRAND_COLOR_CSS, MSQDX_TYPOGRAPHY, MSQDX_SPACING } from "@msqdx/tokens";
import React from "react";

export interface MsqdxTabsProps {
  value: string | number;
  onChange: (value: any) => void;
  tabs: { value: string | number; label: string; icon?: React.ReactElement }[];
  /** Smaller tab labels (e.g. inside cards). */
  compact?: boolean;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 'auto',
  borderBottom: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.08)}`,
  '& .MuiTabs-indicator': {
    height: '3px',
    borderRadius: MSQDX_SPACING.borderRadius.tabIndicator,
    background: MSQDX_BRAND_COLOR_CSS,
  },
}));

const StyledTab = styled(Tab, {
  shouldForwardProp: (p) => p !== 'compact',
})<{ compact?: boolean }>(({ theme, compact }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: compact ? '6px 12px' : '12px 20px',
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.medium,
  fontSize: compact ? MSQDX_TYPOGRAPHY.fontSize['2xs'] : '0.875rem',
  color: alpha(theme.palette.text.primary, 0.6),
  transition: 'all 0.2s ease-in-out',
  minHeight: 'auto',

  '&.Mui-selected': {
    color: MSQDX_BRAND_COLOR_CSS,
    fontWeight: MSQDX_TYPOGRAPHY.fontWeight.semibold,
  },

  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.03),
  },
}));

/**
 * MsqdxTabs
 * 
 * High-end tab navigation for the msqdx-glass design system.
 */
export const MsqdxTabs = ({ value, onChange, tabs, compact }: MsqdxTabsProps) => {
  return (
    <StyledTabs 
      value={value} 
      onChange={(_, newValue) => onChange(newValue)}
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map((tab) => (
        <StyledTab 
          key={tab.value} 
          value={tab.value} 
          label={tab.label} 
          icon={tab.icon}
          iconPosition="start"
          compact={compact}
        />
      ))}
    </StyledTabs>
  );
};

