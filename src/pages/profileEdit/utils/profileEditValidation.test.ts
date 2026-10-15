import { describe, expect, it } from "vitest";
import { CONSTRAINTS } from "@/constants/constraints";
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
  const max = CONSTRAINTS.PROFILE.NICKNAME_MAX_LENGTH;

  it("최대 길이 이하면 true를 반환한다", () => {
    expect(validateNicknameMaxLength("a".repeat(max))).toBe(true);
  });

  it("최대 길이를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateNicknameMaxLength("a".repeat(max + 1))).toBe(
      NICKNAME_MAX_LENGTH_ERROR,
    );
  });

  it("그래핌(예: 이모지) 단위로 글자 수를 센다", () => {
    expect(validateNicknameMaxLength("😀".repeat(max + 1))).toBe(
      NICKNAME_MAX_LENGTH_ERROR,
    );
    expect(validateNicknameMaxLength("😀".repeat(max))).toBe(true);
  });
});

describe("validateIntroductionMaxLength", () => {
  const max = CONSTRAINTS.PROFILE.INTRO_MAX_LENGTH;

  it("최대 길이 이하면 true를 반환한다", () => {
    expect(validateIntroductionMaxLength("a".repeat(max))).toBe(true);
  });

  it("최대 길이를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateIntroductionMaxLength("a".repeat(max + 1))).toBe(
      INTRODUCTION_MAX_LENGTH_ERROR,
    );
  });
});
