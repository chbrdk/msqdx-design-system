"use client";

import type { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { MSQDX_SPACING, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";
import type { AccordionBrandColor, AccordionSize } from "../../molecules/Accordion/MsqdxAccordion";
import { MsqdxAccordion, MsqdxAccordionItem } from "../../molecules/Accordion/MsqdxAccordion";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";

export type DashboardCardBrandColor = AccordionBrandColor;

export interface MsqdxDashboardCardProps {
  id: string;
  title: string;
  icon: string;
  /** Size (padding + density). @default 'medium' */
  size?: AccordionSize;
  /** Border radius from tokens. @default 'button' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Brand color for border and expand icon. */
  brandColor?: DashboardCardBrandColor;
  /** Optional header accent (icon color). */
  iconColor?: { background?: string; color: string };
  expanded: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}

export function MsqdxDashboardCard({
  id,
  title,
  icon,
  size = "medium",
  borderRadius = "button",
  brandColor,
  iconColor,
  expanded,
  onToggle,
  children,
}: MsqdxDashboardCardProps) {
  const theme = useTheme();
  const summary = (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: MSQDX_SPACING.gap.xxs,
        fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
        fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
        fontWeight: MSQDX_TYPOGRAPHY.fontWeight.semibold,
        minWidth: 0,
        ...(iconColor?.background && { bgcolor: iconColor.background }),
        ...(iconColor?.color && { color: iconColor.color }),
      }}
    >
      <MsqdxIcon
        name={icon as any}
        size="sm"
        style={iconColor?.color ? { color: iconColor.color } : undefined}
      />
      {title}
    </Box>
  );

  return (
    <MsqdxAccordion
      className="msqdx-dashboard-card"
      orientation="vertical"
      size={size}
      borderRadius={borderRadius}
      brandColor={brandColor}
      expanded={expanded ? [id] : []}
      onChange={() => onToggle(id)}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "none",
      }}
    >
      <MsqdxAccordionItem id={id} summary={summary}>
        {children}
      </MsqdxAccordionItem>
    </MsqdxAccordion>
  );
}
