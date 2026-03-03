"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import { MSQDX_AVATAR, MSQDX_SPACING, MSQDX_TYPOGRAPHY, MSQDX_EFFECTS, MSQDX_STATUS } from "@msqdx/tokens";
import { MsqdxAvatar } from "../Avatar/MsqdxAvatar";

export type UserBadgeSize = "xs" | "sm" | "md" | "lg";
export type UserBadgeState = "default" | "presenting" | "inactive";

export interface MsqdxUserBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatarUrl?: string;
  /** Optional ring/accent color (hex). Falls back to brand if not provided. */
  colorToken?: string;
  size?: UserBadgeSize;
  state?: UserBadgeState;
  /** If provided, overrides state to inactive after 5 min */
  lastActiveAt?: string;
  showTooltip?: boolean;
}

const avatarSizeMap: Record<UserBadgeSize, "xs" | "sm" | "md" | "lg"> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
};

const wrapperSizeMap: Record<UserBadgeSize, number> = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
};

const StyledWrapper = styled(Box, {
  shouldForwardProp: (p) => p !== "wrapperSize" && p !== "effectiveState" && p !== "colorToken",
})<{
  wrapperSize: number;
  effectiveState: UserBadgeState;
  colorToken: string;
}>(({ wrapperSize, effectiveState, colorToken }) => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: wrapperSize,
  height: wrapperSize,
  borderRadius: MSQDX_AVATAR.borderRadius.circle,
  border: `${MSQDX_EFFECTS.borderWidth.medium}px solid ${colorToken}`,
  boxShadow: MSQDX_EFFECTS.shadows.sm,
  overflow: "hidden",
  ...(effectiveState === "inactive" && {
    opacity: 0.6,
    filter: "grayscale(1)",
  }),
}));

const LiveBadge = styled(Box)(() => ({
  position: "absolute",
  top: -8,
  right: -8,
  backgroundColor: MSQDX_STATUS.error.base,
  color: "#fff",
  fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.semibold,
  padding: "2px 4px",
  borderRadius: MSQDX_SPACING.borderRadius.xs,
  boxShadow: MSQDX_EFFECTS.shadows.sm,
  pointerEvents: "none",
}));

const TooltipBox = styled(Box)(() => ({
  position: "absolute",
  top: 36,
  left: "50%",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap" as const,
  backgroundColor: "rgba(255,255,255,0.95)",
  border: `1px solid ${MSQDX_AVATAR.border.color}`,
  borderRadius: MSQDX_SPACING.borderRadius.xs,
  padding: `${MSQDX_SPACING.padding.xxs}px ${MSQDX_SPACING.padding.xs}px`,
  fontSize: "11px",
  boxShadow: MSQDX_EFFECTS.shadows.md,
  pointerEvents: "none",
  zIndex: 1,
}));

const INACTIVE_THRESHOLD_MS = 5 * 60 * 1000;

export function MsqdxUserBadge({
  name,
  avatarUrl,
  colorToken = MSQDX_STATUS.info.base,
  size = "md",
  state = "default",
  lastActiveAt,
  showTooltip = true,
  className,
  ...rest
}: MsqdxUserBadgeProps) {
  const [hover, setHover] = React.useState(false);

  const isInactiveTimed = React.useMemo(() => {
    if (!lastActiveAt) return false;
    const diff = Date.now() - new Date(lastActiveAt).getTime();
    return diff >= INACTIVE_THRESHOLD_MS;
  }, [lastActiveAt]);

  const effectiveState: UserBadgeState = isInactiveTimed ? "inactive" : state;
  const wrapperSize = wrapperSizeMap[size];
  const avatarSize = avatarSizeMap[size];
  const initials = (name?.[0] || "U").toUpperCase();

  return (
    <Box
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={name}
      sx={{ position: "relative", display: "inline-flex" }}
      {...rest}
    >
      <StyledWrapper
        wrapperSize={wrapperSize}
        effectiveState={effectiveState}
        colorToken={colorToken}
      >
        <MsqdxAvatar
          size={avatarSize}
          variant="circle"
          src={avatarUrl}
          fallback={initials}
          sx={{
            width: wrapperSize,
            height: wrapperSize,
            fontSize: wrapperSize <= 24 ? "0.625rem" : "0.75rem",
          }}
        />
      </StyledWrapper>

      {effectiveState === "presenting" && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: MSQDX_AVATAR.borderRadius.circle,
            boxShadow: `0 0 0 2px ${colorToken}33`,
            border: `2px solid ${colorToken}`,
            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            "@keyframes ping": {
              "75%, 100%": { transform: "scale(1.2)", opacity: 0 },
            },
            pointerEvents: "none",
          }}
        />
      )}

      {effectiveState === "presenting" && <LiveBadge>LIVE</LiveBadge>}

      {showTooltip && hover && <TooltipBox>{name}</TooltipBox>}
    </Box>
  );
}
