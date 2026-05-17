import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const componentSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "MsqdxCornerTabCard.tsx"),
  "utf8"
);

describe("MsqdxCornerTabCard", () => {
  it("composes MsqdxCornerBox with placement prop", () => {
    expect(componentSource).toContain("MsqdxCornerBox");
    expect(componentSource).toContain('placement = "top-left"');
    expect(componentSource).toContain("getCornerTabCardLayout");
  });

  it("exports from molecules index", () => {
    const moleculesIndex = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../index.ts"),
      "utf8"
    );
    expect(moleculesIndex).toContain("./CornerTabCard");
  });
});
