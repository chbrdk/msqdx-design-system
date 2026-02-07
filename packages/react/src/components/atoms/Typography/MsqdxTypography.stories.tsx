import type { Meta, StoryObj } from '@storybook/react';
import { MsqdxTypography } from './MsqdxTypography';

const meta = {
  title: 'Design System/Atoms/Typography',
  component: MsqdxTypography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Central typography component for the msqdx-glass design system. Built on top of MUI Typography with built-in branding and special variants like "eyebrow".',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'],
      description: 'Typography variant',
    },
    weight: {
      control: 'select',
      options: ['thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Font weight',
    },
    eyebrow: {
      control: 'boolean',
      description: 'Enable eyebrow style (uppercase, letter spacing)',
    },
  },
} as Meta<typeof MsqdxTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const Body: Story = {
  args: {
    variant: 'body1',
    children: 'Body text - This is the default body text style used throughout the design system.',
  },
};

export const WithWeight: Story = {
  args: {
    variant: 'h1',
    weight: 'extrabold',
    children: 'Extra Bold Heading',
  },
};

export const Eyebrow: Story = {
  args: {
    eyebrow: true,
    children: 'Eyebrow Text',
  },
};

export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <MsqdxTypography variant="h1">Heading 1</MsqdxTypography>
      <MsqdxTypography variant="h2">Heading 2</MsqdxTypography>
      <MsqdxTypography variant="h3">Heading 3</MsqdxTypography>
      <MsqdxTypography variant="h4">Heading 4</MsqdxTypography>
      <MsqdxTypography variant="h5">Heading 5</MsqdxTypography>
      <MsqdxTypography variant="h6">Heading 6</MsqdxTypography>
      <MsqdxTypography variant="subtitle1">Subtitle 1</MsqdxTypography>
      <MsqdxTypography variant="subtitle2">Subtitle 2</MsqdxTypography>
      <MsqdxTypography variant="body1">Body 1 - This is the default body text style.</MsqdxTypography>
      <MsqdxTypography variant="body2">Body 2 - This is a smaller body text style.</MsqdxTypography>
      <MsqdxTypography variant="button">Button Text</MsqdxTypography>
      <MsqdxTypography variant="caption">Caption Text</MsqdxTypography>
      <MsqdxTypography variant="overline">Overline Text</MsqdxTypography>
    </div>
  ),
};

export const WeightVariations: Story = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <MsqdxTypography variant="body1" weight="thin">Thin (100)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="extralight">Extra Light (200)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="light">Light (300)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="regular">Regular (400)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="medium">Medium (500)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="semibold">Semibold (600)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="bold">Bold (700)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="extrabold">Extra Bold (800)</MsqdxTypography>
      <MsqdxTypography variant="body1" weight="black">Black (900)</MsqdxTypography>
    </div>
  ),
};
