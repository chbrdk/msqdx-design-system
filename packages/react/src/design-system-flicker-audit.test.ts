/**
 * Full atoms + molecules flicker/hydration audit.
 * Scans every Msqdx*.tsx implementation file (stories excluded).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const srcRoot = join(import.meta.dirname, ".");

const LAYOUT_DEFER_TRANSITION = new Set([
  "components/molecules/AdminNav/MsqdxAdminNav.tsx",
  "components/molecules/CollapsiblePanel/MsqdxCollapsiblePanel.tsx",
]);

function collectMsqdxComponents(dir: string, prefix = ""): string[] {
  const paths: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = prefix ? `${prefix}/${entry}` : entry;
    const st = statSync(full);
    if (st.isDirectory()) {
      paths.push(...collectMsqdxComponents(full, rel));
    } else if (
      entry.startsWith("Msqdx") &&
      entry.endsWith(".tsx") &&
      !entry.endsWith(".stories.tsx")
    ) {
      paths.push(rel);
    }
  }
  return paths.sort();
}

const atomComponents = collectMsqdxComponents(
  join(srcRoot, "components/atoms"),
  "components/atoms",
);
const moleculeComponents = collectMsqdxComponents(
  join(srcRoot, "components/molecules"),
  "components/molecules",
);
const layoutComponents = collectMsqdxComponents(
  join(srcRoot, "components/layout"),
  "components/layout",
);
const audionComponents = collectMsqdxComponents(
  join(srcRoot, "components/audion"),
  "components/audion",
);
const prismionComponents = collectMsqdxComponents(
  join(srcRoot, "components/prismion"),
  "components/prismion",
);

function read(rel: string): string {
  return readFileSync(join(srcRoot, rel), "utf8");
}

function auditSource(rel: string, source: string): string[] {
  const issues: string[] = [];

  if (/\bsetMounted\b/.test(source) || /\bisMounted\b/.test(source)) {
    issues.push("mounted gate (setMounted/isMounted)");
  }
  if (/transition:\s*['"]all/.test(source) || /transition:\s*`all/.test(source)) {
    issues.push("transition: all");
  }
  if (/transition:\s*MSQDX_EFFECTS\.transitions\.(standard|fast|slow|spring)/.test(source)) {
    issues.push("bare MSQDX_EFFECTS.transitions.* (implicit CSS all)");
  }
  if (/transition:\s*MSQDX_BUTTON\.transition\.(default|fast)/.test(source)) {
    issues.push("bare MSQDX_BUTTON.transition (implicit CSS all)");
  }
  if (/transition:\s*MSQDX_AVATAR\.transition/.test(source)) {
    issues.push("bare MSQDX_AVATAR.transition (implicit CSS all)");
  }
  if (/transition:\s*MSQDX_SCROLLBAR\.transition/.test(source)) {
    issues.push("bare MSQDX_SCROLLBAR.transition (implicit CSS all)");
  }
  if (/noSsr:\s*true/.test(source) && !/defaultMatches:\s*false/.test(source)) {
    issues.push("useMediaQuery noSsr without defaultMatches: false");
  }
  if (LAYOUT_DEFER_TRANSITION.has(rel)) {
    if (!source.includes("transitionsEnabled") || !source.includes("requestAnimationFrame")) {
      issues.push("layout width transition not deferred (missing transitionsEnabled)");
    }
  }

  return issues;
}

describe("design-system flicker audit — all atoms", () => {
  it(`covers ${atomComponents.length} atom components`, () => {
    expect(atomComponents.length).toBeGreaterThanOrEqual(15);
  });

  for (const rel of atomComponents) {
    it(`${rel}`, () => {
      const issues = auditSource(rel, read(rel));
      expect(issues, issues.join("; ")).toEqual([]);
    });
  }
});

describe("design-system flicker audit — all molecules", () => {
  it(`covers ${moleculeComponents.length} molecule components`, () => {
    expect(moleculeComponents.length).toBeGreaterThanOrEqual(20);
  });

  for (const rel of moleculeComponents) {
    it(`${rel}`, () => {
      const issues = auditSource(rel, read(rel));
      expect(issues, issues.join("; ")).toEqual([]);
    });
  }
});

describe("design-system flicker audit — all layout components", () => {
  it(`covers ${layoutComponents.length} layout components`, () => {
    expect(layoutComponents.length).toBeGreaterThanOrEqual(1);
  });

  for (const rel of layoutComponents) {
    it(`${rel}`, () => {
      const issues = auditSource(rel, read(rel));
      expect(issues, issues.join("; ")).toEqual([]);
    });
  }
});

describe("design-system flicker audit — all audion components", () => {
  it(`covers ${audionComponents.length} audion components`, () => {
    expect(audionComponents.length).toBeGreaterThanOrEqual(10);
  });

  for (const rel of audionComponents) {
    it(`${rel}`, () => {
      const issues = auditSource(rel, read(rel));
      expect(issues, issues.join("; ")).toEqual([]);
    });
  }
});

describe("design-system flicker audit — all prismion components", () => {
  it(`covers ${prismionComponents.length} prismion components`, () => {
    expect(prismionComponents.length).toBeGreaterThanOrEqual(15);
  });

  for (const rel of prismionComponents) {
    it(`${rel}`, () => {
      const issues = auditSource(rel, read(rel));
      expect(issues, issues.join("; ")).toEqual([]);
    });
  }
});

describe("design-system flicker audit — helpers", () => {
  it("atomA11y exposes targeted transition helpers", () => {
    const helper = read("utils/atomA11y.ts");
    expect(helper).toContain("transitionProperties");
    expect(helper).toContain("transitionInteractive");
  });
});
