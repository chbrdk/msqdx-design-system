"use client";

import React from "react";
import { Slider as MuiSlider, styled, alpha } from "@mui/material";
import type { SliderProps as MuiSliderProps } from "@mui/material/Slider";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
} from "@msqdx/tokens";

export type SliderBrandColor =
  | "purple"
  | "yellow"
  | "pink"
  | "orange"
  | "green"
  | "black";

function getBrandColor(color?: SliderBrandColor): string {
  if (!color) return MSQDX_COLORS.brand.green;
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

function getBorderRadiusCss(
  key: keyof typeof MSQDX_SPACING.borderRadius
): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

export interface MsqdxSliderProps extends Omit<MuiSliderProps, "color"> {
  /** Brand color for track and thumb. @default 'green' */
  brandColor?: SliderBrandColor;
  /** Track style: normal (filled to value), inverted, or hidden. @default 'normal' */
  track?: "normal" | "inverted" | false;
  /** Size. @default 'medium' */
  size?: "small" | "medium";
  /** Orientation. @default 'horizontal' */
  orientation?: "horizontal" | "vertical";
}

const StyledSlider = styled(MuiSlider, {
  shouldForwardProp: (prop) => prop !== "brandColor" && prop !== "size",
})<{
  brandColor?: SliderBrandColor;
  size?: "small" | "medium";
}>(({ theme, brandColor, size }) => {
  const color = getBrandColor(brandColor);
  const isLight =
    brandColor === "yellow" || brandColor === "green" || !brandColor;
  const thumbBorder = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.2)";
  const railHeight = size === "small" ? 4 : 6;
  const thumbSize = size === "small" ? 14 : 18;

  return {
    color,
    padding: 0,
    backgroundColor: alpha(color, 0.12),
    "--Slider-trackHeight": `${railHeight}px`,
    "--Slider-thumbSize": `${thumbSize}px`,
    "--Slider-thumbBorder": thumbBorder,
    borderRadius: getBorderRadiusCss("full"),
    transition: `box-shadow ${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}`,

    "& .MuiSlider-rail": {
      height: railHeight,
      width: railHeight,
      borderRadius: getBorderRadiusCss("full"),
      backgroundColor: alpha(color, 0.25),
      padding: 0,
      opacity: 1,
    },
    "& .MuiSlider-track": {
      height: railHeight,
      width: railHeight,
      borderRadius: getBorderRadiusCss("full"),
      backgroundColor: color,
      border: `1px solid ${color}`,
    },
    "& .MuiSlider-thumb": {
      width: thumbSize,
      height: thumbSize,
      boxShadow: MSQDX_EFFECTS.shadows.sm,
      border: `2px solid ${thumbBorder}`,
      backgroundColor: "#fff",
      "&::before": {
        boxShadow: "none",
      },
      "&:hover, &.Mui-focusVisible": {
        boxShadow: `0 0 0 4px ${alpha(color, 0.25)}`,
      },
      "&.Mui-active": {
        boxShadow: MSQDX_EFFECTS.shadows.md,
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: 600,
      backgroundColor: color,
      borderRadius: getBorderRadiusCss("xs"),
      "&::before": {
        borderBottomColor: color,
      },
    },
    "& .MuiSlider-mark": {
      width: 2,
      height: 2,
      borderRadius: "50%",
      backgroundColor: MSQDX_NEUTRAL[400],
    },
    "& .MuiSlider-markActive": {
      backgroundColor: color,
    },
    "& .MuiSlider-markLabel": {
      fontSize: theme.typography.pxToRem(11),
      color: theme.palette.text.secondary,
      top: "auto",
      ...(theme.direction === "rtl" ? { left: "auto" } : {}),
    },
    "&.Mui-disabled": {
      "& .MuiSlider-rail": {
        backgroundColor: MSQDX_NEUTRAL[200],
      },
      "& .MuiSlider-track": {
        backgroundColor: MSQDX_NEUTRAL[300],
      },
      "& .MuiSlider-thumb": {
        backgroundColor: MSQDX_NEUTRAL[300],
        borderColor: MSQDX_NEUTRAL[200],
      },
    },
  };
});

/**
 * MsqdxSlider
 *
 * Horizontal and vertical slider with token-based styling. Supports brand colors,
 * marks, value label, and track variants (normal / inverted / hidden).
 */
export const MsqdxSlider = React.forwardRef<HTMLSpanElement, MsqdxSliderProps>(
  (
    {
      brandColor = "green",
      track = "normal",
      size = "medium",
      orientation = "horizontal",
      valueLabelDisplay = "auto",
      min = 0,
      max = 100,
      step = 1,
      marks = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <StyledSlider
        ref={ref}
        brandColor={brandColor}
        track={track}
        size={size}
        orientation={orientation}
        valueLabelDisplay={valueLabelDisplay}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

MsqdxSlider.displayName = "MsqdxSlider";
