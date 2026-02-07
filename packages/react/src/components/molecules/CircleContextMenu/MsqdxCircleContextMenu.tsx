"use client";

import React from "react";
import {
  Box,
  IconButton,
  Popover as MuiPopover,
  alpha,
  styled,
} from "@mui/material";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
} from "@msqdx/tokens";
import { MsqdxIcon } from "../../atoms/Icon";

export type CircleContextMenuBrandColor =
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

function getBrandColor(color?: CircleContextMenuBrandColor): string {
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

export interface CircleContextMenuItem {
  /** Unique id. */
  id: string;
  /** Icon name (Material-style, e.g. Add, Edit, Delete). */
  icon: string;
  /** Optional label (e.g. for tooltip or a11y). */
  label?: string;
  /** Called when the item is clicked. Menu closes after. */
  onClick: () => void;
  /** Optional disabled state. */
  disabled?: boolean;
}

export interface MsqdxCircleContextMenuProps {
  /** Menu items shown in a circle around the trigger. */
  items: CircleContextMenuItem[];
  /** Icon name for the trigger button (Material-style). */
  triggerIcon?: string;
  /** Accessible label for the trigger (e.g. "Menü öffnen"). */
  triggerLabel: string;
  /** Radius from center to each item (px). @default 56 */
  radius?: number;
  /** Size of each item button (px). @default 40 */
  itemSize?: number;
  /** Start angle in degrees (0 = right, 90 = bottom). Items placed clockwise. @default 270 (top) */
  startAngleDeg?: number;
  /** Border radius for item buttons from MSQDX_SPACING.borderRadius. @default 'full' */
  itemBorderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Brand color for border and item hover. */
  brandColor?: CircleContextMenuBrandColor;
  /** Border radius for the paper from MSQDX_SPACING.borderRadius. @default 'full' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Close when clicking outside. @default true */
  closeOnBackdropClick?: boolean;
  /** Optional custom trigger element (must forward ref and open the menu). */
  trigger?: React.ReactElement;
  className?: string;
  sx?: Record<string, unknown>;
}

/**
 * MsqdxCircleContextMenu
 *
 * Radiales Kontextmenü: öffnet sich als Kreis um einen Icon-Button (Trigger).
 * Items werden gleichmäßig auf dem Kreis angeordnet. Token-basiert (MSQDX_EFFECTS, MSQDX_SPACING, brandColor).
 */
export const MsqdxCircleContextMenu = ({
  items,
  triggerIcon = "MoreVert",
  triggerLabel,
  radius = 56,
  itemSize = 40,
  startAngleDeg = 270,
  itemBorderRadius = "full",
  brandColor,
  borderRadius: borderRadiusKey = "full",
  closeOnBackdropClick = true,
  trigger: triggerProp,
  className,
  sx,
}: MsqdxCircleContextMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const borderColor = getBrandColor(brandColor);
  const itemRadiusCss = getBorderRadiusCss(itemBorderRadius);
  const paperRadiusCss = getBorderRadiusCss(borderRadiusKey);

  const handleClose = () => setAnchorEl(null);
  const handleTriggerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (open) {
      handleClose();
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleItemClick = (item: CircleContextMenuItem) => {
    if (typeof item.onClick === "function") item.onClick();
    handleClose();
  };

  const safeItems = Array.isArray(items) && items.length > 0 ? items : [];
  const n = safeItems.length;
  const size = 2 * radius + itemSize;
  const center = size / 2;
  const itemHalf = itemSize / 2;
  const edgePadding = MSQDX_SPACING.scale.xs;
  const itemRadius = radius - edgePadding;

  const holeRadius = itemHalf + 4;
  const paperBg = brandColor ? alpha(borderColor, 0.1) : alpha(MSQDX_NEUTRAL[50], 0.98);
  const paperSx = {
    width: size,
    height: size,
    maxWidth: size,
    maxHeight: size,
    borderRadius: paperRadiusCss,
    border: `1px solid ${borderColor}`,
    background: `radial-gradient(circle at 50% 50%, transparent ${holeRadius}px, ${paperBg} ${holeRadius + 1}px)`,
    backgroundColor: paperBg,
    overflow: "visible",
    position: "relative",
    pointerEvents: "none",
    "& > *": { pointerEvents: "none" },
    ...(sx as object),
  };

  const defaultTrigger = (
    <IconButton
      aria-label={open ? "Menü schließen" : triggerLabel}
      aria-expanded={open}
      onClick={handleTriggerClick}
      size="small"
      sx={{
        position: "relative",
        zIndex: MSQDX_EFFECTS.zIndex.popover + 1,
        border: `1px solid ${borderColor}`,
        color: open ? "#fff" : borderColor,
        backgroundColor: open ? borderColor : undefined,
        "&:hover": {
          borderColor: borderColor,
          ...(open
            ? { backgroundColor: borderColor, filter: "brightness(1.08)" }
            : { backgroundColor: alpha(borderColor, 0.08) }),
        },
      }}
    >
      <MsqdxIcon name={triggerIcon} size="sm" weight="medium" decorative />
    </IconButton>
  );

  const triggerElement = triggerProp
    ? React.cloneElement(triggerProp, { onClick: handleTriggerClick } as Partial<unknown>)
    : defaultTrigger;

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        padding: open ? 15 : 0,
        margin: open ? -15 : 0,
        zIndex: open ? MSQDX_EFFECTS.zIndex.popover + 1 : undefined,
      }}
    >
      {triggerElement}
      <StyledPopover
        open={open}
        onClose={closeOnBackdropClick ? handleClose : undefined}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
        marginThreshold={null}
        className={className}
        slotProps={{
          root: { sx: { zIndex: MSQDX_EFFECTS.zIndex.popover } },
          paper: {
            elevation: 0,
            sx: paperSx,
          },
          transition: {
            timeout: parseInt(MSQDX_EFFECTS.duration.standard, 10) || 300,
          },
        }}
      >
        <div
          style={{
            position: "relative",
            width: size,
            height: size,
            pointerEvents: "none",
          }}
          role="menu"
          aria-label={triggerLabel}
        >
          {safeItems.map((item, index) => {
            const angleDeg = startAngleDeg + (360 / n) * index;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = center + itemRadius * Math.cos(angleRad) - itemHalf;
            const y = center + itemRadius * Math.sin(angleRad) - itemHalf;
            return (
              <IconButton
                key={item.id}
                role="menuitem"
                aria-label={item.label ?? item.id}
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                size="small"
                sx={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: itemSize,
                  height: itemSize,
                  minWidth: itemSize,
                  minHeight: itemSize,
                  padding: 0,
                  pointerEvents: "auto",
                  borderRadius: itemRadiusCss,
                  border: "none",
                  backgroundColor: "#fff",
                  color: borderColor,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#fff",
                    filter: "brightness(0.97)",
                    boxShadow: "none",
                  },
                  "&:focus": { boxShadow: "none" },
                  "&:focus-visible": { boxShadow: "none" },
                }}
              >
                <MsqdxIcon name={item.icon} size="sm" weight="light" decorative />
              </IconButton>
            );
          })}
        </div>
      </StyledPopover>
    </Box>
  );
};
