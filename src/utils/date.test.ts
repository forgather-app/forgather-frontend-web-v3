import { describe, expect, it } from "vitest";
import { parseDateOnlyString, toDateOnlyString } from "./date";

describe("toDateOnlyString", () => {
  it("YYYY-MM-DD 형식으로 변환한다", () => {
    expect(toDateOnlyString(new Date(2026, 2, 1))).toBe("2026-03-01");
  });

  it("월·일을 0으로 채운다", () => {
    expect(toDateOnlyString(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("parseDateOnlyString", () => {
  it("YYYY-MM-DD 문자열을 로컬 타임존의 Date로 변환한다", () => {
    const date = parseDateOnlyString("2026-03-01");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(2);
    expect(date.getDate()).toBe(1);
  });

  it("toDateOnlyString과 왕복 변환이 일치한다", () => {
    const original = "2026-01-05";
    expect(toDateOnlyString(parseDateOnlyString(original))).toBe(original);
  });
});
