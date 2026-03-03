"use client";

import React from "react";
import { Box } from "@mui/material";
import type { Presence } from "../../../types/prismion";
import { MsqdxUserBadge } from "../../atoms/UserBadge/MsqdxUserBadge";
import { MSQDX_NEUTRAL, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";

export interface MsqdxPresenceListProps {
  presences: Presence[];
  maxVisible?: number;
  className?: string;
  presenterUserId?: string | null;
  onJumpToCursor?: (userId: string, cursor: { x: number; y: number }) => void;
}

export function MsqdxPresenceList({
  presences,
  maxVisible = 5,
  className,
  presenterUserId,
  onJumpToCursor,
}: MsqdxPresenceListProps) {
  const uniqueByUser = Array.from(
    new Map(presences.map((p) => [p.userId, p])).values()
  ).sort(
    (a, b) =>
      new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime()
  );
  const visible = uniqueByUser.slice(0, maxVisible);
  const extra = uniqueByUser.length - visible.length;

  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        alignItems: "center",
        pointerEvents: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginLeft: 0,
          "& > *": { marginLeft: -8 },
          "& > *:first-of-type": { marginLeft: 0 },
        }}
      >
        {visible.map((p) => (
          <Box
            key={p.userId}
            onClick={() => onJumpToCursor?.(p.userId, p.cursor)}
            title={`Jump to ${p.userId}`}
            sx={{
              cursor: onJumpToCursor ? "pointer" : "default",
              border: `2px solid #fff`,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <MsqdxUserBadge
              name={p.userId}
              colorToken={p.colorToken}
              size="md"
              lastActiveAt={p.lastActiveAt}
              showTooltip
              state={presenterUserId === p.userId ? "presenting" : "default"}
            />
          </Box>
        ))}
        {extra > 0 && (
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `2px dashed ${MSQDX_NEUTRAL[300]}`,
              backgroundColor: "#fff",
              fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
              color: MSQDX_NEUTRAL[600],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            +{extra}
          </Box>
        )}
      </Box>
    </Box>
  );
}
