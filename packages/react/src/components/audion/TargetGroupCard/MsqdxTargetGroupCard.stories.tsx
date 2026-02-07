import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxTargetGroupCard } from "./MsqdxTargetGroupCard";

const mockTargetGroup = {
  id: "tg1",
  name: "Enterprise IT",
  segment: "B2B",
  description: "IT decision makers in enterprises with 500+ employees.",
  personaCount: 3,
  knowledgeEntryCount: 12,
};

const meta: Meta<typeof MsqdxTargetGroupCard> = {
  title: "Design System/AUDION/TargetGroupCard",
  component: MsqdxTargetGroupCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MsqdxTargetGroupCard>;

export const Default: Story = {
  args: { targetGroup: mockTargetGroup },
};

export const Selected: Story = {
  args: { targetGroup: mockTargetGroup, selected: true },
};
