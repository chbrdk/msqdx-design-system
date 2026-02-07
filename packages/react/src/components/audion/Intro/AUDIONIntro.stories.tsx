import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";

const meta: Meta = {
  title: "Design System/AUDION/Intro",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "AUDION-spezifische Komponenten, gebaut ausschließlich aus Design-System-Bausteinen und Tokens.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const AUDIONComponents: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
      <MsqdxTypography variant="h4">AUDION Storybook</MsqdxTypography>
      <MsqdxTypography variant="body2" color="text.secondary">
        Komponenten nur aus @msqdx/react und @msqdx/tokens.
      </MsqdxTypography>
      <MsqdxButton brandColor="green">Button</MsqdxButton>
      <MsqdxCard sx={{ p: 2, minWidth: 200 }}>
        <MsqdxTypography variant="body2">Card mit Icon</MsqdxTypography>
        <MsqdxIcon name="person" size="sm" />
      </MsqdxCard>
    </Box>
  ),
};
