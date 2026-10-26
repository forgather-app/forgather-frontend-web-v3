import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import { SnackBarContext } from "@/components/@common/SnackBar/SnackBarContext";
import { theme } from "@/styles/theme";
import GuestBookWritePage from "./GuestBookWritePage";

let writable = true;
let failWrite = false;
let failRead = false;
const showSnackBar = vi.fn();
const spyRequest = () => vi.spyOn(apiClient, "request");
let request: ReturnType<typeof spyRequest>;
function renderPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const onSuccess = vi.fn();
  render(
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <SnackBarContext.Provider value={{ showSnackBar }}>
          <GuestBookWritePage
            spaceCode="test"
            onBack={vi.fn()}
            onSuccess={onSuccess}
          />
        </SnackBarContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
  return { client, onSuccess };
}
async function openConfirmation() {
  fireEvent.change(screen.getByRole("textbox", { name: "닉네임" }), {
    target: { value: "방문자" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "방명록" }), {
    target: { value: "멋진 전시입니다" },
  });
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "작성하기" })).toBeEnabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "작성하기" }));
  await waitFor(() =>
    expect(screen.getByRole("dialog").parentElement).toHaveAttribute(
      "aria-modal",
      "true",
    ),
  );
}
beforeEach(() => {
  writable = true;
  failWrite = false;
  failRead = false;
  vi.spyOn(Date, "now").mockReturnValue(Date.parse("2026-10-21T00:00:00Z"));
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.open = true;
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.open = false;
    },
  });
  request = spyRequest().mockImplementation(async (config) => {
    if (config.method === "POST") {
      if (failWrite) {
        writable = false;
        throw new Error("HTTP 400");
      }
      return { data: { data: { id: 1 } } };
    }
    if (failRead) throw new Error("offline");
    return {
      data: {
        data: {
          guestBookWritingPolicy: "EXHIBITION_PERIOD",
          exhibitionStartDate: "2026-10-20",
          exhibitionEndDate: "2026-10-22",
          isGuestBookWritable: writable,
        },
      },
    };
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  showSnackBar.mockReset();
});
const writes = () =>
  request.mock.calls.filter(([config]) => config.method === "POST");
describe("방명록 작성 정책 가드", () => {
  it("직접 접근해도 제한 상태이면 제출과 확인 모달을 차단한다", async () => {
    writable = false;
    renderPage();
    const button = await screen.findByRole("button", {
      name: "전시 기간에만 방명록을 남길 수 있어요",
    });
    expect(button).toBeDisabled();
    await act(async () => {
      fireEvent.submit(button.closest("form")!);
    });
    expect(screen.getByRole("dialog").parentElement).not.toHaveAttribute(
      "aria-modal",
      "true",
    );
    expect(writes()).toHaveLength(0);
  });
  it("확인 전에 정책이 바뀌면 다시 조회하고 전송하지 않는다", async () => {
    renderPage();
    await openConfirmation();
    writable = false;
    fireEvent.click(screen.getByRole("button", { name: "남기기" }));
    await waitFor(() =>
      expect(showSnackBar).toHaveBeenCalledWith(
        "전시 기간에만 방명록을 남길 수 있어요",
        "error",
      ),
    );
    expect(writes()).toHaveLength(0);
  });
  it("서버가 기간 종료를 거절하면 재조회하여 기간 안내를 표시한다", async () => {
    const { onSuccess } = renderPage();
    await openConfirmation();
    failWrite = true;
    fireEvent.click(screen.getByRole("button", { name: "남기기" }));
    await waitFor(() =>
      expect(showSnackBar).toHaveBeenCalledWith(
        "전시 기간에만 방명록을 남길 수 있어요",
        "error",
      ),
    );
    expect(writes()).toHaveLength(1);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", {
        name: "전시 기간에만 방명록을 남길 수 있어요",
      }),
    ).toBeDisabled();
  });
  it("유효한 작성은 기존 payload와 완료 동작을 유지한다", async () => {
    const { onSuccess } = renderPage();
    await openConfirmation();
    fireEvent.click(screen.getByRole("button", { name: "남기기" }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
    expect(JSON.parse(writes()[0][0].data as string)).toEqual({
      nickname: "방문자",
      message: "멋진 전시입니다",
      photos: [],
    });
  });
  it("재조회 네트워크 실패는 기존 저장 오류로 안내하고 전송하지 않는다", async () => {
    renderPage();
    await openConfirmation();
    failRead = true;
    fireEvent.click(screen.getByRole("button", { name: "남기기" }));
    await waitFor(() =>
      expect(showSnackBar).toHaveBeenCalledWith(
        "일시적인 오류로 방명록을 남기지 못했어요. 잠시 후 다시 시도해 주세요",
        "error",
      ),
    );
    expect(writes()).toHaveLength(0);
  });
});
