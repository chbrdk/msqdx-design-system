import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxProcessingTimeline } from "./MsqdxProcessingTimeline";

const meta: Meta<typeof MsqdxProcessingTimeline> = {
  title: "Design System/AUDION/ProcessingTimeline",
  component: MsqdxProcessingTimeline,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MsqdxProcessingTimeline>;

export const Default: Story = {};

export const ActiveEnrich: Story = {
  args: { activeStage: "enrich" },
};
