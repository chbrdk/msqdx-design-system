# Atoms & Molecules Flicker Audit

**Date:** 2026-06-06  
**Scope:** Every `Msqdx*.tsx` under `packages/react/src/components/atoms` and `…/molecules` (stories excluded).

## How it runs

Automated guard: `packages/react/src/design-system-flicker-audit.test.ts`  
Helper unit tests: `packages/react/src/utils/atomA11y.test.ts`

## Rules checked

| Rule | Why |
|------|-----|
| No `setMounted` / `isMounted` gates | Avoid blank → full UI swap after hydration |
| No `transition: all` | Animates layout/size on first paint → flicker |
| No bare `MSQDX_EFFECTS.transitions.*` in `transition:` | CSS treats duration-only as `all` |
| No bare `MSQDX_BUTTON/AVATAR/SCROLLBAR.transition` | Same implicit-`all` issue |
| `useMediaQuery({ noSsr: true })` must set `defaultMatches: false` | Stable SSR markup |
| Layout sidebars (`AdminNav`, `CollapsiblePanel`) defer width transitions | `transitionsEnabled` + `requestAnimationFrame` |

## Atoms — summary

| Component | Status | Notes |
|-----------|--------|-------|
| AspectRatio | OK | Static layout wrapper |
| Avatar | Fixed | Was bare avatar token → `transitionInteractive` |
| Badge | OK | No transitions |
| Button / IconButton | Fixed | Was bare button token → `transitionInteractive` |
| Card | Fixed | Was bare effects token → targeted + transform when hoverable |
| Chip | OK | Targeted properties (prior fix) |
| CornerBox | OK | Decorative geometry |
| Divider | OK | Static |
| Icon | OK | Static |
| Input | OK | Already targeted border/bg/shadow |
| Label | OK | Static |
| Logo / LogoMark | OK | Static |
| Progress | Fixed | Bar fill uses `transitionProgressFill` |
| Scrollbar | Fixed | Thumb uses `transitionScrollbarThumb` |
| Typography | OK | Static |
| UserBadge | OK | Hover state only, no layout transition |

## Molecules — summary

| Component | Status | Notes |
|-----------|--------|-------|
| Accordion | OK | Explicit property lists; user-triggered expand |
| AdminNav | OK | Deferred width + targeted nav item transitions |
| Card (molecule) | OK | Delegates to atom Card |
| CheckboxField / RadioField | OK | Targeted color transitions |
| CircleContextMenu | OK | Targeted box-shadow/border |
| CollapsiblePanel | Fixed | Added `transitionsEnabled`, `defaultMatches: false` |
| CornerTabCard / Section | OK | Static layout |
| Dialog / Popover / Snackbar / Tooltip | OK | Targeted or MUI transition API |
| FormField / TextareaField / SearchField | OK | Input token transitions |
| GlassCard | OK | Targeted bg/border/shadow |
| Select | Fixed | Scrollbar thumb helper |
| Slider | OK | Targeted box-shadow on thumb |
| Stepper / Tabs | OK | Targeted (prior fix) |
| Switch | Fixed | Track uses `transitionSwitchTrack` |
| Toolbar | OK | Targeted; collapse is user-triggered |

## Out of scope (not atoms/molecules)

Prismion board components still use `transition: all` in places — not used by ECHON web.

## Deploy

Push `msqdx-design-system` to GitHub before ECHON Coolify web rebuild so Docker clone picks up fixes.
