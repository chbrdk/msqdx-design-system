"use client";

import React from "react";
import { Snackbar as MuiSnackbar, alpha, styled } from "@mui/material";
import type { SnackbarOrigin } from "@mui/material/Snackbar";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";

export type SnackbarBrandColor =
  | "purple"
  | "yellow"
  | "pink"
  | "orange"
  | "green"
  | "black";

export type SnackbarAnchorOrigin = SnackbarOrigin;
export type SnackbarVariant = "outlined" | "filled";

function getBorderRadiusCss(
  key: keyof typeof MSQDX_SPACING.borderRadius
): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

function getBrandColor(color?: SnackbarBrandColor): string {
  if (!color) return MSQDX_NEUTRAL[200];
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

const StyledSnackbar = styled(MuiSnackbar)({});

export interface MsqdxSnackbarProps {
  /** Whether the snackbar is visible. */
  open: boolean;
  /** Called when the snackbar should close (timeout, clickaway, escape). */
  onClose: (event: React.SyntheticEvent | Event, reason: string) => void;
  /** Message text (uses mono/secondary font token). */
  message?: React.ReactNode;
  /** Optional action (e.g. undo button), rendered after message. */
  action?: React.ReactNode;
  /** Position on screen. @default { vertical: 'bottom', horizontal: 'left' } */
  anchorOrigin?: SnackbarAnchorOrigin;
  /** Auto-hide after this many ms. null = no auto-hide. @default 6000 */
  autoHideDuration?: number | null;
  /** Resume hide delay after user interaction (ms). */
  resumeHideDuration?: number;
  /** Border radius from MSQDX_SPACING.borderRadius. @default 'lg' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Visual variant: outlined = border + light bg, filled = whole bar in brandColor. @default 'outlined' */
  variant?: SnackbarVariant;
  /** Brand color for border/action (outlined) or background (filled). */
  brandColor?: SnackbarBrandColor;
  /** Keep autoHideDuration running when window loses focus. @default false */
  disableWindowBlurListener?: boolean;
  /** ARIA role for content. @default 'alert' */
  role?: "alert" | "status" | "none";
  /** Optional id. */
  id?: string;
  className?: string;
  sx?: Record<string, unknown>;
}

/**
 * MsqdxSnackbar
 *
 * Snackbar mit Token-Styling: MSQDX_EFFECTS, MSQDX_SPACING, MSQDX_TYPOGRAPHY (mono font),
 * brandColor. zIndex.fixed, Schatten, Border-Radius, Übergänge aus Tokens.
 */
export const MsqdxSnackbar = ({
  open,
  onClose,
  message,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  autoHideDuration = 6000,
  resumeHideDuration,
  borderRadius: borderRadiusKey = "lg",
  variant = "outlined",
  brandColor,
  disableWindowBlurListener = false,
  role = "alert",
  id,
  className,
  sx,
}: MsqdxSnackbarProps) => {
  const borderRadius = getBorderRadiusCss(borderRadiusKey);
  const brandColorValue = getBrandColor(brandColor);
  const buttonRadius = getBorderRadiusCss("button");
  const transitionDuration =
    parseInt(MSQDX_EFFECTS.duration.standard, 10) || 300;
  const isFilled = variant === "filled";

  const contentSx = {
    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.secondary,
    fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
    fontWeight: MSQDX_TYPOGRAPHY.fontWeight.regular,
    lineHeight: MSQDX_TYPOGRAPHY.lineHeight.normal,
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.normal,
    padding: `${MSQDX_SPACING.scale.sm} ${MSQDX_SPACING.scale.md}`,
    borderRadius,
    border: `1px solid ${isFilled && brandColor ? brandColorValue : brandColorValue}`,
    backgroundColor: isFilled && brandColor ? brandColorValue : alpha(MSQDX_NEUTRAL[50], 0.98),
    color: isFilled && brandColor ? "#fff" : MSQDX_NEUTRAL[900],
    boxShadow: MSQDX_EFFECTS.shadows.lg,
    transition: `box-shadow ${MSQDX_EFFECTS.transitions.standard}, border-color ${MSQDX_EFFECTS.transitions.standard}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    "& .MuiSnackbarContent-message": {
      fontFamily: MSQDX_TYPOGRAPHY.fontFamily.secondary,
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
      padding: 0,
      width: "100%",
    },
    "& .MuiSnackbarContent-action": {
      paddingLeft: 0,
      marginTop: MSQDX_SPACING.scale.sm,
      marginRight: MSQDX_SPACING.scale.sm,
      marginBottom: MSQDX_SPACING.scale.xs,
      alignSelf: "flex-end",
    },
    "& .MuiButton-root": {
      borderRadius: buttonRadius,
      boxShadow: "none",
      "&:hover": { boxShadow: "none" },
      "&:focus": { boxShadow: "none" },
      "&:focus-visible": { boxShadow: "none" },
      ...(isFilled && brandColor
        ? {
            borderColor: "rgba(255,255,255,0.8)",
            color: "#fff",
            "&:hover": {
              borderColor: "#fff",
              backgroundColor: "rgba(255,255,255,0.15)",
            },
            "&.MuiButton-contained": {
              backgroundColor: "#fff",
              color: brandColorValue,
              border: "none",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
                color: brandColorValue,
              },
            },
          }
        : brandColor && {
            borderColor: brandColorValue,
            color: brandColorValue,
            "&:hover": {
              borderColor: brandColorValue,
              backgroundColor: alpha(brandColorValue, 0.08),
            },
            "&.MuiButton-contained": {
              backgroundColor: brandColorValue,
              color: "#fff",
              border: "none",
              "&:hover": {
                backgroundColor: brandColorValue,
                filter: "brightness(1.1)",
              },
            },
          }),
    },
    ...(sx as object),
  };

  const rootSx = {
    zIndex: MSQDX_EFFECTS.zIndex.fixed,
  };

  return (
    <StyledSnackbar
      open={open}
      onClose={onClose}
      message={message}
      action={action}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      resumeHideDuration={resumeHideDuration}
      disableWindowBlurListener={disableWindowBlurListener}
      id={id}
      className={className}
      slotProps={{
        root: { sx: rootSx },
        content: {
          role,
          sx: contentSx,
        },
        transition: { timeout: transitionDuration },
      }}
    />
  );
};
