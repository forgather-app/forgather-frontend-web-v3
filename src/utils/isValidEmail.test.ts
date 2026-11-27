import { describe, expect, it } from "vitest";
import { isValidEmail } from "./isValidEmail";

describe("isValidEmail", () => {
  it("올바른 이메일 형식이면 true를 반환한다", () => {
    expect(isValidEmail("forgather@gmail.com")).toBe(true);
  });

  it("@가 없으면 false를 반환한다", () => {
    expect(isValidEmail("1234567890")).toBe(false);
  });

  it("도메인이 없으면 false를 반환한다", () => {
    expect(isValidEmail("forgather@gmail")).toBe(false);
  });

  it("빈 문자열이면 false를 반환한다", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("공백만 있으면 false를 반환한다", () => {
    expect(isValidEmail("   ")).toBe(false);
  });
});
