"use client";

import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import {
  MSQDX_SPACING,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";
import type { ReactNode } from "react";
import { MsqdxCard as MsqdxCardAtom } from "../../atoms/Card";
import type { BrandColor as AtomBrandColor, CardVariant } from "../../atoms/Card";
import { MsqdxTypography } from "../../atoms/Typography";
import { MsqdxDivider } from "../../atoms/Divider";
import { MsqdxCircleContextMenu } from "../CircleContextMenu";
import type { CircleContextMenuItem } from "../CircleContextMenu";

export type CardTitleVariant = "h4" | "h5" | "h6";
export type CardBrandColor = AtomBrandColor;

export interface MsqdxCardProps extends Omit<BoxProps, "variant" | "children"> {
  /** Card surface: flat, glass, elevated. */
  variant?: CardVariant;
  /** Brand color for border/hover. */
  brandColor?: CardBrandColor;
  /** Whole card is clickable. */
  clickable?: boolean;
  /** Hover lift + shadow. */
  hoverable?: boolean;
  /** Border radius from MSQDX_SPACING.borderRadius. @default 'button' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;

  /** Full-bleed media above content (e.g. MsqdxAspectRatio with img). */
  media?: ReactNode;

  /** Eyebrow label above title (Typography eyebrow). */
  eyebrow?: string;
  /** Main title. */
  title?: string;
  /** Title typography variant. @default 'h5' */
  titleVariant?: CardTitleVariant;
  /** Subtitle below title. */
  subtitle?: string;
  /** Actions in header (right of title), e.g. IconButton or custom. */
  headerActions?: ReactNode;
  /** Context menu items; renders MsqdxCircleContextMenu in header when set. */
  contextMenuItems?: CircleContextMenuItem[];
  /** Context menu trigger label (a11y). */
  contextMenuTriggerLabel?: string;
  /** Context menu trigger icon name. @default 'MoreVert' */
  contextMenuTriggerIcon?: string;

  /** Chips/tags row (e.g. MsqdxChip[]). */
  chips?: ReactNode;

  /** Main body content. */
  children?: ReactNode;

  /** Footer content (below optional divider), z. B. Text links. */
  footer?: ReactNode;
  /** Buttons/Actions unten rechts (z. B. MsqdxButton). Werden in einer Zeile mit footer gerendert, footer links, actions rechts. */
  actions?: ReactNode;
  /** Show divider before footer/actions. @default true when footer or actions are set */
  footerDivider?: boolean;
}

/**
 * MsqdxCard (molecule)
 *
 * Zentrale Karten-Komponente mit allen erdenklichen Varianten und Slots:
 * Media (alle Aspect Ratios), Eyebrow, Titel, Subtitle, Header-Actions,
 * Kontextmenü, Chips, Body, Footer. Nutzt ausschließlich Tokens und Atome.
 */
export const MsqdxCard = ({
  variant = "flat",
  brandColor,
  clickable,
  hoverable,
  media,
  eyebrow,
  title,
  titleVariant = "h5",
  subtitle,
  headerActions,
  contextMenuItems,
  contextMenuTriggerLabel = "Menü öffnen",
  contextMenuTriggerIcon = "MoreVert",
  chips,
  children,
  footer,
  actions,
  footerDivider = true,
  borderRadius = "button",
  sx,
  ...props
}: MsqdxCardProps) => {
  const hasHeader =
    eyebrow != null ||
    title != null ||
    subtitle != null ||
    headerActions != null ||
    (contextMenuItems != null && contextMenuItems.length > 0);
  const resolvedHeaderActions =
    headerActions ??
    (contextMenuItems != null && contextMenuItems.length > 0 ? (
      <MsqdxCircleContextMenu
        items={contextMenuItems}
        triggerIcon={contextMenuTriggerIcon}
        triggerLabel={contextMenuTriggerLabel}
        brandColor={brandColor}
      />
    ) : null);

  const hasFooterRow = footer != null || actions != null;

  return (
    <MsqdxCardAtom
      variant={variant}
      brandColor={brandColor}
      clickable={clickable}
      hoverable={hoverable}
      borderRadius={borderRadius}
      media={media}
      sx={sx}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: `${MSQDX_SPACING.gap.sm}px`,
        }}
      >
        {hasHeader && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: `${MSQDX_SPACING.gap.xxs}px` }}>
            {eyebrow != null && (
              <MsqdxTypography eyebrow>{eyebrow}</MsqdxTypography>
            )}
            {(title != null || resolvedHeaderActions != null) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: `${MSQDX_SPACING.gap.sm}px`,
                  flexWrap: "wrap",
                }}
              >
                {title != null && (
                  <MsqdxTypography
                    variant={titleVariant}
                    sx={{
                      fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                      flex: "1 1 auto",
                      minWidth: 0,
                    }}
                  >
                    {title}
                  </MsqdxTypography>
                )}
                {resolvedHeaderActions != null && (
                  <Box sx={{ flexShrink: 0 }}>{resolvedHeaderActions}</Box>
                )}
              </Box>
            )}
            {subtitle != null && (
              <MsqdxTypography variant="body2" color="text.secondary">
                {subtitle}
              </MsqdxTypography>
            )}
          </Box>
        )}

        {chips != null && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: `${MSQDX_SPACING.gap.xs}px`,
            }}
          >
            {chips}
          </Box>
        )}

        {children != null && (hasHeader || chips != null) ? (
          <Box sx={{ flex: "1 1 auto", minHeight: 0 }}>{children}</Box>
        ) : (
          children
        )}

        {hasFooterRow && (
          <>
            {footerDivider && (
              <MsqdxDivider spacing="xs" />
            )}
            <Box
              sx={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: actions != null ? "space-between" : "flex-start",
                gap: `${MSQDX_SPACING.gap.sm}px`,
                flexWrap: "wrap",
              }}
            >
              {footer != null && <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>{footer}</Box>}
              {actions != null && (
                <Box sx={{ display: "flex", gap: `${MSQDX_SPACING.gap.xs}px`, flexShrink: 0, marginLeft: "auto" }}>
                  {actions}
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </MsqdxCardAtom>
  );
};
