import { ThemeProvider } from "@emotion/react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { theme } from "@/styles/theme";
import GuestSpaceLayout from "./GuestSpaceLayout";

// Keep the view real while replacing only the router's external navigation boundary.
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props} />
  ),
}));
afterEach(cleanup);
describe("방문자 작성 버튼", () => {
  it.each([
    true,
    false,
  ])("작성 가능 %s일 때 버튼 상태를 반영하고 기존 방명록을 계속 노출한다", (isWritable) => {
    const onWriteClick = vi.fn();
    const onGuestBookTabClick = vi.fn();
    render(
      <ThemeProvider theme={theme}>
        <GuestSpaceLayout
          isWritable={isWritable}
          activeTab="right"
          onArtworkTabClick={vi.fn()}
          onGuestBookTabClick={onGuestBookTabClick}
          onWriteClick={onWriteClick}
        >
          <p>기존 방명록 내용</p>
        </GuestSpaceLayout>
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", {
      name: isWritable
        ? "방명록 작성하기"
        : "전시 기간에만 방명록을 남길 수 있어요",
    });
    expect(button).toHaveProperty("disabled", !isWritable);
    fireEvent.click(button);
    expect(onWriteClick).toHaveBeenCalledTimes(isWritable ? 1 : 0);
    expect(screen.getByText("기존 방명록 내용")).toBeVisible();
    fireEvent.click(screen.getByText("방명록"));
    expect(onGuestBookTabClick).toHaveBeenCalledOnce();
  });
});
