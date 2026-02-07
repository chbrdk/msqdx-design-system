import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';
import { MsqdxBadge } from './MsqdxBadge';

const meta = {
  title: 'Design System/Atoms/Badge',
  component: MsqdxBadge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Specialized badge component for displaying metrics and scores.

## Features
- **Brand Colors**: purple, yellow, pink, orange, green
- **Three Sizes**: small, medium, large
- **Label & Sublabel**: Main label with optional sublabel
- **Typography**: Uses IBM Plex Mono (secondary font)
- **Fully Tokenized**: All values from design tokens

## Usage
\`\`\`tsx
<MsqdxBadge label={42} brandColor="green" />
<MsqdxBadge label="95" sublabel="Score" brandColor="purple" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Main label (number or string)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    sublabel: {
      control: 'text',
      description: 'Optional sublabel text',
      table: {
        type: { summary: 'string' },
      },
    },
    brandColor: {
      control: 'select',
      options: ['purple', 'yellow', 'pink', 'orange', 'green'],
      description: 'MSQDX brand color',
      table: {
        type: { summary: 'BrandColor' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
      table: {
        type: { summary: 'BadgeSize' },
        defaultValue: { summary: 'medium' },
      },
    },
  },
} as Meta<typeof MsqdxBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge
 */
export const Default: Story = {
  args: {
    label: 42,
    brandColor: 'green',
  },
};

/**
 * All brand colors
 */
export const BrandColors: Story = {
  args: { label: 42 },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxBadge label={42} brandColor="purple" />
      <MsqdxBadge label={24} brandColor="yellow" />
      <MsqdxBadge label={100} brandColor="pink" />
      <MsqdxBadge label={8} brandColor="orange" />
      <MsqdxBadge label={95} brandColor="green" />
    </Stack>
  ),
};

/**
 * With sublabel
 */
export const WithSublabel: Story = {
  args: { label: 95 },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxBadge label={95} sublabel="Score" brandColor="green" />
      <MsqdxBadge label={42} sublabel="Points" brandColor="purple" />
      <MsqdxBadge label={100} sublabel="Match" brandColor="orange" />
      <MsqdxBadge label="A+" sublabel="Grade" brandColor="pink" />
    </Stack>
  ),
};

/**
 * All sizes
 */
export const Sizes: Story = {
  args: { label: 42 },
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      <MsqdxBadge label={12} sublabel="New" brandColor="green" size="small" />
      <MsqdxBadge label={42} sublabel="Score" brandColor="green" size="medium" />
      <MsqdxBadge label={100} sublabel="Match" brandColor="green" size="large" />
    </Stack>
  ),
};

/**
 * Number labels
 */
export const NumberLabels: Story = {
  args: { label: 42 },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxBadge label={42} brandColor="green" />
      <MsqdxBadge label={100} brandColor="purple" />
      <MsqdxBadge label={5} brandColor="orange" />
      <MsqdxBadge label={0} brandColor="pink" />
    </Stack>
  ),
};

/**
 * String labels
 */
export const StringLabels: Story = {
  args: { label: 'A+' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxBadge label="A+" sublabel="Grade" brandColor="green" />
      <MsqdxBadge label="VIP" sublabel="Status" brandColor="purple" />
      <MsqdxBadge label="99%" sublabel="Match" brandColor="orange" />
      <MsqdxBadge label="NEW" sublabel="Tag" brandColor="pink" />
    </Stack>
  ),
};

/**
 * Complete showcase
 */
export const Showcase: Story = {
  args: { label: 42 },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Brand Colors */}
      <Box>
        <Box component="h3" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
          Brand Colors
        </Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <MsqdxBadge label={42} brandColor="purple" />
          <MsqdxBadge label={24} brandColor="yellow" />
          <MsqdxBadge label={100} brandColor="pink" />
          <MsqdxBadge label={8} brandColor="orange" />
          <MsqdxBadge label={95} brandColor="green" />
        </Stack>
      </Box>

      {/* With Sublabels */}
      <Box>
        <Box component="h3" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
          With Sublabels
        </Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <MsqdxBadge label={95} sublabel="Score" brandColor="green" />
          <MsqdxBadge label={42} sublabel="Points" brandColor="purple" />
          <MsqdxBadge label={100} sublabel="Match" brandColor="orange" />
          <MsqdxBadge label="A+" sublabel="Grade" brandColor="pink" />
        </Stack>
      </Box>

      {/* Sizes */}
      <Box>
        <Box component="h3" sx={{ mb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
          Sizes
        </Box>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <MsqdxBadge label={12} sublabel="New" brandColor="green" size="small" />
          <MsqdxBadge label={42} sublabel="Score" brandColor="green" size="medium" />
          <MsqdxBadge label={100} sublabel="Match" brandColor="green" size="large" />
        </Stack>
      </Box>
    </Box>
  ),
};
