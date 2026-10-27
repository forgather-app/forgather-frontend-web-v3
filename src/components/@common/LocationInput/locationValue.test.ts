import { describe, expect, it } from "vitest";
import { toLocationInputPayload, validateLocationInput } from "./locationValue";

const unlinked = { placeName: "", placeId: "", placeUrl: "" };
const linked = {
  placeName: "직접 입력한 전시장",
  placeId: "1234",
  placeUrl: "http://place.map.kakao.com/1234",
};

// These cases catch missing optional-name, length, required-name and pair guards.
describe("validateLocationInput", () => {
  it.each([
    "",
    "   ",
    "전시장",
    "가".repeat(50),
    "😀".repeat(50),
    "👨‍👩‍👧‍👦".repeat(50),
    "가".repeat(50),
  ])("accepts an unlinked name within the 50-grapheme limit: %j", (placeName) => {
    expect(validateLocationInput({ ...unlinked, placeName })).toBe(true);
  });

  it.each([
    "가".repeat(51),
    "😀".repeat(51),
    "👨‍👩‍👧‍👦".repeat(51),
    "가".repeat(51),
  ])("rejects names exceeding 50 graphemes: %j", (placeName) => {
    expect(validateLocationInput({ ...unlinked, placeName })).toEqual(
      expect.any(String),
    );
  });

  it.each(["", " \n\t "])("rejects a linked blank name: %j", (placeName) => {
    expect(validateLocationInput({ ...linked, placeName })).toEqual(
      expect.any(String),
    );
  });

  it.each([
    { ...linked, placeId: "" },
    { ...linked, placeUrl: "" },
  ])("rejects incomplete map metadata: %j", (value) => {
    expect(validateLocationInput(value)).toEqual(expect.any(String));
  });

  it("accepts a name with complete map metadata", () => {
    expect(validateLocationInput(linked)).toBe(true);
  });
});

// These cases catch accidental spreading, trimming or null-based deletion.
describe("toLocationInputPayload", () => {
  it("only returns the three storage fields, preserving the typed name and original URL", () => {
    const value = {
      ...linked,
      placeName: "  직접 입력한 이름  ",
      providerName: "검색 제공자 이름",
      address: "검색 제공자 주소",
      roadAddress: "검색 제공자 도로명 주소",
    };

    expect(toLocationInputPayload(value)).toEqual({
      placeName: "  직접 입력한 이름  ",
      placeId: "1234",
      placeUrl: "http://place.map.kakao.com/1234",
    });
  });

  it("retains the typed name when unlinking and uses empty strings for both map fields", () => {
    expect(
      toLocationInputPayload({ ...unlinked, placeName: "전시장" }),
    ).toEqual({
      placeName: "전시장",
      placeId: "",
      placeUrl: "",
    });
  });

  it("normalizes a whitespace-only name to an empty string", () => {
    expect(
      toLocationInputPayload({ ...unlinked, placeName: " \n\t " }),
    ).toEqual({
      placeName: "",
      placeId: "",
      placeUrl: "",
    });
  });
});
