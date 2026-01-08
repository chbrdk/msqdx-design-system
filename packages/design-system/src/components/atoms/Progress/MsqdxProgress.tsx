"use client";

import { Box, styled, alpha, LinearProgress } from "@mui/material";
import { MSQDX_COLORS } from "../../../tokens";
import React from "react";

export interface MsqdxProgressProps {
  value: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  height?: number;
  showValue?: boolean;
}

const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'height' && prop !== 'color' && prop !== 'customColor',
})<{ height: number; customColor: string }>(({ theme, height, customColor }) => ({
  height: height,
  borderRadius: height / 2,
  backgroundColor: alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.05),
  '& .MuiLinearProgress-bar': {
    borderRadius: height / 2,
    background: customColor,
  },
}));

/**
 * MsqdxProgress
 * 
 * Styled progress bar for the msqdx-glass design system.
 */
export const MsqdxProgress = ({ 
  value, 
  label, 
  color = 'primary', 
  height = 6, 
  showValue = false 
}: MsqdxProgressProps) => {
  const themeColor = color === 'primary' ? MSQDX_COLORS.brand.green : 
                    color === 'secondary' ? MSQDX_COLORS.brand.yellow :
                    color === 'success' ? MSQDX_COLORS.status.success :
                    color === 'warning' ? MSQDX_COLORS.status.warning :
                    color === 'error' ? MSQDX_COLORS.status.error :
                    color === 'info' ? MSQDX_COLORS.status.info :
                    MSQDX_COLORS.brand.green;

  return (
    <ProgressContainer>
      {(label || showValue) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && (
            <Box sx={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.8 }}>
              {label}
            </Box>
          )}
          {showValue && (
            <Box sx={{ fontSize: '0.75rem', fontWeight: 800 }}>
              {Math.round(value)}%
            </Box>
          )}
        </Box>
      )}
      <StyledLinearProgress 
        variant="determinate" 
        value={Math.min(100, Math.max(0, value))} 
        height={height}
        customColor={themeColor}
      />
    </ProgressContainer>
  );
};

