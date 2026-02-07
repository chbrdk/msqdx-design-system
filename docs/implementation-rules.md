# MSQDX Implementation Rules

Verbindliche Regeln für die Umsetzung mit dem MSQDX Design System.

---

## 1. Design Tokens immer verwenden

**Bei jeder UI-Umsetzung die zentralen Design Tokens nutzen – keine hardcodierten Werte.**

| Bereich | Token | Beispiel statt Hardcode |
|--------|--------|---------------------------|
| Farben | `MSQDX_COLORS`, `MSQDX_THEME` | ~~`#00ca55`~~ → `MSQDX_COLORS.brand.green` |
| Abstände | `MSQDX_SPACING.scale`, `.padding`, `.borderRadius` | ~~`16`~~ → `MSQDX_SPACING.scale.md` |
| Typografie | `MSQDX_TYPOGRAPHY` | ~~`'1rem'`~~ → `MSQDX_TYPOGRAPHY.fontSize.base` |
| Schatten, Opacity, Border | `MSQDX_EFFECTS` | ~~`'0 4px 6px ...'`~~ → `MSQDX_EFFECTS.shadows.md` |
| Animationen | `MSQDX_ANIMATION_DURATION`, `MSQDX_ANIMATION_EASING` | ~~`'0.3s'`~~ → `MSQDX_ANIMATION_DURATION.standard` |
| Layout (Grid, Overflow, Cursor) | `MSQDX_LAYOUT` | ~~`'flex-start'`~~ → `MSQDX_LAYOUT.alignment.justify.start` |
| Breakpoints | `MSQDX_BREAKPOINTS` | ~~`600`~~ → `MSQDX_BREAKPOINTS.sm` |
| Touch-Ziele, Focus, Reduced Motion | `MSQDX_INTERACTION` | ~~`44`~~ → `MSQDX_INTERACTION.minTouchTarget.min` |

**Import:**

```ts
import {
  MSQDX_COLORS,
  MSQDX_SPACING,
  MSQDX_TYPOGRAPHY,
  MSQDX_EFFECTS,
  MSQDX_LAYOUT,
  MSQDX_BREAKPOINTS,
  MSQDX_INTERACTION,
  // ... je nach Bedarf
} from '@msqdx/tokens';
```

- Vollständige Token-Referenz: [design-tokens.md](./design-tokens.md)  
- Storybook: **Design System / Design Tokens** für alle Token und Beispiele.

---

## 2. Warum Tokens nutzen?

- **Konsistenz** – ein gemeinsamer Look & Feel über alle Anwendungen.
- **Theming** – zentrale Anpassung von Farben, Abständen, Animationen.
- **Wartung** – Änderungen nur an einer Stelle (Tokens), nicht in jeder Komponente.
- **Barrierefreiheit** – z. B. `MSQDX_INTERACTION` für Touch-Ziele und Reduced Motion.

---

## 3. Ausnahmen

- **Einmalige Prototypen / Spikes** – kurzlebige Skizzen können Hardcodes enthalten; vor Übernahme in die Design-System-Umsetzung in Tokens überführen.
- **Werte, die es als Token (noch) nicht gibt** – zuerst prüfen, ob ein passender Token existiert oder ergänzt werden sollte; nur dann einen begründeten Ausnahmewert verwenden.

Diese Regeln gelten für alle Repositories und Apps, die das MSQDX Design System nutzen.
