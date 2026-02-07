import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { MsqdxAppLayout } from "./MsqdxAppLayout";
import { MsqdxAdminNav } from "../../molecules/AdminNav/MsqdxAdminNav";
import type { AdminNavItem } from "../../molecules/AdminNav/MsqdxAdminNav";

const defaultNavItems: AdminNavItem[] = [
  { label: "Dashboard", path: "/admin", icon: "dashboard" },
  { label: "Personas", path: "/admin/personas", icon: "person" },
  { label: "Target Groups", path: "/admin/target-groups", icon: "groups" },
  { label: "Journeys", path: "/admin/journeys", icon: "route" },
  { label: "Queue", path: "/admin/queue", icon: "view_list" },
  { label: "Chat", path: "/admin/chat", icon: "forum" },
  { label: "Chat History", path: "/admin/chat/history", icon: "history" },
];
const defaultExternalItems: AdminNavItem[] = [
  { label: "Settings", path: "/admin/settings", icon: "settings" },
];

const meta = {
  title: "Design System/Layout/AppLayout",
  component: MsqdxAppLayout,
  parameters: {
    layout: "fullscreen",
    controls: {
      include: [
        "brandColor",
        "borderRadius",
        "borderWidth",
        "innerBackground",
        "innerBackgroundColor",
        "logo",
        "appName",
      ],
    },
    docs: {
      description: {
        component: `
Vollflächiger App-Container:
- **Äußeres Div**: volle Browserfläche, Hintergrund = Brand-Farbe
- **Inneres Div**: volle Fläche, runde Ecken (Rahmen in Brand-Farbe), heller Hintergrund

\`children\` werden im inneren Container gerendert.
- **brandColor**: purple, yellow, pink, orange, green, black
- **borderRadius**: Token-Key (z. B. md, lg, 2xl)
- **borderWidth**: none, thin, medium, thick, heavy
- **innerBackground**: default, offwhite, white, checker (Karo), grid (Linienraster wie Audion)
- **innerBackgroundColor**: optional, eigene Farbe
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    borderRadius: {
      control: "select",
      options: ["sm", "md", "lg", "button", "1.5xl", "2xl"],
    },
    borderWidth: {
      control: "select",
      options: ["none", "thin", "medium", "thick", "heavy"],
    },
    innerBackground: {
      control: "select",
      options: ["default", "offwhite", "white", "checker", "grid"],
    },
    logo: {
      control: "boolean",
      description: "Logo in der linken oberen Ecke (MsqdxCornerBox)",
    },
    appName: {
      control: "text",
      description: "App-Name neben dem Logo in der linken Ecke",
    },
  },
} as Meta<typeof MsqdxAppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandColor: "green",
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">App-Inhalt</Typography>
        <Typography variant="body2" color="text.secondary">
          Dieser Bereich liegt im inneren Container (runde Ecken, heller Hintergrund).
          Das Äußere ist in der Brand-Farbe.
        </Typography>
      </Box>
    ),
  },
};

export const WithCornerBox: Story = {
  args: {
    brandColor: "green",
    logo: { size: "small", color: "black" },
    appName: "My App",
    sidebar: null,
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">App mit Logo in der linken Ecke</Typography>
        <Typography variant="body2" color="text.secondary">
          MsqdxCornerBox (Logo + App-Name + Divider) sitzt in der linken oberen Ecke.
        </Typography>
      </Box>
    ),
  },
  render: (args) => {
    const [navOpen, setNavOpen] = useState(false);
    const brandColor = (args.brandColor ?? "green") as "purple" | "yellow" | "pink" | "orange" | "green" | "black";
    return (
      <MsqdxAppLayout
        {...args}
        sidebar={
          <MsqdxAdminNav
            open={navOpen}
            onClose={() => setNavOpen(false)}
            currentPath="/admin"
            items={defaultNavItems}
            externalItems={defaultExternalItems}
            themeMode="light"
            onToggleTheme={() => {}}
            brandColor={brandColor}
          />
        }
      >
        {args.children}
      </MsqdxAppLayout>
    );
  },
};

export const Purple: Story = {
  args: {
    brandColor: "purple",
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Brand: Purple</Typography>
      </Box>
    ),
  },
};

export const Orange: Story = {
  args: {
    brandColor: "orange",
    borderRadius: "lg",
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Brand: Orange, kleinerer Radius</Typography>
      </Box>
    ),
  },
};

export const Offwhite: Story = {
  args: {
    brandColor: "green",
    innerBackground: "offwhite",
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Hintergrund: Offwhite (Token neutral)</Typography>
      </Box>
    ),
  },
};

export const Checker: Story = {
  args: {
    brandColor: "green",
    innerBackground: "checker",
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Hintergrund: Karo-Muster</Typography>
      </Box>
    ),
  },
};

export const Grid: Story = {
  args: {
    brandColor: "green",
    innerBackground: "grid",
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Hintergrund: Linienraster (wie Audion Admin)</Typography>
      </Box>
    ),
  },
};
