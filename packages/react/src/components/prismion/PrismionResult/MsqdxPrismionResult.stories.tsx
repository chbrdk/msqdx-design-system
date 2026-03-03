import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxPrismionResult } from "./MsqdxPrismionResult";

const meta = {
  title: "Design System/Prismion/PrismionResult",
  component: MsqdxPrismionResult,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tabs-based result viewer for Prismion cards. Uses MsqdxTabs and MSQDX tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultTab: { control: "text" },
  },
} satisfies Meta<typeof MsqdxPrismionResult>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { type: "text", content: "Hello world.\n\nThis is plain text content." },
      { type: "richtext", content: "<p>Rich <strong>HTML</strong> content.</p>" },
      { type: "link", url: "https://example.com", label: "Example Link" },
    ],
  },
};

export const WithImageAndVideo: Story = {
  args: {
    items: [
      { type: "image", url: "https://picsum.photos/400/200", alt: "Sample" },
      { type: "video", url: "https://example.com/video.mp4", poster: "https://picsum.photos/400/200" },
    ],
  },
};
