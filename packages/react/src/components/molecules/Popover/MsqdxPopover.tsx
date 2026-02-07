"use client";

import React from "react";
import { Popover as MuiPopover, alpha, styled } from "@mui/material";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
} from "@msqdx/tokens";

export type PopoverBrandColor =
  | "purple"
  | "yellow"
  | "pink"
  | "orange"
  | "green"
  | "black";

function getBorderRadiusCss(
  key: keyof typeof MSQDX_SPACING.borderRadius
): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

function getBrandColor(color?: PopoverBrandColor): string {
  if (!color) return MSQDX_NEUTRAL[200];
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

const StyledPopover = styled(MuiPopover)({
  "& .MuiPopover-paper": {
    boxShadow: MSQDX_EFFECTS.shadows.lg,
    transition: `box-shadow ${MSQDX_EFFECTS.transitions.standard}, border-color ${MSQDX_EFFECTS.transitions.standard}`,
  },
});

export interface MsqdxPopoverProps {
  /** Whether the popover is open. */
  open: boolean;
  /** Called when the popover should close. */
  onClose: () => void;
  /** Anchor element (trigger). */
  anchorEl: HTMLElement | null;
  /** Main content. */
  children: React.ReactNode;
  /** Anchor origin (where the popover attaches to the anchor). @default { vertical: 'bottom', horizontal: 'left' } */
  anchorOrigin?: { vertical: "top" | "bottom"; horizontal: "left" | "center" | "right" };
  /** Transform origin (where the popover grows from). @default { vertical: 'top', horizontal: 'left' } */
  transformOrigin?: { vertical: "top" | "bottom"; horizontal: "left" | "center" | "right" };
  /** Border radius from MSQDX_SPACING.borderRadius. @default 'lg' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Brand color for paper border. */
  brandColor?: PopoverBrandColor;
  /** Close when backdrop (outside) is clicked. @default true */
  closeOnBackdropClick?: boolean;
  /** Disable scroll lock. @default false */
  disableScrollLock?: boolean;
  /** Optional id for aria. */
  id?: string;
  /** Optional aria-labelledby. */
  "aria-labelledby"?: string;
  /** Optional aria-describedby. */
  "aria-describedby"?: string;
  className?: string;
  sx?: Record<string, unknown>;
  /** Paper min/max width (optional). */
  minWidth?: number | string;
  maxWidth?: number | string;
}

/**
 * MsqdxPopover
 *
 * Popover/Popup mit Token-Styling (MSQDX_EFFECTS, MSQDX_SPACING, brandColor).
 * Z-index, Schatten, Border-Radius und Übergänge aus Tokens.
 */
export const MsqdxPopover = ({
  open,
  onClose,
  anchorEl,
  children,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  transformOrigin = { vertical: "top", horizontal: "left" },
  borderRadius: borderRadiusKey = "lg",
  brandColor,
  closeOnBackdropClick = true,
  disableScrollLock = false,
  id,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  className,
  sx,
  minWidth,
  maxWidth,
}: MsqdxPopoverProps) => {
  const borderRadius = getBorderRadiusCss(borderRadiusKey);
  const borderColor = getBrandColor(brandColor);

  const buttonRadius = getBorderRadiusCss("button");
  const paperSx = {
    borderRadius,
    border: `1px solid ${borderColor}`,
    marginTop: MSQDX_SPACING.scale.xs,
    marginBottom: MSQDX_SPACING.scale.xs,
    ...(minWidth != null && { minWidth }),
    ...(maxWidth != null && { maxWidth }),
    "& .MuiButton-root": {
      borderRadius: buttonRadius,
      boxShadow: "none",
      "&:hover": { boxShadow: "none" },
      "&:focus": { boxShadow: "none" },
      "&:focus-visible": { boxShadow: "none" },
      ...(brandColor && {
        borderColor: borderColor,
        color: borderColor,
        "&:hover": {
          borderColor: borderColor,
          backgroundColor: alpha(borderColor, 0.08),
        },
        "&.MuiButton-contained": {
          backgroundColor: borderColor,
          color: "#fff",
          border: "none",
          "&:hover": {
            backgroundColor: borderColor,
            filter: "brightness(1.1)",
          },
        },
      }),
    },
    ...(sx as object),
  };

  return (
    <StyledPopover
      open={open}
      onClose={closeOnBackdropClick ? onClose : undefined}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      disableScrollLock={disableScrollLock}
      className={className}
      slotProps={{
        root: {
          sx: { zIndex: MSQDX_EFFECTS.zIndex.popover },
        },
        paper: {
          elevation: 0,
          sx: paperSx,
        },
        transition: {
          timeout: parseInt(MSQDX_EFFECTS.duration.standard, 10) || 300,
        },
      }}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      id={id}
    >
      {children}
    </StyledPopover>
  );
};
