import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
import {
  MSQDX_COLORS,
  MSQDX_SPACING,
  MSQDX_TYPOGRAPHY,
  MSQDX_EFFECTS,
  MSQDX_ANIMATION_DURATION,
  MSQDX_ANIMATION_EASING,
  MSQDX_ANIMATION_TRANSITIONS,
  MSQDX_ANIMATIONS,
  MSQDX_ANIMATION_KEYFRAMES,
  MSQDX_BREAKPOINTS,
  MSQDX_BREAKPOINT_LABELS,
  MSQDX_INTERACTION,
  MSQDX_LAYOUT,
  MSQDX_THEME,
  MSQDX_RESPONSIVE,
  MSQDX_BUTTON,
  MSQDX_CHIP,
  MSQDX_BADGE,
  MSQDX_AVATAR,
  MSQDX_INPUT,
  MSQDX_SCROLLBAR,
  MSQDX_ICONS,
} from '@msqdx/tokens';

const meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Alle Design Tokens des MSQDX Design Systems.
Verwendung: \`import { MSQDX_COLORS, MSQDX_SPACING, ... } from '@msqdx/tokens';\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Safe Object.entries – avoids "Cannot convert undefined or null to object" when tokens are missing. */
function safeEntries<T>(o: T | null | undefined): [string, unknown][] {
  return Object.entries(o ?? ({} as T));
}

const TokenRow = ({
  name,
  value,
  preview,
}: {
  name: string;
  value: string | number;
  preview?: React.ReactNode;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography variant="body2" fontFamily="monospace" sx={{ minWidth: 180 }}>
      {name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {typeof value === 'string' ? value : `${value}`}
    </Typography>
    {preview != null && <Box sx={{ ml: 'auto' }}>{preview}</Box>}
  </Box>
);

export const Overview: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h4">Design Tokens Übersicht</Typography>
      <Typography variant="body1" color="text.secondary">
        Das MSQDX Design System nutzt zentrale Tokens für Farben, Abstände, Typografie, Effekte, Animationen, Breakpoints und Layout.
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6">Exportierte Token-Objekte</Typography>
          {['MSQDX_COLORS', 'MSQDX_SPACING', 'MSQDX_TYPOGRAPHY', 'MSQDX_EFFECTS', 'MSQDX_ANIMATION_DURATION', 'MSQDX_ANIMATION_EASING', 'MSQDX_ANIMATION_TRANSITIONS', 'MSQDX_ANIMATIONS', 'MSQDX_ANIMATION_KEYFRAMES', 'MSQDX_BREAKPOINTS', 'MSQDX_INTERACTION', 'MSQDX_LAYOUT', 'MSQDX_THEME', 'MSQDX_RESPONSIVE'].map(
            (token) => (
              <Typography key={token} variant="body2" fontFamily="monospace">
                {token}
              </Typography>
            )
          )}
        </Stack>
      </Paper>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Brand (MSQDX_COLORS.brand)</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {safeEntries(MSQDX_COLORS?.brand).map(([key, value]) =>
          typeof value === 'string' ? (
            <Box key={key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 64, height: 64, borderRadius: 1, bgcolor: value, border: '1px solid', borderColor: 'divider' }} />
              <Typography variant="caption" fontFamily="monospace">{key}</Typography>
              <Typography variant="caption" color="text.secondary">{value}</Typography>
            </Box>
          ) : null
        )}
      </Box>
      <Typography variant="h5">Status (MSQDX_COLORS.status)</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {safeEntries(MSQDX_COLORS?.status).map(([key, value]) => (
          <Box key={key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: 1, bgcolor: value, border: '1px solid', borderColor: 'divider' }} />
            <Typography variant="caption" fontFamily="monospace">{key}</Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Border Radius (MSQDX_SPACING.borderRadius)</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-end' }}>
        {safeEntries(MSQDX_SPACING?.borderRadius).map(([key, value]) => {
          if (typeof value !== 'number') return null;
          return (
            <Box key={key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: `${value}px`, bgcolor: 'primary.main' }} />
              <Typography variant="caption" fontFamily="monospace">{key}</Typography>
              <Typography variant="caption" color="text.secondary">{value}px</Typography>
            </Box>
          );
        })}
      </Box>
      <Typography variant="h5">Scale (MSQDX_SPACING.scale)</Typography>
      <Paper variant="outlined" sx={{ p: 2, maxWidth: 480 }}>
        {safeEntries(MSQDX_SPACING?.scale).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} preview={<Box sx={{ width: Math.min(Number(value) || 0, 120), height: 16, bgcolor: 'action.hover', borderRadius: 0.5 }} />} />
        ))}
      </Paper>
    </Stack>
  ),
};

/** Typography tokens – Story-Name bewusst TypographyTokens wegen Kollision mit MUI Typography */
export const TypographyTokens: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Font Family (MSQDX_TYPOGRAPHY.fontFamily)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_TYPOGRAPHY?.fontFamily).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
      <Typography variant="h5">Font Size (MSQDX_TYPOGRAPHY.fontSize)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_TYPOGRAPHY?.fontSize).map(([key, value]) => (
          <Box key={key} sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" fontFamily="monospace" sx={{ fontSize: value }}>The quick brown fox – {key}</Typography>
            <Typography variant="caption" color="text.secondary">{value}</Typography>
          </Box>
        ))}
      </Paper>
    </Stack>
  ),
};

export const Effects: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Shadows (MSQDX_EFFECTS.shadows)</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {safeEntries(MSQDX_EFFECTS?.shadows).map(([key, value]) => {
          if (typeof value === 'object') return null;
          return (
            <Box key={key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 80, height: 80, borderRadius: 2, bgcolor: 'background.paper', boxShadow: value }} />
              <Typography variant="caption" fontFamily="monospace">{key}</Typography>
            </Box>
          );
        })}
      </Box>
      {safeEntries(MSQDX_EFFECTS?.doubleBorder).length > 0 && (
        <>
          <Typography variant="h5">Double Border (MSQDX_EFFECTS.doubleBorder)</Typography>
          <Typography variant="body2" color="text.secondary">
            Zwei Rahmen, eine Farbe, nach außen ausfadend. Abstandsoptionen: tight (2px), default (4px), wide (6px).
          </Typography>
          {(['tight', 'default', 'wide'] as const).map((gapKey) => {
            const token = MSQDX_EFFECTS?.doubleBorder as Record<string, Record<string, string> | string> | undefined;
            const source = gapKey === 'default' ? token : token?.[gapKey];
            if (!source || typeof source !== 'object') return null;
            const labels = { tight: 'Abstand tight (2px)', default: 'Abstand default (4px)', wide: 'Abstand wide (6px)' };
            return (
              <Box key={gapKey}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {labels[gapKey]}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                  {(['default', 'strong', 'focus'] as const).map((variant) => {
                    const value = typeof source[variant] === 'string' ? source[variant] : (token as Record<string, string>)?.[variant];
                    if (typeof value !== 'string') return null;
                    return (
                      <Box key={variant} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, width: 140, borderRadius: 2, bgcolor: 'background.paper', boxShadow: value }}
                        >
                          <Typography variant="body2">Card</Typography>
                          <Typography variant="caption" color="text.secondary">{variant}</Typography>
                        </Paper>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            );
          })}
        </>
      )}
      {safeEntries(MSQDX_EFFECTS?.tripleBorder).length > 0 && (
        <>
          <Typography variant="h5">Triple Border (MSQDX_EFFECTS.tripleBorder)</Typography>
          <Typography variant="body2" color="text.secondary">
            Drei Rahmen, eine Farbe (100 % / 75 % / 40 %). Abstandsoptionen: tight (2px), default (4px), wide (6px).
          </Typography>
          {(['tight', 'default', 'wide'] as const).map((gapKey) => {
            const token = MSQDX_EFFECTS?.tripleBorder as Record<string, Record<string, string> | string> | undefined;
            const source = gapKey === 'default' ? token : token?.[gapKey];
            if (!source || typeof source !== 'object') return null;
            const labels = { tight: 'Abstand tight (2px)', default: 'Abstand default (4px)', wide: 'Abstand wide (6px)' };
            return (
              <Box key={gapKey}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {labels[gapKey]}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                  {(['default', 'strong', 'focus'] as const).map((variant) => {
                    const value = typeof source[variant] === 'string' ? source[variant] : (token as Record<string, string>)?.[variant];
                    if (typeof value !== 'string') return null;
                    return (
                      <Box key={variant} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, width: 140, borderRadius: 2, bgcolor: 'background.paper', boxShadow: value }}
                        >
                          <Typography variant="body2">Card</Typography>
                          <Typography variant="caption" color="text.secondary">{variant}</Typography>
                        </Paper>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            );
          })}
        </>
      )}
      <Typography variant="h5">Duration (MSQDX_EFFECTS.duration)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_EFFECTS?.duration).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
    </Stack>
  ),
};

const exampleKeyframes = {
  fadeIn: keyframes`from { opacity: 0; } to { opacity: 1; }`,
  slideUp: keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`,
  scaleIn: keyframes`from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); }`,
  spin: keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`,
  pulse: keyframes`0%, 100% { opacity: 1; } 50% { opacity: 0.6; }`,
};

export const AnimationTokens: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Beispiele (Hover / Keyframes)</Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle2" gutterBottom color="text.secondary">
          Duration: Hover über die Kacheln
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1, flexWrap: 'wrap' }}>
          {(['fast', 'standard', 'slow'] as const).map((key) => (
            <Box
              key={key}
              sx={{
                width: 100,
                height: 80,
                borderRadius: 2,
                bgcolor: 'primary.main',
                transition: `background-color ${MSQDX_ANIMATION_DURATION?.[key] ?? '0.2s'}`,
                '&:hover': { bgcolor: 'primary.dark' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" sx={{ color: 'primary.contrastText' }}>{key}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
      <Typography variant="subtitle2" gutterBottom color="text.secondary">
        Keyframe-Animationen
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: 'primary.main', animation: `${exampleKeyframes.fadeIn} ${MSQDX_ANIMATION_DURATION?.standard ?? '0.3s'} ${MSQDX_ANIMATION_EASING?.easeOut ?? 'ease-out'} 1`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" sx={{ color: 'primary.contrastText' }}>fadeIn</Typography>
          </Box>
          <Box sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: 'secondary.main', animation: `${exampleKeyframes.slideUp} ${MSQDX_ANIMATION_DURATION?.standard ?? '0.3s'} ${MSQDX_ANIMATION_EASING?.easeOut ?? 'ease-out'} 1`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" sx={{ color: 'secondary.contrastText' }}>slideUp</Typography>
          </Box>
          <Box sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: 'success.main', animation: `${exampleKeyframes.spin} 1.5s ${MSQDX_ANIMATION_EASING?.linear ?? 'linear'} infinite`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" sx={{ color: 'success.contrastText' }}>spin</Typography>
          </Box>
          <Box sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: 'warning.main', animation: `${exampleKeyframes.pulse} 1.5s ${MSQDX_ANIMATION_EASING?.easeInOut ?? 'ease-in-out'} infinite`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" sx={{ color: 'warning.contrastText' }}>pulse</Typography>
          </Box>
        </Stack>
      </Paper>
      <Typography variant="h5">Duration (MSQDX_ANIMATION_DURATION)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_ANIMATION_DURATION).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
      <Typography variant="h5">Easing (MSQDX_ANIMATION_EASING)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_ANIMATION_EASING).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
      <Typography variant="h5">Transitions (MSQDX_ANIMATION_TRANSITIONS)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_ANIMATION_TRANSITIONS).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
      <Typography variant="h5">Presets (MSQDX_ANIMATIONS)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_ANIMATIONS).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
      <Typography variant="h5">Keyframe-Namen (MSQDX_ANIMATION_KEYFRAMES)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_ANIMATION_KEYFRAMES).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
    </Stack>
  ),
};

export const Interaction: Story = {
  render: () => {
    const interaction = MSQDX_INTERACTION ?? {};
    const minTouchTarget = (interaction as { minTouchTarget?: Record<string, number> }).minTouchTarget;
    const focusOutline = (interaction as { focusOutline?: Record<string, number | string> }).focusOutline;
    const reducedMotion = (interaction as { reducedMotion?: Record<string, string | number> }).reducedMotion;
    return (
      <Stack spacing={4}>
        <Typography variant="h5">Interaction & A11y (MSQDX_INTERACTION)</Typography>
        <Typography variant="body2" color="text.secondary">
          Min Touch Target, Focus Outline und Reduced Motion für barrierefreie UIs.
        </Typography>

        {minTouchTarget && (
          <>
            <Typography variant="subtitle1">Min Touch Target (MSQDX_INTERACTION.minTouchTarget)</Typography>
            <Typography variant="body2" color="text.secondary">
              Mindestgröße für klickbare/touchbare Elemente (WCAG, Mobile). Empfehlung: mind. 44×44px.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {safeEntries(minTouchTarget).map(([key, value]) => (
                <TokenRow key={key} name={key} value={`${value}px`} />
              ))}
            </Paper>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
              {minTouchTarget.min != null && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: minTouchTarget.min, height: minTouchTarget.min, bgcolor: 'primary.main', borderRadius: 1 }} />
                  <Typography variant="caption">min (44px)</Typography>
                </Box>
              )}
              {minTouchTarget.recommended != null && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: minTouchTarget.recommended, height: minTouchTarget.recommended, bgcolor: 'primary.main', borderRadius: 1 }} />
                  <Typography variant="caption">recommended (48px)</Typography>
                </Box>
              )}
              {minTouchTarget.compact != null && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: minTouchTarget.compact, height: minTouchTarget.compact, bgcolor: 'action.hover', borderRadius: 1 }} />
                  <Typography variant="caption">compact (32px)</Typography>
                </Box>
              )}
            </Stack>
          </>
        )}

        {focusOutline && (
          <>
            <Typography variant="subtitle1">Focus Outline (MSQDX_INTERACTION.focusOutline)</Typography>
            <Typography variant="body2" color="text.secondary">
              Für :focus-visible – outline-Werte (ergänzt focusRing box-shadow).
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {safeEntries(focusOutline).map(([key, value]) => (
                <TokenRow key={key} name={key} value={String(value)} />
              ))}
            </Paper>
            <Typography variant="subtitle2">Beispiel: Fokus mit outline</Typography>
            <Box
              component="button"
              type="button"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                outline: focusOutline.width ? `${focusOutline.width}px ${focusOutline.style ?? 'solid'} currentColor` : undefined,
                outlineOffset: focusOutline.offset ?? 2,
                '&:focus-visible': { borderColor: 'primary.main' },
              }}
            >
              Fokus mich (Tab)
            </Box>
          </>
        )}

        {reducedMotion && (
          <>
            <Typography variant="subtitle1">Reduced Motion (MSQDX_INTERACTION.reducedMotion)</Typography>
            <Typography variant="body2" color="text.secondary">
              Bei prefers-reduced-motion: reduce – Animationen deaktivieren oder auf 0ms setzen.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {safeEntries(reducedMotion).map(([key, value]) => (
                <TokenRow key={key} name={key} value={String(value)} />
              ))}
            </Paper>
            <Typography variant="caption" color="text.secondary" component="p">
              Verwendung: @media (prefers-reduced-motion: reduce) &#123; transition-duration: {reducedMotion.duration ?? '0ms'} &#125;
            </Typography>
          </>
        )}
      </Stack>
    );
  },
};

export const Breakpoints: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h5">Breakpoints (MSQDX_BREAKPOINTS)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_BREAKPOINTS).map(([key, value]) => (
          <TokenRow key={key} name={key} value={`${value}px`} />
        ))}
      </Paper>
      <Typography variant="h5">Labels (MSQDX_BREAKPOINT_LABELS)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_BREAKPOINT_LABELS).map(([key, value]) => (
          <TokenRow key={key} name={key} value={value} />
        ))}
      </Paper>
    </Stack>
  ),
};

export const Layout: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h5">Grid (MSQDX_LAYOUT.grid)</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2" fontFamily="monospace">{JSON.stringify(MSQDX_LAYOUT?.grid?.columns ?? {}, null, 2)}</Typography>
      </Paper>
      <Typography variant="h5">Aspect Ratio (MSQDX_LAYOUT.aspectRatio)</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {safeEntries(MSQDX_LAYOUT?.aspectRatio).map(([key, value]) => (
          <Box key={key} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 120, aspectRatio: value, bgcolor: 'action.hover', borderRadius: 1 }} />
            <Typography variant="caption" fontFamily="monospace">{key}</Typography>
            <Typography variant="caption" color="text.secondary">{value}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="h5">Max Width / Min Height</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {safeEntries(MSQDX_LAYOUT?.maxWidth).slice(0, 6).map(([key, value]) => (
          <TokenRow key={key} name={`maxWidth.${key}`} value={value} />
        ))}
      </Paper>
    </Stack>
  ),
};

/**
 * Alignment (Grid/Flex/Text) – justify, align, placeContent, placeItems, text, direction, gridFlow
 */
export const Alignment: Story = {
  render: () => {
    const alignment = MSQDX_LAYOUT.alignment;
    const direction = MSQDX_LAYOUT.direction ?? {};
    const gridFlow = MSQDX_LAYOUT.gridFlow ?? {};
    if (!alignment || typeof alignment !== 'object') {
      return (
        <Typography color="text.secondary">
          Tokens MSQDX_LAYOUT.alignment sind noch nicht im gebauten @msqdx/tokens enthalten. Bitte <code>packages/tokens</code> neu bauen (npm run build).
        </Typography>
      );
    }
    return (
      <Stack spacing={4}>
        <Typography variant="h5">Alignment (MSQDX_LAYOUT.alignment)</Typography>
        <Typography variant="body2" color="text.secondary">
          Für Flex/Grid: justify-content, align-items, place-content, place-items, text-align.
        </Typography>

        <Typography variant="subtitle2">justify (justify-content)</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {safeEntries(alignment.justify).map(([key, value]) => (
            <TokenRow key={key} name={key} value={value} />
          ))}
        </Paper>

        <Typography variant="subtitle2">align (align-items)</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {safeEntries(alignment.align).map(([key, value]) => (
            <TokenRow key={key} name={key} value={value} />
          ))}
        </Paper>

        <Typography variant="subtitle2">Beispiele: justify-content</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {(['start', 'center', 'end', 'between', 'evenly'] as const).map((key) => (
            <Box key={key} sx={{ width: 200 }}>
              <Typography variant="caption" fontFamily="monospace" display="block" gutterBottom>{key}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: alignment.justify?.[key],
                  gap: 0.5,
                  p: 0.5,
                  height: 40,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: 0.5 }} />
                <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: 0.5 }} />
                <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: 0.5 }} />
              </Box>
            </Box>
          ))}
        </Box>

        <Typography variant="subtitle2">placeContent (Grid)</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {safeEntries(alignment.placeContent).map(([key, value]) => (
            <TokenRow key={key} name={key} value={value} />
          ))}
        </Paper>

        <Typography variant="subtitle2">placeItems (Grid)</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {safeEntries(alignment.placeItems).map(([key, value]) => (
            <TokenRow key={key} name={key} value={value} />
          ))}
        </Paper>

        <Typography variant="subtitle2">text (text-align)</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {safeEntries(alignment.text).map(([key, value]) => (
            <TokenRow key={key} name={key} value={value} />
          ))}
        </Paper>

        <Typography variant="h5">Direction (MSQDX_LAYOUT.direction)</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {safeEntries(direction).map(([key, value]) => (
            <TokenRow key={key} name={key} value={value} />
          ))}
        </Paper>

        <Typography variant="h5">Grid Flow (MSQDX_LAYOUT.gridFlow)</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {safeEntries(gridFlow).map(([key, value]) => (
            <TokenRow key={key} name={key} value={value} />
          ))}
        </Paper>
      </Stack>
    );
  },
};

/**
 * Overflow & Cursor – overflow, overflowX, overflowY, cursor
 */
export const OverflowAndCursor: Story = {
  render: () => {
    const overflowEntries = safeEntries(MSQDX_LAYOUT?.overflow);
    const cursorEntries = safeEntries(MSQDX_LAYOUT?.cursor);
    const hasOverflow = overflowEntries.length > 0;
    const hasCursor = cursorEntries.length > 0;

    if (!hasOverflow && !hasCursor) {
      return (
        <Typography color="text.secondary">
          Tokens overflow/cursor sind noch nicht im gebauten @msqdx/tokens enthalten. Bitte <code>packages/tokens</code> neu bauen (npm run build).
        </Typography>
      );
    }

    return (
      <Stack spacing={4}>
        {hasOverflow && (
          <>
            <Typography variant="h5">Overflow (MSQDX_LAYOUT.overflow)</Typography>
            <Typography variant="body2" color="text.secondary">
              Für scrollbare Bereiche und Clipping: visible, hidden, clip, scroll, auto.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {overflowEntries.map(([key, value]) => (
                <TokenRow key={key} name={key} value={value} />
              ))}
            </Paper>
            <Typography variant="subtitle2">Beispiel: overflow auto (scrollbar bei Bedarf)</Typography>
            <Box sx={{ height: 100, overflow: (MSQDX_LAYOUT?.overflow as Record<string, string> | undefined)?.auto ?? 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', borderRadius: 1 }}>
                Inhalt höher als Container → Scrollbar
              </Box>
            </Box>
          </>
        )}
        {hasCursor && (
          <>
            <Typography variant="h5">Cursor (MSQDX_LAYOUT.cursor)</Typography>
            <Typography variant="body2" color="text.secondary">
              Interaktionszustand: pointer, not-allowed, grab, etc.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {cursorEntries.map(([key, value]) => (
                <TokenRow key={key} name={key} value={value} />
              ))}
            </Paper>
            <Typography variant="subtitle2">Beispiele: Hover für Cursor</Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              {(['default', 'pointer', 'notAllowed', 'grab', 'text', 'wait'] as const).map((key) => (
                <Box
                  key={key}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    cursor: (MSQDX_LAYOUT?.cursor as Record<string, string> | undefined)?.[key] ?? 'default',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="caption" fontFamily="monospace">{key}</Typography>
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    );
  },
};

export const ComponentTokens: Story = {
  render: () => (
    <Stack spacing={3}>
      {[
        { title: 'MSQDX_BUTTON', data: MSQDX_BUTTON },
        { title: 'MSQDX_CHIP', data: MSQDX_CHIP },
        { title: 'MSQDX_BADGE', data: MSQDX_BADGE },
        { title: 'MSQDX_AVATAR', data: MSQDX_AVATAR },
        { title: 'MSQDX_INPUT', data: MSQDX_INPUT },
        { title: 'MSQDX_SCROLLBAR', data: MSQDX_SCROLLBAR },
        { title: 'MSQDX_ICONS', data: MSQDX_ICONS },
      ].map(({ title, data }) => (
        <Box key={title}>
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Paper variant="outlined" sx={{ p: 2, overflow: 'auto' }}>
            <Typography component="pre" variant="body2" fontFamily="monospace" sx={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {JSON.stringify(data, null, 2)}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Stack>
  ),
};
