import { describe, expect, it } from "vitest";
import { CONSTRAINTS } from "@/constants/constraints";
import {
  SPACE_DESCRIPTION_MAX_LENGTH_ERROR,
  SPACE_LINK_PAIR_ERROR,
  SPACE_NAME_MAX_LENGTH_ERROR,
  SPACE_NAME_REQUIRED_ERROR,
  validateSpaceDescriptionMaxLength,
  validateSpaceLinkPair,
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
  const max = CONSTRAINTS.CREATE_SPACE.NAME_MAX_LENGTH;

  it("최대 길이 이하면 true를 반환한다", () => {
    expect(validateSpaceNameMaxLength("a".repeat(max))).toBe(true);
  });

  it("최대 길이를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateSpaceNameMaxLength("a".repeat(max + 1))).toBe(
      SPACE_NAME_MAX_LENGTH_ERROR,
    );
  });

  it("그래핌(예: 이모지) 단위로 글자 수를 센다", () => {
    expect(validateSpaceNameMaxLength("😀".repeat(max + 1))).toBe(
      SPACE_NAME_MAX_LENGTH_ERROR,
    );
    expect(validateSpaceNameMaxLength("😀".repeat(max))).toBe(true);
  });
});

describe("validateSpaceDescriptionMaxLength", () => {
  const max = CONSTRAINTS.CREATE_SPACE.DESCRIPTION_MAX_LENGTH;

  it("최대 길이 이하면 true를 반환한다", () => {
    expect(validateSpaceDescriptionMaxLength("a".repeat(max))).toBe(true);
  });

  it("최대 길이를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateSpaceDescriptionMaxLength("a".repeat(max + 1))).toBe(
      SPACE_DESCRIPTION_MAX_LENGTH_ERROR,
    );
  });

  it("빈 문자열이어도 true를 반환한다 (선택 입력)", () => {
    expect(validateSpaceDescriptionMaxLength("")).toBe(true);
  });
});

describe("validateSpaceLinkPair", () => {
  it("URL과 표시 이름이 둘 다 채워져 있으면 true를 반환한다", () => {
    expect(
      validateSpaceLinkPair("", {
        linkUrl: "https://example.com",
        linkName: "인스타그램",
      }),
    ).toBe(true);
  });

  it("URL과 표시 이름이 둘 다 비어 있으면 true를 반환한다", () => {
    expect(validateSpaceLinkPair("", { linkUrl: "", linkName: "" })).toBe(true);
  });

  it("URL만 입력되고 표시 이름이 비어 있으면 에러 메시지를 반환한다", () => {
    expect(
      validateSpaceLinkPair("", {
        linkUrl: "https://example.com",
        linkName: "",
      }),
    ).toBe(SPACE_LINK_PAIR_ERROR);
  });

  it("표시 이름만 입력되고 URL이 비어 있으면 에러 메시지를 반환한다", () => {
    expect(
      validateSpaceLinkPair("", { linkUrl: "", linkName: "인스타그램" }),
    ).toBe(SPACE_LINK_PAIR_ERROR);
  });

  it("공백만 입력된 경우는 비어 있는 것으로 취급한다", () => {
    expect(
      validateSpaceLinkPair("", {
        linkUrl: "https://example.com",
        linkName: "   ",
      }),
    ).toBe(SPACE_LINK_PAIR_ERROR);
  });
});
