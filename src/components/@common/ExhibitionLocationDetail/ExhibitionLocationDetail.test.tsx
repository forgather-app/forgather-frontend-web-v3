import "@testing-library/jest-dom/vitest";
import { ThemeProvider } from "@emotion/react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { theme } from "@/styles/theme";
import ExhibitionLocationDetail from "./ExhibitionLocationDetail";

const renderDetail = (placeName?: string, placeUrl?: string) =>
  render(
    <ThemeProvider theme={theme}>
      <ExhibitionLocationDetail placeName={placeName} placeUrl={placeUrl} />
    </ThemeProvider>,
  );

afterEach(cleanup);

describe("전시 장소 상세", () => {
  it.each([
    undefined,
    "",
  ])("장소명이 %s이면 지도 URL이 있어도 행을 숨긴다", (name) => {
    const { container } = renderDetail(name, "https://place.map.kakao.com/123");
    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    undefined,
    "",
  ])("지도 URL이 %s이면 직접 입력한 이름만 표시한다", (url) => {
    renderDetail("직접 입력한 전시장", url);
    expect(screen.getByText("전시 장소")).toBeInTheDocument();
    expect(screen.getByText("직접 입력한 전시장")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("서버 지도 URL을 재작성하지 않고 안전한 새 창 링크로 표시한다", () => {
    renderDetail(
      "직접 입력한 전시장",
      "https://place.map.kakao.com/123?from=share&name=%EA%B0%80#map",
    );
    const link = screen.getByRole("link", { name: "카카오맵으로 열기 ↗" });
    expect(link).toHaveAttribute(
      "href",
      "https://place.map.kakao.com/123?from=share&name=%EA%B0%80#map",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("서버 지도 URL이 http이면 경로는 그대로 두고 https로 바꿔 표시한다", () => {
    renderDetail(
      "직접 입력한 전시장",
      "http://place.map.kakao.com/123?from=share&name=%EA%B0%80#map",
    );
    const link = screen.getByRole("link", { name: "카카오맵으로 열기 ↗" });
    expect(link).toHaveAttribute(
      "href",
      "https://place.map.kakao.com/123?from=share&name=%EA%B0%80#map",
    );
  });

  it("긴 장소명을 자르지 않고 좁은 화면에서도 줄바꿈할 수 있다", () => {
    const name = "공백없는아주긴전시장소명".repeat(5);
    renderDetail(name);
    const text = screen.getByText(name);
    expect(text).toHaveStyle({
      overflowWrap: "anywhere",
      whiteSpace: "normal",
    });
    expect(text.parentElement).toHaveStyle({ minWidth: "0" });
    expect(text).not.toHaveStyle({ textOverflow: "ellipsis" });
  });
});
