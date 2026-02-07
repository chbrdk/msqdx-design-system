import type { Meta, StoryObj } from '@storybook/react';
import { MsqdxGlassCard } from './MsqdxGlassCard';
import { MsqdxTypography } from '../../atoms/Typography/MsqdxTypography';

const meta = {
  title: 'Design System/Molecules/GlassCard',
  component: MsqdxGlassCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The fundamental container component for the msqdx-glass design system. Implements a high-quality glassmorphism effect with configurable blur and hover states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    blur: {
      control: { type: 'range', min: 0, max: 30, step: 1 },
      description: 'Blur amount for glassmorphism effect',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Background opacity',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove default padding',
    },
    accent: {
      control: 'select',
      options: ['none', 'purple', 'yellow'],
      description: 'Accent border color',
    },
  },
} as Meta<typeof MsqdxGlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <MsqdxTypography variant="h3" weight="bold">Glass Card</MsqdxTypography>
        <MsqdxTypography variant="body1" style={{ marginTop: '0.5rem' }}>
          This is a default glass card with glassmorphism effect.
        </MsqdxTypography>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <MsqdxTypography variant="h3" weight="bold">Hoverable Card</MsqdxTypography>
        <MsqdxTypography variant="body1" style={{ marginTop: '0.5rem' }}>
          Hover over this card to see the interactive effect.
        </MsqdxTypography>
      </div>
    ),
  },
};

export const WithAccent: Story = {
  args: {
    accent: 'purple',
    children: (
      <div>
        <MsqdxTypography variant="h3" weight="bold">Card with Accent</MsqdxTypography>
        <MsqdxTypography variant="body1" style={{ marginTop: '0.5rem' }}>
          This card has a green accent border at the top.
        </MsqdxTypography>
      </div>
    ),
  },
};

export const CustomBlur: Story = {
  args: {
    blur: 20,
    children: (
      <div>
        <MsqdxTypography variant="h3" weight="bold">High Blur</MsqdxTypography>
        <MsqdxTypography variant="body1" style={{ marginTop: '0.5rem' }}>
          This card has increased blur for a stronger glass effect.
        </MsqdxTypography>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    noPadding: true,
    children: (
      <div style={{ padding: '2rem' }}>
        <MsqdxTypography variant="h3" weight="bold">No Padding</MsqdxTypography>
        <MsqdxTypography variant="body1" style={{ marginTop: '0.5rem' }}>
          This card has no default padding. Content padding is manually added.
        </MsqdxTypography>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <MsqdxGlassCard>
        <MsqdxTypography variant="h4">Default Card</MsqdxTypography>
        <MsqdxTypography variant="body2">Standard glass card</MsqdxTypography>
      </MsqdxGlassCard>
      <MsqdxGlassCard hoverable>
        <MsqdxTypography variant="h4">Hoverable Card</MsqdxTypography>
        <MsqdxTypography variant="body2">Hover to see effect</MsqdxTypography>
      </MsqdxGlassCard>
      <MsqdxGlassCard accent="purple">
        <MsqdxTypography variant="h4">With Accent</MsqdxTypography>
        <MsqdxTypography variant="body2">Green accent border</MsqdxTypography>
      </MsqdxGlassCard>
      <MsqdxGlassCard blur={20} opacity={0.1}>
        <MsqdxTypography variant="h4">Custom Blur & Opacity</MsqdxTypography>
        <MsqdxTypography variant="body2">Stronger glass effect</MsqdxTypography>
      </MsqdxGlassCard>
    </div>
  ),
};
