import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import { theme } from "@/styles/theme";
import CreateSpacePage from "./CreateSpacePage";

const providerPlace = {
  placeName: "저장되면 안 되는 검색 이름",
  roadAddress: "저장되면 안 되는 도로명 주소",
  address: "저장되면 안 되는 지번 주소",
  placeId: "123",
  placeUrl: "https://place.map.kakao.com/123?original=true",
};
const original = {
  name: "기존 스페이스",
  description: "기존 소개",
  isPublic: true,
  linkName: "기존 링크",
  linkUrl: "https://example.com/exhibition",
  exhibitionStartDate: "2026-10-20",
  exhibitionEndDate: "2026-10-22",
  placeName: "직접 입력한 장소",
  placeId: "123",
  placeUrl: providerPlace.placeUrl,
};
let failSearch = false;
const spyRequest = () => vi.spyOn(apiClient, "request");
let request: ReturnType<typeof spyRequest>;
const renderPage = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const onSuccess = vi.fn();
  const invalidate = vi.spyOn(client, "invalidateQueries");
  render(
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <CreateSpacePage onSuccess={onSuccess} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
  return { client, onSuccess, invalidate };
};
const change = (name: string, value: string) =>
  fireEvent.change(screen.getByRole("textbox", { name }), {
    target: { value },
  });
const mutationCalls = () =>
  request.mock.calls
    .map(([config]) => config)
    .filter((config) => config.method === "POST");
const submit = async () => {
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "완료" }));
  await waitFor(() => expect(mutationCalls()).toHaveLength(1));
  return JSON.parse(mutationCalls()[0].data as string);
};
const choosePlace = async () => {
  fireEvent.click(screen.getByRole("button", { name: "장소 등록" }));
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "검색어" },
  });
  fireEvent.click(screen.getByRole("button", { name: "검색 실행" }));
  fireEvent.click(
    await screen.findByRole("button", {
      name: `${providerPlace.placeName} 선택`,
    }),
  );
};
beforeEach(() => {
  failSearch = false;
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
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  request = spyRequest().mockImplementation(async (config) => {
    if (config.url?.includes("/places")) {
      if (failSearch) throw new Error("offline");
      return { data: { data: { places: [providerPlace], hasNext: false } } };
    }
    if (config.method === "GET") return { data: { data: original } };
    return { data: { data: { spaceCode: "created-space" } } };
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const fillForm = async () => {
  change("스페이스명", "작성 중인 스페이스");
  change("스페이스 소개", "작성 중인 소개");
  change("링크 URL", "https://example.com/draft");
  change("링크 제목", "작성 중인 링크");
  change("전시 장소명", "직접 입력한 장소");
  fireEvent.click(screen.getByRole("switch", { name: "방명록 나만 보기" }));
  fireEvent.click(screen.getByRole("button", { name: "시작일" }));
  const cells = screen.getAllByRole("gridcell");
  const startCell = cells.find((cell) => cell.textContent === "20");
  const endCell = cells.find((cell) => cell.textContent === "22");
  if (!startCell || !endCell) throw new Error("달력 날짜를 찾을 수 없습니다.");
  fireEvent.click(within(startCell).getByRole("button"));
  fireEvent.click(within(endCell).getByRole("button"));
  fireEvent.click(screen.getByRole("button", { name: "확인" }));
};

describe("CreateSpacePage 장소 연결", () => {
  it("조합 확인 Enter는 IME 기본 동작을 유지하며 바깥 폼을 저장하지 않는다", async () => {
    const user = userEvent.setup();
    renderPage();
    change("스페이스명", "작성 중인 스페이스");
    change("전시 장소명", "직접 입력한 장소");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
    );
    await user.click(screen.getByRole("button", { name: "장소 등록" }));
    const input = screen.getByRole("searchbox");
    fireEvent.compositionStart(input);
    await user.type(input, "한글");
    await user.keyboard("{Enter}");
    fireEvent.compositionEnd(input, { data: "한글" });
    expect(mutationCalls()).toHaveLength(0);
    expect(
      request.mock.calls.filter(([config]) => config.url?.includes("/places")),
    ).toHaveLength(0);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveValue("한글");
  });

  it.each([
    "",
    "검색어",
  ])("검색 입력 Enter는 %s 검색어에서도 저장하지 않고 결과 버튼 Enter는 선택한다", async (keyword) => {
    const user = userEvent.setup();
    renderPage();
    change("스페이스명", "작성 중인 스페이스");
    change("전시 장소명", "직접 입력한 장소");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
    );
    await user.click(screen.getByRole("button", { name: "장소 등록" }));
    const input = screen.getByRole("searchbox");
    if (keyword) await user.type(input, keyword);
    await user.keyboard("{Enter}");
    expect(mutationCalls()).toHaveLength(0);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveValue(keyword);
    expect(
      request.mock.calls.filter(([config]) => config.url?.includes("/places")),
    ).toHaveLength(keyword ? 1 : 0);
    if (!keyword) {
      await user.type(input, "검색어");
      await user.keyboard("{Enter}");
    }
    const select = await screen.findByRole("button", {
      name: `${providerPlace.placeName} 선택`,
    });
    select.focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "전시 장소명" })).toHaveValue(
      "직접 입력한 장소",
    );
    expect(screen.getByRole("group", { name: "등록된 장소" })).toHaveFocus();
    expect(mutationCalls()).toHaveLength(0);
    expect(await submit()).toMatchObject({
      placeName: "직접 입력한 장소",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
    });
  });

  it("생성 요청에는 직접 입력한 장소명과 선택한 ID, 원본 URL만 저장한다", async () => {
    const { onSuccess } = renderPage();
    change("스페이스명", "새 스페이스");
    change("전시 장소명", "직접 입력한 장소");
    await choosePlace();
    const payload = await submit();
    expect(payload).toEqual({
      name: "새 스페이스",
      description: "",
      isPublic: true,
      linkName: "",
      linkUrl: "",
      placeName: "직접 입력한 장소",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
    });
    expect(JSON.stringify(payload)).not.toContain("저장되면 안 되는");
    await waitFor(() =>
      expect(onSuccess).toHaveBeenCalledWith("created-space"),
    );
  });
  it("연결한 장소명을 비우면 오류를 표시하고 생성 요청을 막으며 해제 후 저장한다", async () => {
    renderPage();
    change("스페이스명", "새 스페이스");
    change("전시 장소명", "직접 입력한 장소");
    await choosePlace();
    change("전시 장소명", "   ");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "장소명을 입력하거나 등록된 장소를 제거해주세요.",
    );
    expect(screen.getByRole("button", { name: "완료" })).toBeDisabled();
    const form = screen.getByRole("button", { name: "완료" }).closest("form");
    if (!form) throw new Error("폼을 찾을 수 없습니다.");
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(mutationCalls()).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연결 해제" }));
    expect(await submit()).toMatchObject({
      placeName: "",
      placeId: "",
      placeUrl: "",
    });
  });
  it.each([
    false,
    true,
  ])("검색 닫기 후 전체 폼을 보존한다 (검색 실패: %s)", async (failure) => {
    renderPage();
    await fillForm();
    const dates = [
      screen.getByRole("button", { name: "시작일" }).textContent,
      screen.getByRole("button", { name: "종료일" }).textContent,
    ];
    fireEvent.click(screen.getByRole("button", { name: "장소 등록" }));
    if (failure) {
      failSearch = true;
      fireEvent.change(screen.getByRole("searchbox"), {
        target: { value: "검색" },
      });
      fireEvent.click(screen.getByRole("button", { name: "검색 실행" }));
      expect(await screen.findByRole("alert")).toHaveTextContent(
        "장소를 불러오지 못했습니다.",
      );
    }
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "스페이스명" })).toHaveValue(
      "작성 중인 스페이스",
    );
    expect(screen.getByRole("textbox", { name: "스페이스 소개" })).toHaveValue(
      "작성 중인 소개",
    );
    expect(screen.getByRole("textbox", { name: "링크 URL" })).toHaveValue(
      "https://example.com/draft",
    );
    expect(screen.getByRole("textbox", { name: "링크 제목" })).toHaveValue(
      "작성 중인 링크",
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    expect([
      screen.getByRole("button", { name: "시작일" }).textContent,
      screen.getByRole("button", { name: "종료일" }).textContent,
    ]).toEqual(dates);
    expect(await submit()).toMatchObject({
      name: "작성 중인 스페이스",
      description: "작성 중인 소개",
      isPublic: false,
      linkUrl: "https://example.com/draft",
      linkName: "작성 중인 링크",
      placeName: "직접 입력한 장소",
      placeId: "",
      placeUrl: "",
    });
  });
});
