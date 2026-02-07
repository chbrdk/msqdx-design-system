import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxPersonaCard, type Persona } from "./MsqdxPersonaCard";

const mockPersona: Persona = {
  id: "1",
  name: "Alex Researcher",
  segment: "B2B SaaS",
  confidence: 0.92,
  headline: "Focuses on competitive analysis and user interviews.",
};

const meta: Meta<typeof MsqdxPersonaCard> = {
  title: "Design System/AUDION/PersonaCard",
  component: MsqdxPersonaCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MsqdxPersonaCard>;

export const Default: Story = {
  args: {
    persona: mockPersona,
    actionLabel: "Chat",
  },
};

export const Selected: Story = {
  args: {
    persona: mockPersona,
    selected: true,
    actionLabel: "Chat",
  },
};
