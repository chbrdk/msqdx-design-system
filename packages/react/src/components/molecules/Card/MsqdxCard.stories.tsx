import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxCard } from "./MsqdxCard";
import { MsqdxTypography } from "../../atoms/Typography";
import { MsqdxChip } from "../../atoms/Chip";
import { MsqdxButton } from "../../atoms/Button";
import { MsqdxAspectRatio } from "../../atoms/AspectRatio";

const meta = {
  title: "Design System/Molecules/Card",
  component: MsqdxCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Zentrale Karten-Komponente: Media (alle Aspect Ratios), Eyebrow, Titel, Subtitle, Kontextmenü, Chips, Body, Footer. Nutzt ausschließlich Tokens und Atome.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["flat", "glass", "elevated"],
      description: "Card surface",
    },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green"],
      description: "Brand color",
    },
    titleVariant: {
      control: "select",
      options: ["h4", "h5", "h6"],
      description: "Title typography variant",
    },
    borderRadius: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "button", "1.5xl", "2xl"],
      description: "Border radius (Token)",
    },
  },
} as Meta<typeof MsqdxCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card Title",
    subtitle: "Optional subtitle or description line.",
    children: (
      <MsqdxTypography variant="body2">
        Body content. Alle Varianten und Slots sind optional.
      </MsqdxTypography>
    ),
  },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: "Kategorie",
    title: "Titel mit Eyebrow",
    subtitle: "Subtitle unter dem Titel.",
    children: <MsqdxTypography variant="body2">Inhalt.</MsqdxTypography>,
  },
};

export const WithMedia: Story = {
  args: {
    title: "Card mit Media",
    subtitle: "Media nutzt MsqdxAspectRatio (Token aspect ratios).",
    media: (
      <MsqdxAspectRatio ratio="video" objectFit="cover">
        <img
          src="https://picsum.photos/800/450"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </MsqdxAspectRatio>
    ),
    children: <MsqdxTypography variant="body2">Body unter dem Bild.</MsqdxTypography>,
  },
};

export const MediaAspectRatios: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {(["square", "video", "photo", "portrait"] as const).map((ratio) => (
        <MsqdxCard
          key={ratio}
          variant="flat"
          title={ratio}
          media={
            <MsqdxAspectRatio ratio={ratio} objectFit="cover">
              <img
                src="https://picsum.photos/400/400"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </MsqdxAspectRatio>
          }
        />
      ))}
    </div>
  ),
};

export const WithChips: Story = {
  args: {
    title: "Card mit Chips",
    chips: (
      <>
        <MsqdxChip label="Tag 1" brandColor="green" size="small" />
        <MsqdxChip label="Tag 2" brandColor="purple" variant="outlined" size="small" />
        <MsqdxChip label="Tag 3" brandColor="pink" variant="filled" size="small" />
      </>
    ),
    children: <MsqdxTypography variant="body2">Inhalt unter den Chips.</MsqdxTypography>,
  },
};

export const WithContextMenu: Story = {
  args: {
    title: "Card mit Kontextmenü",
    subtitle: "Rechts oben erscheint das Circle-Context-Menü.",
    contextMenuItems: [
      {
        id: "edit",
        icon: "Edit",
        label: "Bearbeiten",
        onClick: () => {},
      },
      {
        id: "delete",
        icon: "Delete",
        label: "Löschen",
        onClick: () => {},
      },
    ],
    contextMenuTriggerLabel: "Aktionen",
    children: <MsqdxTypography variant="body2">Body.</MsqdxTypography>,
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card mit Footer",
    children: <MsqdxTypography variant="body2">Hauptinhalt.</MsqdxTypography>,
    footer: (
      <MsqdxButton variant="outlined" size="small" brandColor="green">
        Aktion
      </MsqdxButton>
    ),
    footerDivider: true,
  },
};

export const ActionsBottomRight: Story = {
  args: {
    title: "Card mit Actions unten rechts",
    subtitle: "Buttons sitzen immer unten rechts.",
    children: <MsqdxTypography variant="body2">Inhalt.</MsqdxTypography>,
    actions: (
      <>
        <MsqdxButton variant="outlined" size="small" brandColor="green">
          Abbrechen
        </MsqdxButton>
        <MsqdxButton variant="contained" size="small" brandColor="green">
          Speichern
        </MsqdxButton>
      </>
    ),
  },
};

export const FooterAndActions: Story = {
  args: {
    title: "Footer links, Buttons rechts",
    children: <MsqdxTypography variant="body2">Inhalt.</MsqdxTypography>,
    footer: (
      <MsqdxTypography variant="caption" color="text.secondary">
        Zuletzt bearbeitet vor 2 Tagen
      </MsqdxTypography>
    ),
    actions: (
      <>
        <MsqdxButton variant="outlined" size="small" brandColor="green">
          Abbrechen
        </MsqdxButton>
        <MsqdxButton variant="contained" size="small" brandColor="green">
          Speichern
        </MsqdxButton>
      </>
    ),
  },
};

export const BorderRadius: Story = {
  args: {
    title: "Border Radius einstellbar",
    borderRadius: "lg",
    children: (
      <MsqdxTypography variant="body2">
        borderRadius nutzt MSQDX_SPACING.borderRadius (xs, sm, md, lg, button, 1.5xl, 2xl, …).
      </MsqdxTypography>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <MsqdxCard variant="flat" title="Flat" brandColor="green">
        <MsqdxTypography variant="body2">Flat card.</MsqdxTypography>
      </MsqdxCard>
      <MsqdxCard variant="glass" title="Glass" brandColor="purple">
        <MsqdxTypography variant="body2">Glass card.</MsqdxTypography>
      </MsqdxCard>
      <MsqdxCard variant="elevated" title="Elevated" brandColor="pink">
        <MsqdxTypography variant="body2">Elevated card.</MsqdxTypography>
      </MsqdxCard>
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    clickable: true,
    title: "Klickbare Karte",
    subtitle: "Ganze Karte ist klickbar.",
    children: <MsqdxTypography variant="body2">Klick mich.</MsqdxTypography>,
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    title: "Hover-Karte",
    subtitle: "Hover für leichten Lift und Schatten.",
    children: <MsqdxTypography variant="body2">Hover mich.</MsqdxTypography>,
  },
};

export const FullExample: Story = {
  args: {
    variant: "glass",
    brandColor: "green",
    hoverable: true,
    eyebrow: "Projekt",
    title: "Vollständige Karten-Variante",
    titleVariant: "h5",
    subtitle: "Mit Media, Chips, Kontextmenü und Footer.",
    media: (
      <MsqdxAspectRatio ratio="photo" objectFit="cover">
        <img
          src="https://picsum.photos/800/600"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </MsqdxAspectRatio>
    ),
    contextMenuItems: [
      { id: "edit", icon: "Edit", label: "Bearbeiten", onClick: () => {} },
      { id: "share", icon: "Share", label: "Teilen", onClick: () => {} },
      { id: "delete", icon: "Delete", label: "Löschen", onClick: () => {} },
    ],
    contextMenuTriggerLabel: "Menü",
    chips: (
      <>
        <MsqdxChip label="Neu" brandColor="green" size="small" />
        <MsqdxChip label="Design" brandColor="purple" variant="outlined" size="small" />
      </>
    ),
    children: (
      <MsqdxTypography variant="body2">
        Body-Text. Alle Slots kombiniert: Eyebrow, Titel, Subtitle, Media, Chips, Kontextmenü, Footer.
      </MsqdxTypography>
    ),
    footer: (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <MsqdxButton variant="outlined" size="small" brandColor="green">
          Öffnen
        </MsqdxButton>
        <MsqdxTypography variant="caption" color="text.secondary">
          Zuletzt bearbeitet vor 2 Tagen
        </MsqdxTypography>
      </div>
    ),
  },
};
