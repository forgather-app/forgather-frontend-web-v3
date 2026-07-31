import { describe, expect, it } from "vitest";
import {
  INTRODUCTION_MAX_LENGTH_ERROR,
  NICKNAME_MAX_LENGTH_ERROR,
  NICKNAME_REQUIRED_ERROR,
  validateIntroductionMaxLength,
  validateNicknameMaxLength,
  validateNicknameRequired,
} from "./profileEditValidation";

describe("validateNicknameRequired", () => {
  it("공백 제외 값이 있으면 true를 반환한다", () => {
    expect(validateNicknameRequired("작가")).toBe(true);
  });

  it("빈 문자열이면 에러 메시지를 반환한다", () => {
    expect(validateNicknameRequired("")).toBe(NICKNAME_REQUIRED_ERROR);
  });

  it("공백만 있으면 에러 메시지를 반환한다", () => {
    expect(validateNicknameRequired("   ")).toBe(NICKNAME_REQUIRED_ERROR);
  });
});

describe("validateNicknameMaxLength", () => {
  it("10자 이하면 true를 반환한다", () => {
    expect(validateNicknameMaxLength("1234567890")).toBe(true);
  });

  it("10자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateNicknameMaxLength("12345678901")).toBe(
      NICKNAME_MAX_LENGTH_ERROR,
    );
  });

  it("그래핌(예: 이모지) 단위로 글자 수를 센다", () => {
    expect(validateNicknameMaxLength("😀".repeat(11))).toBe(
      NICKNAME_MAX_LENGTH_ERROR,
    );
    expect(validateNicknameMaxLength("😀".repeat(10))).toBe(true);
  });
});

describe("validateIntroductionMaxLength", () => {
  it("50자 이하면 true를 반환한다", () => {
    expect(validateIntroductionMaxLength("a".repeat(50))).toBe(true);
  });

  it("50자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateIntroductionMaxLength("a".repeat(51))).toBe(
      INTRODUCTION_MAX_LENGTH_ERROR,
    );
  });
});
