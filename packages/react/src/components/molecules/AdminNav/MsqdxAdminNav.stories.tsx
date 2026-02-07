import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box } from "@mui/material";
import { MsqdxAdminNav } from "./MsqdxAdminNav";
import type { AdminNavItem } from "./MsqdxAdminNav";

const defaultItems: AdminNavItem[] = [
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
  title: "Design System/Molecules/AdminNav",
  component: MsqdxAdminNav,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Seitennavigation für Admin-Bereiche: ausklappbar (Desktop), Off-Canvas-Drawer (Mobile).
Baut auf **MSQDX_SPACING**, **MSQDX_NEUTRAL**, **MSQDX_TYPOGRAPHY**, **MSQDX_ICONS** auf.

- **items** / **externalItems**: Einträge mit label, path, icon (Material Symbol id)
- **open** / **onClose**: Mobile Drawer
- **currentPath**: Aktiv-Zustand
- **linkComponent**: z.B. Next.js \`Link\` für Client-Navigation
- **onToggleTheme** / **themeMode**: optionaler Theme-Umschalter unten
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    currentPath: { control: "text" },
    themeMode: { control: "select", options: ["light", "dark"] },
  },
} as Meta<typeof MsqdxAdminNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    currentPath: "/admin",
    items: defaultItems,
    externalItems: defaultExternalItems,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    return (
      <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <MsqdxAdminNav
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
        <Box sx={{ flex: 1, p: 3, bgcolor: "background.default" }}>
          Inhalt. Auf Mobile: Drawer schließen mit X oder Klick außerhalb.
        </Box>
      </Box>
    );
  },
};

export const WithThemeToggle: Story = {
  args: {
    open: true,
    currentPath: "/admin/settings",
    items: defaultItems,
    externalItems: defaultExternalItems,
    themeMode: "dark",
    onToggleTheme: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
    return (
      <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <MsqdxAdminNav
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          themeMode={themeMode}
          onToggleTheme={() => setThemeMode((m) => (m === "dark" ? "light" : "dark"))}
        />
        <Box sx={{ flex: 1, p: 3, bgcolor: "background.default" }}>
          Theme-Toggle unten in der Nav.
        </Box>
      </Box>
    );
  },
};
