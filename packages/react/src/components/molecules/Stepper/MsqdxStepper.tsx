"use client";

import { Stepper, Step, StepLabel, StepContent, styled, alpha, Box, Typography } from "@mui/material";
import type { StepperProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_SPACING } from "@msqdx/tokens";
import React from "react";

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStep-root': {
    '& .MuiStepLabel-root': {
      '& .MuiStepLabel-label': {
        color: alpha(theme.palette.text.primary, 0.7),
        fontSize: '0.875rem',
        fontWeight: 500,
        '&.Mui-active': {
          color: theme.palette.text.primary,
          fontWeight: 600,
        },
        '&.Mui-completed': {
          color: MSQDX_COLORS.status.success,
          fontWeight: 600,
        },
      },
      '& .MuiStepIcon-root': {
        color: alpha(theme.palette.text.primary, 0.3),
        fontSize: '1.5rem',
        '&.Mui-active': {
          color: MSQDX_COLORS.brand.green,
        },
        '&.Mui-completed': {
          color: MSQDX_COLORS.status.success,
        },
      },
    },
    '& .MuiStepConnector-root': {
      left: 'calc(-50% + 12px)',
      right: 'calc(50% + 12px)',
      '& .MuiStepConnector-line': {
        borderColor: alpha(theme.palette.text.primary, 0.2),
        borderTopWidth: 2,
      },
    },
  },
}));

const StyledStepIcon = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: MSQDX_SPACING.borderRadius.circle,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.text.primary, 0.1),
  color: alpha(theme.palette.text.primary, 0.5),
  fontSize: '0.875rem',
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  '&.active': {
    backgroundColor: MSQDX_COLORS.brand.green,
    color: '#ffffff',
    boxShadow: `0 0 0 4px ${alpha(MSQDX_COLORS.brand.green, 0.16)}`,
  },
  '&.completed': {
    backgroundColor: MSQDX_COLORS.status.success,
    color: '#ffffff',
  },
}));

export interface MsqdxStepperProps extends Omit<StepperProps, 'children'> {
  steps: Array<{
    label: string;
    description?: string;
    icon?: React.ReactNode;
    optional?: boolean;
  }>;
  orientation?: 'horizontal' | 'vertical';
  showConnector?: boolean;
}

/**
 * MsqdxStepper
 * 
 * Styled stepper component matching the glassmorphism design system.
 * Supports horizontal and vertical orientations with custom icons.
 */
export const MsqdxStepper = ({ 
  steps, 
  activeStep = 0,
  orientation = 'horizontal',
  showConnector = true,
  ...props 
}: MsqdxStepperProps) => {
  const CustomStepIcon = ({ active = false, completed = false, icon, stepNumber }: { active?: boolean; completed?: boolean; icon?: React.ReactNode; stepNumber: number }) => {
    if (completed) {
      return (
        <StyledStepIcon className="completed">
          {icon || '✓'}
        </StyledStepIcon>
      );
    }
    if (active) {
      return (
        <StyledStepIcon className="active">
          {icon || stepNumber}
        </StyledStepIcon>
      );
    }
    return (
      <StyledStepIcon>
        {icon || stepNumber}
      </StyledStepIcon>
    );
  };

  return (
    <StyledStepper activeStep={activeStep} orientation={orientation} {...props}>
      {steps.map((step, index) => (
        <Step key={index} completed={index < activeStep}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon 
                {...props} 
                icon={step.icon} 
                stepNumber={index + 1}
              />
            )}
            optional={step.optional ? (
              <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.6 }}>
                Optional
              </Box>
            ) : undefined}
          >
            {step.label}
          </StepLabel>
          {step.description && orientation === 'vertical' && (
            <StepContent>
              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {step.description}
                </Typography>
              </Box>
            </StepContent>
          )}
        </Step>
      ))}
    </StyledStepper>
  );
};

