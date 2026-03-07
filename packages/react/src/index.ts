/**
 * MSQDX Design System – React
 *
 * React components and re-export of tokens. Prefer importing tokens from `@msqdx/tokens` directly.
 */
export * from '@msqdx/tokens';
export * from './components';
/** Explicit re-export so bundlers (Next.js/webpack) resolve Prismion/Board components from the package entry. */
export * from './components/prismion';
export * from './types/prismion';
/** Board collision helper for placing new cards without overlap (e.g. in PLEXON). */
export { wouldOverlap } from './lib/board-utils';
