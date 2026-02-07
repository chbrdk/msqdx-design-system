import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MsqdxUploadDropzone } from "./MsqdxUploadDropzone";

const meta: Meta<typeof MsqdxUploadDropzone> = {
  title: "Design System/AUDION/UploadDropzone",
  component: MsqdxUploadDropzone,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
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
      options: ["none", "sm", "button", "full"],
      control: "select",
      description: "Border radius from tokens",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MsqdxUploadDropzone>;

const onFileSelect = async (file: File) => console.log("Selected", file.name);

export const Idle: Story = {
  args: {
    onFileSelect,
  },
};

export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2} width={360}>
      {(["flat", "glass", "elevated"] as const).map((variant) => (
        <MsqdxUploadDropzone
          key={variant}
          variant={variant}
          onFileSelect={onFileSelect}
        />
      ))}
    </Box>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2} width={360}>
      {(["purple", "yellow", "pink", "orange", "green"] as const).map((brandColor) => (
        <MsqdxUploadDropzone
          key={brandColor}
          brandColor={brandColor}
          onFileSelect={onFileSelect}
        />
      ))}
    </Box>
  ),
};

export const WithStatus: Story = {
  args: {
    onFileSelect,
    status: {
      label: "Uploading… 42%",
      progress: 42,
      variant: "processing",
    },
  },
};
