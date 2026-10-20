import { ThemeProvider } from "@emotion/react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { search } from "@/api/generated/space-스페이스";
import type { PlaceResult } from "@/api/model/placeResult";
import { theme } from "@/styles/theme";
import ExhibitionPlaceSearch from "./ExhibitionPlaceSearch";

vi.mock("@/api/generated/space-스페이스", () => ({ search: vi.fn() }));
const mockedSearch = vi.mocked(search);
const first = {
  placeId: "123",
  placeUrl: "https://place.map.kakao.com/123?original=true",
  placeName: "디자인플라자",
  roadAddress: "서울 중구 도로명",
  address: "서울 중구 지번",
};
const second = {
  placeId: "456",
  placeUrl: "https://place.map.kakao.com/456",
  placeName: "아트홀",
  roadAddress: null,
  address: "서울 중구 지번",
};
const response = (places: PlaceResult[] = [first], hasNext = false) =>
  ({
    code: "SUCCESS",
    message: "성공",
    data: { places, hasNext },
  }) as unknown as Awaited<ReturnType<typeof search>>;
let intersect: IntersectionObserverCallback;
const advance = async () => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(300);
  });
};
const renderSearch = (onSelect = vi.fn(), onClose = vi.fn()) => ({
  ...render(
    <ThemeProvider theme={theme}>
      <ExhibitionPlaceSearch onSelect={onSelect} onClose={onClose} />
    </ThemeProvider>,
  ),
  onSelect,
  onClose,
});
const enterKeyword = () =>
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "전시" },
  });

// A visible target emits once on observe, then only on another observation or visibility change.
const observeVisibleTargets = () => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      callback: IntersectionObserverCallback;
      timer: ReturnType<typeof setTimeout> | undefined;
      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }
      observe() {
        this.timer = setTimeout(
          () =>
            this.callback(
              [{ isIntersecting: true } as IntersectionObserverEntry],
              this as unknown as IntersectionObserver,
            ),
          0,
        );
      }
      disconnect() {
        clearTimeout(this.timer);
      }
    },
  );
};
const delayedPages = (pages: { places: PlaceResult[]; hasNext: boolean }[]) => {
  for (const page of pages)
    mockedSearch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(response(page.places, page.hasNext)), 20);
        }),
    );
};
const tick = async (milliseconds: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(milliseconds);
  });
};

beforeEach(() => {
  vi.useFakeTimers();
  // jsdom does not implement the native dialog methods; exercise our handlers with its open state.
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
  mockedSearch.mockReset().mockResolvedValue(response());
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersect = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ExhibitionPlaceSearch", () => {
  it("빈 검색어로 열리고 한글 조합 중 검색하지 않다가 조합 종료 300ms 후 검색한다", async () => {
    renderSearch();
    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("");
    await advance();
    expect(mockedSearch).not.toHaveBeenCalled();
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: "전시" } });
    await advance();
    expect(mockedSearch).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input, { data: "전시" });
    await advance();
    expect(screen.getByText("디자인플라자")).toBeInTheDocument();
  });

  it("이름과 도로명 주소를 보여주고 선택 시 원본 ID와 URL만 전달한다", async () => {
    const { onSelect, onClose } = renderSearch();
    enterKeyword();
    await advance();
    expect(screen.getByText("서울 중구 도로명")).toBeInTheDocument();
    expect(screen.queryByText("서울 중구 지번")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "디자인플라자 선택" }));
    expect(onSelect).toHaveBeenCalledExactlyOnceWith({
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("디자인플라자")).not.toBeInTheDocument();
  });

  it("도로명 주소가 없으면 지번을, 둘 다 없으면 주소 행 없이 표시한다", async () => {
    mockedSearch.mockResolvedValueOnce(
      response([second, { ...first, address: null, roadAddress: null }]),
    );
    renderSearch();
    enterKeyword();
    await advance();
    expect(screen.getByText("서울 중구 지번")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "디자인플라자 선택" }),
    ).toBeEnabled();
  });

  it("검색 결과가 없으면 빈 결과를 안내한다", async () => {
    mockedSearch.mockResolvedValueOnce(response([]));
    renderSearch();
    enterKeyword();
    await advance();
    expect(screen.getByText("검색 결과가 없습니다.")).toBeInTheDocument();
  });

  it("첫 실패와 추가 실패를 재시도하며 추가 실패 시 기존 결과를 유지한다", async () => {
    mockedSearch
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response([first], true))
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response([second]));
    renderSearch();
    enterKeyword();
    await advance();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "다시 시도" }));
    });
    expect(screen.getByText("디자인플라자")).toBeInTheDocument();
    await act(async () => {
      intersect(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("디자인플라자")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "다시 시도" }));
    });
    expect(screen.getByText("아트홀")).toBeInTheDocument();
    expect(mockedSearch.mock.calls.map(([params]) => params.page)).toEqual([
      1, 1, 2, 2,
    ]);
  });

  it.each([
    "back",
    "escape",
  ])("%s 종료는 진행 중 요청을 즉시 취소한다", async (closeMethod) => {
    mockedSearch.mockReturnValueOnce(new Promise(() => {}));
    const { onClose } = renderSearch();
    enterKeyword();
    await advance();
    const signal = mockedSearch.mock.calls[0]?.[1]?.signal;
    if (closeMethod === "back")
      fireEvent.click(screen.getByRole("button", { name: "뒤로 가기" }));
    else
      fireEvent(
        screen.getByRole("dialog"),
        new Event("cancel", { bubbles: false, cancelable: true }),
      );
    expect(signal?.aborted).toBe(true);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("검색어 입력 상태의 Escape도 검색창 기본 동작보다 먼저 화면을 닫는다", async () => {
    const { onClose } = renderSearch();
    enterKeyword();
    await advance();
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("StrictMode가 다시 연 dialog에는 이전 close 이벤트가 적용되지 않는다", () => {
    const { onClose } = renderSearch();
    const dialog = screen.getByRole("dialog") as HTMLDialogElement;
    fireEvent(dialog, new Event("close"));
    expect(onClose).not.toHaveBeenCalled();
    dialog.open = false;
    fireEvent(dialog, new Event("close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("첫 페이지가 짧아 감지 요소가 계속 보일 때도 다음 페이지를 불러온다", async () => {
    observeVisibleTargets();
    delayedPages([
      { places: [first], hasNext: true },
      { places: [second], hasNext: false },
    ]);
    renderSearch();
    enterKeyword();
    await advance();
    await tick(20);
    await tick(1);
    await tick(20);
    expect(screen.getByText("디자인플라자")).toBeInTheDocument();
    expect(screen.getByText("아트홀")).toBeInTheDocument();
  });

  it("중복 결과뿐인 페이지 뒤에도 감지 요소를 재관찰해 다음 페이지를 불러온다", async () => {
    observeVisibleTargets();
    delayedPages([
      { places: [first], hasNext: true },
      { places: [first], hasNext: true },
      { places: [second], hasNext: false },
    ]);
    renderSearch();
    enterKeyword();
    await advance();
    await tick(20);
    await tick(1);
    await tick(20);
    await tick(1);
    await tick(20);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("아트홀")).toBeInTheDocument();
    expect(mockedSearch.mock.calls.map(([params]) => params.page)).toEqual([
      1, 2, 3,
    ]);
  });
});
