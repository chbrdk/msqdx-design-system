import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("components index exports", () => {
  it("re-exports CornerTabCard from package entry", () => {
    const indexSource = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "index.ts"),
      "utf8"
    );
    expect(indexSource).toContain("export * from './molecules/CornerTabCard'");
  });
});
