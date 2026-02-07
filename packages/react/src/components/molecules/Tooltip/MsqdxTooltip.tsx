"use client";

import React from "react";
import { Tooltip as MuiTooltip, alpha, styled } from "@mui/material";
import type { PopperPlacementType } from "@mui/material/Popper";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";

export type TooltipBrandColor =
  | "purple"
  | "yellow"
  | "pink"
  | "orange"
  | "green"
  | "black";

export type TooltipPlacement = PopperPlacementType;

function getBorderRadiusCss(
  key: keyof typeof MSQDX_SPACING.borderRadius
): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

function getBrandColor(color?: TooltipBrandColor): string {
  if (!color) return MSQDX_NEUTRAL[200];
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

const StyledTooltip = styled(MuiTooltip)({});

export interface MsqdxTooltipProps {
  /** Tooltip content (shown on hover/focus). */
  title: React.ReactNode;
  /** Trigger element (single child). */
  children: React.ReactElement<unknown>;
  /** Placement relative to trigger. @default 'top' */
  placement?: TooltipPlacement;
  /** Border radius from MSQDX_SPACING.borderRadius. @default 'lg' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Brand color for border and arrow. */
  brandColor?: TooltipBrandColor;
  /** Show arrow pointing to trigger. @default false */
  arrow?: boolean;
  /** Delay before show (ms). @default 100 */
  enterDelay?: number;
  /** Delay before hide (ms). @default 0 */
  leaveDelay?: number;
  /** Controlled open state. */
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent | Event) => void;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
  disableInteractive?: boolean;
  describeChild?: boolean;
  id?: string;
  className?: string;
  sx?: Record<string, unknown>;
}

/**
 * MsqdxTooltip
 *
 * Tooltip mit Token-Styling (MSQDX_EFFECTS, MSQDX_SPACING, MSQDX_TYPOGRAPHY, brandColor).
 * zIndex.tooltip, Schatten, Border-Radius, Übergänge und Typo aus Tokens.
 */
export const MsqdxTooltip = ({
  title,
  children,
  placement = "top",
  borderRadius: borderRadiusKey = "lg",
  brandColor,
  arrow = false,
  enterDelay = 100,
  leaveDelay = 0,
  open,
  onOpen,
  onClose,
  disableHoverListener,
  disableFocusListener,
  disableTouchListener,
  disableInteractive,
  describeChild,
  id,
  className,
  sx,
}: MsqdxTooltipProps) => {
  const borderRadius = getBorderRadiusCss(borderRadiusKey);
  const borderColor = getBrandColor(brandColor);

  const transitionDuration =
    parseInt(MSQDX_EFFECTS.duration.standard, 10) || 300;

  const tooltipSx = {
    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
    fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
    fontWeight: MSQDX_TYPOGRAPHY.fontWeight.regular,
    lineHeight: MSQDX_TYPOGRAPHY.lineHeight.normal,
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.normal,
    padding: `${MSQDX_SPACING.scale.sm} ${MSQDX_SPACING.scale.md}`,
    borderRadius,
    border: `1px solid ${borderColor}`,
    backgroundColor: alpha(MSQDX_NEUTRAL[50], 0.98),
    color: MSQDX_NEUTRAL[900],
    boxShadow: MSQDX_EFFECTS.shadows.lg,
    transition: `box-shadow ${MSQDX_EFFECTS.transitions.standard}, border-color ${MSQDX_EFFECTS.transitions.standard}`,
    ...(sx as object),
  };

  return (
    <StyledTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableHoverListener={disableHoverListener}
      disableFocusListener={disableFocusListener}
      disableTouchListener={disableTouchListener}
      disableInteractive={disableInteractive}
      describeChild={describeChild}
      id={id}
      className={className}
      slotProps={{
        popper: {
          sx: { zIndex: MSQDX_EFFECTS.zIndex.tooltip },
        },
        tooltip: {
          sx: tooltipSx,
        },
        transition: {
          timeout: transitionDuration,
        },
        ...(arrow && {
          arrow: {
            sx: {
              "&::before": {
                border: `1px solid ${borderColor}`,
                backgroundColor: alpha(MSQDX_NEUTRAL[50], 0.98),
              },
            },
          },
        }),
      }}
    >
      {children}
    </StyledTooltip>
  );
};
