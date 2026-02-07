import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MsqdxJourneyCanvas } from './MsqdxJourneyCanvas';
import type { JourneyPhase } from '../PhaseCard/MsqdxPhaseCard';

const meta = {
  title: 'Design System/AUDION/JourneyCanvas',
  component: MsqdxJourneyCanvas,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Canvas for journey phases: horizontal phase cards (MsqdxPhaseCard), emotion curve, add-phase button. Uses MsqdxScrollbar for horizontal scroll. Options: phaseCardBrandColor, scrollbarBrandColor, scrollbarSize.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    phaseCardBrandColor: {
      control: 'select',
      options: ['purple', 'yellow', 'pink', 'orange', 'green'],
      description: 'Brand color for all phase cards (border/hover)',
    },
    scrollbarBrandColor: {
      control: 'select',
      options: ['default', 'purple', 'yellow', 'pink', 'orange', 'green', 'black'],
      description: 'Scrollbar theme color for the phases row',
    },
    scrollbarSize: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Scrollbar size for the phases row',
    },
  },
} as Meta<typeof MsqdxJourneyCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPhases: JourneyPhase[] = [
  {
    id: 'phase-1',
    name: 'Awareness',
    description: 'User becomes aware of the problem.',
    expected_emotion: 'curious',
    emotion_intensity: 0.6,
    generated_by_ai: false,
    elements: [],
  },
  {
    id: 'phase-2',
    name: 'Consideration',
    description: 'User evaluates options.',
    expected_emotion: 'hopeful',
    emotion_intensity: 0.7,
    generated_by_ai: false,
    elements: [],
  },
  {
    id: 'phase-3',
    name: 'Decision',
    description: 'User makes a decision.',
    expected_emotion: 'satisfied',
    emotion_intensity: 0.8,
    generated_by_ai: false,
    elements: [],
  },
];

/**
 * Default canvas
 */
export const Default: Story = {
  args: {
    phases: mockPhases,
  },
};

/**
 * Interactive canvas
 */
export const Interactive: Story = {
  render: (args) => {
    const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);

    return (
      <MsqdxJourneyCanvas
        {...args}
        phases={mockPhases}
        selectedPhaseId={selectedPhaseId}
        onPhaseSelect={(id) => setSelectedPhaseId(id)}
        onAddPhase={() => {
          alert('Add phase');
        }}
        onPhaseEdit={(id) => {
          alert(`Edit phase ${id}`);
        }}
        onPhaseDelete={async (id) => {
          alert(`Delete phase ${id}`);
        }}
      />
    );
  },
};

/**
 * Empty canvas
 */
export const Empty: Story = {
  args: {
    phases: [],
  },
};

/**
 * Purple phase cards and scrollbar
 */
export const PurplePhaseCards: Story = {
  args: {
    phases: mockPhases,
    phaseCardBrandColor: 'purple',
    scrollbarBrandColor: 'purple',
  },
};

/**
 * Many phases to show horizontal scrollbar
 */
export const ManyPhases: Story = {
  args: {
    phases: [
      ...mockPhases,
      {
        id: 'phase-4',
        name: 'Onboarding',
        description: 'First steps.',
        expected_emotion: 'hopeful',
        emotion_intensity: 0.5,
        generated_by_ai: false,
        elements: [],
      },
      {
        id: 'phase-5',
        name: 'Retention',
        description: 'Staying engaged.',
        expected_emotion: 'satisfied',
        emotion_intensity: 0.9,
        generated_by_ai: false,
        elements: [],
      },
    ],
    phaseCardBrandColor: 'green',
    scrollbarSize: 'thin',
  },
};
