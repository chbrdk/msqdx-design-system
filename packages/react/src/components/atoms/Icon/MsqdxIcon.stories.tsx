import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack, Typography } from '@mui/material';
import { MsqdxIcon } from './MsqdxIcon';
import { MSQDX_ICONS, MSQDX_ICON_NAMES } from '@msqdx/tokens';

const meta = {
  title: 'Design System/Atoms/Icon',
  component: MsqdxIcon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Icon-Atom: Material Symbols (Outlined, Variable Font) mit Token-Größen und -Weights.

## Features
- **Token-Größen**: xs, sm, md, lg, xl, xxl (MSQDX_ICONS.sizes)
- **Weights**: thin (100), light (200), regular (300), medium (400), bold (500) – Material Symbols Variable Font
- **Name**: Material-Name (z. B. Add, CheckCircle); "Outlined" wird ignoriert, PascalCase → Symbol-ID
- **A11y**: \`decorative\` bzw. \`aria-hidden\` wenn kein aria-label/title

## Usage
\`\`\`tsx
<MsqdxIcon name="Add" size="md" />
<MsqdxIcon name="Settings" size="lg" weight="regular" />
<MsqdxIcon name="Check" customSize={24} aria-label="Erledigt" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Material Symbol name (e.g. Add, CheckCircle)',
    },
    size: {
      control: 'select',
      options: Object.keys(MSQDX_ICONS.sizes),
      description: 'Token size',
    },
    weight: {
      control: 'select',
      options: Object.keys(MSQDX_ICONS.weight),
      description: 'Variable font weight',
    },
    decorative: {
      control: 'boolean',
      description: 'Hide from screen readers when true',
    },
  },
} satisfies Meta<typeof MsqdxIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Add',
    size: 'md',
    weight: 'thin', // Standard: immer thin
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        MSQDX_ICONS.sizes (xs → xxl)
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
        {(Object.keys(MSQDX_ICONS.sizes) as (keyof typeof MSQDX_ICONS.sizes)[]).map((size) => (
          <Box key={size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <MsqdxIcon name="Settings" size={size} />
            <Typography variant="caption">{size}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="subtitle2" color="text.secondary">
        MSQDX_ICONS.weight (Variable Font)
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap sx={{ minHeight: 80 }}>
        {(Object.keys(MSQDX_ICONS.weight) as (keyof typeof MSQDX_ICONS.weight)[]).map((weight) => (
          <Box key={weight} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, minWidth: 56 }}>
            <MsqdxIcon name="Add" size="lg" weight={weight} />
            <Typography variant="caption" color="text.secondary">{weight}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  ),
};

export const TokenNames: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Aus MSQDX_ICON_NAMES (Beispiele)
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {(['add', 'delete', 'edit', 'save', 'close', 'settings', 'search', 'person', 'email', 'check', 'arrowBack', 'menu'] as const).map((key) => (
          <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <MsqdxIcon name={MSQDX_ICON_NAMES[key].replace('Outlined', '')} size="sm" />
            <Typography variant="caption">{key}</Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    name: 'Check',
    size: 'md',
    'aria-label': 'Erledigt',
  },
  render: (args) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <MsqdxIcon {...args} />
      <Typography variant="body2">Mit aria-label (nicht dekorativ)</Typography>
    </Box>
  ),
};
