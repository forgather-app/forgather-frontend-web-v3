import { describe, expect, it } from "vitest";
import { getYoutubeEmbedUrl } from "./getYoutubeEmbedUrl";

describe("getYoutubeEmbedUrl", () => {
  it("watch URL을 embed URL로 변환한다", () => {
    expect(
      getYoutubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("youtu.be 단축 URL을 embed URL로 변환한다", () => {
    expect(getYoutubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    );
  });

  it("이미 embed URL이면 그대로 정규화해 반환한다", () => {
    expect(
      getYoutubeEmbedUrl("https://www.youtube.com/embed/dQw4w9WgXcQ"),
    ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("부가 쿼리 파라미터(t, list 등)가 있어도 video id만 추출한다", () => {
    expect(
      getYoutubeEmbedUrl(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s&list=PL123",
      ),
    ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("유튜브 URL이 아니면 null을 반환한다", () => {
    expect(getYoutubeEmbedUrl("https://example.com/video")).toBeNull();
  });

  it("유튜브가 아닌 도메인에 v/embed 패턴만 흉내낸 경우 null을 반환한다", () => {
    expect(
      getYoutubeEmbedUrl("https://evil.com/watch?v=dQw4w9WgXcQ"),
    ).toBeNull();
    expect(getYoutubeEmbedUrl("https://evil.com/embed/dQw4w9WgXcQ")).toBeNull();
  });

  it("URL 형식이 아니면 null을 반환한다", () => {
    expect(getYoutubeEmbedUrl("not-a-url")).toBeNull();
  });

  it("빈 문자열이면 null을 반환한다", () => {
    expect(getYoutubeEmbedUrl("")).toBeNull();
  });
});
