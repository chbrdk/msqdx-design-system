import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MsqdxChatMessage } from "./MsqdxChatMessage";

const meta: Meta<typeof MsqdxChatMessage> = {
  title: "Design System/AUDION/ChatMessage",
  component: MsqdxChatMessage,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    role: {
      options: ["user", "assistant", "system"],
      control: "select",
      description: "Message alignment and context",
    },
    variant: {
      options: ["flat", "glass", "elevated"],
      control: "select",
      description: "Card surface style",
    },
    brandColor: {
      options: ["purple", "yellow", "pink", "orange", "green"],
      control: "select",
      description: "Brand color for border/hover",
    },
    hoverable: { control: "boolean", description: "Hover lift + shadow" },
    borderRadius: {
      options: ["none", "xs", "sm", "button"],
      control: "select",
      description: "Border radius from tokens (default: button)",
    },
    status: {
      options: ["sending", "sent", "read", "error"],
      control: "select",
      description: "Status indicator (e.g. for user messages)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MsqdxChatMessage>;

export const User: Story = {
  args: {
    role: "user",
    content: "Can you summarize the key findings from the last research session?",
    senderLabel: "You",
    timestamp: new Date(),
    avatar: "person",
  },
  render: (args) => (
    <Box width={400}>
      <MsqdxChatMessage {...args} />
    </Box>
  ),
};

export const Assistant: Story = {
  args: {
    role: "assistant",
    content:
      "Based on the last session, the main findings were: (1) strong preference for short audio clips, (2) interest in follow-up interviews, and (3) need for clearer CTAs in the prototype.",
    senderLabel: "Assistant",
    timestamp: new Date(),
    avatar: "smart_toy",
  },
  render: (args) => (
    <Box width={400}>
      <MsqdxChatMessage {...args} />
    </Box>
  ),
};

export const System: Story = {
  args: {
    role: "system",
    content: "Research session started. You can ask questions or request a summary.",
    timestamp: "Just now",
  },
  render: (args) => (
    <Box width={400}>
      <MsqdxChatMessage {...args} />
    </Box>
  ),
};

export const Thread: Story = {
  render: () => (
    <Box width={400} display="flex" flexDirection="column" gap={1.5}>
      <MsqdxChatMessage
        role="assistant"
        content="Hi, I’m your research assistant. What would you like to explore?"
        senderLabel="Assistant"
        timestamp={new Date(Date.now() - 120000)}
        avatar="smart_toy"
      />
      <MsqdxChatMessage
        role="user"
        content="Show me the latest persona insights."
        senderLabel="You"
        timestamp={new Date(Date.now() - 60000)}
        avatar="person"
        brandColor="purple"
      />
      <MsqdxChatMessage
        role="assistant"
        content="Here are the latest insights: Persona A shows higher engagement with audio content; Persona B prefers written summaries. I can drill down into either if you’d like."
        senderLabel="Assistant"
        timestamp={new Date()}
        avatar="smart_toy"
      />
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box width={400} display="flex" flexDirection="column" gap={2}>
      {(["flat", "glass", "elevated"] as const).map((variant) => (
        <MsqdxChatMessage
          key={variant}
          role="user"
          content={`Message with variant: ${variant}.`}
          senderLabel="You"
          variant={variant}
        />
      ))}
    </Box>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Box width={400} display="flex" flexDirection="column" gap={2}>
      {(["purple", "yellow", "pink", "orange", "green"] as const).map((brandColor) => (
        <MsqdxChatMessage
          key={brandColor}
          role="user"
          content={`Brand: ${brandColor}`}
          brandColor={brandColor}
        />
      ))}
    </Box>
  ),
};

export const WithImage: Story = {
  args: {
    role: "user",
    content: "Here’s the screenshot from the last test.",
    senderLabel: "You",
    timestamp: new Date(),
    images: [
      { src: "https://picsum.photos/400/240", alt: "Screenshot" },
    ],
  },
  render: (args) => (
    <Box width={400}>
      <MsqdxChatMessage {...args} />
    </Box>
  ),
};

export const WithMultipleImages: Story = {
  args: {
    role: "assistant",
    content: "I found these two variants. Which one do you prefer?",
    senderLabel: "Assistant",
    timestamp: new Date(),
    images: [
      { src: "https://picsum.photos/320/180", alt: "Variant A" },
      { src: "https://picsum.photos/320/180", alt: "Variant B" },
    ],
  },
  render: (args) => (
    <Box width={400}>
      <MsqdxChatMessage {...args} />
    </Box>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <Box width={400} display="flex" flexDirection="column" gap={2}>
      <MsqdxChatMessage
        role="user"
        content="This message is still sending…"
        status="sending"
        timestamp={new Date()}
      />
      <MsqdxChatMessage
        role="user"
        content="This one failed to send."
        status="error"
        timestamp={new Date()}
      />
    </Box>
  ),
};

export const WithOptions: Story = {
  args: {
    role: "user",
    content: "Fully configurable message with all options.",
    senderLabel: "You",
    timestamp: new Date(),
    avatar: "person",
    variant: "flat",
    brandColor: "purple",
    hoverable: true,
    borderRadius: "button",
    maxWidth: 320,
  },
  render: (args) => (
    <Box width={400}>
      <MsqdxChatMessage {...args} />
    </Box>
  ),
};
