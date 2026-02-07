import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { MsqdxLabel } from './MsqdxLabel';

const meta = {
  title: 'Design System/Atoms/Label',
  component: MsqdxLabel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Label component for section headings and labels. Uses **mono font** (IBM Plex Mono) by default.

## Features
- **Font**: \`primary\` (Noto Sans) or \`mono\` (IBM Plex Mono, default)
- **Sizes**: small, medium, large
- **Weight** and **transform** from typography tokens (optional)
- Uses design tokens for spacing and effects

## Usage
\`\`\`tsx
<MsqdxLabel>Focus</MsqdxLabel>
<MsqdxLabel size="small" font="mono">Section</MsqdxLabel>
<MsqdxLabel size="large" weight="semibold">Heading</MsqdxLabel>
<MsqdxLabel font="primary" transform="none">No transform</MsqdxLabel>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Label size',
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' },
      },
    },
    font: {
      control: 'select',
      options: ['primary', 'mono'],
      description: 'Font family (mono = IBM Plex Mono)',
      table: {
        type: { summary: "'primary' | 'mono'" },
        defaultValue: { summary: 'mono' },
      },
    },
    weight: {
      control: 'select',
      options: ['medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight from tokens',
      table: {
        type: { summary: 'LabelWeight' },
        defaultValue: { summary: 'bold' },
      },
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transform',
      table: {
        type: { summary: 'LabelTransform' },
        defaultValue: { summary: 'uppercase' },
      },
    },
  },
} as Meta<typeof MsqdxLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Focus',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box>
        <MsqdxLabel size="small">Small Label</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.7 }}>
          Small size (10px)
        </Box>
      </Box>
      <Box>
        <MsqdxLabel size="medium">Medium Label</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.7 }}>
          Medium size (12px) - Default
        </Box>
      </Box>
      <Box>
        <MsqdxLabel size="large">Large Label</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.7 }}>
          Large size (14px)
        </Box>
      </Box>
    </Box>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box>
        <MsqdxLabel>Focus</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem' }}>
          Describe the goal, mindset or tasks in this phase.
        </Box>
      </Box>
      <Box>
        <MsqdxLabel>Journey Moments</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem' }}>
          Capture touchpoints, thoughts or feelings.
        </Box>
      </Box>
      <Box>
        <MsqdxLabel>Phase</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem' }}>
          Phase information and details.
        </Box>
      </Box>
    </Box>
  ),
};

export const FontVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box>
        <MsqdxLabel font="mono">Mono (default) – IBM Plex Mono</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.7 }}>
          Default for labels
        </Box>
      </Box>
      <Box>
        <MsqdxLabel font="primary">Primary – Noto Sans JP</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem', opacity: 0.7 }}>
          Sans-serif option
        </Box>
      </Box>
    </Box>
  ),
};

export const WeightAndTransform: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <MsqdxLabel weight="medium">Weight medium</MsqdxLabel>
      <MsqdxLabel weight="semibold">Weight semibold</MsqdxLabel>
      <MsqdxLabel weight="bold">Weight bold (default)</MsqdxLabel>
      <MsqdxLabel weight="extrabold">Weight extrabold</MsqdxLabel>
      <MsqdxLabel transform="none">Transform none</MsqdxLabel>
      <MsqdxLabel transform="capitalize">Transform capitalize</MsqdxLabel>
    </Box>
  ),
};

export const InContext: Story = {
  render: () => (
    <Box sx={{ padding: '24px', backgroundColor: 'background.paper', borderRadius: '8px' }}>
      <Box sx={{ marginBottom: '16px' }}>
        <MsqdxLabel>Focus</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem', color: 'text.secondary' }}>
          Describe the goal, mindset or tasks in this phase.
        </Box>
      </Box>
      <Box sx={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid', borderColor: 'divider' }}>
        <MsqdxLabel>Journey Moments</MsqdxLabel>
        <Box sx={{ marginTop: '8px', fontSize: '0.875rem', color: 'text.secondary' }}>
          No elements yet. Map touchpoints, thoughts or feelings.
        </Box>
      </Box>
    </Box>
  ),
};
