"use client";

import { Box } from "@mui/material";
import { MSQDX_SPACING, MSQDX_COLORS, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import React from "react";

export interface PhaseValidationResult {
  phase_id: string;
  phase_name: string;
  fit_score: number;
  status: 'good' | 'warning' | 'critical';
  friction_points: Array<{
    description: string;
    severity: 'high' | 'medium' | 'low';
    persona_quote?: string;
  }>;
  recommendations: string[];
}

export interface JourneyValidationReport {
  overall_fit_score: number;
  phases: PhaseValidationResult[];
  validated_at: string;
}

export interface MsqdxValidationPanelProps {
  validationReport: JourneyValidationReport | null;
  loading?: boolean;
  onValidate?: (personaIds: string[]) => Promise<void>;
  availablePersonas?: Array<{ id: string; name: string }>;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return MSQDX_COLORS.status.success;
  if (score >= 60) return MSQDX_COLORS.status.warning;
  return MSQDX_COLORS.status.error;
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "high":
      return MSQDX_COLORS.status.error;
    case "medium":
      return MSQDX_COLORS.status.warning;
    case "low":
      return "text.secondary";
    default:
      return "text.secondary";
  }
};

/**
 * MsqdxValidationPanel
 *
 * Panel component for displaying journey validation reports.
 */
export const MsqdxValidationPanel = ({
  validationReport,
  loading,
  onValidate,
  availablePersonas = [],
}: MsqdxValidationPanelProps) => {
  if (loading) {
    return (
      <MsqdxCard variant="flat" sx={{ padding: `${MSQDX_SPACING.scale.xxl}px`, textAlign: "center" }}>
        <MsqdxIcon name="HourglassEmpty" customSize={24} />
        <MsqdxTypography variant="body1" sx={{ marginTop: `${MSQDX_SPACING.scale.md}px` }}>
          Validating journey...
        </MsqdxTypography>
      </MsqdxCard>
    );
  }

  if (!validationReport) {
    return (
      <MsqdxCard variant="flat" sx={{ padding: `${MSQDX_SPACING.scale.xxl}px` }}>
        <MsqdxTypography variant="h5" sx={{ marginBottom: `${MSQDX_SPACING.scale.md}px` }}>
          Persona Validation
        </MsqdxTypography>
        <MsqdxTypography variant="body2" sx={{ color: "text.secondary", marginBottom: `${MSQDX_SPACING.scale.md}px` }}>
          Validate this journey against personas to check fit scores and identify friction points.
        </MsqdxTypography>
        {availablePersonas.length > 0 && onValidate && (
          <MsqdxButton
            variant="contained"
            brandColor="green"
            onClick={() => {
              const personaIds = availablePersonas.map((p) => p.id);
              onValidate(personaIds);
            }}
          >
            <MsqdxIcon name="Verified" customSize={16} sx={{ marginRight: `${MSQDX_SPACING.scale.xs}px` }} />
            Validate Journey
          </MsqdxButton>
        )}
        {availablePersonas.length === 0 && (
          <MsqdxTypography variant="body2" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            No personas available for validation. Add personas to the target group first.
          </MsqdxTypography>
        )}
      </MsqdxCard>
    );
  }

  return (
    <MsqdxCard variant="flat" sx={{ padding: `${MSQDX_SPACING.scale.xxl}px` }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: `${MSQDX_SPACING.scale.xl}px`,
        }}
      >
        <MsqdxTypography variant="h5">Validation Report</MsqdxTypography>
        <Box
          sx={{
            padding: `${MSQDX_SPACING.scale.md}px`,
            borderRadius: `${MSQDX_SPACING.borderRadius.md}px`,
            backgroundColor: "background.paper",
            textAlign: "center",
          }}
        >
          <MsqdxTypography variant="caption" sx={{ color: "text.secondary", marginBottom: `${MSQDX_SPACING.scale.xxs}px` }}>
            Overall Fit Score
          </MsqdxTypography>
          <MsqdxTypography
            variant="h3"
            sx={{
              color: getScoreColor(validationReport.overall_fit_score),
            }}
          >
            {validationReport.overall_fit_score.toFixed(1)}%
          </MsqdxTypography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: `${MSQDX_SPACING.scale.lg}px`,
        }}
      >
        {validationReport.phases.map((phaseResult, index) => (
          <Box
            key={phaseResult.phase_id}
            sx={{
              padding: `${MSQDX_SPACING.scale.md}px`,
              backgroundColor: "background.paper",
              borderRadius: `${MSQDX_SPACING.borderRadius.md}px`,
              ...(index > 0 && {
                borderTop: `1px solid`,
                borderColor: "divider",
                paddingTop: `${MSQDX_SPACING.scale.lg}px`,
              }),
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: `${MSQDX_SPACING.scale.md}px`,
                paddingBottom: `${MSQDX_SPACING.scale.sm}px`,
                borderBottom: `1px solid`,
                borderColor: "divider",
              }}
            >
              <MsqdxTypography variant="h6" sx={{ margin: 0, textAlign: "left" }}>
                {phaseResult.phase_name}
              </MsqdxTypography>
              <Box sx={{ display: "flex", alignItems: "center", gap: `${MSQDX_SPACING.scale.xs}px` }}>
                <Box
                  sx={{
                    padding: `${MSQDX_SPACING.scale.xxs}px ${MSQDX_SPACING.scale.xs}px`,
                    borderRadius: `${MSQDX_SPACING.borderRadius.xs}px`,
                    fontSize: "0.875rem",
                    backgroundColor: getScoreColor(phaseResult.fit_score),
                    color: "white",
                  }}
                >
                  {phaseResult.fit_score.toFixed(1)}%
                </Box>
                <Box
                  sx={{
                    padding: `${MSQDX_SPACING.scale.xxs}px ${MSQDX_SPACING.scale.xs}px`,
                    borderRadius: `${MSQDX_SPACING.borderRadius.xs}px`,
                    fontSize: "0.75rem",
                    backgroundColor:
                      phaseResult.status === "good"
                        ? MSQDX_COLORS.status.success
                        : phaseResult.status === "warning"
                          ? MSQDX_COLORS.status.warning
                          : MSQDX_COLORS.status.error,
                    color: "white",
                  }}
                >
                  {phaseResult.status}
                </Box>
              </Box>
            </Box>

            {phaseResult.friction_points.length > 0 && (
              <Box sx={{ marginTop: `${MSQDX_SPACING.scale.md}px`, marginBottom: `${MSQDX_SPACING.scale.md}px` }}>
                <MsqdxTypography variant="subtitle2" sx={{ marginBottom: `${MSQDX_SPACING.scale.xs}px`, textAlign: "left" }}>
                  Friction Points
                </MsqdxTypography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: `${MSQDX_SPACING.scale.xs}px`,
                    paddingBottom: `${MSQDX_SPACING.scale.sm}px`,
                    borderBottom: `1px solid`,
                    borderColor: "divider",
                  }}
                >
                  {phaseResult.friction_points.map((fp, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        padding: `${MSQDX_SPACING.scale.sm}px`,
                        borderRadius: `${MSQDX_SPACING.borderRadius.xs}px`,
                        borderLeft: `3px solid ${getSeverityColor(fp.severity)}`,
                        backgroundColor: "background.default",
                        textAlign: "left",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          marginBottom: `${MSQDX_SPACING.scale.xxs}px`,
                        }}
                      >
                        <MsqdxTypography variant="body2" weight="semibold" sx={{ textAlign: "left" }}>
                          {fp.description}
                        </MsqdxTypography>
                        <MsqdxTypography
                          variant="caption"
                          sx={{
                            color: getSeverityColor(fp.severity),
                            textTransform: "uppercase",
                          }}
                        >
                          {fp.severity}
                        </MsqdxTypography>
                      </Box>
                      {fp.persona_quote && (
                        <MsqdxTypography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontStyle: "italic",
                            marginTop: `${MSQDX_SPACING.scale.xs}px`,
                            textAlign: "left",
                          }}
                        >
                          "{fp.persona_quote}"
                        </MsqdxTypography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {phaseResult.recommendations.length > 0 && (
              <Box sx={{ marginTop: `${MSQDX_SPACING.scale.md}px` }}>
                <MsqdxTypography variant="subtitle2" sx={{ marginBottom: `${MSQDX_SPACING.scale.xs}px`, textAlign: "left" }}>
                  Recommendations
                </MsqdxTypography>
                <Box
                  component="ul"
                  sx={{
                    margin: 0,
                    paddingLeft: `${MSQDX_SPACING.scale.xl}px`,
                    fontSize: "0.875rem",
                    textAlign: "left",
                  }}
                >
                  {phaseResult.recommendations.map((rec, idx) => (
                    <Box key={idx} component="li" sx={{ marginBottom: `${MSQDX_SPACING.scale.xxs}px`, color: "text.secondary" }}>
                      {rec}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          marginTop: `${MSQDX_SPACING.scale.xl}px`,
          padding: `${MSQDX_SPACING.scale.md}px`,
          backgroundColor: "background.paper",
          borderRadius: `${MSQDX_SPACING.borderRadius.md}px`,
          fontSize: "0.875rem",
          color: "text.secondary",
          display: "flex",
          alignItems: "center",
          gap: `${MSQDX_SPACING.scale.xs}px`,
        }}
      >
        <MsqdxIcon name="Info" customSize={16} />
        Validated at: {new Date(validationReport.validated_at).toLocaleString()}
      </Box>
    </MsqdxCard>
  );
};
