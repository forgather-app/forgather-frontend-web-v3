import { describe, expect, it } from "vitest";
import { getLegacyV2RedirectPath } from "./getLegacyV2RedirectPath";

describe("getLegacyV2RedirectPath", () => {
  it.each([
    ["/guest/ABC/home", "/spaces/ABC/guest"],
    ["/guest/ABC/work-list", "/spaces/ABC/guest"],
  ])("게스트 홈/작품 목록 경로 %s는 %s로 매핑한다", (pathname, expected) => {
    expect(getLegacyV2RedirectPath(pathname, "")).toBe(expected);
  });

  it("작품 상세 경로를 v3 artworks 경로로 매핑한다", () => {
    expect(getLegacyV2RedirectPath("/guest/ABC/work-detail/42", "")).toBe(
      "/spaces/ABC/guest/artworks/42",
    );
  });

  it("방명록 목록 경로를 매핑한다", () => {
    expect(getLegacyV2RedirectPath("/guest/ABC/guestbook", "")).toBe(
      "/spaces/ABC/guest/guestbook",
    );
  });

  it("방명록 카드 상세 경로를 매핑한다", () => {
    expect(getLegacyV2RedirectPath("/guest/ABC/guestbook/99", "")).toBe(
      "/spaces/ABC/guest/guestbook/99",
    );
  });

  it("방명록 작성 경로를 v3 write 경로로 매핑한다", () => {
    expect(getLegacyV2RedirectPath("/guest/ABC/create-guestbook", "")).toBe(
      "/spaces/ABC/guest/guestbook/write",
    );
  });

  it("방명록 작성 완료 경로는 v3에 대응 페이지가 없어 방명록 목록으로 매핑한다", () => {
    expect(
      getLegacyV2RedirectPath("/guest/ABC/create-guestbook-complete", ""),
    ).toBe("/spaces/ABC/guest/guestbook");
  });

  it("게스트 경로의 쿼리스트링을 그대로 보존한다", () => {
    expect(
      getLegacyV2RedirectPath("/guest/ABC/home", "?utm_source=kakao"),
    ).toBe("/spaces/ABC/guest?utm_source=kakao");
  });

  it.each([
    ["/host/main"],
    ["/host/ABC/home"],
    ["/host"],
    ["/auth/login/kakao"],
  ])("v3에 대응 라우트가 없는 v2 호스트 경로 %s는 v3 랜딩(legacy-host 마커 포함)으로 매핑한다", (pathname) => {
    expect(getLegacyV2RedirectPath(pathname, "")).toBe(
      "/landing?from=legacy-host",
    );
  });

  it.each([
    ["/"],
    ["/login"],
    ["/home"],
    ["/spaces/ABC"],
    ["/hosts/ABC"],
    ["/unknown-path"],
  ])("v3 자체 라우트이거나 알 수 없는 경로 %s는 null을 반환해 라우터가 처리하도록 한다", (pathname) => {
    expect(getLegacyV2RedirectPath(pathname, "")).toBeNull();
  });
});
