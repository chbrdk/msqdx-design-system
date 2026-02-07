import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxChatItem } from "./MsqdxChatItem";

const mockConversation = {
  conversationId: "c1",
  title: "Product feedback discussion",
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  messageCount: 8,
};

const meta: Meta<typeof MsqdxChatItem> = {
  title: "Design System/AUDION/ChatItem",
  component: MsqdxChatItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MsqdxChatItem>;

export const Default: Story = {
  args: {
    conversation: mockConversation,
    onSelect: (id) => console.log("Selected", id),
  },
};
