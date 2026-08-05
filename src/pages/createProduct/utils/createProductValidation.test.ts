import { describe, expect, it } from "vitest";
import {
  PRODUCT_DESCRIPTION_MAX_LENGTH_ERROR,
  PRODUCT_TITLE_MAX_LENGTH_ERROR,
  PRODUCT_TITLE_REQUIRED_ERROR,
  validateProductDescriptionMaxLength,
  validateProductTitleMaxLength,
  validateProductTitleRequired,
} from "./createProductValidation";

describe("validateProductTitleRequired", () => {
  it("공백을 포함한 제목이 있으면 true를 반환한다", () => {
    expect(validateProductTitleRequired("작품 제목")).toBe(true);
  });

  it("빈 문자열이면 에러 메시지를 반환한다", () => {
    expect(validateProductTitleRequired("")).toBe(PRODUCT_TITLE_REQUIRED_ERROR);
  });

  it("공백 문자로만 이루어진 문자열이면 에러 메시지를 반환한다", () => {
    expect(validateProductTitleRequired("   ")).toBe(
      PRODUCT_TITLE_REQUIRED_ERROR,
    );
  });
});

describe("validateProductTitleMaxLength", () => {
  it("50자 이하이면 true를 반환한다", () => {
    expect(validateProductTitleMaxLength("a".repeat(50))).toBe(true);
  });

  it("50자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateProductTitleMaxLength("a".repeat(51))).toBe(
      PRODUCT_TITLE_MAX_LENGTH_ERROR,
    );
  });
});

describe("validateProductDescriptionMaxLength", () => {
  it("200자 이하이면 true를 반환한다", () => {
    expect(validateProductDescriptionMaxLength("a".repeat(200))).toBe(true);
  });

  it("200자를 초과하면 에러 메시지를 반환한다", () => {
    expect(validateProductDescriptionMaxLength("a".repeat(201))).toBe(
      PRODUCT_DESCRIPTION_MAX_LENGTH_ERROR,
    );
  });
});
