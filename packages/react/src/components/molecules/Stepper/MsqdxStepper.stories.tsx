import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MsqdxStepper } from './MsqdxStepper';
import { MsqdxIcon } from '../../atoms/Icon/MsqdxIcon';

const meta = {
  title: 'Design System/Molecules/Stepper',
  component: MsqdxStepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Styled stepper component matching the glassmorphism design system. Supports horizontal and vertical orientations with custom icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Current active step index',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stepper orientation',
    },
  },
} satisfies Meta<typeof MsqdxStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { label: 'Select Product' },
  { label: 'Add to Cart' },
  { label: 'Payment' },
  { label: 'Complete' },
];

const stepsWithIcons = [
  { label: 'Select Product', icon: <MsqdxIcon name="ShoppingCart" /> },
  { label: 'Add to Cart', icon: <MsqdxIcon name="CheckCircle" /> },
  { label: 'Payment', icon: <MsqdxIcon name="Payment" /> },
  { label: 'Complete', icon: <MsqdxIcon name="Done" /> },
];

const stepsWithDescriptions = [
  { label: 'Select Product', description: 'Choose the product you want to purchase' },
  { label: 'Add to Cart', description: 'Add the product to your shopping cart' },
  { label: 'Payment', description: 'Complete the payment process' },
  { label: 'Complete', description: 'Your order has been processed' },
];

export const Horizontal: Story = {
  args: {
    steps,
    activeStep: 1,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    steps: stepsWithDescriptions,
    activeStep: 1,
    orientation: 'vertical',
  },
};

export const WithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    activeStep: 2,
    orientation: 'horizontal',
  },
};

export const AllStepsCompleted: Story = {
  args: {
    steps,
    activeStep: 3,
    orientation: 'horizontal',
  },
};

export const FirstStep: Story = {
  args: {
    steps,
    activeStep: 0,
    orientation: 'horizontal',
  },
};

export const WithOptionalStep: Story = {
  args: {
    steps: [
      { label: 'Required Step' },
      { label: 'Optional Step', optional: true },
      { label: 'Final Step' },
    ],
    activeStep: 1,
    orientation: 'horizontal',
  },
};

export const Interactive: Story = {
  args: { steps: stepsWithIcons, activeStep: 1, orientation: 'horizontal' },
  render: () => {
    const [activeStep, setActiveStep] = React.useState(1);
    return (
      <div>
        <MsqdxStepper 
          steps={stepsWithIcons} 
          activeStep={activeStep} 
          orientation="horizontal"
        />
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))}>
            Previous
          </button>
          <button onClick={() => setActiveStep(Math.min(stepsWithIcons.length - 1, activeStep + 1))}>
            Next
          </button>
        </div>
      </div>
    );
  },
};
