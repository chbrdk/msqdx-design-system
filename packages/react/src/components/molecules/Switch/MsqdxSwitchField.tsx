"use client";

import React from "react";
import { Switch, FormControlLabel, FormHelperText, Box, styled } from "@mui/material";
import type { SwitchProps as MuiSwitchProps } from "@mui/material";
import {
  MSQDX_BRAND_COLOR_CSS,
  MSQDX_SPACING,
  MSQDX_TYPOGRAPHY,
  MSQDX_EFFECTS,
  MSQDX_STATUS,
  MSQDX_NEUTRAL,
} from "@msqdx/tokens";
import { reducedMotionStyles } from "../../../utils/atomA11y";

export type SwitchSize = "sm" | "medium" | "lg";

export interface MsqdxSwitchFieldProps extends Omit<MuiSwitchProps, "size"> {
  /** Switch size */
  size?: SwitchSize;
  /** Label next to the switch */
  label?: string;
  /** Label on the left side */
  leftLabel?: boolean;
  /** Helper or error/success text below */
  helperText?: string;
  /** Error message (takes precedence over helperText) */
  error?: string;
  /** Success message (shown when no error) */
  success?: string;
}

const trackHeight = { sm: 16, medium: 24, lg: 32 };
const trackWidth = { sm: 28, medium: 44, lg: 56 };
const thumbSize = { sm: 12, medium: 20, lg: 28 };

const StyledSwitch = styled(Switch, {
  shouldForwardProp: (p) => p !== "switchSize",
})<{ switchSize: SwitchSize }>(({ theme, switchSize }) => {
  const h = trackHeight[switchSize];
  const w = trackWidth[switchSize];
  const thumb = thumbSize[switchSize];
  const translateX = w - thumb - 8;

  return {
    width: w,
    height: h,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: `translateX(${translateX}px)`,
        "& + .MuiSwitch-track": {
          backgroundColor: MSQDX_BRAND_COLOR_CSS,
          opacity: 1,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      width: thumb,
      height: thumb,
      borderRadius: "50%",
      boxShadow: MSQDX_EFFECTS.shadows.sm,
      backgroundColor: theme.palette.background.paper,
      ...reducedMotionStyles,
    },
    "& .MuiSwitch-track": {
      borderRadius: h / 2,
      backgroundColor: MSQDX_NEUTRAL[300],
      opacity: 1,
      transition: MSQDX_EFFECTS.transitions.standard,
      ...reducedMotionStyles,
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      boxShadow: MSQDX_EFFECTS.shadows.focusRing.default,
    },
    "&.Mui-disabled": {
      "& .MuiSwitch-track": {
        backgroundColor: MSQDX_NEUTRAL[200],
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: MSQDX_NEUTRAL[100],
      },
    },
  };
}) as React.ComponentType<any>;

export function MsqdxSwitchField({
  size = "medium",
  label,
  leftLabel = false,
  helperText,
  error,
  success,
  sx,
  ...props
}: MsqdxSwitchFieldProps) {
  const switchSize: SwitchSize = size === "medium" || size === "lg" || size === "sm" ? size : "medium";
  const control = (
    <StyledSwitch
      switchSize={switchSize}
      size={undefined}
      sx={sx}
      {...props}
    />
  );

  const hasLabel = Boolean(label);
  const labelNode = hasLabel ? (
    <Box
      component="span"
      sx={{
        fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
        fontWeight: MSQDX_TYPOGRAPHY.fontWeight.medium,
        marginLeft: leftLabel ? 0 : MSQDX_SPACING.gap.xs,
        marginRight: leftLabel ? MSQDX_SPACING.gap.xs : 0,
      }}
    >
      {label}
    </Box>
  ) : null;

  const helperContent = error || success || helperText;
  const helperColor = error
    ? MSQDX_STATUS.error.base
    : success
      ? MSQDX_STATUS.success.base
      : "text.secondary";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: MSQDX_SPACING.gap.xxs }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: leftLabel ? "row-reverse" : "row",
        }}
      >
        {control}
        {labelNode}
      </Box>
      {helperContent && (
        <FormHelperText
          error={Boolean(error)}
          sx={{
            fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
            color: helperColor,
            margin: 0,
          }}
        >
          {helperContent}
        </FormHelperText>
      )}
    </Box>
  );
}
