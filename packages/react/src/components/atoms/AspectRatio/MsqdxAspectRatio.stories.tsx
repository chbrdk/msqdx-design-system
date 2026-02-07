import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxAspectRatio } from "./MsqdxAspectRatio";

const meta = {
  title: "Design System/Atoms/AspectRatio",
  component: MsqdxAspectRatio,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Wrapper für feste Seitenverhältnisse (Tokens: square, video, photo, portrait, wide, ultrawide). Für Card-Media, Thumbnails etc.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "select",
      options: ["square", "video", "photo", "portrait", "wide", "ultrawide"],
      description: "Aspect ratio from layout tokens",
    },
    objectFit: {
      control: "select",
      options: ["cover", "contain", "fill", "none"],
      description: "Object fit for img/video children",
    },
  },
} as Meta<typeof MsqdxAspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: {
    ratio: "square",
    children: (
      <img
        src="https://picsum.photos/400/400"
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
  },
};

export const Video: Story = {
  args: {
    ratio: "video",
    children: (
      <img
        src="https://picsum.photos/800/450"
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
  },
};

export const Photo: Story = {
  args: {
    ratio: "photo",
    objectFit: "cover",
    children: (
      <img
        src="https://picsum.photos/800/600"
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
  },
};

export const AllRatios: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {(["square", "video", "photo", "portrait"] as const).map((ratio) => (
        <div key={ratio} style={{ width: 200 }}>
          <MsqdxAspectRatio ratio={ratio} objectFit="cover">
            <img
              src="https://picsum.photos/400/300"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </MsqdxAspectRatio>
          <p style={{ margin: "4px 0 0", fontSize: 12 }}>{ratio}</p>
        </div>
      ))}
    </div>
  ),
};
