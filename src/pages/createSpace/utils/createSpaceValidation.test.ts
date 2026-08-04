import { describe, expect, it } from "vitest";
import {
  SPACE_DESCRIPTION_MAX_LENGTH_ERROR,
  SPACE_NAME_MAX_LENGTH_ERROR,
  SPACE_NAME_REQUIRED_ERROR,
  validateSpaceDescriptionMaxLength,
  validateSpaceNameMaxLength,
  validateSpaceNameRequired,
} from "./createSpaceValidation";

describe("validateSpaceNameRequired", () => {
  it("공백 제외 값이 있으면 true를 반환한다", () => {
    expect(validateSpaceNameRequired("포가더 전시")).toBe(true);
  });

  it("빈 문자열이면 에러 메시지를 반환한다", () => {
    expect(validateSpaceNameRequired("")).toBe(SPACE_NAME_REQUIRED_ERROR);
  });

  it("공백만 있으면 에러 메시지를 반환한다", () => {
    expect(validateSpaceNameRequired("   ")).toBe(SPACE_NAME_REQUIRED_ERROR);
  });
});

describe("validateSpaceNameMaxLength", () => {
  it("50자 이하면 true를 반환한다", () => {
    expect(validateSpaceNameMaxLength("a".repeat(50))).toBe(true);
  });

  it("50자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateSpaceNameMaxLength("a".repeat(51))).toBe(
      SPACE_NAME_MAX_LENGTH_ERROR,
    );
  });

  it("그래핌(예: 이모지) 단위로 글자 수를 센다", () => {
    expect(validateSpaceNameMaxLength("😀".repeat(51))).toBe(
      SPACE_NAME_MAX_LENGTH_ERROR,
    );
    expect(validateSpaceNameMaxLength("😀".repeat(50))).toBe(true);
  });
});

describe("validateSpaceDescriptionMaxLength", () => {
  it("200자 이하면 true를 반환한다", () => {
    expect(validateSpaceDescriptionMaxLength("a".repeat(200))).toBe(true);
  });

  it("200자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateSpaceDescriptionMaxLength("a".repeat(201))).toBe(
      SPACE_DESCRIPTION_MAX_LENGTH_ERROR,
    );
  });

  it("빈 문자열이어도 true를 반환한다 (선택 입력)", () => {
    expect(validateSpaceDescriptionMaxLength("")).toBe(true);
  });
});
