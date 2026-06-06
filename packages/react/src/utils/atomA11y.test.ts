import { describe, expect, it } from "vitest";
import {
  transitionInteractive,
  transitionProperties,
  transitionTiming,
} from "./atomA11y";

describe("atomA11y transition helpers", () => {
  it("transitionProperties prefixes each property with timing", () => {
    const result = transitionProperties("color", "opacity");
    expect(result).toContain(`color ${transitionTiming}`);
    expect(result).toContain(`opacity ${transitionTiming}`);
    expect(result).not.toMatch(/^all /);
  });

  it("transitionInteractive avoids implicit CSS all", () => {
    expect(transitionInteractive).toContain("background-color");
    expect(transitionInteractive).not.toMatch(/^all /);
    expect(transitionInteractive).not.toBe(transitionTiming);
  });
});
