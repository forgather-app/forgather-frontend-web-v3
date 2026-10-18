import { describe, expect, it } from "vitest";
import { formatStatCount } from "./formatStatCount";

describe("formatStatCount", () => {
  it("10의 배수는 그대로 + 를 붙인다", () => {
    expect(formatStatCount(200)).toBe("200+");
  });

  it("10의 배수가 아니면 10단위로 올림한다", () => {
    expect(formatStatCount(237)).toBe("240+");
    expect(formatStatCount(201)).toBe("210+");
  });

  it("0은 0+ 로 표시한다", () => {
    expect(formatStatCount(0)).toBe("0+");
  });

  it("값이 없으면 0+ 로 표시한다", () => {
    expect(formatStatCount(undefined)).toBe("0+");
  });
});
