import "@testing-library/jest-dom/vitest";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import type { SpaceResponse } from "@/api/model";
import { theme } from "@/styles/theme";
import ArtworkPage from "./ArtworkPage";

const renderPage = (
  location: Pick<SpaceResponse, "placeName" | "placeUrl">,
) => {
  vi.spyOn(apiClient, "request").mockImplementation((config) => {
    const data = config.url?.endsWith("/products")
      ? { products: [] }
      : config.url === "/hosts/me/profile"
        ? { nickname: "테스트 작가" }
        : {
            name: "테스트 스페이스",
            exhibitionStartDate: "2026-10-20",
            exhibitionEndDate: "2026-10-30",
            linkName: "전시 홈페이지",
            linkUrl: "https://example.com/exhibition",
            ...location,
          };
    return Promise.resolve({ data: { data } }) as ReturnType<
      typeof apiClient.request
    >;
  });
  return render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <ThemeProvider theme={theme}>
        <ArtworkPage spaceId="test" />
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("호스트 전시 장소 상세", () => {
  it.each([
    undefined,
    "",
  ])("장소명이 %s이면 미등록 안내를 표시하고 지도 링크는 숨긴다", async (placeName) => {
    renderPage({ placeName, placeUrl: "https://place.map.kakao.com/123" });
    await screen.findByRole("heading", { name: "테스트 스페이스" });
    expect(screen.getByText("전시 장소")).toBeInTheDocument();
    expect(screen.getByText("등록된 장소가 없어요")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "카카오맵으로 열기 ↗" }),
    ).not.toBeInTheDocument();
  });

  it("직접 입력한 장소명만 있으면 지도 링크 없이 표시한다", async () => {
    renderPage({ placeName: "직접 입력한 전시장" });
    expect(await screen.findByText("직접 입력한 전시장")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "카카오맵으로 열기 ↗" }),
    ).not.toBeInTheDocument();
  });

  it("전시 일정 다음과 기존 링크 사이에 직접 입력 장소명과 원본 지도 URL을 표시한다", async () => {
    renderPage({
      placeName: "직접 입력한 전시장",
      placeUrl: "https://place.map.kakao.com/123?from=share&name=%EA%B0%80#map",
    });
    const name = await screen.findByText("직접 입력한 전시장");
    const map = screen.getByRole("link", { name: "카카오맵으로 열기 ↗" });
    expect(map).toHaveAttribute(
      "href",
      "https://place.map.kakao.com/123?from=share&name=%EA%B0%80#map",
    );
    expect(map).toHaveAttribute("target", "_blank");
    expect(map).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByText("전시 일정").compareDocumentPosition(name) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      name.compareDocumentPosition(
        screen.getByRole("link", { name: "링크 열기" }),
      ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
