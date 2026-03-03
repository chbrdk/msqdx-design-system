"use client";

import React from "react";
import { Box } from "@mui/material";
import type { Presence } from "../../../types/prismion";
import { MsqdxPresenceList } from "../PresenceList/MsqdxPresenceList";

export interface MsqdxPresenceLayerProps {
  presences: Presence[];
  maxVisible?: number;
  presenterUserId?: string | null;
  onJumpToCursor?: (userId: string, cursor: { x: number; y: number }) => void;
  className?: string;
}

export function MsqdxPresenceLayer({
  presences,
  maxVisible = 5,
  presenterUserId,
  onJumpToCursor,
  className,
}: MsqdxPresenceLayerProps) {
  return (
    <Box
      className={className}
      sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
    >
      <MsqdxPresenceList
        presences={presences}
        maxVisible={maxVisible}
        presenterUserId={presenterUserId}
        onJumpToCursor={onJumpToCursor}
      />
    </Box>
  );
}
