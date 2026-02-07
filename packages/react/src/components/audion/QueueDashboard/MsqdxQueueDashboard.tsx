"use client";

import { Box } from "@mui/material";
import { MSQDX_SPACING } from "@msqdx/tokens";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxChip } from "../../atoms/Chip/MsqdxChip";
import React from "react";

export interface QueueStats {
  pendingCount: number;
  processingCount: number;
  completedCount: number;
  failedCount: number;
  workerCount: number;
  workerAvailable: boolean;
}

export interface ProcessingJob {
  id: string;
  documentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  error?: string;
}

export interface MsqdxQueueDashboardProps {
  stats: QueueStats;
  jobs: ProcessingJob[];
  selectedJobId?: string | null;
  onJobSelect?: (jobId: string) => void;
  onRetry?: (jobId: string) => Promise<void>;
  onRefresh?: () => void;
}

const statusChips: Record<string, { label: string; variant: 'default' | 'success' | 'error' | 'warning' }> = {
  pending: { label: "Pending", variant: 'default' },
  processing: { label: "Processing", variant: 'warning' },
  completed: { label: "Completed", variant: 'success' },
  failed: { label: "Failed", variant: 'error' },
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

/**
 * MsqdxQueueDashboard
 *
 * Dashboard component for displaying queue statistics and job lists.
 */
export const MsqdxQueueDashboard = ({
  stats,
  jobs,
  selectedJobId,
  onJobSelect,
  onRetry,
  onRefresh,
}: MsqdxQueueDashboardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: `${MSQDX_SPACING.scale.lg}px`,
      }}
    >
      {/* Statistics */}
      <MsqdxCard variant="flat">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: `${MSQDX_SPACING.scale.md}px`,
          }}
        >
          <MsqdxTypography variant="h5">Queue Statistics</MsqdxTypography>
          {onRefresh && (
            <Box
              component="button"
              onClick={onRefresh}
              sx={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: `${MSQDX_SPACING.scale.xs}px`,
                display: "flex",
                alignItems: "center",
                gap: `${MSQDX_SPACING.scale.xs}px`,
                borderRadius: `${MSQDX_SPACING.borderRadius.sm}px`,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <MsqdxTypography variant="body2">Refresh</MsqdxTypography>
            </Box>
          )}
        </Box>
        
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(5, 1fr)" },
            gap: `${MSQDX_SPACING.scale.md}px`,
          }}
        >
          <Box>
            <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
              Pending
            </MsqdxTypography>
            <MsqdxTypography variant="h4">{stats.pendingCount}</MsqdxTypography>
          </Box>
          <Box>
            <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
              Processing
            </MsqdxTypography>
            <MsqdxTypography variant="h4">{stats.processingCount}</MsqdxTypography>
          </Box>
          <Box>
            <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
              Completed
            </MsqdxTypography>
            <MsqdxTypography variant="h4">{stats.completedCount}</MsqdxTypography>
          </Box>
          <Box>
            <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
              Failed
            </MsqdxTypography>
            <MsqdxTypography variant="h4">{stats.failedCount}</MsqdxTypography>
          </Box>
          <Box>
            <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
              Workers
            </MsqdxTypography>
            <MsqdxTypography variant="h4">
              {stats.workerCount} {stats.workerAvailable ? "✓" : "✗"}
            </MsqdxTypography>
          </Box>
        </Box>
      </MsqdxCard>

      {/* Jobs List */}
      <MsqdxCard variant="flat">
        <MsqdxTypography variant="h5" sx={{ marginBottom: `${MSQDX_SPACING.scale.md}px` }}>
          Jobs
        </MsqdxTypography>
        
        {jobs.length === 0 ? (
          <MsqdxTypography variant="body2" sx={{ color: "text.secondary" }}>
            No jobs found.
          </MsqdxTypography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: `${MSQDX_SPACING.scale.xs}px`,
            }}
          >
            {jobs.map((job) => {
              const chip = statusChips[job.status] ?? statusChips.pending;
              return (
                <Box
                  key={job.id}
                  component="button"
                  onClick={() => onJobSelect?.(job.id)}
                  sx={{
                    border: "none",
                    background: selectedJobId === job.id ? "action.selected" : "transparent",
                    cursor: "pointer",
                    padding: `${MSQDX_SPACING.scale.md}px`,
                    borderRadius: `${MSQDX_SPACING.borderRadius.sm}px`,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: `${MSQDX_SPACING.scale.xs}px`,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <MsqdxTypography variant="body2" weight="semibold">
                      Job {job.id.slice(0, 8)}
                    </MsqdxTypography>
                    <MsqdxChip variant={chip.variant} size="small">
                      {chip.label}
                    </MsqdxChip>
                  </Box>
                  <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
                    Document: {job.documentId.slice(0, 8)}...
                  </MsqdxTypography>
                  <MsqdxTypography variant="caption" sx={{ color: "text.secondary" }}>
                    Progress: {job.progress.toFixed(0)}% · {formatDate(job.createdAt)}
                  </MsqdxTypography>
                  {job.error && (
                    <MsqdxTypography variant="caption" sx={{ color: "error.main" }}>
                      Error: {job.error}
                    </MsqdxTypography>
                  )}
                  {job.status === 'failed' && onRetry && (
                    <Box
                      component="button"
                      onClick={async (e: React.MouseEvent) => {
                        e.stopPropagation();
                        await onRetry(job.id);
                      }}
                      sx={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        padding: `${MSQDX_SPACING.scale.xs}px`,
                        marginTop: `${MSQDX_SPACING.scale.xs}px`,
                        borderRadius: `${MSQDX_SPACING.borderRadius.sm}px`,
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <MsqdxTypography variant="body2">Retry</MsqdxTypography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </MsqdxCard>
    </Box>
  );
};
