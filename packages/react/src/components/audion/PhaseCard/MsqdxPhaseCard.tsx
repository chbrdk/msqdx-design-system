"use client";

import { Box } from "@mui/material";
import { MSQDX_SPACING, MSQDX_COLORS, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxChip } from "../../atoms/Chip/MsqdxChip";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxLabel } from "../../atoms/Label/MsqdxLabel";
import React from "react";

export interface JourneyPhase {
  id: string;
  name: string;
  description?: string;
  expected_duration_min?: number;
  expected_duration_max?: number;
  duration_unit?: string;
  expected_emotion?: string;
  emotion_intensity?: number;
  validation_score?: number;
  validation_status?: string;
  generated_by_ai: boolean;
  elements: Array<{
    id: string;
    element_type: string;
    content: string;
    element_order: number;
  }>;
}

export type PhaseCardBrandColor = "purple" | "yellow" | "pink" | "orange" | "green";

export interface MsqdxPhaseCardProps {
  phase: JourneyPhase;
  index: number;
  isActive?: boolean;
  /** Brand color for card border/hover. @default 'green' */
  brandColor?: PhaseCardBrandColor;
  onEdit?: () => void;
  onDelete?: (phaseId: string) => Promise<void>;
}

const elementIconMap: Record<string, string> = {
  action: "trending_up",
  thought: "psychology_alt",
  feeling: "sentiment_satisfied",
  touchpoint: "hub",
  pain_point: "warning",
  opportunity: "lightbulb",
  question: "help",
  quote: "format_quote",
};

const formatDuration = (phase: JourneyPhase) => {
  if (phase.expected_duration_min && phase.expected_duration_max) {
    return `${phase.expected_duration_min}-${phase.expected_duration_max} ${phase.duration_unit ?? "minutes"}`;
  }
  if (phase.expected_duration_min) {
    return `${phase.expected_duration_min}+ ${phase.duration_unit ?? "minutes"}`;
  }
  return null;
};

/**
 * MsqdxPhaseCard
 *
 * Card component for displaying journey phase information.
 * Uses MsqdxCard with corner decoration and design system components.
 */
export const MsqdxPhaseCard = ({
  phase,
  index,
  isActive = false,
  brandColor = "green",
  onEdit,
  onDelete,
}: MsqdxPhaseCardProps) => {
  const durationLabel = formatDuration(phase);
  const emotionLabel = phase.expected_emotion
    ? `${phase.expected_emotion}${phase.emotion_intensity ? ` • ${Math.round(phase.emotion_intensity * 100)}%` : ""}`
    : null;
  const validationLabel =
    typeof phase.validation_score === "number"
      ? `${phase.validation_score.toFixed(1)}% fit`
      : phase.validation_status
        ? phase.validation_status
        : null;

  const chips = [
    durationLabel ? { icon: "schedule", label: durationLabel } : null,
    emotionLabel ? { icon: "mood", label: emotionLabel } : null,
    validationLabel ? { icon: "verified", label: validationLabel } : null,
    phase.generated_by_ai ? { icon: "auto_awesome", label: "AI generated" } : null,
  ].filter(Boolean) as { icon: string; label: string }[];

  const sortedElements = [...(phase.elements ?? [])].sort((a, b) => a.element_order - b.element_order);
  const highlightedElements = sortedElements.slice(0, 3);

  return (
    <MsqdxCard
      variant="flat"
      brandColor={brandColor}
      hoverable={!!onEdit}
      clickable={!!onEdit}
      onClick={onEdit}
      sx={{
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: `${MSQDX_SPACING.scale.sm}px`,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: `${MSQDX_SPACING.scale.sm}px`,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <MsqdxLabel size="small" sx={{ marginBottom: `${MSQDX_SPACING.scale.xxs}px` }}>
              Phase
            </MsqdxLabel>
            <MsqdxTypography
              variant="h6"
              sx={{
                fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                textAlign: "left",
              }}
            >
              {phase.name}
            </MsqdxTypography>
          </Box>
          
          {onDelete && (
            <Box
              component="button"
              onClick={async (e: React.MouseEvent) => {
                e.stopPropagation();
                if (confirm(`Möchtest du die Phase "${phase.name}" wirklich löschen?`)) {
                  try {
                    await onDelete(phase.id);
                  } catch (err) {
                    console.error("Failed to delete phase:", err);
                  }
                }
              }}
              sx={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: `${MSQDX_SPACING.scale.xs}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: `${MSQDX_SPACING.borderRadius.sm}px`,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
              aria-label="Delete phase"
            >
              <MsqdxIcon name="delete" customSize={16} />
            </Box>
          )}
        </Box>

        {/* Chips */}
        {chips.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: `${MSQDX_SPACING.scale.xxs}px`,
                marginBottom: `${MSQDX_SPACING.scale.xs}px`,
              }}
            >
              {chips.map((chip) => (
                <MsqdxChip
                  key={chip.label}
                  variant="glass"
                  size="small"
                  icon={chip.icon}
                >
                  {chip.label}
                </MsqdxChip>
              ))}
            </Box>
            <Box
              sx={{
                borderBottom: `1px solid`,
                borderColor: "divider",
                marginBottom: `${MSQDX_SPACING.scale.sm}px`,
              }}
            />
          </>
        )}

        {/* Focus Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: `${MSQDX_SPACING.scale.xs}px`,
            marginBottom: `${MSQDX_SPACING.scale.sm}px`,
          }}
        >
          <MsqdxLabel size="small">Focus</MsqdxLabel>
          <MsqdxTypography
            variant="body2"
            sx={{
              textAlign: "left",
            }}
          >
            {phase.description || "No description yet. Capture the goal and emotional state of this phase."}
          </MsqdxTypography>
        </Box>

        <Box
          sx={{
            borderBottom: `1px solid`,
            borderColor: "divider",
            marginBottom: `${MSQDX_SPACING.scale.sm}px`,
          }}
        />

        {/* Journey Moments Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: `${MSQDX_SPACING.scale.xs}px`,
          }}
        >
          <MsqdxLabel size="small">Journey Moments</MsqdxLabel>
          {highlightedElements.length === 0 ? (
            <MsqdxTypography
              variant="body2"
              sx={{
                textAlign: "left",
                color: "text.secondary",
              }}
            >
              No elements yet. Map touchpoints, thoughts or feelings.
            </MsqdxTypography>
          ) : (
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: `${MSQDX_SPACING.scale.sm}px`,
              }}
            >
              {highlightedElements.map((element) => (
                <Box
                  key={element.id}
                  component="li"
                  sx={{
                    display: "flex",
                    gap: `${MSQDX_SPACING.scale.sm}px`,
                    textAlign: "left",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MsqdxIcon
                      name={elementIconMap[element.element_type] ?? "trip"}
                      customSize={14}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <MsqdxTypography
                      variant="caption"
                      sx={{
                        textAlign: "left",
                        textTransform: "capitalize",
                        display: "block",
                        marginBottom: `${MSQDX_SPACING.scale.xxs}px`,
                      }}
                    >
                      {element.element_type.replace("_", " ")}
                    </MsqdxTypography>
                    <MsqdxTypography
                      variant="body2"
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      {element.content}
                    </MsqdxTypography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </MsqdxCard>
  );
};
