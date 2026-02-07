"use client";

import { Box } from "@mui/material";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";

export type TargetGroup = {
  id: string;
  name: string;
  segment: string;
  description?: string;
  personaCount: number;
  knowledgeEntryCount: number;
};

export interface MsqdxTargetGroupCardProps {
  targetGroup: TargetGroup;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function MsqdxTargetGroupCard({
  targetGroup,
  selected,
  onSelect,
}: MsqdxTargetGroupCardProps) {
  return (
    <MsqdxCard
      sx={{
        p: 2,
        cursor: onSelect ? "pointer" : "default",
        ...(selected
          ? {
              bgcolor: "action.selected",
              borderColor: "primary.main",
              borderWidth: 1,
              borderStyle: "solid",
            }
          : {}),
      }}
      onClick={() => onSelect?.(targetGroup.id)}
    >
      <Box display="flex" alignItems="center" gap={1.5} mb={1}>
        <MsqdxIcon name="groups" size="sm" />
        <Box flex={1}>
          <MsqdxTypography variant="subtitle1" weight="semibold">
            {targetGroup.name}
          </MsqdxTypography>
          <MsqdxTypography variant="body2" color="text.secondary">
            {targetGroup.segment}
          </MsqdxTypography>
        </Box>
      </Box>
      {targetGroup.description && (
        <MsqdxTypography variant="body2" color="text.secondary" sx={{ my: 0.5 }}>
          {targetGroup.description}
        </MsqdxTypography>
      )}
      <Box display="flex" gap={2} mt={1.5}>
        <Box component="span" display="flex" alignItems="center" gap={0.5}>
          <MsqdxIcon name="person" size="sm" />
          <MsqdxTypography variant="body2">
            {targetGroup.personaCount} Personas
          </MsqdxTypography>
        </Box>
        <Box component="span" display="flex" alignItems="center" gap={0.5}>
          <MsqdxIcon name="menu_book" size="sm" />
          <MsqdxTypography variant="body2">
            {targetGroup.knowledgeEntryCount} Knowledge
          </MsqdxTypography>
        </Box>
      </Box>
    </MsqdxCard>
  );
}
