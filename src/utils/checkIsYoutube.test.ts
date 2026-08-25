import { describe, expect, it } from "vitest";
import { checkIsYoutube } from "./checkIsYoutube";

describe("checkIsYoutube", () => {
  it("watch URL이면 true를 반환한다", () => {
    expect(checkIsYoutube("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      true,
    );
  });

  it("youtu.be 단축 URL이면 true를 반환한다", () => {
    expect(checkIsYoutube("https://youtu.be/dQw4w9WgXcQ")).toBe(true);
  });

  it("m.youtube.com 모바일 URL이면 true를 반환한다", () => {
    expect(checkIsYoutube("https://m.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      true,
    );
  });

  it("shorts URL이면 true를 반환한다", () => {
    expect(checkIsYoutube("https://youtube.com/shorts/dQw4w9WgXcQ")).toBe(true);
  });

  it("embed URL이면 true를 반환한다", () => {
    expect(checkIsYoutube("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe(
      true,
    );
  });

  it("유튜브 URL이 아니면 false를 반환한다", () => {
    expect(checkIsYoutube("https://example.com/video")).toBe(false);
  });

  it("프로토콜이 없으면 false를 반환한다", () => {
    expect(checkIsYoutube("youtube.com/watch?v=dQw4w9WgXcQ")).toBe(false);
  });

  it("빈 문자열이면 false를 반환한다", () => {
    expect(checkIsYoutube("")).toBe(false);
  });
});
