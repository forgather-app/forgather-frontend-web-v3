import { describe, expect, it } from "vitest";
import {
  MESSAGE_MAX_LENGTH_ERROR,
  MESSAGE_REQUIRED_ERROR,
  NICKNAME_MAX_LENGTH_ERROR,
  NICKNAME_REQUIRED_ERROR,
  validateMessageMaxLength,
  validateMessageRequired,
  validateNicknameMaxLength,
  validateNicknameRequired,
} from "./guestBookWriteValidation";

describe("validateNicknameRequired", () => {
  it("공백 제외 값이 있으면 true를 반환한다", () => {
    expect(validateNicknameRequired("방문자")).toBe(true);
  });

  it("빈 문자열이면 에러 메시지를 반환한다", () => {
    expect(validateNicknameRequired("")).toBe(NICKNAME_REQUIRED_ERROR);
  });

  it("공백만 있으면 에러 메시지를 반환한다", () => {
    expect(validateNicknameRequired("   ")).toBe(NICKNAME_REQUIRED_ERROR);
  });
});

describe("validateNicknameMaxLength", () => {
  it("20자 이하면 true를 반환한다", () => {
    expect(validateNicknameMaxLength("a".repeat(20))).toBe(true);
  });

  it("20자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateNicknameMaxLength("a".repeat(21))).toBe(
      NICKNAME_MAX_LENGTH_ERROR,
    );
  });

  it("그래핌(예: 이모지) 단위로 글자 수를 센다", () => {
    expect(validateNicknameMaxLength("😀".repeat(21))).toBe(
      NICKNAME_MAX_LENGTH_ERROR,
    );
    expect(validateNicknameMaxLength("😀".repeat(20))).toBe(true);
  });
});

describe("validateMessageRequired", () => {
  it("공백 제외 값이 있으면 true를 반환한다", () => {
    expect(validateMessageRequired("축하해요!")).toBe(true);
  });

  it("빈 문자열이면 에러 메시지를 반환한다", () => {
    expect(validateMessageRequired("")).toBe(MESSAGE_REQUIRED_ERROR);
  });
});

describe("validateMessageMaxLength", () => {
  it("400자 이하면 true를 반환한다", () => {
    expect(validateMessageMaxLength("a".repeat(400))).toBe(true);
  });

  it("400자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateMessageMaxLength("a".repeat(401))).toBe(
      MESSAGE_MAX_LENGTH_ERROR,
    );
  });
});
