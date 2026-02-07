import type { Meta, StoryObj } from '@storybook/react';
import { MsqdxProgress } from './MsqdxProgress';

const meta = {
  title: 'Design System/Atoms/Progress',
  component: MsqdxProgress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Styled progress bar for the msqdx-glass design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Progress bar color',
    },
    height: {
      control: { type: 'number', min: 2, max: 20, step: 1 },
      description: 'Progress bar height in pixels',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage value',
    },
  },
} as Meta<typeof MsqdxProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: 65,
    color: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    label: 'Progress',
    color: 'primary',
  },
};

export const WithValue: Story = {
  args: {
    value: 85,
    showValue: true,
    color: 'primary',
  },
};

export const WithLabelAndValue: Story = {
  args: {
    value: 90,
    label: 'Completion',
    showValue: true,
    color: 'primary',
  },
};

export const AllColors: Story = {
  args: { value: 0 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <MsqdxProgress value={75} label="Primary" color="primary" showValue />
      <MsqdxProgress value={60} label="Secondary" color="secondary" showValue />
      <MsqdxProgress value={90} label="Success" color="success" showValue />
      <MsqdxProgress value={45} label="Warning" color="warning" showValue />
      <MsqdxProgress value={30} label="Error" color="error" showValue />
      <MsqdxProgress value={55} label="Info" color="info" showValue />
    </div>
  ),
};

export const DifferentHeights: Story = {
  args: { value: 0 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <MsqdxProgress value={50} label="Height: 4px" height={4} color="primary" />
      <MsqdxProgress value={50} label="Height: 6px" height={6} color="primary" />
      <MsqdxProgress value={50} label="Height: 8px" height={8} color="primary" />
      <MsqdxProgress value={50} label="Height: 12px" height={12} color="primary" />
    </div>
  ),
};

export const ProgressStates: Story = {
  args: { value: 0 },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <MsqdxProgress value={0} label="Not Started" color="primary" showValue />
      <MsqdxProgress value={25} label="In Progress" color="primary" showValue />
      <MsqdxProgress value={50} label="Halfway" color="primary" showValue />
      <MsqdxProgress value={75} label="Almost Done" color="primary" showValue />
      <MsqdxProgress value={100} label="Complete" color="success" showValue />
    </div>
  ),
};
