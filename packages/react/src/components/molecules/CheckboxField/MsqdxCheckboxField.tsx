"use client";

import { Checkbox, FormControlLabel, FormHelperText, InputLabel, FormControl, FormGroup, styled, alpha } from "@mui/material";
import type { FormGroupProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_INPUT } from "@msqdx/tokens";
import React from "react";

export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green' | 'black';

export interface MsqdxCheckboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface MsqdxCheckboxFieldProps extends Omit<FormGroupProps, 'children' | 'onChange'> {
  label: string;
  options: MsqdxCheckboxOption[];
  errorText?: string;
  required?: boolean;
  /** Label color (brand). @default green tint */
  labelColor?: BrandColor;
  row?: boolean;
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  /**
   * Called when the checkbox group receives focus
   */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /**
   * Called when the checkbox group loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /**
   * Called when mouse enters the checkbox group
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Called when mouse leaves the checkbox group
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Called when a key is pressed down
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * Called when a key is released
   */
  onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const StyledFormControl = styled(FormControl)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: MSQDX_INPUT.label.gap,
  width: "100%",
}));

const StyledCheckbox = styled(Checkbox)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  padding: '8px',
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
    color: disabled ? MSQDX_INPUT.border.disabled : MSQDX_INPUT.border.default,
    transition: `color ${MSQDX_INPUT.transition}`,
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 0.05),
    '& .MuiSvgIcon-root': {
      color: disabled ? MSQDX_INPUT.border.disabled : MSQDX_COLORS.brand.green,
    },
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      color: MSQDX_COLORS.brand.green,
    },
  },
  '&.Mui-disabled': {
    '& .MuiSvgIcon-root': {
      color: MSQDX_INPUT.border.disabled,
    },
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  marginRight: 0,
  '& .MuiFormControlLabel-label': {
    fontSize: MSQDX_INPUT.size.medium.fontSize,
    fontFamily: MSQDX_INPUT.fontFamily,
    paddingLeft: theme.spacing(1),
  },
}));

/**
 * MsqdxCheckboxField
 *
 * Checkbox group for the msqdx-glass design system.
 * Handles all states: Default, Hover, Focus, Error, and Disabled.
 */
const getLabelColor = (labelColor?: BrandColor) => {
  if (!labelColor) return alpha(MSQDX_COLORS.brand.green, 0.8);
  if (labelColor === 'black') return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[labelColor];
};

export const MsqdxCheckboxField = ({
  label,
  options,
  errorText,
  required,
  labelColor,
  row = false,
  value = [],
  onChange,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  ...props
}: MsqdxCheckboxFieldProps) => {
  const handleChange = (optionValue: string | number) => {
    if (!onChange) return;
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <StyledFormControl error={!!errorText}>
      <InputLabel
        sx={{
          position: 'static',
          transform: 'none',
          fontSize: MSQDX_INPUT.label.fontSize,
          fontFamily: MSQDX_INPUT.label.fontFamily,
          fontWeight: MSQDX_INPUT.fontWeight.label,
          textTransform: MSQDX_INPUT.label.textTransform,
          letterSpacing: MSQDX_INPUT.label.letterSpacing,
          color: getLabelColor(labelColor),
          mb: 0.5,
          ml: 0.5,
        }}
      >
        {label} {required && '*'}
      </InputLabel>
      
      <FormGroup
        row={row}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        {...props}
      >
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            control={
              <StyledCheckbox
                checked={value.includes(option.value)}
                onChange={() => handleChange(option.value)}
                disabled={option.disabled}
              />
            }
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </FormGroup>
      
      {errorText && (
        <FormHelperText
          error
          sx={{
            fontSize: MSQDX_INPUT.helper.fontSize,
            fontFamily: MSQDX_INPUT.fontFamily,
            fontWeight: MSQDX_INPUT.fontWeight.helper,
            marginTop: MSQDX_INPUT.helper.marginTop,
            ml: 0.5,
          }}
        >
          {errorText}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};
