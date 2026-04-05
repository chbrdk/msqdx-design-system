/**
 * Root `<nav>` stacking for MsqdxAdminNav.
 * Mobile: fixed overlay must sit above app chrome (e.g. CHECKION AppShell header z-index ~100001).
 * Desktop: low positive z-index so the nav column wins trivial overlaps with the main pane.
 */
export const ADMIN_NAV_ROOT_Z_INDEX = { xs: 100_002, md: 2 } as const;
