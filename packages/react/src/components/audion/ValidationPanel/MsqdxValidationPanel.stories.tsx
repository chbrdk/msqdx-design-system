import { Meta, StoryObj } from '@storybook/react';
import { MsqdxValidationPanel } from './MsqdxValidationPanel';
import type { JourneyValidationReport } from './MsqdxValidationPanel';

const meta = {
  title: 'Design System/AUDION/ValidationPanel',
  component: MsqdxValidationPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Panel component for displaying journey validation reports. Features: overall fit score, phase-by-phase validation, friction points with severity, recommendations, design token integration.',
      },
    },
  },
  tags: ['autodocs'],
} as Meta<typeof MsqdxValidationPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockReport: JourneyValidationReport = {
  overall_fit_score: 78.5,
  validated_at: new Date().toISOString(),
  phases: [
    {
      phase_id: 'phase-1',
      phase_name: 'Awareness',
      fit_score: 85.0,
      status: 'good',
      friction_points: [
        {
          description: 'Users may not understand the value proposition immediately',
          severity: 'medium',
          persona_quote: "I'm not sure what makes this different from other solutions",
        },
      ],
      recommendations: [
        'Clarify value proposition in the first touchpoint',
        'Add social proof early in the journey',
      ],
    },
    {
      phase_id: 'phase-2',
      phase_name: 'Consideration',
      fit_score: 72.0,
      status: 'warning',
      friction_points: [
        {
          description: 'Pricing information is not clear',
          severity: 'high',
        },
        {
          description: 'Feature comparison is missing',
          severity: 'medium',
        },
      ],
      recommendations: [
        'Add transparent pricing information',
        'Create feature comparison table',
      ],
    },
    {
      phase_id: 'phase-3',
      phase_name: 'Decision',
      fit_score: 90.0,
      status: 'good',
      friction_points: [],
      recommendations: [],
    },
  ],
};

/**
 * Default validation panel
 */
export const Default: Story = {
  args: {
    validationReport: mockReport,
    loading: false,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    validationReport: null,
    loading: true,
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    validationReport: null,
    loading: false,
    availablePersonas: [
      { id: 'persona-1', name: 'Tech Enthusiast' },
      { id: 'persona-2', name: 'Business Professional' },
    ],
    onValidate: async (personaIds) => {
      alert(`Validating with personas: ${personaIds.join(', ')}`);
    },
  },
};

/**
 * No personas available
 */
export const NoPersonas: Story = {
  args: {
    validationReport: null,
    loading: false,
    availablePersonas: [],
  },
};
