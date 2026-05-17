import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

const layoutSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "MsqdxAppLayout.tsx"),
  "utf8"
);

describe("MsqdxAppLayout inner pane margin", () => {
  it("keeps the docked sidebar inner frame flush (no negative left margin)", () => {
    expect(layoutSource).toMatch(/hasSidebar[\s\S]*?marginLeft:\s*0/);
    expect(layoutSource).not.toMatch(/marginLeft:\s*-2/);
  });
});
