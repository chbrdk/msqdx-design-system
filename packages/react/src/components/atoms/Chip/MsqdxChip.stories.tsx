import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';
import { MsqdxChip } from './MsqdxChip';
import { MsqdxIcon } from '../Icon/MsqdxIcon';

const meta = {
  title: 'Design System/Atoms/Chip',
  component: MsqdxChip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Versatile chip component for categories, tags, and status indicators.

## Features
- **Multiple Variants**: glass, filled, outlined
- **Brand Colors**: purple, yellow, pink, orange, green
- **Four Sizes**: xs (kompakt), small, medium, large
- **Glow Effect**: optional glow effect
- **Icon Support**: start icon
- **Fully Tokenized**: All values from design tokens

## Usage
\`\`\`tsx
<MsqdxChip variant="glass" brandColor="purple" label="Tag" />

<MsqdxChip 
  variant="filled" 
  brandColor="green" 
  label="Success"
  icon={<MsqdxIcon name="Check" />}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label text',
    },
    variant: {
      control: 'select',
      options: ['glass', 'filled', 'outlined'],
      description: 'Chip variant style',
      defaultValue: { summary: 'glass' },
    },
    brandColor: {
      control: 'select',
      options: ['purple', 'yellow', 'pink', 'orange', 'green'],
      description: 'MSQDX brand color',
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large'],
      description: 'Chip size (xs = kompakteste Variante)',
      defaultValue: { summary: 'small' },
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect',
    },
  },
} as Meta<typeof MsqdxChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default chip
 */
export const Default: Story = {
  args: {
    label: 'Chip',
    variant: 'glass',
    brandColor: 'green',
  },
};

/**
 * All variants
 */
export const Variants: Story = {
  args: { label: 'Chip' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxChip variant="glass" brandColor="green" label="Glass" />
      <MsqdxChip variant="filled" brandColor="green" label="Filled" />
      <MsqdxChip variant="outlined" brandColor="green" label="Outlined" />
    </Stack>
  ),
};

/**
 * All brand colors
 */
export const BrandColors: Story = {
  args: { label: 'Chip', variant: 'glass' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxChip variant="glass" brandColor="purple" label="Purple" />
      <MsqdxChip variant="glass" brandColor="yellow" label="Yellow" />
      <MsqdxChip variant="glass" brandColor="pink" label="Pink" />
      <MsqdxChip variant="glass" brandColor="orange" label="Orange" />
      <MsqdxChip variant="glass" brandColor="green" label="Green" />
    </Stack>
  ),
};

/**
 * All sizes (xs = kompakteste Variante: kleinere Schrift, wenig Padding)
 */
export const Sizes: Story = {
  args: { label: 'Chip', variant: 'glass', brandColor: 'green' },
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      <MsqdxChip variant="glass" brandColor="green" label="XS" size="xs" />
      <MsqdxChip variant="glass" brandColor="green" label="Small" size="small" />
      <MsqdxChip variant="glass" brandColor="green" label="Medium" size="medium" />
      <MsqdxChip variant="glass" brandColor="green" label="Large" size="large" />
    </Stack>
  ),
};

/**
 * With icons
 */
export const WithIcons: Story = {
  args: { label: 'Chip' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxChip 
        variant="glass" 
        brandColor="green" 
        label="Success"
        icon={<MsqdxIcon name="Check" customSize={14} />}
      />
      <MsqdxChip 
        variant="filled" 
        brandColor="purple" 
        label="Featured"
        icon={<MsqdxIcon name="Star" customSize={14} />}
      />
      <MsqdxChip 
        variant="outlined" 
        brandColor="orange" 
        label="Warning"
        icon={<MsqdxIcon name="Warning" customSize={14} />}
      />
      <MsqdxChip 
        variant="glass" 
        brandColor="pink" 
        label="New"
        icon={<MsqdxIcon name="AutoAwesome" customSize={14} />}
      />
    </Stack>
  ),
};

/**
 * With glow effect
 */
export const WithGlow: Story = {
  args: { label: 'Chip', glow: true },
  render: () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 4,
      borderRadius: 2,
    }}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <MsqdxChip variant="glass" brandColor="purple" label="Purple Glow" glow />
        <MsqdxChip variant="glass" brandColor="yellow" label="Yellow Glow" glow />
        <MsqdxChip variant="glass" brandColor="pink" label="Pink Glow" glow />
        <MsqdxChip variant="glass" brandColor="orange" label="Orange Glow" glow />
        <MsqdxChip variant="glass" brandColor="green" label="Green Glow" glow />
      </Stack>
    </Box>
  ),
};

/**
 * Deletable chips
 */
export const Deletable: Story = {
  args: { label: 'Chip' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxChip 
        variant="glass" 
        brandColor="green" 
        label="Deletable"
        onDelete={() => {}}
      />
      <MsqdxChip 
        variant="filled" 
        brandColor="purple" 
        label="Deletable"
        onDelete={() => {}}
      />
      <MsqdxChip 
        variant="outlined" 
        brandColor="orange" 
        label="Deletable"
        onDelete={() => {}}
      />
    </Stack>
  ),
};

/**
 * Complete showcase
 */
export const Showcase: Story = {
  args: { label: 'Chip' },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Variants */}
      <Box>
        <Box component="h3" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
          Variants
        </Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <MsqdxChip variant="glass" brandColor="green" label="Glass" />
          <MsqdxChip variant="filled" brandColor="green" label="Filled" />
          <MsqdxChip variant="outlined" brandColor="green" label="Outlined" />
        </Stack>
      </Box>

      {/* Brand Colors */}
      <Box>
        <Box component="h3" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
          Brand Colors
        </Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <MsqdxChip variant="glass" brandColor="purple" label="Purple" />
          <MsqdxChip variant="glass" brandColor="yellow" label="Yellow" />
          <MsqdxChip variant="glass" brandColor="pink" label="Pink" />
          <MsqdxChip variant="glass" brandColor="orange" label="Orange" />
          <MsqdxChip variant="glass" brandColor="green" label="Green" />
        </Stack>
      </Box>

      {/* Sizes */}
      <Box>
        <Box component="h3" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
          Sizes
        </Box>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <MsqdxChip variant="glass" brandColor="green" label="Small" size="small" />
          <MsqdxChip variant="glass" brandColor="green" label="Medium" size="medium" />
          <MsqdxChip variant="glass" brandColor="green" label="Large" size="large" />
        </Stack>
      </Box>
    </Box>
  ),
};
