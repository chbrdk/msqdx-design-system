"use client";

import { IconButton, styled } from "@mui/material";
import type { IconButtonProps } from "@mui/material";
import {
  MSQDX_NEUTRAL,
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_BUTTON,
} from "@msqdx/tokens";
import { minTouchTarget } from "../../../utils/atomA11y";

export type MsqdxIconButtonSize = "xs" | "small" | "medium" | "large";

export interface MsqdxIconButtonProps extends Omit<IconButtonProps, "size"> {
  /** Size of the circular button (width/height). */
  size?: MsqdxIconButtonSize;
}

const SIZE_PX: Record<MsqdxIconButtonSize, number> = {
  xs: 20,
  small: 32,
  medium: 36,
  large: 44,
};

/** Internal prop to avoid conflict with MUI IconButton's built-in size type. */
type StyledIconButtonProps = IconButtonProps & { sizeVariant?: MsqdxIconButtonSize };

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "sizeVariant",
})<StyledIconButtonProps>(({ theme, sizeVariant }) => {
  const s: MsqdxIconButtonSize = sizeVariant ?? "small";
  const px = SIZE_PX[s];
  const minPx = s === "xs" ? px : Math.max(px, minTouchTarget);
  return {
    width: px,
    height: px,
    minWidth: minPx,
    minHeight: minPx,
    padding: 0,
    borderRadius: "50%",
    backgroundColor: "#fff",
    border: `1px solid ${MSQDX_NEUTRAL[200]}`,
    boxShadow: MSQDX_EFFECTS.shadows.sm,
    color: theme.palette.text.primary,
    transition: MSQDX_BUTTON.transition.default,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
      boxShadow: MSQDX_EFFECTS.shadows.md,
      borderColor: MSQDX_NEUTRAL[300],
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `0 0 0 2px ${MSQDX_COLORS.brand.green}`,
    },
    "&.Mui-disabled": {
      opacity: MSQDX_BUTTON.opacity.disabled,
    },
  };
});

/**
 * Round icon-only button using MSQDX tokens. Use for toolbar triggers, actions, etc.
 */
export function MsqdxIconButton({
  size = "small",
  children,
  ...props
}: MsqdxIconButtonProps) {
  return (
    <StyledIconButton sizeVariant={size} {...props}>
      {children}
    </StyledIconButton>
  );
}
