"use client";

import { useState, useEffect } from "react";
import { Box, IconButton, useMediaQuery, useTheme, alpha } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MSQDX_SPACING, MSQDX_NEUTRAL, MSQDX_TYPOGRAPHY, MSQDX_BRAND_PRIMARY } from "@msqdx/tokens";
import type { ReactNode } from "react";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";

export type MsqdxCollapsiblePanelProps = {
  children: ReactNode;
  /** Optional title; when collapsed on desktop shown as vertical label. */
  title?: string;
  /** Initial expanded state (desktop). @default true */
  defaultExpanded?: boolean;
  /** Mobile: panel open (off-canvas). */
  mobileOpen?: boolean;
  /** Mobile: callback when panel should close. */
  onMobileClose?: () => void;
  /** Optional class name for the wrapper. */
  className?: string;
  /** Optional sx for the desktop wrapper. */
  sx?: Record<string, unknown>;
  /** Desktop: width when expanded. @default 280 */
  expandedWidth?: number;
  /** Desktop: width when collapsed. @default 64 */
  collapsedWidth?: number;
};

const PANEL_WIDTH_EXPANDED_DEFAULT = 280;
const PANEL_WIDTH_COLLAPSED_DEFAULT = 64;
const PANEL_MOBILE_MAX_WIDTH = 400;

export const MsqdxCollapsiblePanel = ({
  children,
  title,
  defaultExpanded = true,
  mobileOpen = false,
  onMobileClose,
  className,
  sx,
  expandedWidth = PANEL_WIDTH_EXPANDED_DEFAULT,
  collapsedWidth = PANEL_WIDTH_COLLAPSED_DEFAULT,
}: MsqdxCollapsiblePanelProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <>
      {/* Mobile: Off-Canvas Drawer */}
      {mounted && isMobile && (
        <Box
          component="aside"
          className={className ?? "msqdx-collapsible-panel-mobile"}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "95%",
            maxWidth: PANEL_MOBILE_MAX_WIDTH,
            backgroundColor: MSQDX_NEUTRAL[50],
            borderRight: `1px solid ${MSQDX_NEUTRAL[300]}`,
            transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            zIndex: 1200,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {title && onMobileClose && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: MSQDX_SPACING.scale.md,
                borderBottom: `1px solid ${MSQDX_NEUTRAL[200]}`,
              }}
            >
              <MsqdxTypography
                variant="subtitle2"
                weight="semibold"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "text.primary",
                }}
              >
                {title}
              </MsqdxTypography>
              <IconButton
                onClick={onMobileClose}
                sx={{
                  color: "text.primary",
                  padding: MSQDX_SPACING.scale.xs,
                  "&:hover": {
                    backgroundColor: alpha(MSQDX_BRAND_PRIMARY.purple, 0.1),
                  },
                  transition: "background-color 0.2s ease",
                }}
                aria-label="Close panel"
              >
                <MsqdxIcon name="close" customSize={24} />
              </IconButton>
            </Box>
          )}

          <Box
            component="section"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: MSQDX_SPACING.scale.md,
              overflowY: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      )}

      {/* Desktop: Collapsible sidebar */}
      <Box
        className={className ?? "msqdx-collapsible-panel-desktop"}
        sx={{
          transition: "width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease",
          overflow: "visible",
          position: "relative",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          width: expanded ? expandedWidth : collapsedWidth,
          minWidth: expanded ? expandedWidth : collapsedWidth,
          maxWidth: expanded ? expandedWidth : collapsedWidth,
          ...sx,
        }}
      >
        {/* Desktop: Toggle button */}
        {mounted && (
          <Box
            sx={{
              position: "absolute",
              top: MSQDX_SPACING.scale.xs,
              right: 0,
              zIndex: 100,
              display: "flex",
              justifyContent: "center",
              transform: "translateX(50%)",
            }}
          >
            <MsqdxButton
              variant="outlined"
              size="small"
              onClick={handleToggle}
              aria-label={expanded ? "Collapse panel" : "Expand panel"}
              sx={{
                minWidth: 0,
                minHeight: 0,
                width: 28,
                height: 28,
                p: 0,
              }}
            >
              <MsqdxIcon
                name={expanded ? "chevron_left" : "chevron_right"}
                size="sm"
              />
            </MsqdxButton>
          </Box>
        )}

        {/* Desktop: Content */}
        <Box
          component="section"
          sx={{
            opacity: expanded ? 1 : 0,
            visibility: expanded ? "visible" : "hidden",
            transition: "opacity 0.2s ease, visibility 0.2s ease",
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {children}
        </Box>

        {/* Desktop: Collapsed – vertical title */}
        {mounted && !expanded && title && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: `${MSQDX_SPACING.scale.md}px 0`,
              gap: MSQDX_SPACING.scale.md,
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
            }}
          >
            <MsqdxTypography
              variant="caption"
              weight="semibold"
              sx={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "text.primary",
              }}
            >
              {title}
            </MsqdxTypography>
          </Box>
        )}
      </Box>
    </>
  );
};
