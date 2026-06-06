/**
 * Guards ECHON-critical DS components against common flicker/hydration anti-patterns.
 * Not every package file is scanned — focus on layout + list UI primitives.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const srcRoot = join(import.meta.dirname, ".");

const FLICKER_CRITICAL_PATHS = [
  "components/molecules/AdminNav/MsqdxAdminNav.tsx",
  "components/molecules/GlassCard/MsqdxGlassCard.tsx",
  "components/molecules/CollapsiblePanel/MsqdxCollapsiblePanel.tsx",
  "components/layout/AppLayout/MsqdxAppLayout.tsx",
  "components/atoms/Chip/MsqdxChip.tsx",
  "components/molecules/Tabs/MsqdxTabs.tsx",
  "components/molecules/Stepper/MsqdxStepper.tsx",
];

function read(path: string): string {
  return readFileSync(join(srcRoot, path), "utf8");
}

/** Count TSX files under src (sanity: package has substantial surface). */
function countTsxFiles(dir: string): number {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      count += countTsxFiles(full);
    } else if (entry.endsWith(".tsx")) {
      count += 1;
    }
  }
  return count;
}

describe("design-system flicker audit (ECHON-critical subset)", () => {
  it("package has many components — audit is scoped, not exhaustive", () => {
    expect(countTsxFiles(srcRoot)).toBeGreaterThan(80);
  });

  for (const rel of FLICKER_CRITICAL_PATHS) {
    it(`${rel} avoids mounted gate and transition:all`, () => {
      const source = read(rel);
      expect(source).not.toMatch(/\bsetMounted\b/);
      expect(source).not.toMatch(/\bisMounted\b/);
      expect(source).not.toMatch(/transition:\s*['"]all/);
      expect(source).not.toMatch(/transition:\s*`all/);
    });
  }

  it("AdminNav defers width transitions until after first frame", () => {
    const nav = read("components/molecules/AdminNav/MsqdxAdminNav.tsx");
    expect(nav).toContain("transitionsEnabled");
    expect(nav).toContain("requestAnimationFrame");
  });

  it("CollapsiblePanel uses useSyncExternalStore for client detection", () => {
    const panel = read("components/molecules/CollapsiblePanel/MsqdxCollapsiblePanel.tsx");
    expect(panel).toContain("useSyncExternalStore");
  });
});
