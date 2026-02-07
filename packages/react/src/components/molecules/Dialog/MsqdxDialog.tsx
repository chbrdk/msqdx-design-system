"use client";

import React from "react";
import {
  Box,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  alpha,
  styled,
} from "@mui/material";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";

export type DialogSize = "sm" | "md" | "lg" | "full";
export type DialogBrandColor =
  | "purple"
  | "yellow"
  | "pink"
  | "orange"
  | "green"
  | "black";

const sizeToMaxWidth: Record<DialogSize, number | string> = {
  sm: 400,
  md: 560,
  lg: 720,
  full: "100%",
};

function getBorderRadiusCss(
  key: keyof typeof MSQDX_SPACING.borderRadius
): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

function getBrandColor(color?: DialogBrandColor): string {
  if (!color) return MSQDX_NEUTRAL[200];
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

const StyledDialog = styled(MuiDialog)({
  "& .MuiDialog-container": {
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiDialog-paper": {
    margin: MSQDX_SPACING.scale.md,
    maxHeight: `calc(100vh - ${MSQDX_SPACING.scale.md * 2}px)`,
    boxShadow: MSQDX_EFFECTS.shadows.xl,
    transition: `box-shadow ${MSQDX_EFFECTS.transitions.standard}, border-color ${MSQDX_EFFECTS.transitions.standard}`,
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
  fontSize: MSQDX_TYPOGRAPHY.fontSize.lg,
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.semibold,
  letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.normal,
  paddingTop: MSQDX_SPACING.scale.md,
  paddingBottom: MSQDX_SPACING.scale.sm,
  paddingLeft: MSQDX_SPACING.scale.lg,
  paddingRight: MSQDX_SPACING.scale.xl,
  borderBottom: `1px solid ${MSQDX_NEUTRAL[200]}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: MSQDX_SPACING.scale.xs,
});

const StyledDialogContent = styled(DialogContent)({
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
  fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
  lineHeight: MSQDX_TYPOGRAPHY.lineHeight.relaxed,
  padding: MSQDX_SPACING.scale.lg,
  color: "inherit",
});

const StyledDialogActions = styled(DialogActions)({
  padding: MSQDX_SPACING.scale.md,
  paddingTop: MSQDX_SPACING.scale.sm,
  borderTop: `1px solid ${MSQDX_NEUTRAL[200]}`,
  gap: MSQDX_SPACING.scale.xs,
});

export interface MsqdxDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog should close (backdrop click, close button, escape). */
  onClose: () => void;
  /** Optional title. */
  title?: React.ReactNode;
  /** Main content. */
  children: React.ReactNode;
  /** Optional footer actions (e.g. buttons). */
  actions?: React.ReactNode;
  /** Size (max-width). @default 'md' */
  size?: DialogSize;
  /** Border radius from MSQDX_SPACING.borderRadius (e.g. xs, sm, md, lg, button). @default 'lg' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Brand color for paper border and title accent. */
  brandColor?: DialogBrandColor;
  /** Show close (X) button in title. @default true when title is set */
  showCloseButton?: boolean;
  /** Close when backdrop is clicked. @default true */
  closeOnBackdropClick?: boolean;
  /** Full-screen dialog. @default false */
  fullScreen?: boolean;
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
}

/**
 * MsqdxDialog
 *
 * Modal/Dialog mit Token-Styling (MSQDX_EFFECTS, MSQDX_SPACING, MSQDX_TYPOGRAPHY, brandColor).
 * Backdrop, z-index, Schatten, Border-Radius und Übergänge aus Tokens.
 */
export const MsqdxDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  size = "md",
  borderRadius: borderRadiusKey = "lg",
  brandColor,
  showCloseButton = title != null,
  closeOnBackdropClick = true,
  fullScreen = false,
  disableScrollLock = false,
  id,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  className,
  sx,
}: MsqdxDialogProps) => {
  const borderRadius = getBorderRadiusCss(borderRadiusKey);
  const borderColor = getBrandColor(brandColor);
  const maxWidth = fullScreen ? "100%" : sizeToMaxWidth[size];

  const paperSx = {
    borderRadius: fullScreen ? 0 : borderRadius,
    border: `1px solid ${borderColor}`,
    maxWidth: fullScreen ? "100%" : maxWidth,
    width: fullScreen ? "100%" : undefined,
    minWidth: fullScreen ? "100%" : undefined,
    maxHeight: fullScreen ? "100vh" : undefined,
    ...(sx as object),
  };

  const backdropSx = {
    backgroundColor: `rgba(0, 0, 0, ${MSQDX_EFFECTS.backdrop.opacity})`,
    backdropFilter: `blur(${MSQDX_EFFECTS.backdrop.blur})`,
    WebkitBackdropFilter: `blur(${MSQDX_EFFECTS.backdrop.blur})`,
  };

  return (
    <StyledDialog
      open={open}
      onClose={closeOnBackdropClick ? onClose : undefined}
      fullScreen={fullScreen}
      disableScrollLock={disableScrollLock}
      className={className}
      slotProps={{
        root: {
          sx: { zIndex: MSQDX_EFFECTS.zIndex.modal },
        },
        backdrop: {
          sx: backdropSx,
          transitionDuration: parseInt(MSQDX_EFFECTS.duration.standard, 10) || 300,
        },
        paper: {
          elevation: 0,
          sx: paperSx,
        },
        transition: {
          timeout: parseInt(MSQDX_EFFECTS.duration.slow, 10) || 420,
        },
      }}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      id={id}
    >
      {title != null && (
        <StyledDialogTitle
          id={ariaLabelledBy}
          sx={brandColor ? { borderBottomColor: alpha(borderColor, 0.3) } : undefined}
        >
          <span>{title}</span>
          {showCloseButton && (
            <IconButton
              aria-label="Schließen"
              onClick={onClose}
              size="small"
              sx={{
                color: "inherit",
                "&:hover": { backgroundColor: alpha(borderColor, 0.08) },
              }}
            >
              <MsqdxIcon name="Close" size="sm" decorative />
            </IconButton>
          )}
        </StyledDialogTitle>
      )}
      {title == null && showCloseButton && (
        <Box
          component="div"
          sx={{
            position: "absolute",
            top: MSQDX_SPACING.scale.sm,
            right: MSQDX_SPACING.scale.sm,
            zIndex: 1,
          }}
        >
          <IconButton
            aria-label="Schließen"
            onClick={onClose}
            size="small"
            sx={{
              color: "inherit",
              "&:hover": {
                backgroundColor: alpha(getBrandColor(brandColor), 0.08),
              },
            }}
          >
            <MsqdxIcon name="Close" size="sm" decorative />
          </IconButton>
        </Box>
      )}
      <StyledDialogContent id={ariaDescribedBy}>{children}</StyledDialogContent>
      {actions != null && (
        <StyledDialogActions
          sx={{
            ...(brandColor ? { borderTopColor: alpha(borderColor, 0.3) } : {}),
            "& .MuiButton-root": {
              borderRadius: getBorderRadiusCss("button"),
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
          }}
        >
          {actions}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
};
