"use client";

import { Box } from "@mui/material";
import { MSQDX_SPACING, MSQDX_COLORS, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";
import { MsqdxPhaseCard } from "../PhaseCard/MsqdxPhaseCard";
import type { PhaseCardBrandColor } from "../PhaseCard/MsqdxPhaseCard";
import { MsqdxScrollbar } from "../../atoms/Scrollbar/MsqdxScrollbar";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import type { JourneyPhase } from "../PhaseCard/MsqdxPhaseCard";
import React from "react";

const toPx = (v: string | number): string =>
  typeof v === "number" ? `${v}px` : String(v);

export interface MsqdxJourneyCanvasProps {
  phases: JourneyPhase[];
  selectedPhaseId?: string | null;
  onPhaseSelect?: (phaseId: string) => void;
  onPhaseReorder?: (fromIndex: number, toIndex: number) => void;
  onAddPhase?: () => void;
  onPhaseEdit?: (phaseId: string) => void;
  onPhaseDelete?: (phaseId: string) => Promise<void>;
  /** Brand color for all phase cards (border/hover). @default 'green' */
  phaseCardBrandColor?: PhaseCardBrandColor;
  /** Scrollbar brand color for the phases row. @default 'default' */
  scrollbarBrandColor?: "default" | "purple" | "yellow" | "pink" | "orange" | "green" | "black";
  /** Scrollbar size for the phases row. @default 'medium' */
  scrollbarSize?: "thin" | "medium" | "thick";
}

/**
 * MsqdxJourneyCanvas
 *
 * Canvas component for displaying journey phases horizontally.
 * Overhauled: flat style, xs/small sizing, design tokens only, existing atoms/molecules.
 */
export const MsqdxJourneyCanvas = ({
  phases,
  selectedPhaseId,
  onPhaseSelect,
  onPhaseReorder,
  onAddPhase,
  onPhaseEdit,
  onPhaseDelete,
  phaseCardBrandColor = "green",
  scrollbarBrandColor = "default",
  scrollbarSize = "medium",
}: MsqdxJourneyCanvasProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: `${MSQDX_SPACING.scale.sm}px`,
        padding: `${MSQDX_SPACING.scale.sm}px`,
      }}
    >
      {/* Phases row with design system scrollbar */}
      <MsqdxScrollbar
        horizontal
        vertical={false}
        size={scrollbarSize}
        brandColor={scrollbarBrandColor}
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          borderColor: "divider",
          paddingBottom: `${MSQDX_SPACING.scale.sm}px`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: `${MSQDX_SPACING.scale.sm}px`,
            flexWrap: "nowrap",
          }}
        >
          {phases.map((phase, index) => (
            <Box
              key={phase.id}
              sx={{
                minWidth: "280px",
                flexShrink: 0,
              }}
            >
              <MsqdxPhaseCard
                phase={phase}
                index={index}
                isActive={selectedPhaseId === phase.id}
                brandColor={phaseCardBrandColor}
                onEdit={() => onPhaseEdit?.(phase.id)}
                onDelete={onPhaseDelete}
              />
            </Box>
          ))}

          {onAddPhase && (
            <Box sx={{ minWidth: "180px", flexShrink: 0 }}>
              <MsqdxButton
                variant="outlined"
                size="small"
                fullWidth
                onClick={onAddPhase}
                sx={{
                  height: "100%",
                  minHeight: "160px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: `${MSQDX_SPACING.scale.xs}px`,
                  borderStyle: "dashed",
                }}
              >
                <MsqdxIcon name="Add" customSize={20} />
                <MsqdxTypography
                  variant="body2"
                  sx={{ fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono }}
                >
                  Add Phase
                </MsqdxTypography>
              </MsqdxButton>
            </Box>
          )}
        </Box>
      </MsqdxScrollbar>

      {/* Emotion curve */}
      {phases.length > 0 && (
        <Box
          sx={{
            padding: `${MSQDX_SPACING.scale.sm}px`,
            backgroundColor: "background.paper",
            borderRadius: toPx(MSQDX_SPACING.borderRadius.md ?? 20),
          }}
        >
          <MsqdxTypography
            variant="subtitle2"
            sx={{
              marginBottom: `${MSQDX_SPACING.scale.sm}px`,
              fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
            }}
          >
            Emotion Curve
          </MsqdxTypography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: `${MSQDX_SPACING.scale.sm}px`,
              height: "88px",
              position: "relative",
            }}
          >
            {phases.map((phase) => {
              if (!phase.expected_emotion || typeof phase.emotion_intensity !== "number") return null;
              const intensity = Math.max(8, phase.emotion_intensity * 100);
              const emotionColors: Record<string, string> = {
                frustrated: MSQDX_COLORS.status.error,
                anxious: MSQDX_COLORS.status.warning,
                hopeful: MSQDX_COLORS.status.success,
                satisfied: MSQDX_COLORS.brand.green,
                delighted: MSQDX_COLORS.brand.purple,
                curious: MSQDX_COLORS.brand.purple,
              };
              const barColor =
                emotionColors[phase.expected_emotion] ??
                (phase.expected_emotion === "neutral"
                  ? undefined
                  : MSQDX_COLORS.brand.green);
              return (
                <Box
                  key={phase.id}
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: `${MSQDX_SPACING.scale.xxs}px`,
                  }}
                >
                  <Box
                    sx={{
                      width: "32px",
                      height: `${intensity}px`,
                      backgroundColor: barColor ?? "text.secondary",
                      borderRadius: toPx(MSQDX_SPACING.borderRadius.xs ?? 4),
                      minHeight: "8px",
                    }}
                  />
                  <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
                    {phase.expected_emotion}
                  </MsqdxTypography>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
