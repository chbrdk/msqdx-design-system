"use client";

import { Tabs, Tab, styled, alpha } from "@mui/material";
import { MSQDX_COLORS, MSQDX_TYPOGRAPHY } from "../../../tokens";
import React from "react";

export interface MsqdxTabsProps {
  value: string | number;
  onChange: (value: any) => void;
  tabs: { value: string | number; label: string; icon?: React.ReactElement }[];
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 'auto',
  borderBottom: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.08)}`,
  '& .MuiTabs-indicator': {
    height: '3px',
    borderRadius: '3px 3px 0 0',
    background: MSQDX_COLORS.brand.green,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: '12px 20px',
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.medium,
  fontSize: '0.875rem',
  color: alpha(theme.palette.text.primary, 0.6),
  transition: 'all 0.2s ease-in-out',
  minHeight: 'auto',

  '&.Mui-selected': {
    color: MSQDX_COLORS.brand.green,
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
export const MsqdxTabs = ({ value, onChange, tabs }: MsqdxTabsProps) => {
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
        />
      ))}
    </StyledTabs>
  );
};

