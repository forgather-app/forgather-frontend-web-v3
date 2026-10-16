import { ThemeProvider } from "@emotion/react";
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { theme } from "@/styles/theme";
import { linkifyText } from "./linkifyText";

const renderWithTheme = (ui: ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

afterEach(() => {
  cleanup();
});

describe("linkifyText", () => {
  it("URL이 없으면 원본 텍스트를 그대로 반환한다", () => {
    renderWithTheme(<p>{linkifyText("안녕하세요 반갑습니다")}</p>);

    expect(screen.getByText("안녕하세요 반갑습니다")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("https:// URL을 새 탭으로 여는 하이퍼링크로 변환한다", () => {
    renderWithTheme(
      <p>{linkifyText("문의는 https://forgather.app 로 해주세요")}</p>,
    );

    const link = screen.getByRole("link", { name: "https://forgather.app" });
    expect(link).toHaveAttribute("href", "https://forgather.app");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("www.로 시작하는 URL은 https:// 를 붙여 href를 만든다", () => {
    renderWithTheme(
      <p>{linkifyText("인스타: www.instagram.com/forgather")}</p>,
    );

    const link = screen.getByRole("link", {
      name: "www.instagram.com/forgather",
    });
    expect(link).toHaveAttribute("href", "https://www.instagram.com/forgather");
  });

  it("문장 끝의 마침표·쉼표는 링크에서 제외하고 일반 텍스트로 남긴다", () => {
    const { container } = renderWithTheme(
      <p>{linkifyText("사이트는 https://forgather.app. 참고해주세요")}</p>,
    );

    const link = screen.getByRole("link", { name: "https://forgather.app" });
    expect(link).toHaveAttribute("href", "https://forgather.app");
    expect(container).toHaveTextContent(
      "사이트는 https://forgather.app. 참고해주세요",
    );
  });

  it("괄호로 감싸진 URL은 닫는 괄호를 링크에서 제외한다", () => {
    renderWithTheme(
      <p>{linkifyText("참고 (https://forgather.app) 입니다")}</p>,
    );

    const link = screen.getByRole("link", { name: "https://forgather.app" });
    expect(link).toHaveAttribute("href", "https://forgather.app");
  });

  it("여러 개의 URL을 모두 하이퍼링크로 변환한다", () => {
    renderWithTheme(
      <p>
        {linkifyText(
          "https://forgather.app 그리고 https://instagram.com 확인해주세요",
        )}
      </p>,
    );

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("빈 문자열을 넣으면 아무것도 렌더링하지 않는다", () => {
    renderWithTheme(<p data-testid="empty">{linkifyText("")}</p>);

    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });
});
