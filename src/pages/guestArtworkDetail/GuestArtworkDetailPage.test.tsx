import { ThemeProvider } from "@emotion/react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useGuestBookWritingAvailability } from "@/hooks/@common/useGuestBookWritingAvailability";
import { theme } from "@/styles/theme";
import GuestArtworkDetailPage from "./GuestArtworkDetailPage";

vi.mock("@/api/generated/product-전시-작품", () => ({
  useGet: () => ({
    data: { id: 1, title: "테스트 작품", description: "작품 설명" },
    isPending: false,
  }),
}));
vi.mock("@/hooks/@common/useGuestBookWritingAvailability");
vi.mock("@/utils/analytics", () => ({ trackEvent: vi.fn() }));

afterEach(cleanup);

describe("작품 상세 방명록 작성 버튼", () => {
  it.each([
    true,
    false,
  ])("작성 가능 여부 %s를 반영하며 작품은 계속 표시한다", (isWritable) => {
    vi.mocked(useGuestBookWritingAvailability).mockReturnValue({
      isWritable,
      space: undefined,
      checkAvailability: vi.fn(),
    });
    const onWriteClick = vi.fn();
    render(
      <ThemeProvider theme={theme}>
        <GuestArtworkDetailPage
          spaceId="test"
          artworkId={1}
          onBack={vi.fn()}
          onWriteClick={onWriteClick}
        />
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
    expect(screen.getByText("테스트 작품")).toBeVisible();
  });
});
