"use client";

import { useState, useEffect } from "react";
import { Box, Divider, IconButton, useMediaQuery, useTheme, alpha } from "@mui/material";
import {
  MSQDX_COLORS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
  MSQDX_ICONS,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";
import type { ReactNode, ElementType } from "react";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";

export type AdminNavItem = {
  label: string;
  path: string;
  icon: string;
  external?: boolean;
};

export type MsqdxAdminNavProps = {
  /** Drawer off-canvas open state (mobile). */
  open: boolean;
  /** Callback when drawer should close (e.g. after navigation on mobile). */
  onClose: () => void;
  /** Current path for active state (e.g. pathname). */
  currentPath: string;
  /** Navigation items (label, path, icon, optional external). */
  items: AdminNavItem[];
  /** Optional external/secondary items (rendered after a divider). */
  externalItems?: AdminNavItem[];
  /** Optional theme mode for toggle label. */
  themeMode?: "light" | "dark";
  /** Optional theme toggle callback; when set, shows theme toggle at bottom. */
  onToggleTheme?: () => void;
  /** Link component (e.g. Next.js Link). Must accept href and children. */
  linkComponent?: ElementType<{ href: string; children: ReactNode; target?: string; rel?: string }>;
  /** Optional class name for the nav root. */
  className?: string;
  /** Optional sx for the nav root. */
  sx?: Record<string, unknown>;
  /** Brand-Farbe für Sidebar-Hintergrund (z. B. abgestimmt mit MsqdxAppLayout brandColor). */
  brandColor?: "purple" | "yellow" | "pink" | "orange" | "green" | "black";
};

const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 64;
const ITEM_HEIGHT = 32; // Kompakt zwischen small (29) und medium (36)
const ICON_SIZE = MSQDX_ICONS.sizes.lg; // 24px
const ITEM_PADDING_Y = 4;
const ITEM_PADDING_X = MSQDX_SPACING.scale.xxs;
const ITEM_GAP = 2;
const ITEM_BORDER_RADIUS = MSQDX_SPACING.borderRadius.sm;

export const MsqdxAdminNav = ({
  open,
  onClose,
  currentPath,
  items,
  externalItems = [],
  themeMode,
  onToggleTheme,
  linkComponent: LinkComponent = "a",
  className,
  sx,
  brandColor,
}: MsqdxAdminNavProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" || path === "") return currentPath === path;
    return currentPath === path || (currentPath?.startsWith(path) ?? false);
  };

  const handleItemClick = () => {
    if (mounted && isMobile) onClose();
  };

  const handleToggleExpand = () => setExpanded((prev) => !prev);

  const isExpanded = mounted && isMobile ? open : (mounted ? expanded : false);
  const sidebarWidth = isExpanded
    ? { xs: "95%", md: `${SIDEBAR_WIDTH_EXPANDED}px` }
    : { xs: "95%", md: `${SIDEBAR_WIDTH_COLLAPSED}px` };

  const brandBg =
    brandColor === "black"
      ? MSQDX_COLORS.brand.black
      : brandColor
        ? MSQDX_COLORS.brand[brandColor]
        : null;
  const navBg = brandBg ?? MSQDX_NEUTRAL[900];
  const borderColor = brandBg ?? MSQDX_NEUTRAL[800];
  const isLightNav = brandBg != null && brandColor !== "black";
  const textColor = isLightNav ? "#000000" : alpha("#fff", 0.9);
  const textMuted = isLightNav ? alpha("#000", 0.7) : alpha("#fff", 0.7);
  const hoverBg = isLightNav ? alpha("#000", 0.08) : alpha("#fff", 0.1);
  const activeBg = isLightNav ? alpha("#000", 0.12) : alpha("#fff", 0.15);
  const activeBgHover = isLightNav ? alpha("#000", 0.18) : alpha("#fff", 0.2);
  const dividerColor = isLightNav ? alpha("#000", 0.2) : alpha("#fff", 0.2);

  const paddingBlock = MSQDX_SPACING.padding.xxs;
  const paddingInline = isExpanded ? MSQDX_SPACING.padding.xxs : 0;

  return (
    <Box
      component="nav"
      className={className ?? "msqdx-admin-nav"}
      sx={{
        position: { xs: "fixed", md: "relative" },
        top: 0,
        left: 0,
        height: "100vh",
        width: sidebarWidth,
        borderRight: `1px solid ${borderColor}`,
        backgroundColor: navBg,
        transform: {
          xs: open ? "translateX(0)" : "translateX(-100%)",
          md: "translateX(0)",
        },
        transition: "width 0.3s ease, transform 0.3s ease",
        zIndex: { xs: 1200, md: "auto" },
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: isExpanded ? "stretch" : "center",
        justifyContent: "flex-start",
        padding: isExpanded ? `${paddingBlock}px ${paddingInline}px` : `${paddingBlock}px 0`,
        ...sx,
      }}
    >
      {/* Close button (mobile only) */}
      {mounted && isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: ITEM_GAP }}>
          <IconButton
            size="medium"
            onClick={onClose}
            sx={{ color: textColor, "&:hover": { backgroundColor: hoverBg } }}
            aria-label="Close navigation"
          >
            <MsqdxIcon name="close" customSize={ICON_SIZE} />
          </IconButton>
        </Box>
      )}

      {/* Hauptnavigation – mittig zentriert, inkl. Menü-Toggle (Desktop) als erstes Element */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: isExpanded ? "stretch" : "center",
          justifyContent: "center",
          gap: ITEM_GAP,
        }}
      >
        {/* Menü ausklappen – Teil der normalen Nav, nur Desktop; Mobile später separat */}
        {mounted && !isMobile && (isExpanded ? (
          <Box
            component="button"
            type="button"
            onClick={handleToggleExpand}
            sx={{
              flexShrink: 0,
              height: ITEM_HEIGHT,
              padding: `${ITEM_PADDING_Y}px ${ITEM_PADDING_X}px`,
              margin: 0,
              borderRadius: ITEM_BORDER_RADIUS,
              width: "calc(100% - 8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "transparent",
              color: textColor,
              border: "none",
              cursor: "pointer",
              "&:hover": { backgroundColor: hoverBg, color: textColor },
              transition: "all 0.2s ease",
            }}
            aria-label={isExpanded ? "Navigation einklappen" : "Navigation ausklappen"}
          >
            <Box sx={{ marginRight: MSQDX_SPACING.scale.sm, display: "flex", alignItems: "center" }}>
              <MsqdxIcon name="menu_open" customSize={ICON_SIZE} />
            </Box>
            <MsqdxTypography
              variant="body2"
              sx={{
                fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
                color: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Menu
            </MsqdxTypography>
          </Box>
        ) : (
          <IconButton
            size="medium"
            onClick={handleToggleExpand}
            sx={{
              color: textColor,
              width: ITEM_HEIGHT,
              height: ITEM_HEIGHT,
              minWidth: ITEM_HEIGHT,
              minHeight: ITEM_HEIGHT,
              padding: 0,
              "&:hover": { backgroundColor: hoverBg },
            }}
            aria-label="Navigation ausklappen"
          >
            <MsqdxIcon name="menu" customSize={ICON_SIZE} />
          </IconButton>
        ))}

        {items.map((item) => {
          const active = isActive(item.path);
          if (!isExpanded) {
            return (
              <IconButton
                key={item.path}
                size="medium"
                component={LinkComponent}
                href={item.path}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={handleItemClick}
                sx={{
                  color: active ? textColor : textMuted,
                  width: ITEM_HEIGHT,
                  height: ITEM_HEIGHT,
                  minWidth: ITEM_HEIGHT,
                  minHeight: ITEM_HEIGHT,
                  padding: 0,
                  "&:hover": {
                    backgroundColor: active ? activeBgHover : hoverBg,
                    color: textColor,
                  },
                }}
                title={item.label}
                aria-label={item.label}
              >
                <MsqdxIcon name={item.icon} customSize={ICON_SIZE} />
              </IconButton>
            );
          }
          return (
            <Box
              key={item.path}
              component={LinkComponent}
              href={item.path}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={handleItemClick}
              sx={{
                flexShrink: 0,
                height: ITEM_HEIGHT,
                padding: `${ITEM_PADDING_Y}px ${ITEM_PADDING_X}px`,
                margin: 0,
                borderRadius: ITEM_BORDER_RADIUS,
                width: "calc(100% - 8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: active ? activeBg : "transparent",
                color: active ? textColor : textMuted,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: active ? activeBgHover : hoverBg,
                  color: textColor,
                },
                transition: "all 0.2s ease",
              }}
            >
              <Box sx={{ marginRight: MSQDX_SPACING.scale.sm, display: "flex", alignItems: "center" }}>
                <MsqdxIcon name={item.icon} customSize={ICON_SIZE} />
              </Box>
              <MsqdxTypography
                variant="body2"
                sx={{
                  fontWeight: active ? 600 : 400,
                  fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
                  color: "inherit",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.label}
              </MsqdxTypography>
            </Box>
          );
        })}
      </Box>

      {/* Unterer Bereich – weitere Menüpunkte (z. B. Settings), Theme-Toggle */}
      <Box
        sx={{
          marginTop: "auto",
          paddingTop: ITEM_GAP,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: isExpanded ? "stretch" : "center",
          gap: ITEM_GAP,
        }}
      >
        {(externalItems.length > 0 || onToggleTheme) && (
          <Divider
            sx={{
              marginBottom: ITEM_GAP,
              width: isExpanded ? "calc(100% - 16px)" : "80%",
              alignSelf: "center",
              borderColor: dividerColor,
            }}
          />
        )}
        {externalItems.map((item) =>
          !isExpanded ? (
            <IconButton
              key={item.path}
              size="medium"
              component={LinkComponent}
              href={item.path}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={handleItemClick}
              sx={{
                color: textMuted,
                width: ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                minWidth: ITEM_HEIGHT,
                minHeight: ITEM_HEIGHT,
                padding: 0,
                "&:hover": { backgroundColor: hoverBg, color: textColor },
              }}
              title={item.label}
              aria-label={item.label}
            >
              <MsqdxIcon name={item.icon} customSize={ICON_SIZE} />
            </IconButton>
          ) : (
            <Box
              key={item.path}
              component={LinkComponent}
              href={item.path}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={handleItemClick}
              sx={{
                flexShrink: 0,
                height: ITEM_HEIGHT,
                padding: `${ITEM_PADDING_Y}px ${ITEM_PADDING_X}px`,
                margin: 0,
                borderRadius: ITEM_BORDER_RADIUS,
                width: "calc(100% - 8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                color: textMuted,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": { backgroundColor: hoverBg, color: textColor },
                transition: "all 0.2s ease",
              }}
            >
              <Box sx={{ marginRight: MSQDX_SPACING.scale.sm, display: "flex", alignItems: "center" }}>
                <MsqdxIcon name={item.icon} customSize={ICON_SIZE} />
              </Box>
              <MsqdxTypography
                variant="body2"
                sx={{
                  fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
                  color: "inherit",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.label}
              </MsqdxTypography>
            </Box>
          )
        )}
        {onToggleTheme && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isExpanded ? "flex-start" : "center",
              paddingBottom: ITEM_GAP,
              gap: MSQDX_SPACING.scale.xs,
            }}
          >
            <IconButton
              size="medium"
              onClick={onToggleTheme}
              sx={{
                color: textColor,
                width: ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                minWidth: ITEM_HEIGHT,
                minHeight: ITEM_HEIGHT,
                padding: 0,
                "&:hover": { backgroundColor: hoverBg },
              }}
              aria-label="Toggle theme"
            >
              <MsqdxIcon
                name={themeMode === "dark" ? "light_mode" : "dark_mode"}
                customSize={ICON_SIZE}
              />
            </IconButton>
            {isExpanded && (
              <MsqdxTypography
                variant="body2"
                sx={{
                  fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
                  color: textColor,
                  whiteSpace: "nowrap",
                }}
              >
                {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
              </MsqdxTypography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
