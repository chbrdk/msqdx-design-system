import type { Meta, StoryObj } from '@storybook/react';
import { Box, Stack } from '@mui/material';
import { MsqdxButton } from './MsqdxButton';
import { MsqdxIcon } from '../Icon/MsqdxIcon';

const meta = {
  title: 'Design System/Atoms/Button',
  component: MsqdxButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Comprehensive button component for the MSQDX Glass Design System.

## Features
- **Multiple Variants**: contained, outlined, text, glass
- **Brand Colors**: purple, yellow, pink, orange, green
- **Three Sizes**: small, medium, large
- **Loading State**: with spinner
- **Icon Support**: start/end icons
- **Fully Tokenized**: All values from design tokens

## Usage
\`\`\`tsx
<MsqdxButton variant="contained" brandColor="purple">
  Click me
</MsqdxButton>

<MsqdxButton variant="glass" brandColor="green" size="large">
  Glass Button
</MsqdxButton>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text', 'glass'],
      description: 'Button variant style',
    },
    brandColor: {
      control: 'select',
      options: ['purple', 'yellow', 'pink', 'orange', 'green'],
      description: 'MSQDX brand color',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      defaultValue: { summary: 'medium' },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    glass: {
      control: 'boolean',
      description: 'Glass variant (glassmorphism effect)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} as Meta<typeof MsqdxButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    brandColor: 'green',
  },
};

/**
 * All variants
 */
export const Variants: Story = {
  args: { children: 'Button' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxButton variant="contained" brandColor="green">Contained</MsqdxButton>
      <MsqdxButton variant="outlined" brandColor="green">Outlined</MsqdxButton>
      <MsqdxButton variant="text" brandColor="green">Text</MsqdxButton>
      <MsqdxButton glass brandColor="green">Glass</MsqdxButton>
    </Stack>
  ),
};

/**
 * All brand colors
 */
export const BrandColors: Story = {
  args: { children: 'Button', variant: 'contained' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxButton variant="contained" brandColor="purple">Purple</MsqdxButton>
      <MsqdxButton variant="contained" brandColor="yellow">Yellow</MsqdxButton>
      <MsqdxButton variant="contained" brandColor="pink">Pink</MsqdxButton>
      <MsqdxButton variant="contained" brandColor="orange">Orange</MsqdxButton>
      <MsqdxButton variant="contained" brandColor="green">Green</MsqdxButton>
    </Stack>
  ),
};

/**
 * All sizes
 */
export const Sizes: Story = {
  args: { children: 'Button', variant: 'contained', brandColor: 'green' },
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      <MsqdxButton variant="contained" brandColor="green" size="small">Small</MsqdxButton>
      <MsqdxButton variant="contained" brandColor="green" size="medium">Medium</MsqdxButton>
      <MsqdxButton variant="contained" brandColor="green" size="large">Large</MsqdxButton>
    </Stack>
  ),
};

/**
 * With icons
 */
export const WithIcons: Story = {
  args: { children: 'Button' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxButton variant="contained" brandColor="green" startIcon={<MsqdxIcon name="Add" />}>
        Add Item
      </MsqdxButton>
      <MsqdxButton variant="outlined" brandColor="purple" endIcon={<MsqdxIcon name="Save" />}>
        Save
      </MsqdxButton>
      <MsqdxButton variant="text" brandColor="orange" startIcon={<MsqdxIcon name="Edit" />}>
        Edit
      </MsqdxButton>
      <MsqdxButton glass brandColor="pink" startIcon={<MsqdxIcon name="Delete" />}>
        Delete
      </MsqdxButton>
    </Stack>
  ),
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: { children: 'Loading...', loading: true, variant: 'contained', brandColor: 'green' },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true, variant: 'contained', brandColor: 'green' },
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <MsqdxButton variant="contained" brandColor="green" disabled>Contained Disabled</MsqdxButton>
      <MsqdxButton variant="outlined" brandColor="green" disabled>Outlined Disabled</MsqdxButton>
      <MsqdxButton variant="text" brandColor="green" disabled>Text Disabled</MsqdxButton>
      <MsqdxButton glass brandColor="green" disabled>Glass Disabled</MsqdxButton>
    </Stack>
  ),
};

/**
 * Glass variant showcase
 */
export const GlassVariant: Story = {
  args: { children: 'Glass Button', glass: true },
  render: () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 4,
      borderRadius: 2,
    }}>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        <MsqdxButton glass brandColor="purple">Purple Glass</MsqdxButton>
        <MsqdxButton glass brandColor="yellow">Yellow Glass</MsqdxButton>
        <MsqdxButton glass brandColor="pink">Pink Glass</MsqdxButton>
        <MsqdxButton glass brandColor="orange">Orange Glass</MsqdxButton>
        <MsqdxButton glass brandColor="green">Green Glass</MsqdxButton>
      </Stack>
    </Box>
  ),
};
