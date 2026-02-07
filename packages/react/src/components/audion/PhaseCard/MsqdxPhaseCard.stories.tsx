import type { Meta, StoryObj } from '@storybook/react';
import { MsqdxPhaseCard } from './MsqdxPhaseCard';
import type { JourneyPhase } from './MsqdxPhaseCard';

const meta = {
  title: 'Design System/AUDION/PhaseCard',
  component: MsqdxPhaseCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Card component for displaying journey phase information.

## Features
- **Corner decoration** with phase number
- **Chips** for duration, emotion, validation, AI status
- **Focus section** with description
- **Journey Moments** with element list
- **Design token integration**
- **Left-aligned content**
- **Separators between sections**

## Usage
\`\`\`tsx
<MsqdxPhaseCard
  phase={phase}
  index={0}
  onEdit={() => {}}
  onDelete={async (id) => {}}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    index: {
      control: 'number',
      description: 'Phase index (0-based)',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether phase is currently active',
    },
  },
} as Meta<typeof MsqdxPhaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPhase: JourneyPhase = {
  id: 'phase-1',
  name: 'Awareness',
  description: 'User becomes aware of the problem and starts researching solutions.',
  expected_duration_min: 5,
  expected_duration_max: 15,
  duration_unit: 'minutes',
  expected_emotion: 'curious',
  emotion_intensity: 0.6,
  validation_score: 85.5,
  validation_status: 'good',
  generated_by_ai: false,
  elements: [
    {
      id: 'elem-1',
      element_type: 'touchpoint',
      content: 'Google search for solutions',
      element_order: 1,
    },
    {
      id: 'elem-2',
      element_type: 'thought',
      content: 'I need to find a better way to do this',
      element_order: 2,
    },
    {
      id: 'elem-3',
      element_type: 'feeling',
      content: 'Frustrated with current solution',
      element_order: 3,
    },
  ],
};

const minimalPhase: JourneyPhase = {
  id: 'phase-2',
  name: 'Consideration',
  generated_by_ai: false,
  elements: [],
};

const aiGeneratedPhase: JourneyPhase = {
  id: 'phase-3',
  name: 'Decision',
  description: 'User evaluates options and makes a decision.',
  expected_duration_min: 10,
  expected_duration_max: 30,
  duration_unit: 'minutes',
  expected_emotion: 'confident',
  emotion_intensity: 0.8,
  generated_by_ai: true,
  elements: [
    {
      id: 'elem-4',
      element_type: 'action',
      content: 'Compare features and pricing',
      element_order: 1,
    },
  ],
};

/**
 * Default phase card
 */
export const Default: Story = {
  args: {
    phase: mockPhase,
    index: 0,
  },
};

/**
 * Phase card with all chips
 */
export const WithAllChips: Story = {
  args: {
    phase: mockPhase,
    index: 0,
  },
};

/**
 * Minimal phase card
 */
export const Minimal: Story = {
  args: {
    phase: minimalPhase,
    index: 1,
  },
};

/**
 * AI-generated phase
 */
export const AIGenerated: Story = {
  args: {
    phase: aiGeneratedPhase,
    index: 2,
  },
};

/**
 * Phase with many journey moments
 */
export const WithManyMoments: Story = {
  args: {
    phase: {
      ...mockPhase,
      elements: [
        ...mockPhase.elements,
        {
          id: 'elem-5',
          element_type: 'opportunity',
          content: 'Showcase unique features',
          element_order: 4,
        },
        {
          id: 'elem-6',
          element_type: 'pain_point',
          content: 'Price concerns',
          element_order: 5,
        },
      ],
    },
    index: 0,
  },
};

/**
 * Interactive phase card
 */
export const Interactive: Story = {
  args: {
    phase: mockPhase,
    index: 0,
    onEdit: () => {
      alert('Edit clicked');
    },
    onDelete: async (id) => {
      alert(`Delete phase ${id}`);
    },
  },
};
