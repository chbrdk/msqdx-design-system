'use client';

import { useState, useEffect } from 'react';
import { Box, Divider, IconButton, Portal, useMediaQuery, useTheme, alpha } from '@mui/material';
import { MSQDX_COLORS, MSQDX_NEUTRAL, MSQDX_SPACING, MSQDX_ICONS, MSQDX_TYPOGRAPHY } from '@msqdx/tokens';
import type { ReactNode, ElementType } from 'react';
import { MsqdxIcon } from '../../atoms/Icon/MsqdxIcon';
import { MsqdxTypography } from '../../atoms/Typography/MsqdxTypography';
import { ADMIN_NAV_ROOT_Z_INDEX } from './admin-nav-layout';

export type AdminNavItem = {
    label: string;
    path?: string;
    icon: string;
    external?: boolean;
    /** When true, active only when currentPath === path (exact match). Use for root/dashboard links. */
    exact?: boolean;
    /** Optional click handler for actions (e.g. opening modals) instead of navigation. */
    onClick?: () => void;
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
    themeMode?: 'light' | 'dark';
    /** Optional theme toggle callback; when set, shows theme toggle at bottom. */
    onToggleTheme?: () => void;
    /** Link component (e.g. Next.js Link). Must accept href and children. */
    linkComponent?: ElementType<{ href: string; children: ReactNode; target?: string; rel?: string }>;
    /** Optional class name for the nav root. */
    className?: string;
    /** Optional sx for the nav root. */
    sx?: Record<string, unknown>;
    /** Brand-Farbe für Sidebar-Hintergrund (z. B. abgestimmt mit MsqdxAppLayout brandColor). */
    brandColor?: 'purple' | 'yellow' | 'pink' | 'orange' | 'green' | 'black';
};

/** Desktop / docked sidebar: compact row height. */
const ITEM_HEIGHT_COMPACT = 32;
/** Mobile & tablet drawer: ≥44px touch target baseline. */
const ITEM_HEIGHT_TOUCH = 48;
const ICON_SIZE_COMPACT = MSQDX_ICONS.sizes.lg; // 24px
const ICON_SIZE_TOUCH = 28;
const ITEM_PADDING_Y_COMPACT = 4;
const ITEM_PADDING_Y_TOUCH = 10;
const ITEM_PADDING_X = MSQDX_SPACING.scale.xxs;
/** MUI spacing units (theme spacing multiplier). */
const ITEM_GAP_COMPACT = 2;
const ITEM_GAP_TOUCH = 2;
const ITEM_BORDER_RADIUS = MSQDX_SPACING.borderRadius.sm;
const NAV_ITEM_TRANSITION = 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease';

export const MsqdxAdminNav = ({
    open,
    onClose,
    currentPath,
    items,
    externalItems = [],
    themeMode,
    onToggleTheme,
    linkComponent: LinkComponent = 'a',
    className,
    sx,
    brandColor,
}: MsqdxAdminNavProps) => {
    const theme = useTheme();
    /** Overlay drawer below `md`; docked rail from `md` up (avoids dead zone with hidden hamburger). */
    const isDrawerMode = useMediaQuery(theme.breakpoints.down('md'), {
        noSsr: true,
        defaultMatches: false,
    });
    const [transitionsEnabled, setTransitionsEnabled] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setTransitionsEnabled(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const useCompactChrome = !isDrawerMode;
    const itemHeight = useCompactChrome ? ITEM_HEIGHT_COMPACT : ITEM_HEIGHT_TOUCH;
    const iconSize = useCompactChrome ? ICON_SIZE_COMPACT : ICON_SIZE_TOUCH;
    const itemPaddingY = useCompactChrome ? ITEM_PADDING_Y_COMPACT : ITEM_PADDING_Y_TOUCH;
    const itemGap = useCompactChrome ? ITEM_GAP_COMPACT : ITEM_GAP_TOUCH;
    const labelFontSize = useCompactChrome ? MSQDX_TYPOGRAPHY.fontSize.sm : MSQDX_TYPOGRAPHY.fontSize.md;

    const isActive = (path: string, exact?: boolean) => {
        if (exact || path === '/' || path === '') return currentPath === path;
        return currentPath === path || (currentPath?.startsWith(path) ?? false);
    };

    const handleItemClick = () => {
        if (isDrawerMode) onClose();
    };

    const drawerWidth = {
        xs: 'min(420px, calc(100vw - 16px))',
        sm: 'min(440px, calc(100vw - 24px))',
        md: 'min(420px, calc(100vw - 32px))',
    };

    const brandBg =
        brandColor === 'black' ? MSQDX_COLORS.brand.black : brandColor ? MSQDX_COLORS.brand[brandColor] : null;
    const navBg = brandBg ?? MSQDX_NEUTRAL[900];
    const borderColor = brandBg ?? MSQDX_NEUTRAL[800];
    const isLightNav = brandBg != null && brandColor !== 'black';
    const textColor = isLightNav ? '#000000' : alpha('#fff', 0.9);
    const textMuted = isLightNav ? alpha('#000', 0.7) : alpha('#fff', 0.7);
    const hoverBg = isLightNav ? alpha('#000', 0.08) : alpha('#fff', 0.1);
    const activeBg = isLightNav ? alpha('#000', 0.12) : alpha('#fff', 0.15);
    const activeBgHover = isLightNav ? alpha('#000', 0.18) : alpha('#fff', 0.2);
    const dividerColor = isLightNav ? alpha('#000', 0.2) : alpha('#fff', 0.2);

    const navRoot = (
        <Box
            component="nav"
            className={className ?? 'msqdx-admin-nav'}
            sx={{
                position: isDrawerMode ? 'fixed' : 'relative',
                top: 0,
                left: 0,
                height: isDrawerMode ? '100dvh' : '100vh',
                maxHeight: isDrawerMode ? '100dvh' : undefined,
                width: isDrawerMode ? drawerWidth : 'auto',
                maxWidth: isDrawerMode ? undefined : 'clamp(180px, 20vw, 240px)',
                borderRight: `1px solid ${borderColor}`,
                backgroundColor: navBg,
                transform: isDrawerMode ? (open ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
                transition: transitionsEnabled ? 'width 0.3s ease, transform 0.3s ease' : 'none',
                zIndex: isDrawerMode ? ADMIN_NAV_ROOT_Z_INDEX.xs : ADMIN_NAV_ROOT_Z_INDEX.md,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingInline: MSQDX_SPACING.padding.xxs,
                paddingBottom: isDrawerMode ? 'max(12px, env(safe-area-inset-bottom, 0px))' : undefined,
                ...sx,
            }}
        >
            {/* Close button (drawer: mobile & tablet) */}
            {isDrawerMode && (
                <Box sx={{ display: 'flex', alignSelf: 'flex-end', justifyContent: 'flex-end', p: itemGap }}>
                    <IconButton
                        size="large"
                        onClick={onClose}
                        sx={{ color: textColor, '&:hover': { backgroundColor: hoverBg } }}
                        aria-label="Close navigation"
                    >
                        <MsqdxIcon name="close" customSize={iconSize} />
                    </IconButton>
                </Box>
            )}

            {/* Hauptnavigation – mittig zentriert, inkl. Menü-Toggle (Desktop) als erstes Element */}
            <Box
                sx={{
                    flex: 1,
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: itemGap,
                }}
            >
                {/* Menü ausklappen – nur im docked Layout (lg+) */}
                {items.map((item) => {
                    const active = item.path ? isActive(item.path, item.exact) : false;

                    const content = (
                        <Box
                            sx={{
                                flexShrink: 0,
                                padding: `${MSQDX_SPACING.borderRadius.button / 4}px ${MSQDX_SPACING.borderRadius.button / 2}px`,
                                margin: 0,
                                borderRadius: `${MSQDX_SPACING.borderRadius.button}px`,
                                width: 'auto',
                                display: 'flex',
                                flexDirection: isDrawerMode ? 'row' : 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                columnGap: MSQDX_SPACING.scale.xxs,
                                rowGap: '4px',
                                backgroundColor: active ? activeBg : 'transparent',
                                color: active ? textColor : textMuted,
                                textDecoration: 'none',
                                cursor: 'pointer',
                                border: 'none',
                                fontFamily: 'inherit',
                                '&:hover': {
                                    backgroundColor: active ? activeBgHover : hoverBg,
                                    color: textColor,
                                },
                                transition: NAV_ITEM_TRANSITION,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <MsqdxIcon name={item.icon} customSize={iconSize} />
                            </Box>
                            <MsqdxTypography
                                variant="body2"
                                sx={{
                                    fontWeight: active ? 600 : 400,
                                    fontSize: labelFontSize,
                                    color: 'inherit',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item.label}
                            </MsqdxTypography>
                        </Box>
                    );

                    if (item.path) {
                        return (
                            <LinkComponent
                                key={item.label + item.path}
                                href={item.path}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noreferrer' : undefined}
                                onClick={() => {
                                    if (item.onClick) {
                                        item.onClick();
                                    } else {
                                        handleItemClick();
                                    }
                                }}
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                            >
                                {content}
                            </LinkComponent>
                        );
                    }

                    return (
                        <Box
                            key={item.label}
                            component="button"
                            type="button"
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick();
                                } else {
                                    handleItemClick();
                                }
                            }}
                            sx={{ p: 0, m: 0, border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                        >
                            {content}
                        </Box>
                    );
                })}
            </Box>

            {/* Unterer Bereich – weitere Menüpunkte (z. B. Settings), Theme-Toggle */}
            <Box
                sx={{
                    marginTop: 'auto',
                    paddingTop: itemGap,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: itemGap,
                }}
            >
                {(externalItems.length > 0 || onToggleTheme) && (
                    <Divider
                        sx={{
                            marginBottom: itemGap,
                            width: '80%',
                            alignSelf: 'center',
                            borderColor: dividerColor,
                        }}
                    />
                )}
                {externalItems.map((item) => {
                    const content = (
                        <Box
                            sx={{
                                flexShrink: 0,
                                height: 'auto',
                                padding: `${itemPaddingY}px ${ITEM_PADDING_X}px`,
                                marginBottom: `${MSQDX_SPACING.gap.xxl}px`,
                                borderRadius: ITEM_BORDER_RADIUS,
                                width: 'calc(100% - 8px)',
                                display: 'flex',
                                flexDirection: isDrawerMode ? 'row' : 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: textMuted,
                                textDecoration: 'none',
                                cursor: 'pointer',
                                border: 'none',
                                fontFamily: 'inherit',
                                '&:hover': { backgroundColor: hoverBg, color: textColor },
                                transition: NAV_ITEM_TRANSITION,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <MsqdxIcon name={item.icon} customSize={iconSize} />
                            </Box>
                            <MsqdxTypography
                                variant="body2"
                                sx={{
                                    fontSize: labelFontSize,
                                    color: 'inherit',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item.label}
                            </MsqdxTypography>
                        </Box>
                    );

                    if (item.path) {
                        return (
                            <LinkComponent
                                key={item.label + item.path}
                                href={item.path}
                                target={item.external ? '_blank' : undefined}
                                rel={item.external ? 'noreferrer' : undefined}
                                onClick={() => {
                                    if (item.onClick) {
                                        item.onClick();
                                    } else {
                                        handleItemClick();
                                    }
                                }}
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                            >
                                {content}
                            </LinkComponent>
                        );
                    }

                    return (
                        <Box
                            key={item.label}
                            component="button"
                            type="button"
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick();
                                } else {
                                    handleItemClick();
                                }
                            }}
                            sx={{ p: 0, m: 0, border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                        >
                            {content}
                        </Box>
                    );
                })}
                {onToggleTheme && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: itemGap,
                            gap: MSQDX_SPACING.scale.xs,
                        }}
                    >
                        <IconButton
                            size="medium"
                            onClick={onToggleTheme}
                            sx={{
                                color: textColor,
                                width: itemHeight,
                                height: itemHeight,
                                minWidth: itemHeight,
                                minHeight: itemHeight,
                                padding: 0,
                                '&:hover': { backgroundColor: hoverBg },
                            }}
                            aria-label="Toggle theme"
                        >
                            <MsqdxIcon name={themeMode === 'dark' ? 'light_mode' : 'dark_mode'} customSize={iconSize} />
                        </IconButton>
                        <MsqdxTypography
                            variant="body2"
                            sx={{
                                fontSize: labelFontSize,
                                color: textColor,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </MsqdxTypography>
                    </Box>
                )}
            </Box>
        </Box>
    );

    if (isDrawerMode) {
        return <Portal>{navRoot}</Portal>;
    }

    return navRoot;
};
