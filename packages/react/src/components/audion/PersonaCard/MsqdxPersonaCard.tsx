"use client";

import { Box } from "@mui/material";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxAvatar } from "../../atoms/Avatar/MsqdxAvatar";

export type Persona = {
  id: string;
  name: string;
  segment: string;
  confidence: number;
  headline: string;
  image_url?: string | null;
};

export interface MsqdxPersonaCardProps {
  persona: Persona;
  selected?: boolean;
  onSelect?: (personaId: string) => void;
  actionLabel?: string;
}

export function MsqdxPersonaCard({
  persona,
  selected,
  onSelect,
  actionLabel = "Chat",
}: MsqdxPersonaCardProps) {
  return (
    <MsqdxCard
      sx={{
        p: 2,
        ...(selected
          ? {
              bgcolor: "action.selected",
              borderColor: "primary.main",
              borderWidth: 1,
              borderStyle: "solid",
            }
          : {}),
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2} alignItems="center">
          <MsqdxAvatar
            src={persona.image_url ?? undefined}
            alt={persona.name}
            size="lg"
            fallback={persona.name.charAt(0)}
            brandColor="green"
          />
          <Box flex={1}>
            <MsqdxTypography variant="h6">{persona.name}</MsqdxTypography>
            <MsqdxTypography variant="body2" color="text.secondary">
              {persona.segment}
            </MsqdxTypography>
            <MsqdxTypography variant="body2" color="text.secondary">
              Confidence: {(persona.confidence * 100).toFixed(0)}%
            </MsqdxTypography>
          </Box>
        </Box>
        <MsqdxTypography variant="body2">{persona.headline}</MsqdxTypography>
        <MsqdxButton
          brandColor="green"
          startIcon={<MsqdxIcon name={selected ? "chat" : "swap_horiz"} size="sm" />}
          onClick={() => onSelect?.(persona.id)}
        >
          {selected ? "Live" : actionLabel}
        </MsqdxButton>
      </Box>
    </MsqdxCard>
  );
}
